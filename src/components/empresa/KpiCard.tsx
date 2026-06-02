import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "emerald" | "blue" | "violet" | "amber" | "slate" | "rose";

const TONE: Record<Tone, { bg: string; icon: string; border: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "border-emerald-100",
  },
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    border: "border-violet-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "border-amber-100",
  },
  slate: {
    bg: "bg-slate-100",
    icon: "text-slate-600",
    border: "border-slate-200",
  },
  rose: { bg: "bg-rose-50", icon: "text-rose-600", border: "border-rose-100" },
};

export interface KpiCardProps {
  label: string;
  value: string;
  Icon: LucideIcon;
  tone?: Tone;
  /** Variación porcentual respecto al periodo previo (ej. 12.4 ó -3.1). */
  delta?: number;
  hint?: string;
}

export function KpiCard({
  label,
  value,
  Icon,
  tone = "slate",
  delta,
  hint,
}: KpiCardProps) {
  const c = TONE[tone];
  const positive = (delta ?? 0) >= 0;

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
          c.bg,
          c.border,
        )}
      >
        <Icon className={cn("h-6 w-6", c.icon)} strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 truncate font-mono text-xl font-bold tabular-nums tracking-tight text-slate-900">
          {value}
        </p>
        <div className="mt-1 flex items-center gap-2">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[11px] font-bold",
                positive ? "text-emerald-600" : "text-rose-600",
              )}
            >
              {positive ? (
                <ArrowUpRight className="size-3" />
              ) : (
                <ArrowDownRight className="size-3" />
              )}
              {Math.abs(delta).toFixed(1)}%
            </span>
          )}
          {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
        </div>
      </div>
    </div>
  );
}
