"use client";

import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: "success",
      title: "Stable Glucose",
      message: "Your glucose levels are within the normal range.",
    },
    {
      id: 2,
      type: "warning",
      title: "Glucose Rising",
      message: "Your glucose is increasing faster than usual.",
    },
    {
      id: 3,
      type: "error",
      title: "High Glucose",
      message: "Your glucose exceeded 180 mg/dL.",
    },
    {
      id: 4,
      type: "info",
      title: "New Measurement",
      message: "A new glucose reading has been recorded.",
    },
  ];

  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: <CheckCircle className="text-green-500" />,
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      icon: <AlertTriangle className="text-yellow-500" />,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: <XCircle className="text-red-500" />,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: <Info className="text-blue-500" />,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 gap-4">
      {alerts.map((alert) => {
        const style = styles[alert.type as keyof typeof styles];

        return (
          <div
            key={alert.id}
            className={`w-full max-w-xl flex items-start gap-4 p-4 rounded-xl border shadow-sm ${style.bg} ${style.border}`}
          >
            {/* Icon */}
            <div className="mt-1">{style.icon}</div>

            {/* Text */}
            <div className="flex-1">
              <h2 className={`font-semibold ${style.text}`}>
                {alert.title}
              </h2>
              <p className="text-sm text-gray-600">
                {alert.message}
              </p>
            </div>

            {/* Close button */}
            <button className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}