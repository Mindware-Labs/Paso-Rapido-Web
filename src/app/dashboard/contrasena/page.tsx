"use client";

import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Check,
  X,
  Smartphone,
  Monitor,
  Tablet,
  LogOut,
  AlertTriangle,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const SESSIONS = [
  {
    id: "s1",
    device: "Chrome · Windows",
    location: "Santo Domingo, RD",
    lastActive: "Activa ahora",
    current: true,
    icon: Monitor,
  },
  {
    id: "s2",
    device: "Safari · iPhone 15",
    location: "Santiago, RD",
    lastActive: "Hace 2 horas",
    current: false,
    icon: Smartphone,
  },
  {
    id: "s3",
    device: "Firefox · iPad Pro",
    location: "La Romana, RD",
    lastActive: "Hace 3 días",
    current: false,
    icon: Tablet,
  },
];

const REQUIREMENTS = [
  { label: "Mínimo 8 caracteres", met: true },
  { label: "Al menos una mayúscula", met: true },
  { label: "Al menos un número", met: false },
  { label: "Carácter especial", met: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContrasenaPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-slate-50/50 overflow-hidden">
      <div className="flex-1 w-full space-y-5 px-4 py-5 sm:px-6 lg:px-8 overflow-hidden flex flex-col">
        {/* ── Header ── */}
        <header className="shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Preferencias de la Cuenta
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            Seguridad y acceso
          </h1>
        </header>

        {/* ── Contenido principal en 2 columnas ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0">
          {/* ── Columna izquierda: Cambio de contraseña ── */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
            <div className="flex-1 p-5 sm:p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50">
                  <Lock className="h-5 w-5 text-violet-600" strokeWidth={2} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Cambiar contraseña</h2>
                  <p className="text-[11px] text-slate-500">Actualiza tu clave de acceso</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                      Contraseña actual
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        placeholder="••••••••"
                        className="block w-full rounded-xl border border-slate-200 py-2.5 pl-3.5 pr-10 text-[13px] text-slate-900 placeholder-slate-300 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                      />
                      <button
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                      Nueva contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="••••••••"
                        className="block w-full rounded-xl border border-slate-200 py-2.5 pl-3.5 pr-10 text-[13px] text-slate-900 placeholder-slate-300 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                      />
                      <button
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        className="block w-full rounded-xl border border-slate-200 py-2.5 pl-3.5 pr-10 text-[13px] text-slate-900 placeholder-slate-300 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors"
                      />
                      <button
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Requisitos */}
                  <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600 mb-2.5">
                      Requisitos de seguridad
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {REQUIREMENTS.map((r) => (
                        <div key={r.label} className="flex items-center gap-2">
                          {r.met ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.5} />
                          ) : (
                            <X className="h-3.5 w-3.5 text-slate-300" strokeWidth={2.5} />
                          )}
                          <span className={`text-[11px] font-medium ${r.met ? "text-slate-700" : "text-slate-400"}`}>
                            {r.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-green-700 transition-all active:scale-[0.98]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Actualizar contraseña
                </button>
              </div>
            </div>
          </section>

          {/* ── Columna derecha: Sesiones ── */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
            <div className="flex-1 p-5 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    <Monitor className="h-5 w-5 text-blue-600" strokeWidth={2} />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Sesiones activas</h2>
                    <p className="text-[11px] text-slate-500">Dispositivos conectados</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-100 transition-colors">
                  <LogOut className="h-3 w-3" />
                  Cerrar todas
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-2.5">
                {SESSIONS.map((s) => {
                  const DeviceIcon = s.icon;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-100">
                          <DeviceIcon className="h-4.5 w-4.5 text-slate-400" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-semibold text-slate-900">{s.device}</p>
                            {s.current && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 ring-1 ring-emerald-200/50">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Actual
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {s.location} · {s.lastActive}
                          </p>
                        </div>
                      </div>
                      {!s.current && (
                        <button className="shrink-0 rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all ml-2">
                          <LogOut className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Consejo */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-white px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <AlertTriangle className="h-4 w-4 text-blue-600" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-slate-900">Consejos de seguridad</p>
                  <p className="text-[11px] text-slate-500">Usa contraseñas únicas y activa la verificación en dos pasos.</p>
                </div>
                <Link
                  href="/dashboard/ayuda"
                  className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Saber más
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}