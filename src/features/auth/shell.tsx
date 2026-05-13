import type { PropsWithChildren } from "react";
import { Shield } from "lucide-react";

import { LangToggle } from "@/shared/components/common/lang-toggle";
import { useT } from "@/shared/lib/i18n";

export function AuthShell({ children }: PropsWithChildren) {
  const t = useT();
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
      {/* Left panel — Command Center Hero */}
      <section className="relative hidden overflow-hidden bg-card lg:flex lg:flex-col lg:justify-between p-10">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(hsla(215, 38%, 65%, 0.03) 1px, transparent 1px), linear-gradient(90deg, hsla(215, 38%, 65%, 0.03) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="absolute -left-20 -top-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-24 right-8 h-72 w-72 rounded-full bg-accent/6 blur-3xl" />
          <div
            className="absolute left-0 right-0 top-[46%] h-px opacity-[0.07]"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(173, 82%, 44%), transparent)",
            }}
          />
        </div>

        {/* Brand bar */}
        <div className="relative flex items-center justify-between gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Governance AI
          </p>
          <LangToggle />
        </div>

        {/* Hero content */}
        <div className="relative space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-xs text-primary/80">
                {t.authShell.badge}
              </span>
            </div>

            <h1 className="font-serif text-6xl font-semibold leading-[1.05] tracking-tight text-foreground">
              {t.authShell.heroLine1}
              <br />
              {t.authShell.heroLine2}
              <br />
              <span className="text-primary">{t.authShell.heroLine3}</span>
              <br />
              {t.authShell.heroLine4}
            </h1>

            <p className="max-w-[22rem] text-base leading-relaxed text-muted-foreground">
              {t.authShell.tagline}
            </p>
          </div>

          <div className="space-y-3">
            {t.authShell.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-foreground/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-3">
          {[
            { value: "50+", label: t.authShell.stats.frameworks },
            { value: "AI", label: t.authShell.stats.powered },
            { value: "24/7", label: t.authShell.stats.advisory },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-border/40 bg-muted/25 p-4 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-foreground">
                {value}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Right panel — Auth form */}
      <section className="relative flex items-center justify-center bg-background p-6 lg:p-10">
        <div className="absolute right-6 top-6 lg:hidden">
          <LangToggle />
        </div>
        {children}
      </section>
    </div>
  );
}
