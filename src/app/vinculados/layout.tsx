import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vinculados — Paso Rápido",
  description: "Personas y cuentas autorizadas.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
