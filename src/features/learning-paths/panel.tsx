import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SurfaceCard } from "@/shared/components/common/surface/card";
import type {
  LearningPath,
  LearningPathStep,
  Topic,
} from "@/shared/types/domain";
import { cn } from "@/lib/utils";

interface LearningPathPanelProps {
  topic: Topic;
  learningPath?: LearningPath | null;
  isLoading?: boolean;
  creatingSessionStepId?: string | null;
  getExistingSessionId?: (step: LearningPathStep) => string | null;
  getTestQuizHref?: (step: LearningPathStep) => string;
  onCreateSession: (step: LearningPathStep) => void;
}

export function LearningPathPanel({
  topic,
  learningPath,
  isLoading = false,
  creatingSessionStepId = null,
  getExistingSessionId,
  getTestQuizHref,
  onCreateSession,
}: LearningPathPanelProps) {
  if (isLoading) {
    return (
      <SurfaceCard>
        <CardHeader className="space-y-4">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-2.5 w-full" />
        </CardHeader>
        <CardContent className="space-y-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </CardContent>
      </SurfaceCard>
    );
  }

  if (!learningPath) {
    return (
      <SurfaceCard>
        <CardHeader>
          <CardTitle className="font-serif text-xl font-semibold">
            Compliance roadmap
          </CardTitle>
          <CardDescription>
            No compliance roadmap has been generated for this domain yet.
          </CardDescription>
        </CardHeader>
      </SurfaceCard>
    );
  }

  const completedSteps = learningPath.steps.filter((s) => s.completed).length;
  const totalSteps = learningPath.steps.length;
  const progress =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

  return (
    <SurfaceCard>
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
              Compliance Roadmap
            </p>
            <CardTitle className="font-serif text-2xl font-semibold">
              {topic.name}
            </CardTitle>
            <CardDescription>{learningPath.description}</CardDescription>
          </div>
          <Badge variant={progress === 100 ? "default" : "secondary"}>
            {progress}%
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground/60">
            <span>Progress</span>
            <span>
              {completedSteps}/{totalSteps} phases
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5">
        {learningPath.steps.map((step, index) => {
          const existingSessionId = getExistingSessionId?.(step) ?? null;

          return (
            <div
              key={step.id}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                step.completed
                  ? "border-emerald-800/40 bg-emerald-950/30"
                  : "border-border/60 bg-card/40",
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Step info */}
                <div className="flex min-w-0 items-start gap-3">
                  {/* Phase indicator */}
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold",
                      step.completed
                        ? "border-emerald-700/50 bg-emerald-900/50 text-emerald-400"
                        : "border-border/60 bg-muted/40 text-muted-foreground",
                    )}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                        Phase {index + 1}
                      </p>
                      {step.completed && (
                        <Badge className="rounded border border-emerald-800/40 bg-emerald-950/40 px-2 py-0 text-[10px] text-emerald-400 hover:bg-emerald-950/50">
                          Passed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-semibold leading-5">
                      {step.title}
                    </p>
                    <p className="text-sm leading-5 text-muted-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[180px] sm:items-end">
                  {step.completed ? (
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-800/40 bg-muted/20 px-3 py-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/50">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-300">
                          Completed
                        </p>
                        <p className="text-[11px] text-emerald-400/60">
                          Assessment passed
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col gap-2 sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={creatingSessionStepId !== null}
                        onClick={() => onCreateSession(step)}
                        className="w-full justify-between sm:w-auto"
                      >
                        {creatingSessionStepId === step.id ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            {existingSessionId
                              ? "Open consultation"
                              : "Start consultation"}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </Button>
                      <Link
                        to={getTestQuizHref?.(step) ?? "#"}
                        className={cn(
                          buttonVariants({ variant: "default", size: "sm" }),
                          "w-full justify-between sm:w-auto",
                        )}
                      >
                        Take assessment
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <Separator className="opacity-30" />
        <p className="text-xs text-muted-foreground/50">
          Complete each phase by passing the compliance assessment with at least
          70%.
        </p>
      </CardContent>
    </SurfaceCard>
  );
}
