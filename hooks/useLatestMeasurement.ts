"use client";

import { useQuery } from "@tanstack/react-query";

export function useLatestMeasurement() {
  return useQuery({
    queryKey: ["latest-measurement"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 300));

      return {
        id: "1",
        value: 125,
        timestamp: new Date().toISOString(),
      };
    },
    refetchInterval: 5000,
  });
}