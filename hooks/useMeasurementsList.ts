"use client";

import { useQuery } from "@tanstack/react-query";
import { subDays, formatISO } from "date-fns";
import { measurementsService } from "@/services/api/measurements.service";
import { QUERY_KEYS, POLLING } from "@/lib/constants";
import type { MeasurementQueryParams } from "@/types/api.types";

interface UseMeasurementsListOptions {
  rangeDays?: number; // 1 = today, 7 = last 7 days, 30 = last 30 days
  page?:      number;
  size?:      number;
}

export function useMeasurementsList({
  rangeDays = 7,
  page      = 0,
  size      = 200, // high limit for chart rendering
}: UseMeasurementsListOptions = {}) {
  const params: MeasurementQueryParams = {
    from: formatISO(subDays(new Date(), rangeDays), { representation: "date" }),
    to:   formatISO(new Date(),                     { representation: "date" }),
    page,
    size,
  };

  return useQuery({
    queryKey:        QUERY_KEYS.MEASUREMENTS(params),
    queryFn:         () => measurementsService.getList(params),
    refetchInterval: POLLING.DASHBOARD,
    staleTime:       15_000,
  });
}