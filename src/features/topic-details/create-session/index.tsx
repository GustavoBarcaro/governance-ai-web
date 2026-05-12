import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InlineError } from "@/shared/components/common/inline-error";
import { SurfaceCard } from "@/shared/components/common/surface/card";

interface CreateSessionCardProps {
  title: string;
  isPending: boolean;
  errorMessage?: string;
  onTitleChange: (value: string) => void;
  onCreate: () => void;
}

export function CreateSessionCard({
  title,
  isPending,
  errorMessage,
  onTitleChange,
  onCreate,
}: CreateSessionCardProps) {
  return (
    <SurfaceCard className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-node-pulse" />
          <CardTitle className="text-base font-semibold">
            New consultation
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="What do you want to consult about?"
          onKeyDown={(e) => {
            if (e.key === "Enter" && title.trim() && !isPending) {
              onCreate();
            }
          }}
        />
        <Button
          className="w-full"
          disabled={!title.trim() || isPending}
          onClick={onCreate}
        >
          <PlusCircle className="h-4 w-4" />
          {isPending ? "Creating..." : "Start consultation"}
        </Button>
        <InlineError message={errorMessage} />
      </CardContent>
    </SurfaceCard>
  );
}
