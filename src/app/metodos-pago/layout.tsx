import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Métodos de pago — Paso Rápido",
  description: "Tarjetas, cuentas y recargas asociadas.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
