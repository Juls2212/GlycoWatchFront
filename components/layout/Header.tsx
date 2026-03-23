"use client";

import { usePathname } from "next/navigation";
import { Bell, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn, formatRelative } from "@/lib/utils";
import { useUnreadAlertsCount } from "@/features/alerts/hooks/useUnreadAlertsCount";

interface HeaderProps {
  sidebarCollapsed: boolean;
  lastUpdated?:     string | null; // ISO timestamp of last data refresh
  isRefreshing?:    boolean;
}

// Maps href → page title
const PAGE_TITLES: Record<string, string> = {
  "/":            "Dashboard",
  "/history":     "Historial de Mediciones",
  "/alerts":      "Alertas",
  "/predictions": "Predicción de Riesgo IA",
  "/devices":     "Mis Dispositivos",
  "/profile":     "Mi Perfil",
};

export function Header({ sidebarCollapsed, lastUpdated, isRefreshing }: HeaderProps) {
  const pathname              = usePathname();
  const { data: unreadCount } = useUnreadAlertsCount();

  const title = PAGE_TITLES[pathname] ?? "GlycoWatch";

  // Build breadcrumb segments
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
      href:  `/${seg}`,
    }));

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-20 flex items-center",
        "h-16 bg-white/90 backdrop-blur-sm",
        "border-b border-surface-200",
        "px-6",
        "transition-[left] duration-300 ease-in-out",
        sidebarCollapsed ? "left-16" : "left-60"
      )}
    >
      {/* ── Left: page info ──────────────────────────────────────────── */}
      <div className="flex flex-col justify-center">
        {/* Breadcrumb */}
        {segments.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-0.5">
            <Link
              href="/"
              className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              Inicio
            </Link>
            {segments.map((seg) => (
              <span key={seg.href} className="flex items-center gap-1.5">
                <span className="text-slate-300 text-[11px]">/</span>
                <span className="text-[11px] text-slate-500">{seg.label}</span>
              </span>
            ))}
          </nav>
        )}

        {/* Page title */}
        <h1 className="text-[17px] font-semibold text-slate-900 leading-tight tracking-tight">
          {title}
        </h1>
      </div>

      {/* ── Spacer ───────────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── Right: status + actions ──────────────────────────────────── */}
      <div className="flex items-center gap-4">

        {/* Live status pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full flex-shrink-0",
              isRefreshing ? "bg-amber-400 animate-pulse" : "bg-green-400 glucose-dot-live"
            )}
          />
          <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
            {isRefreshing
              ? "Actualizando..."
              : lastUpdated
              ? `Últ. actualización ${formatRelative(lastUpdated)}`
              : "En vivo"
            }
          </span>
          {isRefreshing && (
            <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-100" />

        {/* Notifications bell */}
        <Link
          href="/alerts"
          className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          aria-label={`Alertas${unreadCount ? ` — ${unreadCount} sin leer` : ""}`}
        >
          <Bell className="w-5 h-5" strokeWidth={1.8} />
          {Boolean(unreadCount && unreadCount > 0) && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-600 ring-2 ring-white" />
          )}
        </Link>
      </div>
    </header>
  );
}