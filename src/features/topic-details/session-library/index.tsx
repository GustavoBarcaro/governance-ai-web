import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionList } from "@/features/sessions/list";
import { SurfaceCard } from "@/shared/components/common/surface/card";
import { useT } from "@/shared/lib/i18n";
import type { StudySession } from "@/shared/types/domain";

interface SessionLibraryCardProps {
  sessions: StudySession[];
  deletingSessionId?: string | null;
  onDelete: (session: StudySession) => void;
}

export function SessionLibraryCard({
  sessions,
  deletingSessionId,
  onDelete,
}: SessionLibraryCardProps) {
  const t = useT();
  const countLabel =
    sessions.length === 1
      ? `1 ${t.sessionLibrary.session}`
      : `${sessions.length} ${t.sessionLibrary.sessions}`;

  return (
    <SurfaceCard>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-serif text-xl font-semibold">
            {t.sessionLibrary.title}
          </CardTitle>
          <span className="font-mono text-xs text-muted-foreground/60">
            {countLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {sessions.length > 0 ? (
          <SessionList
            sessions={sessions}
            onDelete={onDelete}
            deletingSessionId={deletingSessionId}
          />
        ) : (
          <div className="py-6 text-center">
            <p className="font-mono text-xs text-muted-foreground/50">
              {t.sessionLibrary.noConsultations}
            </p>
            <p className="mt-1 text-sm text-muted-foreground/40">
              {t.sessionLibrary.startAbove}
            </p>
          </div>
        )}
      </CardContent>
    </SurfaceCard>
  );
}
