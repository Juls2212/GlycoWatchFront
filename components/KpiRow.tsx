"use client";

import { Activity, Gauge, Target, BarChart2 } from "lucide-react";
import { KpiCard, type TrendDir } from "./KpiCard";
import { useDashboardAnalytics } from "../hooks/useDashboardAnalytics";

export function KpiRow() {
  const { data, isLoading } = useDashboardAnalytics(7);

  const timeInRangeVariant =
    !data              ? "default" :
    data.timeInRange >= 70 ? "success" :
    data.timeInRange >= 50 ? "warning" : "danger";

  const stdDevVariant =
    !data           ? "default" :
    data.stdDev <= 30 ? "success" :
    data.stdDev <= 50 ? "warning" : "danger";

  const timeInRangeTrend: TrendDir | undefined =
    !data              ? undefined :
    data.timeInRange >= 70 ? "stable" : "up";

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 stagger">
      <KpiCard
        label="Promedio 7d"
        value={data?.stdDev !== undefined ? data.stdDev.toFixed(1) : "—"}
        unit="mg/dL"
        icon={Activity}
        variant="primary"
        isLoading={isLoading}
      />

      <KpiCard
        label="Mín / Máx"
        value={data ? `${data.min} · ${data.max}` : "—"}
        unit="mg/dL"
        icon={Gauge}
        variant="default"
        isLoading={isLoading}
      />

      <KpiCard
        label="Tiempo en rango"
        value={data ? `${Math.round(data.timeInRange)}` : "—"}
        unit="%"
        icon={Target}
        variant={timeInRangeVariant}
        trend={timeInRangeTrend}
        trendLabel={
          data
            ? data.timeInRange >= 70
              ? "Objetivo alcanzado"
              : "Bajo el objetivo"
            : undefined
        }
        isLoading={isLoading}
      />

      <KpiCard
        label="Variabilidad (DS)"
        value={data?.stdDev !== undefined ? data.stdDev.toFixed(1) : "—"}
        unit="mg/dL"
        icon={BarChart2}
        variant={stdDevVariant}
        trend={data ? (data.stdDev <= 30 ? "stable" : "down") : undefined}
        trendLabel={
          data
            ? data.stdDev <= 30 ? "Variabilidad baja" : "Alta variabilidad"
            : undefined
        }
        isLoading={isLoading}
      />
    </div>
  );
}