import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { TopicColorPicker } from "@/features/topics/color/picker";
import { TopicCard } from "@/features/topics/card";
import { DeleteConfirmDialog } from "@/shared/components/common/delete-confirm/dialog";
import { InlineError } from "@/shared/components/common/inline-error";
import { PageLoading } from "@/shared/components/common/page/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/shared/lib/api";
import {
  isValidHexColor,
  normalizeHexColor,
  withAlpha,
} from "@/shared/lib/color";
import { formatRelativeSessionDate } from "@/shared/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Topic } from "@/shared/types/domain";

export function TopicsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0EA5E9");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const topicNameInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const {
    data: topics = [],
    isPending: isTopicsPending,
    error: topicsError,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: api.getTopics,
  });
  const {
    data: sessions = [],
    isPending: isSessionsPending,
    error: sessionsError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: api.getSessions,
  });
  const createTopicMutation = useMutation({
    mutationFn: api.createTopic,
    onSuccess: async () => {
      setName("");
      setColor("#0EA5E9");
      setIsFormOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
  const deleteTopicMutation = useMutation({
    mutationFn: api.deleteTopic,
    onSuccess: async () => {
      setTopicToDelete(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["topics"] }),
        queryClient.invalidateQueries({ queryKey: ["sessions"] }),
      ]);
    },
  });

  const topicsWithMeta = topics.map((topic) => {
    const relatedSessions = sessions.filter(
      (session) => session.topicId === topic.id,
    );
    const lastActivity = relatedSessions
      .map((session) => session.updatedAt)
      .sort(
        (left, right) => new Date(right).getTime() - new Date(left).getTime(),
      )[0];

    return {
      topic,
      sessionsCount: relatedSessions.length,
      lastActivity: lastActivity
        ? formatRelativeSessionDate(lastActivity)
        : "No consultations yet",
    };
  });

  useEffect(() => {
    if (searchParams.get("create") !== "1") return;

    setIsFormOpen(true);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("create");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!isFormOpen) return;
    const id = setTimeout(() => {
      topicNameInputRef.current?.focus();
    }, 50);
    return () => clearTimeout(id);
  }, [isFormOpen]);

  if (isTopicsPending || isSessionsPending) {
    return <PageLoading titleWidth="w-96" />;
  }

  if (topicsError || sessionsError) {
    return <InlineError message={(topicsError ?? sessionsError)?.message} />;
  }

  const normalizedColor = isValidHexColor(color)
    ? normalizeHexColor(color)
    : color;
  const canCreate =
    Boolean(name.trim()) &&
    isValidHexColor(color) &&
    !createTopicMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
            Governance Domains
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-foreground">
            {topicsWithMeta.length > 0
              ? "Your domains."
              : "Get started."}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            {topicsWithMeta.length > 0
              ? "Create domains for each regulation or framework and jump back into your consultations."
              : "Create your first governance domain to start consulting with AI on regulations and compliance frameworks."}
          </p>
        </div>
        <Button
          variant={isFormOpen ? "outline" : "default"}
          className="shrink-0"
          onClick={() => setIsFormOpen((v) => !v)}
        >
          {isFormOpen ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              Add Domain
            </>
          )}
        </Button>
      </div>

      {/* Collapsible create form */}
      {isFormOpen && (
        <div
          className="animate-fade-in-up rounded-xl border border-border/60 bg-card p-5 shadow-card"
          style={{
            background: `linear-gradient(135deg, ${withAlpha(normalizedColor, 0.08)}, rgba(11, 21, 38, 0.97))`,
          }}
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">
            New governance domain
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Give it a clear name and a color to identify it at a glance.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="topic-name">Domain name</Label>
              <Input
                id="topic-name"
                ref={topicNameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. LGPD, ISO 27001, GDPR"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canCreate) {
                    createTopicMutation.mutate({
                      name: name.trim(),
                      color: normalizeHexColor(color),
                    });
                  }
                }}
              />
            </div>
            <TopicColorPicker color={color} onChange={setColor} />
          </div>

          <Separator className="my-5 opacity-40" />

          <div className="flex items-center gap-3">
            <Button
              disabled={!canCreate}
              onClick={() =>
                createTopicMutation.mutate({
                  name: name.trim(),
                  color: normalizeHexColor(color),
                })
              }
            >
              <PlusCircle className="h-4 w-4" />
              {createTopicMutation.isPending ? "Creating..." : "Create domain"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsFormOpen(false);
                setName("");
                setColor("#0EA5E9");
              }}
            >
              Cancel
            </Button>
          </div>

          {!isValidHexColor(color) && (
            <InlineError
              className="mt-2"
              message="Enter a valid hex color before adding the domain."
            />
          )}
          <InlineError
            className="mt-2"
            message={createTopicMutation.error?.message}
          />
        </div>
      )}

      {/* Topics grid */}
      {topicsWithMeta.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {topicsWithMeta.map(({ topic, sessionsCount, lastActivity }) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              sessionsCount={sessionsCount}
              lastActivity={lastActivity}
              onDelete={(t) => setTopicToDelete(t)}
              isDeleting={
                deleteTopicMutation.isPending && topicToDelete?.id === topic.id
              }
            />
          ))}
        </div>
      ) : !isFormOpen ? (
        <div className="rounded-xl border border-dashed border-border/40 bg-card/30 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <p className="mt-4 font-serif text-lg font-medium text-foreground">
            No domains yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Click &ldquo;Add Domain&rdquo; to create your first governance
            framework.
          </p>
          <Button
            className="mt-5"
            onClick={() => setIsFormOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add your first domain
          </Button>
        </div>
      ) : null}

      <DeleteConfirmDialog
        open={Boolean(topicToDelete)}
        onOpenChange={(open) => {
          if (!open) setTopicToDelete(null);
        }}
        title="Delete domain?"
        description={
          topicToDelete
            ? `This will permanently delete "${topicToDelete.name}" and all its consultations. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete domain"
        isPending={deleteTopicMutation.isPending}
        onConfirm={() => {
          if (topicToDelete) {
            deleteTopicMutation.mutate(topicToDelete.id);
          }
        }}
      />
    </div>
  );
}
