import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mi perfil — Paso Rápido",
  description:
    "Datos de cuenta, seguridad y preferencias, alineado con el perfil móvil.",
};

export default function CuentaLayout({ children }: { children: ReactNode }) {
  return children;
}
