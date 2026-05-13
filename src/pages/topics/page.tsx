import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { TopicColorPicker } from "@/features/topics/color/picker";
import { TopicCard } from "@/features/topics/card";
import { DeleteConfirmDialog } from "@/shared/components/common/delete-confirm/dialog";
import { InlineError } from "@/shared/components/common/inline-error";
import { PageLoading } from "@/shared/components/common/page/loading";
import { Button } from "@/components/ui/button";
import { api } from "@/shared/lib/api";
import {
  isValidHexColor,
  normalizeHexColor,
  withAlpha,
} from "@/shared/lib/color";
import { formatRelativeSessionDate } from "@/shared/lib/format";
import { useT, useLang, localeMap } from "@/shared/lib/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Topic } from "@/shared/types/domain";

export function TopicsPage() {
  const t = useT();
  const lang = useLang();
  const locale = localeMap[lang] ?? "en-US";
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0EA5E9");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const topicNameInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const {
    data: topics = [],
    isPending: isTopicsPending,
    error: topicsError,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: api.getTopics,
  });
  const {
    data: sessions = [],
    isPending: isSessionsPending,
    error: sessionsError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: api.getSessions,
  });
  const createTopicMutation = useMutation({
    mutationFn: api.createTopic,
    onSuccess: async () => {
      setName("");
      setColor("#0EA5E9");
      setIsFormOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
  const deleteTopicMutation = useMutation({
    mutationFn: api.deleteTopic,
    onSuccess: async () => {
      setTopicToDelete(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["topics"] }),
        queryClient.invalidateQueries({ queryKey: ["sessions"] }),
      ]);
    },
  });

  const topicsWithMeta = topics.map((topic) => {
    const relatedSessions = sessions.filter(
      (session) => session.topicId === topic.id,
    );
    const lastActivity = relatedSessions
      .map((session) => session.updatedAt)
      .sort(
        (left, right) => new Date(right).getTime() - new Date(left).getTime(),
      )[0];

    return {
      topic,
      sessionsCount: relatedSessions.length,
      lastActivity: lastActivity
        ? formatRelativeSessionDate(lastActivity, locale)
        : t.topics.noConsultationsYet,
    };
  });

  useEffect(() => {
    if (searchParams.get("create") !== "1") return;

    setIsFormOpen(true);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("create");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!isFormOpen) return;
    const id = setTimeout(() => {
      topicNameInputRef.current?.focus();
    }, 50);
    return () => clearTimeout(id);
  }, [isFormOpen]);

  if (isTopicsPending || isSessionsPending) {
    return <PageLoading titleWidth="w-96" />;
  }

  if (topicsError || sessionsError) {
    return <InlineError message={(topicsError ?? sessionsError)?.message} />;
  }

  const normalizedColor = isValidHexColor(color)
    ? normalizeHexColor(color)
    : color;
  const canCreate =
    Boolean(name.trim()) &&
    isValidHexColor(color) &&
    !createTopicMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground/50">
            {t.topics.overline}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-foreground">
            {topicsWithMeta.length > 0
              ? t.topics.titleHasDomains
              : t.topics.titleEmpty}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            {topicsWithMeta.length > 0
              ? t.topics.descriptionHasDomains
              : t.topics.descriptionEmpty}
          </p>
        </div>
        <Button
          variant={isFormOpen ? "outline" : "default"}
          className="shrink-0"
          onClick={() => setIsFormOpen((v) => !v)}
        >
          {isFormOpen ? (
            <>
              <X className="h-4 w-4" />
              {t.topics.cancel}
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              {t.topics.addDomain}
            </>
          )}
        </Button>
      </div>

      {/* Collapsible create form */}
      {isFormOpen && (
        <div
          className="animate-fade-in-up rounded-xl border border-border/60 bg-card p-5 shadow-card"
          style={{
            background: `linear-gradient(135deg, ${withAlpha(normalizedColor, 0.08)}, rgba(11, 21, 38, 0.97))`,
          }}
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">
            {t.topics.newDomain}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.topics.newDomainDesc}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="topic-name">{t.topics.domainNameLabel}</Label>
              <Input
                id="topic-name"
                ref={topicNameInputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.topics.domainNamePlaceholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canCreate) {
                    createTopicMutation.mutate({
                      name: name.trim(),
                      color: normalizeHexColor(color),
                    });
                  }
                }}
              />
            </div>
            <TopicColorPicker color={color} onChange={setColor} />
          </div>

          <Separator className="my-5 opacity-40" />

          <div className="flex items-center gap-3">
            <Button
              disabled={!canCreate}
              onClick={() =>
                createTopicMutation.mutate({
                  name: name.trim(),
                  color: normalizeHexColor(color),
                })
              }
            >
              <PlusCircle className="h-4 w-4" />
              {createTopicMutation.isPending ? t.topics.creating : t.topics.createDomain}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsFormOpen(false);
                setName("");
                setColor("#0EA5E9");
              }}
            >
              {t.topics.cancel}
            </Button>
          </div>

          {!isValidHexColor(color) && (
            <InlineError
              className="mt-2"
              message={t.topics.colorError}
            />
          )}
          <InlineError
            className="mt-2"
            message={createTopicMutation.error?.message}
          />
        </div>
      )}

      {/* Topics grid */}
      {topicsWithMeta.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {topicsWithMeta.map(({ topic, sessionsCount, lastActivity }) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              sessionsCount={sessionsCount}
              lastActivity={lastActivity}
              onDelete={(t) => setTopicToDelete(t)}
              isDeleting={
                deleteTopicMutation.isPending && topicToDelete?.id === topic.id
              }
            />
          ))}
        </div>
      ) : !isFormOpen ? (
        <div className="rounded-xl border border-dashed border-border/40 bg-card/30 p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <p className="mt-4 font-serif text-lg font-medium text-foreground">
            {t.topics.noDomainsTitle}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.topics.noDomainsDesc}
          </p>
          <Button
            className="mt-5"
            onClick={() => setIsFormOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            {t.topics.addFirstDomain}
          </Button>
        </div>
      ) : null}

      <DeleteConfirmDialog
        open={Boolean(topicToDelete)}
        onOpenChange={(open) => {
          if (!open) setTopicToDelete(null);
        }}
        title={t.topics.deleteDomainTitle}
        description={
          topicToDelete
            ? t.topicDetails.deleteTopicDesc(topicToDelete.name)
            : ""
        }
        confirmLabel={t.topics.deleteDomainConfirm}
        isPending={deleteTopicMutation.isPending}
        onConfirm={() => {
          if (topicToDelete) {
            deleteTopicMutation.mutate(topicToDelete.id);
          }
        }}
      />
    </div>
  );
}
