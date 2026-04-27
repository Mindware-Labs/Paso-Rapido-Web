"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Clock,
  CreditCard,
  MapPinned,
  Route,
  SunMedium,
} from "lucide-react";
import {
  PEAJES_NOTE,
  TOLL_SITES,
  type TollSite,
} from "@/data/tolls";

const PeajesMap = dynamic(() => import("./PeajesMap"), {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(55vh,520px)] min-h-[300px] w-full items-center justify-center rounded-2xl border border-pr-border bg-pr-muted text-sm font-semibold text-pr-muted-fg">
        Cargando mapa…
      </div>
    ),
  },
);

const TIPS = [
  {
    title: "Mantén distancia de seguridad",
    body: "Al acercarte a la antena, reduce la velocidad y alinea el vehículo en el carril correcto y la señal de Paso Rápido.",
    Icon: Route,
  },
  {
    title: "Horario y flujo",
    body: "La mayoría opera 24/7. En pico, alterna carril con tiempo y revisa señalética de carril tag.",
    Icon: Clock,
  },
  {
    title: "Medios de pago",
    body: "TAG y telepeaje según señalética; efectivo y tarjeta donde aplique, como en la app móvil.",
    Icon: CreditCard,
  },
  {
    title: "Luz y visibilidad",
    body: "Misma línea de consejos de conducción y visibilidad que en el asistente de peajes móvil.",
    Icon: SunMedium,
  },
] as const;

function TollDetail({ site }: { site: TollSite }) {
  return (
    <section
      className="rounded-2xl border border-pr-border bg-pr-card p-4 sm:p-5"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-extrabold text-pr-foreground sm:text-lg">
            {site.name}
          </h2>
          <p className="text-xs font-semibold text-pr-hero/90">{site.subtitle}</p>
        </div>
        <span className="rounded-full bg-pr-secondary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-pr-secondary-fg">
          {site.regionLabel}
        </span>
      </div>
      {site.badges && site.badges.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {site.badges.map((b) => (
            <li
              key={b}
              className="rounded-md border border-pr-border bg-pr-bg px-2 py-0.5 text-[10px] font-bold text-pr-foreground/80"
            >
              {b}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-sm leading-relaxed text-pr-foreground/90">
        {site.description}
      </p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        {site.highway && (
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-pr-muted-fg">
              Vía
            </dt>
            <dd className="text-sm font-semibold text-pr-foreground">
              {site.highway}
            </dd>
          </div>
        )}
        {site.hours && (
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-pr-muted-fg">
              Horario
            </dt>
            <dd className="text-sm font-semibold text-pr-foreground">
              {site.hours}
            </dd>
          </div>
        )}
      </dl>
      <div
        className="mt-4 border-t border-pr-border/60 pt-4"
        role="group"
        aria-label="Tarifas de referencia"
      >
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-pr-muted-fg">
          Tarifas (referencia)
        </p>
        <ul className="mt-1 flex flex-wrap gap-3 text-sm">
          <li>
            <span className="text-pr-muted-fg">Liviano: </span>
            <span className="font-bold text-pr-hero">{site.car}</span>
          </li>
          <li>
            <span className="text-pr-muted-fg">Bus: </span>
            <span className="font-bold text-pr-foreground">{site.bus}</span>
          </li>
          <li>
            <span className="text-pr-muted-fg">Carga: </span>
            <span className="font-bold text-pr-foreground">{site.truck}</span>
          </li>
        </ul>
        {site.paymentNote && (
          <p className="mt-2 text-xs text-pr-foreground/80">{site.paymentNote}</p>
        )}
      </div>
    </section>
  );
}

export function PeajesView() {
  const [selectedId, setSelectedId] = useState(TOLL_SITES[0]?.id ?? "");

  useEffect(() => {
    const el = document.getElementById(`toll-card-${selectedId}`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedId]);

  const selected = TOLL_SITES.find((s) => s.id === selectedId) ?? TOLL_SITES[0];

  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
            Peajes
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-pr-foreground/85">
            Mapa con las 16 estaciones RD Vial, carrusel y ficha: misma lógica que
            la app, con más contexto y lectura en pantallas grandes.{" "}
            <span className="text-pr-foreground/70">{PEAJES_NOTE}</span>
          </p>
        </header>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-pr-hero">
            <MapPinned className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-pr-foreground/80">
              Mapa
            </h2>
          </div>
          <PeajesMap
            sites={TOLL_SITES}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-pr-foreground/80">
            Estaciones
          </h2>
          <p className="text-xs text-pr-foreground/70">
            Toca o desliza el carrusel; el mapa se centra en la estación
            seleccionada.
          </p>
          <div className="relative -mx-1">
            <div
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pl-1 pr-4"
              style={{ scrollPaddingLeft: 8, scrollPaddingRight: 8 }}
              role="list"
            >
              {TOLL_SITES.map((s) => {
                const on = s.id === selectedId;
                return (
                  <button
                    type="button"
                    key={s.id}
                    id={`toll-card-${s.id}`}
                    onClick={() => setSelectedId(s.id)}
                    role="listitem"
                    className={`w-[min(100vw-2.5rem,260px)] max-w-[260px] flex-none snap-center scroll-ml-2 overflow-hidden rounded-2xl border text-left transition ${
                      on
                        ? "border-pr-hero bg-pr-secondary shadow-md"
                        : "border-pr-border bg-pr-card shadow-sm hover:border-pr-hero/50"
                    }`}
                  >
                    <div className="p-3">
                      <p
                        className="text-[9px] font-extrabold uppercase tracking-wider"
                        style={{ color: on ? "var(--pr-hero)" : "var(--pr-secondary-fg)" }}
                      >
                        {s.regionLabel}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-sm font-extrabold text-pr-foreground">
                        {s.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-pr-foreground/75">
                        {s.subtitle}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-pr-hero">
                          {s.car}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-pr-muted-fg" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {selected && <TollDetail site={selected} />}

        <section className="space-y-3">
          <h2 className="text-lg font-extrabold text-pr-foreground">
            Consejos al volante
          </h2>
          <p className="text-sm text-pr-foreground/80">
            Alineado con el carrusel de tips y la ficha de peaje en la app móvil.
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
