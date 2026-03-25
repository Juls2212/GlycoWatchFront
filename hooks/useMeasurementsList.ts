"use client";

import { useQuery } from "@tanstack/react-query";
import type { MeasurementDTO } from "@/types/measurement.types";

export function useMeasurementsList() {
  return useQuery({
    queryKey: ["measurements"],
    queryFn: async (): Promise<MeasurementDTO[]> => {
      await new Promise((res) => setTimeout(res, 400));

      return [
        {
          id: "1",
          value: 110,
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          value: 135,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "3",
          value: 95,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: "4",
          value: 140,
          timestamp: new Date(Date.now() - 10800000).toISOString(),
        },
      ];
    },
  });
}