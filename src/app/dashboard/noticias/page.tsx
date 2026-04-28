"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  Cpu,
  Users,
  ArrowRight,
  Newspaper,
  BellRing,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Datos de prueba (mock) ────────────────────────────────────────
type KickerType = "Institucional" | "Usuarios" | "Tecnología";

interface Article {
  id: string;
  kicker: KickerType;
  title: string;
  body: string;
  fecha: string;
}

const ARTICLES: Article[] = [
  {
    id: "n1",
    kicker: "Institucional",
    title:
      "Ampliación del horario de servicio en peajes principales a nivel nacional",
    body: "A partir del próximo lunes, los peajes de la Autopista 6 de Noviembre y Las Américas operarán 24 horas con el sistema Paso Rápido integrado a nuestra nueva red. Se recomienda encarecidamente actualizar su TAG y verificar su balance antes del viernes para evitar inconvenientes en su tránsito.",
    fecha: "22 abr 2026",
  },
  {
    id: "n2",
    kicker: "Usuarios",
    title: "Nuevo límite mensual de recarga para cuentas verificadas",
    body: "El monto máximo de recarga mensual ha sido elevado a RD$ 50,000.00 para usuarios con verificación biométrica completada. Revise su estado en Mi Perfil.",
    fecha: "18 abr 2026",
  },
  {
    id: "n3",
    kicker: "Tecnología",
    title: "Actualización del sistema de notificaciones push",
    body: "Implementamos un nuevo motor de alertas en tiempo real. Ahora recibirá confirmación instantánea al pasar por un peaje, incluso sin conexión de datos móviles.",
    fecha: "10 abr 2026",
  },
  {
    id: "n4",
    kicker: "Institucional",
    title: "Mantenimiento programado de la plataforma",
    body: "El sábado 29 de abril entre las 2:00 AM y 5:00 AM se realizará un mantenimiento mayor. El servicio de Paso Rápido podría presentar intermitencias.",
    fecha: "05 abr 2026",
  },
];

// ─── Mapa de Estilos Semánticos por Categoría ──────────────────────
const CATEGORY_STYLES: Record<
  KickerType,
  {
    icon: any;
    bg: string;
    bgHover: string;
    text: string;
    border: string;
    hoverText: string;
    gradient: string;
  }
> = {
  Institucional: {
    icon: Building2,
    bg: "bg-blue-50",
    bgHover: "group-hover:bg-blue-100/60",
    text: "text-blue-600",
    border: "border-blue-100",
    hoverText: "group-hover:text-blue-700",
    gradient: "from-blue-100/50 to-blue-50/10",
  },
  Usuarios: {
    icon: Users,
    bg: "bg-emerald-50",
    bgHover: "group-hover:bg-emerald-100/60",
    text: "text-emerald-600",
    border: "border-emerald-100",
    hoverText: "group-hover:text-emerald-700",
    gradient: "from-emerald-100/50 to-emerald-50/10",
  },
  Tecnología: {
    icon: Cpu,
    bg: "bg-violet-50",
    bgHover: "group-hover:bg-violet-100/60",
    text: "text-violet-600",
    border: "border-violet-100",
    hoverText: "group-hover:text-violet-700",
    gradient: "from-violet-100/50 to-violet-50/10",
  },
};

const CATEGORIES = [
  "Todas",
  "Institucional",
  "Usuarios",
  "Tecnología",
] as const;

