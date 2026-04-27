import Link from "next/link";
import { Zap } from "lucide-react";

const producto = [
  { href: "/peajes", label: "Mapa y tarifas" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/recargar", label: "Recargas" },
  { href: "/historico", label: "Historial" },
] as const;

const clientes = [
  { href: "/cuenta", label: "Mi cuenta" },
  { href: "/metodos-pago", label: "Métodos de pago" },
  { href: "/vinculados", label: "Vinculados" },
  { href: "/contrasena", label: "Seguridad" },
] as const;

const atencion = [
  { href: "/ayuda", label: "Centro de ayuda" },
  { href: "/asistente-vial", label: "Asistencia vial" },
  { href: "/noticias", label: "Noticias" },
  { href: "/reclamaciones", label: "Reclamaciones" },
] as const;

const linkClass =
  "text-sm text-primary-foreground/80 transition hover:text-primary-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-primary/20 bg-pr-ink text-primary-foreground/85">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 border-b border-primary-foreground/10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <div className="flex items-center gap-2 text-primary-foreground">
              <span
                className="flex size-8 items-center justify-center rounded-md bg-primary"
                aria-hidden
              >
                <Zap className="size-4 fill-primary-foreground text-primary-foreground" />
              </span>
              <span className="font-heading text-base font-bold tracking-tight">
                Paso Rápido
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Misma gama cromática que la app: verde bosque y apoyos neutros. El
              portal prioriza mapa, lectura e institucional; la app, operación
              inmediata en vía.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-primary-foreground/50">
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
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-primary-foreground/50">
              Clientes
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
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-primary-foreground/50">
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
        <p className="pt-8 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Paso Rápido. Contenido de demostración —
          sin conexión a producción.
        </p>
      </div>
    </footer>
  );
}
