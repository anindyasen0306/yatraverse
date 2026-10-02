import { cn } from "@/utils/cn";

export function Skeleton({ className }) {
  return <div className={cn("skeleton h-4 w-full", className)} />;
}

export function DestinationCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}