export default function NoticiasPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof CATEGORIES)[number]>("Todas");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const filteredArticles = useMemo(() => {
    if (activeTab === "Todas") return ARTICLES;
    return ARTICLES.filter((a) => a.kicker === activeTab);
  }, [activeTab]);

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Cabecera Institucional ── */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Información y Actualizaciones
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Noticias y Comunicados
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Manténgase al tanto de las novedades del sistema Paso Rápido,
              cambios en políticas, mantenimientos y mejoras tecnológicas de
              nuestra red.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <BellRing className="h-4 w-4 text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Recibir alertas
            </span>
            <button
              role="switch"
              aria-checked={alertsEnabled}
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2",
                alertsEnabled ? "bg-emerald-600" : "bg-slate-300",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  alertsEnabled ? "translate-x-4" : "translate-x-0",
                )}
              />
            </button>
          </div>
        </header>

        {/* ── Pestañas de Filtro ── */}
        <nav className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 pb-px">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
                activeTab === cat
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
              )}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* ── Contenido Principal ── */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {/* ── Artículo Destacado (Nuevo Split Layout Editorial) ── */}
            {featuredArticle && (
              <Link
                href={`/dashboard/noticias/${featuredArticle.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 lg:flex-row"
              >
                {/* Portada Abstracta (Visual) */}
                <div
                  className={cn(
                    "relative flex h-48 shrink-0 items-center justify-center overflow-hidden lg:h-auto lg:w-2/5",
                    CATEGORY_STYLES[featuredArticle.kicker].bg,
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      CATEGORY_STYLES[featuredArticle.kicker].gradient,
                    )}
                  />
                  {(() => {
                    const Icon = CATEGORY_STYLES[featuredArticle.kicker].icon;
                    return (
                      <Icon
                        className={cn(
                          "relative z-10 h-24 w-24 sm:h-32 sm:w-32 opacity-20 transition-transform duration-700 group-hover:scale-110",
                          CATEGORY_STYLES[featuredArticle.kicker].text,
                        )}
                      />
                    );
                  })()}
                </div>

                {/* Contenido (Texto) */}
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                        CATEGORY_STYLES[featuredArticle.kicker].bg,
                        CATEGORY_STYLES[featuredArticle.kicker].text,
                      )}
                    >
                      {featuredArticle.kicker}
                    </span>
                    <time
                      dateTime={featuredArticle.fecha}
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                    >
                      {featuredArticle.fecha}
                    </time>
                  </div>

                  <h2
                    className={cn(
                      "mb-3 text-xl font-extrabold leading-tight text-slate-900 transition-colors sm:text-2xl lg:text-3xl",
                      CATEGORY_STYLES[featuredArticle.kicker].hoverText,
                    )}
                  >
                    {featuredArticle.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {featuredArticle.body}
                  </p>

                  <div
                    className={cn(
                      "inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all",
                      CATEGORY_STYLES[featuredArticle.kicker].hoverText,
                      "group-hover:border-slate-300 group-hover:bg-slate-50",
                    )}
                  >
                    Leer comunicado
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            )}

            {/* ── Grid de Artículos Regulares ── */}
            {regularArticles.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularArticles.map((article) => {
                  const style = CATEGORY_STYLES[article.kicker];
                  const Icon = style.icon;

                  return (
                    <Link
                      key={article.id}
                      href={`/dashboard/noticias/${article.id}`}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors",
                            style.bg,
                            style.border,
                            style.bgHover,
                          )}
                        >
                          <Icon
                            className={cn("h-5 w-5", style.text)}
                            strokeWidth={1.75}
                          />
                        </div>
                        <time
                          dateTime={article.fecha}
                          className="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                        >
                          {article.fecha}
                        </time>
                      </div>

                      <span
                        className={cn(
                          "inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-3",
                          style.bg,
                          style.text,
                        )}
                      >
                        {article.kicker}
                      </span>

                      <h3
                        className={cn(
                          "text-sm font-bold leading-snug text-slate-900 transition-colors line-clamp-2",
                          style.hoverText,
                        )}
                      >
                        {article.title}
                      </h3>

                      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500 line-clamp-3">
                        {article.body}
                      </p>

                      <div className="mt-5 border-t border-slate-50 pt-4 flex items-center justify-end">
                        <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ── Estado Vacío ── */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-300 ring-8 ring-slate-50">
              <Newspaper className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-base font-bold text-slate-900">
              No hay noticias en esta categoría
            </h3>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              En cuanto se publiquen actualizaciones oficiales de &ldquo;
              {activeTab}&rdquo;, aparecerán aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
