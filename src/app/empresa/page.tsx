"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Wallet,
  AlertTriangle,
  Snowflake,
  ArrowRight,
  Plus,
  Download,
} from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { fleetSummary } from "@/data/empresa/derived";
import { formatCurrency } from "@/lib/format";
import { PageHeader, DemoBadge } from "@/components/empresa/shared";
import { cn } from "@/lib/utils";

export default function EmpresaPanelPage() {
  const { empresa, fleet } = useEmpresaData();

  const summary = useMemo(() => fleetSummary(fleet), [fleet]);

  const lowBalanceVehicles = fleet.filter(
    (v) => v.tagStatus === "bajo_balance",
  );
  const frozenVehicles = fleet.filter((v) => v.tagStatus === "congelado");

  const resumen: { label: string; value: string }[] = [
    { label: "Saldo de flota", value: formatCurrency(summary.saldoTotal) },
    {
      label: "Saldo de billetera central",
      value: formatCurrency(empresa.saldoCentral),
    },
    {
      label: "Vehículos activos",
      value: `${summary.activos} de ${summary.total}`,
    },
    { label: "Vehículos congelados", value: String(summary.congelados) },
    { label: "Pases del mes", value: String(summary.pasesMes) },
    { label: "Gasto del mes", value: formatCurrency(summary.gastoMes) },
    {
      label: "Vehículos con saldo bajo",
      value: String(summary.bajoBalance),
    },
  ];

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={empresa.razonSocial}
          title="Panel de flota"
          description="Resumen del saldo, consumo y estado de los vehículos de la empresa."
          actions={<DemoBadge />}
        />

        {/* ── Resumen (lista, no dashboard) ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-900">
            Resumen de la flota
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            {summary.bajoBalance > 0 || summary.congelados > 0
              ? `${summary.activos} de ${summary.total} vehículos operan con normalidad; ${
                  summary.bajoBalance
                } con saldo bajo y ${summary.congelados} congelados requieren atención.`
              : `Los ${summary.total} vehículos de la flota operan con normalidad.`}
          </p>
          <dl className="divide-y divide-slate-100">
            {resumen.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2.5"
              >
                <dt className="text-sm text-slate-600">{row.label}</dt>
                <dd className="text-sm font-semibold tabular-nums text-slate-900">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
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
