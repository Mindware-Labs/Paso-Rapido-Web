import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Noticias — Paso Rápido",
  description: "Avisos oficiales y prensa de la red vial.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
