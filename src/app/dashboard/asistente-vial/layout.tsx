import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Asistencia vial — Paso Rápido",
  description:
    "Misma lógica y peajes que la app, con enlace a secciones del panel y exportación de chat.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
