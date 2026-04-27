"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  User,
  KeyRound,
  CreditCard,
  Users,
  MessageSquareWarning,
  Newspaper,
  Bell,
  ChevronRight,
  X,
  Zap,
  Wallet,
  Tag,
  Home,
  BotMessageSquare,
  CircleHelp,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import type { LucideIcon } from "lucide-react";

type Item = {
  key: string;
  label: string;
  hint: string;
  Icon: LucideIcon;
  href: string;
  section: "Navegación" | "Cuenta" | "Operaciones" | "Soporte";
};

const MENU: Item[] = [
  {
    key: "inicio",
    label: "Inicio",
    hint: "Ir al inicio",
    Icon: Home,
    href: "/",
    section: "Navegación",
  },
  {
    key: "perfil",
    label: "Perfil",
    hint: "Datos y cuenta",
    Icon: User,
    href: "/cuenta",
    section: "Cuenta",
  },
  {
    key: "clave",
    label: "Contraseña",
    hint: "Seguridad de acceso",
    Icon: KeyRound,
    href: "/contrasena",
    section: "Cuenta",
  },
  {
    key: "pagos",
    label: "Métodos de pago",
    hint: "Tarjetas y cuentas",
    Icon: CreditCard,
    href: "/metodos-pago",
    section: "Operaciones",
  },
  {
    key: "vinc",
    label: "Vinculados",
    hint: "Personas autorizadas",
    Icon: Users,
    href: "/vinculados",
    section: "Operaciones",
  },
  {
    key: "notif",
    label: "Notificaciones",
    hint: "Centro de alertas",
    Icon: Bell,
    href: "/notificaciones",
    section: "Operaciones",
  },
  {
    key: "recl",
    label: "Reclamaciones",
    hint: "Consultas y soporte",
    Icon: MessageSquareWarning,
    href: "/reclamaciones",
    section: "Soporte",
  },
  {
    key: "news",
    label: "Noticias",
    hint: "Avisos oficiales",
    Icon: Newspaper,
    href: "/noticias",
    section: "Soporte",
  },
  {
    key: "asistencia-vial",
    label: "Asistencia vial",
    hint: "Asesor de viajes",
    Icon: BotMessageSquare,
    href: "/asistente-vial",
    section: "Soporte",
  },
  {
    key: "ayuda",
    label: "Ayuda",
    hint: "Centro de ayuda",
    Icon: CircleHelp,
    href: "/ayuda",
    section: "Soporte",
  },
];

const SECTIONS: Item["section"][] = [
  "Navegación",
  "Cuenta",
  "Operaciones",
  "Soporte",
];

const C = {
  hero: "#1D8C57",
  onHero: "#ffffff",
  gold: "#B8963E",
} as const;

const QUICK = [
  { key: "saldo", label: "Saldo disponible", value: "RD$ 1,250", Icon: Wallet },
  { key: "tag", label: "Estado TAG", value: "Activo", Icon: Tag },
] as const;

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export function AppSidebar() {
  const { open, closeMenu } = useSidebar();
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-[2px] transition-opacity"
        aria-label="Cerrar menú"
        onClick={closeMenu}
      />
      <aside
        className="absolute left-0 top-0 flex h-full w-[min(100%,22rem)] max-w-full flex-col border-r border-white/10 shadow-2xl sm:w-96"
        style={{ background: "#F4F4F4" }}
        role="dialog"
        aria-modal
        aria-labelledby="sidebar-title"
      >
        <div
          className="shrink-0 space-y-4 px-4 pb-4 pt-3"
          style={{ backgroundColor: C.hero }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <Zap
                className="h-3.5 w-3.5 shrink-0 fill-pr-on-hero text-pr-on-hero"
                aria-hidden
              />
              <p
                id="sidebar-title"
                className="text-[13px] font-bold tracking-tight text-white"
              >
                Paso Rápido
              </p>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div
            className="h-px w-full"
            style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
          />
          <div className="flex items-center gap-3">
            <div
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: C.gold }}
            >
              <span
                className="text-lg font-extrabold text-white"
                style={{ letterSpacing: "-0.3px" }}
              >
                {initials("Usuario invitado")}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-white">Usuario</p>
              <p className="text-xs text-white/75">Cuenta personal (demo web)</p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-3 p-3">
            <div
              className="flex flex-row overflow-hidden rounded-lg border"
              style={{ borderColor: "#E0E0E0", background: "#fff" }}
            >
              {QUICK.map((s, idx) => (
                <div
                  key={s.key}
                  className="flex min-w-0 flex-1 flex-col gap-0.5 border-r py-2.5 pl-3 pr-2 last:border-r-0"
                  style={
                    idx < QUICK.length - 1
                      ? { borderRight: "1px solid #E0E0E0" }
                      : undefined
                  }
                >
                  <div
                    className="mb-0.5 flex h-[26px] w-[26px] items-center justify-center rounded-md"
                    style={{ background: "#EAF5EE" }}
                  >
                    <s.Icon
                      className="h-3.5 w-3.5"
                      style={{ color: C.hero }}
                    />
                  </div>
                  <span className="text-[10px] text-[#999]">{s.label}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: C.hero }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {SECTIONS.map((section) => {
              const items = MENU.filter((i) => i.section === section);
              return (
                <div key={section} className="space-y-1.5">
                  <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-widest text-[#999]">
                    {section}
                  </p>
                  <ul
                    className="overflow-hidden rounded-lg border border-[#E0E0E0] bg-white"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    {items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <li
                          key={item.key}
                          className="border-b border-[#EBEBEB] last:border-b-0"
                        >
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex min-h-14 items-center gap-2.5 px-2.5 py-2.5 transition"
                            style={{
                              backgroundColor: active
                                ? "rgba(29,140,87,0.08)"
                                : "transparent",
                            }}
                          >
                            <span
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                              style={{ background: "#EAF5EE" }}
                            >
                              <item.Icon
                                className="h-[18px] w-[18px]"
                                style={{ color: C.hero }}
                                strokeWidth={1.75}
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-[#1A1A1A]">
                                {item.label}
                              </p>
                              <p className="text-[11px] text-[#555]">
                                {item.hint}
                              </p>
                            </div>
                            <ChevronRight
                              className="h-3.5 w-3.5 shrink-0 text-[#ccc]"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
