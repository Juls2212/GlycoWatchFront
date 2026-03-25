"use client";

import { TrendingUp } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-red-100 rounded-xl">
          <TrendingUp className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          AI Predictions
        </h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {predictions.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white/80 backdrop-blur-lg border shadow-lg hover:shadow-xl transition hover:-translate-y-1"
          >
            <span className="text-sm text-gray-500">
              {item.label}
            </span>

            <div className="text-3xl font-bold mt-2 text-gray-800">
              {item.value}
            </div>

            <span
              className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
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
        ))}
      </div>

      {/* Chart placeholder PRO */}
      <div className="rounded-2xl bg-white/80 backdrop-blur-lg border shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Glucose Prediction Trend
        </h2>

        <div className="h-48 flex items-center justify-center text-gray-400">
          AI prediction chart will appear here 📈
        </div>
      </div>
    </div>
  );
}