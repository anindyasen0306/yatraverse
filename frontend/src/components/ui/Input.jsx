import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Input = forwardRef(function Input(
  { label, error, hint, className, id, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn("input", error && "border-rose-400 focus:ring-rose-400/20", className)}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-ink-subtle">{hint}</p>}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
});