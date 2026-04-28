"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  CarFront,
  Check,
  ChevronRight,
  CreditCard,
  Landmark,
  LifeBuoy,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const TAG_ID = "TAG-4892";

const PRESETS = [
  { id: "200" as const, label: "200", value: 200 },
  { id: "500" as const, label: "500", value: 500 },
  { id: "1000" as const, label: "1,000", value: 1000 },
] as const;

type PresetId = (typeof PRESETS)[number]["id"] | "custom";

const METHODS = [
  { id: "saved" as const, label: "Tarjeta ·••• 4242", sub: "Guardada" },
  { id: "new" as const, label: "Nueva tarjeta", sub: "Visa / Mastercard" },
  { id: "transfer" as const, label: "Transferencia", sub: "Referencia bancaria" },
] as const;

const fmt = (n: number) =>
  `RD$ ${n.toLocaleString("es-DO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-mono text-slate-900 tabular-nums shadow-[inset_0_1px_0_rgba(15,23,42,0.04)] transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

const sectionLabel = "text-xs font-semibold uppercase tracking-[0.08em] text-slate-500";

const springSnappy = { type: "spring" as const, stiffness: 420, damping: 28 };

function PageBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 pr-grain-dots opacity-40 [background-size:22px_22px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 pr-hero-mesh opacity-[0.35] [mask-image:linear-gradient(180deg,black_0%,black_50%,transparent_100%)]"
        aria-hidden
      />
    </>
  );
}

function SideCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={springSnappy}
      className="group rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-sm ring-1 ring-slate-900/[0.03] backdrop-blur-[2px] transition-shadow hover:shadow-md hover:ring-slate-900/[0.06]"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100/90 bg-gradient-to-b from-emerald-50/95 to-emerald-50/50 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform group-hover:scale-105">
          <Icon className="size-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-snug text-slate-900">{title}</p>
          <div className="mt-1.5 text-xs leading-relaxed text-slate-500 [text-wrap:balance]">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden>
      <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400/70 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500 shadow-[0_0_0_1px_rgba(255,255,255,0.9)]" />
    </span>
  );
}

export default function RecargarPage() {
  const { userData } = useAuth();
  const [balance] = useState(500);
  const [preset, setPreset] = useState<PresetId>("500");
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]["id"]>("saved");
  const [terms, setTerms] = useState(false);
  const [done, setDone] = useState(false);

  const name = userData
    ? [userData.primerNombre, userData.segundoNombre].filter(Boolean).join(" ")
    : null;

  const amount = useMemo(() => {
    if (preset === "custom") {
      const n = parseFloat(String(custom).replace(/[^0-9.]/g, ""));
      if (!Number.isFinite(n) || n <= 0) return 0;
      return Math.round(n * 100) / 100;
    }
    return PRESETS.find((p) => p.id === preset)?.value ?? 0;
  }, [preset, custom]);

  const total = amount;
  const canPay = amount >= 50 && terms;

  if (done) {
    return (
      <div className="relative min-h-full overflow-hidden bg-slate-50/50 pb-12">
        <PageBackdrop />
        <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={springSnappy}
            className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-8 text-center shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/[0.04] backdrop-blur-sm sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...springSnappy, delay: 0.05 }}
              className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50 to-emerald-50/40 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_-4px_rgba(16,185,129,0.25)]"
              aria-hidden
            >
              <Check className="size-7" strokeWidth={2.25} />
            </motion.div>
            <h1 className="mt-5 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Recarga completada</h1>
            <motion.p
              key={fmt(total)}
              initial={{ opacity: 0.5, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSnappy}
              className="mt-2 font-mono text-2xl font-bold tabular-nums tracking-tight text-slate-900 sm:text-3xl"
            >
              {fmt(total)}
            </motion.p>
            <p className="mt-2 text-sm text-slate-500">
              Acreditado a <span className="font-mono font-semibold text-slate-700">{TAG_ID}</span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-3">
              <Link
                href="/dashboard"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 sm:flex-initial"
              >
                Panel
              </Link>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setDone(false);
                }}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 [box-shadow:0_1px_0_rgba(15,23,42,0.12),0_8px_20px_-4px_rgba(16,185,129,0.45)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 sm:flex-initial"
              >
                Nueva recarga
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-slate-50/50 pb-12">
      <PageBackdrop />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="pr-reveal flex flex-col gap-5 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="min-w-0 flex-1">
            <Link
              href="/dashboard"
              className="group mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" aria-hidden />
              Volver al panel
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Operaciones</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Recargar saldo</h1>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-sm"
                title="Sesión protegida"
              >
                <Zap className="size-3.5 text-amber-500" strokeWidth={2.25} aria-hidden />
                Rápido
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              {name ? <span className="font-semibold text-slate-800">{name}</span> : "Cuenta"} ·{" "}
              <span className="font-mono text-slate-800">{TAG_ID}</span>
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <PulseDot />
              <span>Conexión cifrada · pago en segundos</span>
            </div>
          </div>
          <motion.div
            whileHover={{ y: -2 }}
            transition={springSnappy}
            className="shrink-0 self-start rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 px-5 py-3.5 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/[0.04] sm:self-center sm:min-w-[9.5rem] sm:text-right"
          >
            <p className={sectionLabel}>Disponible</p>
            <p className="mt-1 text-2xl font-bold font-mono tabular-nums tracking-tight text-slate-900">
              {fmt(balance)}
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-emerald-600/90">Listo para usar</p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
          <div className="pr-reveal pr-reveal-delay-1 flex min-w-0 flex-col gap-6 lg:col-span-2">
            <section
              aria-labelledby="recarga-flow-heading"
              className="group/card overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/8"
            >
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent opacity-90" />
              <div className="border-b border-slate-200/80 bg-slate-50/90 px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h2
                      id="recarga-flow-heading"
                      className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-slate-700"
                    >
                      <span>Detalle de la recarga</span>
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">Monto mínimo RD$ 50,00</p>
                  </div>
                  <Zap
                    className="size-4 text-emerald-500/80 opacity-80"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
              </div>

              <div className="flex flex-col divide-y divide-slate-100/90">
                <div className="flex flex-col gap-3 p-5 sm:p-6">
                  <p className={sectionLabel}>Monto</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {PRESETS.map((p) => {
                      const selected = preset === p.id;
                      return (
                        <motion.button
                          key={p.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setPreset(p.id);
                          }}
                          className={cn(
                            "min-h-[44px] rounded-xl border px-2.5 py-2 text-sm font-bold font-mono tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
                            selected
                              ? "border-emerald-500 bg-gradient-to-b from-emerald-50/95 to-emerald-100/30 text-emerald-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_0_0_1px_rgba(16,185,129,0.15),0_6px_16px_-4px_rgba(16,185,129,0.25)]"
                              : "border-slate-200 bg-white/90 text-slate-800 transition hover:border-emerald-300/60 hover:bg-emerald-50/20"
                          )}
                        >
                          RD$ {p.label}
                        </motion.button>
                      );
                    })}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setPreset("custom");
                      }}
                      className={cn(
                        "min-h-[44px] rounded-xl border px-2.5 py-2 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",
                        preset === "custom"
                          ? "border-emerald-500 bg-gradient-to-b from-emerald-50/95 to-emerald-100/30 text-emerald-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_0_0_1px_rgba(16,185,129,0.15),0_6px_16px_-4px_rgba(16,185,129,0.25)]"
                          : "border-slate-200 bg-white/90 text-slate-800 transition hover:border-emerald-300/60 hover:bg-emerald-50/20"
                      )}
                    >
                      Otro
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {preset === "custom" ? (
                      <motion.div
                        key="custom-input"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="mt-0 overflow-hidden"
                      >
                        <input
                          className={cn(inputClass, "mt-2 max-w-xs")}
                          inputMode="decimal"
                          placeholder="0.00"
                          value={custom}
                          onChange={(e) => {
                            setCustom(e.target.value);
                          }}
                          aria-label="Monto personalizado"
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-2 p-5 sm:p-6">
                  <p className={cn(sectionLabel, "mb-1")}>Método de pago</p>
                  {METHODS.map((m) => {
                    const active = method === m.id;
                    return (
                      <motion.button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMethod(m.id);
                        }}
                        className={cn(
                          "group flex w-full min-h-[3.25rem] items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/35",
                          active
                            ? "border-emerald-300/90 bg-gradient-to-r from-emerald-50/95 to-white/95 shadow-[inset_4px_0_0_#10b981,inset_0_1px_0_rgba(255,255,255,0.5),0_4px_18px_-6px_rgba(16,185,129,0.2)]"
                            : "border-slate-200/90 bg-white/90 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-sm"
                        )}
                      >
                        <span className="min-w-0 pl-0.5">
                          <span className="block font-bold text-slate-900">{m.label}</span>
                          <span className="text-xs text-slate-500">{m.sub}</span>
                        </span>
                        {m.id === "transfer" ? (
                          <Landmark
                            className="size-4 shrink-0 text-slate-400 transition group-hover:scale-110 group-hover:text-emerald-600"
                            aria-hidden
                          />
                        ) : (
                          <CreditCard
                            className="size-4 shrink-0 text-slate-400 transition group-hover:scale-110 group-hover:text-emerald-600"
                            aria-hidden
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="p-5 sm:px-6 sm:py-4">
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 text-sm leading-snug transition",
                      terms
                        ? "border-emerald-200/90 bg-gradient-to-r from-emerald-50/40 to-white/80 text-slate-700"
                        : "border-slate-100/90 bg-slate-50/60 text-slate-600 hover:border-slate-200 hover:bg-slate-100/50"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500/30"
                      checked={terms}
                      onChange={(e) => {
                        setTerms(e.target.checked);
                      }}
                    />
                    <span className="select-none">Acepto los términos y el débito al método seleccionado.</span>
                  </label>
                </div>

                <div className="flex flex-col gap-2 border-t border-slate-100/90 bg-gradient-to-b from-slate-50/40 to-white/30 p-5 sm:flex-row sm:items-stretch sm:p-6">
                  <motion.button
                    type="button"
                    whileHover={canPay ? { scale: 1.01 } : {}}
                    whileTap={canPay ? { scale: 0.99 } : {}}
                    disabled={!canPay}
                    onClick={() => {
                      if (!canPay) return;
                      setDone(true);
                    }}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-700 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 [box-shadow:0_1px_0_rgba(15,23,42,0.12)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    <span>Confirmar {amount > 0 ? fmt(total) : ""}</span>
                    <ChevronRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </motion.button>
                  <Link
                    href="/dashboard/metodos-pago"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200/90 bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 sm:px-5"
                  >
                    Gestionar medios
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <aside className="pr-reveal pr-reveal-delay-2 flex min-w-0 flex-col gap-4 lg:col-span-1 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-emerald-50/25 p-5 shadow-md ring-1 ring-slate-900/[0.03] backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2">
                <p className={sectionLabel}>Resumen</p>
                <Wallet className="size-4 text-emerald-500/50" aria-hidden />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={amount > 0 ? `t-${total}` : "empty"}
                  initial={{ opacity: 0.3, y: 8, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0.4 }}
                  transition={springSnappy}
                  className="mt-2.5 text-2xl font-bold font-mono tabular-nums tracking-tight text-slate-900"
                >
                  {amount > 0 ? fmt(total) : "—"}
                </motion.p>
              </AnimatePresence>
              <ul className="mt-4 flex flex-col gap-0 border-t border-slate-200/60 pt-3.5 text-sm text-slate-600">
                <li className="flex justify-between gap-3 border-b border-slate-100/80 py-1.5 first:pt-0 last:border-0 last:pb-0">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {amount > 0 ? fmt(amount) : "—"}
                  </span>
                </li>
                <li className="flex justify-between gap-2 py-1.5 text-slate-500">
                  <span>Comisión</span>
                  <span className="font-mono">RD$ 0,00</span>
                </li>
              </ul>
            </div>

            <SideCard icon={ShieldCheck} title="Pago seguro">
              Procesado con cifrado TLS; tarjetas con 3D Secure según banco emisor.
            </SideCard>

            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm ring-1 ring-slate-900/[0.02] backdrop-blur-sm sm:p-5">
              <p className={sectionLabel}>Comprobante</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 [text-wrap:pretty]">
                Se envía el resumen al correo registrado en su perfil tras la operación.
              </p>
            </div>

            <Link
              href="/dashboard/peajes"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm ring-1 ring-slate-900/[0.02] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/90 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-100/90 text-slate-600 transition group-hover:border-emerald-200/80 group-hover:bg-emerald-50/50 group-hover:text-emerald-700">
                  <CarFront className="size-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">Mapa de peajes</p>
                  <p className="text-xs text-slate-500">Red de estaciones</p>
                </div>
              </div>
              <ChevronRight
                className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                aria-hidden
              />
            </Link>

            <SideCard icon={LifeBuoy} title="Soporte">
              <a
                href="tel:8092000000"
                className="font-bold text-slate-800 underline-offset-2 transition hover:text-emerald-700 hover:underline"
              >
                809-200-0000
              </a>
              <span className="text-slate-300"> · </span>
              <span>Lun–Vie 8:00–18:00</span>
            </SideCard>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/dashboard/historico"
                className="flex min-h-[40px] flex-1 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 py-2.5 text-center text-xs font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
              >
                Histórico
              </Link>
              <Link
                href="/dashboard/ayuda"
                className="flex min-h-[40px] flex-1 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 py-2.5 text-center text-xs font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
              >
                Ayuda
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
