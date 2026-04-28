import { AsistenteVialChat } from "@/components/asistente/AsistenteVialChat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asistencia vial | Paso Rápido",
  description:
    "Asistente vial: peajes, cuenta y trámites, con el mismo criterio que en la app móvil.",
};

export default function AsistenteVialPage() {
  return <AsistenteVialChat />;
}
