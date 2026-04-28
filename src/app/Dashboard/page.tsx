"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CarFront,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  History,
  MapPin,
  MapPinned,
  Megaphone,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
  Info,
  Clock,
  Tag,
  Star,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const USER = {
  name: "Carlos Martínez",
  plan: "Mi cuenta",
  tag: "TAG-4892",
  tagActive: true,
  avatar: "CM",
};

const BALANCE = {
  available: "RD$ 500.00",
  reserved: "RD$ 100.00",
  lastRecharge: { amount: "RD$ 500.00", date: "Ayer, 16:10", method: "CardNet" },
  lastPass: { amount: "RD$ -100.00", date: "Hoy, 08:42", toll: "Las Américas" },
};

const STATS = [
  {
    id: "s1",
    label: "Pases este mes",
    value: "14",
    Icon: Tag,
    color: "emerald",
  },
  {
    id: "s2",
    label: "Gasto en peajes",
    value: "RD$ 500",
    trend: "neutral",
    Icon: CircleDollarSign,
    color: "blue",
  },
  {
    id: "s3",
    label: "Vehículos activos",
    value: "2",
    trend: "neutral",
    Icon: CarFront,
    color: "violet",
  },
  {
    id: "s4",
    label: "Pases restantes",
    value: "~5 pases",
    trend: "down",
    Icon: Wallet,
    color: "amber",
  },
];

const ACTIVITY = [
  {
    id: "a1",
    title: "Peaje Las Américas",
    sub: "Hoy · 08:42 · Carril 3",
    amount: "RD$ -100.00",
    out: true,
    tag: "TAG-4892",
  },
  {
    id: "a2",
    title: "Recarga vía CardNet",
    sub: "Ayer · 16:10 · Visa ••4892",
    amount: "RD$ +500.00",
    out: false,
    tag: null,
  },
  {
    id: "a3",
    title: "Peaje La Victoria",
    sub: "Lun · 07:15 · Carril 1",
    amount: "RD$ -100.00",
    out: true,
    tag: "TAG-4892",
  },
  {
    id: "a4",
    title: "Peaje Duarte Km 9",
    sub: "Dom · 18:30 · Carril 2",
    amount: "RD$ -100.00",
    out: true,
    tag: "TAG-4892",
  },
  {
    id: "a5",
    title: "Recarga vía Superpagos",
    sub: "Vie · 10:00",
    amount: "RD$ +300.00",
    out: false,
    tag: null,
  },
];

const QUICK_ACTIONS = [
  {
    href: "/dashboard/recargar",
    label: "Recargar saldo",
    desc: "Agrega saldo con tarjeta o en puntos de pago.",
    Icon: Wallet,
    accent: "emerald",
    primary: true,
  },

  {
    href: "/dashboard/historico",
    label: "Historial",
    desc: "Consulta todos tus movimientos.",
    Icon: History,
    accent: "violet",
    primary: false,
  },
  {
    href: "/dashboard/peajes",
    label: "Red de peajes",
    desc: "Mapa interactivo, tarifas y corredores.",
    Icon: MapPinned,
    accent: "amber",
    primary: false,
  },
];

const TOLLS_NEARBY = [
  { id: "t1", name: "Peaje Las Américas", corridor: "Autopista Las Américas", fare: "RD$ 100", status: "open" },
  { id: "t2", name: "Peaje La Victoria", corridor: "Autopista Duarte", fare: "RD$ 100", status: "open" },
  { id: "t4", name: "Peaje Hatillo", corridor: "Autopista del Noreste", fare: "RD$ 150", status: "maintenance" },
];

const ALERTS = [
  {
    id: "al1",
    type: "warning",
    Icon: ShieldAlert,
    title: "Saldo bajo",
    body: "Tu saldo cubre aproximadamente 5 pases. Recarga para evitar inconvenientes.",
    cta: { label: "Recargar ahora", href: "/dashboard/recargar" },
  },
];

const NEWS = [
  {
    id: "n1",
    kicker: "Infraestructura",
    title: "Horario extendido en peajes del corredor norte a partir de mayo",
    date: "27 abr 2026",
    Icon: Info,
    accent: "emerald",
  },
  {
    id: "n2",
    kicker: "Aviso importante",
    title: "Mantén saldo mínimo de RD$ 100.00 en tu TAG para pasos automáticos",
    date: "25 abr 2026",
    Icon: ShieldCheck,
    accent: "amber",
  },
  {
    id: "n3",
    kicker: "Promoción",
    title: "Recarga con tarjeta este mes y obtén 5% de bono hasta el 30 de mayo",
    date: "20 abr 2026",
    Icon: Megaphone,
    accent: "blue",
  },
];

// ─── Color map helpers ─────────────────────────────────────────────────────────

const STAT_COLORS: Record<string, { bg: string; icon: string; border: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "border-emerald-100",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-100",
  },
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

