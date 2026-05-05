"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#tipos-cuenta", label: "Solicitar Cuenta" },
  { href: "/#estaciones", label: "Estaciones" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-white/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-[#15a972] to-[#0c8a55] shadow-[0_4px_14px_-4px_rgba(15,157,88,0.5)]"
          >
            <Zap className="h-3.5 w-3.5 fill-white text-white" aria-hidden />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-tight text-[#0a0a0a]">
              Paso
            </span>
            <span className="text-[13px] font-bold tracking-tight text-[#0f9d58]">
              Rápido
            </span>
          </div>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 rounded-full border border-black/5 bg-white/60 px-2 py-1.5 backdrop-blur-md"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative rounded-full px-4 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:text-[#0a0a0a]"
              onMouseEnter={() => setHoveredLink(link.label)}
            >
              {hoveredLink === link.label && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-black/6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="pr-btn-ghost inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-semibold tracking-tight text-neutral-800"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="pr-btn inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-semibold tracking-tight"
          >
            Registrarse
          </Link>
        </div>

        <button
          className="md:hidden rounded-lg p-2 text-neutral-700 hover:bg-black/5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-black/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: NAV_LINKS.length * 0.05 }}
              >
                <Link
                  href="/login"
                  className="pr-btn-ghost mt-2 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: NAV_LINKS.length * 0.05 + 0.06,
                }}
              >
                <Link
                  href="/registro"
                  className="pr-btn mt-1 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
