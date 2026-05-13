import { ArrowRight, Clock3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { withAlpha } from "@/shared/lib/color";
import { useT } from "@/shared/lib/i18n";
import type { Topic } from "@/shared/types/domain";

interface TopicCardProps {
  topic: Topic;
  sessionsCount: number;
  lastActivity: string;
  onDelete?: (topic: Topic) => void;
  isDeleting?: boolean;
}

export function TopicCard({
  topic,
  sessionsCount,
  lastActivity,
  onDelete,
  isDeleting = false,
}: TopicCardProps) {
  const t = useT();
  const color = topic.color ?? "#64748B";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-border hover:shadow-card">
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-xl"
        style={{
          background: `linear-gradient(90deg, ${color}, ${withAlpha(color, 0.35)}, transparent)`,
        }}
      />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="h-3 w-3 shrink-0 rounded-full animate-node-pulse"
              style={{ backgroundColor: color }}
            />
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {topic.name}
            </h3>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground/50 hover:text-destructive"
              onClick={() => onDelete(topic)}
              disabled={isDeleting}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-3xl font-bold text-foreground">
              {sessionsCount}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {t.topics.consultations}
            </p>
          </div>
          <div className="flex items-center gap-1.5 pb-0.5 text-xs text-muted-foreground/70">
            <Clock3 className="h-3 w-3 shrink-0" />
            <span className="font-mono text-[11px]">{lastActivity}</span>
          </div>
        </div>

        {/* Color bar */}
        <div
          className="h-1 w-full rounded-full opacity-40"
          style={{
            background: `linear-gradient(90deg, ${color}, ${withAlpha(color, 0.3)})`,
          }}
        />

        {/* Action */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full border-border/60 bg-muted/20 hover:bg-muted/50 hover:text-foreground"
        >
          <Link to={`/topics/${topic.id}`}>
            {t.topics.openDomain}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
