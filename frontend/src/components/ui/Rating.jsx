import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

export function Rating({ value = 0, count, size = "sm", className }) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Star className={cn(starSize, "fill-accent-400 text-accent-400")} />
      <span className="text-sm font-semibold text-ink">{value.toFixed(1)}</span>
      {count != null && <span className="text-xs text-ink-subtle">({count})</span>}
    </div>
  );
}