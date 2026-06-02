"use client";

import { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Filter } from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { formatCurrency, formatDate } from "@/lib/format";
import { DataTable, type Column } from "@/components/empresa/DataTable";
import { EmptyState } from "@/components/empresa/EmptyState";
import {
  ExportButton,
  type CsvColumn,
} from "@/components/empresa/ExportButton";
import {
  PageHeader,
  TransactionStatusBadge,
} from "@/components/empresa/shared";
import type { FleetTransaction } from "@/types/empresa";
import { cn } from "@/lib/utils";

export default function MovimientosPage() {
  const { transactions, fleet, costCenters } = useEmpresaData();

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [vehiculo, setVehiculo] = useState("all");
  const [centro, setCentro] = useState("all");
  const [peaje, setPeaje] = useState("all");
  const [tipo, setTipo] = useState<"all" | "paso" | "recarga">("all");
  const [estado, setEstado] = useState("all");

  const placa = (id?: string) =>
    fleet.find((v) => v.id === id)?.placa ?? "—";
  const centerName = (id?: string) =>
    costCenters.find((c) => c.id === id)?.nombre ?? "—";

  const peajes = useMemo(
    () =>
      [...new Set(transactions.filter((t) => t.peaje).map((t) => t.peaje!))],
    [transactions],
  );

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const day = t.fecha.slice(0, 10);
      if (desde && day < desde) return false;
      if (hasta && day > hasta) return false;
      if (vehiculo !== "all" && t.vehicleId !== vehiculo) return false;
      if (centro !== "all" && t.costCenterId !== centro) return false;
      if (peaje !== "all" && t.peaje !== peaje) return false;
      if (tipo !== "all" && t.tipo !== tipo) return false;
      if (estado !== "all" && t.estado !== estado) return false;
      return true;
    });
  }, [transactions, desde, hasta, vehiculo, centro, peaje, tipo, estado]);

  const totals = useMemo(
    () =>
      filtered.reduce(
        (acc, t) => {
          if (t.tipo === "recarga") acc.recargas += t.monto;
          else acc.pasos += t.monto;
          return acc;
        },
        { pasos: 0, recargas: 0 },
      ),
    [filtered],
  );

  const hasFilters =
    desde !== "" ||
    hasta !== "" ||
    vehiculo !== "all" ||
    centro !== "all" ||
    peaje !== "all" ||
    tipo !== "all" ||
    estado !== "all";

  const reset = () => {
    setDesde("");
    setHasta("");
    setVehiculo("all");
    setCentro("all");
    setPeaje("all");
    setTipo("all");
    setEstado("all");
  };

  const columns: Column<FleetTransaction>[] = [
    {
      key: "fecha",
      header: "Fecha",
      sortValue: (t) => t.fecha,
      render: (t) => (
        <span className="text-sm text-slate-700">{formatDate(t.fecha)}</span>
      ),
    },
    {
      key: "concepto",
      header: "Concepto",
      span: 3,
      sortValue: (t) => t.peaje ?? t.tipo,
      render: (t) => (
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg border",
              t.tipo === "recarga"
                ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                : "border-slate-200 bg-slate-50 text-slate-500",
            )}
          >
            {t.tipo === "recarga" ? (
              <ArrowDownToLine className="size-3.5" />
            ) : (
              <ArrowUpFromLine className="size-3.5" />
            )}
          </span>
          <span className="text-sm font-medium text-slate-800">
            {t.tipo === "recarga" ? "Recarga" : t.peaje}
          </span>
        </div>
      ),
    },
    {
      key: "vehiculo",
      header: "Vehículo",
      sortValue: (t) => placa(t.vehicleId),
      render: (t) => (
        <span className="font-mono text-xs text-slate-600">
          {placa(t.vehicleId)}
        </span>
      ),
    },
    {
      key: "centro",
      header: "Centro",
      sortValue: (t) => centerName(t.costCenterId),
      render: (t) => (
        <span className="text-sm text-slate-600">
          {centerName(t.costCenterId)}
        </span>
      ),
    },
    {
      key: "referencia",
      header: "Referencia",
      render: (t) => (
        <span className="rounded border border-slate-200/60 bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
          {t.referencia}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      sortValue: (t) => t.estado,
      render: (t) => <TransactionStatusBadge status={t.estado} />,
    },
    {
      key: "monto",
      header: "Importe",
      align: "right",
      sortValue: (t) => t.monto,
      render: (t) => (
        <span
          className={cn(
            "font-mono text-sm font-bold tabular-nums",
            t.tipo === "recarga" ? "text-emerald-600" : "text-slate-900",
          )}
        >
          {t.tipo === "recarga" ? "+" : "-"}
          {formatCurrency(t.monto)}
        </span>
      ),
    },
  ];

  const csvColumns: CsvColumn<FleetTransaction>[] = [
    { header: "Fecha", value: (t) => t.fecha },
    { header: "Tipo", value: (t) => t.tipo },
    { header: "Concepto", value: (t) => (t.tipo === "recarga" ? "Recarga" : t.peaje ?? "") },
    { header: "Vehiculo", value: (t) => placa(t.vehicleId) },
    { header: "Centro", value: (t) => centerName(t.costCenterId) },
    { header: "Referencia", value: (t) => t.referencia },
    { header: "Estado", value: (t) => t.estado },
    { header: "Importe", value: (t) => t.monto },
  ];

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Estado de cuenta"
          title="Movimientos consolidados"
          description="Todas las transacciones de la flota: pasos por peaje y recargas. Filtra y exporta a CSV."
          actions={
            <ExportButton
              rows={filtered}
              columns={csvColumns}
              filename="movimientos-flota.csv"
            />
          }
        />

        {/* ── Resumen ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Transacciones"
            value={String(filtered.length)}
            tone="slate"
          />
          <SummaryCard
            label="Total recargas"
            value={formatCurrency(totals.recargas)}
            tone="emerald"
          />
          <SummaryCard
            label="Total consumos"
            value={formatCurrency(totals.pasos)}
            tone="slate"
          />
        </div>

        {/* ── Filtros ── */}
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <DateField label="Desde" value={desde} onChange={setDesde} />
          <DateField label="Hasta" value={hasta} onChange={setHasta} />
          <SelectField
            label="Tipo"
            value={tipo}
            onChange={(v) => setTipo(v as typeof tipo)}
            options={[
              { value: "all", label: "Todos" },
              { value: "paso", label: "Pasos" },
              { value: "recarga", label: "Recargas" },
            ]}
          />
          <SelectField
            label="Estado"
            value={estado}
            onChange={setEstado}
            options={[
              { value: "all", label: "Todos" },
              { value: "Procesado", label: "Procesado" },
              { value: "Aprobado", label: "Aprobado" },
              { value: "Pendiente", label: "Pendiente" },
              { value: "Rechazado", label: "Rechazado" },
            ]}
          />
          <SelectField
            label="Vehículo"
            value={vehiculo}
            onChange={setVehiculo}
            options={[
              { value: "all", label: "Todos" },
              ...fleet.map((v) => ({ value: v.id, label: v.placa })),
            ]}
          />
          <SelectField
            label="Centro"
            value={centro}
            onChange={setCentro}
            options={[
              { value: "all", label: "Todos" },
              ...costCenters.map((c) => ({ value: c.id, label: c.nombre })),
            ]}
          />
          <SelectField
            label="Peaje"
            value={peaje}
            onChange={setPeaje}
            options={[
              { value: "all", label: "Todos" },
              ...peajes.map((p) => ({ value: p, label: p })),
            ]}
          />
          <div className="flex items-end">
            {hasFilters && (
              <button
                onClick={reset}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          getRowId={(t) => t.id}
          pageSize={12}
          emptyState={
            <EmptyState
              Icon={Filter}
              title="Sin movimientos"
              description="No hay transacciones que coincidan con los filtros."
              action={
                hasFilters ? (
                  <button
                    onClick={reset}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Restablecer filtros
                  </button>
                ) : undefined
              }
            />
          }
        />
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "slate";
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-2xl font-bold tabular-nums tracking-tight",
          tone === "emerald" ? "text-emerald-700" : "text-slate-900",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
