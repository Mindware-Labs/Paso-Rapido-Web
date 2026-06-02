"use client";

import { useMemo, useState } from "react";
import { Building2, Plus, Trash2, X, Truck } from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { useAccount } from "@/context/AccountContext";
import { spendByCostCenter } from "@/data/empresa/derived";
import { formatCurrency } from "@/lib/format";
import { BarChart } from "@/components/empresa/charts";
import { PageHeader, DemoBadge } from "@/components/empresa/shared";

export default function CentrosCostoPage() {
  const { costCenters, fleet, addCostCenter, removeCostCenter } =
    useEmpresaData();
  const { can } = useAccount();
  const canWrite = can("centros:write");

  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [responsable, setResponsable] = useState("");

  const summary = useMemo(
    () => spendByCostCenter(fleet, costCenters),
    [fleet, costCenters],
  );

  const canSubmit = nombre.trim() !== "" && codigo.trim() !== "";

  const submit = () => {
    if (!canSubmit) return;
    addCostCenter({
      nombre: nombre.trim(),
      codigo: codigo.trim().toUpperCase(),
      responsable: responsable.trim() || undefined,
    });
    setNombre("");
    setCodigo("");
    setResponsable("");
    setShowForm(false);
  };

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Estructura contable"
          title="Centros de costo"
          description="Departamentos a los que se asignan vehículos para distribuir el gasto de peaje de forma contable."
          actions={
            canWrite ? (
              <button
                onClick={() => setShowForm((s) => !s)}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                {showForm ? (
                  <X className="h-4.5 w-4.5" strokeWidth={2.5} />
                ) : (
                  <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
                )}
                {showForm ? "Cancelar" : "Nuevo centro"}
              </button>
            ) : (
              <DemoBadge />
            )
          }
        />

        {canWrite && showForm && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Nombre
                </span>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Operaciones"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Código
                </span>
                <input
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="OPS"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm uppercase focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Responsable
                </span>
                <input
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                  placeholder="Opcional"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={submit}
                disabled={!canSubmit}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
              >
                Guardar centro
              </button>
            </div>
          </div>
        )}

        {/* ── Cards de centros ── */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {summary.map((cc) => {
            const center = costCenters.find((c) => c.codigo === cc.codigo)!;
            return (
              <div
                key={cc.codigo}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <Building2 className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {cc.label}
                      </p>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {cc.codigo}
                      </p>
                    </div>
                  </div>
                  {canWrite && (
                    <button
                      type="button"
                      onClick={() => removeCostCenter(center.id)}
                      className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                      title="Eliminar centro"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Gasto del mes
                    </p>
                    <p className="font-mono text-lg font-bold tabular-nums text-slate-900">
                      {formatCurrency(cc.value)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Truck className="size-3.5 text-slate-400" />
                    {cc.vehiculos} vehículos
                  </div>
                </div>
                {center.responsable && (
                  <p className="mt-3 text-xs text-slate-500">
                    Responsable:{" "}
                    <span className="font-semibold text-slate-700">
                      {center.responsable}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </section>

        {/* ── Gasto por centro ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Gasto por centro de costo
          </h2>
          <BarChart
            data={summary.map((s) => ({ label: s.label, value: s.value }))}
            formatValue={(v) => formatCurrency(v)}
            barClassName="bg-slate-600"
          />
        </section>
      </div>
    </div>
  );
}
