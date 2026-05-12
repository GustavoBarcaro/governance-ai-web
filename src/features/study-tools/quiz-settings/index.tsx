import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QuizDifficulty } from "@/shared/types/domain";

import { StudyToolCard } from "../tool";

interface StudyToolsQuizSettingsCardProps {
  quizDifficulty: QuizDifficulty;
  questions: number;
  onQuizDifficultyChange: (difficulty: QuizDifficulty) => void;
  onQuestionsChange: (questions: number) => void;
}

export function StudyToolsQuizSettingsCard({
  quizDifficulty,
  questions,
  onQuizDifficultyChange,
  onQuestionsChange,
}: StudyToolsQuizSettingsCardProps) {
  return (
    <StudyToolCard title="Assessment settings">
      <div className="space-y-2">
        <Label>Difficulty</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={quizDifficulty === "easy" ? "default" : "outline"}
            onClick={() => onQuizDifficultyChange("easy")}
          >
            Easy
          </Button>
          <Button
            variant={quizDifficulty === "medium" ? "default" : "outline"}
            onClick={() => onQuizDifficultyChange("medium")}
          >
            Medium
          </Button>
          <Button
            variant={quizDifficulty === "hard" ? "default" : "outline"}
            onClick={() => onQuizDifficultyChange("hard")}
          >
            Hard
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="question-count">Questions</Label>
        <Input
          id="question-count"
          type="number"
          min={1}
          max={10}
          value={questions}
          onChange={(event) =>
            onQuestionsChange(Number(event.target.value) || 1)
          }
        />
      </div>
      <p className="text-sm text-muted-foreground">
        The compliance assessment is generated from the content of this consultation.
      </p>
    </StudyToolCard>
  );
}
