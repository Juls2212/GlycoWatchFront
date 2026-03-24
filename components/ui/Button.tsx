import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  loading?:  boolean;
  fullWidth?: boolean;
  leftIcon?:  React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-600 text-white border-transparent",
    "hover:bg-primary-700 active:bg-primary-800",
    "shadow-sm shadow-primary-600/20",
    "disabled:bg-primary-300 disabled:shadow-none",
  ].join(" "),

  secondary: [
    "bg-white text-slate-700 border-slate-200",
    "hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100",
    "shadow-sm",
    "disabled:bg-slate-50 disabled:text-slate-400",
  ].join(" "),

  ghost: [
    "bg-transparent text-slate-600 border-transparent",
    "hover:bg-slate-100 active:bg-slate-200",
    "disabled:text-slate-400",
  ].join(" "),

  danger: [
    "bg-red-600 text-white border-transparent",
    "hover:bg-red-700 active:bg-red-800",
    "shadow-sm shadow-red-600/20",
    "disabled:bg-red-300",
  ].join(" "),
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8  px-3   text-[13px] gap-1.5 rounded-md",
  md: "h-10 px-4   text-[14px] gap-2   rounded-lg",
  lg: "h-12 px-5   text-[15px] gap-2   rounded-xl font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "primary",
      size      = "md",
      loading   = false,
      fullWidth = false,
      leftIcon,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          // Base
          "inline-flex items-center justify-center",
          "border font-medium",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          "select-none",
          "cursor-pointer disabled:cursor-not-allowed",

          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>
        ) : null}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";