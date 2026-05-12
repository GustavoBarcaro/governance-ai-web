import { Skeleton } from "@/components/ui/skeleton";

interface PageLoadingProps {
  titleWidth?: string;
  lines?: number;
}

export function PageLoading({
  titleWidth = "w-72",
  lines = 3,
}: PageLoadingProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className={`h-10 ${titleWidth}`} />
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full max-w-2xl" />
        ))}
      </div>
      <div className="grid gap-3">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-52 w-full rounded-xl" />
      </div>
    </div>
  );
}
