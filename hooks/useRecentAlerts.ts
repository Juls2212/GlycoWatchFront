"use client";

import { useQuery } from "@tanstack/react-query";

export function useRecentAlerts() {
  return useQuery({
    queryKey: ["recent-alerts"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 300));

      return [
        {
          id: "1",
          type: "HIGH",
          message: "Glucosa alta detectada",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          type: "LOW",
          message: "Glucosa baja detectada",
          createdAt: new Date(Date.now() - 600000).toISOString(),
        },
      ];
    },
  });
}