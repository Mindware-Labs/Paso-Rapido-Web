"use client";

import { CarFront, FileText, Tag } from "lucide-react";

const ROWS = [
  {
    placa: "A123456",
    modelo: "Sedán 2019",
    tag: "Activo",
  },
  {
    placa: "G789012",
    modelo: "SUV 2021",
    tag: "Pendiente",
  },
];

export default function VehiculosPage() {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
              Mis vehículos
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-pr-foreground/80">
              La app lista placas, detalle y flujo para agregar otro. En la web
              puedes presentar la misma información con tablas, copys de
              política y educación (sin APIs todavía).
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-pr-border bg-pr-card px-3 py-2 text-xs font-bold text-pr-muted-fg">
            <CarFront className="h-4 w-4 text-pr-hero" />
            Vista extendida
          </div>
        </header>

        <div className="overflow-hidden rounded-2xl border border-pr-border bg-pr-card shadow-sm">
          <div className="grid grid-cols-12 gap-2 border-b border-pr-border/80 bg-pr-secondary/50 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-pr-foreground/70 sm:px-5">
            <div className="col-span-4 sm:col-span-3">Placa</div>
            <div className="col-span-5 sm:col-span-4">Vehículo</div>
            <div className="col-span-3 sm:col-span-3">TAG</div>
            <div className="col-span-12 hidden text-right sm:col-span-2 sm:block sm:text-left">
              Notas
            </div>
          </div>
          {ROWS.map((r) => (
            <div
              key={r.placa}
              className="grid grid-cols-12 items-center gap-2 border-b border-pr-border/60 px-4 py-3 last:border-0 sm:px-5"
            >
              <div className="col-span-4 sm:col-span-3">
                <span className="font-mono text-sm font-bold text-pr-foreground">
                  {r.placa}
                </span>
              </div>
              <div className="col-span-5 sm:col-span-4 text-sm text-pr-foreground/90">
                {r.modelo}
              </div>
              <div className="col-span-3 sm:col-span-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                    r.tag === "Activo"
                      ? "bg-pr-secondary text-pr-hero"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {r.tag}
                </span>
              </div>
              <div className="col-span-12 pl-0 text-xs text-pr-muted-fg sm:col-span-2 sm:pl-0">
                Datos de prueba; en app es la misma semántica.
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-pr-border bg-pr-card p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-pr-hero" />
            <div>
              <h2 className="text-base font-extrabold text-pr-foreground">
                Documentos y pólizas
              </h2>
              <p className="mt-1 text-sm text-pr-foreground/80">
                Zona de contenido fijo: en móvil suele ir bajo
                &quot;Detalle&quot;; aquí puedes añadir PDF, enlaces a DIGESETT
                o términos, sin afectar el layout de la app.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
