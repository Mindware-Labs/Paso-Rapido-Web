"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Zap } from "lucide-react";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/peajes", label: "Peajes" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/recargar", label: "Recargar" },
  { href: "/ayuda", label: "Ayuda" },
  { href: "/cuenta", label: "Mi perfil" },
] as const;

export function SiteHeader() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-pr-hero text-pr-on-hero shadow-md shadow-pr-hero/20">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-md outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <Zap
              className="h-4 w-4 fill-pr-on-hero text-pr-on-hero"
              aria-hidden
            />
          </span>
          <span className="truncate text-sm font-extrabold tracking-tight sm:text-base">
            Paso Rápido
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Principal"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="hidden rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/90 sm:inline"
            title="Vista web — diseño; sin conexión a tu cuenta"
          >
            Web
          </span>
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 lg:hidden"
            aria-hidden
          >
            <Menu className="h-5 w-5 opacity-50" />
          </span>
          <button
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
            aria-label="Notificaciones (próximamente)"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-300 ring-2 ring-pr-hero" />
          </button>
        </div>
      </div>

      <nav
        className="flex flex-wrap items-center justify-center gap-1 border-t border-white/10 px-2 py-2 lg:hidden"
        aria-label="Secundario móvil"
      >
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                active
                  ? "bg-white/15"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
