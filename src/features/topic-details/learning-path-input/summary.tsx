import { BrainCircuit, CheckCircle2, ListChecks } from "lucide-react";

interface LearningPathInputSummaryProps {
  topicName: string;
  hasGoal: boolean;
  hasSelectedSession: boolean;
}

const cards = [
  {
    key: "topic",
    icon: BrainCircuit,
    label: "Domain",
    getTitle: (props: LearningPathInputSummaryProps) => props.topicName,
    description: "This anchors the governance domain for the roadmap.",
  },
  {
    key: "session",
    icon: ListChecks,
    label: "Consultation context",
    getTitle: (props: LearningPathInputSummaryProps) =>
      props.hasSelectedSession ? "Selected consultation" : "Recent domain context",
    description: "Use one consultation if you want the roadmap to stay tightly scoped.",
  },
  {
    key: "goal",
    icon: CheckCircle2,
    label: "Compliance objective",
    getTitle: (props: LearningPathInputSummaryProps) =>
      props.hasGoal ? "Objective provided" : "Objective optional",
    description: "An objective makes the phases more practical and actionable.",
  },
];

export function LearningPathInputSummary(props: LearningPathInputSummaryProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-2xl border border-border/70 bg-background p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{card.label}</span>
            </div>
            <p className="font-semibold">{card.getTitle(props)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
