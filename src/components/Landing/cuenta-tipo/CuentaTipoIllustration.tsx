"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { CuentaSlug } from "@/data/cuentaTipos";

type Theme = {
  frame: string;
  glow: string;
};

const THEME: Record<CuentaSlug, Theme> = {
  personal: {
    frame: "from-[#e8f5f0] via-white to-[#d4eef3]",
    glow: "rgba(15, 157, 88, 0.12)",
  },
  familiar: {
    frame: "from-[#f0f7ed] via-white to-[#e8f2e4]",
    glow: "rgba(22, 163, 98, 0.14)",
  },
  pymes: {
    frame: "from-[#fff8ed] via-white to-[#f0f9f4]",
    glow: "rgba(180, 120, 40, 0.1)",
  },
  corporativa: {
    frame: "from-[#e8ece9] via-white to-[#dfe8e3]",
    glow: "rgba(12, 80, 60, 0.12)",
  },
  gremial: {
    frame: "from-[#e6f0ed] via-white to-[#e8e4f2]",
    glow: "rgba(15, 120, 100, 0.11)",
  },
};

const VB = "0 0 400 260";

/** Evita estirar el dibujo: caja con aspecto fijo = al viewBox (400×260). */
function SvgFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px] shrink-0 aspect-[400/260]">
      <svg
        viewBox={VB}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 block h-full w-full"
        overflow="hidden"
      >
        {children}
      </svg>
    </div>
  );
}

function SvgPersonal({ id }: { id: string }) {
  return (
    <SvgFrame>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4eef3" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-road`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d58" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0c8a55" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`${id}-car`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#18b87a" />
          <stop offset="100%" stopColor="#0c6b44" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
        </filter>
      </defs>
      <rect x="0" y="0" width="400" height="160" fill={`url(#${id}-sky)`} />
      <ellipse cx="320" cy="55" rx="36" ry="22" fill="#fff5e6" opacity="0.7" />
      <ellipse cx="320" cy="58" rx="28" ry="16" fill="#ffe8a8" opacity="0.35" />
      <path
        d="M0 175 Q200 168 400 172 L400 260 L0 260 Z"
        fill="rgba(15,157,88,0.04)"
      />
      <rect x="40" y="180" width="320" height="36" rx="6" fill={`url(#${id}-road)`} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={58 + i * 42} y="198" width="22" height="3" rx="1" fill="white" opacity="0.55" />
      ))}
      <ellipse cx="140" cy="198" rx="48" ry="6" fill="#0a0a0a" opacity="0.07" filter={`url(#${id}-soft)`} />
      <g>
        <motion.g
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M78 152h108c8 0 15 4 19 11l12 17h-58l-8-10H95l-8 10H38l19-25c4-7 12-13 21-13z"
            fill={`url(#${id}-car)`}
            opacity="0.96"
          />
          <rect x="100" y="128" width="64" height="28" rx="4" fill="#0a0a0a" opacity="0.18" />
          <path d="M140 128h16v8c0 2-1 3-3 3h-10c-2 0-3-1-3-3v-8z" fill="#0a0a0a" opacity="0.25" />
        </motion.g>
        <circle cx="95" cy="184" r="12" fill="#1a1a1a" />
        <circle cx="95" cy="184" r="5" fill="#e8e8e8" />
        <circle cx="185" cy="184" r="12" fill="#1a1a1a" />
        <circle cx="185" cy="184" r="5" fill="#e8e8e8" />
      </g>
      <motion.g
        style={{ transformOrigin: "260px 146px" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="260"
          cy="146"
          r="58"
          fill="none"
          stroke="#0f9d58"
          strokeWidth="2"
          strokeDasharray="8 10"
          opacity="0.4"
        />
      </motion.g>
      <motion.circle
        cx="260"
        cy="146"
        r="7"
        fill="#0f9d58"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </SvgFrame>
  );
}

