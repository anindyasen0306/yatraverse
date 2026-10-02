import { DESTINATION_CATEGORIES } from "@/config/constants";
import { cn } from "@/utils/cn";

export function CategoryPills({ active, onChange, className }) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      <Pill active={active === "all"} onClick={() => onChange("all")}>
        All
      </Pill>
      {DESTINATION_CATEGORIES.map((c) => (
        <Pill key={c.value} active={active === c.value} onClick={() => onChange(c.value)}>
          {c.label}
        </Pill>
      ))}
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition",
        active
          ? "border-primary-600 bg-primary-600 text-white shadow-sm"
          : "border-surface-border bg-white text-ink-muted hover:border-primary-300 hover:text-primary-700 dark:border-slate-800 dark:bg-slate-900"
      )}
    >
      {children}
    </button>
  );
}