"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number;
}

function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const escape = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const head = columns.map((c) => escape(c.header)).join(",");
  const body = rows
    .map((r) => columns.map((c) => escape(c.value(r))).join(","))
    .join("\n");
  return `${head}\n${body}`;
}

export function ExportButton<T>({
  rows,
  columns,
  filename = "export.csv",
  label = "Exportar CSV",
  className,
  disabled,
}: {
  rows: T[];
  columns: CsvColumn<T>[];
  filename?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const handleExport = () => {
    const csv = toCsv(rows, columns);
    // BOM para que Excel respete acentos en es-DO.
    const blob = new Blob([`﻿${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={disabled || rows.length === 0}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100",
        className,
      )}
    >
      <Download className="h-4.5 w-4.5 text-slate-500" />
      {label}
    </button>
  );
}
