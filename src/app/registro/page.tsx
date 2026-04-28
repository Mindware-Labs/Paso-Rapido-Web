"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  QrCode,
  Smartphone,
  User,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { authApi, RateLimitError } from "@/lib/authApi";
import {
  formatCedula,
  isValidCedula,
  registerStep1Schema,
  registerStep2Schema,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

// QRCodeSVG must be client-only (no SSR)
const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((m) => m.QRCodeSVG),
  { ssr: false },
);

// ---- Types

type Step1Data = { nombre: string; apellido: string; cedula: string };
type Step2Data = {
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
};

// ---- Progress indicator

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-2">
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

// ---- Reusable field

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string | null;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
};

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  leftIcon,
  rightElement,
  disabled,
  inputMode,
  autoComplete,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={cn(
            "block w-full rounded-lg border py-2.5 text-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            leftIcon ? "pl-10" : "pl-3",
            rightElement ? "pr-10" : "pr-3",
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20",
            disabled && "cursor-not-allowed bg-slate-50 opacity-70",
          )}
        />
        {rightElement && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </span>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

// ---- Password requirements

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

// ---- Step 1: Datos personales

function Step1({ onNext }: { onNext: (data: Step1Data) => void }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [touched, setTouched] = useState({
    nombre: false,
    apellido: false,
    cedula: false,
  });

  useEffect(() => {
    if (lockSeconds <= 0) return;
    const id = setTimeout(
      () =>
        setLockSeconds((s) => {
          const n = s - 1;
          if (n === 0) setServerError(null);
          return n;
        }),
      1000,
    );
    return () => clearTimeout(id);
  }, [lockSeconds]);

  const isLocked = lockSeconds > 0;
  const digits = cedula.replace(/\D/g, "");
  const cedulaValid = isValidCedula(cedula);
  const showCedulaError =
    (touched.cedula && digits.length === 11 && !cedulaValid) || !!serverError;

  const parsed = registerStep1Schema.safeParse({ nombre, apellido, cedula });
  const fieldErr = (f: "nombre" | "apellido" | "cedula") => {
    if (!touched[f]) return null;
    if (parsed.success) return null;
    return parsed.error.flatten().fieldErrors[f]?.[0] ?? null;
  };

  const canSubmit =
    cedulaValid &&
    nombre.trim().length >= 2 &&
    apellido.trim().length >= 2 &&
    !loading &&
    !isLocked;

  const handleContinue = async () => {
    setTouched({ nombre: true, apellido: true, cedula: true });
    if (!canSubmit) return;
    setLoading(true);
    setServerError(null);
    try {
      const { exists } = await authApi.checkCedula(digits);
      if (exists) {
        setServerError("Esta cédula ya está registrada");
        return;
      }
      onNext({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        cedula: digits,
      });
    } catch (e) {
      if (e instanceof RateLimitError) {
        setLockSeconds(e.remainingSeconds);
        setServerError(e.message);
      } else {
        setServerError(
          (e as Error).message ??
            "No se pudo verificar la cédula. Intenta de nuevo.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Datos personales</h2>
        <p className="mt-1 text-sm text-slate-500">
          Ingresa tu información oficial para comenzar el registro.
        </p>
      </div>

      <div className="space-y-4">
        <Field
          id="nombre"
          label="Nombre(s)"
          value={nombre}
          onChange={(v) => {
            setNombre(v);
            setServerError(null);
          }}
          onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
          placeholder="Ej. Juan"
          leftIcon={<User className="h-4.5 w-4.5" />}
          error={fieldErr("nombre")}
          autoComplete="given-name"
        />
        <Field
          id="apellido"
          label="Apellido(s)"
          value={apellido}
          onChange={(v) => {
            setApellido(v);
            setServerError(null);
          }}
          onBlur={() => setTouched((t) => ({ ...t, apellido: true }))}
          placeholder="Ej. Pérez"
          leftIcon={<User className="h-4.5 w-4.5" />}
          error={fieldErr("apellido")}
          autoComplete="family-name"
        />
        <Field
          id="cedula"
          label="Cédula de Identidad"
          value={cedula}
          onChange={(v) => {
            const formatted = formatCedula(v);
            setCedula(formatted);
            if (!touched.cedula && v.replace(/\D/g, "").length === 11)
              setTouched((t) => ({ ...t, cedula: true }));
            if (!isLocked) setServerError(null);
          }}
          onBlur={() => setTouched((t) => ({ ...t, cedula: true }))}
          placeholder="000-0000000-0"
          leftIcon={<CreditCard className="h-4.5 w-4.5" />}
          error={
            showCedulaError
              ? (serverError ?? "Cédula inválida (módulo 10)")
              : null
          }
          inputMode="numeric"
          autoComplete="off"
          disabled={isLocked}
        />
      </div>

      {isLocked && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center text-sm text-amber-800">
          Reintenta en{" "}
          <span className="font-mono font-bold">
            {Math.floor(lockSeconds / 60)}:
            {String(lockSeconds % 60).padStart(2, "0")}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={handleContinue}
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            Verificando identidad...
          </>
        ) : (
          "Continuar"
        )}
      </button>
    </div>
  );
}

// Step 2: Correo y contraseña

function Step2({
  step1Data,
  onNext,
  onBack,
}: {
  step1Data: Step1Data;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}) {
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    correo: false,
    telefono: false,
    password: false,
    confirmPassword: false,
  });

  const requirements = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "1 letra mayúscula", met: /[A-Z]/.test(password) },
    { label: "1 letra minúscula", met: /[a-z]/.test(password) },
    { label: "1 número", met: /[0-9]/.test(password) },
    { label: "1 carácter especial", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const parsed = registerStep2Schema.safeParse({
    correo,
    telefono,
    password,
    confirmPassword,
  });
  const fieldErr = (
    f: "correo" | "telefono" | "password" | "confirmPassword",
  ) => {
    if (!touched[f]) return null;
    if (parsed.success) return null;
    return parsed.error.flatten().fieldErrors[f]?.[0] ?? null;
  };

  const allMet = requirements.every((r) => r.met);
  const canSubmit = parsed.success && !loading;

  const handleContinue = async () => {
    setTouched({
      correo: true,
      telefono: true,
      password: true,
      confirmPassword: true,
    });
    if (!parsed.success) return;
    setLoading(true);
    setServerError(null);
    try {
      const { exists } = await authApi.checkEmail(correo.trim().toLowerCase());
      if (exists) {
        setServerError("Este correo ya está registrado");
        return;
      }
      onNext({
        correo: correo.trim().toLowerCase(),
        telefono,
        password,
        confirmPassword,
      });
    } catch (e) {
      setServerError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Credenciales de acceso
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Hola,{" "}
          <span className="font-medium text-slate-700">{step1Data.nombre}</span>
          . Define cómo ingresarás al portal.
        </p>
      </div>

      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
          {serverError}
        </div>
      )}

      <div className="space-y-4">
        <Field
          id="correo"
          label="Correo electrónico"
          type="email"
          value={correo}
          onChange={(v) => {
            setCorreo(v);
            setServerError(null);
          }}
          onBlur={() => setTouched((t) => ({ ...t, correo: true }))}
          placeholder="institucional@ejemplo.com"
          leftIcon={<Mail className="h-4.5 w-4.5" />}
          error={fieldErr("correo")}
          autoComplete="email"
        />
        <Field
          id="telefono"
          label="Número de teléfono móvil"
          type="tel"
          value={telefono}
          onChange={setTelefono}
          onBlur={() => setTouched((t) => ({ ...t, telefono: true }))}
          placeholder="809-000-0000"
          leftIcon={<Phone className="h-4.5 w-4.5" />}
          error={fieldErr("telefono")}
          inputMode="tel"
          autoComplete="tel"
        />
        <Field
          id="password"
          label="Contraseña"
          type={showPwd ? "text" : "password"}
          value={password}
          onChange={setPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4.5 w-4.5" />}
          error={touched.password && !allMet ? fieldErr("password") : null}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPwd ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          }
          autoComplete="new-password"
        />

        {/* Password strength (moved below confirmar contraseña) */}

        <Field
          id="confirmPassword"
          label="Confirmar contraseña"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
          onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4.5 w-4.5" />}
          error={fieldErr("confirmPassword")}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label={showConfirm ? "Ocultar" : "Mostrar"}
            >
              {showConfirm ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          }
          autoComplete="new-password"
        />

        {/* Password strength */}
        {password.length > 0 && (
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

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Atrás
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canSubmit}
          className={cn(
            "flex flex-1 items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
            canSubmit
              ? "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
              : "cursor-not-allowed bg-slate-300 shadow-none",
          )}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              Procesando...
            </>
          ) : (
            "Continuar"
          )}
        </button>
      </div>
    </div>
  );
}

