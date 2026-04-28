"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  FileText,
  ArrowDownToLine,
  ArrowUpFromLine,
  ShieldAlert,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ClaimStatus = "abierta" | "en_revision" | "resuelta" | "rechazada";

interface Claim {
  id: string;
  ticket: string;
  motivo: string;
  peaje: string;
  fecha: string;
  monto: string;
  status: ClaimStatus;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const CLAIMS: Claim[] = [
  { id: "c1", ticket: "#REC-20260428-001", motivo: "Cobro duplicado", peaje: "Las Américas", fecha: "28 Abr 2026 · 08:42", monto: "RD$ 100.00", status: "abierta" },
  { id: "c2", ticket: "#REC-20260425-003", motivo: "Lectura incorrecta", peaje: "La Victoria", fecha: "25 Abr 2026 · 17:30", monto: "RD$ 100.00", status: "en_revision" },
  { id: "c3", ticket: "#REC-20260420-007", motivo: "Cobro en peaje cerrado", peaje: "Duarte Km 9", fecha: "20 Abr 2026 · 11:15", monto: "RD$ 100.00", status: "resuelta" },
  { id: "c4", ticket: "#REC-20260415-002", motivo: "Monto incorrecto", peaje: "Hatillo", fecha: "15 Abr 2026 · 09:00", monto: "RD$ 150.00", status: "rechazada" },
  { id: "c5", ticket: "#REC-20260410-005", motivo: "TAG no leído", peaje: "Las Américas", fecha: "10 Abr 2026 · 14:20", monto: "RD$ 100.00", status: "abierta" },
  { id: "c6", ticket: "#REC-20260405-008", motivo: "Cobro duplicado", peaje: "La Victoria", fecha: "05 Abr 2026 · 07:45", monto: "RD$ 100.00", status: "resuelta" },
];

const STATUS_CONFIG: Record<ClaimStatus, { badge: string; dot: string; label: string }> = {
  abierta: { badge: "bg-amber-50 text-amber-700 ring-amber-200/50", dot: "bg-amber-400", label: "Abierta" },
  en_revision: { badge: "bg-blue-50 text-blue-700 ring-blue-200/50", dot: "bg-blue-400", label: "En revisión" },
  resuelta: { badge: "bg-emerald-50 text-emerald-700 ring-emerald-200/50", dot: "bg-emerald-400", label: "Resuelta" },
  rechazada: { badge: "bg-red-50 text-red-600 ring-red-200/50", dot: "bg-red-400", label: "Rechazada" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReclamacionesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClaimStatus | "all">("all");

  const filteredClaims = useMemo(() => {
    return CLAIMS.filter((c) => {
      const matchesSearch =
        c.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.peaje.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" ? true : c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const counts = useMemo(() => {
    return {
      total: CLAIMS.length,
      abierta: CLAIMS.filter((c) => c.status === "abierta").length,
      en_revision: CLAIMS.filter((c) => c.status === "en_revision").length,
      resuelta: CLAIMS.filter((c) => c.status === "resuelta").length,
    };
  }, []);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col bg-slate-50/50 overflow-hidden">
      <div className="flex-1 w-full space-y-4 px-4 py-5 sm:px-6 lg:px-8 overflow-hidden flex flex-col">
        {/* ── Header ── */}
        <header className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Mi cuenta</p>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Reclamaciones</h1>
          </div>
          <button className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all active:scale-95">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Nueva reclamación
          </button>
        </header>

        {/* ── Resumen ── */}
        <div className="shrink-0 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <FileText className="h-4 w-4 text-slate-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total</h3>
            </div>
            <p className="text-xl font-bold text-slate-900">{counts.total}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Abiertas</h3>
            </div>
            <p className="text-xl font-bold text-amber-800">{counts.abierta}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-blue-700">En revisión</h3>
            </div>
            <p className="text-xl font-bold text-blue-800">{counts.en_revision}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Resueltas</h3>
            </div>
            <p className="text-xl font-bold text-emerald-800">{counts.resuelta}</p>
          </div>
        </div>

        {/* ── Filtros ── */}
        <div className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar reclamo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(["all", "abierta", "en_revision", "resuelta"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[11px] font-bold transition-all",
                  filterStatus === f
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {f === "all" ? "Todas" : f === "en_revision" ? "En revisión" : f === "abierta" ? "Abiertas" : "Resueltas"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabla ── */}
        <section className="shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col flex-1 min-h-0">
          {/* Cabecera */}
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3">
            <div className="col-span-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Reclamación</div>
            <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Peaje / Fecha</div>
            <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Estado</div>
            <div className="col-span-2 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Monto</div>
          </div>

          {/* Filas */}
          <div className="flex-1 overflow-y-auto">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((c) => {
                const sc = STATUS_CONFIG[c.status];
                return (
                  <div
                    key={c.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center border-b border-slate-100 px-4 sm:px-5 py-3.5 last:border-0 hover:bg-slate-50/40 transition-colors"
                  >
                    <div className="sm:col-span-5 flex items-start gap-3">
                      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${sc.badge}`}>
                        <ShieldAlert className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">{c.motivo}</p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">{c.ticket}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <p className="text-xs text-slate-700">{c.peaje}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.fecha}</p>
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between sm:block">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                        sc.badge,
                      )}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:block sm:col-span-2 sm:text-right">
                      <span className="sm:hidden text-[11px] text-slate-400">Monto</span>
                      <p className="text-sm font-bold font-mono tracking-tight text-slate-900">{c.monto}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-3">
                  <Filter className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Sin resultados</h3>
                <p className="mt-1 text-xs text-slate-500">No hay reclamaciones con esos filtros.</p>
                <button
                  onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}
                  className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
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