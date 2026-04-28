"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  ArrowUpRight,
  Info,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos y Datos de Prueba ──────────────────────────────────────────────────

type Relacion = "Familiar" | "Empleado";

interface Vinculado {
  id: string;
  nombre: string;
  cedula: string;
  relacion: Relacion;
  activo: boolean;
  fechaVinculacion: string;
  ultimoAcceso: string;
}

const INITIAL_DATA: Vinculado[] = [
  {
    id: "v1",
    nombre: "María Altagracia Pérez",
    cedula: "001-1234567-8",
    relacion: "Familiar",
    activo: true,
    fechaVinculacion: "12 Ene 2024",
    ultimoAcceso: "Hoy, 10:45 AM",
  },
  {
    id: "v2",
    nombre: "Juan Carlos De Los Santos",
    cedula: "402-9876543-2",
    relacion: "Empleado",
    activo: true,
    fechaVinculacion: "05 Mar 2024",
    ultimoAcceso: "Ayer, 06:20 PM",
  },
  {
    id: "v3",
    nombre: "Pedro Martínez Ruiz",
    cedula: "001-0000000-0",
    relacion: "Empleado",
    activo: false,
    fechaVinculacion: "20 Feb 2024",
    ultimoAcceso: "Hace 15 días",
  },
];

// ─── Componentes Auxiliares ───────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            color,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="font-mono text-2xl font-bold tabular-nums text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Helper Formateo ──────────────────────────────────────────────────────────
const formatCedula = (val: string) => {
  const v = val.replace(/\D/g, "");
  let res = v;
  if (v.length > 3) res = `${v.slice(0, 3)}-${v.slice(3)}`;
  if (v.length > 10) res = `${res.slice(0, 11)}-${v.slice(10, 11)}`;
  return res;
};

// ─── Página Principal ─────────────────────────────────────────────────────────

