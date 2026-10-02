import { cn } from "@/utils/cn";

const VARIANTS = {
  default: "bg-slate-100 text-slate-700",
  primary: "bg-primary-50 text-primary-700",
  accent: "bg-accent-50 text-accent-700",
  success: "bg-emerald-50 text-emerald-700",
  danger: "bg-rose-50 text-rose-700",
};

export function Badge({ variant = "default", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}