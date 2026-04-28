"use client";

import Link from "next/link";
import { Banknote, ChevronRight, ShieldCheck, Wallet } from "lucide-react";

const AMOUNTS = ["RD$ 200", "RD$ 500", "RD$ 1,000", "Otro monto"] as const;

export default function RecargarPage() {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
            Recargar
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-pr-foreground/80">
            En la app, &quot;Desliza para recargar&quot; abre el flujo de pago. En
            web mostramos montos, método y seguridad con más aire, sin
            integración de pasarela (solo diseño).
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="space-y-4 rounded-2xl border border-pr-border bg-pr-card p-5 shadow-sm lg:col-span-3">
            <div className="flex items-center gap-2 text-pr-hero">
              <Wallet className="h-5 w-5" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-pr-foreground">
                Elegir monto
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className="rounded-xl border border-pr-border bg-pr-bg px-3 py-3 text-sm font-extrabold text-pr-foreground transition hover:border-pr-hero/50 hover:bg-pr-secondary/80"
                >
                  {a}
                </button>
              ))}
            </div>
            <p className="text-xs text-pr-muted-fg">
              Botones inertes. Al conectar backend, se enlazan a la misma
              lógica que móvil.
            </p>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-pr-hero py-3.5 text-sm font-extrabold text-pr-on-hero shadow-lg shadow-pr-hero/25"
            >
              Continuar
              <ChevronRight className="h-4 w-4" />
            </button>
          </section>

          <aside className="space-y-3 rounded-2xl border border-pr-border bg-pr-card p-5 lg:col-span-2">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 shrink-0 text-pr-hero" />
              <div>
                <p className="text-sm font-extrabold text-pr-foreground">
                  Pago seguro
                </p>
                <p className="mt-1 text-xs leading-relaxed text-pr-foreground/80">
                  Texto de apoyo: PCI, 3D Secure, y recibo por correo — mismo
                  tono institucional que en la app, extendido.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 border-t border-pr-border/60 pt-3">
              <Banknote className="h-5 w-5 shrink-0 text-pr-hero" />
              <div>
                <p className="text-sm font-extrabold text-pr-foreground">
                  Métodos
                </p>
                <p className="mt-1 text-xs text-pr-foreground/80">
                  Tarjeta, transferencia y billeteras: lista editable aquí
                  mientras móvil prioriza un floco corto.
                </p>
              </div>
            </div>
            <p className="pt-1 text-center text-xs">
              <Link
                className="font-bold text-pr-hero hover:underline"
                href="/dashboard/ayuda"
              >
                Dudas frecuentes
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
