import { useQuery } from "@tanstack/react-query";
import { BookOpen, LogOut, Shield } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store";
import { authApi, api } from "@/shared/lib/api";
import { Button } from "@/components/ui/button";
import { withAlpha } from "@/shared/lib/color";
import { formatRelativeSessionDate } from "@/shared/lib/format";
import { cn } from "@/lib/utils";

export function AppShell() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: api.getTopics,
  });
  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: api.getSessions,
  });

  const topicsWithMeta = (topics ?? []).map((topic) => {
    const relatedSessions = (sessions ?? []).filter(
      (session) => session.topicId === topic.id,
    );
    const lastActivity = relatedSessions
      .map((session) => session.updatedAt)
      .sort(
        (left, right) => new Date(right).getTime() - new Date(left).getTime(),
      )[0];

    return {
      ...topic,
      sessionsCount: relatedSessions.length,
      lastActivity: lastActivity
        ? formatRelativeSessionDate(lastActivity)
        : "No sessions yet",
    };
  });

  const userInitial =
    user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen p-2.5 sm:p-3.5 md:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.25rem)] max-w-[1600px] gap-3 lg:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[256px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
          {/* Ambient teal glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

          <div className="relative flex flex-1 flex-col overflow-y-auto p-5">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                  Governance AI
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8">
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
                Navigation
              </p>
              <NavLink
                to="/topics"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )
                }
              >
                <BookOpen className="h-4 w-4" />
                All Domains
              </NavLink>
            </nav>

            {/* Active Frameworks */}
            {topicsWithMeta.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
                  Active Frameworks
                </p>
                <div className="space-y-0.5">
                  {topicsWithMeta.map((topic) => (
                    <Link
                      key={topic.id}
                      to={`/topics/${topic.id}`}
                      className="group flex items-center gap-3 rounded-lg p-2.5 transition-all hover:bg-muted/50"
                    >
                      <div
                        className="h-8 w-0.5 shrink-0 rounded-full opacity-80"
                        style={{ backgroundColor: topic.color ?? "#64748B" }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground/80 group-hover:text-foreground">
                          {topic.name}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground/70">
                          {topic.sessionsCount} sessions
                        </p>
                      </div>
                      <div
                        className="h-1.5 w-1.5 shrink-0 rounded-full opacity-50 group-hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: topic.color ?? "#64748B" }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* User card */}
            <div className="mt-6 rounded-xl border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 font-mono text-sm font-bold text-primary ring-1 ring-primary/20">
                  {userInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user?.name ?? "User"}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground/70">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                className="mt-3 w-full"
                variant="ghost"
                size="sm"
                onClick={async () => {
                  try {
                    await authApi.logout();
                  } catch {
                    clearSession();
                  }
                }}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-h-[calc(100vh-3rem)] rounded-2xl border border-border/50 bg-card/50 p-4 shadow-soft backdrop-blur-sm sm:p-5 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
