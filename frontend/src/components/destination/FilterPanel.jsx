import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui";
import { DESTINATION_CATEGORIES, SORT_OPTIONS } from "@/config/constants";
import { cn } from "@/utils/cn";

const DURATIONS = [
  { value: "all", label: "Any" },
  { value: "1-3", label: "1–3 days" },
  { value: "4-5", label: "4–5 days" },
  { value: "6-10", label: "6–10 days" },
];

const BUDGETS = [
  { value: null, label: "Any" },
  { value: 15000, label: "Under ₹15k" },
  { value: 25000, label: "Under ₹25k" },
  { value: 40000, label: "Under ₹40k" },
];

export function FilterPanel({ filters, onChange, onReset, className }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className={cn("card p-5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-sm font-bold text-ink">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-medium text-primary-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mt-6">
        <h4 className="label">Category</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <FilterChip
            active={filters.category === "all"}
            onClick={() => set("category", "all")}
          >
            All
          </FilterChip>
          {DESTINATION_CATEGORIES.map((c) => (
            <FilterChip
              key={c.value}
              active={filters.category === c.value}
              onClick={() => set("category", c.value)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mt-6">
        <h4 className="label">Duration</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {DURATIONS.map((d) => (
            <FilterChip
              key={d.value}
              active={filters.duration === d.value}
              onClick={() => set("duration", d.value)}
            >
              {d.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mt-6">
        <h4 className="label">Budget</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {BUDGETS.map((b, i) => (
            <FilterChip
              key={i}
              active={filters.budgetMax === b.value}
              onClick={() => set("budgetMax", b.value)}
            >
              {b.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mt-6">
        <h4 className="label">Minimum rating</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[0, 4, 4.5, 4.7].map((r) => (
            <FilterChip
              key={r}
              active={filters.minRating === r}
              onClick={() => set("minRating", r)}
            >
              {r === 0 ? "Any" : `${r}+`}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mt-6">
        <h4 className="label">Sort by</h4>
        <select
          value={filters.sort}
          onChange={(e) => set("sort", e.target.value)}
          className="input mt-2"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

function FilterChip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300"
          : "border-surface-border bg-white text-ink-muted hover:border-primary-300 hover:text-primary-700 dark:border-slate-800 dark:bg-slate-900"
      )}
    >
      {children}
    </button>
  );
}

export function MobileFilterBar({ activeCount, onOpen }) {
  return (
    <Button variant="secondary" onClick={onOpen} className="lg:hidden">
      <SlidersHorizontal className="h-4 w-4" />
      Filters {activeCount > 0 && `(${activeCount})`}
    </Button>
  );
}