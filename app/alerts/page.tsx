"use client";

import { Bell, AlertTriangle } from "lucide-react";

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      title: "Glucose level too high",
      description: "Your glucose exceeded 180 mg/dL",
      time: "2 min ago",
      severity: "high",
    },
    {
      id: 2,
      title: "Glucose dropping fast",
      description: "Rapid decrease detected",
      time: "10 min ago",
      severity: "medium",
    },
    {
      id: 3,
      title: "Stable levels",
      description: "Everything is under control",
      time: "30 min ago",
      severity: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 rounded-xl">
          <Bell className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Alerts Center
        </h1>
      </div>

      {/* Alerts */}
      <div className="grid gap-6">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="group relative p-5 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition ${
                alert.severity === "high"
                  ? "bg-red-100/30"
                  : alert.severity === "medium"
                  ? "bg-yellow-100/30"
                  : "bg-green-100/30"
              }`}
            />

            <div className="relative flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <AlertTriangle
                    className={
                      alert.severity === "high"
                        ? "text-red-500"
                        : alert.severity === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  />
                  {alert.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {alert.description}
                </p>

                <div className="mt-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      alert.severity === "high"
                        ? "bg-red-100 text-red-600"
                        : alert.severity === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <span className="text-xs text-gray-400">
                {alert.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}