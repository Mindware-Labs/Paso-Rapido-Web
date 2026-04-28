"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CreditCard,
  MapPin,
  ChevronRight,
  CircleDollarSign,
  History,
  LifeBuoy,
  RefreshCw,
  Tag,
  TrendingDown,
  TrendingUp,
  Wallet,
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
  lastRecharge: { amount: "RD$ 500.00", date: "16 Abr 2026, 16:10" },
  lastPass: {
    amount: "RD$ -100.00",
    toll: "Peaje Las Américas",
    date: "17 Abr 2026, 08:42",
  },
};

const STATS = [
  {
    id: "s1",
    label: "Pases este mes",
    value: "14",
    Icon: Tag,
  },
  {
    id: "s2",
    label: "Gasto acumulado",
    value: "RD$ 1,400.00",
    Icon: CircleDollarSign,
  },
  {
    id: "s3",
    label: "Cobertura estimada",
    value: "~ 5 pases",
    Icon: Wallet,
  },
];

const ACTIVITY = [
  {
    id: "a1",
    title: "Peaje Las Américas",
    sub: "17 Abr 2026 · 08:42",
    amount: "RD$ -100.00",
    out: true,
    status: "Completado",
  },
  {
    id: "a2",
    title: "Recarga vía CardNet",
    sub: "16 Abr 2026 · 16:10",
    amount: "RD$ +500.00",
    out: false,
    status: "Aprobado",
  },
  {
    id: "a3",
    title: "Peaje La Victoria",
    sub: "14 Abr 2026 · 07:15",
    amount: "RD$ -100.00",
    out: true,
    status: "Completado",
  },
  {
    id: "a4",
    title: "Peaje Duarte Km 9",
    sub: "12 Abr 2026 · 18:30",
    amount: "RD$ -100.00",
    out: true,
    status: "Completado",
  },
];

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function StatCard({ label, value, Icon }: (typeof STATS)[0]) {
  return (
    <div className="flex flex-col justify-between border-b sm:border-b-0 sm:border-r last:border-0 border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4.5 w-4.5 text-slate-400" strokeWidth={1.5} />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ActivityRow({ item }: { item: (typeof ACTIVITY)[0] }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center border-b border-slate-100 py-4 last:border-0 hover:bg-slate-50/50 transition-colors px-4">
      {/* Icono y Titulo - Ocupa más espacio en móvil, comparte en desktop */}
      <div className="col-span-8 sm:col-span-5 flex items-center gap-4">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${item.out ? "border-slate-200 bg-slate-50" : "border-emerald-100 bg-emerald-50"}`}
        >
          {item.out ? (
            <TrendingDown className="h-4 w-4 text-slate-600" strokeWidth={2} />
          ) : (
            <TrendingUp className="h-4 w-4 text-emerald-600" strokeWidth={2} />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
          <p className="text-xs text-slate-500 sm:hidden mt-0.5">{item.sub}</p>
        </div>
      </div>

      {/* Fecha - Solo visible en pantallas más grandes */}
      <div className="hidden sm:block sm:col-span-4">
        <p className="text-sm text-slate-600">{item.sub}</p>
      </div>

      {/* Monto y Estado */}
      <div className="col-span-4 sm:col-span-3 text-right">
        <p
          className={`text-sm font-bold font-mono tracking-tight ${item.out ? "text-slate-900" : "text-emerald-700"}`}
        >
          {item.amount}
        </p>
        <p className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional ── */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              Portal de Usuario
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {fullName}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-900">
                Saldo Próximo a Agotarse
              </span>
            </div>
          </div>
        </header>

        {/* ── Grid Principal Fluido ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Columna Izquierda (Balance y Acciones) */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Tarjeta de Balance Ultra Formal */}
            <section
              aria-labelledby="balance-heading"
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Franja verde superior para identidad visual */}
              <div className="h-1.5 w-full bg-emerald-600"></div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <CreditCard
                        className="h-4 w-4 text-slate-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Dispositivo
                      </p>
                      <span className="text-sm font-semibold text-slate-900">
                        {USER.tag}
                      </span>
                    </div>
                  </div>
                  {USER.tagActive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Operativo
                    </span>
                  )}
                </div>

                <div className="mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Saldo Disponible
                  </h2>
                  <p
                    id="balance-heading"
                    className="text-4xl font-extrabold tracking-tight text-slate-900 font-mono"
                  >
                    {BALANCE.available}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-500">
                      Fondo de reserva
                    </span>
                    <span className="text-xs font-semibold text-slate-700 font-mono">
                      {BALANCE.reserved}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      <p className="text-xs text-slate-600">Última recarga</p>
                    </div>
                    <p className="text-xs font-bold text-slate-900 font-mono">
                      {BALANCE.lastRecharge.amount}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-3.5 w-3.5 text-slate-500" />
                      <p className="text-xs text-slate-600">Último consumo</p>
                    </div>
                    <p className="text-xs font-bold text-slate-900 font-mono">
                      {BALANCE.lastPass.amount}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Acciones (Botones Técnicos) */}
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard/recargar"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <RefreshCw className="h-4 w-4" />
                Ejecutar Recarga
              </Link>
              <Link
                href="/dashboard/peajes"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <MapPin className="h-4 w-4 text-slate-500" />
                Directorio de Estaciones
              </Link>
            </div>

            {/* Panel de Soporte Formal */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-4">
                <LifeBuoy className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Soporte al Usuario
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Gestión de reclamaciones, fallas de dispositivos y
                    asistencia general.
                  </p>
                  <Link
                    href="/dashboard/ayuda"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700"
                  >
                    Abrir Ticket <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha (Estadísticas e Historial) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Estadísticas (Estructura de Tabla horizontal) */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {STATS.map((s) => (
                  <StatCard key={s.id} {...s} />
                ))}
              </div>
            </div>

            {/* Historial de Transacciones (Formato Libro Mayor) */}
            <section className="flex-1 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Estado de Cuenta Reciente
                </h2>
                <Link
                  href="/dashboard/historico"
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  Ver Reporte Completo
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Cabecera de columnas falsa (Desktop) */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-8 py-3 border-b border-slate-100 bg-white">
                <div className="col-span-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Concepto
                </div>
                <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fecha / Hora
                </div>
                <div className="col-span-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Importe
                </div>
              </div>

              <div className="flex-1">
                {ACTIVITY.length > 0 ? (
                  <div className="flex flex-col px-4 sm:px-4">
                    {ACTIVITY.map((item) => (
                      <ActivityRow key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                    <History
                      className="h-10 w-10 text-slate-300"
                      strokeWidth={1}
                    />
                    <p className="mt-4 text-sm font-semibold text-slate-600">
                      No hay registros en el período actual.
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
