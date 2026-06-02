import type { ReactNode } from "react";
import type { TagStatus, TransactionStatus } from "@/types/empresa";
import { cn } from "@/lib/utils";

/** Encabezado institucional reutilizado por las páginas de la sección. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-3">{actions}</div>
      )}
    </header>
  );
}

const TAG_STATUS: Record<TagStatus, { badge: string; dot: string; label: string }> =
  {
    activo: {
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      dot: "bg-emerald-500",
      label: "Activo",
    },
    bajo_balance: {
      badge: "bg-amber-50 text-amber-700 ring-amber-200",
      dot: "bg-amber-500",
      label: "Bajo balance",
    },
    congelado: {
      badge: "bg-slate-100 text-slate-600 ring-slate-200",
      dot: "bg-slate-400",
      label: "Congelado",
    },
  };

export function TagStatusBadge({ status }: { status: TagStatus }) {
  const c = TAG_STATUS[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
        c.badge,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}

const TX_STATUS: Record<TransactionStatus, string> = {
  Procesado: "bg-emerald-50 text-emerald-700 ring-emerald-200/50",
  Aprobado: "bg-emerald-50 text-emerald-700 ring-emerald-200/50",
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-200/50",
  Rechazado: "bg-rose-50 text-rose-700 ring-rose-200/50",
};

export function TransactionStatusBadge({
  status,
}: {
  status: TransactionStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
        TX_STATUS[status],
      )}
    >
      {status}
    </span>
  );
}

/** Etiqueta "Datos de demostración", coherente con `PlaceholderScreen`. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-amber-500" />
      Datos de demostración
    </span>
  );
}
