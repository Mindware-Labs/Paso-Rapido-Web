import {
  type LucideIcon,
  BarChart3,
  Briefcase,
  Building2,
  Car,
  GitBranch,
  Heart,
  Home,
  Landmark,
  Layers,
  Link2,
  Navigation,
  Network,
  Package,
  Share2,
  Shield,
  Smartphone,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import type { CuentaSlug } from "@/data/cuentaTipos";

/** Iconos decorativos por tipo (solo visual, sin copy extra). */
export const CUENTA_ORBIT_ICONS: Record<CuentaSlug, LucideIcon[]> = {
  personal: [Car, Navigation, Smartphone, Wallet],
  familiar: [Users, Home, Heart, Link2],
  pymes: [Briefcase, Truck, Package, TrendingUp],
  corporativa: [Building2, Landmark, Shield, BarChart3],
  gremial: [Network, Share2, Layers, GitBranch],
};