// ---- Step 3: KYC via QR (in-app mobile capture)

type KycState =
  | { phase: "creating" }
  | { phase: "qr"; sessionId: string; qrUrl: string }
  | { phase: "otp_sending"; correo: string; password: string }
  | { phase: "otp"; correo: string; password: string }
  | { phase: "logging_in"; correo: string; password: string }
  | { phase: "done" }
  | { phase: "error"; message: string };

// OTP verification form shown after KYC completes
function OtpForm({
  correo,
  onVerified,
  onError,
}: {
  correo: string;
  onVerified: () => void;
  onError: (msg: string) => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(60);

  // Resend countdown
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("Ingresa el código completo de 6 dígitos");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.checkEmailOtp(correo, code.trim());
      if (res.verified) {
        onVerified();
      } else {
        setError("El código es incorrecto. Verifica e intenta nuevamente.");
      }
    } catch (e) {
      setError((e as Error).message ?? "No se pudo verificar el código.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setResendIn(60);
    try {
      await authApi.sendEmailOtp(correo);
    } catch {
      /* silent */
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <Mail className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Confirmación de correo
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Hemos enviado un código de seguridad a<br />
            <span className="font-semibold text-slate-800">{correo}</span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="otp-code"
          className="block text-center text-sm font-medium text-slate-700"
        >
          Ingresa el código de 6 dígitos
        </label>
        <input
          id="otp-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setError(null);
          }}
          placeholder="000000"
          className={cn(
            "block w-full rounded-lg border py-3.5 text-center text-3xl font-bold tracking-[0.5em] text-slate-900 transition-colors focus:outline-none focus:ring-2",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
          )}
        />
        {error && (
          <p className="text-center text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || code.length !== 6}
        className={cn(
          "flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
          !loading && code.length === 6
            ? "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
            : "cursor-not-allowed bg-slate-300 shadow-none",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            Validando código...
          </>
        ) : (
          "Verificar cuenta"
        )}
      </button>

      <div className="text-center text-sm">
        {resendIn > 0 ? (
          <span className="text-slate-500">
            Reenviar código en{" "}
            <span className="font-medium text-slate-700">{resendIn}s</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline focus:outline-none"
          >
            Reenviar código de confirmación
          </button>
        )}
      </div>
    </div>
  );
}

function Step3({
  step1Data,
  step2Data,
  onBack,
}: {
  step1Data: Step1Data;
  step2Data: Step2Data;
  onBack: () => void;
}) {
  const router = useRouter();
  const [state, setState] = useState<KycState>({ phase: "creating" });
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount: create pending KYC session
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const { sessionId } = await authApi.createPendingKycSession({
          primerNombre: step1Data.nombre,
          segundoNombre: step1Data.apellido,
          cedula: step1Data.cedula,
          correo: step2Data.correo,
          telefono: step2Data.telefono,
          password: step2Data.password,
        });

        if (!cancelled) {
          const qrUrl = `${window.location.origin}/kyc-captura?session=${sessionId}`;
          setState({ phase: "qr", sessionId, qrUrl });
        }
      } catch (e) {
        if (!cancelled) {
          setState({ phase: "error", message: (e as Error).message });
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll for verification completion
  useEffect(() => {
    if (state.phase !== "qr") return;
    const { sessionId } = state;

    async function poll() {
      try {
        const res = await authApi.getPendingKycStatus(sessionId);
        if (res.status === "complete") {
          setState({
            phase: "otp_sending",
            correo: step2Data.correo,
            password: step2Data.password,
          });
          return;
        }
        if (res.status === "failed") {
          setState({
            phase: "error",
            message: res.message ?? "La verificación falló. Intenta de nuevo.",
          });
          return;
        }
      } catch {
        /* keep polling */
      }
      pollRef.current = setTimeout(poll, 3000);
    }

    pollRef.current = setTimeout(poll, 3000);
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // Send OTP email
  useEffect(() => {
    if (state.phase !== "otp_sending") return;
    let cancelled = false;
    const { correo, password } = state as {
      phase: "otp_sending";
      correo: string;
      password: string;
    };

    authApi
      .sendEmailOtp(correo)
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setState({ phase: "otp", correo, password });
      });

    return () => {
      cancelled = true;
    };
  }, [state.phase]);

  // Auto-login
  useEffect(() => {
    if (state.phase !== "logging_in") return;
    let cancelled = false;

    async function doLogin() {
      try {
        await authApi.login({
          correo: (state as { correo: string; password: string }).correo,
          password: (state as { correo: string; password: string }).password,
        });
        if (!cancelled) setState({ phase: "done" });
      } catch {
        if (!cancelled) setState({ phase: "done" });
      }
    }
    doLogin();
    return () => {
      cancelled = true;
    };
  }, [state.phase]);

  // Redirect
  useEffect(() => {
    if (state.phase !== "done") return;
    const id = setTimeout(() => router.replace("/login"), 2000);
    return () => clearTimeout(id);
  }, [state.phase, router]);

  if (state.phase === "creating") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-slate-600">
          Generando sesión segura de validación...
        </p>
      </div>
    );
  }

  if (state.phase === "otp_sending") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <Mail className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">
            Identidad validada con éxito
          </p>
          <p className="mt-1.5 text-sm text-slate-500">
            Conectando con el servidor para enviar tu código...
          </p>
        </div>
        <Loader2 className="mt-2 h-5 w-5 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (state.phase === "otp") {
    return (
      <OtpForm
        correo={state.correo}
        onVerified={() =>
          setState({
            phase: "logging_in",
            correo: state.correo,
            password: state.password,
          })
        }
        onError={(msg) => setState({ phase: "error", message: msg })}
      />
    );
  }

  if (state.phase === "logging_in") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-slate-600">
          Configurando tu perfil de usuario...
        </p>
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <div className="space-y-6 py-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-bold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-red-600 hidden" />
            Proceso interrumpido
          </p>
          <p className="mt-1 text-red-700">{state.message}</p>
        </div>
        <button
          onClick={onBack}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none"
        >
          <ChevronLeft className="h-4 w-4" />
          Regresar e intentar nuevamente
        </button>
      </div>
    );
  }

  if (state.phase === "done") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <p className="text-xl font-bold text-slate-900">
            ¡Registro Completado!
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Tu cuenta ha sido creada exitosamente. Te estamos redirigiendo al
            sistema...
          </p>
        </div>
        <Loader2 className="mt-4 h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  // QR phase
  const sessionId = state.phase === "qr" ? state.sessionId : "";
  const qrUrl = state.phase === "qr" ? state.qrUrl : "";

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4 text-center">
        <h2 className="text-lg font-bold text-slate-900">
          Validación de Identidad Digital
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Por regulaciones de seguridad, necesitamos confirmar tu identidad
          escaneando tu documento.
        </p>
      </div>

      {/* QR code Box */}
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <QRCodeSVG
            value={qrUrl}
            size={180}
            fgColor="#0f172a"
            bgColor="#ffffff"
            level="M"
          />
        </div>
        <div className="flex max-w-[250px] items-start gap-2 text-center text-sm font-medium text-slate-700">
          <Smartphone className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>Abre la cámara de tu celular y escanea este código QR.</span>
        </div>
      </div>

      {/* Status Alert */}
      <div className="flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
        <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
        <div className="flex-1">
          <p className="font-semibold text-sky-900">Esperando conexión...</p>
          <p className="mt-0.5 text-sky-700">
            Continúa los pasos en tu dispositivo móvil. Esta pantalla se
            actualizará sola.
          </p>
        </div>
        <Loader2 className="mt-0.5 h-5 w-5 animate-spin text-sky-600" />
      </div>

      <p className="text-center text-xs font-medium text-slate-400">
        <Lock className="inline h-3 w-3 mb-0.5 mr-1" />
        Conexión cifrada de extremo a extremo. Expira en 30 min.
      </p>
    </div>
  );
}

// ---- Main wizard

export default function RegistroPage() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);

  const TOTAL = 3;

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
          <div className="mt-3 flex flex-col items-center gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Paso {step} de {TOTAL}
            </p>
            <StepIndicator current={step} total={TOTAL} />
          </div>
        </div>

        {/* Card Principal */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40">
          <div className="px-6 py-8 sm:px-10">
            {step === 1 && (
              <Step1
                onNext={(data) => {
                  setStep1Data(data);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && step1Data && (
              <Step2
                step1Data={step1Data}
                onNext={(data) => {
                  setStep2Data(data);
                  setStep(3);
                }}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && step1Data && step2Data && (
              <Step3
                step1Data={step1Data}
                step2Data={step2Data}
                onBack={() => setStep(2)}
              />
            )}
          </div>

          {/* Footer de la tarjeta (solo visible en paso 1 y 2 para no romper el flujo KYC) */}
          {step < 3 && (
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center sm:px-10">
              <p className="text-sm text-slate-600">
                ¿Ya tienes una cuenta registrada?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Footer Institucional Exterior */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4" />
          <span>© 2026 Sistema Paso Rápido. Registro Seguro.</span>
        </div>
      </div>
    </div>
  );
}
