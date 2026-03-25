"use client";

import { useQuery } from "@tanstack/react-query";

export function useLatestPrediction() {
  return useQuery({
    queryKey: ["latest-prediction"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 400));

      return {
        riskLevel: "HIGH",
        score: 78,
        message: "Riesgo elevado de hiperglucemia",
        createdAt: new Date().toISOString(),
      };
    },
    refetchInterval: 10000,
  });
}