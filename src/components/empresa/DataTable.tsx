"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "./TableSkeleton";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Valor para ordenar. Si se omite, la columna no es ordenable. */
  sortValue?: (row: T) => string | number;
  align?: "left" | "right" | "center";
  /** Oculta la columna en el header desktop (sigue visible en card móvil). */
  headerClassName?: string;
  cellClassName?: string;
  /** Peso relativo de la columna (col-span sobre 12). */
  span?: number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  rowActions?: (row: T) => ReactNode;
  pageSize?: number;
  loading?: boolean;
  emptyState?: ReactNode;
  /** Render de tarjeta personalizada en móvil; por defecto lista columnas. */
  mobileCard?: (row: T) => ReactNode;
}

type SortDir = "asc" | "desc";

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  rowActions,
  pageSize = 10,
  loading = false,
  emptyState,
  mobileCard,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return rows;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = col.sortValue!(a);
      const vb = col.sortValue!(b);
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
  }, [rows, sortKey, sortDir, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = sorted.slice(
    safePage * pageSize,
    safePage * pageSize + pageSize,
  );

  const pageIds = pageRows.map(getRowId);
  const allOnPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  const toggleSort = (col: Column<T>) => {
    if (!col.sortValue) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
  };

  const toggleRow = (id: string) => {
    if (!onSelectionChange) return;
    onSelectionChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id],
    );
  };

  const toggleAllOnPage = () => {
    if (!onSelectionChange) return;
    if (allOnPageSelected) {
      onSelectionChange(selectedIds.filter((id) => !pageIds.includes(id)));
    } else {
      onSelectionChange([...new Set([...selectedIds, ...pageIds])]);
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <TableSkeleton rows={pageSize} cols={columns.length} />
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {emptyState}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* ── Desktop table ── */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Seleccionar página"
                    checked={allOnPageSelected}
                    onChange={toggleAllOnPage}
                    className="size-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
                  />
                </th>
              )}
              {columns.map((col) => {
                const sortable = !!col.sortValue;
                const isSorted = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      !col.align && "text-left",
                      col.headerClassName,
                    )}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col)}
                        className={cn(
                          "inline-flex items-center gap-1 hover:text-slate-700",
                          col.align === "right" && "flex-row-reverse",
                        )}
                      >
                        {col.header}
                        {isSorted ? (
                          sortDir === "asc" ? (
                            <ChevronUp className="size-3" />
                          ) : (
                            <ChevronDown className="size-3" />
                          )
                        ) : (
                          <ChevronsUpDown className="size-3 opacity-40" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
              {rowActions && <th className="w-px px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const id = getRowId(row);
              const selected = selectedIds.includes(id);
              return (
                <tr
                  key={id}
                  className={cn(
                    "border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/60",
                    selected && "bg-emerald-50/40",
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Seleccionar fila ${id}`}
                        checked={selected}
                        onChange={() => toggleRow(id)}
                        className="size-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-slate-700",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.cellClassName,
                      )}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3 text-right">{rowActions(row)}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="divide-y divide-slate-100 sm:hidden">
        {pageRows.map((row) => {
          const id = getRowId(row);
          const selected = selectedIds.includes(id);
          return (
            <div key={id} className={cn("p-4", selected && "bg-emerald-50/40")}>
              {(selectable || rowActions) && (
                <div className="mb-2 flex items-center justify-between">
                  {selectable ? (
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleRow(id)}
                        className="size-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
                      />
                      Seleccionar
                    </label>
                  ) : (
                    <span />
                  )}
                  {rowActions && rowActions(row)}
                </div>
              )}
              {mobileCard ? (
                mobileCard(row)
              ) : (
                <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {columns.map((col) => (
                    <div key={col.key} className={col.span && col.span >= 5 ? "col-span-2" : ""}>
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {col.header}
                      </dt>
                      <dd className="text-sm text-slate-800">
                        {col.render(row)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Footer / paginación ── */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/60 px-4 py-3">
          <p className="text-xs text-slate-500">
            {safePage * pageSize + 1}–
            {Math.min((safePage + 1) * pageSize, sorted.length)} de{" "}
            {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
              aria-label="Página anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-2 text-xs font-semibold text-slate-600 tabular-nums">
              {safePage + 1} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage === pageCount - 1}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
              aria-label="Página siguiente"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
