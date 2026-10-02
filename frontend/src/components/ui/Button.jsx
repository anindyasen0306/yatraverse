import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger:
    "btn bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});