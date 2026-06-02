/**
 * Utilidades de formato compartidas en el portal.
 * Extraído de páginas que duplicaban `formatCurrency` (vehículos, histórico, …).
 */

/** Moneda dominicana: `RD$ 1,234.00`. */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  })
    .format(amount)
    .replace("DOP", "RD$");
}

/** Variante compacta para KPIs grandes: `RD$ 1.2 M`, `RD$ 45.0 K`. */
export function formatCurrencyCompact(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) return `RD$ ${(amount / 1_000_000).toFixed(1)} M`;
  if (abs >= 10_000) return `RD$ ${(amount / 1_000).toFixed(1)} K`;
  return formatCurrency(amount);
}

/** Número con separadores de miles en `es-DO`. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-DO").format(value);
}

/**
 * Fecha ISO (`2026-05-12`) → `12 may 2026`. Acepta también datetime ISO.
 * Devuelve la entrada original si no es parseable.
 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Periodo `2026-05` → `Mayo 2026`. */
export function formatPeriodo(periodo: string): string {
  const [year, month] = periodo.split("-");
  const idx = Number(month) - 1;
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  if (idx < 0 || idx > 11) return periodo;
  return `${meses[idx]} ${year}`;
}
