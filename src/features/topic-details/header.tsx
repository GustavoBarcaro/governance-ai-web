import { Trash2 } from "lucide-react";

import { BackLink } from "@/shared/components/common/back-link";
import { Button } from "@/components/ui/button";
import { useT } from "@/shared/lib/i18n";

interface TopicDetailsHeaderProps {
  topicName: string;
  onDelete: () => void;
}

export function TopicDetailsHeader({
  topicName,
  onDelete,
}: TopicDetailsHeaderProps) {
  const t = useT();
  return (
    <div className="flex-1 space-y-3">
      <BackLink to="/topics" label={t.backLinks.backToDomains} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
            {t.topicDetails.overline}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {topicName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {t.topicDetails.subtitle}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 border-border/60 text-muted-foreground/60 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {t.topics.deleteDomainConfirm}
        </Button>
      </div>
    </div>
  );
}
