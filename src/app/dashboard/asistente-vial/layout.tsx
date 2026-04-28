import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Asistencia vial — Paso Rápido",
  description: "Asesor de viajes (disponible en app).",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
