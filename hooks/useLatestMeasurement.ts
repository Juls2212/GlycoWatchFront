"use client";

import { useQuery } from "@tanstack/react-query";
import { measurementsService } from "@/services/api/measurements.service";
import { QUERY_KEYS, POLLING } from "@/lib/constants";

export function useLatestMeasurement() {
  return useQuery({
    queryKey:        QUERY_KEYS.LATEST_MEASUREMENT,
    queryFn:         () => measurementsService.getLatest(),
    refetchInterval: POLLING.DASHBOARD,
    staleTime:       15_000,
  });
}