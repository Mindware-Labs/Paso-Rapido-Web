"use client";

export interface LinePoint {
  label: string;
  value: number;
}

/** Gráfica de área/línea SVG responsive (sin dependencias). */
export function LineChart({
  data,
  formatValue = (v) => String(v),
  height = 200,
}: {
  data: LinePoint[];
  formatValue?: (v: number) => string;
  height?: number;
}) {
  const W = 600;
  const H = height;
  const padX = 8;
  const padY = 16;
  const max = Math.max(1, ...data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const range = max - min || 1;

  const n = data.length;
  const x = (i: number) =>
    padX + (i * (W - padX * 2)) / Math.max(1, n - 1);
  const y = (v: number) =>
    padY + (H - padY * 2) * (1 - (v - min) / range);

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.value)}`)
    .join(" ");
  const areaPath =
    `${linePath} L ${x(n - 1)} ${H - padY} L ${x(0)} ${H - padY} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Tendencia de gasto"
      >
        <defs>
          <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={padY + (H - padY * 2) * g}
            y2={padY + (H - padY * 2) * g}
            stroke="rgb(226 232 240)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        <path d={areaPath} fill="url(#lc-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="rgb(5 150 105)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={x(i)}
            cy={y(d.value)}
            r={3}
            fill="white"
            stroke="rgb(5 150 105)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-medium text-slate-400">
              {d.label}
            </span>
            <span className="font-mono text-[11px] font-bold tabular-nums text-slate-700">
              {formatValue(d.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
