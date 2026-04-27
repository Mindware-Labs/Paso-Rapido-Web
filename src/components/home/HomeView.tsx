"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  CreditCard,
  Globe2,
  MapPin,
  Newspaper,
  Shield,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATS = [
  { k: "Corredores", v: "12+", hint: "Vista demo" },
  { k: "Peajes en mapa", v: "40+", hint: "Con tarifas" },
  { k: "Canales de ayuda", v: "24/7", hint: "Web y app" },
] as const;

const PILLARS = [
  {
    title: "Red y tarifas",
    text: "Consulta corredores, puntos de cobro y mapa interactivo con la misma lineación informativa que la app.",
    Icon: MapPin,
  },
  {
    title: "Cuenta y vehículos",
    text: "Gestión de perfil, TAG y medios de pago en formato de portal, con tablas y formularios claros.",
    Icon: Shield,
  },
  {
    title: "Saldo y trazabilidad",
    text: "Recargas e historial con lectura amplia y exportable, adecuada para usuarios y flotas.",
    Icon: CreditCard,
  },
] as const;

const STEPS = [
  { n: "1", t: "Explorar", d: "Revisa el mapa y las tarifas vigentes." },
  { n: "2", t: "Configurar", d: "Registra vehículos y TAG cuando conectes API." },
  { n: "3", t: "Operar", d: "Transita y consulta movimientos en detalle." },
] as const;

const PRESS = [
  {
    title: "Franja horaria ampliada en corredor norte",
    kicker: "Operación",
    href: "/noticias",
  },
  {
    title: "Saldo mínimo recomendado en TAG",
    kicker: "Aviso",
    href: "/ayuda",
  },
  {
    title: "Promoción: bono en recargas con tarjeta",
    kicker: "Promociones",
    href: "/recargar",
  },
] as const;

export function HomeView() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-border bg-gradient-to-b from-card to-background">
        <section
          className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
          aria-labelledby="hero-h1"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-7">
              <Badge
                variant="secondary"
                className="border-0 bg-primary/10 font-semibold uppercase tracking-[0.16em] text-primary"
              >
                Infraestructura
              </Badge>
              <h1
                id="hero-h1"
                className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.4rem] lg:leading-tight"
              >
                Red de peajes y TAG: información y autogestión en un solo
                portal
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-[1.65] text-muted-foreground sm:text-[1.05rem]">
                Colores y criterio de marca alineados con la app móvil Paso
                Rápido. La web prioriza documentación, mapa y atención; la app
                mantiene el flujo inmediato en vía.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/peajes"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 min-h-11 justify-center gap-2 px-6 text-base font-semibold shadow-sm",
                  )}
                >
                  <Compass className="size-4" />
                  Mapa de peajes
                </Link>
                <Link
                  href="/ayuda"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 min-h-11 border-border bg-card text-base font-medium",
                  )}
                >
                  Centro de ayuda
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <Card className="border-border/80 py-0 shadow-sm ring-1 ring-border/40">
                <CardHeader className="pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Resumen
                  </p>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Portal en línea
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Interfaz preparada para integración con backend: mismas
                    secciones que en app, con maquetación de sitio
                    profesional.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2.5 border-t border-border/50 pt-4 text-sm text-muted-foreground">
                    <li className="flex gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      Navegación lateral y encabezado acordes a un producto
                      web, no a un clon de pantalla móvil.
                    </li>
                    <li className="flex gap-2.5">
                      <Globe2
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      Jerarquía tipográfica y bloques con amplitud de lectura.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <section
        className="border-b border-border bg-card"
        aria-label="Indicadores"
      >
        <div className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className={cn(
                "px-4 py-9 text-center sm:px-6",
                i < STATS.length - 1 && "border-b border-border sm:border-b-0 sm:border-r",
              )}
            >
              <p className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
                {s.v}
              </p>
              <p className="mt-1.5 text-sm font-medium text-primary">{s.k}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:py-16"
        aria-labelledby="pilares"
      >
        <div className="max-w-2xl">
          <h2
            id="pilares"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Servicios del portal
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tres ámbitos principales, presentados con tarjetas limpias y
            sombras discretas.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <Card
              key={p.title}
              className="border-border/80 py-0 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-lg border border-border/60 bg-secondary/60 text-primary">
                  <p.Icon className="size-5" strokeWidth={1.6} />
                </span>
                <CardTitle className="pt-0.5 text-base font-semibold text-foreground">
                  {p.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {p.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="border-y border-primary/15 bg-primary py-14 text-primary-foreground"
        aria-labelledby="proceso"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="proceso" className="text-2xl font-semibold sm:text-3xl">
            Cómo se usa el servicio
          </h2>
          <p className="mt-2 max-w-2xl text-balance text-primary-foreground/85">
            Tres pasos, sin ruido visual. Verde oficial de la marca.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="border-l-2 border-primary-foreground/25 pl-4">
                <span className="text-xs font-semibold text-primary-foreground/80">
                  Paso {s.n}
                </span>
                <p className="mt-1 text-lg font-semibold text-primary-foreground">
                  {s.t}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/80">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 lg:py-16"
        aria-labelledby="prensa"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="prensa"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Comunicados
            </h2>
            <p className="mt-1 text-muted-foreground">
              Listado denso, adecuado para lectura en pantalla ancha.
            </p>
          </div>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <Newspaper className="size-4" />
            Noticias
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <Card className="gap-0 overflow-hidden border-border/80 p-0 py-0 shadow-sm">
          {PRESS.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group flex items-start justify-between gap-4 border-b border-border/60 px-4 py-4 transition-colors last:border-b-0 hover:bg-muted/40 sm:px-5"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {a.kicker}
                </p>
                <p className="mt-0.5 font-medium text-foreground group-hover:underline">
                  {a.title}
                </p>
              </div>
              <ArrowRight
                className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                aria-hidden
              />
            </Link>
          ))}
        </Card>
      </section>

      <section className="border-t border-border bg-secondary/30 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-lg font-semibold text-foreground sm:text-xl">
            Recargar o revisar movimientos
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/recargar"
              className={cn(buttonVariants(), "min-h-9 font-semibold shadow-sm")}
            >
              Recargar
            </Link>
            <Link
              href="/historico"
              className={buttonVariants({ variant: "outline" })}
            >
              Historial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