const ACTION_COLORS: Record<string, { bg: string; icon: string; hover: string; ring: string }> = {
  emerald: {
    bg: "bg-emerald-600",
    icon: "text-white",
    hover: "hover:bg-emerald-700",
    ring: "ring-emerald-600/20",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    hover: "hover:bg-blue-100",
    ring: "ring-blue-600/10",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    hover: "hover:bg-violet-100",
    ring: "ring-violet-600/10",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    hover: "hover:bg-amber-100",
    ring: "ring-amber-600/10",
  },
};

const NEWS_ACCENT: Record<string, { text: string; bg: string }> = {
  emerald: { text: "text-emerald-700", bg: "bg-emerald-50" },
  amber: { text: "text-amber-700", bg: "bg-amber-50" },
  blue: { text: "text-blue-700", bg: "bg-blue-50" },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
        </Link>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  Icon,
  color,
}: (typeof STATS)[0]) {
  const c = STAT_COLORS[color];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white/60 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>
          <Icon className={`h-4 w-4 ${c.icon}`} strokeWidth={1.75} />
        </span>
        {trend === "up" && (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
        )}
        {trend === "down" && (
          <TrendingDown className="h-3.5 w-3.5 text-gray-400" strokeWidth={2} />
        )}
      </div>
      <div>
        <p className="text-xl font-extrabold tracking-tight text-gray-900">
          {value}
        </p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function ActivityRow({
  item,
  last,
}: {
  item: (typeof ACTIVITY)[0];
  last: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            item.out ? "bg-red-50" : "bg-emerald-50"
          }`}
        >
          {item.out ? (
            <TrendingDown className="h-4 w-4 text-red-500" strokeWidth={2.5} />
          ) : (
            <TrendingUp className="h-4 w-4 text-emerald-600" strokeWidth={2.5} />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-400">{item.sub}</p>
        </div>
        <div className="text-right">
          <p
            className={`text-sm font-bold ${
              item.out ? "text-red-500" : "text-emerald-600"
            }`}
          >
            {item.amount}
          </p>
          {item.tag && (
            <p className="text-[10px] font-mono text-gray-400">{item.tag}</p>
          )}
        </div>
      </div>
      {!last && <div className="mx-4 h-px bg-gray-100" />}
    </div>
  );
}

function TollRow({
  toll,
  last,
}: {
  toll: (typeof TOLLS_NEARBY)[0];
  last: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50">
          <MapPin className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">{toll.name}</p>
          <p className="text-xs text-gray-400">{toll.corridor}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-900">{toll.fare}</p>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              toll.status === "open"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {toll.status === "open" ? "Operativo" : "Mantenimiento"}
          </span>
        </div>
      </div>
      {!last && <div className="mx-4 h-px bg-gray-100" />}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="min-h-full bg-gray-50/60">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">

        {/* ── Greeting row ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Bienvenido de nuevo
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {USER.name}
            </h1>
          </div>

        </div>

        {/* ── Alert banners ── */}
        {ALERTS.map((al) => (
          <div
            key={al.id}
            className="flex flex-wrap items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 sm:items-center"
          >
            <al.Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 sm:mt-0" strokeWidth={2} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-amber-900">{al.title}</p>
              <p className="text-xs text-amber-700">{al.body}</p>
            </div>
       
          </div>
        ))}

        {/* ── Balance hero card ── */}
        <section
          aria-labelledby="balance-heading"
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-700 p-5 text-white shadow-xl shadow-emerald-600/20 sm:p-7"
        >
          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white/5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-1/3 top-0 h-32 w-32 rounded-full bg-white/5"
            aria-hidden
          />

          <div className="relative z-10">
            {/* Top row */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                  <Zap className="h-4 w-4 fill-white text-white" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                    {USER.plan}
                  </p>
                  <p className="text-xs font-bold text-white/90">{USER.tag}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-300"
                  aria-hidden
                />
                <span className="text-xs font-bold text-white">TAG activo</span>
              </div>
            </div>

            {/* Balance row */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                  Saldo disponible
                </p>
                <p
                  id="balance-heading"
                  className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl"
                >
                  {BALANCE.available}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Reservado: {BALANCE.reserved}
                </p>
              </div>

              {/* Last movements */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                    <TrendingUp className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-white/60">
                      Última recarga
                    </p>
                    <p className="text-sm font-bold">{BALANCE.lastRecharge.amount}</p>
                    <p className="text-[10px] text-white/50">{BALANCE.lastRecharge.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                    <TrendingDown className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-white/60">
                      Último pase
                    </p>
                    <p className="text-sm font-bold">{BALANCE.lastPass.amount}</p>
                    <p className="text-[10px] text-white/50">{BALANCE.lastPass.toll}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA strip */}
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/20 pt-5">
              <Link
                href="/dashboard/recargar"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-extrabold text-emerald-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
              >
                <RefreshCw className="h-4 w-4" />
                Recargar saldo
              </Link>
              <Link
                href="/dashboard/historico"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/25"
              >
                <History className="h-4 w-4" />
                Ver historial
              </Link>
            </div>
          </div>
        </section>
        
        {/* ── Quick actions ── */}
        <section aria-labelledby="quick-heading">
          <div className="mb-4">
            <SectionHeader title="Accesos rápidos" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {QUICK_ACTIONS.map((a) => {
              const c = ACTION_COLORS[a.accent];
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-4 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md ${
                    a.primary
                      ? `${c.bg} ${c.hover} ${c.ring}`
                      : `border border-gray-100 bg-white hover:border-gray-200 ${c.ring}`
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      a.primary ? "bg-white/20" : c.bg
                    }`}
                  >
                    <a.Icon
                      className={`h-5 w-5 ${a.primary ? "text-white" : c.icon}`}
                      strokeWidth={1.75}
                    />
                  </span>
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        a.primary ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {a.label}
                    </p>
                    <p
                      className={`mt-0.5 text-[11px] leading-snug ${
                        a.primary ? "text-white/75" : "text-gray-400"
                      }`}
                    >
                      {a.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={`absolute right-3 top-3 h-4 w-4 opacity-0 transition group-hover:opacity-100 ${
                      a.primary ? "text-white/80" : "text-gray-400"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Stats row ── */}
        <section aria-labelledby="stats-heading">
        <div className="mb-4">
            <SectionHeader title="Resumen del mes" />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((s) => (
              <StatCard key={s.id} {...s} />
            ))}
          </div>
        </section>


        {/* ── Two-column row: Activity + Tolls ── */}
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">

          {/* Activity */}
          <section aria-labelledby="activity-heading" className="min-w-0">
            <div className="mb-4">
              <SectionHeader
                title="Actividad reciente"
                href="/dashboard/historico"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {ACTIVITY.map((item, i) => (
                <ActivityRow
                  key={item.id}
                  item={item}
                  last={i === ACTIVITY.length - 1}
                />
              ))}
              <div className="border-t border-gray-100 px-4 py-3">
                <Link
                  href="/dashboard/historico"
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Ver todos los movimientos
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Toll network */}
          <section
            aria-labelledby="tolls-heading"
            className="w-full lg:w-[320px] lg:shrink-0"
          >
            <div className="mb-4">
              <SectionHeader title="Red de peajes" href="/dashboard/peajes" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {/* Mini map placeholder */}
              <div className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                <div className="absolute inset-0 opacity-10">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border border-gray-400"
                      style={{
                        left: `${(i % 4) * 25}%`,
                        top: `${Math.floor(i / 4) * 50}%`,
                        width: "25%",
                        height: "50%",
                      }}
                    />
                  ))}
                </div>
                <div className="z-10 flex flex-col items-center gap-1">
                  <MapPinned className="h-7 w-7 text-emerald-600" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-gray-500">
                    Peajes en vigencia
                  </span>
                </div>
                <Link
                  href="/dashboard/peajes"
                  className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Abrir mapa
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              {TOLLS_NEARBY.map((t, i) => (
                <TollRow
                  key={t.id}
                  
                  toll={t}
                  last={i === TOLLS_NEARBY.length - 1}
                />
              ))}
            </div>
          </section>
        </div>

    
        {/* ── News + Help two-column ── */}
        <div className="grid gap-4 lg:grid-cols-2 lg:items-start">

          {/* Novedades */}
          <section aria-labelledby="news-heading">
            <div className="mb-3">
              <SectionHeader title="Novedades" href="/dashboard/noticias" />
            </div>
            <div className="flex flex-col gap-2">
              {NEWS.map((n) => {
                const c = NEWS_ACCENT[n.accent];
                return (
                  <Link
                    key={n.id}
                    href="/dashboard/noticias"
                    className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm transition hover:border-gray-200 hover:shadow-md"
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                      <n.Icon className={`h-3.5 w-3.5 ${c.text}`} strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[9px] font-extrabold uppercase tracking-wide ${c.text}`}>
                        {n.kicker}
                      </p>
                      <p className="text-xs font-semibold leading-snug text-gray-900 line-clamp-1">
                        {n.title}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="text-[10px] text-gray-400">{n.date}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ¿Necesitas ayuda? */}
          <section aria-labelledby="support-heading">
            <div className="mb-3">
              <h2 id="support-heading" className="text-base font-bold text-gray-900">
                ¿Necesitas ayuda?
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {[
                {
                  href: "/dashboard/ayuda",
                  label: "Centro de ayuda",
                  desc: "Preguntas frecuentes y guías.",
                  Icon: Star,
                  bg: "bg-blue-50",
                  text: "text-blue-600",
                },
                {
                  href: "/dashboard/asistente-vial",
                  label: "Asistencia vial",
                  desc: "Incidentes y rutas alternativas.",
                  Icon: MapPin,
                  bg: "bg-violet-50",
                  text: "text-violet-600",
                },
                {
                  href: "/dashboard/reclamaciones",
                  label: "Reclamaciones",
                  desc: "Reporta cobros incorrectos.",
                  Icon: ShieldAlert,
                  bg: "bg-red-50",
                  text: "text-red-600",
                },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm transition hover:border-gray-200 hover:shadow-md"
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${s.bg}`}>
                    <s.Icon className={`h-3.5 w-3.5 ${s.text}`} strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-900">{s.label}</p>
                    <p className="text-[11px] text-gray-400">{s.desc}</p>
                  </div>
                  <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-300" />
                </Link>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
