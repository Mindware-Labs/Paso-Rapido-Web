import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Seguridad — Paso Rápido",
  description:
    "Protege tu cuenta: contraseña, sesiones, alertas y buenas prácticas. Paso Rápido.",
};

export default function SeguridadLayout({ children }: { children: ReactNode }) {
  return children;
}
