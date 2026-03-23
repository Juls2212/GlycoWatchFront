// ─── Analytics DTOs ───────────────────────────────────────────────────────────

export interface DashboardAnalyticsDTO {
  average: number;
  min: number;
  max: number;
  stdDev: number;
  timeInRange: number; // percentage 0-100
}

export type TrendDirection = "UPWARD" | "DOWNWARD" | "STABLE";

export interface TrendDTO {
  trend: TrendDirection;
}

export interface ChartDataPoint {
  time: string;     // display label
  value: number;
  isValid: boolean;
}

// ─── Prediction DTOs ──────────────────────────────────────────────────────────

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface PredictionDTO {
  id?: number;
  riskLevel: RiskLevel;
  riskScore: number; // 0.0 - 1.0
  calculatedAt: string;
  featuresSnapshot?: Record<string, number>;
  modelVersion?: string;
}