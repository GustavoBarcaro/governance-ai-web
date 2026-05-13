import { MarkdownContent } from "@/shared/components/common/markdown/content";
import type { Message } from "@/shared/types/domain";
import { formatMessageTime } from "@/shared/lib/format";
import { useT, useLang, localeMap } from "@/shared/lib/i18n";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const t = useT();
  const lang = useLang();
  const locale = localeMap[lang] ?? "en-US";
  const isAssistant = message.role === "assistant";
  const isPending = Boolean(message.isPending);

  return (
    <div className={cn("flex", isAssistant ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-4 py-3",
          isAssistant
            ? "border border-border/60 bg-card/80 text-foreground shadow-card"
            : "bg-primary text-primary-foreground shadow-md",
        )}
      >
        {isAssistant ? (
          isPending ? (
            <div className="flex items-center gap-2.5 py-1">
              <span className="inline-flex gap-1.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {t.messages.processing}
              </span>
            </div>
          ) : (
            <MarkdownContent
              content={message.content}
              className="text-foreground"
            />
          )
        ) : (
          <MarkdownContent
            content={message.content}
            inverted
            className="text-primary-foreground"
          />
        )}
        <p
          className={cn(
            "mt-2 font-mono text-[10px]",
            isAssistant
              ? "text-muted-foreground/60"
              : "text-primary-foreground/60",
          )}
        >
          {isPending ? t.messages.justNow : formatMessageTime(message.createdAt, locale)}
        </p>
      </div>
    </div>
  );
}
