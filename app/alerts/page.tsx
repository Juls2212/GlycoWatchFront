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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Bell className="text-red-500" />
          Alerts
        </h1>
      </div>

      {/* Alerts List */}
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
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
                <p className="text-sm text-gray-500">{alert.description}</p>
              </div>

              <span className="text-xs text-gray-400">
                {alert.time}
              </span>
            </div>

            <div className="mt-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
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
        ))}
      </div>
    </div>
  );
}