import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Truck,
  Users,
  Building2,
  Wallet,
  ListOrdered,
  BarChart3,
  FileText,
  ShieldCheck,
  Settings,
} from "lucide-react";

export type EmpresaNavGroupId = "general" | "finanzas" | "administracion";

export type EmpresaNavItem = {
  href: string;
  label: string;
  description?: string;
  Icon: LucideIcon;
  group: EmpresaNavGroupId;
};

const GROUP_LABEL: Record<EmpresaNavGroupId, string> = {
  general: "General",
  finanzas: "Finanzas",
  administracion: "Administración",
};

export const EMPRESA_GROUP_ORDER: EmpresaNavGroupId[] = [
  "general",
  "finanzas",
  "administracion",
];

export function empresaGroupLabel(id: EmpresaNavGroupId): string {
  return GROUP_LABEL[id];
}

export const EMPRESA_NAV: EmpresaNavItem[] = [
  // General
  {
    href: "/empresa",
    label: "Panel",
    description: "Resumen de la flota",
    Icon: LayoutDashboard,
    group: "general",
  },
  {
    href: "/empresa/flota",
    label: "Flota",
    description: "Vehículos y TAG",
    Icon: Truck,
    group: "general",
  },
  {
    href: "/empresa/conductores",
    label: "Conductores",
    description: "Empleados asignados",
    Icon: Users,
    group: "general",
  },
  {
    href: "/empresa/centros-costo",
    label: "Centros de costo",
    description: "Departamentos",
    Icon: Building2,
    group: "general",
  },
  // Finanzas
  {
    href: "/empresa/recargas",
    label: "Recargas",
    description: "Billetera central",
    Icon: Wallet,
    group: "finanzas",
  },
  {
    href: "/empresa/movimientos",
    label: "Movimientos",
    description: "Transacciones",
    Icon: ListOrdered,
    group: "finanzas",
  },
  {
    href: "/empresa/reportes",
    label: "Reportes",
    description: "Gasto por dimensión",
    Icon: BarChart3,
    group: "finanzas",
  },
  {
    href: "/empresa/facturacion",
    label: "Facturación",
    description: "Comprobantes",
    Icon: FileText,
    group: "finanzas",
  },
  // Administración
  {
    href: "/empresa/configuracion#usuarios",
    label: "Usuarios y roles",
    description: "Accesos del equipo",
    Icon: ShieldCheck,
    group: "administracion",
  },
  {
    href: "/empresa/configuracion",
    label: "Configuración",
    description: "Perfil y políticas",
    Icon: Settings,
    group: "administracion",
  },
];
