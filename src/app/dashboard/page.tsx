"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CarFront,
  ChevronRight,
  CircleDollarSign,
  History,
  LifeBuoy,
  RefreshCw,
  Tag,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// ─── Mock data simplificada ───────────────────────────────────────────────────

const USER = {
  plan: "Cuenta Personal",
  tag: "TAG-4892",
  tagActive: true,
};

const BALANCE = {
  available: "RD$ 500.00",
  reserved: "RD$ 100.00",
  lastRecharge: { amount: "RD$ 500.00", date: "Ayer, 16:10" },
  lastPass: { amount: "RD$ -100.00", toll: "Las Américas", date: "Hoy, 08:42" },
};

// ─── Mapa de colores semánticos ──────────────────────────────────────────────
const colorMap = {
  emerald: {
    light: "bg-emerald-50 border-emerald-100 text-emerald-600",
    hover: "group-hover:bg-emerald-100/60",
  },
  amber: {
    light: "bg-amber-50 border-amber-100 text-amber-600",
    hover: "group-hover:bg-amber-100/60",
  },
  slate: {
    light: "bg-slate-100 border-slate-200 text-slate-600",
    hover: "group-hover:bg-slate-200/60",
  },
};

type ColorKey = keyof typeof colorMap;

const STATS: {
  id: string;
  label: string;
  value: string;
  Icon: any;
  color: ColorKey;
}[] = [
  {
    id: "s1",
    label: "Pases este mes",
    value: "14",
    Icon: Tag,
    color: "emerald",
  },
  {
    id: "s2",
    label: "Gasto acumulado",
    value: "RD$ 1,400",
    Icon: CircleDollarSign,
    color: "slate",
  },
  {
    id: "s3",
    label: "Pases restantes",
    value: "~5 pases",
    Icon: Wallet,
    color: "amber",
  },
];

const ACTIVITY = [
  {
    id: "a1",
    title: "Peaje Las Américas",
    sub: "Hoy · 08:42",
    amount: "RD$ -100.00",
    out: true,
    status: "Completado",
  },
  {
    id: "a2",
    title: "Recarga",
    sub: "Ayer · 16:10",
    amount: "RD$ +500.00",
    out: false,
    status: "Aprobado",
  },
  {
    id: "a3",
    title: "Peaje Autopista 6 de Noviembre",
    sub: "Lun · 07:15",
    amount: "RD$ -100.00",
    out: true,
    status: "Completado",
  },
  {
    id: "a4",
    title: "Peaje Autopista Duarte",
    sub: "Dom · 18:30",
    amount: "RD$ -100.00",
    out: true,
    status: "Completado",
  },
];

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function StatCard({
  label,
  value,
  Icon,
  color,
}: {
  label: string;
  value: string;
  Icon: any;
  color: ColorKey;
}) {
  const palette = colorMap[color];
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${palette.light}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

function ActivityRow({ item }: { item: (typeof ACTIVITY)[0] }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0 transition-colors hover:bg-slate-50/50 px-2 rounded-lg">
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            item.out
              ? "bg-slate-100 border-slate-200 text-slate-600"
              : "bg-emerald-50 border-emerald-100 text-emerald-600"
          }`}
        >
          {item.out ? (
            <CarFront className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <TrendingUp className="h-4 w-4" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">
            {item.title}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
        </div>
      </div>
      <div className="text-right shrink-0 pl-4">
        <p
          className={`text-sm font-bold font-mono tabular-nums ${
            item.out ? "text-slate-900" : "text-emerald-600"
          }`}
        >
          {item.amount}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
          {item.status}
        </p>
      </div>
    </div>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { userData } = useAuth();
  const fullName = userData
    ? [userData.primerNombre, userData.segundoNombre].filter(Boolean).join(" ")
    : "Usuario";

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* Contenedor fluido sin límite artificial */}
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado y Alertas ── */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Panel de Control
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Resumen de Cuenta
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 max-w-2xl">
              Bienvenido,{" "}
              <span className="font-semibold text-slate-700">{fullName}</span>.
              Consulte su saldo, actividad reciente y estado de su dispositivo
              Paso Rápido.
            </p>
          </div>

          {/* Alerta de saldo bajo (condicional) */}
          <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-2.5 shadow-sm sm:w-auto shrink-0">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-bold text-amber-800">
                Saldo próximo a agotarse
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                Le quedan aproximadamente 5 pases.
              </p>
            </div>
          </div>
        </header>

        {/* ── Grid Principal ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Columna Izquierda (Balance y Acciones) */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Tarjeta de Balance Institucional */}
            <section
              aria-labelledby="balance-heading"
              className="relative overflow-hidden rounded-2xl border border-emerald-700 bg-emerald-700 p-6 text-white shadow-sm"
            >
              {/* Decoraciones sutiles */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
              <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/5" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Zap
                      className="h-4 w-4 text-emerald-300"
                      fill="currentColor"
                    />
                    <span className="text-sm font-bold tracking-wide text-emerald-50">
                      {USER.tag}
                    </span>
                  </div>
                  {USER.tagActive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-inset ring-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      Activo
                    </span>
                  )}
                </div>

                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70 mb-1">
                    Saldo Disponible
                  </p>
                  <p
                    id="balance-heading"
                    className="text-4xl font-extrabold font-mono tabular-nums tracking-tight sm:text-5xl"
                  >
                    {BALANCE.available}
                  </p>
                  <p className="mt-2 text-xs text-emerald-200/70">
                    Incluye {BALANCE.reserved} de fondo de reserva
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70">
                      Última recarga
                    </p>
                    <p className="text-sm font-bold mt-0.5 font-mono tabular-nums">
                      {BALANCE.lastRecharge.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70">
                      Último pase
                    </p>
                    <p className="text-sm font-bold mt-0.5 font-mono tabular-nums">
                      {BALANCE.lastPass.amount}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Acciones Rápidas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <Link
                href="/dashboard/recargar"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 active:scale-[0.98]"
              >
                <RefreshCw className="h-4 w-4" />
                Recargar Saldo
              </Link>
              <Link
                href="/dashboard/peajes"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 active:scale-[0.98]"
              >
                <CarFront className="h-4 w-4 text-slate-400" />
                Red de Peajes
              </Link>
            </div>

            {/* Soporte Rápido */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                  <LifeBuoy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ¿Necesitas asistencia?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Reporta problemas con tu TAG o revisa cobros no reconocidos.
                  </p>
                  <Link
                    href="/dashboard/ayuda"
                    className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-sm"
                  >
                    Centro de ayuda <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha (Estadísticas e Historial) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((s) => (
                <StatCard key={s.id} {...s} />
              ))}
            </div>

            <section
              className="flex-1 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Movimientos recientes
                </h2>
                <Link
                  href="/dashboard/historico"
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 transition-colors hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-sm"
                >
                  Ver todo
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex-1 p-4 sm:p-6">
                {ACTIVITY.length > 0 ? (
                  <div className="flex flex-col">
                    {ACTIVITY.map((item) => (
                      <ActivityRow key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-300 ring-8 ring-slate-50">
                      <History className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-sm font-bold text-slate-500">
                      No hay movimientos recientes
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
