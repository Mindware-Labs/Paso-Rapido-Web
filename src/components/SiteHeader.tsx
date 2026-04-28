"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelLeftClose, PanelLeft, Zap, Bell, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { HEADER_QUICK } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const { openMenu, isOpen, toggle } = useSidebar();

  const USER = {
  name: "Carlos Martínez",
  plan: "Cuenta Personal",
  tag: "TAG-4892",
  tagActive: true,
  avatar: "CM",
};

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-14 shrink-0 border-b border-border/40 bg-background/95",
        "supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur-md",
        "transition-all duration-300"
      )}
    >
      <div className="flex h-full items-center gap-3 px-4">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={openMenu}
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
            "text-muted-foreground hover:bg-accent hover:text-foreground",
            "transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            "lg:hidden"
          )}
          aria-label="Abrir menú"
        >
          <Menu className="size-5" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "hidden size-9 shrink-0 items-center justify-center rounded-lg",
            "text-muted-foreground hover:bg-accent hover:text-foreground",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            "lg:inline-flex"
          )}
          aria-label={isOpen ? "Colapsar sidebar" : "Expandir sidebar"}
        >
          {isOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeft className="size-4" />
          )}
        </button>

        {/* Brand - minimal */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 rounded-lg px-1 py-1",
            "hover:opacity-80 transition-opacity",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          )}
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary shadow-sm">
            <Zap className="size-3.5 fill-primary-foreground text-primary-foreground" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Paso Rápido
          </span>
        </Link>

        {/* Center spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Quick action buttons */}
          {HEADER_QUICK.map((q) => {
            const active =
              q.href === "/"
                ? pathname === "/"
                : pathname === q.href || pathname.startsWith(`${q.href}/`);
            return (
              <Link
                key={q.href}
                href={q.href}
                className={cn(
                  buttonVariants({ 
                    variant: q.href === "/recargar" ? "default" : "ghost", 
                    size: "sm" 
                  }),
                  "hidden h-8 md:inline-flex text-xs font-medium",
                  q.href === "/recargar" && "shadow-sm px-4",
                  active && q.href !== "/recargar" && "bg-accent text-accent-foreground"
                )}
              >
                {q.label}
              </Link>
            );
          })}

          {/* Separator */}
          <div className="hidden h-6 w-px bg-border/60 md:block" />

          {/* Notifications */}
          <button
            type="button"
            className={cn(
              "relative inline-flex size-8 items-center justify-center rounded-lg",
              "text-muted-foreground hover:bg-accent hover:text-foreground",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            )}
            aria-label="Notificaciones"
          >
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
          </button>

          {/* User menu */}
             <div className="flex items-center gap-2">
           
            <Link
              href="/dashboard/cuenta"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 shadow-sm transition hover:border-gray-300"
              aria-label="Mi perfil"
            >
              {USER.avatar}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}