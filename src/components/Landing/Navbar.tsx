"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tipos-cuenta", label: "Solicitar Cuenta" },
  { href: "#estaciones", label: "Estaciones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo - Versión con Zap */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Zap
              className="h-4 w-4 fill-white text-white"
              aria-hidden
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-extrabold text-emerald-600 tracking-tight">Paso</span>
            <span className="text-sm font-extrabold text-emerald-600 tracking-tight">Rápido</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/registro"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
          >
            Registrarse
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 shadow-md">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/registro"
              className="mt-1 inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Registrarse
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}