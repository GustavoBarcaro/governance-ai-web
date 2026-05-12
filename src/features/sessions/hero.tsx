import { Trash2, Wrench } from "lucide-react";

import { BackLink } from "@/shared/components/common/back-link";
import { Button } from "@/components/ui/button";

interface SessionHeroProps {
  topicId: string;
  topicName: string;
  title: string;
  onOpenStudyTools?: () => void;
  onDelete: () => void;
}

export function SessionHero({
  topicId,
  topicName,
  title,
  onOpenStudyTools,
  onDelete,
}: SessionHeroProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 space-y-2">
        <BackLink to={`/topics/${topicId}`} label="Back to domain" />
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-node-pulse" />
          <span className="font-mono text-xs text-muted-foreground/70">
            {topicName}
          </span>
        </div>
        <h1 className="line-clamp-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 pt-1">
        {onOpenStudyTools && (
          <Button
            variant="outline"
            size="sm"
            className="xl:hidden"
            onClick={onOpenStudyTools}
          >
            <Wrench className="h-3.5 w-3.5" />
            Tools
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-border/60 text-muted-foreground/60 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
