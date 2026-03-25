"use client";

import { useQuery } from "@tanstack/react-query";

export function useDashboardAnalytics() {
  return useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 400));

      return {
        average: 120,
        min: 85,
        max: 160,
        timeInRange: 78, // %
        variability: 15,
      };
    },
  });
}