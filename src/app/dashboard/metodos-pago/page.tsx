"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Star,
  Trash2,
  Edit2,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
  CircleDollarSign,
  Banknote,
  MoreHorizontal,
  CreditCard,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaymentMethod {
  id: string;
  name: string;
  holder: string;
  lastDigits: string;
  expiry: string;
  brand: string;
  isDefault: boolean;
  brandColor: string;
  brandBg: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm1",
    name: "Visa Platinum",
    holder: "Carlos Martínez",
    lastDigits: "4892",
    expiry: "12/2027",
    brand: "Visa",
    isDefault: true,
    brandColor: "text-[#1A1F71]",
    brandBg: "bg-[#1A1F71]/8",
  },
  {
    id: "pm2",
    name: "Mastercard Gold",
    holder: "Carlos Martínez",
    lastDigits: "3155",
    expiry: "08/2026",
    brand: "Mastercard",
    isDefault: false,
    brandColor: "text-[#EB001B]",
    brandBg: "bg-[#EB001B]/8",
  },
  {
    id: "pm3",
    name: "American Express",
    holder: "Carlos Martínez",
    lastDigits: "7291",
    expiry: "03/2028",
    brand: "Amex",
    isDefault: false,
    brandColor: "text-[#006FCF]",
    brandBg: "bg-[#006FCF]/8",
  },
  {
    id: "pm4",
    name: "Visa Classic",
    holder: "Carlos Martínez",
    lastDigits: "1103",
    expiry: "05/2025",
    brand: "Visa",
    isDefault: false,
    brandColor: "text-[#1A1F71]",
    brandBg: "bg-[#1A1F71]/8",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MetodosPagoPage() {
  const [methods] = useState(PAYMENT_METHODS);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState<"all" | "Visa" | "Mastercard" | "Amex">("all");

  const filteredMethods = useMemo(() => {
    return methods.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.lastDigits.includes(searchTerm) ||
        m.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = filterBrand === "all" ? true : m.brand === filterBrand;
      return matchesSearch && matchesBrand;
    });
  }, [searchTerm, filterBrand]);

 

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col bg-[#F8F9FB] overflow-hidden">
      <div className="flex-1 mx-auto max-w-6xl w-full space-y-5 px-6 py-6 sm:px-8 overflow-hidden flex flex-col">
        {/* ── Header ── */}
        <div className="shrink-0 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Mi cuenta</p>
            <h1 className="text-xl font-bold text-gray-900">Métodos de pago</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 transition-all active:scale-95">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Agregar tarjeta
          </button>
        </div>

      
        {/* ── Filtros ── */}
        <div className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tarjeta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-9 pr-3 text-[11px] text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          
        </div>

        {/* ── Listado ── */}
        <section className="shrink-0 flex-1 min-h-0 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {filteredMethods.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {filteredMethods.map((m) => {
                  const menuOpen = openMenuId === m.id;

                  return (
                    <div
                      key={m.id}
                      className={`group relative flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50/50 transition-colors ${
                        m.isDefault ? "bg-gradient-to-r from-emerald-50/30 to-white" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${m.brandBg}`}>
                          <CreditCard className={`h-4 w-4 ${m.brandColor}`} strokeWidth={1.75} />
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[13px] font-semibold text-gray-900">{m.name}</p>
                            {m.isDefault && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800">
                                <BadgeCheck className="h-2.5 w-2.5" />
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
                            •••• {m.lastDigits} · Vence {m.expiry} · {m.holder}
                          </p>
                        </div>
                      </div>

                      <div className="relative shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(menuOpen ? null : m.id);
                          }}
                          className="rounded p-1 text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-500 transition-all"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>

                        {menuOpen && (
                          <div className="absolute right-0 top-8 w-40 rounded-lg border border-gray-100 bg-white shadow-xl py-1 z-30">
                            {!m.isDefault && (
                              <button
                                onClick={() => setOpenMenuId(null)}
                                className="w-full flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50"
                              >
                                <Star className="h-3 w-3 text-amber-500" strokeWidth={2} />
                                Hacer principal
                              </button>
                            )}
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="w-full flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <Edit2 className="h-3 w-3 text-gray-400" strokeWidth={1.75} />
                              Editar
                            </button>
                            {!m.isDefault && (
                              <>
                                <div className="mx-3 my-0.5 h-px bg-gray-100" />
                                <button
                                  onClick={() => setOpenMenuId(null)}
                                  className="w-full flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-medium text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3" strokeWidth={1.75} />
                                  Eliminar
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Sin resultados</h3>
                <p className="mt-1 text-xs text-gray-500">No hay tarjetas con esos filtros.</p>
                <button
                  onClick={() => { setSearchTerm(""); setFilterBrand("all"); }}
                  className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Límites ── */}
        <section className="shrink-0">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Límites y condiciones de recarga</h2>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-lg border border-gray-100 bg-white p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.75} />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Mínimo</p>
              </div>
              <p className="text-sm font-bold text-gray-900">RD$ 100.00</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Banknote className="h-3.5 w-3.5 text-blue-500" strokeWidth={1.75} />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Máximo diario</p>
              </div>
              <p className="text-sm font-bold text-gray-900">RD$ 10,000</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.75} />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Comisión</p>
              </div>
              <p className="text-sm font-bold text-gray-900">Sin comisión</p>
            </div>
          </div>
        </section>

        {/* ── Seguridad ── */}
        <div className="shrink-0 flex items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50/60 to-white px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-100">
            <ShieldCheck className="h-4 w-4 text-blue-600" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-gray-900">Pagos seguros</p>
            <p className="text-[11px] text-gray-500">Tus datos están encriptados. No almacenamos CVV.</p>
          </div>
          <Link
            href="/dashboard/ayuda"
            className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700"
          >
            Saber más
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {openMenuId && (
        <div className="fixed inset-0 z-20" onClick={() => setOpenMenuId(null)} />
      )}
    </div>
  );
}