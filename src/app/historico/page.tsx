"use client";

import { History, TrendingDown, TrendingUp } from "lucide-react";

const ROWS = [
  { t: "Peaje Las Américas", d: "12 abr 2026 · 08:42", a: "RD$ -100.00", out: true },
  { t: "Recarga Superpagos", d: "11 abr 2026 · 16:10", a: "RD$ +500.00", out: false },
  { t: "Peaje La Victoria", d: "8 abr 2026 · 07:15", a: "RD$ -100.00", out: true },
  { t: "Peaje Sambil", d: "5 abr 2026 · 19:30", a: "RD$ -100.00", out: true },
] as const;

export default function HistoricoPage() {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
              Historial
            </h1>
            <p className="text-sm text-pr-foreground/80">
              Misma lógica que <strong className="text-pr-foreground">Movimientos / Histórico</strong> en
              la app, con columna de detalle y espacio para filtros y exportar.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pr-border bg-pr-card px-3 py-1.5 text-xs font-bold text-pr-muted-fg">
            <History className="h-3.5 w-3.5" />
            Demo
          </span>
        </header>

        <ul className="space-y-2">
          {ROWS.map((r) => (
            <li
              key={r.t + r.d}
              className="flex items-center gap-3 rounded-2xl border border-pr-border bg-pr-card px-4 py-3"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  r.out ? "bg-red-500/10" : "bg-pr-secondary"
                }`}
              >
                {r.out ? (
                  <TrendingDown
                    className="h-4 w-4 text-pr-destructive"
                    strokeWidth={2.5}
                  />
                ) : (
                  <TrendingUp
                    className="h-4 w-4 text-pr-hero"
                    strokeWidth={2.5}
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-pr-foreground">{r.t}</p>
                <p className="text-xs text-pr-muted-fg">{r.d}</p>
              </div>
              <p
                className={`text-sm font-extrabold ${
                  r.out ? "text-pr-destructive" : "text-pr-hero"
                }`}
              >
                {r.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
