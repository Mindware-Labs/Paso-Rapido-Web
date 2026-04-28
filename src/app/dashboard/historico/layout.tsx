import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Historial — Paso Rápido",
  description: "Movimientos y pases, ampliado para web.",
};

export default function HistoricoLayout({ children }: { children: ReactNode }) {
  return children;
}
