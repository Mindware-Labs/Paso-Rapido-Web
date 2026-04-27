import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Reclamaciones — Paso Rápido",
  description: "Soporte y trámites de reclamo.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
