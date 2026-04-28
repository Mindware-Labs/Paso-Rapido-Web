/**
 * Separador solo gráfico (sin copy) para dar ritmo visual en páginas de tipo de cuenta.
 */
export default function CuentaTipoGraphicSpacer() {
  return (
    <div className="my-8 flex flex-col items-center gap-4 sm:my-10" aria-hidden>
      <svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        className="text-[#0f9d58]/35"
        role="presentation"
      >
        <path
          d="M0 10 Q25 4 50 10 T100 10 T150 10 T200 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="100" cy="10" r="3" fill="currentColor" opacity="0.5" />
      </svg>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-[#0f9d58]"
            style={{ opacity: 0.12 + (i % 4) * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
