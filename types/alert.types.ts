// ─── Alert DTOs ───────────────────────────────────────────────────────────────

export type AlertType     = "HYPOGLYCEMIA" | "HYPERGLYCEMIA";
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type AlertStatus   = "ACTIVE" | "RESOLVED" | "ACKNOWLEDGED";

export interface AlertDTO {
  id: number;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  message: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  measurementId: number;
}