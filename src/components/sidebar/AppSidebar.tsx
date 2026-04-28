"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Zap, ChevronLeft } from "lucide-react";
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

const HEADER_OFFSET = "top-14"; // Match new header height
const ASIDE_H = "h-[calc(100dvh-3.5rem)]";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({
  onNavigate,
  isCollapsed = false,
  className,
}: {
  onNavigate?: () => void;
  isCollapsed?: boolean;
  className?: string;
}) {
  const pathname = usePathname() || "/";

  if (isCollapsed) {
    // Collapsed view - just icons
    return (
      <nav
        className={cn("flex flex-col items-center gap-2 px-2 py-4", className)}
        aria-label="Navegación rápida"
      >
        {APP_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex size-10 items-center justify-center rounded-lg transition-all duration-200",
                "hover:bg-accent",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={item.label}
            >
              <item.Icon className="size-5" strokeWidth={1.75} />
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  // Expanded view - full navigation
  return (
    <nav
      className={cn("flex flex-col gap-1 px-3 py-4", className)}
      aria-label="Secciones del sitio"
    >
      {GROUP_ORDER.map((group) => {
        const items = APP_NAV.filter((i) => i.group === group);
        if (items.length === 0) return null;
        return (
          <div key={group} className="flex flex-col gap-0.5">
            <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
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
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                        "hover:bg-accent/50",
                        active
                          ? "bg-accent font-medium text-foreground shadow-sm"
                          : "text-foreground/70 hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors",
                          active 
                            ? "bg-primary/10 text-primary" 
                            : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                        )}
                        aria-hidden
                      >
                        <item.Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block leading-tight">{item.label}</span>
                        {item.description && (
                          <span className="line-clamp-1 text-[11px] text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </span>
                      {active && (
                        <ChevronLeft className="size-3 shrink-0 text-primary rotate-180" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {group !== (GROUP_ORDER[GROUP_ORDER.length - 1] as NavGroupId) && (
              <Separator className="my-2 bg-border/40" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  const { open, isOpen, closeMenu, toggle } = useSidebar();

  return (
    <>
      {/* Expanded Sidebar */}
      <aside
        className={cn(
          "hidden flex-col border-r border-border/40 bg-card/95 text-foreground transition-all duration-300 ease-in-out",
          "supports-[backdrop-filter]:bg-card/80 supports-[backdrop-filter]:backdrop-blur-md",
          "lg:sticky lg:flex lg:flex-col lg:self-start",
          HEADER_OFFSET,
          ASIDE_H,
          isOpen ? "w-[272px]" : "w-[72px]"
        )}
        aria-label="Navegación lateral"
      >
        {/* Header */}
        <div className={cn(
          "shrink-0 border-b border-border/40 transition-all duration-300",
          isOpen ? "px-3 py-3" : "px-2 py-3"
        )}>
          {isOpen ? (
            <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/20 px-3 py-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <Zap className="size-3.5 fill-current" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Portal
                </p>
                <p className="truncate text-xs font-semibold text-foreground">
                  Paso Rápido
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggle}
                className="size-7 shrink-0"
                aria-label="Colapsar sidebar"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={toggle}
                className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                aria-label="Expandir sidebar"
              >
                <Zap className="size-4 fill-current" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="min-h-0 flex-1">
          <SidebarNav isCollapsed={!isOpen} />
        </ScrollArea>

        {/* Footer */}
        {isOpen && (
          <div className="shrink-0 border-t border-border/40 px-4 py-3">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Entorno de demostración. App móvil mantiene acceso en carril; web prioriza autogestión.
            </p>
          </div>
        )}
      </aside>

      {/* Mobile Sheet */}
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
          <div className="flex items-center justify-between border-b border-border/80 px-4 py-3">
            <div className="min-w-0">
              <SheetTitle className="text-left text-base font-semibold">
                Menú
              </SheetTitle>
              <SheetDescription className="text-left text-xs text-muted-foreground">
                Portal Paso Rápido
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