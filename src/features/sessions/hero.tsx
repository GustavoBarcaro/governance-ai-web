import { Sparkles, Target, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/shared/components/common/page/header";
import type { QuizDifficulty } from "@/shared/types/domain";

interface SessionHeroProps {
  sessionId: string;
  topicId: string;
  topicName: string;
  title: string;
  quizDifficulty: QuizDifficulty;
  questions: number;
  onOpenStudyTools: () => void;
  onDelete: () => void;
}

export function SessionHero({
  sessionId,
  topicId,
  topicName,
  title,
  quizDifficulty,
  questions,
  onOpenStudyTools,
  onDelete,
}: SessionHeroProps) {
  return (
    <CardHeader className="space-y-4">
      <PageHeader
        backLink={{
          to: `/topics/${topicId}`,
          label: "Back to domain",
        }}
        title={title}
        titleClassName="text-3xl sm:text-4xl"
        description={
          <CardDescription className="max-w-2xl text-base">
            Ask questions, review compliance answers, and use analysis tools without losing the context of this consultation.
          </CardDescription>
        }
        aside={
          <div className="w-full rounded-[1.5rem] bg-white p-4 shadow-sm sm:max-w-sm">
            <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Target className="h-4 w-4 text-accent" />
              Governance scope
            </p>
            <p className="mt-2 text-sm leading-6">
              Focused on{" "}
              <span className="font-semibold">{topicName}</span> — keep your questions, regulatory answers, and analysis tools in one place.
            </p>
          </div>
        }
        actions={
          <>
            <Button variant="secondary" onClick={onOpenStudyTools}>
              <Sparkles className="h-4 w-4" />
              Summarize
            </Button>
            <Button variant="secondary" onClick={onOpenStudyTools}>
              <Sparkles className="h-4 w-4" />
              Clarify
            </Button>
            <Button asChild>
              <Link
                to={`/quizzes/${sessionId}?difficulty=${quizDifficulty}&questions=${questions}`}
              >
                <Sparkles className="h-4 w-4" />
                Assessment
              </Link>
            </Button>
            <Button variant="outline" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              Delete consultation
            </Button>
          </>
        }
      />
    </CardHeader>
  );
}
