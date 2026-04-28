"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, MapPin, MessageCircle, Smartphone, Tag } from "lucide-react";

const quickHighlights = [
  { label: "Kit TAG", icon: Tag, hint: "Dispositivo y recarga" },
  { label: "App móvil", icon: Smartphone, hint: "Cuenta y saldo" },
  { label: "Peajes", icon: MapPin, hint: "Dónde pagar" },
  { label: "Ayuda", icon: MessageCircle, hint: "Soporte y FAQ" },
] as const;

export default function ManualSection() {
  return (
    <section id="estaciones" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[32px] border border-black/5 bg-gradient-to-br from-white via-white to-[#f3fbf6] p-8 shadow-[0_30px_70px_-30px_rgba(15,157,88,0.18),0_1px_2px_rgba(10,10,10,0.04)] md:grid-cols-2 md:p-14"
        >
          {/* Soft accents */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.16),transparent_60%)] blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.08),transparent_60%)] blur-3xl" />

          {/* Illustration */}
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.16),transparent_60%)] blur-2xl pr-pulse-soft" />
            </div>

            <svg
              viewBox="0 0 320 200"
              className="relative z-10 h-56 w-full max-w-sm drop-shadow-[0_20px_30px_rgba(15,157,88,0.18)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#18b87a" />
                  <stop offset="100%" stopColor="#0c8a55" />
                </linearGradient>
                <linearGradient id="topG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#0f9d58" />
                </linearGradient>
              </defs>

              <ellipse cx="160" cy="180" rx="120" ry="6" fill="rgba(10,10,10,0.12)" filter="blur(6px)" />

              <rect x="40" y="100" width="240" height="58" rx="14" fill="url(#bodyG)" />
              <path d="M70 100 Q90 60 130 56 L210 56 Q250 60 270 100 Z" fill="url(#topG)" />

              <rect x="90" y="68" width="60" height="28" rx="6" fill="white" opacity="0.55" />
              <rect x="160" y="68" width="55" height="28" rx="6" fill="white" opacity="0.55" />

              <circle cx="80" cy="160" r="20" fill="#0a0a0a" />
              <circle cx="80" cy="160" r="9" fill="#525252" />
              <circle cx="240" cy="160" r="20" fill="#0a0a0a" />
              <circle cx="240" cy="160" r="9" fill="#525252" />

              <circle cx="58" cy="120" r="3" fill="#fde68a" />
              <circle cx="262" cy="120" r="3" fill="#fca5a5" />
            </svg>

            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 right-6 z-20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#15a972] to-[#0c8a55] shadow-[0_10px_24px_-8px_rgba(15,157,88,0.5)]">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="relative flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-700 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
              Manual de usuario
            </span>

            <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] sm:text-[44px]">
              Guía y manual
              <br />
              <span className="pr-accent">Paso a paso</span>
            </h2>

            <p className="max-w-md text-[15.5px] leading-relaxed text-neutral-600">
              Resumen visual: qué traer, cómo usar la app y dónde recargar — sin
              papeleos de más.
            </p>

            <ul className="grid max-w-md grid-cols-2 gap-3 sm:grid-cols-4 sm:max-w-none">
              {quickHighlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * i, duration: 0.45 }}
                    className="group flex flex-col gap-1.5 rounded-2xl border border-black/[0.06] bg-white/80 px-3 py-3 text-center shadow-sm backdrop-blur-sm sm:text-left"
                  >
                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f9d58]/10 to-[#0f9d58]/5 sm:mx-0">
                      <Icon className="h-4 w-4 text-[#0b7a45]" aria-hidden />
                    </span>
                    <span className="text-xs font-semibold text-[#0a0a0a]">{item.label}</span>
                    <span className="text-[10.5px] leading-tight text-neutral-500 sm:block">
                      {item.hint}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="pt-1">
              <Link
                href="/manual"
                className="pr-btn group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight"
              >
                Abrir guía completa
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
