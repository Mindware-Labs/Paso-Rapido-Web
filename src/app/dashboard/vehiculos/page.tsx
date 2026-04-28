"use client";

import {
  ArrowRight,
  Car,
  CreditCard,
  Edit2,
  History,
  Lock,
  LockOpen,
  Plus,
  RefreshCw,
  ShieldAlert,
  CircleDollarSign,
  Wallet,
  Gauge,
  Activity,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type TagStatus = "activo" | "bajo_balance" | "congelado";

interface Vehicle {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  year: string;
  color: string;
  tagNumber: string;
  tagStatus: TagStatus;
  balance: number;
  pasesMes: number;
  gastoMes: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    placa: "AA44712",
    marca: "Toyota",
    modelo: "Corolla",
    year: "2021",
    color: "Blanco",
    tagNumber: "582204",
    tagStatus: "activo",
    balance: 230,
    pasesMes: 14,
    gastoMes: 1400,
  },
  {
    id: "v2",
    placa: "G789012",
    marca: "Honda",
    modelo: "Civic",
    year: "2019",
    color: "Negro",
    tagNumber: "391055",
    tagStatus: "bajo_balance",
    balance: 85,
    pasesMes: 6,
    gastoMes: 600,
  },
  {
    id: "v3",
    placa: "M456789",
    marca: "Mitsubishi",
    modelo: "Montero",
    year: "2020",
    color: "Rojo",
    tagNumber: "712893",
    tagStatus: "activo",
    balance: 450,
    pasesMes: 22,
    gastoMes: 2200,
  },
];

const STATS = [
  {
    id: "s1",
    label: "Balance total",
    value: "RD$ 765.00",
    Icon: Wallet,
    color: "emerald",
  },
  {
    id: "s2",
    label: "Vehículos activos",
    value: "2 de 3",
    Icon: Car,
    color: "blue",
  },
  {
    id: "s3",
    label: "Pases este mes",
    value: "42",
    Icon: Activity,
    color: "violet",
  },
  {
    id: "s4",
    label: "Gasto mensual",
    value: "RD$ 4,200",
    Icon: CircleDollarSign,
    color: "amber",
  },
];

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  TagStatus,
  { badge: string; dot: string; label: string }
> = {
  activo: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
    label: "Activo",
  },
  bajo_balance: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
    label: "Bajo balance",
  },
  congelado: {
    badge: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
    label: "Congelado",
  },
};

const STAT_COLORS: Record<
  string,
  { bg: string; icon: string; border: string }
> = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "border-emerald-100",
  },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    border: "border-violet-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "border-amber-100",
  },
};

// ─── Format Helpers ───────────────────────────────────────────────────────────

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  })
    .format(amount)
    .replace("DOP", "RD$");
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VehiculosPage() {
  const [vehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [frozen, setFrozen] = useState<Record<string, boolean>>({});

  const toggleFreeze = (id: string) =>
    setFrozen((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* ── CONTENEDOR FLUIDO (Sin max-w) ── */}
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional ── */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Gestión de Flotilla
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Mis Vehículos
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Administre los vehículos y dispositivos TAG asociados a su cuenta.
              Revise el balance individual, congele dispositivos por seguridad o
              asigne nuevas unidades.
            </p>
          </div>

          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98] sm:w-auto">
            <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
            Agregar vehículo
          </button>
        </header>

        {/* ── Banner de Estadísticas ── */}
        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => {
              const c = STAT_COLORS[s.color];
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
                      c.bg,
                      c.border,
                    )}
                  >
                    <s.Icon
                      className={cn("h-6 w-6", c.icon)}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {s.label}
                    </p>
                    <p className="font-mono text-xl font-bold tabular-nums tracking-tight text-slate-900">
                      {s.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Grid de Vehículos Registrados ── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
              Vehículos Registrados
            </h2>
            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
              {vehicles.length}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((v) => {
              const isFrozen = frozen[v.id] || false;
              const status: TagStatus = isFrozen ? "congelado" : v.tagStatus;
              const c = STATUS_CONFIG[status];
              const lowBalance = v.balance < 100 && !isFrozen;

              return (
                <div
                  key={v.id}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all",
                    isFrozen
                      ? "border-slate-200 opacity-80 grayscale-[20%]"
                      : "border-slate-200 hover:border-emerald-200 hover:shadow-md",
                  )}
                >
                  {/* Cabecera de la Tarjeta */}
                  <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                        <Car
                          className="h-6 w-6 text-slate-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {v.marca} {v.modelo}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {v.year} · {v.color}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                        c.badge,
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
                      {c.label}
                    </span>
                  </div>

                  {/* Detalles Técnicos */}
                  <div className="px-6 py-2">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 border border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 w-12">
                        Placa
                      </p>
                      <p className="font-mono text-sm font-bold text-slate-900">
                        {v.placa}
                      </p>
                      <span className="mx-2 text-slate-300">|</span>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        TAG
                      </p>
                      <p className="font-mono text-xs font-semibold text-slate-600">
                        {v.tagNumber}
                      </p>
                    </div>
                  </div>

                  {/* Resumen Financiero del Vehículo */}
                  <div className="flex items-end justify-between px-6 py-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Balance Actual
                      </p>
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "font-mono text-2xl font-extrabold tracking-tight",
                            lowBalance ? "text-amber-600" : "text-slate-900",
                          )}
                        >
                          {formatCurrency(v.balance)}
                        </p>
                        {lowBalance && (
                          <ShieldAlert className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Este Mes
                      </p>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                        <span className="flex items-center gap-1">
                          <Activity className="h-3.5 w-3.5 text-slate-400" />
                          {v.pasesMes} pases
                        </span>
                        <span className="flex items-center gap-1">
                          <Gauge className="h-3.5 w-3.5 text-slate-400" />
                          {formatCurrency(v.gastoMes)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pie de Tarjeta / Acciones */}
                  <div className="mt-auto border-t border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex items-center justify-between">
                      {/* Acciones Rápidas */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/recargar?tag=${v.tagNumber}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                          <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
                          Recargar
                        </Link>
                        <Link
                          href={`/dashboard/historico?tag=${v.tagNumber}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <History
                            className="h-3.5 w-3.5 text-slate-400"
                            strokeWidth={2}
                          />
                          Detalle
                        </Link>
                      </div>

                      {/* Controles de Gestión */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFreeze(v.id)}
                          className={cn(
                            "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500/20",
                            isFrozen ? "bg-slate-400" : "bg-slate-200",
                          )}
                          role="switch"
                          aria-checked={isFrozen}
                          title={
                            isFrozen
                              ? "Descongelar dispositivo"
                              : "Congelar dispositivo"
                          }
                        >
                          <span
                            className={cn(
                              "pointer-events-none inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                              isFrozen ? "translate-x-4" : "translate-x-0",
                            )}
                          >
                            {isFrozen ? (
                              <Lock
                                className="h-3 w-3 text-slate-400"
                                strokeWidth={2.5}
                              />
                            ) : (
                              <LockOpen
                                className="h-3 w-3 text-emerald-500"
                                strokeWidth={2.5}
                              />
                            )}
                          </span>
                        </button>

                        <div className="h-4 w-px bg-slate-300 mx-1" />

                        <button
                          className="rounded-md p-1.5 text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                        <button
                          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:shadow-sm transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
