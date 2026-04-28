import Link from "next/link";
import { Check, ListChecks, Lightbulb, Sparkles } from "lucide-react";
import type { CuentaSlug, CuentaTipoContent } from "@/data/cuentaTipos";
import { CUENTA_PAGE_THEME, CUENTA_RESUMEN_FILAS } from "@/data/cuentaTipos";
import BackToLanding from "@/components/Landing/BackToLanding";
import CuentaTipoIllustration from "@/components/Landing/cuenta-tipo/CuentaTipoIllustration";
import { cn } from "@/lib/utils";

type Props = { slug: CuentaSlug; data: CuentaTipoContent };

export default function CuentaTipoDetail({ slug, data }: Props) {
  const theme = CUENTA_PAGE_THEME[slug];

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2">
        <BackToLanding href="/" label="Volver al inicio" />
        <Link
          href="/#tipos-cuenta"
          className="text-[13px] font-medium text-neutral-500 underline-offset-2 transition-colors hover:text-[#0f9d58] hover:underline"
        >
          Tipos de cuenta
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-neutral-700 shadow-[0_1px_2px_rgba(10,10,10,0.04)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f9d58]" />
            Cuenta Paso Rápido
          </span>

          <h1 className="mt-5 text-balance text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0a0a0a] sm:text-[40px]">
            Cuenta <span className="pr-accent">{data.shortTitle}</span>
          </h1>
          <p className="mt-4 text-[16px] leading-[1.55] text-neutral-600">{data.tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#0a0a0a]">{data.forWho}</p>

          <div
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-[13px] font-medium",
              theme.introChip,
            )}
          >
            <span className="text-neutral-500">Vehículos orientativos:</span>
            <span className="font-semibold text-[#0a0a0a]">{data.vehicleRange}</span>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-3">
            {data.stats.map((s) => (
              <li
                key={s.label}
                className={cn(
                  "flex flex-col rounded-2xl border border-black/[0.06] p-3.5 shadow-sm",
                  theme.statIcon,
                )}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-80">
                  {s.label}
                </span>
                <span className="mt-1.5 text-[15px] font-bold leading-tight tracking-tight">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("lg:sticky lg:top-24", "ring-1 rounded-[1.35rem] ring-inset", theme.ring)}>
          <CuentaTipoIllustration slug={slug} />
        </div>
      </div>

      <div className="pr-rule my-12 sm:my-14" />

      <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Ideal si</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {data.ideal.map((line) => (
          <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-[#0a0a0a]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e7f7ee] text-[#0f9d58]">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            {line}
          </li>
        ))}
      </ul>

      {data.overlapNote ? (
        <p className="mt-8 rounded-2xl border border-[#0f9d58]/20 bg-[#0f9d58]/[0.06] p-4 text-[14px] leading-relaxed text-neutral-800">
          {data.overlapNote}
        </p>
      ) : null}

      <h2 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Ventajas</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {data.advantages.map((line) => (
          <li
            key={line}
            className="pl-4 text-[15px] leading-relaxed text-neutral-600 [border-l-2] border-[#0f9d58]/30"
          >
            {line}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-12 rounded-3xl border border-black/[0.06] bg-white/90 p-7 shadow-[0_1px_2px_rgba(10,10,10,0.04)] sm:p-8",
        )}
      >
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[#0a0a0a]">
          <ListChecks className="h-5 w-5 text-[#0f9d58]" strokeWidth={2} aria-hidden />
          Qué suele incluir
        </h2>
        <p className="mt-1 text-[13.5px] text-neutral-500">Orientación según el tipo de cuenta (producto y región).</p>
        <ul className="mt-5 flex flex-col gap-3">
          {data.includes.map((line) => (
            <li
              key={line}
              className="flex gap-3 text-[14.5px] leading-relaxed text-neutral-700 [text-wrap:pretty]"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f9d58]"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-black/10 bg-neutral-50/60 p-6 sm:p-7">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[#0a0a0a]">
          <Sparkles className="h-5 w-5 text-[#0f9d58]" strokeWidth={2} aria-hidden />
          Más en detalle
        </h2>
        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-700 [text-wrap:pretty]">
          {data.moreDetails.map((p) => (
            <li key={p} className="pl-0">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "mt-10 border-l-4 pl-5 sm:pl-6 [text-wrap:pretty]",
          "rounded-r-2xl bg-gradient-to-r from-white to-neutral-50/50 py-6",
          theme.quoteFrom,
        )}
      >
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[#0a0a0a]">
          <Lightbulb className="h-5 w-5 text-[#0f9d58]" strokeWidth={2} aria-hidden />
          {data.differentiatorTitle}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">{data.differentiatorBody}</p>
      </div>

      <div
        className={cn(
          "mt-10 overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-br from-white to-neutral-50/30 p-7 shadow-[0_1px_2px_rgba(10,10,10,0.03),0_18px_40px_-24px_rgba(10,10,10,0.10)] sm:p-8",
        )}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0f9d58]">{data.example.title}</p>
        <p className="mt-2 text-[16px] font-medium leading-relaxed text-neutral-800 sm:text-[17px]">
          {data.example.body}
        </p>
      </div>

      <h2 className="mt-16 text-[18px] font-semibold tracking-tight text-[#0a0a0a]">Comparar tipos de cuenta</h2>
      <p className="mt-2 text-[14px] text-neutral-600">Resumen rápido de cantidad de vehículos y perfil de usuario.</p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/[0.06] bg-white/90 shadow-sm">
        <table className="w-full min-w-[320px] border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-black/[0.06] bg-neutral-50/80">
              <th className="px-4 py-3 font-semibold text-[#0a0a0a]">Tipo</th>
              <th className="px-4 py-3 font-semibold text-[#0a0a0a]">Vehículos</th>
              <th className="px-4 py-3 font-semibold text-[#0a0a0a]">Usuario ideal</th>
            </tr>
          </thead>
          <tbody>
            {CUENTA_RESUMEN_FILAS.map((row) => {
              const isCurrent = row.slug === slug;
              return (
                <tr
                  key={row.slug}
                  className={
                    isCurrent
                      ? "bg-[#0f9d58]/[0.08] [box-shadow:inset_3px_0_0_#0f9d58]"
                      : "border-b border-black/[0.04] last:border-0"
                  }
                >
                  <td className="px-4 py-3 font-medium text-[#0a0a0a]">
                    {isCurrent ? (
                      row.tipo
                    ) : (
                      <Link
                        href={`/cuentas/${row.slug}`}
                        className="text-[#0f9d58] underline-offset-2 hover:underline"
                      >
                        {row.tipo}
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{row.cantidad}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.ideal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pr-rule my-12" />
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/registro"
          className="pr-btn inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold sm:w-auto"
        >
          Crear cuenta
        </Link>
        <Link
          href="/#tipos-cuenta"
          className="pr-btn-ghost inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold sm:w-auto"
        >
          Ver otras cuentas
        </Link>
        <Link
          href="/#contacto"
          className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[14px] font-medium text-[#0f9d58] sm:w-auto"
        >
          Contacto
        </Link>
      </div>
    </div>
  );
}
