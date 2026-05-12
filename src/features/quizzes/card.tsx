import { CheckCircle2, Circle, CircleOff, Sparkles } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SurfaceCard } from "@/shared/components/common/surface/card";
import type { QuizDifficulty, QuizQuestion } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: QuizQuestion[];
  difficulty: QuizDifficulty;
  onSubmitResult?: (result: {
    correctCount: number;
    total: number;
    percentage: number;
  }) => void;
}

export function QuizCard({ quiz, difficulty, onSubmitResult }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const correctCount = quiz.reduce((total, question, index) => {
    const key = `${question.question}-${index}`;
    return total + (answers[key] === question.correctOptionId ? 1 : 0);
  }, 0);
  const percentage =
    quiz.length === 0 ? 0 : Math.round((correctCount / quiz.length) * 100);
  const passed = percentage >= 70;

  return (
    <SurfaceCard>
      <CardHeader className="space-y-3">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="font-serif text-2xl font-semibold sm:text-3xl">
              Compliance Assessment
            </CardTitle>
            <CardDescription>
              Answer each question, then check your results to see explanations.
            </CardDescription>
          </div>
          <Badge className="capitalize">{difficulty}</Badge>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          {answeredCount} of {quiz.length} answered
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Score banner */}
        {submitted && (
          <div
            className={cn(
              "rounded-xl border p-4",
              passed
                ? "border-emerald-800/40 bg-emerald-950/30"
                : "border-amber-700/40 bg-amber-950/30",
            )}
          >
            <p className="text-sm font-semibold text-foreground">
              Score: {correctCount}/{quiz.length} correct
            </p>
            <p
              className={cn(
                "mt-1 text-sm",
                passed ? "text-emerald-400" : "text-amber-400",
              )}
            >
              {percentage}%{" "}
              {passed ? "— Assessment passed." : "— Need 70% to pass."}
            </p>
          </div>
        )}

        {/* Questions */}
        {quiz.map((question, index) =>
          (() => {
            const key = `${question.question}-${index}`;
            const selectedOptionId = answers[key];
            const isAnswered = Boolean(selectedOptionId);
            const selectedOption = question.options.find(
              (o) => o.id === selectedOptionId,
            );
            const correctOption = question.options.find(
              (o) => o.id === question.correctOptionId,
            );
            const answeredCorrectly =
              submitted && selectedOptionId === question.correctOptionId;
            const answeredIncorrectly =
              submitted &&
              isAnswered &&
              selectedOptionId !== question.correctOptionId;

            return (
              <div
                key={key}
                className={cn(
                  "space-y-4 rounded-xl border bg-card p-4 transition-all sm:p-5",
                  isAnswered && !submitted
                    ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20"
                    : "border-border/60",
                )}
              >
                {/* Question header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                      Question {index + 1}
                    </p>
                    <h3 className="text-base font-semibold leading-6">
                      {question.question}
                    </h3>
                  </div>
                  <Badge
                    variant={isAnswered ? "default" : "outline"}
                    className="self-start shrink-0"
                  >
                    {isAnswered ? "Selected" : "Pending"}
                  </Badge>
                </div>

                <Separator className="opacity-40" />

                {/* Options */}
                <div className="grid gap-2.5">
                  {question.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const isCorrect =
                      submitted && question.correctOptionId === option.id;
                    const isIncorrect =
                      submitted &&
                      isSelected &&
                      question.correctOptionId !== option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={cn(
                          "flex items-start justify-between gap-3 rounded-lg border bg-muted/20 px-4 py-3 text-left text-sm transition-all",
                          "hover:border-primary/30 hover:bg-primary/5",
                          isSelected &&
                            !submitted &&
                            "border-primary/40 bg-primary/8 ring-1 ring-primary/20",
                          isCorrect &&
                            "border-emerald-700/50 bg-emerald-950/30 ring-1 ring-emerald-700/30",
                          isIncorrect &&
                            "border-red-700/50 bg-red-950/30 ring-1 ring-red-700/30",
                        )}
                        onClick={() =>
                          !submitted &&
                          setAnswers((cur) => ({ ...cur, [key]: option.id }))
                        }
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <div
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold",
                              isSelected && !submitted
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border/60 bg-muted text-muted-foreground",
                              isCorrect &&
                                "border-emerald-600 bg-emerald-700 text-white",
                              isIncorrect &&
                                "border-red-600 bg-red-700 text-white",
                            )}
                          >
                            {option.id}
                          </div>
                          <span className="min-w-0 pt-0.5 leading-6">
                            {option.text}
                          </span>
                        </div>
                        <div className="shrink-0 pt-0.5">
                          {isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : isIncorrect ? (
                            <CircleOff className="h-4 w-4 text-red-400" />
                          ) : isSelected ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/30" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (after submit) */}
                {submitted && (
                  <div
                    className={cn(
                      "rounded-lg border p-4",
                      answeredCorrectly &&
                        "border-emerald-800/40 bg-emerald-950/25",
                      answeredIncorrectly && "border-red-800/40 bg-red-950/25",
                      !isAnswered && "border-border/40 bg-muted/20",
                    )}
                  >
                    <p
                      className={cn(
                        "mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]",
                        answeredCorrectly && "text-emerald-400",
                        answeredIncorrectly && "text-red-400",
                        !isAnswered && "text-muted-foreground/60",
                      )}
                    >
                      {answeredCorrectly
                        ? "Correct answer"
                        : answeredIncorrectly
                          ? "Incorrect answer"
                          : "Not answered"}
                    </p>

                    {selectedOption && (
                      <p
                        className={cn(
                          "text-sm leading-6",
                          answeredIncorrectly
                            ? "text-red-400/80"
                            : "text-muted-foreground",
                        )}
                      >
                        <span className="font-semibold text-foreground/80">
                          Your answer:
                        </span>{" "}
                        {selectedOption.id}. {selectedOption.text}
                      </p>
                    )}

                    {correctOption && !answeredCorrectly && (
                      <p className="mt-1.5 text-sm leading-6 text-emerald-400/80">
                        <span className="font-semibold text-emerald-300">
                          Correct:
                        </span>{" "}
                        {correctOption.id}. {correctOption.text}
                      </p>
                    )}

                    <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                      Explanation
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })(),
        )}

        {/* Submit row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground/60">
            You can change your answers before checking the results.
          </p>
          <Button
            className="w-full sm:w-auto"
            onClick={() => {
              setSubmitted(true);
              onSubmitResult?.({ correctCount, total: quiz.length, percentage });
            }}
            disabled={answeredCount === 0 || submitted}
          >
            Check answers
          </Button>
        </div>
      </CardContent>
    </SurfaceCard>
  );
}
