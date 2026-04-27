import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Peajes — Paso Rápido",
  description:
    "Red de peajes, corredores y qué esperar al paso. Sin mapa en vivo (solo diseño).",
};

export default function PeajesLayout({ children }: { children: ReactNode }) {
  return children;
}
