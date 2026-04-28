"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Zap } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { APP_NAV, GROUP_ORDER, groupLabel } from "@/config/navigation";

const HEADER_OFFSET = "top-14";
const ASIDE_H = "h-[calc(100dvh-3.5rem)]";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
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

  return (
    <nav
      className={cn(
        "flex flex-col py-3",
        isCollapsed ? "items-center gap-1 px-2" : "gap-5 px-3",
        className,
      )}
      aria-label="Navegación principal"
    >
      {GROUP_ORDER.map((group) => {
        const items = APP_NAV.filter((i) => i.group === group);
        if (items.length === 0) return null;

        return (
          <div
            key={group}
            className={cn("flex flex-col", isCollapsed ? "gap-1" : "gap-0.5")}
          >
            {!isCollapsed && (
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/50 select-none">
                {groupLabel(group)}
              </p>
            )}

            {isCollapsed && (
              <span
                className="mx-auto my-1.5 block h-px w-5 rounded-full bg-border/70"
                aria-hidden
              />
            )}

            {items.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "group relative flex items-center rounded-md text-[13px] font-medium transition-colors duration-150",
                    isCollapsed ? "size-9 justify-center" : "h-9 gap-2.5 px-2",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.75 rounded-r-full bg-primary"
                      aria-hidden
                    />
                  )}

                  <item.Icon
                    className={cn(
                      "shrink-0",
                      isCollapsed ? "size-4.5" : "size-4",
                    )}
                    strokeWidth={active ? 2 : 1.75}
                    aria-hidden
                  />

                  {!isCollapsed && (
                    <span className="leading-none truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  const { open, isOpen, closeMenu } = useSidebar();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden flex-col border-r border-border/50 bg-white text-foreground",
          "transition-[width] duration-200 ease-in-out",
          "lg:sticky lg:flex lg:self-start",
          HEADER_OFFSET,
          ASIDE_H,
          isOpen ? "w-55" : "w-13",
        )}
        aria-label="Navegación lateral"
      >
        <ScrollArea className="min-h-0 flex-1 pt-2">
          <SidebarNav isCollapsed={!isOpen} />
        </ScrollArea>
      </aside>

      {/* Mobile sheet */}
      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (!next) closeMenu();
        }}
      >
        <SheetContent
          side="left"
          className="flex w-[min(100%-2rem,18rem)] flex-col gap-0 p-0 sm:max-w-xs"
          showCloseButton={false}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded bg-primary shadow-sm">
                <Zap
                  className="size-3.5 fill-primary-foreground text-primary-foreground"
                  aria-hidden
                />
              </span>
              <SheetTitle className="text-[13px] font-semibold tracking-tight">
                Paso Rápido
              </SheetTitle>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={closeMenu}
              className="text-muted-foreground"
              aria-label="Cerrar menú"
            >
              <X className="size-4" />
            </Button>
          </div>

          <SheetDescription className="sr-only">
            Menú de navegación principal
          </SheetDescription>

          <ScrollArea className="min-h-0 flex-1 pt-2">
            <SidebarNav onNavigate={closeMenu} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
