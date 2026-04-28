import type { LucideIcon } from "lucide-react";
import {
  BotMessageSquare,
  CircleHelp,
  CreditCard,
  Home,
  KeyRound,
  ListOrdered,
  MapPinned,
  MessageSquareWarning,
  Newspaper,
  CarFront,
  User,
  Users,
  Wallet,
} from "lucide-react";

export type NavGroupId = "explore" | "account" | "ops" | "support";

export type NavItem = {
  href: string;
  label: string;
  description?: string;
  Icon: LucideIcon;
  group: NavGroupId;
};

const GROUP_LABEL: Record<NavGroupId, string> = {
  explore: "Explorar",
  account: "Cuenta y acceso",
  ops: "Operación",
  support: "Soporte",
};

export const GROUP_ORDER: NavGroupId[] = [
  "explore",
  "account",
  "ops",
  "support",
];

export function groupLabel(id: NavGroupId): string {
  return GROUP_LABEL[id];
}

/** Misma oferta de rutas que la app; presentación de sidebar = web (no cajas tipo app). */
export const APP_NAV: NavItem[] = [
  { href: "/dashboard", label: "Inicio", description: "Resumen de tu cuenta", Icon: Home, group: "explore" },
  { href: "/dashboard/peajes", label: "Red de peajes", description: "Mapa y tarifas", Icon: MapPinned, group: "explore" },
  { href: "/dashboard/vehiculos", label: "Vehículos", description: "Placas y TAG", Icon: CarFront, group: "explore" },
  { href: "/dashboard/recargar", label: "Recargar", description: "Saldo y medios de pago", Icon: Wallet, group: "ops" },
  { href: "/dashboard/historico", label: "Historial", description: "Movimientos", Icon: ListOrdered, group: "ops" },
  { href: "/dashboard/cuenta", label: "Perfil", description: "Datos y preferencias", Icon: User, group: "account" },
  { href: "/dashboard/contrasena", label: "Seguridad", description: "Contraseña y sesión", Icon: KeyRound, group: "account" },
  { href: "/dashboard/metodos-pago", label: "Métodos de pago", description: "Tarjetas", Icon: CreditCard, group: "account" },
  { href: "/dashboard/vinculados", label: "Vinculados", description: "Cuentas autorizadas", Icon: Users, group: "account" },
  { href: "/dashboard/asistente-vial", label: "Asistencia vial", description: "Rutas y dudas", Icon: BotMessageSquare, group: "support" },
  { href: "/dashboard/ayuda", label: "Centro de ayuda", description: "Preguntas frecuentes", Icon: CircleHelp, group: "support" },
  { href: "/dashboard/noticias", label: "Noticias", description: "Comunicados", Icon: Newspaper, group: "support" },
  { href: "/dashboard/reclamaciones", label: "Reclamaciones", description: "Solicitudes", Icon: MessageSquareWarning, group: "support" },
];

export const HEADER_QUICK: { href: string; label: string }[] = [
  { href: "/dashboard/cuenta", label: "Mi cuenta" },
  { href: "/dashboard/recargar", label: "Recargar" },
];
