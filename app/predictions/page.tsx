"use client";

import { TrendingUp, Activity } from "lucide-react";

export default function PredictionsPage() {
  const predictions = [
    {
      id: 1,
      label: "Next hour",
      value: "165 mg/dL",
      status: "stable",
    },
    {
      id: 2,
      label: "Next 3 hours",
      value: "190 mg/dL",
      status: "rising",
    },
    {
      id: 3,
      label: "Risk level",
      value: "Medium",
      status: "warning",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <TrendingUp className="text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800">
          Predictions
        </h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {predictions.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {item.label}
              </span>
              <Activity className="text-gray-400" />
            </div>

            <div className="mt-3 text-2xl font-bold text-gray-800">
              {item.value}
            </div>

            <div className="mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.status === "stable"
                    ? "bg-green-100 text-green-600"
                    : item.status === "rising"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fake chart placeholder */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Glucose Trend Prediction
        </h2>

        <div className="h-40 flex items-center justify-center text-gray-400">
          (Future chart goes here 📈)
        </div>
      </div>
    </div>
  );
}