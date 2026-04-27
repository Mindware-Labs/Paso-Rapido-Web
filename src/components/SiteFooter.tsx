import Link from "next/link";

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
              Tu peaje y TAG en un solo lugar. Recarga, consulta y planifica
              con la misma experiencia que en la app móvil, ampliada para web.
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pr-foreground/70">
              Producto
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  className="text-pr-hero hover:underline"
                  href="/peajes"
                >
                  Red de peajes
                </Link>
              </li>
              <li>
                <Link
                  className="text-pr-hero hover:underline"
                  href="/vehiculos"
                >
                  Vehículos
                </Link>
              </li>
              <li>
                <Link
                  className="text-pr-hero hover:underline"
                  href="/recargar"
                >
                  Recargar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pr-foreground/70">
              Ayuda
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link className="text-pr-hero hover:underline" href="/ayuda">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <span className="text-pr-muted-fg">
                  Asistente vial: disponible en la app
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-pr-foreground/70">
              Cuenta
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  className="text-pr-hero hover:underline"
                  href="/cuenta"
                >
                  Perfil
                </Link>
              </li>
              <li>
                <span className="text-pr-muted-fg">Histórico y noticias: app</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-pr-border/50 pt-6 text-center text-xs text-pr-muted-fg">
          © {new Date().getFullYear()} Paso Rápido. Sitio de demostración — sin
          backend. Descarga la app móvil para operaciones reales.
        </p>
      </div>
    </footer>
  );
}
