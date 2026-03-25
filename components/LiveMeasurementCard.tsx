"use client";

import { Activity, Clock, WifiOff } from "lucide-react";
import { cn, formatRelative } from "@/lib/utils";
import { classifyGlucose } from "@/types/measurement.types";
import { GLUCOSE_DEFAULTS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLatestMeasurement } from "@/features/measurements/hooks/useLatestMeasurement";

// ─── Level config ─────────────────────────────────────────────────────────────
const LEVEL_CONFIG = {
  low: {
    label:     "Hipoglucemia",
    outerBg:   "bg-blue-50 border-blue-100",
    innerBg:   "bg-blue-100/60",
    valueColor:"text-blue-700",
    dotColor:  "text-blue-500",
    badge:     "bg-blue-100 text-blue-700",
  },
  normal: {
    label:     "En rango",
    outerBg:   "bg-emerald-50 border-emerald-100",
    innerBg:   "bg-emerald-100/60",
    valueColor:"text-emerald-700",
    dotColor:  "text-emerald-500",
    badge:     "bg-emerald-100 text-emerald-700",
  },
  high: {
    label:     "Hiperglucemia",
    outerBg:   "bg-amber-50 border-amber-100",
    innerBg:   "bg-amber-100/60",
    valueColor:"text-amber-700",
    dotColor:  "text-amber-500",
    badge:     "bg-amber-100 text-amber-700",
  },
  critical: {
    label:     "Nivel crítico",
    outerBg:   "bg-primary-50 border-primary-100",
    innerBg:   "bg-primary-100/60",
    valueColor:"text-primary-700",
    dotColor:  "text-primary-500",
    badge:     "bg-primary-100 text-primary-700",
  },
} as const;

export function LiveMeasurementCard() {
  const { data, isLoading, isError } = useLatestMeasurement();

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="bg-white rounded-[14px] border border-[#E9E9EC] shadow-[0_1px_2px_0_rgb(0,0,0,0.04)] p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-14 w-44" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    );
  }

  // ── Error / no device ──
  if (isError || !data) {
    return (
      <div className="bg-white rounded-[14px] border border-dashed border-zinc-200 p-6 flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
          <WifiOff className="w-5 h-5 text-zinc-400" />
        </div>
        <div className="text-center">
          <p className="text-[13px] font-medium text-zinc-600">Sin lecturas recientes</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Verifica que tu ESP32 esté activo
          </p>
        </div>
      </div>
    );
  }

  const level  = classifyGlucose(
    data.glucoseValue,
    GLUCOSE_DEFAULTS.HYPO_THRESHOLD,
    GLUCOSE_DEFAULTS.HYPER_THRESHOLD
  );
  const config = LEVEL_CONFIG[level];

  return (
    <div className={cn(
      "rounded-[14px] border p-6 flex flex-col gap-4",
      config.outerBg
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", config.innerBg)}>
            <Activity className={cn("w-3.5 h-3.5", config.valueColor)} strokeWidth={2.2} />
          </div>
          <span className="text-[13px] font-semibold text-zinc-700">
            Última medición
          </span>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-full">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full glucose-dot-live",
            config.dotColor
          )} />
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* Big value */}
      <div>
        <div className="flex items-baseline gap-2 tabular-nums">
          <span className={cn(
            "text-[56px] font-bold leading-none tracking-tighter",
            config.valueColor
          )}>
            {data.glucoseValue.toFixed(1)}
          </span>
          <span className="text-[15px] font-medium text-zinc-400 pb-1">mg/dL</span>
        </div>
      </div>

      {/* Footer: badge + time */}
      <div className="flex items-center justify-between">
        <span className={cn(
          "text-[11px] font-bold px-2.5 py-1 rounded-full",
          config.badge
        )}>
          {config.label}
        </span>
        <div className="flex items-center gap-1 text-zinc-400">
          <Clock className="w-3 h-3" />
          <span className="text-[11px]">{formatRelative(data.measuredAt)}</span>
        </div>
      </div>
    </div>
  );
}