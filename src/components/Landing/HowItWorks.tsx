"use client";

import { motion } from "motion/react";
import {
  Download,
  UserPlus,
  CreditCard,
  Car,
  type LucideIcon,
} from "lucide-react";

const STEPS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Download,
    title: "Descarga la App",
    desc: "Disponible en iOS y Android.",
  },
  {
    Icon: UserPlus,
    title: "Crea tu cuenta",
    desc: "Regístrate y añade tus vehículos.",
  },
  {
    Icon: CreditCard,
    title: "Recarga tu balance",
    desc: "Elige tu método y recarga al instante.",
  },
  {
    Icon: Car,
    title: "¡Pasa sin detenerte!",
    desc: "Cruza los peajes con total libertad.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-700 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
            Cuatro pasos
          </span>
          <h2 className="mt-5 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] sm:text-[52px]">
            Así de fácil es <span className="pr-accent">empezar</span>.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-8.5 hidden h-px md:block">
            <div className="h-px w-full bg-linear-to-r from-transparent via-black/10 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.3,
              }}
              style={{ originX: 0 }}
              className="absolute inset-0 h-px bg-linear-to-r from-[#0f9d58]/0 via-[#0f9d58]/60 to-[#0f9d58]/0"
            />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.14,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="relative flex flex-col items-center gap-5 text-center"
              >
                <motion.div className="relative" whileHover="hovered">
                  {/* Ambient glow */}
                  <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.18),transparent_70%)] blur-xl pr-pulse-soft" />

                  {/* Icon box */}
                  <motion.div
                    variants={{
                      hovered: {
                        scale: 1.12,
                        rotate: [0, -6, 6, -3, 0],
                        transition: { duration: 0.4, ease: "easeInOut" },
                      },
                    }}
                    className="relative flex h-17 w-17 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_-12px_rgba(10,10,10,0.15)] transition-shadow duration-500 hover:shadow-[0_10px_30px_-8px_rgba(15,157,88,0.25)]"
                  >
                    <s.Icon
                      className="h-5 w-5 text-[#0f9d58]"
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  {/* Step number badge */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                      delay: 0.3 + i * 0.14,
                    }}
                    className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0a] text-[10px] font-bold text-white shadow-md"
                  >
                    {i + 1}
                  </motion.span>
                </motion.div>

                <div className="flex max-w-50 flex-col gap-1.5">
                  <h3 className="text-[15px] font-semibold tracking-tight text-[#0a0a0a]">
                    {s.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-neutral-500">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