export default function VinculadosPage() {
  // Estados de datos
  const [data, setData] = useState<Vinculado[]>(INITIAL_DATA);

  // Estados de UI
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Todos" | Relacion>("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Estados del Formulario Modal
  const [newNombre, setNewNombre] = useState("");
  const [newCedula, setNewCedula] = useState("");
  const [newRelacion, setNewRelacion] = useState<Relacion>("Familiar");

  // Lógica de filtrado
  const filteredData = useMemo(() => {
    return data.filter((v) => {
      const matchesSearch =
        v.nombre.toLowerCase().includes(search.toLowerCase()) ||
        v.cedula.includes(search);
      const matchesFilter = filter === "Todos" || v.relacion === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, data]);

  const selectedVinculado = data.find((v) => v.id === selectedId);

  // Lógica de Formulario
  const canSubmit = newNombre.trim().length >= 3 && newCedula.length === 13;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newRecord: Vinculado = {
      id: `v${Date.now()}`,
      nombre: newNombre.trim(),
      cedula: newCedula,
      relacion: newRelacion,
      activo: true,
      fechaVinculacion: "Hoy",
      ultimoAcceso: "Sin actividad",
    };

    setData([newRecord, ...data]);
    setIsAdding(false);
    setNewNombre("");
    setNewCedula("");
    setNewRelacion("Familiar");
  };

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* ── CONTENEDOR FLUIDO ── */}
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional ── */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Gestión de Accesos
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Cuentas Vinculadas
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Administre las personas autorizadas para utilizar su balance de
              Paso Rápido. Puede definir límites y supervisar el uso de cada
              dispositivo asociado.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 active:scale-[0.98] sm:w-auto"
          >
            <UserPlus className="h-4.5 w-4.5" />
            Vincular Persona
          </button>
        </header>

        {/* ── Banner de Estadísticas ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Vinculados"
            value={data.length}
            icon={Users}
            color="bg-blue-50 border-blue-100 text-blue-600"
          />
          <StatCard
            label="Cuentas Activas"
            value={data.filter((v) => v.activo).length}
            icon={ShieldCheck}
            color="bg-emerald-50 border-emerald-100 text-emerald-600"
          />
          <StatCard
            label="En Suspensión"
            value={data.filter((v) => !v.activo).length}
            icon={ShieldAlert}
            color="bg-rose-50 border-rose-100 text-rose-600"
          />
        </div>

        {/* ── Barra de Herramientas (Filtros y Búsqueda) ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o cédula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
            {(["Todos", "Familiar", "Empleado"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
                  filter === t
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Listado de Vinculados ── */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                {/* Avatar con Iniciales */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-lg font-bold text-slate-600 transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  {v.nombre
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                {/* Status Pill */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                    v.activo
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-slate-100 text-slate-500 ring-slate-200",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      v.activo ? "bg-emerald-500" : "bg-slate-400",
                    )}
                  />
                  {v.activo ? "Activo" : "Suspendido"}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="truncate text-sm font-bold text-slate-900">
                  {v.nombre}
                </h3>
                <p className="font-mono text-xs tracking-tight text-slate-500">
                  {v.cedula}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  {v.relacion}
                </span>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-emerald-600">
                  Ver detalle
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Empty State ── */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-300 ring-8 ring-slate-50">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-base font-bold text-slate-900">
              No se encontraron resultados
            </h3>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              Intente ajustar los filtros o el término de búsqueda para
              localizar al vinculado.
            </p>
          </div>
        )}

        {/* ── Nota Informativa Inferior ── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Política de Uso de Cuentas Vinculadas
              </h2>
              <p className="mt-1 max-w-4xl text-xs leading-relaxed text-slate-500">
                Los vinculados marcados como <strong>"Empleado"</strong> tienen
                restricciones automáticas de horario comercial, mientras que los{" "}
                <strong>"Familiares"</strong> comparten el balance global sin
                restricciones. Usted es responsable de todos los tránsitos
                realizados por las cuentas que autorice en este panel.
              </p>
              <div className="mt-4 flex gap-4">
                <button className="inline-flex items-center gap-1 rounded-sm text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                  Términos de servicio <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── MODAL: NUEVO VINCULADO (Centered Modal) ── */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          {/* Fondo clicable para cerrar */}
          <div
            className="absolute inset-0"
            onClick={() => setIsAdding(false)}
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900">
                  Vincular Persona
                </h2>
              </div>
              <button
                onClick={() => setIsAdding(false)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="block w-full rounded-xl border border-slate-300 py-3 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Cédula de Identidad
                </label>
                <input
                  type="text"
                  required
                  value={newCedula}
                  onChange={(e) => setNewCedula(formatCedula(e.target.value))}
                  placeholder="001-0000000-0"
                  maxLength={13}
                  className="block w-full rounded-xl border border-slate-300 py-3 px-4 font-mono text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Relación
                </label>
                <select
                  value={newRelacion}
                  onChange={(e) => setNewRelacion(e.target.value as Relacion)}
                  className="block w-full rounded-xl border border-slate-300 py-3 px-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none bg-white"
                >
                  <option value="Familiar">Familiar</option>
                  <option value="Empleado">Empleado</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                    canSubmit
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed",
                  )}
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  Guardar Vinculado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DRAWER DE DETALLE (Overlay lateral) ── */}
      {selectedId && selectedVinculado && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedId(null)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[400px]">
            <div className="flex h-full flex-col">
              {/* Header Drawer */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Ficha del Vinculado
                </h2>
                <button
                  onClick={() => setSelectedId(null)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Contenido Drawer */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-[28px] border-[5px] border-white bg-slate-100 text-3xl font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
                    {selectedVinculado.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedVinculado.nombre}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                      {selectedVinculado.relacion}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {selectedVinculado.cedula}
                    </span>
                  </div>
                </div>

                <div className="mt-10 space-y-6">
                  {/* Info Rows */}
                  <div className="grid gap-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Fecha de Alta
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedVinculado.fechaVinculacion}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Última Actividad en Peaje
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedVinculado.ultimoAcceso}
                      </p>
                    </div>
                  </div>

                  {/* Acciones de Ficha */}
                  <div className="space-y-3 pt-4">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 active:scale-[0.98]">
                      <Edit2 className="h-4 w-4" />
                      Editar Información
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 active:scale-[0.98]">
                      <ArrowUpRight className="h-4 w-4" />
                      Ver Historial de Consumos
                    </button>
                    <div className="pt-4">
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50/30 py-3 text-sm font-bold text-rose-600 shadow-sm transition-all hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:ring-offset-2 active:scale-[0.98]">
                        <Trash2 className="h-4 w-4" />
                        Desvincular Cuenta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
