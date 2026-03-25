"use client";

import { useQuery } from "@tanstack/react-query";
import { predictionsService } from "@/services/api/predictions.service";
import { QUERY_KEYS } from "@/lib/constants";

export function useLatestPrediction() {
  return useQuery({
    queryKey: QUERY_KEYS.PREDICTION_LATEST,
    queryFn:  () => predictionsService.getLatest(),
    staleTime: 5 * 60_000, // predictions change less frequently
    retry:    1,
  });
}