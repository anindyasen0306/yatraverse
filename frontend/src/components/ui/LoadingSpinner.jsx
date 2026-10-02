import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export function LoadingSpinner({ size = "md", className, label }) {
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-primary-600", sizes[size])} />
      {label && <p className="text-sm text-ink-muted">{label}</p>}
    </div>
  );
}