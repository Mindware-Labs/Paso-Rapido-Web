"use client";
import Link from "next/link";
import { SiX, SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons';

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/solicitar-cuenta", label: "Solicitar Cuenta" },
  { href: "/estaciones", label: "Estaciones" },
  { href: "/contacto", label: "Contacto" },
  { href: "/privacidad", label: "Privacidad" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo + Nav */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600">
                <span className="text-xs font-extrabold text-white">P</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-extrabold text-emerald-600">Paso</span>
                <span className="text-xs font-extrabold text-emerald-600">Rápido</span>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-4 gap-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-emerald-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Social */}
            <div className="flex gap-3">
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <SiFacebook className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <SiInstagram className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="X (Twitter)" className="text-gray-400 hover:text-emerald-600 transition-colors">
                <SiX className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* App Badges */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500">Descarga la APP</p>
            <div className="flex flex-col gap-2">
              <div className="flex h-9 w-28 items-center justify-center rounded-lg bg-gray-900 px-3">
                <span className="text-[10px] font-bold text-white">App Store</span>
              </div>
              <div className="flex h-9 w-28 items-center justify-center rounded-lg bg-gray-900 px-3">
                <span className="text-[10px] font-bold text-white">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-4">
          <p className="text-center text-[10px] leading-snug text-gray-400">
            Oficina Coordinadora General de Fideicomiso RD VIAL. Caja Presidente González, esq. Tiradentes. 3er
            nivel edificio La Cumbre avs. Naco, Santo Domingo, R.D. Tel:{" "}
            <a href="tel:+18092220274" className="text-emerald-600 hover:underline">
              (809) 222-0274.5
            </a>{" "}
            / Opción 1
          </p>
        </div>
      </div>
    </footer>
  );
}