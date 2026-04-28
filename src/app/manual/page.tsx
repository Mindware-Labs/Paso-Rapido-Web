import type { Metadata } from "next";
import ManualPageView from "@/components/Landing/manual/ManualPageView";

export const metadata: Metadata = {
  title: "Manual de usuario — Paso Rápido",
  description:
    "Guía visual: kit TAG, app, peajes, recargas, ayuda y FAQ — Paso Rápido.",
  openGraph: {
    title: "Manual de usuario — Paso Rápido",
    description: "Cómo usar Paso Rápido en app y web.",
  },
};

export default function ManualPage() {
  return <ManualPageView />;
}
