export interface DonutSlice {
  label: string;
  value: number;
  color: string; // CSS color
}

/** Dona SVG con leyenda. Sin dependencias. */
export function DonutChart({
  data,
  formatValue = (v) => String(v),
}: {
  data: DonutSlice[];
  formatValue?: (v: number) => string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const R = 60;
  const C = 2 * Math.PI * R;
  // Offset acumulado por segmento, sin mutar variables durante el render.
  const offsets = data.map((_, i) =>
    data.slice(0, i).reduce((s, d) => s + (d.value / total) * C, 0),
  );

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <svg
        viewBox="0 0 160 160"
        className="size-40 shrink-0 -rotate-90"
        role="img"
        aria-label="Distribución por categoría"
      >
        <circle
          cx={80}
          cy={80}
          r={R}
          fill="none"
          stroke="rgb(241 245 249)"
          strokeWidth={20}
        />
        {data.map((d, i) => {
          const len = (d.value / total) * C;
          return (
            <circle
              key={d.label}
              cx={80}
              cy={80}
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth={20}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offsets[i]}
            />
          );
        })}
      </svg>

      <ul className="flex w-full flex-col gap-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span className="flex-1 truncate text-slate-600">{d.label}</span>
            <span className="font-mono text-xs font-bold tabular-nums text-slate-900">
              {formatValue(d.value)}
            </span>
            <span className="w-10 text-right text-xs font-medium text-slate-400 tabular-nums">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
