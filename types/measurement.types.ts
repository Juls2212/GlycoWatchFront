// ─── Measurement DTOs ─────────────────────────────────────────────────────────

export interface MeasurementDTO {
  id: number;
  glucoseValue: number;
  measuredAt: string;   // ISO 8601
  receivedAt: string;   // ISO 8601
  origin: MeasurementOrigin;
  isValid: boolean;
  invalidReason?: string | null;
  deviceId: number;
}

export type MeasurementOrigin = "esp32" | "manual";

export interface LatestMeasurementDTO {
  glucoseValue: number;
  measuredAt: string;
}

// ─── Glucose Level Classification ─────────────────────────────────────────────

export type GlucoseLevel = "low" | "normal" | "high" | "critical";

export function classifyGlucose(
  value: number,
  hypoThreshold: number,
  hyperThreshold: number
): GlucoseLevel {
  if (value < hypoThreshold * 0.7)  return "critical";
  if (value < hypoThreshold)        return "low";
  if (value > hyperThreshold * 1.3) return "critical";
  if (value > hyperThreshold)       return "high";
  return "normal";
}
