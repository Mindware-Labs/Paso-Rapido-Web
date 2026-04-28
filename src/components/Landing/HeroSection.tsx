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
import { ArrowRight, Zap, ShieldCheck, Sparkles } from "lucide-react";

const TRUST = [
  { Icon: Zap, label: "Recargas en segundos" },
  { Icon: ShieldCheck, label: "Transacciones protegidas" },
  { Icon: Sparkles, label: "Siempre disponible" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-50, 50], [5, -5]), { stiffness: 120, damping: 18 });
  const rY = useSpring(useTransform(mx, [-50, 50], [-7, 7]), { stiffness: 120, damping: 18 });
  const tX = useSpring(useTransform(mx, [-50, 50], [-12, 12]), { stiffness: 80, damping: 22 });
  const tY = useSpring(useTransform(my, [-50, 50], [-8, 8]), { stiffness: 80, damping: 22 });

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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(60%_45%_at_72%_18%,rgba(15,157,88,0.10),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-10 sm:px-8 md:grid-cols-12 md:gap-6 md:pb-32 md:pt-24">
        {/* Left — copy */}
        <div className="z-10 flex flex-col gap-8 md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-neutral-700 shadow-[0_1px_2px_rgba(10,10,10,0.04)] backdrop-blur"
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
            className="text-[44px] font-bold leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-[60px] md:text-[68px]"
          >
            Conoce la nueva
            <br />
            APP <span className="pr-accent">Paso Rápido</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-md text-[17px] font-normal leading-[1.55] text-neutral-600"
          >
            Haz de tu vida en la carretera más sencilla y eficiente. Recarga,
            paga y cruza los peajes sin detenerte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/Dashboard"
              className="pr-btn group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold tracking-tight"
            >
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
            className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-neutral-500"
          >
            {TRUST.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e7f7ee] text-[#0f9d58]">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Hand + Phone (dominant visual) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative z-10 flex h-[520px] items-end justify-center md:col-span-7 md:h-[640px]"
          style={{ perspective: 1600 }}
        >
          {/* Atmospheric depth layers */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="pr-aura pr-pulse-soft h-[42rem] w-[42rem] max-w-[110%] rounded-full" />
          </div>

          {/* Far back depth blur */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-[28rem] w-[28rem] max-w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),transparent_70%)]" />
          </div>

          {/* Phone screen ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,157,88,0.35),transparent_70%)] blur-2xl" />

          {/* Realistic floor shadow under the hand */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-0 h-14 w-[26rem] max-w-[70%] -translate-x-1/2">
            <div className="h-full w-full rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.28),transparent_70%)] blur-2xl" />
          </div>

          {/* Floating saldo card */}
          <motion.div
            style={{ x: useTransform(tX, (v) => v * -0.6), y: useTransform(tY, (v) => v * -0.6) }}
            className="pr-float pointer-events-none absolute left-1 top-12 z-30 sm:left-6"
          >
            <div className="pr-glass flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#15a972] to-[#0c8a55] shadow-[0_4px_10px_-2px_rgba(12,138,85,0.4)]">
                <Zap className="h-3.5 w-3.5 fill-white text-white" />
              </span>
              <div className="leading-tight">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-500">Saldo</p>
                <p className="text-sm font-bold text-[#0a0a0a]">RD$ 1,500</p>
              </div>
            </div>
          </motion.div>

          {/* Floating approval card */}
          <motion.div
            style={{ x: useTransform(tX, (v) => v * -0.4), y: useTransform(tY, (v) => v * -0.4) }}
            className="pr-float pointer-events-none absolute right-1 top-36 z-30 sm:right-4"
          >
            <div className="pr-glass flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#e7f7ee]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0f9d58]" strokeWidth={2.4} />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold text-[#0f9d58]">Aprobado</p>
                <p className="text-[11px] text-neutral-600">+ RD$ 500</p>
              </div>
            </div>
          </motion.div>

          {/* Hand + phone — full right side, dominant */}
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
            <Image
              src="/hand.svg"
              alt="Paso Rápido en la mano"
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="select-none object-contain object-bottom drop-shadow-[0_50px_60px_rgba(10,10,10,0.18)]"
              draggable={false}
            />
            {/* Subtle screen-light spill blended onto the hand */}
            <div className="pointer-events-none absolute inset-0 mix-blend-multiply [background:radial-gradient(36%_24%_at_50%_38%,rgba(15,157,88,0.10),transparent_70%)]" />
            {/* Top sheen for global illumination feel */}
            <div className="pointer-events-none absolute inset-0 [background:linear-gradient(180deg,rgba(255,255,255,0.16),transparent_35%)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
