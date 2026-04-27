"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ManualSection() {
  return (
    <section id="estaciones" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl bg-gray-50 p-8 md:grid-cols-2">
          {/* Illustration placeholder */}
          <div className="relative flex items-center justify-center py-6">
            <div className="absolute h-40 w-40 rounded-full bg-emerald-100" />
            <span className="absolute left-8 top-4 text-xl text-gray-300 select-none" aria-hidden>+</span>
            <span className="absolute right-8 top-2 text-xl text-gray-300 select-none" aria-hidden>+</span>
            <span className="absolute bottom-4 left-12 text-xl text-gray-300 select-none" aria-hidden>+</span>
            {/* Simple car SVG */}
            <svg
              viewBox="0 0 120 70"
              className="relative z-10 h-32 w-auto drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="30" width="100" height="28" rx="6" fill="#10b981" />
              <rect x="25" y="16" width="60" height="22" rx="5" fill="#34d399" />
              <rect x="30" y="18" width="25" height="16" rx="3" fill="#bfdbfe" opacity="0.8" />
              <rect x="60" y="18" width="20" height="16" rx="3" fill="#bfdbfe" opacity="0.8" />
              <circle cx="32" cy="58" r="9" fill="#1f2937" />
              <circle cx="32" cy="58" r="4" fill="#6b7280" />
              <circle cx="88" cy="58" r="9" fill="#1f2937" />
              <circle cx="88" cy="58" r="4" fill="#6b7280" />
            </svg>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-gray-900">
              ¿Quieres saber más sobre nosotros?
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Si estás buscando más información sobre Paso Rápido, tenemos
              disponible un manual de usuario que te proporcionará todo lo que
              necesitas saber para comenzar.
            </p>
            <p className="text-sm text-gray-600">
              ¡Explora todas nuestras funcionalidades y simplifica tu
              experiencia!
            </p>
            <div>
              <Link
                href="/manual"
                className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700"
              >
                Ver Manual
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}