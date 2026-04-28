"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Headphones,
  HelpCircle,
  MessageCircle,
  Search,
  ArrowRight,
  FileText,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Datos de Prueba (Institucionales) ────────────────────────────────────────

const FAQ = [
  {
    q: "¿Cómo activo mi cuenta si ya tengo un TAG físico?",
    a: "Para activar un TAG existente, diríjase a la sección de 'Vehículos' en el menú principal y seleccione 'Vincular Persona/Vehículo'. Deberá ingresar el número de serie de su dispositivo para enlazarlo con su balance general.",
  },
  {
    q: "¿Dónde puedo consultar mi balance y recargas recientes?",
    a: "Puede visualizar su balance actual en la parte superior derecha de su Perfil. Para un desglose detallado de consumos y recargas, visite la pestaña 'Histórico', donde además podrá exportar sus estados de cuenta.",
  },
  {
    q: "El peaje no leyó mi TAG, ¿qué debo hacer?",
    a: "Verifique que su dispositivo esté correctamente adherido al cristal delantero y que cuente con saldo suficiente. Si el problema persiste en múltiples estaciones, comuníquese con soporte para solicitar un reemplazo sin costo.",
  },
  {
    q: "¿Puedo transferir mi saldo a otra persona?",
    a: "Actualmente el saldo es intransferible entre cuentas maestras distintas. Sin embargo, usted puede 'Vincular' a un familiar o empleado bajo su misma cuenta para que utilicen un fondo compartido.",
  },
  {
    q: "¿Qué métodos de pago son aceptados para recargar?",
    a: "Aceptamos tarjetas de crédito y débito (Visa y Mastercard) a través de nuestra pasarela segura CardNet. Próximamente habilitaremos transferencias bancarias y billeteras digitales.",
  },
] as const;

// ─── Página Principal ─────────────────────────────────────────────────────────

export default function AyudaPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* ── CONTENEDOR FLUIDO ── */}
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional con Buscador ── */}
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Soporte al Usuario
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Centro de Ayuda
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Encuentre respuestas rápidas a sus preguntas, revise nuestras
              guías de uso o comuníquese con nuestro equipo de asistencia
              técnica.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm shrink-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar artículos o preguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </header>

        {/* ── Vías de Contacto Rápidas (Tarjetas Semánticas) ── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Chat */}
          <div className="group flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-blue-200 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 transition-colors group-hover:bg-blue-100/60">
              <MessageCircle
                className="h-6 w-6 text-blue-600"
                strokeWidth={1.75}
              />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Chat en vivo</h3>
            <p className="mt-1 text-xs text-slate-500">
              Soporte inmediato vía web
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Iniciar chat <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          {/* Teléfono */}
          <div className="group flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-emerald-200 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 transition-colors group-hover:bg-emerald-100/60">
              <Headphones
                className="h-6 w-6 text-emerald-600"
                strokeWidth={1.75}
              />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Línea Nacional</h3>
            <p className="mt-1 text-xs text-slate-500">
              Lunes a Viernes (8AM - 6PM)
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              809-200-0000 <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          {/* Guías */}
          <div className="group flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-violet-200 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 border border-violet-100 transition-colors group-hover:bg-violet-100/60">
              <HelpCircle
                className="h-6 w-6 text-violet-600"
                strokeWidth={1.75}
              />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Manuales de Uso
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Paso a paso del sistema
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
              Ver guías <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* ── Grid Inferior (FAQs + Sidebar) ── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start pt-4">
          {/* Columna Principal: Preguntas Frecuentes */}
          <main className="space-y-4 lg:col-span-8">
            <div className="flex items-center gap-2 px-1">
              <FileText className="h-4 w-4 text-slate-400" />
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Preguntas Frecuentes
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <ul className="divide-y divide-slate-100">
                {FAQ.map((item, index) => (
                  <li key={index}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500/20 [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-200 group-open:rotate-180 group-open:bg-emerald-50 group-open:text-emerald-600">
                          <ChevronDown className="h-4 w-4 text-slate-400 group-open:text-emerald-600" />
                        </span>
                      </summary>
                      <div className="px-6 pb-6 pt-1 text-sm leading-relaxed text-slate-500">
                        {item.a}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </main>

          {/* Sidebar Secundario: Más Asistencia */}
          <aside className="space-y-4 lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ¿No encontró lo que buscaba?
                  </h3>
                </div>
              </div>
              <p className="mb-5 text-xs leading-relaxed text-slate-500">
                Si tiene un requerimiento técnico específico o una reclamación
                sobre un cobro de peaje, puede crear un ticket formal y nuestro
                equipo le responderá en menos de 24 horas.
              </p>
              <Link
                href="/dashboard/ayuda/ticket"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 active:scale-[0.98]"
              >
                Abrir un Ticket de Soporte
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
