"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/authApi";
import {
  CheckCircle2,
  RotateCcw,
  Scan,
  Smile,
  XCircle,
  Zap,
  Loader2,
  ChevronRight,
} from "lucide-react";

type SubStep =
  | "front"
  | "back"
  | "id_sending"
  | "selfie"
  | "face_sending"
  | "done"
  | "error";

function CameraCapture({
  label,
  hint,
  facingMode,
  onCapture,
}: {
  label: string;
  hint: string;
  facingMode: "environment" | "user";
  onCapture: (file: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [started, setStarted] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [camError, setCamError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setCamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // playsInline + muted + user gesture allow autoplay
        videoRef.current.muted = true;
        try {
          await videoRef.current.play();
        } catch (e) {
          // play may be blocked until a user gesture; mark error and return
          setCamError(null);
          needGestureRef.current = true;
          return;
        }
        await new Promise((res) => {
          const v = videoRef.current!;
          if (v.readyState >= 2) return res(true);
          v.onloadedmetadata = () => res(true);
        });
      }
      setStarted(true);
    } catch (err) {
      console.error(err);
      setCamError(
        "No se pudo acceder a la cámara. Verifica los permisos del navegador.",
      );
    }
  }, [facingMode]);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const vw = video.videoWidth || video.clientWidth;
    const vh = video.videoHeight || video.clientHeight;
    canvas.width = Math.max(1, Math.floor(vw * dpr));
    canvas.height = Math.max(1, Math.floor(vh * dpr));
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(video, 0, 0, vw, vh);
    ctx.restore();
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = canvas.toDataURL("image/jpeg", 0.95);
        setPreview(url);
        // Stop stream
        streamRef.current?.getTracks().forEach((t) => t.stop());
        setStarted(false);
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        onCapture(file);
      },
      "image/jpeg",
      0.95,
    );
  }, [onCapture]);

  const retry = useCallback(() => {
    setPreview(null);
    startCamera();
  }, [startCamera]);
  const needGestureRef = useRef(false);

  const retry = useCallback(() => {
    setPreview(null);
    needGestureRef.current = false;
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    if (!preview) {
      // attempt to start camera automatically when the component mounts
      startCamera().catch(() => {});
    }
    return () => {
      // cleanup tracks on unmount
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera, preview]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-base font-bold text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">{hint}</p>
      </div>

      {camError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {camError}
        </div>
      )}

      {/* Outer card to mimic mobile design */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
        {/* Camera area */}
        <div className="relative mx-auto max-w-[480px]">
          {/* Inner black frame */}
          <div className="relative overflow-hidden rounded-[28px] bg-black">
            {/* white inner guide */}
            <div className="absolute inset-4 rounded-[20px] border-2 border-white/20 pointer-events-none" />

            {/* Video when started */}
            {started && !preview && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-[68vw] max-h-[560px] object-cover"
              />
            )}

            {/* Placeholder before start or when preview */}
            {!started && !preview && (
              <div className="flex h-[68vw] max-h-[560px] items-center justify-center bg-black">
                <div className="rounded-[18px] border border-white/20 w-[86%] h-[86%]" />
              </div>
            )}

            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Captura"
                className="w-full h-[68vw] max-h-[560px] object-cover"
              />
            )}

            {/* shutter button */}
            <div className="absolute left-1/2 bottom-6 -translate-x-1/2">
              {!preview ? (
                <button
                  onClick={started ? capture : startCamera}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg active:scale-95"
                  aria-label="Tomar foto"
                >
                  <span className="block h-12 w-12 rounded-full bg-emerald-500 border-4 border-white" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={retry}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold"
                  >
                    Repetir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for frame grab */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// ── Inner page (needs useSearchParams) ───────────────────────────────────────

function KycCapturaInner() {
  const params = useSearchParams();
  const sessionId = params.get("session") ?? "";

  const [subStep, setSubStep] = useState<SubStep>("front");
  const [errorMsg, setErrorMsg] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);

  // After front is captured: set front file
  const handleFrontCapture = (file: File) => setFrontFile(file);

  const submitIdVerification = async () => {
    if (!frontFile) return;
    setSubStep("id_sending");
    try {
      const res = await authApi.verifyIdForPending(
        sessionId,
        frontFile,
        backFile ?? undefined,
      );
      if (res.status === "id_verified") {
        setSubStep("selfie");
      } else {
        setErrorMsg(
          res.message ??
            "El documento no pudo ser verificado. Intenta de nuevo.",
        );
        setSubStep("error");
      }
    } catch (e) {
      setErrorMsg((e as Error).message);
      setSubStep("error");
    }
  };

  const submitFaceVerification = async (selfie: File) => {
    setSubStep("face_sending");
    try {
      const res = await authApi.verifyFaceForPending(sessionId, selfie);
      if (res.status === "complete") {
        setSubStep("done");
      } else {
        setErrorMsg(
          res.message ?? "La verificación facial falló. Intenta de nuevo.",
        );
        setSubStep("error");
      }
    } catch (e) {
      setErrorMsg((e as Error).message);
      setSubStep("error");
    }
  };

  if (!sessionId) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
        Enlace inválido. Escanea el código QR nuevamente desde el ordenador.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {[
          { key: "front", label: "Frente" },
          { key: "back", label: "Dorso" },
          { key: "selfie", label: "Selfie" },
        ].map((s, i) => {
          const stepOrder = [
            "front",
            "back",
            "id_sending",
            "selfie",
            "face_sending",
            "done",
          ];
          const current = stepOrder.indexOf(subStep);
          const mine = stepOrder.indexOf(s.key);
          const done = current > mine + (s.key === "back" ? 1 : 0);
          const active =
            s.key === "front"
              ? subStep === "front"
              : s.key === "back"
                ? subStep === "back"
                : subStep === "selfie" || subStep === "face_sending";
          return (
            <div key={s.key} className="flex items-center gap-2">
              {i > 0 && (
                <div
                  className={cn(
                    "h-px w-8 transition-colors",
                    done ? "bg-emerald-400" : "bg-slate-200",
                  )}
                />
              )}
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400"
                      : "bg-slate-100 text-slate-400",
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-emerald-700" : "text-slate-400",
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Front capture ── */}
      {subStep === "front" && (
        <div className="space-y-4">
          <CameraCapture
            label="Frente de la cédula"
            hint="Coloca el frente de tu cédula dentro del recuadro y toma la foto."
            facingMode="environment"
            onCapture={handleFrontCapture}
          />
          {frontFile && (
            <button
              onClick={() => setSubStep("back")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/30 active:scale-95"
            >
              Continuar <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Back capture removed: only front + selfie */}

      {/* ── ID verification in progress ── */}
      {subStep === "id_sending" && (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <Scan className="h-12 w-12 animate-pulse text-emerald-500" />
          <p className="text-sm font-medium text-slate-600">
            Verificando tu documento de identidad…
          </p>
          <p className="text-xs text-slate-400">
            Esto puede tardar unos segundos.
          </p>
        </div>
      )}

      {/* ── Selfie capture ── */}
      {subStep === "selfie" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-800">
              Documento verificado correctamente
            </p>
          </div>
          <CameraCapture
            label="Selfie de verificación"
            hint="Mira directo a la cámara con buena iluminación. Tu rostro debe verse claramente."
            facingMode="user"
            onCapture={submitFaceVerification}
          />
        </div>
      )}

      {/* ── Face verification in progress ── */}
      {subStep === "face_sending" && (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <Smile className="h-12 w-12 animate-pulse text-emerald-500" />
          <p className="text-sm font-medium text-slate-600">
            Verificando tu identidad facial…
          </p>
          <p className="text-xs text-slate-400">
            Esto puede tardar unos segundos.
          </p>
        </div>
      )}

      {/* ── Done ── */}
      {subStep === "done" && (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-11 w-11 text-emerald-600" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              ¡Verificación completada!
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tu identidad fue verificada exitosamente. Puedes cerrar esta
              pestaña — tu cuenta se está creando en el ordenador.
            </p>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {subStep === "error" && (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <XCircle className="h-12 w-12 text-red-500" />
            <div>
              <p className="text-base font-bold text-slate-900">
                Verificación fallida
              </p>
              <p className="mt-1 text-sm text-red-700">{errorMsg}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubStep("front");
              setFrontFile(null);
              setBackFile(null);
              setErrorMsg("");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function KycCapturaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
            <Zap className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Verificación de identidad
          </h1>
          <p className="text-center text-sm text-slate-500">
            Sigue los pasos para verificar tu identidad y completar el registro.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              </div>
            }
          >
            <KycCapturaInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
