"use client";

import { Bell, KeyRound, Link2, User } from "lucide-react";

const GROUPS = [
  {
    title: "Cuenta",
    items: [
      { label: "Datos personales", sub: "Nombre, correo, documento" },
      { label: "Notificaciones", sub: "Push, correo, SMS" },
    ],
  },
  {
    title: "Seguridad",
    items: [
      { label: "Contraseña y acceso", sub: "2FA, sesiones" },
      { label: "Cuentas vinculadas", sub: "Peajes, bancos" },
    ],
  },
] as const;

export default function CuentaPage() {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
              Mi perfil
            </h1>
            <p className="max-w-2xl text-sm text-pr-foreground/80">
              Layout tipo &quot;configuración Apple/Google&quot; pero con colores
              Paso Rápido. Cada renglón corresponde a una pantalla oculta de la
              app móvil (métodos de pago, contraseña, vinculados, etc.).
            </p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center self-start rounded-3xl bg-pr-hero text-pr-on-hero shadow-lg shadow-pr-hero/20 sm:self-center">
            <User className="h-10 w-10" strokeWidth={1.25} />
          </div>
        </div>

        <div className="space-y-6">
          {GROUPS.map((g) => (
            <section key={g.title} className="space-y-2">
              <h2 className="px-0.5 text-xs font-extrabold uppercase tracking-wider text-pr-foreground/60">
                {g.title}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-pr-border bg-pr-card">
                {g.items.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    className="flex w-full items-center gap-3 border-b border-pr-border/70 px-4 py-3.5 text-left last:border-0 hover:bg-pr-secondary/30 sm:px-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pr-secondary text-pr-hero">
                      {item.label.includes("Notific") ? (
                        <Bell className="h-4 w-4" />
                      ) : item.label.includes("Seguridad") ||
                        item.label.includes("Contraseña") ? (
                        <KeyRound className="h-4 w-4" />
                      ) : item.label.includes("vinculad") ? (
                        <Link2 className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold text-pr-foreground">
                        {item.label}
                      </span>
                      <span className="block text-xs text-pr-muted-fg">
                        {item.sub}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="text-center text-xs text-pr-muted-fg">
          Botones deshabilitados en esta versión; solo estructura visual.
        </p>
      </div>
    </div>
  );
}
