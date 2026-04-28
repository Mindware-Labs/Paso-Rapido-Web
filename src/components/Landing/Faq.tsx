"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "¿Dónde adquirir los kits de Paso Rápido?",
    a: "Puedes adquirirlo en cualquiera de nuestros puntos de venta autorizados (Carol, CardNet, Hidalgos, Axgen, BmCargo) o directamente en nuestras estaciones.",
  },
  {
    q: "¿Cómo agregar un nuevo vehículo a un plan pymes?",
    a: "Desde la app, ingresa a tu cuenta pymes y selecciona 'Agregar vehículo'. Necesitarás los datos del vehículo y la matrícula.",
  },
  {
    q: "¿Problemas con las recargas a través de Carnet y cuentas corporativas?",
    a: "Comunícate con nuestro Centro de Servicios o utiliza el chat en línea para resolver problemas con recargas.",
  },
  {
    q: "¿Cómo solicitar acceso a los videos de los peajes?",
    a: "Las solicitudes se gestionan a través del Centro de Servicios mediante una solicitud formal.",
  },
  {
    q: "¿Cómo hacer reclamaciones?",
    a: "Puedes hacer reclamaciones desde la app en la sección 'Soporte' o llamando al (809) 222-0274.",
  },
  {
    q: "¿Cómo recargar el tag con tarjeta de crédito?",
    a: "Desde la app selecciona 'Recargar Balance', elige 'Tarjeta de Crédito' e ingresa los datos. La recarga es inmediata.",
  },
  {
    q: "¿Cómo solicitar transferencia de balance y anulación de tag viejo?",
    a: "Solicita la transferencia desde el Centro de Servicios presentando tu identificación y los tags involucrados.",
  },
  {
    q: "¿Cómo solicitar factura con comprobante fiscal?",
    a: "En la app, ingresa a 'Mis Recargas' y selecciona la opción 'Solicitar NCF' en la transacción correspondiente.",
  },
  {
    q: "¿Cuánto cuesta el kit de Paso Rápido?",
    a: "El kit prepago tiene un costo de RD$ 250 e incluye una recarga inicial de RD$ 200.",
  },
  {
    q: "¿Cómo reclamar el cobro de paso no realizado?",
    a: "Levanta una reclamación desde la app o el Centro de Servicios indicando la fecha y peaje específico.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-neutral-700 shadow-[0_1px_2px_rgba(10,10,10,0.04)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
            Preguntas frecuentes
          </span>
          <h2 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a0a0a] sm:text-[52px]">
            Resolvemos tus <span className="pr-accent">dudas</span>.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-neutral-600">
            Lo más consultado por nuestros usuarios. Si necesitas más, contáctanos.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-[#0f9d58]/25 shadow-[0_1px_2px_rgba(10,10,10,0.03),0_24px_48px_-28px_rgba(15,157,88,0.25)]"
                    : "border-black/[0.06] shadow-[0_1px_2px_rgba(10,10,10,0.03)] hover:border-black/15 hover:shadow-[0_1px_2px_rgba(10,10,10,0.04),0_18px_40px_-28px_rgba(10,10,10,0.10)]"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-[15.5px] font-semibold tracking-tight transition-colors ${
                      isOpen ? "text-[#0a0a0a]" : "text-neutral-800"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-[#0f9d58] text-white shadow-[0_4px_10px_-2px_rgba(15,157,88,0.5)]"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-[14.5px] leading-[1.6] text-neutral-600">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
