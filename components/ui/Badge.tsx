import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "ghost";
type BadgeSize    = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?:    BadgeSize;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: "bg-surface-100 text-text-secondary border-surface-200",
  primary: "bg-primary-50  text-primary-700  border-primary-200",
  success: "bg-green-50    text-green-700    border-green-200",
  warning: "bg-amber-50    text-amber-700    border-amber-200",
  danger:  "bg-red-50      text-red-700      border-red-200",
  ghost:   "bg-transparent text-text-secondary border-transparent",
};

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px] font-semibold",
  md: "px-2.5 py-1   text-xs     font-medium",
};

export function Badge({
  children,
  variant   = "default",
  size      = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border leading-none",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
    >
      {children}
    </span>
  );
}