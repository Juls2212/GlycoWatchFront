import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

export type TrendDir = "up" | "down" | "stable";

type KpiVariant = "default" | "primary" | "success" | "warning" | "danger";

interface KpiCardProps {
  label:       string;
  value:       string;
  unit?:       string;
  icon:        LucideIcon;
  variant?:    KpiVariant;
  trend?:      TrendDir;
  trendLabel?: string;
  isLoading?:  boolean;
}

const VARIANT: Record<KpiVariant, { iconBg: string; iconColor: string; accent: string }> = {
  default: { iconBg: "bg-zinc-100",      iconColor: "text-zinc-500",      accent: "bg-zinc-500"     },
  primary: { iconBg: "bg-primary-50",    iconColor: "text-primary-600",   accent: "bg-primary-500"  },
  success: { iconBg: "bg-emerald-50",    iconColor: "text-emerald-600",   accent: "bg-emerald-500"  },
  warning: { iconBg: "bg-amber-50",      iconColor: "text-amber-600",     accent: "bg-amber-500"    },
  danger:  { iconBg: "bg-primary-50",    iconColor: "text-primary-600",   accent: "bg-primary-500"  },
};

const TREND_MAP: Record<TrendDir, {
  Icon:  React.ElementType;
  color: string;
  defaultLabel: string;
}> = {
  up:     { Icon: TrendingUp,   color: "text-primary-500",  defaultLabel: "Subiendo" },
  down:   { Icon: TrendingDown, color: "text-emerald-500",  defaultLabel: "Bajando"  },
  stable: { Icon: Minus,        color: "text-zinc-400",     defaultLabel: "Estable"  },
};

export function KpiCard({
  label,
  value,
  unit,
  icon: Icon,
  variant   = "default",
  trend,
  trendLabel,
  isLoading = false,
}: KpiCardProps) {
  const v = VARIANT[variant];

  return (
    <div className="bg-white rounded-[14px] border border-[#E9E9EC] shadow-[0_1px_2px_0_rgb(0,0,0,0.04)] p-5">
      {/* Top: label + icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
          {label}
        </span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", v.iconBg)}>
          <Icon className={cn("w-[17px] h-[17px]", v.iconColor)} strokeWidth={2} />
        </div>
      </div>

      {/* Value */}
      {isLoading ? (
        <div className="space-y-2 mt-1">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-1.5 tabular-nums">
            <span className="text-[30px] font-bold text-zinc-900 leading-none tracking-tight">
              {value}
            </span>
            {unit && (
              <span className="text-[13px] font-medium text-zinc-400 leading-none">{unit}</span>
            )}
          </div>

          {/* Trend */}
          {trend && (() => {
            const t = TREND_MAP[trend];
            return (
              <div className={cn("flex items-center gap-1.5 mt-2", t.color)}>
                <t.Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold">
                  {trendLabel ?? t.defaultLabel}
                </span>
              </div>
            );
          })()}
        </>
      )}

      {/* Bottom accent line */}
      <div className={cn("h-0.5 rounded-full mt-4 opacity-40", v.accent)} />
    </div>
  );
}