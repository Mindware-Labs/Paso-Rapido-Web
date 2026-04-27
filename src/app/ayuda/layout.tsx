import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ayuda — Paso Rápido",
  description:
    "Preguntas, canales y guías. Reflejo ampliado del módulo de ayuda móvil.",
};

export default function AyudaLayout({ children }: { children: ReactNode }) {
  return children;
}
