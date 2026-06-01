"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { authApi, RateLimitError } from "@/lib/authApi";
import { cn } from "@/lib/utils";

type Step = "request" | "verify" | "reset" | "done";

const RESEND_COOLDOWN_SEC = 30;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function formatCountdown(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i < current ? "bg-emerald-600" : "bg-slate-200",
            i === current - 1 ? "w-8" : "w-2.5",
          )}
        />
      ))}
    </div>
  );
}

// ── Password requirement row ──────────────────────────────────────────────────

function PwdReq({ met, label }: { met: boolean; label: string }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium transition-colors",
        met ? "text-emerald-600" : "text-slate-400",
      )}
    >
      <CheckCircle2 className={cn("h-3.5 w-3.5", !met && "opacity-40")} />
      {label}
    </li>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("request");
  const [destination, setDestination] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [lockSeconds, setLockSeconds] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const destinationNormalized = destination.trim().toLowerCase();
  const isLocked = lockSeconds > 0;

  // Rate-limit lock countdown
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

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  // ── Validation flags ────────────────────────────────────────────────────────

  const canRequest = EMAIL_REGEX.test(destinationNormalized);
  const isOtpComplete = otp.every((d) => d !== "");
  const requirements = [
    { label: "Mínimo 8 caracteres", met: newPassword.length >= 8 },
    { label: "1 letra mayúscula", met: /[A-Z]/.test(newPassword) },
    { label: "1 letra minúscula", met: /[a-z]/.test(newPassword) },
    { label: "1 número", met: /[0-9]/.test(newPassword) },
    { label: "1 carácter especial", met: /[^A-Za-z0-9]/.test(newPassword) },
  ];
  const allMet = requirements.every((r) => r.met);
  const passwordsMatch = newPassword === confirmPassword && !!confirmPassword;
  const canReset = !!resetToken && allMet && passwordsMatch;

  const startCooldown = useCallback(() => {
    setResendCooldown(RESEND_COOLDOWN_SEC);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────────

  const handleRequestCode = async () => {
    if (!canRequest || loading || isLocked) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const { exists } = await authApi.checkEmail(destinationNormalized);
      if (!exists) {
        setLockSeconds(10);
        setError("No encontramos una cuenta con ese correo electrónico.");
        return;
      }
      const res = await authApi.forgotPasswordRequest({
        method: "email",
        destination: destinationNormalized,
      });
      setMessage(res.message);
      setOtp(["", "", "", "", "", ""]);
      startCooldown();
      setStep("verify");
    } catch (e) {
      if (e instanceof RateLimitError) {
        setLockSeconds(e.remainingSeconds);
        setError(e.message);
      } else {
        setError((e as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || loading || isLocked) return;
    setLoading(true);
    setError(null);
    try {
      await authApi.forgotPasswordRequest({
        method: "email",
        destination: destinationNormalized,
      });
      startCooldown();
    } catch (e) {
      if (e instanceof RateLimitError) {
        setLockSeconds(e.remainingSeconds);
        setError(e.message);
      } else {
        setError((e as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isOtpComplete || loading || isLocked) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await authApi.forgotPasswordVerify({
        method: "email",
        destination: destinationNormalized,
        code: otp.join(""),
      });
      if (!res.verified) {
        setError("Código incorrecto. Verifica e intenta de nuevo.");
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
        return;
      }
      setResetToken(res.resetToken);
      setStep("reset");
    } catch (e) {
      if (e instanceof RateLimitError) {
        setLockSeconds(e.remainingSeconds);
        setError(e.message);
      } else {
        setError((e as Error).message ?? "Código incorrecto o expirado.");
      }
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!canReset || !resetToken || loading) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await authApi.forgotPasswordReset({ resetToken, newPassword });
      setStep("done");
    } catch (e) {
      if (e instanceof RateLimitError) {
        setLockSeconds(e.remainingSeconds);
        setError(e.message);
      } else {
        setError((e as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── OTP input handlers ──────────────────────────────────────────────────────

  const handleOtpChange = (value: string, idx: number) => {
    const digits = value.replace(/\D/g, "");
    setError(null);
    if (!digits) {
      setOtp((prev) => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });
      return;
    }
    setOtp((prev) => {
      const next = [...prev];
      for (let i = 0; i < digits.length && idx + i < next.length; i++) {
        next[idx + i] = digits[i];
      }
      return next;
    });
    const target = Math.min(idx + digits.length, 5);
    otpRefs.current[target]?.focus();
  };

  const handleOtpKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      setOtp((prev) => {
        const next = [...prev];
        next[idx - 1] = "";
        return next;
      });
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setOtp(next);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  // ── Navigation ──────────────────────────────────────────────────────────────

  const handleBack = () => {
    setError(null);
    setMessage(null);
    if (step === "request") {
      router.push("/login");
    } else if (step === "verify") {
      setOtp(["", "", "", "", "", ""]);
      setStep("request");
    } else if (step === "reset") {
      setResetToken(null);
      setConfirmTouched(false);
      setStep("verify");
    }
  };

  const onPrimary = () => {
    if (step === "request") return handleRequestCode();
    if (step === "verify") return handleVerify();
    if (step === "reset") return handleReset();
  };

  const ctaDisabled =
    loading ||
    isLocked ||
    (step === "request" && !canRequest) ||
    (step === "verify" && !isOtpComplete) ||
    (step === "reset" && !canReset);

  const ctaLabel = isLocked
    ? `Bloqueado ${formatCountdown(lockSeconds)}`
    : step === "request"
      ? "Enviar código"
      : step === "verify"
        ? "Verificar código"
        : "Actualizar contraseña";

  const stepNumber = step === "request" ? 1 : step === "verify" ? 2 : 3;

  const subtitle =
    step === "request"
      ? "Recibirás un código de verificación en tu correo electrónico."
      : step === "verify"
        ? `Hemos enviado un código de 6 dígitos a ${destinationNormalized}.`
        : step === "reset"
          ? "Define una nueva contraseña segura para tu cuenta."
          : "Tu contraseña fue actualizada correctamente.";

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-600 shadow-sm">
            {step === "done" ? (
              <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={2.5} />
            ) : (
              <Zap className="h-7 w-7 text-white" strokeWidth={2.5} />
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {step === "done" ? "¡Contraseña actualizada!" : "Recuperar contraseña"}
          </h1>
          <p className="mt-2 max-w-xs text-sm text-slate-600">{subtitle}</p>
          {step !== "done" && (
            <div className="mt-3 flex flex-col items-center gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Paso {stepNumber} de 3
              </p>
              <StepIndicator current={stepNumber} total={3} />
            </div>
          )}
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40">
          <div className="px-6 py-8 sm:px-10">
            {step === "done" ? (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-sm text-slate-600">
                  Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Volver a iniciar sesión
                </Link>
              </div>
            ) : (
              <form
                noValidate
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  onPrimary();
                }}
              >
                {/* Back link */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {step === "request" ? "Volver al inicio de sesión" : "Atrás"}
                </button>

                {/* ── Step: request ── */}
                {step === "request" && (
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
                        id="correo"
                        type="email"
                        autoComplete="email"
                        value={destination}
                        onChange={(e) => {
                          setDestination(e.target.value);
                          if (!isLocked) setError(null);
                          setMessage(null);
                        }}
                        placeholder="correo@ejemplo.com"
                        disabled={isLocked}
                        className={cn(
                          "block w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
                          error && !isLocked
                            ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20",
                          isLocked && "cursor-not-allowed bg-slate-50 opacity-70",
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* ── Step: verify ── */}
                {step === "verify" && (
                  <div className="space-y-4">
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={digit}
                          disabled={loading}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                          onPaste={handleOtpPaste}
                          className={cn(
                            "h-14 w-full rounded-lg border text-center text-2xl font-bold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
                            digit
                              ? "border-emerald-500 bg-emerald-50/40 focus:border-emerald-500 focus:ring-emerald-500/20"
                              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-sm">
                      <span className="text-slate-500">
                        ¿No recibiste el código?
                      </span>
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendCooldown > 0 || loading || isLocked}
                        className={cn(
                          "flex items-center gap-1 font-semibold transition-colors focus:outline-none",
                          resendCooldown > 0 || isLocked
                            ? "cursor-not-allowed text-slate-400"
                            : "text-emerald-600 hover:text-emerald-700 hover:underline",
                        )}
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        {resendCooldown > 0
                          ? `Reenviar en ${resendCooldown}s`
                          : "Reenviar código"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step: reset ── */}
                {step === "reset" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Nueva contraseña
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Lock className="h-4.5 w-4.5 text-slate-400" />
                        </div>
                        <input
                          id="newPassword"
                          type={showPwd ? "text" : "password"}
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError(null);
                          }}
                          placeholder="••••••••"
                          className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-1"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                          aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPwd ? (
                            <EyeOff className="h-4.5 w-4.5" />
                          ) : (
                            <Eye className="h-4.5 w-4.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Lock className="h-4.5 w-4.5 text-slate-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmTouched(true);
                            setError(null);
                          }}
                          placeholder="••••••••"
                          className={cn(
                            "block w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
                            confirmTouched && confirmPassword && !passwordsMatch
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                          aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showConfirm ? (
                            <EyeOff className="h-4.5 w-4.5" />
                          ) : (
                            <Eye className="h-4.5 w-4.5" />
                          )}
                        </button>
                      </div>
                      {confirmTouched && confirmPassword && !passwordsMatch && (
                        <p className="text-xs font-medium text-red-600">
                          Las contraseñas no coinciden
                        </p>
                      )}
                    </div>

                    {newPassword.length > 0 && (
                      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                        <p className="mb-2 text-xs font-semibold text-slate-700">
                          Requisitos de seguridad:
                        </p>
                        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                          {requirements.map((r) => (
                            <PwdReq key={r.label} met={r.met} label={r.label} />
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Success message (info) */}
                {message && !error && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
                    {message}
                  </div>
                )}

                {/* Error / lock alert */}
                {error && (
                  <div
                    role="alert"
                    className={cn(
                      "flex flex-col gap-1 rounded-lg border p-3 text-sm",
                      isLocked
                        ? "border-amber-200 bg-amber-50 text-amber-800"
                        : "border-red-200 bg-red-50 text-red-800",
                    )}
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
                  disabled={ctaDisabled}
                  className={cn(
                    "flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                    !ctaDisabled
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
                      Procesando...
                    </>
                  ) : (
                    ctaLabel
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          {step !== "done" && (
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center sm:px-10">
              <p className="text-sm text-slate-600">
                ¿Recordaste tu contraseña?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Secure note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4" />
          <span>Conexión segura · datos protegidos</span>
        </div>

        {/* Back to landing */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
