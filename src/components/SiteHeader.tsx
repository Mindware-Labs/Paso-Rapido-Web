"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { href: "/", label: "Inicio" },
  { href: "/peajes", label: "Red de peajes" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/recargar", label: "Recargas" },
  { href: "/ayuda", label: "Ayuda" },
] as const;

const SECONDARY = [
  { href: "/cuenta", label: "Mi cuenta" },
  { href: "/historico", label: "Historial de movimientos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/reclamaciones", label: "Reclamaciones" },
] as const;

function navLinkClass(active: boolean) {
  return cn(
    "relative rounded-md px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50",
    active &&
      "text-primary after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-primary",
  );
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-card/95 text-foreground",
        "supports-[backdrop-filter]:backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="size-5 text-foreground" />
        </Button>

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 outline-offset-4 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/40"
        >
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25"
            aria-hidden
          >
            <Zap className="size-4 fill-current" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold tracking-tight sm:text-base">
              Paso Rápido
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block">
              Portal web
            </span>
          </span>
        </Link>

        <nav
          className="ml-4 hidden flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Navegación principal"
        >
          {PRIMARY.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(active)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/cuenta"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Mi cuenta
          </Link>
          <Link
            href="/recargar"
            className={cn(
              buttonVariants({ size: "sm" }),
              "font-bold shadow-sm",
            )}
          >
            Recargar
          </Link>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-[min(100%,20rem)] gap-0 p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-border px-4 py-4 text-left">
            <SheetTitle className="font-heading text-base font-extrabold text-foreground">
              Menú
            </SheetTitle>
            <SheetDescription className="text-left text-xs">
              Accesos al portal. Colores oficiales de la app, formato web.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-1 p-2">
              <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Secciones
              </p>
              {[...PRIMARY, ...SECONDARY].map((item) => {
                const isRoot = item.href === "/";
                const active = isRoot
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/90 hover:bg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col gap-2 px-4 pb-6">
              <p className="text-xs text-muted-foreground">
                En la app móvil: pago al volante y notificaciones al instante.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/recargar"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "w-full justify-center font-bold",
                  )}
                >
                  Recargar saldo
                </Link>
                <Link
                  href="/ayuda"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-center",
                  )}
                >
                  Centro de ayuda
                </Link>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  );
}
