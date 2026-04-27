"use client";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

const FAQS = [
  "¿Dónde adquirir los kits de Paso Rápido?",
  "Problemas con las recargas a través de Carnet y cuentas corporativas?",
  "¿Cómo hacer reclamaciones?",
  "¿Cómo hacer una solicitud de transferencia de balance y anulación de tag viejo?",
  "¿Cuánto cuesta el kit de Paso Rápido?",
  "¿Cómo agregar un nuevo vehículo a un plan pymes?",
  "¿Cómo solicitar acceso a los videos de los peajes?",
  "¿Cómo recargar el tag con tarjeta de crédito?",
  "¿Cómo solicitar factura con comprobante fiscal?",
  "¿Cómo reclamar el cobro de paso no realizado?",
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Preguntas Frecuentes
        </h2>
        <div className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {FAQS.map((q, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{q}</span>
                <ChevronUp
                  className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                    open === i ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
              {open === i && (
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Para obtener más información sobre este tema, por favor
                    comunícate con nuestro Centro de Servicios o visita nuestras
                    estaciones.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}