"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  Plus,
  Snowflake,
  Sun,
  Building2,
  RefreshCw,
  Filter,
  X,
} from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { useAccount } from "@/context/AccountContext";
import { formatCurrency } from "@/lib/format";
import { DataTable, type Column } from "@/components/empresa/DataTable";
import { EmptyState } from "@/components/empresa/EmptyState";
import { PageHeader, TagStatusBadge } from "@/components/empresa/shared";
import type { FleetVehicle, TagStatus } from "@/types/empresa";
import { cn } from "@/lib/utils";

const RECARGA_MASIVA_DEFAULT = 500;

export default function FlotaPage() {
  const {
    fleet,
    drivers,
    costCenters,
    toggleFreeze,
    bulkFreeze,
    bulkAssignCostCenter,
    rechargeMasiva,
  } = useEmpresaData();
  const { can } = useAccount();
  const canWrite = can("vehiculos:write");
  const canRecharge = can("recargar");

  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState<TagStatus | "all">("all");
  const [centro, setCentro] = useState<string>("all");
  const [conductor, setConductor] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [assignTo, setAssignTo] = useState<string>("");
  const [notice, setNotice] = useState<string | null>(null);

  const driverName = (id?: string) =>
    drivers.find((d) => d.id === id)?.nombre ?? "—";
  const centerName = (id?: string) =>
    costCenters.find((c) => c.id === id)?.nombre ?? "—";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return fleet.filter((v) => {
      const matchesSearch =
        !q ||
        v.placa.toLowerCase().includes(q) ||
        v.tagNumber.toLowerCase().includes(q) ||
        `${v.marca} ${v.modelo}`.toLowerCase().includes(q);
      const matchesEstado = estado === "all" || v.tagStatus === estado;
      const matchesCentro = centro === "all" || v.costCenterId === centro;
      const matchesConductor =
        conductor === "all" || v.driverId === conductor;
      return (
        matchesSearch && matchesEstado && matchesCentro && matchesConductor
      );
    });
  }, [fleet, search, estado, centro, conductor]);

  const hasFilters =
    search !== "" || estado !== "all" || centro !== "all" || conductor !== "all";

  const resetFilters = () => {
    setSearch("");
    setEstado("all");
    setCentro("all");
    setConductor("all");
  };

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const columns: Column<FleetVehicle>[] = [
    {
      key: "placa",
      header: "Vehículo",
      span: 3,
      sortValue: (v) => v.placa,
      render: (v) => (
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50">
            <Truck className="size-4 text-slate-500" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-sm font-bold text-slate-900">
              {v.placa}
            </p>
            <p className="truncate text-xs text-slate-500">
              {v.marca} {v.modelo} · {v.year}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "tag",
      header: "TAG",
      sortValue: (v) => v.tagNumber,
      render: (v) => (
        <span className="font-mono text-xs text-slate-600">{v.tagNumber}</span>
      ),
    },
    {
      key: "conductor",
      header: "Conductor",
      sortValue: (v) => driverName(v.driverId),
      render: (v) => (
        <span className="text-sm text-slate-700">{driverName(v.driverId)}</span>
      ),
    },
    {
      key: "centro",
      header: "Centro",
      sortValue: (v) => centerName(v.costCenterId),
      render: (v) => (
        <span className="text-sm text-slate-700">
          {centerName(v.costCenterId)}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      sortValue: (v) => v.tagStatus,
      render: (v) => <TagStatusBadge status={v.tagStatus} />,
    },
    {
      key: "saldo",
      header: "Saldo",
      align: "right",
      sortValue: (v) => v.balance,
      render: (v) => (
        <span
          className={cn(
            "font-mono text-sm font-bold tabular-nums",
            v.tagStatus === "bajo_balance"
              ? "text-amber-600"
              : "text-slate-900",
          )}
        >
          {formatCurrency(v.balance)}
        </span>
      ),
    },
    {
      key: "pases",
      header: "Pases",
      align: "right",
      sortValue: (v) => v.pasesMes,
      render: (v) => (
        <span className="font-mono text-sm tabular-nums text-slate-600">
          {v.pasesMes}
        </span>
      ),
    },
    {
      key: "gasto",
      header: "Gasto mes",
      align: "right",
      sortValue: (v) => v.gastoMes,
      render: (v) => (
        <span className="font-mono text-sm tabular-nums text-slate-700">
          {formatCurrency(v.gastoMes)}
        </span>
      ),
    },
  ];

  const rowActions = (v: FleetVehicle) => (
    <div className="flex items-center justify-end gap-1">
      {canRecharge && (
        <Link
          href="/empresa/recargas"
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
          title="Recargar"
        >
          <RefreshCw className="size-3.5 text-emerald-600" />
        </Link>
      )}
      {canWrite && (
        <button
          type="button"
          onClick={() => toggleFreeze(v.id)}
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
          title={v.tagStatus === "congelado" ? "Descongelar" : "Congelar"}
        >
          {v.tagStatus === "congelado" ? (
            <Sun className="size-3.5 text-amber-500" />
          ) : (
            <Snowflake className="size-3.5 text-slate-400" />
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Gestión de flota"
          title="Flota de vehículos"
          description="Administre todos los vehículos y dispositivos TAG de la empresa. Filtre, asigne centros de costo y conductores, o congele dispositivos en bloque."
          actions={
            canWrite ? (
              <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98]">
                <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
                Agregar vehículo
              </button>
            ) : undefined
          }
        />

        {notice && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-800">
            {notice}
          </div>
        )}

        {/* ── Filtros ── */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por placa, TAG o modelo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-2">
            <FilterSelect
              value={estado}
              onChange={(v) => setEstado(v as TagStatus | "all")}
              options={[
                { value: "all", label: "Todos los estados" },
                { value: "activo", label: "Activo" },
                { value: "bajo_balance", label: "Bajo balance" },
                { value: "congelado", label: "Congelado" },
              ]}
            />
            <FilterSelect
              value={centro}
              onChange={setCentro}
              options={[
                { value: "all", label: "Todos los centros" },
                ...costCenters.map((c) => ({ value: c.id, label: c.nombre })),
              ]}
            />
            <FilterSelect
              value={conductor}
              onChange={setConductor}
              options={[
                { value: "all", label: "Todos los conductores" },
                ...drivers.map((d) => ({ value: d.id, label: d.nombre })),
              ]}
            />
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                <X className="size-3.5" /> Limpiar
              </button>
            )}
          </div>
        </div>

        {/* ── Barra de acciones masivas ── */}
        {selected.length > 0 && (canWrite || canRecharge) && (
          <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-emerald-900">
              {selected.length} seleccionado(s)
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {canWrite && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      bulkFreeze(selected, true);
                      flash(`${selected.length} vehículo(s) congelado(s).`);
                      setSelected([]);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Snowflake className="size-3.5 text-slate-400" /> Congelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      bulkFreeze(selected, false);
                      flash(`${selected.length} vehículo(s) descongelado(s).`);
                      setSelected([]);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Sun className="size-3.5 text-amber-500" /> Descongelar
                  </button>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="">Asignar centro…</option>
                      {costCenters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={!assignTo}
                      onClick={() => {
                        bulkAssignCostCenter(selected, assignTo);
                        flash(
                          `Centro asignado a ${selected.length} vehículo(s).`,
                        );
                        setSelected([]);
                        setAssignTo("");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    >
                      <Building2 className="size-3.5 text-slate-400" /> Asignar
                    </button>
                  </div>
                </>
              )}
              {canRecharge && (
                <button
                  type="button"
                  onClick={() => {
                    rechargeMasiva(selected, RECARGA_MASIVA_DEFAULT);
                    flash(
                      `Recarga de ${formatCurrency(RECARGA_MASIVA_DEFAULT)} aplicada a ${selected.length} TAG(s).`,
                    );
                    setSelected([]);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <RefreshCw className="size-3.5" /> Recargar selección
                </button>
              )}
            </div>
          </div>
        )}

        <DataTable
          columns={columns}
          rows={filtered}
          getRowId={(v) => v.id}
          selectable={canWrite || canRecharge}
          selectedIds={selected}
          onSelectionChange={setSelected}
          rowActions={canWrite || canRecharge ? rowActions : undefined}
          pageSize={8}
          emptyState={
            <EmptyState
              Icon={Filter}
              title="Sin vehículos"
              description="No hay vehículos que coincidan con los filtros actuales."
              action={
                hasFilters ? (
                  <button
                    onClick={resetFilters}
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

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
