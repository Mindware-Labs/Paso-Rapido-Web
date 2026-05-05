"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const PARTNERS: Partner[] = [
  { name: "BmCargo", src: "/bmcargo.png", width: 140, height: 44 },
  { name: "CardNet", src: "/cardnetnosune.png", width: 140, height: 44 },
  { name: "Farmacia", src: "/farmaciacarol.png", width: 140, height: 44 },
  { name: "Hidalgos", src: "/hidalgos.png", width: 140, height: 44 },
  { name: "Texaco", src: "/texaco.png", width: 140, height: 44 },
];

const LOOP = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function Partners() {
  return (
    <section id="aliados" className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#0f9d58]"
          >
            Adquiere tu kit en
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-[28px] font-bold not-italic leading-[1.1] tracking-tight text-[#0a0a0a] sm:text-[40px]"
          >
            Nuestros aliados comerciales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-[15px] leading-relaxed text-neutral-500 sm:text-[16px]"
          >
            Encuentra tu tag en estos puntos autorizados a nivel nacional.
          </motion.p>
        </div>

        {/* Premium container */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="group relative overflow-hidden rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,#fafbfa_0%,#f4f6f5_100%)] py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(10,10,10,0.03),0_28px_60px_-36px_rgba(15,157,88,0.18)] sm:py-9"
        >
          {/* Soft top highlight */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,157,88,0.07),transparent_70%)]" />

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-[#f4f6f5] via-[#f4f6f5]/80 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-[#f4f6f5] via-[#f4f6f5]/80 to-transparent sm:w-28" />

          {/* Marquee track */}
          <div className="pr-marquee-group relative overflow-hidden">
            <div className="pr-marquee flex w-max items-center gap-3 px-4 sm:gap-5 sm:px-6">
              {LOOP.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="group/logo flex h-22 w-50 shrink-0 items-center justify-center rounded-2xl border border-black/4 bg-white px-6 py-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(10,10,10,0.03),0_10px_24px_-16px_rgba(10,10,10,0.10)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:scale-[1.05] hover:border-black/8 hover:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_2px_4px_rgba(10,10,10,0.05),0_22px_44px_-18px_rgba(15,157,88,0.20)] sm:h-25 sm:w-56"
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={p.width}
                    height={p.height}
                    draggable={false}
                    className="h-auto max-h-full w-auto select-none object-contain opacity-60 brightness-90 grayscale transition-all duration-300 ease-out group-hover/logo:opacity-100 group-hover/logo:brightness-100 group-hover/logo:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Foot note */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 flex items-center justify-center gap-2 text-[12px] text-neutral-400"
        >
          <span className="inline-block h-1 w-1 rounded-full bg-[#0f9d58]" />
          <span>Más de 40 puntos autorizados en todo el país</span>
        </motion.div>
      </div>
    </section>
  );
}
