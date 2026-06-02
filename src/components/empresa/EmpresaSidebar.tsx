"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  Building2,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeftRight,
} from "lucide-react";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { useAccount } from "@/context/AccountContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  EMPRESA_NAV,
  EMPRESA_GROUP_ORDER,
  empresaGroupLabel,
} from "@/config/empresaNavigation";

const HEADER_OFFSET = "top-14";
const ASIDE_H = "h-[calc(100dvh-3.5rem)]";

function isActive(pathname: string, href: string) {
  // Las entradas con hash (#usuarios) no marcan activo por ruta.
  if (href.includes("#")) return false;
  if (href === "/empresa") return pathname === "/empresa";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function EmpresaNav({
  onNavigate,
  isCollapsed = false,
}: {
  onNavigate?: () => void;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname() || "/empresa";

  return (
    <nav
      className={cn(
        "flex flex-col py-2",
        isCollapsed ? "items-center gap-0.5 px-2" : "gap-1 px-3",
      )}
      aria-label="Navegación empresarial"
    >
      {EMPRESA_GROUP_ORDER.map((group, groupIdx) => {
        const items = EMPRESA_NAV.filter((i) => i.group === group);
        if (items.length === 0) return null;

        return (
          <div key={group} className="flex flex-col gap-0.5">
            {groupIdx > 0 && !isCollapsed && (
              <div className="my-2 h-px w-full bg-border/50" aria-hidden />
            )}
            {groupIdx > 0 && isCollapsed && (
              <span
                className="mx-auto my-2 block h-px w-5 rounded-full bg-border/60"
                aria-hidden
              />
            )}

            {!isCollapsed && (
              <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50 select-none">
                {empresaGroupLabel(group)}
              </p>
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
                    "group relative flex items-center rounded-lg text-[13px] font-medium",
                    "transition-all duration-150 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
                    isCollapsed ? "size-10 justify-center" : "h-9 gap-3 px-3",
                    active
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <item.Icon
                    className={cn(
                      "shrink-0 transition-transform duration-150",
                      isCollapsed ? "size-4.5" : "size-3.75",
                      !active && "group-hover:scale-110",
                    )}
                    strokeWidth={active ? 2.25 : 1.75}
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

export function EmpresaSidebar() {
  const { open, isOpen, toggle, closeMenu } = useSidebar();
  const { setAccountType } = useAccount();
  const router = useRouter();

  const backToPersonal = () => {
    setAccountType("personal");
    router.replace("/dashboard");
  };

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside
        className={cn(
          "hidden flex-col bg-white text-foreground border-r border-border/50",
          "transition-[width] duration-200 ease-in-out will-change-[width]",
          "lg:sticky lg:flex lg:self-start",
          HEADER_OFFSET,
          ASIDE_H,
          isOpen ? "w-56" : "w-14",
        )}
        aria-label="Navegación lateral empresa"
      >
        <ScrollArea className="min-h-0 flex-1 pt-3">
          <EmpresaNav isCollapsed={!isOpen} />
        </ScrollArea>

        <div className="shrink-0 border-t border-border/50 space-y-1 p-2">
          <button
            type="button"
            onClick={backToPersonal}
            aria-label="Volver a vista personal"
            className={cn(
              "flex items-center rounded-lg transition-colors duration-150 text-primary hover:bg-primary/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isOpen
                ? "h-8 w-full gap-2 px-2 text-[11px] font-medium tracking-wide"
                : "size-10 justify-center",
            )}
          >
            <ArrowLeftRight
              className={cn("shrink-0", isOpen ? "size-3.75" : "size-4")}
              strokeWidth={1.75}
            />
            {isOpen && <span>Vista personal</span>}
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={isOpen ? "Colapsar menú" : "Expandir menú"}
            className={cn(
              "flex items-center rounded-lg transition-colors duration-150",
              "text-muted-foreground/50 hover:bg-muted/70 hover:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isOpen
                ? "h-8 w-full gap-2 px-2 text-[11px] font-medium tracking-wide"
                : "size-10 justify-center",
            )}
          >
            {isOpen ? (
              <>
                <PanelLeftClose className="size-3.5 shrink-0" />
                <span>Contraer panel</span>
              </>
            ) : (
              <PanelLeftOpen className="size-4 shrink-0" />
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile sheet ─────────────────────────────────────── */}
      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (!next) closeMenu();
        }}
      >
        <SheetContent
          side="left"
          className="flex w-[min(100%-2rem,17rem)] flex-col gap-0 p-0 sm:max-w-xs bg-white"
          showCloseButton={false}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-4">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
                <Building2 className="size-3.5 text-white" aria-hidden />
              </span>
              <SheetTitle className="text-[13px] font-semibold tracking-tight text-foreground">
                Modo empresa
              </SheetTitle>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg",
                "text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              )}
            >
              <X className="size-4" />
            </button>
          </div>

          <SheetDescription className="sr-only">
            Menú de navegación de la vista empresarial
          </SheetDescription>

          <ScrollArea className="min-h-0 flex-1 pt-2">
            <EmpresaNav onNavigate={closeMenu} />
          </ScrollArea>

          <div className="shrink-0 border-t border-border/50 p-3">
            <button
              type="button"
              onClick={() => {
                backToPersonal();
                closeMenu();
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium",
                "text-primary hover:bg-primary/10 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              )}
            >
              <ArrowLeftRight className="size-4" strokeWidth={1.75} />
              <span>Volver a vista personal</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
