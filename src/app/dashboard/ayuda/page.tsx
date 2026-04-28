"use client";

import { ChevronDown, Headphones, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const FAQ = [
  {
    q: "¿Cómo activo la app si ya tengo TAG?",
    a: "En producción, enlazarías con el flujo de onboarding. En esta maqueta es texto de relleno con el mismo criterio de tono: claro, sin jerga.",
  },
  {
    q: "¿Dónde veo mis pases y recargas?",
    a: "Misma jerarquía que en móvil: inicio, actividad, histórico. En web añadimos explicación larga debajo de cada título de sección.",
  },
  {
    q: "Peaje no leyó mi tag",
    a: "Bloque guía: revisar posición, saldo, contactar soporte. Puedes copiar del contenido real de la app cuando conectes datos.",
  },
] as const;

export default function AyudaPage() {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
            Centro de ayuda
          </h1>
          <p className="text-sm text-pr-foreground/80">
            Mismo &quot;espíritu&quot; que <strong className="text-pr-foreground">Ayuda</strong> en la
            app: búsqueda y categorías, pero con ancho de columna y más lectura
            en línea.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Asistente vial",
              sub: "Chat con peajes y cuenta",
              href: "/dashboard/asistente-vial",
              Icon: MessageCircle,
            },
            {
              label: "Llamar",
              sub: "Línea nacional",
              href: null,
              Icon: Headphones,
            },
            {
              label: "Guías",
              sub: "Paso a paso",
              href: null,
              Icon: HelpCircle,
            },
          ].map((c) => {
            const inner = (
              <>
                <c.Icon className="h-6 w-6 text-pr-hero" strokeWidth={1.5} />
                <p className="mt-2 text-sm font-extrabold text-pr-foreground">
                  {c.label}
                </p>
                <p className="text-xs text-pr-muted-fg">{c.sub}</p>
              </>
            );
            if (c.href) {
              return (
                <Link
                  key={c.label}
                  href={c.href}
                  className="flex flex-col items-center rounded-2xl border border-pr-border bg-pr-card px-3 py-4 text-center transition hover:border-pr-hero/40 hover:bg-pr-secondary/30"
                >
                  {inner}
                </Link>
              );
            }
            return (
              <div
                key={c.label}
                className="flex flex-col items-center rounded-2xl border border-pr-border bg-pr-card px-3 py-4 text-center"
              >
                {inner}
              </div>
            );
          })}
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-pr-foreground/70">
            Preguntas frecuentes
          </h2>
          <ul className="divide-y divide-pr-border/80 overflow-hidden rounded-2xl border border-pr-border bg-pr-card">
            {FAQ.map((item) => (
              <li key={item.q} className="p-0">
                <details className="group px-4 py-3 sm:px-5 sm:py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-left text-sm font-extrabold text-pr-foreground group-open:pb-1">
                    {item.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-pr-muted-fg transition group-open:rotate-180" />
                  </summary>
                  <p className="pt-1 text-sm leading-relaxed text-pr-foreground/85">
                    {item.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
