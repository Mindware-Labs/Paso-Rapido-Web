import type { Metadata } from "next";
import {
  Clock,
  CreditCard,
  MapPinned,
  Route,
  SunMedium,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Peajes — Paso Rápido",
  description:
    "Red de peajes, corredores y qué esperar al paso. Sin mapa en vivo (solo diseño).",
};

const TIPS = [
  {
    title: "Mantén distancia de seguridad",
    body: "Recomendación al acercarte a la antena: reduce velocidad y alinea el vehículo en el carril habilitado.",
    Icon: Route,
  },
  {
    title: "Horarios pico",
    body: "En la app verás sugerencias según tu ubicación; en web replicamos el mensaje informativo.",
    Icon: Clock,
  },
  {
    title: "Medios de pago",
    body: "TAG y recargas asociadas a tu cuenta, como en la sección móvil de peajes.",
    Icon: CreditCard,
  },
  {
    title: "Visibilidad",
    body: "Misma tono de ayudas de conducción que en la app (día / ruta / tips).",
    Icon: SunMedium,
  },
];

export default function PeajesPage() {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
            Peajes
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-pr-foreground/80">
            En la app, aquí combinas mapa, carrusel de estaciones y ficha al
            toque. En web ampliamos el contexto: puedes explicar corredores,
            tarifas y reglas de uso con más espacio que en el móvil, sin
            arrastrar el mapa aún.
          </p>
        </header>

        <section
          className="overflow-hidden rounded-2xl border border-dashed border-pr-hero/40 bg-pr-card p-6 text-center"
          aria-label="Placeholder de mapa"
        >
          <MapPinned
            className="mx-auto mb-3 h-10 w-10 text-pr-hero/80"
            strokeWidth={1.5}
          />
          <p className="text-sm font-bold text-pr-foreground">
            Zona reservada para el mapa interactivo
          </p>
          <p className="mx-auto mt-1 max-w-md text-xs text-pr-muted-fg">
            Mismo origen de datos que la app (cuando conectes backend). Aquí
            mostramos un marco de diseño.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-pr-foreground">
            Consejos al volante
          </h2>
          <p className="text-sm text-pr-foreground/80">
            Bloque alineado con los tips de conducción de la app (carrusel en
            móvil).
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {TIPS.map((t) => (
              <li
                key={t.title}
                className="flex gap-3 rounded-2xl border border-pr-border bg-pr-card p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pr-secondary text-pr-hero">
                  <t.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-pr-foreground">
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-pr-foreground/75">
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
