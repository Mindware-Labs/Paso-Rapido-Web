"use client";

import { useState, useMemo } from "react";
import {
  History,
  TrendingDown,
  TrendingUp,
  Download,
  Search,
  Calendar,
  Filter,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Datos de prueba ──────────────────────────────────────────────────────────

const INITIAL_ROWS = [
  {
    id: "tx-001",
    t: "Peaje Las Américas",
    d: "12 Abr 2026 · 08:42",
    ref: "OP-99281",
    a: 100.0,
    out: true,
    status: "Procesado",
  },
  {
    id: "tx-002",
    t: "Recarga",
    d: "11 Abr 2026 · 16:10",
    ref: "RC-55102",
    a: 500.0,
    out: false,
    status: "Aprobado",
  },
  {
    id: "tx-003",
    t: "Peaje Autopista 6 de noviembre",
    d: "08 Abr 2026 · 07:15",
    ref: "OP-99104",
    a: 100.0,
    out: true,
    status: "Procesado",
  },
  {
    id: "tx-004",
    t: "Peaje Las Américas",
    d: "05 Abr 2026 · 19:30",
    ref: "OP-98944",
    a: 100.0,
    out: true,
    status: "Procesado",
  },
  {
    id: "tx-005",
    t: "Recarga",
    d: "01 Abr 2026 · 10:00",
    ref: "RC-54992",
    a: 1000.0,
    out: false,
    status: "Aprobado",
  },
  {
    id: "tx-006",
    t: "Peaje Autopista Duarte",
    d: "28 Mar 2026 · 08:15",
    ref: "OP-98112",
    a: 100.0,
    out: true,
    status: "Procesado",
  },
];

// Helper para formatear moneda
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  })
    .format(amount)
    .replace("DOP", "RD$");
};

export default function HistoricoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all");

  // Lógica de filtrado
  const filteredRows = useMemo(() => {
    return INITIAL_ROWS.filter((row) => {
      const matchesSearch =
        row.t.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.ref.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" ? true : filterType === "out" ? row.out : !row.out;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

  // Cálculos dinámicos para el resumen
  const totals = useMemo(() => {
    return filteredRows.reduce(
      (acc, row) => {
        if (row.out) acc.out += row.a;
        else acc.in += row.a;
        return acc;
      },
      { in: 0, out: 0 },
    );
  }, [filteredRows]);

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* ── CONTENEDOR FLUIDO (Sin max-w, ocupando el 100% del área útil) ── */}
      <div className="w-full space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional ── */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              Estado de Cuenta
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Historial de Movimientos
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Consulta el detalle de tus tránsitos por estaciones de peaje y
              recargas de saldo. Utiliza los filtros para revisar períodos
              específicos.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 active:scale-[0.98]">
              <Download className="h-4.5 w-4.5 text-slate-500" />
              Descargar Extracto
            </button>
          </div>
        </header>

        {/* ── Resumen del Período (Tarjetas Financieras) ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-slate-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Transacciones
              </h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {filteredRows.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownToLine className="h-4 w-4 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Ingresos
              </h3>
            </div>
            <p className="text-2xl font-bold text-emerald-700 font-mono tracking-tight">
              {formatCurrency(totals.in)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpFromLine className="h-4 w-4 text-slate-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Consumos
              </h3>
            </div>
            <p className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
              {formatCurrency(totals.out)}
            </p>
          </div>
        </div>

        {/* ── Barra de Herramientas (Filtros y Búsqueda) ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {/* Buscador */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por estación o referencia de pago..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Filtros Rapidos */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setFilterType("all")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-xs font-bold transition-all",
                  filterType === "all"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType("out")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-xs font-bold transition-all",
                  filterType === "out"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                Consumos
              </button>
              <button
                onClick={() => setFilterType("in")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-xs font-bold transition-all",
                  filterType === "in"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                Recargas
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            <button className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <Calendar className="h-4 w-4 text-slate-400" />
              Abril 2026
            </button>
          </div>
        </div>

        {/* ── Contenedor del Historial (Libro Mayor) ── */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
          {/* Cabecera de columnas falsa (Desktop) */}
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3.5">
            <div className="col-span-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Concepto de la Transacción
            </div>
            <div className="col-span-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Identificador / Estado
            </div>
            <div className="col-span-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Importe
            </div>
          </div>

          <div className="flex-1">
            {filteredRows.length > 0 ? (
              <div className="flex flex-col">
                {filteredRows.map((r) => (
                  <div
                    key={r.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b border-slate-100 px-4 sm:px-6 py-4 last:border-0 hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Concepto y Fecha */}
                    <div className="sm:col-span-5 flex items-start gap-4">
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                          r.out
                            ? "border-slate-200 bg-slate-50"
                            : "border-emerald-100 bg-emerald-50"
                        }`}
                      >
                        {r.out ? (
                          <TrendingDown
                            className="h-4 w-4 text-slate-500"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <TrendingUp
                            className="h-4 w-4 text-emerald-600"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {r.t}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">{r.d}</p>
                      </div>
                    </div>

                    {/* Referencia y Estado */}
                    <div className="hidden sm:flex sm:col-span-4 flex-col items-start gap-1.5">
                      <p className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                        {r.ref}
                      </p>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                          r.status === "Aprobado" || r.status === "Procesado"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200/50"
                            : "bg-amber-50 text-amber-700 ring-amber-200/50",
                        )}
                      >
                        {r.status}
                      </span>
                    </div>

                    {/* Importe (Mobile + Desktop) */}
                    <div className="flex items-center justify-between sm:block sm:col-span-3 sm:text-right">
                      {/* Mobile Only: Ref & Status */}
                      <div className="sm:hidden flex flex-col gap-1.5">
                        <p className="text-[11px] font-mono text-slate-500">
                          Ref: {r.ref}
                        </p>
                        <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          {r.status}
                        </span>
                      </div>

                      {/* Desktop & Mobile: Amount */}
                      <div>
                        <p
                          className={cn(
                            "text-[15px] font-bold font-mono tracking-tight",
                            r.out ? "text-slate-900" : "text-emerald-600",
                          )}
                        >
                          {r.out ? "-" : "+"}
                          {formatCurrency(r.a)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Estado Vacío / Sin Resultados */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 mb-4 ring-8 ring-slate-50">
                  <Filter className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  No hay registros encontrados
                </h3>
                <p className="mt-1 max-w-md text-sm text-slate-500">
                  No hemos encontrado transacciones que coincidan con los
                  filtros actuales. Intenta cambiar los términos de búsqueda o
                  el rango de fechas.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                  }}
                  className="mt-5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
