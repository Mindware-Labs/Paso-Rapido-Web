"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <Zap className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Paso Rápido
          </h1>
          <p className="text-sm text-slate-500">Inicia sesión en tu cuenta</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Correo */}
            <div className="space-y-1.5">
              <label
                htmlFor="correo"
                className="block text-sm font-semibold text-slate-700"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
                  placeholder="correo@ejemplo.com"
                  disabled={isLocked}
                  className={cn(
                    "w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm outline-none transition",
                    "focus:ring-2",
                    fieldError("correo")
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
                    isLocked && "cursor-not-allowed opacity-60",
                  )}
                />
              </div>
              {fieldError("correo") && (
                <p className="text-xs text-red-600">{fieldError("correo")}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
                    "w-full rounded-xl border py-2.5 pl-9 pr-10 text-sm outline-none transition",
                    "focus:ring-2",
                    fieldError("password")
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                      : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
                    isLocked && "cursor-not-allowed opacity-60",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={
                    showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPwd ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {fieldError("password") && (
                <p className="text-xs text-red-600">{fieldError("password")}</p>
              )}
            </div>

            {/* Error / Lock alert */}
            {error && (
              <div
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm",
                  isLocked
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-red-200 bg-red-50 text-red-700",
                )}
              >
                <p>{error}</p>
                {isLocked && (
                  <p className="mt-1 font-mono font-bold">
                    {formatCountdown(lockSeconds)}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                "w-full rounded-xl py-2.5 text-sm font-bold text-white transition active:scale-[0.98]",
                canSubmit
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "cursor-not-allowed bg-slate-300",
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
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
                  Ingresando…
                </span>
              ) : isLocked ? (
                `Bloqueado ${formatCountdown(lockSeconds)}`
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center gap-2 text-sm text-slate-500">
            <Link
              href="/forgot-password"
              className="font-medium text-emerald-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <span>
              ¿No tienes cuenta?{" "}
              <Link
                href="/registro"
                className="font-bold text-emerald-600 hover:underline"
              >
                Regístrate
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
