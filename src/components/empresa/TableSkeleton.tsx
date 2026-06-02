export function TableSkeleton({
  rows = 6,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="animate-pulse" aria-hidden>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-0"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-3.5 rounded bg-slate-100"
              style={{ width: `${60 + ((r + c) % 4) * 10}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
