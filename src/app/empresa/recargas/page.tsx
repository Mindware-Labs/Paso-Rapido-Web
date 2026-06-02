"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  Plus,
  Zap,
  Gauge,
  CheckCircle2,
  Clock,
  Truck,
} from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { useAccount } from "@/context/AccountContext";
import { formatCurrency, formatDate } from "@/lib/format";
import { PageHeader, DemoBadge } from "@/components/empresa/shared";
import { EmptyState } from "@/components/empresa/EmptyState";
import { cn } from "@/lib/utils";

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000];

export default function RecargasPage() {
  const {
    empresa,
    fleet,
    recharges,
    rechargeCentral,
    rechargeMasiva,
    updateEmpresa,
  } = useEmpresaData();
  const { can } = useAccount();
  const canRecharge = can("recargar");

  const [centralMonto, setCentralMonto] = useState<number>(5000);
  const [masivaMonto, setMasivaMonto] = useState<number>(500);
  const [picked, setPicked] = useState<string[]>([]);
  const [umbral, setUmbral] = useState<number>(empresa.umbralAutoRecarga);
  const [notice, setNotice] = useState<string | null>(null);

  const flash = (m: string) => {
    setNotice(m);
    setTimeout(() => setNotice(null), 3500);
  };

  const togglePick = (id: string) =>
    setPicked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const selectLowBalance = () =>
    setPicked(fleet.filter((v) => v.tagStatus === "bajo_balance").map((v) => v.id));

  const masivaTotal = masivaMonto * picked.length;

  const sortedRecharges = useMemo(
    () => [...recharges].sort((a, b) => b.fecha.localeCompare(a.fecha)),
    [recharges],
  );

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Finanzas"
          title="Recargas"
          description="Administra la billetera central de la empresa y distribuye saldo a los TAG de la flota."
          actions={<DemoBadge />}
        />

        {notice && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-800">
            {notice}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Billetera central ── */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Wallet className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Billetera central
                </p>
                <p className="font-mono text-2xl font-extrabold tabular-nums text-slate-900">
                  {formatCurrency(empresa.saldoCentral)}
                </p>
              </div>
            </div>

            {canRecharge ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setCentralMonto(a)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors",
                        centralMonto === a
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50",
                      )}
                    >
                      {formatCurrency(a)}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={0}
                  value={centralMonto}
                  onChange={(e) => setCentralMonto(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-mono focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  disabled={centralMonto <= 0}
                  onClick={() => {
                    rechargeCentral(centralMonto);
                    flash(
                      `Billetera central recargada con ${formatCurrency(centralMonto)}.`,
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-40"
                >
                  <Plus className="size-4" /> Recargar billetera
                </button>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Tu rol no permite ejecutar recargas.
              </p>
            )}
          </div>

          {/* ── Recarga masiva ── */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-emerald-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Recarga masiva
                </h2>
              </div>
              <button
                type="button"
                onClick={selectLowBalance}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Seleccionar bajo balance
              </button>
            </div>

            <div className="grid max-h-56 grid-cols-1 gap-1.5 overflow-y-auto rounded-lg border border-slate-100 p-2 sm:grid-cols-2">
              {fleet.map((v) => (
                <label
                  key={v.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                    picked.includes(v.id)
                      ? "bg-emerald-50"
                      : "hover:bg-slate-50",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={picked.includes(v.id)}
                    onChange={() => togglePick(v.id)}
                    disabled={!canRecharge}
                    className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
                  />
                  <Truck className="size-3.5 text-slate-400" />
                  <span className="font-mono text-xs font-bold text-slate-800">
                    {v.placa}
                  </span>
                  <span className="ml-auto font-mono text-xs text-slate-500">
                    {formatCurrency(v.balance)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Monto por TAG
                </span>
                <input
                  type="number"
                  min={0}
                  value={masivaMonto}
                  onChange={(e) => setMasivaMonto(Number(e.target.value))}
                  disabled={!canRecharge}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-mono focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
              <div className="text-sm text-slate-500">
                Total:{" "}
                <span className="font-mono font-bold text-slate-900">
                  {formatCurrency(masivaTotal)}
                </span>
              </div>
              <button
                type="button"
                disabled={!canRecharge || picked.length === 0 || masivaMonto <= 0}
                onClick={() => {
                  rechargeMasiva(picked, masivaMonto);
                  flash(
                    `Recarga de ${formatCurrency(masivaMonto)} aplicada a ${picked.length} TAG(s).`,
                  );
                  setPicked([]);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-40"
              >
                <Zap className="size-4" /> Aplicar a {picked.length}
              </button>
            </div>

            {/* Auto-recarga */}
            <div className="mt-2 flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:items-end">
              <div className="flex items-center gap-2">
                <Gauge className="size-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Auto-recarga por umbral
                  </p>
                  <p className="text-xs text-slate-500">
                    Recarga automática cuando el saldo de un TAG cae bajo el
                    umbral.
                  </p>
                </div>
              </div>
              <label className="sm:ml-auto flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Umbral (RD$)
                </span>
                <input
                  type="number"
                  min={0}
                  value={umbral}
                  onChange={(e) => setUmbral(Number(e.target.value))}
                  disabled={!canRecharge}
                  className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
              <button
                type="button"
                disabled={!canRecharge}
                onClick={() => {
                  updateEmpresa({ umbralAutoRecarga: umbral });
                  flash(`Umbral de auto-recarga: ${formatCurrency(umbral)}.`);
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        {/* ── Historial ── */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-3.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Historial de recargas
            </h2>
          </div>
          {sortedRecharges.length === 0 ? (
            <EmptyState
              Icon={Wallet}
              title="Sin recargas"
              description="Aún no se han registrado recargas."
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {sortedRecharges.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg",
                      r.destino === "central"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600",
                    )}
                  >
                    {r.destino === "central" ? (
                      <Wallet className="size-4" />
                    ) : (
                      <Zap className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {r.destino === "central"
                        ? "Recarga de billetera central"
                        : `Recarga masiva · ${r.vehicleIds?.length ?? 0} TAG`}
                    </p>
                    <p className="text-xs text-slate-500">{formatDate(r.fecha)}</p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider",
                      r.estado === "Aprobado"
                        ? "text-emerald-600"
                        : "text-amber-600",
                    )}
                  >
                    {r.estado === "Aprobado" ? (
                      <CheckCircle2 className="size-3.5" />
                    ) : (
                      <Clock className="size-3.5" />
                    )}
                    {r.estado}
                  </span>
                  <span className="w-28 text-right font-mono text-sm font-bold tabular-nums text-slate-900">
                    {formatCurrency(r.monto)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
