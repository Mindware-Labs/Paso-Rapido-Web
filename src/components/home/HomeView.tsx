"use client";

import Link from "next/link";
import { motion } from "motion/react";
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

const fadeInUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, margin: "-10% 0px" },
};

const STATS = [
  { k: "Corredores", v: "12+", hint: "integrados (demo)" },
  { k: "Peajes mapeados", v: "40+", hint: "puntos con tarifa" },
  { k: "Soporte", v: "7/7", hint: "canales web" },
] as const;

const PILLARS = [
  {
    title: "Cobertura vial",
    text: "Consulta la red, tarifas y el mapa interactivo. Pensado para planificar rutas, no para replicar la app.",
    Icon: MapPin,
  },
  {
    title: "Cuenta y vehículos",
    text: "Un solo lugar web para documentar placas, TAG y métodos de pago, con un tono de portal — no de panel móvil.",
    Icon: Shield,
  },
  {
    title: "Recargas y control",
    text: "Transparencia de saldo y movimientos en listado claro, al estilo banca y servicios, no de feed de app.",
    Icon: CreditCard,
  },
] as const;

const STEPS = [
  { n: "01", t: "Explora", d: "Revisa peajes y tarifas en el mapa web." },
  { n: "02", t: "Registra", d: "Asocia vehículos y TAG (cuando conectes API)." },
  { n: "03", t: "Transita", d: "Recarga y cruce con trazabilidad en historial." },
] as const;

const PRESS = [
  {
    title: "Ampliación de franja horaria en corredor norte",
    kicker: "Operación",
    href: "/noticias",
  },
  {
    title: "Recordatorio: saldo mínimo recomendado en TAG",
    kicker: "Usuarios",
    href: "/ayuda",
  },
  {
    title: "Bonos por recarga con tarjeta bancaria",
    kicker: "Promociones",
    href: "/recargar",
  },
] as const;

export function HomeView() {
  return (
    <div>
      <div
        className={cn(
          "border-b border-border pr-hero-mesh pr-grain-dots",
        )}
      >
        <section
          className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-20"
          aria-labelledby="hero-h1"
        >
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="secondary"
              className="border-0 bg-primary/10 px-2.5 font-bold uppercase tracking-[0.18em] text-primary"
            >
              Infraestructura
            </Badge>
            <h1
              id="hero-h1"
              className="font-heading mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]"
            >
              Un portal claro para la red de peajes y el TAG en República
              Dominicana
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Misma identidad cromática que la app, con estructura de sitio
              corporativo: información, servicio y trazabilidad. La app móvil
              prioriza pago al volante; el portal prioriza mapa, lectura y
              pistas institucionales.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/peajes"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 min-h-11 justify-center gap-2 px-6 text-base font-bold sm:min-w-40",
                )}
              >
                Ver mapa de peajes
                <Compass data-icon="inline-end" />
              </Link>
              <Link
                href="/ayuda"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 min-h-11 border-border/80 bg-card/80 text-base font-semibold",
                )}
              >
                Cómo funciona el servicio
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 lg:col-span-5 lg:mt-0"
            initial={fadeInUp.initial}
            whileInView={fadeInUp.whileInView}
            transition={{
              duration: 0.5,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={fadeInUp.viewport}
          >
            <Card className="relative overflow-hidden border-border/80 py-0 shadow-md">
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/10"
                aria-hidden
              />
              <CardHeader>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Resumen
                </p>
                <CardTitle className="text-base text-foreground">
                  Línea de base web (demostración)
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Bloques fijos y tipografía de informe, como en un portal de
                  concesión — distinto al panel compacto de la app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2 border-t border-border/50 pt-4 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    Red de peajes enlazada a la misma base informativa que la
                    app.
                  </li>
                  <li className="flex gap-2">
                    <Globe2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    Ayuda y avisos en formato artículo, no módulos móviles.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>

      <motion.section
        className="border-t border-border bg-card"
        aria-label="Indicadores"
        {...fadeInUp}
      >
        <div className="mx-auto grid max-w-7xl gap-0 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.k}
              className={cn(
                "px-4 py-8 text-center sm:px-6",
                i < STATS.length - 1 && "border-b border-border sm:border-b-0 sm:border-r",
              )}
            >
              <p className="text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
                {s.v}
              </p>
              <p className="mt-1 text-sm font-bold text-primary">{s.k}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <section
        className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:py-20"
        aria-labelledby="pilares"
      >
        <motion.div
          className="max-w-2xl"
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          transition={fadeInUp.transition}
          viewport={fadeInUp.viewport}
        >
          <h2
            id="pilares"
            className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Tres pilares del portal
          </h2>
          <p className="mt-2 text-muted-foreground">
            Estructura en columnas y bloques, no feed ni listas al estilo app.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.06,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-5%" }}
            >
              <Card className="h-full border-border/80 py-0 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <span className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-secondary text-primary">
                    <p.Icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <CardTitle className="text-base font-bold text-foreground">
                    {p.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {p.text}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="border-y border-primary/20 bg-pr-ink py-16 text-primary-foreground"
        aria-labelledby="proceso"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2
            id="proceso"
            className="font-heading text-2xl font-bold sm:text-3xl"
          >
            Proceso para el usuario
          </h2>
          <p className="mt-2 max-w-2xl text-balance text-primary-foreground/75">
            Flujo de sitio corporativo, no asistente conversacional. Verde de
            marca en acentos sobre fondo profundo.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                className="pl-0 sm:pl-1"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-extrabold text-emerald-300/95">
                  {s.n}
                </span>
                <p className="mt-1 text-lg font-bold text-white">{s.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/70">
                  {s.d}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:py-20"
        aria-labelledby="prensa"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="prensa"
              className="font-heading text-2xl font-bold tracking-tight text-foreground"
            >
              Avisos y notas
            </h2>
            <p className="mt-1 text-muted-foreground">
              Comunicados, no tarjetas con icono tipo notificación móvil.
            </p>
          </div>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <Newspaper className="size-4" />
            Ver noticias
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <Card className="gap-0 overflow-hidden border-border/80 p-0 py-0">
          {PRESS.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group flex items-start justify-between gap-4 border-b border-border/60 px-4 py-4 transition-colors last:border-b-0 hover:bg-muted/50 sm:px-6"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {a.kicker}
                </p>
                <p className="mt-0.5 font-semibold text-foreground group-hover:text-primary/90">
                  {a.title}
                </p>
              </div>
              <ArrowRight
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            </Link>
          ))}
        </Card>
      </section>

      <section className="border-t border-border bg-secondary/50 py-12">
        <motion.div
          className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-bold text-foreground sm:text-xl">
            ¿Listo para recargar o revisar tu historial?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/recargar"
              className={cn(buttonVariants(), "font-bold")}
            >
              Ir a recargar
            </Link>
            <Link
              href="/historico"
              className={buttonVariants({ variant: "outline" })}
            >
              Ver movimientos
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