function SvgFamiliar({ id }: { id: string }) {
  const nodes = [
    { cx: 120, cy: 120, r: 26 },
    { cx: 200, cy: 72, r: 22 },
    { cx: 280, cy: 120, r: 26 },
    { cx: 200, cy: 200, r: 30 },
  ];
  return (
    <SvgFrame>
      <defs>
        <linearGradient id={`${id}-n`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#18b87a" />
          <stop offset="100%" stopColor="#0f9d58" />
        </linearGradient>
        <radialGradient id={`${id}-hub`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f9d58" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0f9d58" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="90" fill={`url(#${id}-hub)`} />
      <g stroke="#0f9d58" strokeWidth="1.2" fill="none" opacity="0.32">
        <path d="M200 200 L120 120" strokeLinecap="round" />
        <path d="M200 200 L280 120" strokeLinecap="round" />
        <path d="M200 200 L200 80" strokeLinecap="round" />
        <path d="M200 200 L200 200" strokeOpacity="0" />
        <path d="M120 120 L200 80" strokeOpacity="0.2" />
        <path d="M280 120 L200 80" strokeOpacity="0.2" />
      </g>
      {nodes.map((c, i) => (
        <g key={i} transform={`translate(${c.cx}, ${c.cy})`}>
          <circle r={c.r + 5} fill="none" stroke="#0f9d58" strokeWidth="1" opacity="0.12" />
          <motion.g
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle r={c.r} fill="white" stroke={`url(#${id}-n)`} strokeWidth="2.5" />
            <circle r={c.r * 0.32} fill="#0f9d58" opacity="0.18" />
            <circle r="3" fill="#0f9d58" opacity="0.6" />
          </motion.g>
        </g>
      ))}
    </SvgFrame>
  );
}

function SvgPymes({ id }: { id: string }) {
  return (
    <SvgFrame>
      <defs>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b84a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0f9d58" stopOpacity="0.55" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect x="32" y="200" width="336" height="2" fill="#0a0a0a" opacity="0.04" />
      <path d="M48 205h8v6h-8zM188 205h8v6h-8zM328 205h8v6h-8z" fill="#0f9d58" opacity="0.2" />
      {[0, 1, 2].map((i) => {
        const tx = 80 + i * 100;
        return (
          <g key={i} transform={`translate(${tx}, 100)`}>
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
            >
              <rect x={-32} y={-18} width="64" height="36" rx="7" fill="#0a0a0a" opacity="0.06" />
              <rect x={-20} y={-28} width="40" height="12" rx="2" fill={`url(#${id}-v)`} filter={`url(#${id}-sh)`} />
              <rect x={-32} y={-10} width="64" height="22" rx="4" fill="#0d7d4d" opacity="0.92" />
              <rect x={-24} y={-4} width="48" height="8" rx="1" fill="#0a0a0a" opacity="0.12" />
              <circle cx={-16} cy={20} r="6.5" fill="#1a1a1a" />
              <circle cx={16} cy={20} r="6.5" fill="#1a1a1a" />
              <circle cx={-16} cy={20} r="2" fill="#555" />
              <circle cx={16} cy={20} r="2" fill="#555" />
            </motion.g>
          </g>
        );
      })}
    </SvgFrame>
  );
}

function SvgCorporativa() {
  return (
    <SvgFrame>
      <defs>
        <linearGradient id="corp-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d58" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a3d28" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="corp-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="100" y1="205" x2="300" y2="205" stroke="#0a0a0a" strokeWidth="1.2" strokeOpacity="0.06" />
      {[
        { x: 110, w: 55, h: 120, lines: 4 },
        { x: 180, w: 55, h: 90, lines: 3 },
        { x: 250, w: 55, h: 140, lines: 5 },
      ].map((b, i) => (
        <g key={i}>
          <motion.g
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 3.2 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect
              x={b.x - 1}
              y={199 - b.h - 1}
              width={b.w + 2}
              height={2}
              fill="#0a0a0a"
              opacity="0.04"
            />
            <rect
              x={b.x}
              y={200 - b.h}
              width={b.w}
              height={b.h}
              rx="5"
              fill="url(#corp-glass)"
              stroke="#0a0a0a"
              strokeOpacity="0.1"
              strokeWidth="1.2"
            />
            {i === 1 && (
              <rect x={b.x + b.w * 0.2} y={200 - b.h - 6} width={b.w * 0.6} height="4" rx="1" fill="url(#corp-cap)" />
            )}
            {Array.from({ length: b.lines }).map((_, j) => (
              <rect
                key={j}
                x={b.x + 7}
                y={200 - b.h + 12 + j * 20}
                width={b.w - 14}
                height="2.2"
                fill="#0f9d58"
                opacity={0.18 + (j % 2) * 0.08}
                rx="0.5"
              />
            ))}
            <line x1={b.x} y1={200} x2={b.x + b.w} y2={200} stroke="#0f9d58" strokeWidth="1.2" strokeOpacity="0.25" />
          </motion.g>
        </g>
      ))}
      <rect x="90" y="38" width="220" height="3" fill="#0f9d58" opacity="0.25" rx="1" />
      <circle cx="200" cy="32" r="2.5" fill="#0f9d58" opacity="0.35" />
    </SvgFrame>
  );
}

function SvgGremial() {
  const nodes = [
    { cx: 200, cy: 50, r: 11 },
    { cx: 100, cy: 120, r: 9 },
    { cx: 300, cy: 120, r: 9 },
    { cx: 200, cy: 200, r: 13 },
    { cx: 80, cy: 200, r: 7.5 },
    { cx: 320, cy: 200, r: 7.5 },
  ];
  return (
    <SvgFrame>
      <defs>
        <filter id="glow-node">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        fill="none"
        stroke="#0f9d58"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.28"
      >
        <path d="M200 50 L100 120" />
        <path d="M200 50 L300 120" />
        <path d="M200 200 L100 120" />
        <path d="M200 200 L300 120" />
        <path d="M100 120 L80 200" />
        <path d="M300 120 L320 200" />
      </g>
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.cx}, ${n.cy})`}>
          <circle r={n.r + 4} fill="none" stroke="#0f9d58" strokeWidth="0.8" opacity="0.2" />
          <motion.g
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.2 + (i % 3) * 0.15, repeat: Infinity, delay: i * 0.1 }}
          >
            <circle
              r={n.r}
              fill="white"
              stroke="#0f9d58"
              strokeWidth="2"
              filter={i % 2 === 0 ? "url(#glow-node)" : undefined}
            />
            <circle r={n.r * 0.4} fill="#0f9d58" opacity="0.1" />
          </motion.g>
        </g>
      ))}
      <circle cx="200" cy="130" r="40" fill="none" stroke="#0f9d58" strokeWidth="1" strokeOpacity="0.1" />
      <motion.g
        animate={{ opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="200" cy="130" r="22" fill="#0f9d58" opacity="0.1" />
      </motion.g>
    </SvgFrame>
  );
}

type Props = {
  slug: CuentaSlug;
};

export default function CuentaTipoIllustration({ slug }: Props) {
  const t = THEME[slug];
  const uid = `art-${slug}`;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-br p-5 shadow-[0_18px_50px_-28px_rgba(10,10,10,0.2)] sm:p-6 ${t.frame}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl sm:h-40 sm:w-40"
        style={{ background: t.glow }}
      />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
      <div className="flex items-center justify-center py-1">
        {slug === "personal" && <SvgPersonal id={uid} />}
        {slug === "familiar" && <SvgFamiliar id={uid} />}
        {slug === "pymes" && <SvgPymes id={uid} />}
        {slug === "corporativa" && <SvgCorporativa />}
        {slug === "gremial" && <SvgGremial />}
      </div>
    </motion.div>
  );
}
