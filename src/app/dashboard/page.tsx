"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  History,
  Info,
  MapPinned,
  RefreshCw,
  ShieldCheck,
  Tag,
  TrendingUp,
  Wallet,
  Zap,
  MessageSquareWarning,
  CircleHelp,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// ─── Mock data ────────────────────────────────────────────────────────────────

const USER = {
  plan: "Cuenta Personal",
  tag: "TAG-4892",
  tagActive: true,
};

const BALANCE = {
  available: "RD$ 500.00",
  reserved: "RD$ 100.00",
  lastRecharge: { amount: "RD$ 500.00", date: "Ayer, 16:10" },
  lastPass: { amount: "RD$ 100.00", toll: "Las Américas", date: "Hoy, 08:42" },
};

const STATS = [
  {
    id: "s1",
    label: "Pases este mes",
    value: "14",
    Icon: Tag,
    accent: "text-primary bg-secondary border-secondary",
  },
  {
    id: "s2",
    label: "Gasto acumulado",
    value: "RD$ 1,400",
    Icon: CircleDollarSign,
    accent: "text-slate-600 bg-slate-100 border-slate-200",
  },
  {
    id: "s3",
    label: "Saldo reservado",
    value: "RD$ 100.00",
    Icon: Wallet,
    accent: "text-amber-600 bg-amber-50 border-amber-100",
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
    title: "Recarga de saldo",
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

const QUICK_LINKS = [
  { href: "/dashboard/peajes", label: "Red de peajes", Icon: MapPinned },
  {
    href: "/dashboard/reclamaciones",
    label: "Reclamaciones",
    Icon: MessageSquareWarning,
  },
  { href: "/dashboard/ayuda", label: "Centro de ayuda", Icon: CircleHelp },
];

const VEHICLE = {
  brand: "Toyota",
  model: "Corolla",
  year: "2019",
  plate: "A123456",
  type: "Sedan",
  color: "Gris",
};

const NOTICES = [
  {
    id: "n1",
    type: "warning" as const,
    title: "Mantenimiento programado",
    body: "El sistema estará en mantenimiento el 6 de mayo de 12:00 a.m. a 2:00 a.m. Los cobros no se verán afectados.",
    date: "Hoy",
  },
  {
    id: "n2",
    type: "info" as const,
    title: "Nuevo peaje habilitado",
    body: "Se habilitó el cobro electrónico en la Autopista del Nordeste, tramo San Francisco de Macorís.",
    date: "Hace 2 días",
  },
  {
    id: "n3",
    type: "success" as const,
    title: "Actualización de tarifas",
    body: "Las tarifas de la Autopista 6 de Noviembre se actualizaron a partir del 1 de mayo de 2026.",
    date: "Hace 3 días",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  linkHref,
  linkLabel,
}: {
  title: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {linkHref && (
        <Link
          href={linkHref}
          className="flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
        >
          {linkLabel}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

const NOTICE_STYLES = {
  info: { bg: "bg-blue-50 border-blue-100 text-blue-600", Icon: Info },
  success: {
    bg: "bg-secondary border-secondary text-primary",
    Icon: CheckCircle2,
  },
  warning: { bg: "bg-amber-50 border-amber-100 text-amber-600", Icon: Bell },
};

function NoticeRow({ item }: { item: (typeof NOTICES)[0] }) {
  const style = NOTICE_STYLES[item.type];
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border mt-0.5",
          style.bg,
        )}
      >
        <style.Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[12px] font-bold text-foreground leading-tight">
            {item.title}
          </p>
          <span className="shrink-0 text-[10px] text-muted-foreground whitespace-nowrap">
            {item.date}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
          {item.body}
        </p>
      </div>
    </div>
  );
}

function ActivityRow({ item }: { item: (typeof ACTIVITY)[0] }) {
  return (
    <div className="flex items-center justify-between py-3 last:pb-0 border-b border-border/40 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
            item.out
              ? "bg-muted border-border/60 text-muted-foreground"
              : "bg-secondary border-secondary text-primary",
          )}
        >
          {item.out ? (
            <CarFront className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <TrendingUp className="h-4 w-4" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-foreground truncate">
            {item.title}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
        </div>
      </div>
      <div className="shrink-0 pl-4 text-right">
        <p
          className={cn(
            "text-[13px] font-bold font-mono tabular-nums",
            item.out ? "text-foreground" : "text-primary",
          )}
        >
          {item.amount}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
          {item.status}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { userData } = useAuth();
  const fullName = userData
    ? [userData.primerNombre, userData.segundoNombre].filter(Boolean).join(" ")
    : "Usuario";

  return (
    <div className="min-h-full bg-muted/30 pb-12">
      <div className="w-full space-y-6 px-4 py-7 sm:px-6 lg:px-8">
        {/* ── Encabezado ── */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Panel de control
            </p>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Bienvenido, <span className="text-primary">{fullName}</span>
            </h1>
          </div>

          {/* Alerta saldo bajo */}
          <div className="flex shrink-0 items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 sm:w-auto">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-[12px] font-semibold text-amber-800 leading-tight">
                Saldo próximo a agotarse
              </p>
              <p className="text-[11px] text-amber-600">
                Quedan aprox. 5 pases.
              </p>
            </div>
            <Link
              href="/dashboard/recargar"
              className="ml-1 shrink-0 rounded-md bg-amber-600 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-amber-700 transition-colors"
            >
              Recargar
            </Link>
          </div>
        </header>

        {/* ── Grid principal ── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {/* ── Columna izquierda ── */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Tarjeta de saldo */}
            <section
              aria-labelledby="balance-heading"
              className="relative overflow-hidden rounded-xl bg-primary p-5 text-primary-foreground shadow-md shadow-primary/20"
            >
              {/* Fondo decorativo */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/5" />

              <div className="relative space-y-5">
                {/* TAG e identificador */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15">
                      <Zap className="h-3.5 w-3.5 fill-white text-white" />
                    </span>
                    <span className="text-[13px] font-bold tracking-wide text-white/90">
                      {USER.tag}
                    </span>
                  </div>
                  {USER.tagActive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                      Activo
                    </span>
                  )}
                </div>

                {/* Saldo */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                    Saldo disponible
                  </p>
                  <p
                    id="balance-heading"
                    className="text-4xl font-extrabold font-mono tabular-nums tracking-tight"
                  >
                    {BALANCE.available}
                  </p>
                  <p className="mt-1.5 text-[11px] text-white/50">
                    Reservado: {BALANCE.reserved}
                  </p>
                </div>

                {/* Últimos movimientos */}
                <div className="grid grid-cols-2 gap-3 border-t border-white/15 pt-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Última recarga
                    </p>
                    <p className="text-sm font-bold font-mono tabular-nums mt-0.5">
                      {BALANCE.lastRecharge.amount}
                    </p>
                    <p className="text-[10px] text-white/40">
                      {BALANCE.lastRecharge.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                      Último pase
                    </p>
                    <p className="text-sm font-bold font-mono tabular-nums mt-0.5">
                      RD$ -{BALANCE.lastPass.amount}
                    </p>
                    <p className="text-[10px] text-white/40">
                      {BALANCE.lastPass.toll}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/dashboard/recargar"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/25 active:scale-[0.98]"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Recargar ahora
                </Link>
              </div>
            </section>

            {/* Accesos rápidos */}
            <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
              <div className="border-b border-border/50 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Accesos rápidos
                </p>
              </div>
              <div className="divide-y divide-border/40">
                {QUICK_LINKS.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between px-4 py-3 text-[13px] font-medium text-foreground hover:bg-muted/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                        strokeWidth={1.75}
                      />
                      {label}
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mi vehículo */}
            <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Mi vehículo
                </p>
                <Link
                  href="/dashboard/vehiculos"
                  className="flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                >
                  Gestionar <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="flex items-center gap-3.5 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted">
                  <CarFront
                    className="h-5 w-5 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-foreground">
                    {VEHICLE.brand} {VEHICLE.model} {VEHICLE.year}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {VEHICLE.plate} · {VEHICLE.type} · {VEHICLE.color}
                  </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
                  <ShieldCheck className="h-3 w-3" />
                  Vinculado
                </span>
              </div>
            </div>
          </div>

          {/* ── Columna derecha ── */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map(({ id, label, value, Icon, accent }) => (
                <div
                  key={id}
                  className="flex items-center gap-3.5 rounded-xl border border-border/60 bg-white px-4 py-4 shadow-sm"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                      accent,
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-tight">
                      {label}
                    </p>
                    <p className="text-lg font-extrabold font-mono tabular-nums text-foreground mt-0.5">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actividad reciente */}
            <section className="flex flex-col rounded-xl border border-border/60 bg-white shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-4">
                <SectionHeader
                  title="Movimientos recientes"
                  linkHref="/dashboard/historico"
                  linkLabel="Ver todo"
                />
              </div>
              <div className="px-5 pb-5">
                {ACTIVITY.length > 0 ? (
                  <div className="flex flex-col">
                    {ACTIVITY.map((item) => (
                      <ActivityRow key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground/40">
                      <History className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-muted-foreground">
                      Sin movimientos recientes
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Novedades y avisos */}
            <section className="flex flex-col rounded-xl border border-border/60 bg-white shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-4">
                <SectionHeader
                  title="Novedades y avisos"
                  linkHref="/dashboard/noticias"
                  linkLabel="Ver más"
                />
              </div>
              <div className="px-5 pb-5 flex flex-col gap-2.5">
                {NOTICES.map((n) => (
                  <NoticeRow key={n.id} item={n} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
