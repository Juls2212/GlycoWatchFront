"use client";

import { useEffect } from "react";
import { KpiRow }               from "@/features/dashboard/components/KpiRow";
import { GlucoseChart }         from "@/features/dashboard/components/GlucoseChart";
import { LiveMeasurementCard }  from "@/features/dashboard/components/LiveMeasurementCard";
import { RecentAlertsWidget }   from "@/features/dashboard/components/RecentAlertsWidget";
import { RiskPredictionWidget } from "@/features/dashboard/components/RiskPredictionWidget";
import { useLayoutContext }     from "@/components/layout/DashboardLayout";
import { useLatestMeasurement } from "@/features/measurements/hooks/useLatestMeasurement";

export default function DashboardPage() {
  const { setLastUpdated, setIsRefreshing } = useLayoutContext();
  const { data: latest, isFetching }        = useLatestMeasurement();

  // Sync latest timestamp → header "last updated" pill
  useEffect(() => {
    if (latest?.measuredAt) setLastUpdated(latest.measuredAt);
  }, [latest?.measuredAt, setLastUpdated]);

  // Sync fetch state → header refresh spinner
  useEffect(() => {
    setIsRefreshing(isFetching);
  }, [isFetching, setIsRefreshing]);

  return (
    <div className="space-y-5">

      {/* ── Greeting ─────────────────────────────────────────────────── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">
            Panel de control
          </h1>
          <p className="text-[13px] text-zinc-400 mt-0.5 font-medium">
            Monitoreo glucémico en tiempo real · últimas 24 horas
          </p>
        </div>

        {/* Status badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 glucose-dot-live" />
          <span className="text-[11px] font-semibold text-emerald-700">
            Sistema activo
          </span>
        </div>
      </div>

      {/* ── KPI row ───────────────────────────────────────────────────── */}
      <KpiRow />

      {/* ── Chart + Live reading ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_284px] gap-5">
        <GlucoseChart />
        <LiveMeasurementCard />
      </div>

      {/* ── Alerts + AI Risk ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_300px] gap-5">
        <RecentAlertsWidget />
        <RiskPredictionWidget />
      </div>

    </div>
  );
}