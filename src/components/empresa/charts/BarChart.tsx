import { cn } from "@/lib/utils";

export interface BarDatum {
  label: string;
  value: number;
}

/** Barras horizontales con valor formateado. Dependency-free (CSS). */
export function BarChart({
  data,
  formatValue = (v) => String(v),
  className,
  barClassName = "bg-emerald-500",
}: {
  data: BarDatum[];
  formatValue?: (v: number) => string;
  className?: string;
  barClassName?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-xs font-medium text-slate-600">
            {d.label}
          </span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-md transition-[width] duration-500",
                barClassName,
              )}
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="w-24 shrink-0 text-right font-mono text-xs font-bold tabular-nums text-slate-900">
            {formatValue(d.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
