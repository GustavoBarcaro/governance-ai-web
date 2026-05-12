import { SendHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageComposerProps {
  onSend: (value: string) => void;
  isSending?: boolean;
  placeholder?: string;
}

export function MessageComposer({
  onSend,
  isSending = false,
  placeholder = "Ask about a regulation, request a compliance clarification, or explore a governance requirement.",
}: MessageComposerProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim() || isSending) return;
    onSend(value);
    setValue("");
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <Textarea
        className="min-h-[112px] resize-none rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm leading-6 placeholder:text-muted-foreground/40 focus-visible:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/30"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSend();
          }
        }}
      />
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-muted-foreground/50">
          ⌘↵ to send · AI governance advisor
        </p>
        <Button disabled={isSending || !value.trim()} onClick={handleSend} size="sm">
          {isSending ? "Sending..." : "Send"}
          <SendHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
