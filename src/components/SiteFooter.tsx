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
  { href: "/dashboard/seguridad", label: "Seguridad" },
] as const;

const atencion = [
  { href: "/dashboard/ayuda", label: "Centro de ayuda" },
  { href: "/dashboard/asistente-vial", label: "Asistencia vial" },
  { href: "/dashboard/noticias", label: "Noticias" },
  { href: "/dashboard/reclamaciones", label: "Reclamaciones" },
] as const;

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-card/95 text-foreground supports-[backdrop-filter]:bg-card/80 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-border/40 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span
                className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm group-hover:bg-primary/90 transition-colors"
                aria-hidden
              >
                <Zap className="size-4 fill-current" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                Paso Rápido
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Sistema de telepeaje inteligente para República Dominicana. 
              Gestiona tus dispositivos, recargas y movimientos desde un solo lugar.
            </p>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Paso Rápido. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/privacidad" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link href="/dashboard/terminos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Términos
            </Link>
            <Link href="/dashboard/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}