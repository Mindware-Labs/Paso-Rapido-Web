import Link from "next/link";

const producto = [
  { href: "/peajes", label: "Red de peajes" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/recargar", label: "Recargar" },
  { href: "/historico", label: "Historial" },
] as const;

const cuenta = [
  { href: "/cuenta", label: "Perfil" },
  { href: "/metodos-pago", label: "Métodos de pago" },
  { href: "/vinculados", label: "Vinculados" },
  { href: "/contrasena", label: "Contraseña" },
  { href: "/notificaciones", label: "Notificaciones" },
] as const;

const soporte = [
  { href: "/ayuda", label: "Centro de ayuda" },
  { href: "/asistente-vial", label: "Asistencia vial" },
  { href: "/noticias", label: "Noticias" },
  { href: "/reclamaciones", label: "Reclamaciones" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-pr-border/60 bg-pr-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm font-extrabold text-pr-foreground">
              Paso Rápido
            </p>
            <p className="text-sm leading-relaxed text-pr-muted-fg">
              Tu peaje y TAG en un solo lugar. Misma jerarquía de la app: menú
              lateral, secciones y peajes con mapa en web.
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pr-foreground/70">
              Producto
            </p>
            <ul className="space-y-1.5 text-sm">
              {producto.map((i) => (
                <li key={i.href}>
                  <Link
                    className="text-pr-hero hover:underline"
                    href={i.href}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pr-foreground/70">
              Cuenta
            </p>
            <ul className="space-y-1.5 text-sm">
              {cuenta.map((i) => (
                <li key={i.href}>
                  <Link
                    className="text-pr-hero hover:underline"
                    href={i.href}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pr-foreground/70">
              Soporte
            </p>
            <ul className="space-y-1.5 text-sm">
              {soporte.map((i) => (
                <li key={i.href}>
                  <Link
                    className="text-pr-hero hover:underline"
                    href={i.href}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-pr-border/50 pt-6 text-center text-xs text-pr-muted-fg">
          © {new Date().getFullYear()} Paso Rápido. Demostración — sin backend.
        </p>
      </div>
    </footer>
  );
}
