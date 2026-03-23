"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "@/lib/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUnreadAlertsCount } from "@/features/alerts/hooks/useUnreadAlertsCount";

interface SidebarProps {
  collapsed:         boolean;
  onToggleCollapse:  () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname             = usePathname();
  const { user, logout }     = useAuth();
  const { data: unreadCount } = useUnreadAlertsCount();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function getBadgeCount(badge?: string): number | undefined {
    if (badge === "alerts") return unreadCount;
    return undefined;
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col",
        "bg-[#0F172A] border-r border-[#1E293B]",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60"
      )}
      aria-label="Navegación principal"
    >
      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b border-[#1E293B]",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-md shadow-red-900/30">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>

          {!collapsed && (
            <div className="overflow-hidden">
              <span className="block text-white font-semibold text-[15px] leading-tight tracking-tight whitespace-nowrap">
                GlycoWatch
              </span>
              <span className="block text-[#475569] text-[10px] font-medium tracking-widest uppercase whitespace-nowrap">
                Monitoreo glucémico
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} className={cn(si > 0 && "mt-5")}>

            {/* Section title */}
            {section.title && !collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-[#334155]">
                {section.title}
              </p>
            )}
            {section.title && collapsed && (
              <div className="mx-auto mb-1.5 w-4 h-px bg-[#1E293B]" />
            )}

            {/* Items */}
            <ul className="space-y-0.5" role="list">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const count  = getBadgeCount(item.badge);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "relative flex items-center gap-3 rounded-lg px-3 py-2.5",
                        "text-sm font-medium",
                        "transition-colors duration-150",
                        "group",
                        active
                          ? "sidebar-item-active bg-[#1E293B] text-[#F1F5F9]"
                          : "text-[#64748B] hover:bg-[#1E293B]/60 hover:text-[#CBD5E1]",
                        collapsed && "justify-center px-2"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {/* Icon */}
                      <item.icon
                        className={cn(
                          "flex-shrink-0 w-[18px] h-[18px]",
                          "transition-colors duration-150",
                          active
                            ? "text-primary-400"
                            : "text-[#475569] group-hover:text-[#94A3B8]"
                        )}
                        strokeWidth={active ? 2.2 : 1.8}
                      />

                      {/* Label */}
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}

                      {/* Badge */}
                      {!collapsed && count !== undefined && count > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center px-1">
                          {count > 99 ? "99+" : count}
                        </span>
                      )}

                      {/* Collapsed badge dot */}
                      {collapsed && count !== undefined && count > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500" />
                      )}

                      {/* Tooltip on collapsed */}
                      {collapsed && (
                        <span
                          className={cn(
                            "absolute left-full ml-3 px-2.5 py-1.5 rounded-md",
                            "bg-[#1E293B] text-[#F1F5F9] text-xs font-medium whitespace-nowrap",
                            "pointer-events-none opacity-0 group-hover:opacity-100",
                            "transition-opacity duration-150",
                            "shadow-lg border border-[#334155]"
                          )}
                        >
                          {item.label}
                          {count !== undefined && count > 0 && (
                            <span className="ml-1.5 text-primary-400">({count})</span>
                          )}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User footer ──────────────────────────────────────────────── */}
      <div className="border-t border-[#1E293B] p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-1">
            {/* Avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {user?.email?.charAt(0).toUpperCase() ?? "U"}
              </span>
            </div>

            {/* Email */}
            <div className="flex-1 min-w-0">
              <p className="text-[#CBD5E1] text-xs font-medium truncate">
                {user?.email ?? "usuario@email.com"}
              </p>
              <p className="text-[#475569] text-[10px] capitalize">
                {user?.role?.toLowerCase() ?? "user"}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex-shrink-0 p-1.5 rounded-md text-[#475569] hover:text-[#F87171] hover:bg-[#1E293B] transition-colors duration-150"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {user?.email?.charAt(0).toUpperCase() ?? "U"}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-md text-[#475569] hover:text-[#F87171] hover:bg-[#1E293B] transition-colors duration-150"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Collapse toggle ───────────────────────────────────────────── */}
      <button
        onClick={onToggleCollapse}
        className={cn(
          "absolute -right-3 top-[72px]",
          "w-6 h-6 rounded-full",
          "bg-[#1E293B] border border-[#334155]",
          "flex items-center justify-center",
          "text-[#64748B] hover:text-[#CBD5E1]",
          "transition-colors duration-150",
          "shadow-md"
        )}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" />
          : <ChevronLeft  className="w-3 h-3" />
        }
      </button>
    </aside>
  );
}