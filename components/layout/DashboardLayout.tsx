"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header  } from "./Header";

// ─── Layout context (so pages can push last-updated / refresh state) ──────────

interface LayoutContextValue {
  setLastUpdated:  (iso: string) => void;
  setIsRefreshing: (val: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  setLastUpdated:  () => undefined,
  setIsRefreshing: () => undefined,
});

export function useLayoutContext() {
  return useContext(LayoutContext);
}

// ─── Component ────────────────────────────────────────────────────────────────

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed,    setCollapsed]    = useState(false);
  const [lastUpdated,  setLastUpdated]  = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleCollapse = useCallback(() => setCollapsed((c) => !c), []);

  return (
    <LayoutContext.Provider value={{ setLastUpdated, setIsRefreshing }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggleCollapse={toggleCollapse} />

      {/* Header */}
      <Header
        sidebarCollapsed={collapsed}
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
      />

      {/* Main content area */}
      <main
        className={cn(
          "min-h-screen pt-16",                           // offset for fixed header
          "transition-[padding-left] duration-300 ease-in-out",
          collapsed ? "pl-16" : "pl-60"
        )}
      >
        <div className="page-enter p-6 md:p-8 max-w-[1440px]">
          {children}
        </div>
      </main>
    </LayoutContext.Provider>
  );
}