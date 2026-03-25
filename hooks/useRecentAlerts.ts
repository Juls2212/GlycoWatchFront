"use client";

import { useQuery } from "@tanstack/react-query";
import { alertsService } from "@/services/api/alerts.service";
import { QUERY_KEYS, POLLING } from "@/lib/constants";

export function useRecentAlerts(size = 4) {
  return useQuery({
    queryKey:        QUERY_KEYS.ALERTS({ size, page: 0 }),
    queryFn:         () => alertsService.getList({ page: 0, size }),
    refetchInterval: POLLING.ALERTS,
    staleTime:       30_000,
  });
}