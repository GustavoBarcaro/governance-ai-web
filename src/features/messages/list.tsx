import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageBubble } from "@/features/messages/bubble";
import type { Message } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export function MessageList({
  messages,
  isLoading = false,
  className,
}: MessageListProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea
      viewportRef={viewportRef}
      className={cn(
        "min-h-[58vh] rounded-xl border border-border/60 bg-muted/10 p-4 md:min-h-[520px]",
        className,
      )}
    >
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-[75%] rounded-2xl" />
          <div className="flex justify-end">
            <Skeleton className="h-14 w-[60%] rounded-2xl" />
          </div>
          <Skeleton className="h-24 w-[80%] rounded-2xl" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-[45%] rounded-2xl" />
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex h-full min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-node-pulse" />
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              No messages yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground/40">
              Ask your first compliance question below.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
