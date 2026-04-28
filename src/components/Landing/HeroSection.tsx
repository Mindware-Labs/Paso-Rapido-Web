"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Car,
  PieChart,
  Headphones,
} from "lucide-react";

const TRUST = [
  { Icon: Zap, title: "Recargas", subtitle: "en segundos" },
  { Icon: ShieldCheck, title: "Transacciones", subtitle: "protegidas" },
  { Icon: CheckCircle2, title: "Siempre", subtitle: "disponible" },
];

const FEATURES = [
  {
    Icon: Wallet,
    title: "Todo en un solo lugar",
    desc: "Gestiona tu balance, recargas y movimientos desde la App.",
  },
  {
    Icon: Car,
    title: "Válido para múltiples vehículos",
    desc: "Una cuenta, todos tus vehículos.",
  },
  {
    Icon: PieChart,
    title: "Control total",
    desc: "Historial de transacciones claras y detalladas.",
  },
  {
    Icon: Headphones,
    title: "Soporte 24/7",
    desc: "Estamos aquí para ayudarte cuando lo necesites.",
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-50, 50], [4, -4]), { stiffness: 120, damping: 18 });
  const rY = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 120, damping: 18 });
  const tX = useSpring(useTransform(mx, [-50, 50], [-10, 10]), { stiffness: 80, damping: 22 });
  const tY = useSpring(useTransform(my, [-50, 50], [-6, 6]), { stiffness: 80, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Wide hero radial glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[52rem] bg-[radial-gradient(58%_46%_at_72%_22%,rgba(15,157,88,0.12),transparent_70%)]" />
      {/* Faint right-side decorative arcs */}
      <div className="pointer-events-none absolute right-0 top-32 hidden h-[36rem] w-[36rem] rounded-full border border-[#0f9d58]/8 md:block" />
      <div className="pointer-events-none absolute -right-16 top-44 hidden h-[24rem] w-[24rem] rounded-full border border-[#0f9d58]/10 md:block" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 md:pb-16 md:pt-14">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-6">
          {/* LEFT — copy (≈42%) */}
          <div className="z-10 flex flex-col gap-7 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0f9d58]/15 bg-[#e7f7ee]/70 px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-[#0f7a45] shadow-[0_1px_2px_rgba(15,157,88,0.06)] backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0f9d58] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
              </span>
              Nueva versión disponible
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-[44px] font-bold not-italic leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-[58px] md:text-[64px]"
            >
              Conoce la nueva
              <br />
              APP <span className="pr-accent">Paso Rápido</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-md text-[16px] font-normal not-italic leading-[1.6] text-neutral-500"
            >
              Haz de tu vida en la carretera más sencilla y eficiente. Recarga,
              paga y cruza los peajes sin detenerte.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-1 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/Dashboard"
                className="pr-btn group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold tracking-tight"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <Zap className="h-3 w-3 fill-white text-white" />
                </span>
                Recargar Balance
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#tipos-cuenta"
                className="pr-btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold tracking-tight text-neutral-800"
              >
                Ver cuentas
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-3 grid grid-cols-3 gap-3 sm:gap-4"
            >
              {TRUST.map(({ Icon, title, subtitle }) => (
                <div
                  key={title}
                  className="flex items-center gap-2.5 rounded-2xl bg-white/70 px-3 py-2.5 ring-1 ring-black/5 backdrop-blur"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f7ee] text-[#0f9d58]">
                    <Icon className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[12px] font-semibold text-[#0a0a0a]">{title}</p>
                    <p className="text-[11px] text-neutral-500">{subtitle}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Hand + Phone (≈58%) — dominant visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative z-10 mr-[-6%] flex h-150 items-end justify-end md:col-span-7 md:mr-[-10%] md:h-210 lg:mr-[-14%] lg:h-220"
            style={{ perspective: 1600 }}
          >
            {/* Wide soft green aura */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-176 w-176 max-w-[120%] rounded-full bg-[radial-gradient(closest-side,rgba(15,157,88,0.18),rgba(15,157,88,0.06)_45%,transparent_72%)] blur-2xl" />
            </div>

            {/* Ambient white fog */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-120 w-120 max-w-[88%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),transparent_70%)] blur-2xl" />
            </div>

            {/* Phone screen ambient green spill */}
            <div className="pointer-events-none absolute left-[58%] top-[44%] z-5 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,157,88,0.32),transparent_70%)] blur-3xl" />

            {/* Realistic floor shadow under the hand */}
            <div className="pointer-events-none absolute bottom-4 left-[55%] z-0 h-16 w-md max-w-[70%] -translate-x-1/2">
              <div className="h-full w-full rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.22),transparent_70%)] blur-2xl" />
            </div>

            {/* Floating SALDO badge (top-left of phone) */}
            <motion.div
              style={{ x: useTransform(tX, (v) => v * -0.6), y: useTransform(tY, (v) => v * -0.6) }}
              className="pr-float pointer-events-none absolute left-[2%] top-[14%] z-30 sm:left-[6%]"
            >
              <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(10,10,10,0.04),0_18px_44px_-18px_rgba(10,10,10,0.18)] ring-1 ring-black/4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f9d58] shadow-[0_4px_10px_-2px_rgba(12,138,85,0.45)]">
                  <Zap className="h-4 w-4 fill-white text-white" />
                </span>
                <div className="leading-tight">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                    Saldo
                  </p>
                  <p className="text-[14px] font-bold text-[#0a0a0a]">RD$ 1,500</p>
                </div>
              </div>
            </motion.div>

            {/* Floating APROBADO badge (right side, below middle) */}
            <motion.div
              style={{ x: useTransform(tX, (v) => v * -0.4), y: useTransform(tY, (v) => v * -0.4) }}
              className="pr-float pointer-events-none absolute right-[2%] top-[42%] z-30 sm:right-[4%]"
            >
              <div className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(10,10,10,0.04),0_18px_44px_-18px_rgba(10,10,10,0.18)] ring-1 ring-black/4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f7ee]">
                  <ShieldCheck className="h-4 w-4 text-[#0f9d58]" strokeWidth={2.4} />
                </span>
                <div className="leading-tight">
                  <p className="text-[12px] font-semibold text-[#0f9d58]">Aprobado</p>
                  <p className="text-[11px] text-neutral-500">+ RD$ 500</p>
                </div>
              </div>
            </motion.div>

            {/* Hand + phone — full right side, dominant, fades into bottom-right */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              style={{
                rotateX: rX,
                rotateY: rY,
                transformStyle: "preserve-3d",
              }}
              className="pr-float relative z-20 h-full w-full"
            >
              {/* Blurred copy of the image, only visible at bottom-right — softens the cut-off */}
              <Image
                src="/hand-phone.png"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="pointer-events-none select-none object-contain object-bottom opacity-70 blur-2xl"
                draggable={false}
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 80% 85%, #000 0%, #000 25%, transparent 70%)",
                  maskImage:
                    "radial-gradient(circle at 80% 85%, #000 0%, #000 25%, transparent 70%)",
                }}
              />
              {/* Crisp main image, masked so the bottom-right fades to transparent */}
              <Image
                src="/hand-phone.png"
                alt="Mano sosteniendo el teléfono con la app Paso Rápido"
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="select-none object-contain object-bottom"
                draggable={false}
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 30% 32%, #000 48%, rgba(0,0,0,0.93) 1%, rgba(0,0,0,0.35) 100%, transparent 1%)",
                  maskImage:
                    "radial-gradient(circle at 30% 32%, #000 48%, rgba(0,0,0,0.93) 1%, rgba(0,0,0,0.35) 100%, transparent 1%)",
                }}
              />
              {/* Soft white wash on the bottom-right to fully blend into the page */}
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_99%_at_99%_105%,rgba(255,255,255,0.9),transparent_100%)]" />
              {/* Subtle screen-light spill blended onto the hand */}
              <div className="pointer-events-none absolute inset-0 mix-blend-multiply [background:radial-gradient(36%_24%_at_52%_40%,rgba(15,157,88,0.10),transparent_70%)]" />
              {/* Top sheen for global illumination feel */}
              <div className="pointer-events-none absolute inset-0 [background:linear-gradient(180deg,rgba(255,255,255,0.16),transparent_35%)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom feature row — full-width white card with 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative z-30 -mt-4 rounded-[28px] border border-black/6 bg-white px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(10,10,10,0.04),0_30px_60px_-30px_rgba(10,10,10,0.10)] sm:px-7 sm:py-7 md:-mt-32 md:px-9 md:py-8 lg:-mt-40"
        >
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4 md:gap-6 lg:gap-8">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f7ee] text-[#0f9d58]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-tight text-[#0a0a0a]">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
