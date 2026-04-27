"use client";
import { User, Users, Briefcase, Building2 } from "lucide-react";

const TIPOS = [
  {
    Icon: User,
    title: "Cuenta Personal:",
    desc: "Ideal para el uso de un (1) único vehículo.",
  },
  {
    Icon: Users,
    title: "Cuenta Familiar:",
    desc: "Permite registrar múltiples vehículos en una sola cuenta asociada.",
  },
  {
    Icon: Briefcase,
    title: "Cuenta Pymes:",
    desc: "Diseñada para registrar múltiples vehículos bajo una única cuenta vinculada a una persona jurídica, ideal para pequeñas y medianas empresas.",
  },
  {
    Icon: Building2,
    title: "Cuenta Corporativa:",
    desc: "Permite la gestión de múltiples vehículos bajo una cuenta asociada a una persona jurídica, ideal para grandes empresas o corporaciones.",
  },
];

export default function TiposCuenta() {
  return (
    <section id="tipos-cuenta" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-gray-900">
          Tipos de cuenta:
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {TIPOS.map((t) => (
            <div key={t.title} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <t.Icon className="h-6 w-6 text-emerald-600" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-extrabold text-gray-800">{t.title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}