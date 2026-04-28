"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Car,
  CarFront,
  CreditCard,
  Download,
  CircleHelp,
  HelpCircle,
  Home,
  ListOrdered,
  LogIn,
  MapPinned,
  MessageCircle,
  Package,
  Phone,
  Smartphone,
  User,
  UserPlus,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { FAQ_PASO_RAPIDO } from "@/data/faqPasoRapido";
import {
  MANUAL_AYUDA_MOVIL,
  MANUAL_CONTACTO,
  MANUAL_INTRO,
  MANUAL_KIT,
  MANUAL_PUNTOS_VENTA,
  MANUAL_PRIMEROS_PASOS,
  MANUAL_FUNCIONES_APP,
  MANUAL_WEB_PORTAL,
} from "@/data/manualContenido";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Download, UserPlus, Wallet, Car] as const;

const APP_ICONS: Record<string, typeof Home> = {
  inicio: Home,
  peajes: MapPinned,
  vehiculos: CarFront,
  recargar: Wallet,
  historial: ListOrdered,
  cuenta: User,
  pagos: CreditCard,
  soporte: CircleHelp,
};

const toc = [
  { href: "#primeros-pasos", label: "Pasos", Icon: Package },
  { href: "#kit", label: "Kit", Icon: CreditCard },
  { href: "#en-la-app", label: "App", Icon: Smartphone },
  { href: "#ayuda-movil", label: "Ayuda", Icon: HelpCircle },
  { href: "#puntos-venta", label: "Dónde", Icon: Car },
  { href: "#portal-web", label: "Web", Icon: LogIn },
  { href: "#contacto", label: "Teléfono", Icon: Phone },
  { href: "#preguntas", label: "FAQ", Icon: MessageCircle },
] as const;

const view = { once: true, amount: 0.12, margin: "0px 0px -10% 0px" } as const;

