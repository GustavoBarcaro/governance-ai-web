import { ArrowUpRight, Clock3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { formatRelativeSessionDate } from "@/shared/lib/format";
import { useT, useLang, localeMap } from "@/shared/lib/i18n";
import type { StudySession } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

interface SessionListProps {
  sessions: StudySession[];
  onDelete?: (session: StudySession) => void;
  deletingSessionId?: string | null;
}

export function SessionList({
  sessions,
  onDelete,
  deletingSessionId,
}: SessionListProps) {
  const t = useT();
  const lang = useLang();
  const locale = localeMap[lang] ?? "en-US";
  return (
    <div className="divide-y divide-border/40">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={cn(
            "flex items-center gap-4 py-3 transition-colors",
            "hover:bg-muted/20 -mx-4 px-4 rounded-lg",
          )}
        >
          {/* Status dot */}
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {session.title}
            </p>
            <div className="mt-0.5 flex items-center gap-1.5 text-muted-foreground/60">
              <Clock3 className="h-3 w-3 shrink-0" />
              <span className="font-mono text-[11px]">
                {formatRelativeSessionDate(session.updatedAt, locale)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
              <Link to={`/sessions/${session.id}`}>
                {t.sessionLibrary.open}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground/40 hover:text-destructive"
                onClick={() => onDelete(session)}
                disabled={deletingSessionId === session.id}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
