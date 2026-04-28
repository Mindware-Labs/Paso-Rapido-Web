"use client";

import Link from "next/link";
import { Apple, Play, Zap } from "lucide-react";
import { SiX, SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tipos-cuenta", label: "Solicitar Cuenta" },
  { href: "#estaciones", label: "Estaciones" },
  { href: "#contacto", label: "Contacto" },
  { href: "#faq", label: "Privacidad" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#15a972] to-[#0c8a55] shadow-[0_4px_14px_-4px_rgba(15,157,88,0.5)]">
                <Zap className="h-4 w-4 fill-white text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[13px] font-bold tracking-tight text-[#0a0a0a]">Paso</span>
                <span className="text-[13px] font-bold tracking-tight text-[#0f9d58]">Rápido</span>
              </div>
            </Link>

            <p className="max-w-sm text-[14px] leading-[1.6] text-neutral-500">
              Tu compañero en la carretera. Pasa los peajes sin detenerte y
              gestiona tu balance desde donde estés.
            </p>

            <div className="flex gap-2.5">
              {[
                { Icon: SiFacebook, label: "Facebook" },
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiX, label: "X" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-500 shadow-[0_1px_2px_rgba(10,10,10,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#0f9d58]/30 hover:text-[#0f9d58]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Enlaces
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-neutral-700 transition-colors hover:text-[#0f9d58]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 md:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Descarga la APP
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="#"
                className="group flex h-12 w-48 items-center gap-3 rounded-xl border border-black/5 bg-white px-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#0f9d58]/30 hover:shadow-[0_8px_24px_-8px_rgba(15,157,88,0.18)]"
              >
                <Apple className="h-6 w-6 text-[#0a0a0a]" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500">Disponible en</span>
                  <span className="text-[13px] font-semibold text-[#0a0a0a]">App Store</span>
                </div>
              </Link>
              <Link
                href="#"
                className="group flex h-12 w-48 items-center gap-3 rounded-xl border border-black/5 bg-white px-4 shadow-[0_1px_2px_rgba(10,10,10,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#0f9d58]/30 hover:shadow-[0_8px_24px_-8px_rgba(15,157,88,0.18)]"
              >
                <Play className="h-5 w-5 fill-[#0f9d58] text-[#0f9d58]" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500">Disponible en</span>
                  <span className="text-[13px] font-semibold text-[#0a0a0a]">Google Play</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="pr-rule mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[11.5px] leading-relaxed text-neutral-500">
            © {new Date().getFullYear()} Paso Rápido · Oficina Coordinadora General de Fideicomiso RD VIAL.
          </p>
          <a
            href="tel:+18092220274"
            className="text-[11.5px] font-medium text-[#0f9d58] hover:underline"
          >
            (809) 222-0274.5 / Opción 1
          </a>
        </div>
      </div>
    </footer>
  );
}
