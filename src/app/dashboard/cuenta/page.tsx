"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard,
  Users,
  BarChart2,
  CarFront,
  ListOrdered,
  Shield,
  Clock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// ─── Datos de menú (con paleta de color por grupo) ──────────
const GROUPS = [
  {
    title: "Gestión y Actividad",
    color: "emerald",
    items: [
      {
        label: "Métodos de pago",
        sub: "Administra tus tarjetas de crédito, débito y otras formas de pago.",
        icon: CreditCard,
        href: "/dashboard/metodos-pago",
      },
      {
        label: "Histórico",
        sub: "Visualiza estadísticas y el balance general de tu cuenta.",
        icon: BarChart2,
        href: "/dashboard/historico",
      },
      {
        label: "Movimientos",
        sub: "Consulta el detalle completo de tus recargas y tránsitos en peajes.",
        icon: ListOrdered,
        href: "/dashboard/movimientos",
      },
    ],
  },
  {
    title: "Dispositivos y Flotilla",
    color: "blue",
    items: [
      {
        label: "Vehículos",
        sub: "Registra y gestiona las placas de los vehículos asociados a tu TAG.",
        icon: CarFront,
        href: "/dashboard/vehiculos",
      },
      {
        label: "Vinculados",
        sub: "Administra usuarios adicionales o subcuentas asociadas a tu perfil.",
        icon: Users,
        href: "/dashboard/vinculados",
      },
    ],
  },
  {
    title: "Preferencias de la Cuenta",
    color: "violet",
    items: [
      {
        label: "Notificaciones",
        sub: "Configura tus alertas por correo electrónico, SMS y push.",
        icon: Bell,
        href: "/dashboard/notificaciones",
      },
      {
        label: "Seguridad",
        sub: "Actualiza tu contraseña y gestiona la seguridad de tus accesos.",
        icon: Shield,
        href: "/dashboard/contrasena",
      },
    ],
  },
];

const colorMap = {
  emerald: {
    light: "bg-emerald-50 border-emerald-100",
    hover: "group-hover:bg-emerald-100/60",
    text: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
    ring: "focus:ring-emerald-500/20",
  },
  blue: {
    light: "bg-blue-50 border-blue-100",
    hover: "group-hover:bg-blue-100/60",
    text: "text-blue-600",
    borderHover: "hover:border-blue-200",
    ring: "focus:ring-blue-500/20",
  },
  violet: {
    light: "bg-violet-50 border-violet-100",
    hover: "group-hover:bg-violet-100/60",
    text: "text-violet-600",
    borderHover: "hover:border-violet-200",
    ring: "focus:ring-violet-500/20",
  },
};

export default function CuentaPage() {
  const router = useRouter();
  const { userData, logout } = useAuth();
  const [lastAccess, setLastAccess] = useState("");

  useEffect(() => {
    // Simula la última conexión (hora actual en el primer render)
    const now = new Date();
    setLastAccess(
      now.toLocaleDateString("es-DO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
        " · " +
        now.toLocaleTimeString("es-DO", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    );
  }, []);

  function handleLogout() {
    logout();
    router.replace("/");
  }

  const fullName = userData
    ? [userData.primerNombre, userData.segundoNombre].filter(Boolean).join(" ")
    : "Richard De León";

  const initials = userData?.primerNombre
    ? `${userData.primerNombre[0]}${userData.segundoNombre?.[0] || ""}`.toUpperCase()
    : "RD";

  return (
    <div className="min-h-full bg-slate-50/50">
      <div className="w-full space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Cabecera con información de última conexión ── */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Portal de Usuario
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Mi Perfil
            </h1>
          </div>

          {/* Panel derecho: última conexión */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm sm:self-start">
            <Clock className="h-4 w-4 text-slate-400" />
            <div className="text-xs text-slate-600">
              <span className="font-bold uppercase tracking-wider text-slate-500">
                Última conexión
              </span>
              <span className="ml-1.5 text-slate-600">
                {lastAccess || "..."}
              </span>
            </div>
          </div>
        </header>

        {/* ── HÉROE: Tarjeta de identidad ── (sin cambios) */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1 w-full bg-emerald-600" />
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="relative flex items-center gap-5 p-6 lg:w-1/2 lg:border-r lg:border-slate-100">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] border-[5px] border-white bg-slate-100 shadow-sm ring-1 ring-slate-200">
                <span className="text-2xl font-extrabold text-slate-700">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="truncate text-lg font-extrabold text-slate-900">
                    {fullName}
                  </h2>
                  <ShieldCheck
                    className="h-4 w-4 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                  Cuenta Verificada
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-100 p-6 lg:w-1/2 lg:border-t-0">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="truncate font-medium">
                  {userData?.correo || "richard2512006@gmail.com"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="font-medium">
                  {userData?.telefono || "8096075289"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIONES DE NAVEGACIÓN MULTICOLOR ── (sin cambios) */}
        {GROUPS.map((group) => {
          const palette = colorMap[group.color as keyof typeof colorMap];
          return (
            <section key={group.title} className="space-y-3">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all",
                      palette.borderHover,
                      "hover:bg-white hover:shadow-md",
                      palette.ring,
                      "focus:outline-none focus:ring-2",
                    )}
                  >
                    <div
                      className={cn(
                        "mb-4 flex h-11 w-11 items-center justify-center rounded-xl border transition-colors",
                        palette.light,
                        palette.hover,
                      )}
                    >
                      <item.icon
                        className={cn("h-5 w-5", palette.text)}
                        strokeWidth={1.75}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {item.sub}
                    </p>
                    <div className="mt-4 flex items-center justify-end">
                      <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* ── Cierre de sesión ── (sin cambios) */}
        <section className="rounded-2xl border border-red-100 bg-red-50/30 p-6 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Cerrar sesión</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Finalizará tu sesión actual en este dispositivo. Deberás ingresar
              tus credenciales nuevamente para acceder.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-2 active:scale-[0.98] sm:mt-0 sm:w-auto sm:shrink-0"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </section>
      </div>
    </div>
  );
}
