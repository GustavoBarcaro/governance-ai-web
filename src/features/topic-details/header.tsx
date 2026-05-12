import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/shared/components/common/page/header";

interface TopicDetailsHeaderProps {
  topicName: string;
  onDelete: () => void;
}

export function TopicDetailsHeader({
  topicName,
  onDelete,
}: TopicDetailsHeaderProps) {
  return (
    <PageHeader
      className="flex-1"
      backLink={{ to: "/topics", label: "Back to domains" }}
      title={topicName}
      titleClassName="text-3xl sm:text-4xl"
      description={
        <p className="max-w-2xl">
          Open consultations, review your compliance progress, and build a governance roadmap for this domain.
        </p>
      }
      actions={
        <Button variant="outline" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          Delete domain
        </Button>
      }
    />
  );
}
