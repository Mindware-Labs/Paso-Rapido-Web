import { PlaceholderScreen } from "@/components/PlaceholderScreen";
import Link from "next/link";

export default function Page() {
  return (
    <PlaceholderScreen
      title="Asistencia vial"
      description="En la app móvil, el asistente combina peajes, clima, normas y respuestas con contexto. En web puedes ofrecer una introducción, enlaces a secciones Peajes y Ayuda, o incrustar el chat cuando exista un endpoint seguro. Por ahora, esta página es informativa."
    >
      <p className="text-sm text-pr-foreground/80">
        Mientras tanto: revisa la sección{" "}
        <Link className="font-bold text-pr-hero hover:underline" href="/dashboard/ayuda">
          Ayuda
        </Link>{" "}
        y el{" "}
        <Link className="font-bold text-pr-hero hover:underline" href="/dashboard/peajes">
          mapa de peajes
        </Link>
        .
      </p>
    </PlaceholderScreen>
  );
}
