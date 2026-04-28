"use client";

import { motion } from "motion/react";

const PARTNERS = ["Carol", "CardNet", "Hidalgos", "Axgen", "BmCargo"];

export default function Partners() {
  return (
    <section id="contacto" className="relative pb-12 pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500"
        >
          Adquiere tu kit en
        </motion.p>

        <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-5">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              className="group relative flex h-12 w-full items-center justify-center transition-opacity"
            >
              <span className="text-[15px] font-semibold tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-[#0a0a0a]">
                {p}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="pr-rule mx-auto mt-12 max-w-3xl" />
      </div>
    </section>
  );
}
