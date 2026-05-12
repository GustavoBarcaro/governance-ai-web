import { Trash2 } from "lucide-react";

import { BackLink } from "@/shared/components/common/back-link";
import { Button } from "@/components/ui/button";

interface TopicDetailsHeaderProps {
  topicName: string;
  onDelete: () => void;
}

export function TopicDetailsHeader({
  topicName,
  onDelete,
}: TopicDetailsHeaderProps) {
  return (
    <div className="flex-1 space-y-3">
      <BackLink to="/topics" label="Back to domains" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
            Governance Domain
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {topicName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Open consultations, review compliance progress, and build a
            governance roadmap for this domain.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 border-border/60 text-muted-foreground/60 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
