"use client";

import { motion } from "motion/react";
import type { CuentaSlug } from "@/data/cuentaTipos";
import { cn } from "@/lib/utils";
import { CUENTA_ORBIT_ICONS } from "./cuentaOrbitIcons";
const PLACEMENT = [
  "left-0 top-4 md:-left-1",
  "right-0 top-1/4 md:-right-1",
  "left-1 bottom-16 md:left-0",
  "right-0 bottom-8 md:-right-1",
] as const;

type Props = { slug: CuentaSlug; className?: string };

/**
 * Iconos flotando alrededor de la columna de ilustración (solo ≥ lg).
 */
export default function CuentaTipoOrbitBadges({ slug, className }: Props) {
  const icons = CUENTA_ORBIT_ICONS[slug];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 hidden lg:block", className)}
      aria-hidden
    >
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0f9d58]/12 bg-white/95 text-[#0f9d58] shadow-[0_8px_30px_-12px_rgba(10,10,10,0.15)]",
            "ring-1 ring-black/[0.04] backdrop-blur-sm",
            PLACEMENT[i] ?? "right-4 top-1/2",
          )}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{
            opacity: 1,
            y: [0, -5 - i, 0],
            rotate: [0, i % 2 === 0 ? 2 : -2, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.15 * i },
            y: { duration: 3.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2.8 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </motion.div>
      ))}
    </div>
  );
}
