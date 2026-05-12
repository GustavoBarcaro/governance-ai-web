import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, HelpCircle, ListChecks, Sparkles } from "lucide-react";

import { api } from "@/shared/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { InlineError } from "@/shared/components/common/inline-error";
import { MarkdownContent } from "@/shared/components/common/markdown/content";
import type { QuizDifficulty, StudyLevel } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

type TabId = "summary" | "clarify" | "quiz";

interface StudyToolsPanelProps {
  sessionId: string;
  quizDifficulty: QuizDifficulty;
  questions: number;
  onQuizDifficultyChange: (difficulty: QuizDifficulty) => void;
  onQuestionsChange: (questions: number) => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "clarify", label: "Clarify" },
  { id: "quiz", label: "Quiz" },
];

export function StudyToolsPanel({
  sessionId,
  quizDifficulty,
  questions,
  onQuizDifficultyChange,
  onQuestionsChange,
}: StudyToolsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const [focus, setFocus] = useState("");
  const [level, setLevel] = useState<StudyLevel>("beginner");

  const summaryMutation = useMutation({
    mutationFn: () => api.summarizeSession(sessionId),
  });
  const explainMutation = useMutation({
    mutationFn: () =>
      api.explainAgain(sessionId, { focus: focus || undefined, level }),
  });

  return (
    <div
      id="study-tools-panel"
      className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden"
    >
      {/* Tab bar */}
      <div className="flex shrink-0 border-b border-border/60">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] transition",
              activeTab === tab.id
                ? "border-b-2 border-primary bg-primary/8 text-primary"
                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ── Summary ── */}
        {activeTab === "summary" && (
          <div className="space-y-3">
            <Button
              className="w-full"
              disabled={summaryMutation.isPending}
              onClick={() => summaryMutation.mutate()}
            >
              <ListChecks className="h-3.5 w-3.5" />
              {summaryMutation.isPending ? "Summarizing..." : "Generate Summary"}
            </Button>

            {summaryMutation.isPending && (
              <div className="space-y-2 rounded-lg bg-muted/30 p-3">
                <Skeleton className="h-3.5 w-11/12" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-9/12" />
                <Skeleton className="h-3.5 w-10/12" />
              </div>
            )}

            {summaryMutation.data?.summary && (
              <>
                <div className="rounded-lg bg-muted/25 p-3 text-sm leading-6">
                  <MarkdownContent content={summaryMutation.data.summary} />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={async () => {
                    if (summaryMutation.data?.summary) {
                      await navigator.clipboard.writeText(
                        summaryMutation.data.summary,
                      );
                    }
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy summary
                </Button>
              </>
            )}

            {!summaryMutation.data && !summaryMutation.isPending && (
              <p className="text-xs text-muted-foreground/60">
                Generate a concise summary of this compliance consultation.
              </p>
            )}

            <InlineError message={summaryMutation.error?.message} />
          </div>
        )}

        {/* ── Clarify ── */}
        {activeTab === "clarify" && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60">
                Focus area
              </p>
              <Input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="Which regulation needs clarification?"
                className="border-border/60 bg-muted/30"
              />
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60">
                Knowledge level
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant={level === "beginner" ? "default" : "outline"}
                  onClick={() => setLevel("beginner")}
                >
                  Foundational
                </Button>
                <Button
                  size="sm"
                  variant={level === "intermediate" ? "default" : "outline"}
                  onClick={() => setLevel("intermediate")}
                >
                  Advanced
                </Button>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={explainMutation.isPending}
              onClick={() => explainMutation.mutate()}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              {explainMutation.isPending ? "Clarifying..." : "Clarify Regulation"}
            </Button>

            {explainMutation.isPending && (
              <div className="space-y-2 rounded-lg bg-muted/30 p-3">
                <Skeleton className="h-3.5 w-10/12" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-8/12" />
                <Skeleton className="h-3.5 w-9/12" />
              </div>
            )}

            {explainMutation.data?.explanation && (
              <div className="rounded-lg bg-muted/25 p-3 text-sm leading-6">
                <MarkdownContent content={explainMutation.data.explanation} />
              </div>
            )}

            <InlineError message={explainMutation.error?.message} />
          </div>
        )}

        {/* ── Quiz ── */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60">
                Difficulty
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {(["easy", "medium", "hard"] as QuizDifficulty[]).map((d) => (
                  <Button
                    key={d}
                    size="sm"
                    variant={quizDifficulty === d ? "default" : "outline"}
                    onClick={() => onQuizDifficultyChange(d)}
                    className="capitalize"
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60">
                Questions
              </p>
              <Input
                type="number"
                min={1}
                max={10}
                value={questions}
                onChange={(e) =>
                  onQuestionsChange(Number(e.target.value) || 1)
                }
                className="border-border/60 bg-muted/30"
              />
            </div>

            <Button asChild className="w-full">
              <Link
                to={`/quizzes/${sessionId}?difficulty=${quizDifficulty}&questions=${questions}`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Start Assessment
              </Link>
            </Button>

            <p className="text-xs text-muted-foreground/55 leading-5">
              The assessment is generated from the content of this consultation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
