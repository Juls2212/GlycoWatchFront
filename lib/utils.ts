import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { GlucoseLevel } from "@/types/measurement.types";
import type { RiskLevel } from "@/types/analytics.types";

// ─── Tailwind class merge ─────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDateTime(iso: string): string {
  return format(parseISO(iso), "dd MMM yyyy, HH:mm", { locale: es });
}

export function formatDate(iso: string): string {
  return format(parseISO(iso), "dd MMM yyyy", { locale: es });
}

export function formatTime(iso: string): string {
  return format(parseISO(iso), "HH:mm");
}

export function formatRelative(iso: string): string {
  return formatDistanceToNow(parseISO(iso), { addSuffix: true, locale: es });
}

// ─── Glucose value formatting ─────────────────────────────────────────────────
export function formatGlucose(value: number): string {
  return `${value.toFixed(1)} mg/dL`;
}

// ─── Color maps ───────────────────────────────────────────────────────────────
export const GLUCOSE_LEVEL_COLORS: Record<GlucoseLevel, string> = {
  low:      "text-blue-600  bg-blue-50  border-blue-200",
  normal:   "text-green-600 bg-green-50 border-green-200",
  high:     "text-amber-600 bg-amber-50 border-amber-200",
  critical: "text-red-600   bg-red-50   border-red-200",
};

export const GLUCOSE_LEVEL_DOT: Record<GlucoseLevel, string> = {
  low:      "bg-blue-500",
  normal:   "bg-green-500",
  high:     "bg-amber-500",
  critical: "bg-red-500",
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  LOW:    "text-green-700 bg-green-50 border-green-200",
  MEDIUM: "text-amber-700 bg-amber-50 border-amber-200",
  HIGH:   "text-red-700   bg-red-50   border-red-200",
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  LOW:    "Riesgo Bajo",
  MEDIUM: "Riesgo Medio",
  HIGH:   "Riesgo Alto",
};

// ─── Percentage formatting ────────────────────────────────────────────────────
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}