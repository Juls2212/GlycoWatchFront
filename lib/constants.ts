// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

// ─── Token storage keys ───────────────────────────────────────────────────────
export const TOKEN_KEY         = "gw_access_token";
export const REFRESH_TOKEN_KEY = "gw_refresh_token";

// ─── Query keys ───────────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  LATEST_MEASUREMENT: ["measurements", "latest"],
  MEASUREMENTS:       (params: object) => ["measurements", params],
  ALERTS:             (params?: object) => ["alerts", params ?? {}],
  UNREAD_ALERTS:      ["alerts", "unread"],
  DEVICES:            ["devices"],
  ANALYTICS:          (params?: object) => ["analytics", params ?? {}],
  TREND:              ["analytics", "trend"],
  PREDICTION_LATEST:  ["predictions", "latest"],
  PREDICTIONS:        ["predictions"],
  PROFILE:            ["profile"],
} as const;

// ─── Polling intervals (ms) ───────────────────────────────────────────────────
export const POLLING = {
  DASHBOARD:    30_000,  // 30s
  ALERTS:       60_000,  // 1 min
} as const;

// ─── Pagination defaults ──────────────────────────────────────────────────────
export const PAGE_SIZE = 10;

// ─── Glucose reference ranges (mg/dL) ─────────────────────────────────────────
export const GLUCOSE_DEFAULTS = {
  HYPO_THRESHOLD:  70,
  HYPER_THRESHOLD: 180,
  CRITICAL_LOW:    54,
  CRITICAL_HIGH:   250,
} as const;