"use client";

import { BrainCircuit, ChevronRight, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn, formatRelative } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLatestPrediction } from "@/hooks/useLatestPrediction";
import type { RiskLevel } from "@/types/analytics.types";

// ─── Risk config ──────────────────────────────────────────────────────────────
const RISK = {
  LOW: {
    label:  "Riesgo Bajo",
    badge:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    arc:    "#16A34A",
    icon:   ShieldCheck,
    note:   "Control glucémico adecuado",
    noteColor: "text-emerald-600",
  },
  MEDIUM: {
    label:  "Riesgo Medio",
    badge:  "bg-amber-50 text-amber-700 border-amber-200",
    arc:    "#D97706",
    icon:   AlertTriangle,
    note:   "Revisar tendencia reciente",
    noteColor: "text-amber-600",
  },
  HIGH: {
    label:  "Riesgo Alto",
    badge:  "bg-primary-50 text-primary-700 border-primary-200",
    arc:    "#E03131",
    icon:   AlertTriangle,
    note:   "Atención inmediata recomendada",
    noteColor: "text-primary-600",
  },
} satisfies Record<RiskLevel, object>;

// ─── Semicircle gauge ─────────────────────────────────────────────────────────
function ArcGauge({ score, color }: { score: number; color: string }) {
  const pct      = Math.round(score * 100);
  const R        = 42;
  const cx       = 60;
  const cy       = 58;
  const startX   = cx - R;
  const endX     = cx + R;

  // sweep from left to right (0% = leftmost, 100% = rightmost)
  const angleDeg = pct * 1.8;          // 0→0°, 100→180°
  const angleRad = ((angleDeg - 180) * Math.PI) / 180;
  const arcX     = cx + R * Math.cos(angleRad);
  const arcY     = cy + R * Math.sin(angleRad);
  const largeArc = angleDeg > 180 ? 1 : 0;

  return (
    <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden="true">
      {/* Track */}
      <path
        d={`M ${startX} ${cy} A ${R} ${R} 0 0 1 ${endX} ${cy}`}
        fill="none" stroke="#F0F0F2" strokeWidth="9" strokeLinecap="round"
      />
      {/* Fill */}
      {pct > 0 && (
        <path
          d={`M ${startX} ${cy} A ${R} ${R} 0 ${largeArc} 1 ${arcX} ${arcY}`}
          fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          style={{ transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        />
      )}
      {/* Score */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fontSize="20" fontWeight="700"
        fontFamily="DM Sans, system-ui"
        fill="#18181B"
      >
        {pct}
      </text>
      <text
        x={cx} y={cy + 10}
        textAnchor="middle"
        fontSize="9" fill="#A1A1AA"
        fontFamily="DM Sans, system-ui"
      >
        de 100
      </text>
    </svg>
  );
}

// ─── Widget ───────────────────────────────────────────────────────────────────
export function RiskPredictionWidget() {
  const { data, isLoading, isError } = useLatestPrediction();

  return (
    <Card>
      <CardHeader
        title="Predicción IA"
        subtitle="Riesgo de descontrol metabólico"
        action={
          <Link
            href="/predictions"
            className="flex items-center gap-1 text-[12px] font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Detalles
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <Skeleton className="w-28 h-16 rounded-xl" />
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      ) : isError || !data ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="text-center">
            <p className="text-[13px] font-medium text-zinc-600">Sin predicción aún</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 max-w-[180px]">
              Se calcula cuando hay suficiente historial de mediciones
            </p>
          </div>
        </div>
      ) : (() => {
        const cfg  = RISK[data.riskLevel];
        const Icon = cfg.icon;
        return (
          <div className="flex flex-col items-center gap-3">
            {/* Arc gauge */}
            <ArcGauge score={data.riskScore} color={cfg.arc} />

            {/* Badge */}
            <span className={cn(
              "px-3.5 py-1.5 rounded-full text-[12px] font-bold border",
              cfg.badge
            )}>
              {cfg.label}
            </span>

            {/* Note */}
            <div className={cn("flex items-center gap-1.5", cfg.noteColor)}>
              <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span className="text-[11px] font-semibold">{cfg.note}</span>
            </div>

            {/* Timestamp */}
            <p className="text-[10px] text-zinc-400">
              Calculado {formatRelative(data.calculatedAt)}
            </p>
          </div>
        );
      })()}
    </Card>
  );
}