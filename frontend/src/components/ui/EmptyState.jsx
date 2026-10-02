import { cn } from "@/utils/cn";

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {Icon && (
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}