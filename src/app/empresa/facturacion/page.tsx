"use client";

import { useMemo } from "react";
import { Download, Building2, Info, CheckCircle2, Clock } from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { formatCurrency, formatPeriodo } from "@/lib/format";
import { PageHeader, DemoBadge } from "@/components/empresa/shared";
import { cn } from "@/lib/utils";

export default function FacturacionPage() {
  const { empresa, invoices } = useEmpresaData();

  const sorted = useMemo(
    () => [...invoices].sort((a, b) => b.periodo.localeCompare(a.periodo)),
    [invoices],
  );

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Finanzas"
          title="Facturación"
          description="Datos fiscales de la empresa y comprobantes mensuales de la flota."
          actions={<DemoBadge />}
        />

        {/* ── Datos fiscales ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Building2 className="size-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Datos fiscales
              </h2>
              <p className="text-xs text-slate-500">
                Aparecen en los comprobantes emitidos.
              </p>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <FiscalRow label="Razón social" value={empresa.razonSocial} />
            <FiscalRow label="RNC" value={empresa.rnc} mono />
            <FiscalRow label="Dirección" value={empresa.direccion ?? "—"} />
            <FiscalRow label="Correo" value={empresa.contactoEmail} />
            <FiscalRow label="Teléfono" value={empresa.contactoTelefono} />
          </dl>
        </section>

        {/* ── Comprobantes ── */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-3.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Comprobantes mensuales
            </h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3 text-left">Periodo</th>
                <th className="px-6 py-3 text-left">NCF</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-right">Total</th>
                <th className="px-6 py-3 text-right">Comprobante</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {formatPeriodo(inv.periodo)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-slate-600">
                      {inv.ncf ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider",
                        inv.estado === "Pagada"
                          ? "text-emerald-600"
                          : "text-amber-600",
                      )}
                    >
                      {inv.estado === "Pagada" ? (
                        <CheckCircle2 className="size-3.5" />
                      ) : (
                        <Clock className="size-3.5" />
                      )}
                      {inv.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold tabular-nums text-slate-900">
                    {formatCurrency(inv.total)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <Download className="size-3.5 text-slate-500" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Nota fuera de alcance ── */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-blue-500" />
          <p className="text-sm text-blue-900">
            La emisión fiscal real (NCF y reporte a la DGII) está fuera del
            alcance de esta demo. Los comprobantes mostrados son de ejemplo con
            datos ficticios.
          </p>
        </div>
      </div>
    </div>
  );
}

function FiscalRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-0.5 text-sm text-slate-800",
          mono && "font-mono font-semibold",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
