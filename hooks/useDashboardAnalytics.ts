"use client";

import { useQuery } from "@tanstack/react-query";
import { subDays, formatISO } from "date-fns";
import { analyticsService } from "@/services/api/analytics.service";
import { QUERY_KEYS, POLLING } from "@/lib/constants";

export function useDashboardAnalytics(rangeDays = 7) {
  const params = {
    from: formatISO(subDays(new Date(), rangeDays), { representation: "date" }),
    to:   formatISO(new Date(),                     { representation: "date" }),
  };

  return useQuery({
    queryKey:        QUERY_KEYS.ANALYTICS(params),
    queryFn:         () => analyticsService.getDashboard(params),
    refetchInterval: POLLING.DASHBOARD,
    staleTime:       15_000,
  });
}