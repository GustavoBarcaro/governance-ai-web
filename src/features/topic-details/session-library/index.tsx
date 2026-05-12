import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionList } from "@/features/sessions/list";
import { SurfaceCard } from "@/shared/components/common/surface/card";
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
  return (
    <SurfaceCard>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-serif text-xl font-semibold">
            Consultation history
          </CardTitle>
          <span className="font-mono text-xs text-muted-foreground/60">
            {sessions.length} session{sessions.length !== 1 ? "s" : ""}
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
              No consultations yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground/40">
              Start a consultation above to begin.
            </p>
          </div>
        )}
      </CardContent>
    </SurfaceCard>
  );
}
