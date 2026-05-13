import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DeleteConfirmDialog } from "@/shared/components/common/delete-confirm/dialog";
import { InlineError } from "@/shared/components/common/inline-error";
import { SessionChatCard } from "@/features/messages/session-chat";
import { SessionHero } from "@/features/sessions/hero";
import { StudyToolsPanel } from "@/features/study-tools/panel";
import { PageLoading } from "@/shared/components/common/page/loading";
import { api } from "@/shared/lib/api";
import { useT } from "@/shared/lib/i18n";
import type {
  CreateMessageResponse,
  Message,
  QuizDifficulty,
} from "@/shared/types/domain";

export function SessionPage() {
  const t = useT();
  const { sessionId = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState<QuizDifficulty>("medium");
  const [questions, setQuestions] = useState(3);

  const {
    data: session,
    isPending: isSessionPending,
    error: sessionError,
  } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => api.getSession(sessionId),
  });
  const {
    data: messages = [],
    isPending: isMessagesPending,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", sessionId],
    queryFn: () => api.getMessages(sessionId),
  });
  const createMessageMutation = useMutation({
    mutationFn: (content: string) => api.createMessage(sessionId, { content }),
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ["messages", sessionId] });

      const previousMessages =
        queryClient.getQueryData<Message[]>(["messages", sessionId]) ?? [];
      const timestamp = new Date().toISOString();
      const optimisticUserMessage: Message = {
        id: `optimistic-user-${Date.now()}`,
        sessionId,
        role: "user",
        content,
        createdAt: timestamp,
      };
      const optimisticAssistantMessage: Message = {
        id: `optimistic-assistant-${Date.now()}`,
        sessionId,
        role: "assistant",
        content: "",
        createdAt: timestamp,
        isPending: true,
      };

      queryClient.setQueryData<Message[]>(
        ["messages", sessionId],
        [
          ...previousMessages,
          optimisticUserMessage,
          optimisticAssistantMessage,
        ],
      );

      return {
        previousMessages,
        optimisticUserMessageId: optimisticUserMessage.id,
        optimisticAssistantMessageId: optimisticAssistantMessage.id,
      };
    },
    onError: (_error, _content, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", sessionId],
          context.previousMessages,
        );
      }
    },
    onSuccess: async (data: CreateMessageResponse, _content, context) => {
      queryClient.setQueryData<Message[]>(
        ["messages", sessionId],
        (currentMessages = []) =>
          currentMessages.map((message) => {
            if (message.id === context?.optimisticUserMessageId) {
              return data.userMessage;
            }
            if (message.id === context?.optimisticAssistantMessageId) {
              return data.assistantMessage;
            }
            return message;
          }),
      );
      await queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["messages", sessionId],
      });
    },
  });
  const deleteSessionMutation = useMutation({
    mutationFn: api.deleteSession,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["sessions"] }),
        queryClient.invalidateQueries({
          queryKey: ["sessions", session?.topicId],
        }),
        queryClient.invalidateQueries({ queryKey: ["topics"] }),
      ]);
      navigate(`/topics/${session?.topicId ?? ""}`);
    },
  });

  if (isSessionPending) {
    return <PageLoading titleWidth="w-[30rem]" lines={2} />;
  }

  if (sessionError || messagesError) {
    return <InlineError message={(sessionError ?? messagesError)?.message} />;
  }

  if (!session) {
    return <p>Session not found.</p>;
  }

  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user")
    ?.content?.trim();
  const sessionPromptContext = latestUserMessage || session.title;
  const shortenedContext =
    sessionPromptContext.length > 60
      ? `${sessionPromptContext.slice(0, 57).trim()}...`
      : sessionPromptContext;
  const composerPlaceholder = `Ask a compliance question about ${session.topic.name} or try "Explain ${shortenedContext} in plain terms"`;

  return (
    <div className="space-y-5">
      {/* Compact session header */}
      <SessionHero
        topicId={session.topicId}
        topicName={session.topic.name}
        title={session.title}
        onOpenStudyTools={() =>
          document
            .getElementById("study-tools-panel")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onDelete={() => setIsDeleteOpen(true)}
      />

      {/* Main grid: chat + study tools */}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <SessionChatCard
          messages={messages}
          isLoading={isMessagesPending}
          isSending={createMessageMutation.isPending}
          errorMessage={createMessageMutation.error?.message}
          placeholder={composerPlaceholder}
          onSend={(value) => createMessageMutation.mutate(value)}
        />

        <StudyToolsPanel
          sessionId={sessionId}
          quizDifficulty={quizDifficulty}
          questions={questions}
          onQuizDifficultyChange={setQuizDifficulty}
          onQuestionsChange={(n) => setQuestions(Math.max(1, Math.min(10, n)))}
        />
      </div>

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={t.topicDetails.deleteConsultationTitle}
        description={t.topicDetails.deleteSessionDesc(session.title)}
        confirmLabel={t.topicDetails.deleteConsultationConfirm}
        isPending={deleteSessionMutation.isPending}
        onConfirm={() => deleteSessionMutation.mutate(sessionId)}
      />
    </div>
  );
}
