"use client";

import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import {
  spendByPeriod,
  spendByVehicle,
  spendByCostCenter,
  spendByToll,
} from "@/data/empresa/derived";
import { formatCurrency, formatCurrencyCompact, formatPeriodo } from "@/lib/format";
import { BarChart, LineChart, DonutChart } from "@/components/empresa/charts";
import {
  ExportButton,
  type CsvColumn,
} from "@/components/empresa/ExportButton";
import { PageHeader, DemoBadge } from "@/components/empresa/shared";
import { cn } from "@/lib/utils";

type Dimension = "periodo" | "vehiculo" | "centro" | "peaje";

const DIMENSIONS: { id: Dimension; label: string }[] = [
  { id: "periodo", label: "Por periodo" },
  { id: "vehiculo", label: "Por vehículo" },
  { id: "centro", label: "Por centro" },
  { id: "peaje", label: "Por peaje" },
];

const DONUT_COLORS = [
  "rgb(5 150 105)",
  "rgb(37 99 235)",
  "rgb(124 58 237)",
  "rgb(217 119 6)",
  "rgb(225 29 72)",
  "rgb(13 148 136)",
];

export default function ReportesPage() {
  const { invoices, fleet, costCenters, transactions } = useEmpresaData();
  const [dim, setDim] = useState<Dimension>("periodo");

  const rows = useMemo(() => {
    switch (dim) {
      case "periodo":
        return spendByPeriod(invoices).map((p) => ({
          label: formatPeriodo(p.label),
          value: p.value,
        }));
      case "vehiculo":
        return spendByVehicle(transactions, fleet);
      case "centro":
        return spendByCostCenter(fleet, costCenters).map((c) => ({
          label: c.label,
          value: c.value,
        }));
      case "peaje":
        return spendByToll(transactions);
    }
  }, [dim, invoices, fleet, costCenters, transactions]);

  const total = rows.reduce((s, r) => s + r.value, 0);

  const csvColumns: CsvColumn<{ label: string; value: number }>[] = [
    { header: "Dimensión", value: (r) => r.label },
    { header: "Gasto", value: (r) => r.value },
  ];

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Análisis"
          title="Reportes de gasto"
          description="Visualiza el gasto de la flota por periodo, vehículo, centro de costo o peaje."
          actions={<DemoBadge />}
        />

        {/* ── Selector de dimensión ── */}
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:w-fit">
          {DIMENSIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDim(d.id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-bold transition-all",
                dim === d.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* ── Gráfica ── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {DIMENSIONS.find((d) => d.id === dim)?.label}
              </h2>
              <span className="font-mono text-sm font-bold text-slate-900">
                Total: {formatCurrency(total)}
              </span>
            </div>

            {dim === "periodo" ? (
              <LineChart
                data={rows.map((r) => ({
                  label: r.label.split(" ")[0].slice(0, 3),
                  value: r.value,
                }))}
                formatValue={(v) => formatCurrencyCompact(v)}
              />
            ) : dim === "centro" ? (
              <DonutChart
                data={rows.map((r, i) => ({
                  label: r.label,
                  value: r.value,
                  color: DONUT_COLORS[i % DONUT_COLORS.length],
                }))}
                formatValue={(v) => formatCurrency(v)}
              />
            ) : (
              <BarChart data={rows} formatValue={(v) => formatCurrency(v)} />
            )}
          </div>

          {/* ── Tabla descargable ── */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Detalle
              </h3>
              <ExportButton
                rows={rows}
                columns={csvColumns}
                filename={`reporte-${dim}.csv`}
                label="CSV"
                className="px-2.5 py-1.5 text-xs"
              />
            </div>
            <ul className="divide-y divide-slate-100">
              {rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <span className="truncate text-sm text-slate-700">
                    {r.label}
                  </span>
                  <span className="font-mono text-sm font-bold tabular-nums text-slate-900">
                    {formatCurrency(r.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          <BarChart3 className="mr-1 inline size-3.5" />
          El gasto por periodo se basa en los comprobantes mensuales; las demás
          dimensiones agregan los movimientos de la flota.
        </p>
      </div>
    </div>
  );
}
