import Link from "next/link";
import { Zap } from "lucide-react";

const producto = [
  { href: "/dashboard/peajes", label: "Mapa y tarifas" },
  { href: "/dashboard/vehiculos", label: "Vehículos" },
  { href: "/dashboard/recargar", label: "Recargas" },
  { href: "/dashboard/historico", label: "Historial" },
] as const;

const clientes = [
  { href: "/dashboard/cuenta", label: "Mi cuenta" },
  { href: "/dashboard/metodos-pago", label: "Métodos de pago" },
  { href: "/dashboard/vinculados", label: "Vinculados" },
  { href: "/dashboard/contrasena", label: "Seguridad" },
] as const;

const atencion = [
  { href: "/dashboard/ayuda", label: "Centro de ayuda" },
  { href: "/dashboard/asistente-vial", label: "Asistencia vial" },
  { href: "/dashboard/noticias", label: "Noticias" },
  { href: "/dashboard/reclamaciones", label: "Reclamaciones" },
] as const;

const linkClass =
  "text-sm text-muted-foreground transition hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 border-b border-border/80 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span
                className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
                aria-hidden
              >
                <Zap className="size-4 fill-current" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                Paso Rápido
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Identidad cromática de la app móvil, con una presentación web
              pensada para oficina y consulta, no para el tablero compacto del
              teléfono.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Producto
            </p>
            <ul className="flex flex-col gap-2">
              {producto.map((i) => (
                <li key={i.href}>
                  <Link className={linkClass} href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Cuenta
            </p>
            <ul className="flex flex-col gap-2">
              {clientes.map((i) => (
                <li key={i.href}>
                  <Link className={linkClass} href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Atención
            </p>
            <ul className="flex flex-col gap-2">
              {atencion.map((i) => (
                <li key={i.href}>
                  <Link className={linkClass} href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Paso Rápido. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
