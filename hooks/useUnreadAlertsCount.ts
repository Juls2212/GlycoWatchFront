"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/axios";
import { QUERY_KEYS, POLLING } from "@/lib/constants";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AlertDTO } from "@/types/alert.types";

async function fetchUnreadCount(): Promise<number> {
  const res = await apiClient.get<ApiResponse<PaginatedResponse<AlertDTO>>>(
    "/alerts",
    { params: { isRead: false, page: 0, size: 1 } }
  );
  return res.data.data.totalElements;
}

export function useUnreadAlertsCount() {
  return useQuery({
    queryKey:        QUERY_KEYS.UNREAD_ALERTS,
    queryFn:         fetchUnreadCount,
    refetchInterval: POLLING.ALERTS,
    staleTime:       30_000,
  });
}