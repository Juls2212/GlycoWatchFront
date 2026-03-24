import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "error" | "success";

interface AlertBannerProps {
  variant:    AlertVariant;
  message:    string;
  onDismiss?: () => void;
  className?: string;
}

const STYLES: Record<AlertVariant, { wrapper: string; icon: React.ElementType; iconClass: string }> = {
  error: {
    wrapper:   "bg-red-50 border-red-200 text-red-800",
    icon:      AlertCircle,
    iconClass: "text-red-500",
  },
  success: {
    wrapper:   "bg-green-50 border-green-200 text-green-800",
    icon:      CheckCircle2,
    iconClass: "text-green-500",
  },
};

export function AlertBanner({ variant, message, onDismiss, className }: AlertBannerProps) {
  const { wrapper, icon: Icon, iconClass } = STYLES[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3",
        "animate-slide-up",
        wrapper,
        className
      )}
    >
      <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", iconClass)} strokeWidth={2} />

      <p className="flex-1 text-[13px] font-medium leading-snug">{message}</p>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-current opacity-50 hover:opacity-80 transition-opacity"
          aria-label="Cerrar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}