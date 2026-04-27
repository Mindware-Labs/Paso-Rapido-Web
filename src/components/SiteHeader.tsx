"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { HEADER_QUICK } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const { openMenu } = useSidebar();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 shrink-0 border-b border-border/90 bg-card/95 text-foreground",
        "supports-[backdrop-filter]:bg-card/80 supports-[backdrop-filter]:backdrop-blur-md",
      )}
    >
      <div className="flex h-full min-w-0 items-center gap-2 px-3 sm:px-4 lg:gap-3 lg:px-5">
        <button
          type="button"
          onClick={openMenu}
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-md",
            "text-foreground/90 transition hover:bg-muted",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50",
            "lg:hidden",
          )}
          aria-label="Abrir menú de navegación"
        >
          <Menu className="size-5" />
        </button>

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md py-1 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/40"
        >
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm"
            aria-hidden
          >
            <Zap className="size-4 fill-current" />
          </span>
          <span className="min-w-0 text-left">
            <span className="block text-sm font-semibold tracking-tight sm:text-base">
              Paso Rápido
            </span>
            <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
              Portal institucional
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
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
                  q.href === "/recargar"
                    ? buttonVariants({ size: "sm" })
                    : buttonVariants({ variant: "outline", size: "sm" }),
                  "hidden min-h-8 sm:inline-flex",
                  q.href === "/recargar" && "font-semibold shadow-sm",
                  active && q.href !== "/recargar" && "border-primary/30 bg-primary/5",
                )}
              >
                {q.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
