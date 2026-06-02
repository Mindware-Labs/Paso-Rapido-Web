"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Wallet,
  Truck,
  Activity,
  CircleDollarSign,
  AlertTriangle,
  Snowflake,
  ArrowRight,
  Plus,
  Download,
  TrendingUp,
} from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import {
  fleetSummary,
  spendByPeriod,
  topVehiclesBySpend,
} from "@/data/empresa/derived";
import { formatCurrency, formatCurrencyCompact, formatPeriodo } from "@/lib/format";
import { KpiCard } from "@/components/empresa/KpiCard";
import { BarChart, LineChart } from "@/components/empresa/charts";
import { PageHeader, DemoBadge } from "@/components/empresa/shared";
import { cn } from "@/lib/utils";

export default function EmpresaPanelPage() {
  const { empresa, fleet, invoices } = useEmpresaData();

  const summary = useMemo(() => fleetSummary(fleet), [fleet]);
  const periodSeries = useMemo(
    () =>
      spendByPeriod(invoices).map((p) => ({
        label: formatPeriodo(p.label).split(" ")[0].slice(0, 3),
        value: p.value,
      })),
    [invoices],
  );
  const topVehicles = useMemo(() => topVehiclesBySpend(fleet, 5), [fleet]);

  const lowBalanceVehicles = fleet.filter(
    (v) => v.tagStatus === "bajo_balance",
  );
  const frozenVehicles = fleet.filter((v) => v.tagStatus === "congelado");

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={empresa.razonSocial}
          title="Panel de flota"
          description="Visión consolidada del saldo, consumo y estado de todos los vehículos de la empresa."
          actions={<DemoBadge />}
        />

        {/* ── KPIs ── */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard
            label="Saldo de flota"
            value={formatCurrency(summary.saldoTotal)}
            Icon={Wallet}
            tone="emerald"
            hint={`+ central ${formatCurrencyCompact(empresa.saldoCentral)}`}
          />
          <KpiCard
            label="Vehículos activos"
            value={`${summary.activos} de ${summary.total}`}
            Icon={Truck}
            tone="blue"
            hint={`${summary.congelados} congelados`}
          />
          <KpiCard
            label="Pases del mes"
            value={String(summary.pasesMes)}
            Icon={Activity}
            tone="violet"
            delta={8.2}
          />
          <KpiCard
            label="Gasto del mes"
            value={formatCurrency(summary.gastoMes)}
            Icon={CircleDollarSign}
            tone="amber"
            delta={-3.1}
          />
          <KpiCard
            label="Saldo bajo"
            value={String(summary.bajoBalance)}
            Icon={AlertTriangle}
            tone="rose"
            hint="requieren recarga"
          />
        </section>

        {/* ── Gráficas ── */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Gasto últimos meses
              </h2>
            </div>
            <LineChart
              data={periodSeries}
              formatValue={(v) => formatCurrencyCompact(v)}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Top 5 vehículos por gasto
            </h2>
            <BarChart
              data={topVehicles}
              formatValue={(v) => formatCurrency(v)}
            />
          </div>
        </section>

        {/* ── Alertas + accesos rápidos ── */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Alertas
            </h2>
            <div className="space-y-2.5">
              {lowBalanceVehicles.length === 0 &&
                frozenVehicles.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Sin alertas activas. Toda la flota opera con normalidad.
                  </p>
                )}
              {lowBalanceVehicles.map((v) => (
                <AlertRow
                  key={v.id}
                  tone="amber"
                  Icon={AlertTriangle}
                  title={`${v.placa} · ${v.marca} ${v.modelo}`}
                  detail={`Saldo bajo: ${formatCurrency(v.balance)}`}
                  href="/empresa/recargas"
                  cta="Recargar"
                />
              ))}
              {frozenVehicles.map((v) => (
                <AlertRow
                  key={v.id}
                  tone="slate"
                  Icon={Snowflake}
                  title={`${v.placa} · ${v.marca} ${v.modelo}`}
                  detail="TAG congelado"
                  href="/empresa/flota"
                  cta="Ver flota"
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              Accesos rápidos
            </h2>
            <div className="flex flex-col gap-2.5">
              <QuickLink
                href="/empresa/recargas"
                Icon={Wallet}
                label="Recarga masiva"
              />
              <QuickLink
                href="/empresa/movimientos"
                Icon={Download}
                label="Exportar movimientos"
              />
              <QuickLink
                href="/empresa/flota"
                Icon={Plus}
                label="Agregar vehículo"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function AlertRow({
  tone,
  Icon,
  title,
  detail,
  href,
  cta,
}: {
  tone: "amber" | "slate";
  Icon: typeof AlertTriangle;
  title: string;
  detail: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          tone === "amber"
            ? "bg-amber-100 text-amber-600"
            : "bg-slate-200 text-slate-500",
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{detail}</p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
      >
        {cta}
        <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

function QuickLink({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: typeof Wallet;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        <Icon className="size-4.5" strokeWidth={1.75} />
      </span>
      <span className="flex-1 text-sm font-semibold text-slate-800">
        {label}
      </span>
      <ArrowRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500" />
    </Link>
  );
}
