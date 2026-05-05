"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Lock, Mail, Zap, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

function formatCountdown(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, isInitialized } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [touched, setTouched] = useState({ correo: false, password: false });

  const correoRef = useRef<HTMLInputElement>(null);

  // Redirect only after auth state is fully initialized
  useEffect(() => {
    if (isInitialized && isLoggedIn) router.replace("/dashboard");
  }, [isInitialized, isLoggedIn, router]);

  // Countdown timer for rate-limit lock
  useEffect(() => {
    if (lockSeconds <= 0) return;
    const id = setTimeout(() => {
      setLockSeconds((s) => {
        const next = s - 1;
        if (next === 0) setError(null);
        return next;
      });
    }, 1000);
    return () => clearTimeout(id);
  }, [lockSeconds]);

  const isLocked = lockSeconds > 0;

  // Zod field-level errors
  const parsed = loginSchema.safeParse({ correo, password });
  const fieldError = (field: "correo" | "password") => {
    if (!touched[field]) return null;
    if (parsed.success) return null;
    return parsed.error.flatten().fieldErrors[field]?.[0] ?? null;
  };

  const canSubmit =
    !loading && !isLocked && correo.trim().length > 0 && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ correo: true, password: true });

    const result = loginSchema.safeParse({ correo, password });
    if (!result.success) return;
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    const res = await login(correo.trim().toLowerCase(), password);
    setLoading(false);

    if (!res.ok) {
      if (res.remainingSeconds) setLockSeconds(res.remainingSeconds);
      setError(res.message);
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header / Logo Institucional */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 shadow-sm border border-emerald-500/20">
            <Zap className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Paso Rápido
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Acceso seguro al portal de gestión
          </p>
        </div>

        {/* Card Principal */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40">
          <div className="px-6 py-8 sm:px-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Correo */}
              <div className="space-y-2">
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-slate-700"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    ref={correoRef}
                    id="correo"
                    type="email"
                    autoComplete="email"
                    value={correo}
                    onChange={(e) => {
                      setCorreo(e.target.value);
                      setError(null);
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, correo: true }))}
                    placeholder="institucional@ejemplo.com"
                    disabled={isLocked}
                    className={cn(
                      "block w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-offset-1",
                      fieldError("correo")
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20",
                      isLocked && "cursor-not-allowed bg-slate-50 opacity-70",
                    )}
                  />
                </div>
                {fieldError("correo") && (
                  <p className="text-xs font-medium text-red-600">
                    {fieldError("correo")}
                  </p>
                )}
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Contraseña
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    placeholder="••••••••"
                    disabled={isLocked}
                    className={cn(
                      "block w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-offset-1",
                      fieldError("password")
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20",
                      isLocked && "cursor-not-allowed bg-slate-50 opacity-70",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={
                      showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPwd ? (
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
                {fieldError("password") && (
                  <p className="text-xs font-medium text-red-600">
                    {fieldError("password")}
                  </p>
                )}
              </div>

              {/* Alerta de Error / Bloqueo */}
              {error && (
                <div
                  className={cn(
                    "flex flex-col gap-1 rounded-lg border p-3 text-sm",
                    isLocked
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-red-200 bg-red-50 text-red-800",
                  )}
                  role="alert"
                >
                  <p className="font-medium">{error}</p>
                  {isLocked && (
                    <p className="font-mono text-xs font-bold">
                      Intenta de nuevo en {formatCountdown(lockSeconds)}
                    </p>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                  canSubmit
                    ? "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
                    : "cursor-not-allowed bg-slate-300 shadow-none",
                )}
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Verificando credenciales...
                  </>
                ) : isLocked ? (
                  `Bloqueado (${formatCountdown(lockSeconds)})`
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </form>
          </div>

          {/* Footer de la tarjeta */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center sm:px-10">
            <p className="text-sm text-slate-600">
              ¿No tienes una cuenta registrada?{" "}
              <Link
                href="/registro"
                className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Link a landing page */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Volver a inicio
          </Link>
        </div>

        {/* Footer Institucional Exterior */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4" />
          <span>© 2026 Sistema Paso Rápido. Acceso Restringido.</span>
        </div>
      </div>
    </div>
  );
}
