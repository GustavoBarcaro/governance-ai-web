import { useLangStore } from "@/shared/lib/i18n";
import { cn } from "@/lib/utils";

interface LangToggleProps {
  className?: string;
}

export function LangToggle({ className }: LangToggleProps) {
  const lang = useLangStore((state) => state.lang);
  const setLang = useLangStore((state) => state.setLang);

  return (
    <div
      className={cn(
        "inline-flex rounded-lg border border-border/50 bg-muted/20 p-0.5",
        className,
      )}
    >
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={cn(
            "rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all",
            lang === l
              ? "bg-primary/15 text-primary ring-1 ring-primary/25"
              : "text-muted-foreground/60 hover:text-muted-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
