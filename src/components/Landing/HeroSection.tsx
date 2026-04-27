"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        {/* Left Column – Copy */}
        <div className="flex flex-col gap-6 z-10">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Conoce la nueva{" "}
            <span className="text-emerald-600">APP</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-gray-500">
            Haz de tu vida en la carretera más sencilla y eficiente con la nueva
            actualización de la App de Paso Rápido.
          </p>
          <div>
            <Link
              href="/Dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95"
            >
              Recargar Balance
            </Link>
          </div>
        </div>

        {/* Right Column – Phone Mockup */}
        <div className="relative flex items-center justify-center">
          {/* Background blob */}
          <div
            className="absolute h-72 w-72 rounded-full bg-emerald-100/80 sm:h-80 sm:w-80"
            aria-hidden
          />

          {/* Decorative + signs */}
          <span className="absolute left-4 top-4 text-gray-300 font-light text-2xl select-none" aria-hidden>+</span>
          <span className="absolute right-4 top-8 text-gray-300 font-light text-2xl select-none" aria-hidden>+</span>
          <span className="absolute bottom-6 right-10 text-gray-300 font-light text-2xl select-none" aria-hidden>+</span>

          {/* Phone Frame */}
          <div className="relative z-10 w-52 sm:w-60">
            <div className="overflow-hidden rounded-[2rem] border-4 border-gray-800 bg-gray-900 shadow-2xl">
              {/* Notch */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1.5 w-16 rounded-full bg-gray-700" />
              </div>

              {/* Screen Content */}
              <div className="bg-white px-4 pb-6 pt-3">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">Balance</span>
                  <div className="h-4 w-4 rounded-full border border-gray-300" />
                </div>

                {/* Balance Card */}
                <div className="rounded-xl bg-emerald-600 p-3 text-white shadow-sm">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-100">
                    Saldo disponible
                  </p>
                  <p className="mt-0.5 text-xl font-extrabold">RD$ 1,500</p>
                  <p className="mt-0.5 text-[9px] text-emerald-200">Balance</p>
                </div>

                {/* Recharge prompt */}
                <div className="mt-3 rounded-lg bg-gray-50 p-2.5">
                  <p className="text-[9px] text-gray-600 leading-snug">
                    ¿Cómo quieres proceder con tu recarga?
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-emerald-600">RD$ 1,500</p>
                  <p className="text-[8px] text-gray-400">Balance</p>
                </div>

                {/* Button */}
                <button className="mt-3 w-full rounded-lg bg-emerald-600 py-2 text-[10px] font-bold text-white">
                  Recargar balance
                </button>
                <p className="mt-1.5 text-center text-[8px] text-gray-400">
                  Registrar balance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}