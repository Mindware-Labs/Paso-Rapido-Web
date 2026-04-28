"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  CarFront,
  Check,
  Phone,
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
  {
    id: "transfer" as const,
    label: "Transferencia",
    sub: "Referencia bancaria",
  },
] as const;

const fmt = (n: number) =>
  `RD$ ${n.toLocaleString("es-DO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-mono font-bold text-slate-900 tabular-nums shadow-sm transition placeholder:text-slate-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

const sectionLabel =
  "text-[10px] font-bold uppercase tracking-wider text-slate-500";

const springSnappy = { type: "spring" as const, stiffness: 420, damping: 28 };

// ─── Sub-components ────────────────────────────────────────────────────────────

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
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
          <Icon className="h-5 w-5 text-emerald-600" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  // ─── Success State ───
  if (done) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50/50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springSnappy}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-8 w-8 text-emerald-600" strokeWidth={3} />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            ¡Recarga Exitosa!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            El balance ha sido acreditado al dispositivo:
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-slate-700">
            {TAG_ID}
          </p>

          <div className="my-6 rounded-xl bg-slate-50 py-6 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Monto Recargado
            </p>
            <p className="mt-1 font-mono text-4xl font-extrabold tracking-tight text-emerald-700">
              {fmt(total)}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setDone(false)}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              Nueva Recarga
            </button>
            <Link
              href="/dashboard"
              className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              Ir al Panel
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main Flow ───
  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* ── CONTENEDOR FLUIDO ── */}
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional ── */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-emerald-600"
              >
                <ArrowLeft className="h-3 w-3" />
                Panel
              </Link>
              <span className="text-slate-300">/</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Operaciones
              </p>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Recargar Saldo
              </h1>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-200">
                <Zap className="h-3 w-3 text-emerald-500" />
                Inmediato
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {name ? (
                <span className="font-semibold text-slate-700">{name}</span>
              ) : (
                "Usuario"
              )}{" "}
              · Cuenta:{" "}
              <span className="font-mono text-slate-700">{TAG_ID}</span>
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:min-w-[200px] sm:text-right">
            <p className={sectionLabel}>Balance Disponible</p>
            <p className="mt-1 font-mono text-3xl font-extrabold tracking-tight text-slate-900">
              {fmt(balance)}
            </p>
          </div>
        </header>

        {/* ── Grid Principal ── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* ── Main (Flujo de Pago) ── */}
          <main className="space-y-6 lg:col-span-8">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-1.5 w-full bg-emerald-600" />

              <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-700">
                  1. Detalle de la Recarga
                </h2>
              </div>

              {/* Selección de Monto */}
              <div className="p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Monto a recargar
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PRESETS.map((p) => {
                    const selected = preset === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPreset(p.id)}
                        className={cn(
                          "rounded-xl border py-3.5 text-sm font-bold font-mono tabular-nums transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-[0.98]",
                          selected
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-500"
                            : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50",
                        )}
                      >
                        RD$ {p.label}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setPreset("custom")}
                    className={cn(
                      "rounded-xl border py-3.5 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-[0.98]",
                      preset === "custom"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-500"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-slate-50",
                    )}
                  >
                    Otro Monto
                  </button>
                </div>

                <AnimatePresence>
                  {preset === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="relative max-w-sm">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-slate-400">
                          RD$
                        </span>
                        <input
                          className={cn(inputClass, "pl-12")}
                          inputMode="decimal"
                          placeholder="0.00"
                          value={custom}
                          onChange={(e) => setCustom(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Método de Pago */}
              <div className="border-t border-slate-100 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Método de pago
                  </p>
                  <Link
                    href="/dashboard/metodos-pago"
                    className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:underline"
                  >
                    Gestionar
                  </Link>
                </div>

                <div className="space-y-3">
                  {METHODS.map((m) => {
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
                          active
                            ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                        )}
                      >
                        <div>
                          <p
                            className={cn(
                              "text-sm font-bold",
                              active ? "text-emerald-800" : "text-slate-900",
                            )}
                          >
                            {m.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {m.sub}
                          </p>
                        </div>
                        {m.id === "transfer" ? (
                          <Landmark
                            className={cn(
                              "h-5 w-5",
                              active ? "text-emerald-600" : "text-slate-400",
                            )}
                          />
                        ) : (
                          <CreditCard
                            className={cn(
                              "h-5 w-5",
                              active ? "text-emerald-600" : "text-slate-400",
                            )}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirmación y Botón */}
              <div className="border-t border-slate-100 bg-slate-50 p-6">
                <label className="flex cursor-pointer items-start gap-3 mb-6">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <span className="text-sm text-slate-600 leading-snug">
                    Autorizo el débito al método seleccionado y confirmo que he
                    leído los{" "}
                    <a
                      href="#"
                      className="font-semibold text-emerald-600 hover:underline"
                    >
                      términos de servicio
                    </a>
                    .
                  </span>
                </label>

                <button
                  type="button"
                  disabled={!canPay}
                  onClick={() => {
                    if (canPay) setDone(true);
                  }}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-[0.98]",
                    canPay
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed",
                  )}
                >
                  Procesar Recarga {amount > 0 ? fmt(total) : ""}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          </main>

          {/* ── Sidebar (Resumen y Ayuda) ── */}
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            {/* Resumen Financiero */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                <p className={sectionLabel}>Proyección de Balance</p>
              </div>
              <div className="p-5">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex justify-between items-center">
                    <span>Balance actual</span>
                    <span className="font-mono font-semibold text-slate-900">
                      {fmt(balance)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Monto a recargar</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {amount > 0 ? `+ ${fmt(amount)}` : "—"}
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      Comisión por servicio
                    </span>
                    <span className="font-semibold text-slate-400">
                      RD$ 0.00
                    </span>
                  </li>
                </ul>
                <div className="my-4 border-t border-slate-100 border-dashed" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">
                    Nuevo Balance
                  </span>
                  <span className="font-mono text-xl font-extrabold text-emerald-700">
                    {fmt(balance + amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <SideCard icon={ShieldCheck} title="Pago 100% Seguro">
              Operación procesada mediante conexión cifrada TLS. Cumplimos con
              los estándares de seguridad bancaria PCI DSS.
            </SideCard>

            {/* Enlaces de Ayuda */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className={sectionLabel}>¿Necesita asistencia?</p>
              <div className="mt-4 space-y-3">
                <a
                  href="tel:8092000000"
                  className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-emerald-600"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                    <Phone className="h-4 w-4" />
                  </div>
                  809-200-0000
                </a>
                <Link
                  href="/dashboard/ayuda"
                  className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-emerald-600"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                    <LifeBuoy className="h-4 w-4" />
                  </div>
                  Centro de Ayuda
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
