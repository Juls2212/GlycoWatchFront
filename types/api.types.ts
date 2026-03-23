// ─── Generic API Wrapper ──────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
  path?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface DateRangeParams {
  from?: string; // ISO 8601
  to?: string;   // ISO 8601
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

export type MeasurementQueryParams = DateRangeParams & PaginationParams;