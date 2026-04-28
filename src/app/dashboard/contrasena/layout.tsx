import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contraseña — Paso Rápido",
  description: "Seguridad de acceso y credenciales.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
