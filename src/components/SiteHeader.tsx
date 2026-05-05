"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap, Bell, PanelLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  // Extraemos toggle e isOpen del SidebarContext
  const { openMenu, toggle, isOpen } = useSidebar();
  const { userData } = useAuth();
  const initials = userData
    ? [userData.primerNombre?.[0] ?? "", userData.segundoNombre?.[0] ?? ""]
        .filter(Boolean)
        .join("")
        .toUpperCase() || userData.primerNombre.slice(0, 2).toUpperCase()
    : "?";

  const isRecargarActive =
    pathname === "/dashboard/recargar" ||
    pathname.startsWith("/dashboard/recargar/");

  return (
    <header className="sticky top-0 z-50 h-14 shrink-0 border-b border-border/50 bg-white">
      <div className="flex h-full items-center gap-3 px-4">
        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={openMenu}
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-lg",
            "text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            "lg:hidden",
          )}
          aria-label="Abrir menú"
        >
          <Menu className="size-4" />
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-1 py-1 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary shadow-sm">
            <Zap className="size-3.5 fill-primary-foreground text-primary-foreground" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Paso Rápido
          </span>
        </Link>

        {/* Desktop: Toggle Sidebar */}
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "hidden lg:inline-flex size-8 shrink-0 items-center justify-center rounded-lg",
            "text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          )}
          aria-label={isOpen ? "Colapsar menú" : "Expandir menú"}
        >
          <PanelLeft className="size-4" />
        </button>

        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Recargar CTA */}
          <Link
            href="/dashboard/recargar"
            className={cn(
              buttonVariants({
                variant: isRecargarActive ? "secondary" : "default",
                size: "sm",
              }),
              "hidden h-8 px-4 text-xs font-semibold shadow-sm md:inline-flex",
            )}
          >
            Recargar
          </Link>

          <div className="hidden h-5 w-px bg-border/50 md:block" />

          {/* Notifications */}
          <button
            type="button"
            className={cn(
              "relative inline-flex size-8 items-center justify-center rounded-lg",
              "text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            )}
            aria-label="Notificaciones"
          >
            <Bell className="size-4" />
            <span className="absolute right-1.5 top-1.5 flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
          </button>

          {/* Avatar / profile */}
          <Link
            href="/dashboard/cuenta"
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg border border-border/60",
              "bg-muted text-xs font-bold text-foreground",
              "hover:bg-accent hover:border-border transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            )}
            aria-label="Mi perfil"
          >
            {initials}
          </Link>
        </div>
      </div>
    </header>
  );
}
