"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { GLUCOSE_DEFAULTS } from "@/lib/constants";
import { useMeasurementsList } from "@/features/measurements/hooks/useMeasurementsList";
import type { MeasurementDTO } from "@/types/measurement.types";

// ─── Range tabs ───────────────────────────────────────────────────────────────
const RANGES = [
  { label: "Hoy",  days: 1  },
  { label: "7d",   days: 7  },
  { label: "30d",  days: 30 },
] as const;

type RangeDays = (typeof RANGES)[number]["days"];

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function GlucoseTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length || !label) return null;
  const value = payload[0]?.value as number | undefined;
  if (value === undefined) return null;

  const isLow  = value < GLUCOSE_DEFAULTS.HYPO_THRESHOLD;
  const isHigh = value > GLUCOSE_DEFAULTS.HYPER_THRESHOLD;
  const color  = isLow ? "#3B82F6" : isHigh ? "#D97706" : "#16A34A";

  return (
    <div className="bg-white border border-[#E9E9EC] rounded-xl shadow-[0_4px_12px_0_rgb(0,0,0,0.08)] px-3.5 py-2.5 text-[12px]">
      <p className="text-zinc-400 mb-1 font-medium">{label}</p>
      <p className="font-bold text-zinc-900">
        <span style={{ color }}>{value.toFixed(1)}</span>
        <span className="font-normal text-zinc-400 ml-1">mg/dL</span>
      </p>
      {isLow  && <p className="text-blue-500  text-[10px] font-semibold mt-0.5">↓ Hipoglucemia</p>}
      {isHigh && <p className="text-amber-500 text-[10px] font-semibold mt-0.5">↑ Hiperglucemia</p>}
    </div>
  );
}

// ─── Transform data ───────────────────────────────────────────────────────────
function toChartPoints(measurements: MeasurementDTO[], rangeDays: RangeDays) {
  const valid  = measurements.filter((m) => m.isValid);
  const fmt    = rangeDays === 1 ? "HH:mm" : "dd MMM";
  return valid.map((m) => ({
    time:  format(parseISO(m.measuredAt), fmt, { locale: es }),
    value: m.glucoseValue,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────
export function GlucoseChart() {
  const [rangeDays, setRangeDays] = useState<RangeDays>(1);
  const { data, isLoading }       = useMeasurementsList({ rangeDays });

  const chartData = useMemo(
    () => (data?.content?.length ? toChartPoints(data.content, rangeDays) : []),
    [data, rangeDays]
  );

  const values = chartData.map((d) => d.value);
  const yMin   = values.length ? Math.max(0,   Math.min(...values) - 25) : 0;
  const yMax   = values.length ? Math.max(300, Math.max(...values) + 25) : 300;

  return (
    <Card className="col-span-full">
      <CardHeader
        title="Glucosa en el tiempo"
        subtitle={`${rangeDays === 1 ? "Últimas 24 horas" : `Últimos ${rangeDays} días`} · mediciones válidas`}
        action={
          <div className="flex items-center gap-0.5 p-0.5 bg-[#F4F4F5] rounded-lg">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setRangeDays(r.days)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all duration-150",
                  rangeDays === r.days
                    ? "bg-white text-zinc-900 shadow-[0_1px_2px_0_rgb(0,0,0,0.08)]"
                    : "text-zinc-500 hover:text-zinc-700"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />

      {isLoading ? (
        <Skeleton className="h-[260px] w-full" />
      ) : chartData.length === 0 ? (
        <div className="h-[260px] flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <p className="text-[13px] text-zinc-400">
            Sin mediciones en este período
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 12, bottom: 0, left: -16 }}
          >
            <defs>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#E03131" stopOpacity={0.15} />
                <stop offset="60%"  stopColor="#E03131" stopOpacity={0.04} />
                <stop offset="100%" stopColor="#E03131" stopOpacity={0}    />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F0F0F2"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "#A1A1AA", fontFamily: "DM Sans" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              padding={{ left: 8, right: 8 }}
            />

            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 11, fill: "#A1A1AA", fontFamily: "DM Sans" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<GlucoseTooltip />}
              cursor={{ stroke: "#E9E9EC", strokeWidth: 1.5 }}
            />

            {/* Hypo reference line */}
            <ReferenceLine
              y={GLUCOSE_DEFAULTS.HYPO_THRESHOLD}
              stroke="#3B82F6"
              strokeDasharray="5 4"
              strokeWidth={1.5}
              strokeOpacity={0.7}
              label={{
                value: `${GLUCOSE_DEFAULTS.HYPO_THRESHOLD}`,
                fontSize: 10, fill: "#3B82F6",
                position: "insideBottomRight"
              }}
            />

            {/* Hyper reference line */}
            <ReferenceLine
              y={GLUCOSE_DEFAULTS.HYPER_THRESHOLD}
              stroke="#D97706"
              strokeDasharray="5 4"
              strokeWidth={1.5}
              strokeOpacity={0.7}
              label={{
                value: `${GLUCOSE_DEFAULTS.HYPER_THRESHOLD}`,
                fontSize: 10, fill: "#D97706",
                position: "insideTopRight"
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#E03131"
              strokeWidth={2.2}
              fill="url(#redGradient)"
              dot={chartData.length <= 30
                ? { r: 3, fill: "#E03131", stroke: "white", strokeWidth: 1.5 }
                : false
              }
              activeDot={{
                r: 5, fill: "#E03131",
                stroke: "white", strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-[#F0F0F2]">
        {[
          { color: "bg-blue-400",    label: `Hipoglucemia  < ${GLUCOSE_DEFAULTS.HYPO_THRESHOLD} mg/dL` },
          { color: "bg-emerald-500", label: "En rango" },
          { color: "bg-amber-400",   label: `Hiperglucemia > ${GLUCOSE_DEFAULTS.HYPER_THRESHOLD} mg/dL` },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", color)} />
            <span className="text-[11px] text-zinc-400">{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}