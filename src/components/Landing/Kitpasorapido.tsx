// KitPasoRapido.tsx
"use client";
import Link from "next/link";

export default function KitPasoRapido() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
        {/* Left – Kit Image Placeholder */}
        <div className="flex items-center justify-center">
          <div className="relative flex h-52 w-64 items-end justify-center sm:h-64 sm:w-80">
            {/* Back card */}
            <div className="absolute left-0 bottom-0 h-44 w-52 -rotate-6 rounded-xl bg-gray-900 shadow-xl sm:h-52 sm:w-60" />
            {/* Front card */}
            <div className="relative z-10 flex h-44 w-52 flex-col justify-between rounded-xl bg-gray-900 p-4 shadow-2xl sm:h-52 sm:w-60">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600">
                  <span className="text-xs font-extrabold text-white">P</span>
                </div>
                <span className="text-xs font-extrabold text-white">Paso Rápido</span>
              </div>
              <div>
                <div className="mb-1 h-6 w-10 rounded-sm bg-yellow-400/80" />
                <p className="text-[10px] font-mono tracking-widest text-gray-400">
                  •••• •••• •••• 4892
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Copy */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Kit Paso Rápido
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Si deseas adquirir un kit prepago Paso Rápido, puedes dirigirte a
            cualquiera de nuestros puntos de venta y comprarlo por tan solo{" "}
            <strong className="text-gray-900">$250 pesos</strong>, esto incluye
            una recarga de <strong className="text-gray-900">$200 pesos</strong>.
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            Para adquirir una cuenta familiar (para más de 2 vehículos) o una
            cuenta corporativa (para más de 5 vehículos) y gestionar tu familia o
            flota con facilidad, solo tienes que comunicarte con el Centro de
            Servicios de Paso Rápido.
          </p>
          <div>
            <Link
              href="/comprar"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}