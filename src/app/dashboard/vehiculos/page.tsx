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
  Tag,
  CircleDollarSign,
  Wallet,
  Gauge,
  Activity,
  Trash2,
  Snowflake,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  { id: "s1", label: "Balance total", value: "RD$ 765.00", Icon: Wallet, color: "emerald" },
  { id: "s2", label: "Vehículos activos", value: "2 de 3", Icon: Car, color: "blue" },
  { id: "s3", label: "Pases este mes", value: "42", Icon: Activity, color: "violet" },
  { id: "s4", label: "Gasto mensual", value: "RD$ 4,200", Icon: CircleDollarSign, color: "amber" },
];

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<TagStatus, { badge: string; dot: string; label: string }> = {
  activo: {
    badge: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    label: "Activo",
  },
  bajo_balance: {
    badge: "bg-red-50 text-red-600",
    dot: "bg-red-400",
    label: "Bajo balance",
  },
  congelado: {
    badge: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    label: "Congelado",
  },
};

const STAT_COLORS: Record<string, { bg: string; icon: string }> = {
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
  blue: { bg: "bg-blue-50", icon: "text-blue-600" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600" },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return <h2 className="text-sm font-bold text-gray-900">{title}</h2>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VehiculosPage() {
  const [vehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [frozen, setFrozen] = useState<Record<string, boolean>>({});

  const toggleFreeze = (id: string) => setFrozen((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Mi cuenta</p>
            <h1 className="text-xl font-extrabold text-gray-900">Mis vehículos</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Agregar vehículo
          </button>
        </div>

        {/* ── Stats row ── */}
        <section>
          <div className="mb-3">
            <SectionHeader title="Resumen general" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {STATS.map((s) => {
              const c = STAT_COLORS[s.color];
              return (
                <div key={s.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg}`}>
                    <s.Icon className={`h-5 w-5 ${c.icon}`} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Vehicle list ── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <SectionHeader title="Vehículos registrados" />
            <span className="text-xs text-gray-400">{vehicles.length} en total</span>
          </div>

          <div className="space-y-2">
            {vehicles.map((v) => {
              const isFrozen = frozen[v.id] || false;
              const status: TagStatus = isFrozen ? "congelado" : v.tagStatus;
              const c = STATUS_CONFIG[status];
              const low = v.balance < 100 && !isFrozen;

              return (
                <div key={v.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex items-center gap-4 px-4 py-3.5">
                    {/* Car icon */}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                      <Car className="h-5 w-5 text-gray-400" strokeWidth={1.75} />
                    </span>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {v.marca} {v.modelo}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {v.placa} · {v.year} · {v.color} · TAG {v.tagNumber}
                          </p>
                        </div>
                        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${c.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                          {c.label}
                        </span>
                      </div>

                      {/* Balance + mini stats */}
                      <div className="mt-2.5 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400">Balance</span>
                          <span className={`text-xs font-bold tabular-nums ${low ? "text-red-500" : "text-gray-800"}`}>
                            RD$ {v.balance.toLocaleString("es-DO")}
                          </span>
                          {low && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-semibold text-red-500">
                              <ShieldAlert className="h-2 w-2" />
                              Bajo
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-300">|</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                          <Activity className="h-3 w-3" />
                          <span className="font-semibold text-gray-700">{v.pasesMes}</span> pases
                        </div>
                        <span className="text-[10px] text-gray-300">|</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                          <Gauge className="h-3 w-3" />
                          <span className="font-semibold text-gray-700">RD$ {v.gastoMes.toLocaleString("es-DO")}</span> gasto
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/40 px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Link
                        href="/dashboard/recargar"
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-emerald-700 transition-colors"
                      >
                        <RefreshCw className="h-3 w-3" strokeWidth={2} />
                        Recargar
                      </Link>
                      <Link
                        href="/dashboard/historico"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                      >
                        <History className="h-3 w-3" strokeWidth={1.75} />
                        Historial
                      </Link>
                      <Link
                        href="/dashboard/reclamaciones"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                      >
                        <CreditCard className="h-3 w-3" strokeWidth={1.75} />
                        Reclamar
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFreeze(v.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          isFrozen ? "bg-slate-400" : "bg-gray-200"
                        }`}
                        role="switch"
                        aria-checked={isFrozen}
                        title={isFrozen ? "Descongelar" : "Congelar"}
                      >
                        <span
                          className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
                            isFrozen ? "translate-x-4.5" : "translate-x-0.5"
                          }`}
                        >
                          {isFrozen ? (
                            <Lock className="h-2 w-2 text-slate-500" strokeWidth={2.5} />
                          ) : (
                            <LockOpen className="h-2 w-2 text-gray-400" strokeWidth={2.5} />
                          )}
                        </span>
                      </button>
                      <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                        <Edit2 className="h-3 w-3" strokeWidth={1.75} />
                      </button>
                      <button className="rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Trash2 className="h-3 w-3" strokeWidth={1.75} />
                      </button>
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