"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  User,
  Users,
  Briefcase,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const TIPOS: { Icon: LucideIcon; title: string; desc: string; slug: string }[] =
  [
    {
      Icon: User,
      title: "Personal",
      desc: "Para el uso de un único vehículo.",
      slug: "personal",
    },
    {
      Icon: Users,
      title: "Familiar",
      desc: "Múltiples vehículos en una sola cuenta asociada.",
      slug: "familiar",
    },
    {
      Icon: Briefcase,
      title: "Pymes",
      desc: "Para pequeñas y medianas empresas con flotas.",
      slug: "pymes",
    },
    {
      Icon: Building2,
      title: "Corporativa",
      desc: "Gestión de flotas para grandes empresas o corporaciones.",
      slug: "corporativa",
    },
  ];

export default function TiposCuenta() {
  return (
    <section id="tipos-cuenta" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-neutral-700 shadow-[0_1px_2px_rgba(10,10,10,0.04)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
            Para cada usuario
          </span>
          <h2 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] sm:text-[52px]">
            Tipos de <span className="pr-accent">cuenta</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-neutral-600">
            Elige el plan que mejor se adapte a ti, a tu familia o a tu flota.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIPOS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.025 }}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-black/6 bg-white p-7 shadow-[0_1px_2px_rgba(10,10,10,0.03),0_18px_40px_-24px_rgba(10,10,10,0.10)] transition-[box-shadow,border-color] duration-500 hover:border-[#0f9d58]/25 hover:shadow-[0_1px_2px_rgba(10,10,10,0.04),0_30px_60px_-24px_rgba(15,157,88,0.22)]"
            >
              {/* Hover gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(15,157,88,0.08),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Soft hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(15,157,88,0.20),transparent_70%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <motion.div
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 280, damping: 16 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f7ee] ring-1 ring-[#0f9d58]/15 transition-[background,ring] duration-500 group-hover:bg-[#d6f0e0] group-hover:ring-[#0f9d58]/30"
              >
                <t.Icon className="h-5 w-5 text-[#0f9d58]" strokeWidth={2} />
              </motion.div>

              <div className="relative flex flex-col gap-2">
                <h3 className="text-[18px] font-semibold tracking-tight text-[#0a0a0a]">
                  Cuenta {t.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-neutral-600">
                  {t.desc}
                </p>
              </div>

              <div className="pr-rule mt-auto" />
              <Link
                href={`/cuentas/${t.slug}`}
                className="relative inline-flex w-fit items-center gap-1.5 rounded-sm text-[12.5px] font-semibold text-[#0f9d58] transition-transform duration-300 group-hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9d58] focus-visible:ring-offset-2"
                aria-label={`Saber más: cuenta ${t.title}`}
              >
                Saber más
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                  className="inline-flex"
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
