"use client";

import { motion } from "motion/react";
import type { CuentaSlug } from "@/data/cuentaTipos";

const BLOBS: Record<
  CuentaSlug,
  { className: string; size: string; delay: number; duration: number }[]
> = {
  personal: [
    { className: "left-[-12%] top-[8%]", size: "h-72 w-72", delay: 0, duration: 22 },
    { className: "right-[-8%] top-[32%]", size: "h-56 w-56", delay: 2, duration: 18 },
    { className: "left-[18%] bottom-[-10%]", size: "h-64 w-64", delay: 1, duration: 24 },
  ],
  familiar: [
    { className: "right-[-10%] top-[5%]", size: "h-80 w-80", delay: 0, duration: 20 },
    { className: "left-[-6%] top-[40%]", size: "h-52 w-52", delay: 3, duration: 16 },
    { className: "right-[22%] bottom-[-8%]", size: "h-60 w-60", delay: 1, duration: 22 },
  ],
  pymes: [
    { className: "left-[-8%] top-[12%]", size: "h-64 w-64", delay: 0, duration: 19 },
    { className: "right-[-5%] top-[28%]", size: "h-72 w-72", delay: 2, duration: 21 },
    { className: "left-[8%] bottom-[-5%]", size: "h-56 w-56", delay: 0.5, duration: 17 },
  ],
  corporativa: [
    { className: "left-[-10%] top-[6%]", size: "h-70 w-70", delay: 0, duration: 23 },
    { className: "right-[-12%] top-[38%]", size: "h-64 w-64", delay: 1.5, duration: 20 },
    { className: "right-[10%] bottom-[-12%]", size: "h-72 w-72", delay: 2, duration: 18 },
  ],
  gremial: [
    { className: "left-[-6%] top-[4%]", size: "h-76 w-76", delay: 0, duration: 21 },
    { className: "right-[-6%] top-[22%]", size: "h-60 w-60", delay: 2.2, duration: 19 },
    { className: "left-[20%] bottom-[-10%]", size: "h-68 w-68", delay: 1, duration: 24 },
  ],
};

const TINT: Record<CuentaSlug, string> = {
  personal: "bg-cyan-400/25",
  familiar: "bg-emerald-400/20",
  pymes: "bg-amber-400/18",
  corporativa: "bg-slate-500/15",
  gremial: "bg-teal-500/20",
};

type Props = { slug: CuentaSlug };

/**
 * Malla suave y blobs que se mueven lentos (no añade texto, solo profundidad).
 */
export default function CuentaTipoAmbient({ slug }: Props) {
  const blobs = BLOBS[slug];
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 48px,
            rgba(15, 157, 88, 0.03) 48px,
            rgba(15, 157, 88, 0.03) 49px
          )`,
        }}
      />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.size} ${b.className} ${TINT[slug]}`}
          initial={{ opacity: 0.35 }}
          animate={{
            x: [0, i % 2 === 0 ? 18 : -14, 0],
            y: [0, i % 2 === 0 ? -16 : 20, 0],
            scale: [1, 1.05, 1],
            opacity: [0.32, 0.45, 0.32],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
