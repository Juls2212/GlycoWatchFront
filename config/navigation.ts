import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  BrainCircuit,
  Cpu,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: "alerts"; // keys for dynamic badge counts
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      {
        label: "Dashboard",
        href:  "/",
        icon:  LayoutDashboard,
      },
    ],
  },
  {
    title: "Monitoreo",
    items: [
      {
        label: "Historial",
        href:  "/history",
        icon:  ClipboardList,
      },
      {
        label: "Alertas",
        href:  "/alerts",
        icon:  Bell,
        badge: "alerts",
      },
      {
        label: "Predicción IA",
        href:  "/predictions",
        icon:  BrainCircuit,
      },
    ],
  },
  {
    title: "Configuración",
    items: [
      {
        label: "Dispositivos",
        href:  "/devices",
        icon:  Cpu,
      },
      {
        label: "Mi Perfil",
        href:  "/profile",
        icon:  User,
      },
    ],
  },
];