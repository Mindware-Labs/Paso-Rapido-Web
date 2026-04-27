// Partners.tsx
"use client";

const PARTNERS = ["Carol", "CardNet", "Hidalgos", "Axgen", "BmCargo"];

export default function Partners() {
  return (
    <section id="contacto" className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-sm font-semibold text-gray-500">
          Adquiere tu kit en:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {PARTNERS.map((p) => (
            <div
              key={p}
              className="flex h-10 min-w-[80px] items-center justify-center rounded-lg bg-gray-100 px-4"
            >
              <span className="text-xs font-bold text-gray-500">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}