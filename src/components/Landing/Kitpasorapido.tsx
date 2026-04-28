"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, ShoppingCart, Sparkles } from "lucide-react";

const BENEFITS = [
  { title: "Recarga inicial", desc: "RD$ 200 incluidos al activar" },
  { title: "Multi-vehículo", desc: "Válido para múltiples vehículos" },
  { title: "Gestión total", desc: "Controla todo desde la App" },
  { title: "Soporte 24/7", desc: "Atención personalizada cuando la necesites" },
];

export default function KitPasoRapido() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="pr-feature-card group relative overflow-hidden rounded-[36px] p-8 sm:p-12 md:p-16"
        >
          {/* Inner radial glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.12),transparent_60%)] blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.06),transparent_60%)] blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-12">
            {/* Left — layered cards */}
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.18),transparent_60%)] blur-2xl" />
              </div>

              <div className="relative h-72 w-80 sm:h-80 sm:w-96">
                {/* Back card */}
                <motion.div
                  initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
                  whileInView={{ rotate: -14, x: -36, y: 22, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute left-8 top-10 h-44 w-72 overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-white to-neutral-100 shadow-[0_30px_60px_-30px_rgba(10,10,10,0.18)]"
                >
                  <div className="absolute inset-0 [background:radial-gradient(circle_at_top_right,rgba(15,157,88,0.06),transparent_60%)]" />
                </motion.div>

                {/* Front card */}
                <motion.div
                  whileHover={{ rotate: 3, y: -10, scale: 1.025 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="pr-float relative z-10 flex h-48 w-72 flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-[#0f9d58] via-[#0c8a55] to-[#075f3b] p-5 text-white shadow-[0_30px_60px_-20px_rgba(15,157,88,0.45),inset_0_1px_0_rgba(255,255,255,0.18)]"
                >
                  <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />

                  <div className="relative flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 ring-1 ring-white/30 backdrop-blur">
                      <span className="text-xs font-bold">P</span>
                    </div>
                    <span className="text-[13px] font-semibold tracking-tight">Paso Rápido</span>
                  </div>

                  <div className="relative">
                    <div className="mb-2 h-7 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-amber-400 shadow-inner" />
                    <p className="font-mono text-[11px] tracking-[0.3em] text-white/70">
                      •••• •••• •••• 4892
                    </p>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/60">
                      Prepaid · RD
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right — copy */}
            <div className="flex flex-col gap-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-neutral-700 shadow-[0_1px_2px_rgba(10,10,10,0.04)] backdrop-blur">
                <Sparkles className="h-3 w-3 text-[#0f9d58]" />
                Kit prepago
              </span>

              <h2 className="text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] sm:text-[52px]">
                Todo lo que necesitas,
                <br />
                <span className="pr-accent">en un solo kit.</span>
              </h2>

              <p className="max-w-md text-[16px] leading-[1.55] text-neutral-600">
                Adquiere tu kit prepago por solo{" "}
                <span className="font-semibold text-[#0a0a0a]">RD$ 250</span> e
                incluye una recarga inicial de{" "}
                <span className="font-semibold text-[#0a0a0a]">RD$ 200</span>.
                Listo para usar.
              </p>

              <ul className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BENEFITS.map((b, i) => (
                  <motion.li
                    key={b.title}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7f7ee] ring-1 ring-[#0f9d58]/20">
                      <Check className="h-3.5 w-3.5 text-[#0f9d58]" strokeWidth={3} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[14px] font-semibold text-[#0a0a0a]">{b.title}</p>
                      <p className="mt-0.5 text-[13px] text-neutral-500">{b.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="pt-3">
                <Link
                  href="#tipos-cuenta"
                  className="pr-btn group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold tracking-tight"
                >
                  Comprar Ahora
                  <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
