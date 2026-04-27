import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Notificaciones — Paso Rápido",
  description: "Alertas, avisos y centro de mensajes.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
