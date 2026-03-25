"use client";

import { TrendingUp, Activity, AlertTriangle } from "lucide-react";

export default function PredictionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 p-6 space-y-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-gray-800">
        AI Glucose Predictions
      </h1>

      {/* MAIN CARD (LA IMPORTANTE) */}
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <p className="text-gray-500">Next Prediction</p>
          <h2 className="text-5xl font-bold text-red-500 mt-2">
            165 mg/dL
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Estimated in the next hour
          </p>
        </div>

        <div className="bg-red-100 p-5 rounded-xl">
          <TrendingUp className="text-red-500 w-8 h-8" />
        </div>

      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-gray-500">
            <TrendingUp size={18} />
            Trend
          </div>
          <p className="mt-3 text-xl font-semibold text-gray-800">
            Slight Increase
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-gray-500">
            <AlertTriangle size={18} />
            Risk Level
          </div>
          <p className="mt-3 text-xl font-semibold text-yellow-600">
            Medium
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-2 text-gray-500">
            <Activity size={18} />
            Activity Impact
          </div>
          <p className="mt-3 text-xl font-semibold text-green-600">
            Stable
          </p>
        </div>

      </div>

      {/* RECOMMENDATION */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
        <h2 className="font-semibold text-gray-800 mb-2">
          AI Recommendation
        </h2>
        <p className="text-gray-600">
          Your glucose is expected to rise slightly. Consider light physical activity or hydration to maintain stability.
        </p>
      </div>

    </div>
  );
}