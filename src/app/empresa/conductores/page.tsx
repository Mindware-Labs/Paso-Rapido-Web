"use client";

import { useMemo, useState } from "react";
import { Users, Plus, Trash2, UserCheck, UserX, X } from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { useAccount } from "@/context/AccountContext";
import { formatDate } from "@/lib/format";
import { DataTable, type Column } from "@/components/empresa/DataTable";
import { EmptyState } from "@/components/empresa/EmptyState";
import { PageHeader } from "@/components/empresa/shared";
import type { Driver } from "@/types/empresa";
import { cn } from "@/lib/utils";

export default function ConductoresPage() {
  const {
    drivers,
    fleet,
    costCenters,
    addDriver,
    updateDriver,
    removeDriver,
  } = useEmpresaData();
  const { can } = useAccount();
  const canWrite = can("conductores:write");

  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [centroId, setCentroId] = useState("");

  const centerName = (id?: string) =>
    costCenters.find((c) => c.id === id)?.nombre ?? "—";
  const assignedVehicle = (driverId: string) =>
    fleet.find((v) => v.driverId === driverId)?.placa ?? "—";

  const canSubmit = nombre.trim() !== "" && cedula.trim() !== "";

  const submit = () => {
    if (!canSubmit) return;
    addDriver({
      nombre: nombre.trim(),
      cedula: cedula.trim(),
      costCenterId: centroId || undefined,
      activo: true,
    });
    setNombre("");
    setCedula("");
    setCentroId("");
    setShowForm(false);
  };

  const columns: Column<Driver>[] = useMemo(
    () => [
      {
        key: "nombre",
        header: "Conductor",
        span: 3,
        sortValue: (d) => d.nombre,
        render: (d) => (
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
              {d.nombre
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{d.nombre}</p>
              <p className="font-mono text-xs text-slate-500">{d.cedula}</p>
            </div>
          </div>
        ),
      },
      {
        key: "vehiculo",
        header: "Vehículo",
        render: (d) => (
          <span className="font-mono text-sm text-slate-700">
            {assignedVehicle(d.id)}
          </span>
        ),
      },
      {
        key: "centro",
        header: "Centro",
        sortValue: (d) => centerName(d.costCenterId),
        render: (d) => (
          <span className="text-sm text-slate-700">
            {centerName(d.costCenterId)}
          </span>
        ),
      },
      {
        key: "estado",
        header: "Estado",
        sortValue: (d) => (d.activo ? 1 : 0),
        render: (d) => (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
              d.activo
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-slate-100 text-slate-500 ring-slate-200",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                d.activo ? "bg-emerald-500" : "bg-slate-400",
              )}
            />
            {d.activo ? "Activo" : "Inactivo"}
          </span>
        ),
      },
      {
        key: "ultimoUso",
        header: "Último uso",
        align: "right",
        sortValue: (d) => d.ultimoUso ?? "",
        render: (d) => (
          <span className="text-xs text-slate-500">
            {d.ultimoUso ? formatDate(d.ultimoUso) : "—"}
          </span>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fleet, costCenters],
  );

  const rowActions = (d: Driver) => (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => updateDriver(d.id, { activo: !d.activo })}
        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        title={d.activo ? "Desactivar" : "Activar"}
      >
        {d.activo ? (
          <UserX className="size-4" />
        ) : (
          <UserCheck className="size-4" />
        )}
      </button>
      <button
        type="button"
        onClick={() => removeDriver(d.id)}
        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
        title="Eliminar"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Equipo de conductores"
          title="Conductores"
          description="Empleados con vehículo y TAG asignado. Gestione altas, bajas y su centro de costo."
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
                {showForm ? "Cancelar" : "Agregar conductor"}
              </button>
            ) : undefined
          }
        />

        {canWrite && showForm && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Nombre completo">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </Field>
              <Field label="Cédula">
                <input
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="001-0000000-0"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </Field>
              <Field label="Centro de costo">
                <select
                  value={centroId}
                  onChange={(e) => setCentroId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Sin asignar</option>
                  {costCenters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={submit}
                disabled={!canSubmit}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
              >
                Guardar conductor
              </button>
            </div>
          </div>
        )}

        <DataTable
          columns={columns}
          rows={drivers}
          getRowId={(d) => d.id}
          rowActions={canWrite ? rowActions : undefined}
          pageSize={10}
          emptyState={
            <EmptyState
              Icon={Users}
              title="Sin conductores"
              description="Aún no hay conductores registrados en la flota."
            />
          }
        />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}
