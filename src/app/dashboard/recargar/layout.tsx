import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Recargar — Paso Rápido",
  description:
    "Recarga de saldo y confianza: CTA y copy alineados con el slider móvil.",
};

export default function RecargarLayout({ children }: { children: ReactNode }) {
  return children;
}
