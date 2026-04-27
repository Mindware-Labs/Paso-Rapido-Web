import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vehículos — Paso Rápido",
  description:
    "Gestión de vehículos y TAG: resumen al estilo de la app, con detalle adicional en web.",
};

export default function VehiculosLayout({ children }: { children: ReactNode }) {
  return children;
}