function Fade({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PhoneBubbleIllustration() {
  return (
    <div
      className="relative mx-auto flex h-48 w-40 items-end justify-center sm:h-52 sm:w-44"
      aria-hidden
    >
      <div className="absolute inset-x-2 top-6 rounded-[1.6rem] border-2 border-[#0a0a0a]/8 bg-gradient-to-b from-white to-[#f3fbf6] shadow-[0_20px_50px_-20px_rgba(15,157,88,0.35)]" />
      <div className="absolute right-0 top-2 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#15a972] to-[#0c8a55] text-white shadow-lg ring-4 ring-white/90">
        <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <div className="absolute bottom-3 left-1/2 z-[1] h-1.5 w-10 -translate-x-1/2 rounded-full bg-[#0a0a0a]/10" />
    </div>
  );
}

export default function ManualPageView() {
  return (
    <main className="pr-light pr-noise relative min-h-screen overflow-x-clip text-[#0a0a0a] antialiased">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(15,157,88,0.11),transparent_65%)]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <article className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#0f9d58] transition-colors hover:text-[#0c7a45] sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Volver al inicio
          </Link>

          <Fade>
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
              <div>
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#15a972] to-[#0c8a55] text-white shadow-[0_16px_40px_-12px_rgba(15,157,88,0.5)]">
                  <BookOpen className="h-7 w-7" aria-hidden />
                </div>
                <h1 className="text-balance text-[34px] font-bold leading-[1.02] tracking-[-0.04em] text-[#0a0a0a] sm:text-[44px]">
                  Manual de <span className="pr-accent">usuario</span>
                </h1>
                <p className="mt-3 max-w-xl text-[16px] leading-[1.5] text-neutral-600 [text-wrap:pretty]">
                  {MANUAL_INTRO.lede}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0f9d58]/15 bg-[#e7f7ee]/80 px-3 py-1 text-[12px] font-semibold text-[#0a6b45]">
                    App iOS / Android
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-3 py-1 text-[12px] font-medium text-neutral-600">
                    Red nacional de peajes
                  </span>
                </div>
              </div>
              <div className="relative min-h-[200px] rounded-3xl border border-black/[0.06] bg-gradient-to-br from-white via-white to-[#e8f5ee] p-6 shadow-[0_20px_60px_-30px_rgba(15,157,88,0.25)]">
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#0f9d58]/10 blur-2xl" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f9d58]/80">
                  Resumen
                </p>
                <ul className="mt-4 space-y-3">
                  {["TAG vinculado a tu cuenta", "Recarga inmediata", "Historial de movimientos"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-3 text-[14px] font-medium text-[#0a0a0a]">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f9d58]/12">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
                        </span>
                        {t}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </Fade>

          <nav
            className="mt-12 flex gap-2 overflow-x-auto pb-2 sm:mt-14 sm:flex-wrap sm:overflow-visible"
            aria-label="Secciones del manual"
          >
            {toc.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-3.5 py-2 text-[13px] font-semibold text-neutral-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0f9d58]/30 hover:shadow-md"
              >
                <item.Icon className="h-3.5 w-3.5 text-[#0f9d58]" strokeWidth={2.2} aria-hidden />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="primeros-pasos" className="scroll-mt-24">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
                Primeros <span className="pr-accent">pasos</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {MANUAL_PRIMEROS_PASOS.map((step, i) => {
                  const StepIcon = STEP_ICONS[i] ?? Download;
                  return (
                    <div
                      key={step.id}
                      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-black/[0.05] bg-white/90 p-5 shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-28px_rgba(10,10,10,0.1)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f7ee] text-[#0f9d58] ring-1 ring-[#0f9d58]/10 transition-transform group-hover:scale-105">
                          <StepIcon className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <span className="text-3xl font-bold tabular-nums text-black/[0.04]">0{i + 1}</span>
                      </div>
                      <h3 className="text-[16px] font-bold leading-tight text-[#0a0a0a]">{step.title}</h3>
                      <p className="text-[14px] leading-relaxed text-neutral-600 [text-wrap:pretty]">
                        {step.short}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="kit" className="scroll-mt-24">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
                Kit <span className="pr-accent">prepago</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#0f9d58]/20 bg-gradient-to-br from-[#0f9d58] to-[#075c3a] p-6 text-white shadow-lg">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                    Inversión
                  </p>
                  <p className="mt-2 text-4xl font-extrabold tabular-nums tracking-tight sm:text-5xl">
                    {MANUAL_KIT.precio}
                  </p>
                  <p className="mt-2 text-sm text-white/90">Incluye recarga de arranque.</p>
                </div>
                <div className="flex flex-col justify-between rounded-2xl border border-black/[0.06] bg-white/95 p-6 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Incluido
                  </p>
                  <p className="mt-2 text-3xl font-extrabold tabular-nums text-[#0a0a0a] sm:text-4xl">
                    {MANUAL_KIT.recargaInicial}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">Saldo inicial en el producto.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {MANUAL_KIT.bullets.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f7ee]/90 px-3.5 py-1.5 text-[13px] font-medium text-[#0a4d32] ring-1 ring-[#0f9d58]/15"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center text-[13px] text-neutral-500 [text-wrap:balance]">
                {MANUAL_KIT.nota}
              </p>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="en-la-app" className="scroll-mt-24">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
                En la <span className="pr-accent">app</span>
              </h2>
              <p className="mb-6 max-w-2xl text-[14px] text-neutral-500">
                Mosaico de módulos — mismo criterio que en la app móvil.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {MANUAL_FUNCIONES_APP.map((m) => {
                  const Icon = APP_ICONS[m.id] ?? Home;
                  return (
                    <div
                      key={m.id}
                      className="flex flex-col gap-2 rounded-2xl border border-black/[0.05] bg-gradient-to-b from-white to-[#fafafa] p-4 text-center shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f9d58]/9 text-[#0f9d58]">
                        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                      </div>
                      <p className="text-[13px] font-bold text-[#0a0a0a] leading-tight">{m.title}</p>
                      <p className="text-[11.5px] leading-snug text-neutral-500 [text-wrap:balance]">
                        {m.short}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="ayuda-movil" className="scroll-mt-24">
              <div className="grid items-center gap-8 rounded-3xl border border-black/[0.06] bg-gradient-to-r from-white via-[#f6fcf9] to-white p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
                    Ayuda <span className="pr-accent">en pantalla</span>
                  </h2>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-neutral-700 [text-wrap:pretty]">
                    {MANUAL_AYUDA_MOVIL.short}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    {MANUAL_AYUDA_MOVIL.pictogramSteps.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/80 px-3 py-2.5 shadow-sm"
                      >
                        <span className="text-[13px] font-bold text-[#0f9d58]">{s.label}</span>
                        <span className="text-[12.5px] text-neutral-500">— {s.hint}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <PhoneBubbleIllustration />
              </div>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="puntos-venta" className="scroll-mt-24">
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
                Dónde <span className="pr-accent">comprar</span>
              </h2>
              <p className="mb-4 text-[15px] text-neutral-600">{MANUAL_PUNTOS_VENTA.oneLiner}</p>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {MANUAL_PUNTOS_VENTA.marcas.map((m) => (
                  <span
                    key={m}
                    className={cn(
                      "rounded-2xl border border-black/[0.06] bg-white px-4 py-2.5 text-sm font-bold text-[#0a0a0a] shadow-sm",
                    )}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] text-neutral-400 sm:text-left">
                {MANUAL_PUNTOS_VENTA.foot}
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                Mapa y estaciones en el{" "}
                <Link href="/#estaciones" className="font-semibold text-[#0f9d58] hover:underline">
                  inicio
                </Link>
                .
              </p>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="portal-web" className="scroll-mt-24">
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-[#0f9d58]/25 bg-[#0f9d58]/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0a0a0a] sm:text-2xl">Portal web</h2>
                  <p className="mt-1 text-[14px] text-neutral-600 [text-wrap:pretty]">
                    {MANUAL_WEB_PORTAL.oneLiner}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/login" className="pr-btn inline-flex rounded-full px-5 py-2.5 text-sm font-semibold">
                    Entrar
                  </Link>
                  <Link
                    href="/registro"
                    className="pr-btn-ghost inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    Registro
                  </Link>
                </div>
              </div>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section
              id="contacto"
              className="scroll-mt-24 rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white to-[#f8faf8] p-6 shadow-[0_18px_40px_-28px_rgba(10,10,10,0.12)] sm:p-8"
            >
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f7ee] text-[#0f9d58]">
                    <Phone className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-[#0a0a0a] sm:text-xl">Centro de Servicios</h2>
                    <a
                      href={MANUAL_CONTACTO.telefonoHref}
                      className="mt-1 block text-2xl font-extrabold tracking-tight text-[#0f9d58] sm:text-3xl"
                    >
                      {MANUAL_CONTACTO.telefonoTexto}
                    </a>
                    <p className="text-[13px] font-medium text-neutral-500">{MANUAL_CONTACTO.sub}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[12px] text-neutral-500 sm:text-right">{MANUAL_CONTACTO.pie}</p>
            </section>
          </Fade>

          <div className="pr-rule my-10 sm:my-12" />

          <Fade>
            <section id="preguntas" className="scroll-mt-24">
              <h2 className="mb-6 text-2xl font-bold text-[#0a0a0a] sm:text-3xl">
                FAQ <span className="pr-accent">rápido</span>
              </h2>
              <div className="grid gap-2.5 sm:grid-cols-1">
                {FAQ_PASO_RAPIDO.map((item, i) => (
                  <details
                    key={i}
                    className="group overflow-hidden rounded-2xl border border-black/[0.07] bg-white/95 shadow-sm open:border-l-4 open:border-l-[#0f9d58] open:shadow-md"
                  >
                    <summary className="cursor-pointer list-none px-4 py-3.5 pl-4 text-left text-[14.5px] font-semibold text-[#0a0a0a] [text-wrap:pretty] marker:content-['']">
                      {item.q}
                    </summary>
                    <p className="border-t border-black/[0.04] px-4 py-3 text-[13.5px] leading-relaxed text-neutral-600 [text-wrap:pretty]">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </Fade>

          <div className="mt-10 text-center sm:mt-12">
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f9d58]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#0f9d58] shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              Abrir acordeón completo en inicio
            </Link>
          </div>
        </article>
        <Footer />
      </div>
    </main>
  );
}
