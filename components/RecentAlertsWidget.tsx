"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BellOff, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn, formatRelative } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { alertsService } from "@/services/api/alerts.service";
import { useRecentAlerts } from "@/features/alerts/hooks/useRecentAlerts";
import type { AlertDTO, AlertType } from "@/types/alert.types";

// ─── Type config ──────────────────────────────────────────────────────────────
const TYPE: Record<AlertType, {
  label:     string;
  iconBg:    string;
  iconColor: string;
  labelColor:string;
  dot:       string;
}> = {
  HYPOGLYCEMIA: {
    label:      "Hipoglucemia",
    iconBg:     "bg-blue-50",
    iconColor:  "text-blue-500",
    labelColor: "text-blue-600",
    dot:        "bg-blue-500",
  },
  HYPERGLYCEMIA: {
    label:      "Hiperglucemia",
    iconBg:     "bg-amber-50",
    iconColor:  "text-amber-500",
    labelColor: "text-amber-600",
    dot:        "bg-amber-500",
  },
};

// ─── Single row ───────────────────────────────────────────────────────────────
function AlertRow({ alert }: { alert: AlertDTO }) {
  const queryClient = useQueryClient();
  const t           = TYPE[alert.type];

  const markRead = useMutation({
    mutationFn: () => alertsService.markAsRead(alert.id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
  });

  return (
    <div className={cn(
      "flex items-start gap-3 px-3 py-3 rounded-xl transition-colors",
      !alert.isRead ? "bg-[#FAFAFA]" : "opacity-55"
    )}>
      {/* Icon */}
      <div className={cn(
        "mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
        t.iconBg
      )}>
        <AlertCircle className={cn("w-3.5 h-3.5", t.iconColor)} strokeWidth={2.2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={cn("text-[11px] font-bold", t.labelColor)}>{t.label}</span>
          {!alert.isRead && (
            <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", t.dot)} />
          )}
        </div>
        <p className="text-[12px] text-zinc-600 truncate">{alert.message}</p>
        <p className="text-[11px] text-zinc-400 mt-0.5">{formatRelative(alert.createdAt)}</p>
      </div>

      {/* Mark read */}
      {!alert.isRead && (
        <button
          onClick={() => markRead.mutate()}
          disabled={markRead.isPending}
          className="flex-shrink-0 text-[11px] font-medium text-zinc-400 hover:text-primary-600 transition-colors mt-0.5"
        >
          {markRead.isPending ? "…" : "Leída"}
        </button>
      )}
    </div>
  );
}

// ─── Widget ───────────────────────────────────────────────────────────────────
export function RecentAlertsWidget() {
  const { data, isLoading } = useRecentAlerts(4);
  const alerts = data?.content ?? [];

  return (
    <Card>
      <CardHeader
        title="Alertas recientes"
        action={
          <Link
            href="/alerts"
            className="flex items-center gap-1 text-[12px] font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Ver todas
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        }
      />

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5 pt-0.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
            <BellOff className="w-5 h-5 text-zinc-400" />
          </div>
          <p className="text-[13px] text-zinc-400 font-medium">Sin alertas recientes</p>
        </div>
      ) : (
        <div className="space-y-0.5 -mx-1">
          {alerts.map((a) => <AlertRow key={a.id} alert={a} />)}
        </div>
      )}
    </Card>
  );
}