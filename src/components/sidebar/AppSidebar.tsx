"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Zap } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  APP_NAV,
  GROUP_ORDER,
  groupLabel,
  type NavGroupId,
} from "@/config/navigation";

const HEADER_OFFSET = "top-16";
const ASIDE_H = "h-[calc(100dvh-4rem)]";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname() || "/";

  return (
    <nav
      className={cn("flex flex-col gap-1 px-3 py-3", className)}
      aria-label="Secciones del sitio"
    >
      {GROUP_ORDER.map((group) => {
        const items = APP_NAV.filter((i) => i.group === group);
        if (items.length === 0) return null;
        return (
          <div key={group} className="flex flex-col gap-0.5">
            <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {groupLabel(group)}
            </p>
            <ul className="flex flex-col gap-0.5">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex min-h-9 items-center gap-2.5 rounded-md border-l-2 border-transparent py-1.5 pl-2 pr-2 text-sm transition-colors",
                        "hover:border-border hover:bg-muted/50",
                        active
                          ? "border-primary bg-primary/[0.07] font-medium text-foreground"
                          : "text-foreground/80",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card text-muted-foreground transition-colors",
                          "group-hover:border-border group-hover:text-foreground",
                          active && "border-primary/25 bg-primary/5 text-primary",
                        )}
                        aria-hidden
                      >
                        <item.Icon className="size-3.5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block leading-snug">{item.label}</span>
                        {item.description && (
                          <span className="line-clamp-1 text-[11px] font-normal text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {group !== (GROUP_ORDER[GROUP_ORDER.length - 1] as NavGroupId) && (
              <Separator className="my-2 bg-border/60" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Navegación lateral estilo producto web (blanco, secciones, iconos en contenedor),
 * no el panel tipo app con saldo / avatar.
 */
export function AppSidebar() {
  const { open, closeMenu } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          "hidden w-[272px] shrink-0 flex-col border-r border-border/80 bg-card text-foreground",
          "lg:sticky lg:flex lg:flex-col lg:self-start",
          HEADER_OFFSET,
          ASIDE_H,
        )}
        aria-label="Navegación lateral"
      >
        <div className="shrink-0 border-b border-border/60 px-3 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="size-4 fill-current" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Navegación
              </p>
              <p className="truncate text-xs font-semibold text-foreground">
                Portal Paso Rápido
              </p>
            </div>
          </div>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <SidebarNav />
        </ScrollArea>
        <div className="shrink-0 border-t border-border/60 px-3 py-2">
          <p className="px-1 text-[10px] leading-relaxed text-muted-foreground">
            Entorno de demostración. La app móvil mantiene el acceso en carril;
            el web prioriza documentación y autogestión.
          </p>
        </div>
      </aside>

      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (!next) closeMenu();
        }}
      >
        <SheetContent
          side="left"
          className="flex w-[min(100%-1rem,20rem)] max-w-[min(100%-1rem,20rem)] flex-col gap-0 p-0 sm:max-w-sm"
          showCloseButton={false}
        >
          <div className="flex items-center justify-between border-b border-border/80 px-3 py-2.5">
            <div className="min-w-0">
              <SheetTitle className="text-left text-base font-semibold text-foreground">
                Menú
              </SheetTitle>
              <SheetDescription className="text-left text-xs text-muted-foreground">
                Contenido alineado con la app; diseño de panel web.
              </SheetDescription>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={closeMenu}
              className="shrink-0"
              aria-label="Cerrar menú"
            >
              <X className="size-4" />
            </Button>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <SidebarNav onNavigate={closeMenu} className="py-2" />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
