import { forwardRef, useState, type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: LucideIcon;
  className?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon: LeftIcon,
      type = "text",
      className,
      wrapperClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <LeftIcon
                className={cn(
                  "w-4 h-4",
                  hasError ? "text-red-400" : "text-slate-400"
                )}
              />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                ? `${inputId}-hint`
                : undefined
            }
            className={cn(
              "w-full rounded-lg border bg-white text-slate-900 text-sm",
              "placeholder:text-slate-400",
              "transition-all duration-150 outline-none",

              // Padding fix
              "py-2.5",
              LeftIcon ? "pl-10 pr-3" : "px-3.5",
              isPassword ? "pr-10" : "",

              // Normal
              !hasError &&
                !disabled &&
                "border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 hover:border-slate-300",

              // Error
              hasError &&
                "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20",

              // Disabled
              disabled &&
                "bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200",

              className
            )}
            {...props}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-red-600 font-medium"
          >
            {error}
          </p>
        )}

        {/* Hint */}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-slate-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";