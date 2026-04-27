import Link from "next/link";
import {
  CarFront,
  ChevronRight,
  History,
  Info,
  ListOrdered,
  MapPinned,
  Megaphone,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

const MOCK_BAL = "RD$ 1,250.00";
const MOCK_LAST_RECHARGE = "RD$ 500.00";
const MOCK_LAST_PASS = "RD$ -100.00";

const QUICK = [
  {
    href: "/vehiculos",
    label: "Vehículos",
    blurb: "Placas, TAG y estado; mismo flujo que en app.",
    Icon: CarFront,
  },
  {
    href: "/historico",
    label: "Movimientos",
    blurb: "Cargos y recargas; misma data que en app, lista extendida en web.",
    Icon: ListOrdered,
  },
  {
    href: "/peajes",
    label: "Peajes",
    blurb: "Mapa, tarifas y consejos de conducción por corredor.",
    Icon: MapPinned,
  },
  {
    href: "/historico",
    label: "Historial",
    blurb: "Transacciones y pases; en web, vista de lista con filtros (maqueta).",
    Icon: History,
  },
] as const;

const ACTIVITY = [
  {
    id: "1",
    title: "Peaje Las Américas",
    detail: "Hoy · 08:42",
    amount: "RD$ -100.00",
    out: true,
  },
  {
    id: "2",
    title: "Recarga Superpagos",
    detail: "Ayer · 16:10",
    amount: "RD$ +500.00",
    out: false,
  },
  {
    id: "3",
    title: "Peaje La Victoria",
    detail: "Lun · 07:15",
    amount: "RD$ -100.00",
    out: true,
  },
];

const NEWS = [
  {
    id: "n1",
    kicker: "Infraestructura",
    title: "Horario extendido en peajes del corredor norte",
    Icon: Info,
    accent: "#1D8C57",
  },
  {
    id: "n2",
    kicker: "Aviso importante",
    title: "Mantén saldo mínimo de RD$ 100.00 en tu TAG",
    Icon: ShieldAlert,
    accent: "#D97706",
  },
  {
    id: "n3",
    kicker: "Promoción",
    title: "Recarga con tarjeta: 5% de bono hasta el 30 de mayo",
    Icon: Megaphone,
    accent: "#2563EB",
  },
];

export default function Home() {
  return (
    <div className="pr-grain min-h-0">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <section
          className="pr-reveal relative overflow-hidden rounded-2xl bg-pr-hero p-4 text-pr-on-hero shadow-xl shadow-pr-hero-glow sm:p-6"
          aria-labelledby="resumen-cuenta"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/5"
            aria-hidden
          />
          <div className="relative z-[1] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1
                id="resumen-cuenta"
                className="text-base font-extrabold sm:text-lg"
              >
                Hola, <span className="text-white">invitado</span>
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-300"
                  aria-hidden
                />
                TAG activo
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-4">
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  Saldo disponible
                </p>
                <p className="text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
                  {MOCK_BAL}
                </p>
                <p className="mt-1 max-w-md text-sm leading-snug text-white/80">
                  En la app, este bloque es el mismo; en web añadimos
                  explicación: aquí verás un resumen al iniciar sesión
                  (próximamente).
                </p>
              </div>
              <div
                className="hidden w-px shrink-0 bg-white/20 sm:block"
                aria-hidden
              />
              <div className="grid flex-1 gap-3 sm:min-w-[200px]">
                <div className="flex gap-2">
                  <TrendingUp
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/65"
                    strokeWidth={2.5}
                  />
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-white/60">
                      Recarga
                    </p>
                    <p className="text-sm font-bold">{MOCK_LAST_RECHARGE}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <TrendingDown
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/65"
                    strokeWidth={2.5}
                  />
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-white/60">
                      Último pase
                    </p>
                    <p className="text-sm font-bold">{MOCK_LAST_PASS}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1 rounded-2xl border border-white/20 bg-black/10 px-3 py-3 sm:flex sm:items-center sm:justify-between sm:px-4">
              <p className="text-xs font-bold text-white/90">
                En la app: desliza para recargar. En web, el CTA directo:
              </p>
              <Link
                href="/recargar"
                className="mt-2 inline-flex items-center justify-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-pr-hero shadow sm:mt-0"
              >
                Ir a recargar
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="pr-reveal pr-reveal-delay-1 space-y-4"
          aria-labelledby="accesos"
        >
          <div className="flex items-end justify-between gap-2 px-0.5">
            <h2
              id="accesos"
              className="text-lg font-extrabold tracking-tight text-pr-foreground"
            >
              Accesos rápidos
            </h2>
            <Zap className="hidden h-5 w-5 text-pr-hero/30 sm:block" />
          </div>
          <p className="max-w-2xl text-sm text-pr-foreground/80">
            Misma estructura que en la app (cuatro acciones), con texto de
            apoyo que solo tiene sentido en pantallas grandes.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="group flex flex-col gap-2 rounded-2xl border border-pr-border bg-pr-card p-4 shadow-sm transition hover:border-pr-hero/40 hover:shadow-md"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-pr-secondary text-pr-hero"
                  style={{ color: "var(--pr-hero)" }}
                >
                  <a.Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-extrabold text-pr-foreground">
                  {a.label}
                </span>
                <span className="text-xs leading-relaxed text-pr-foreground/75">
                  {a.blurb}
                </span>
                <span className="pt-1 text-xs font-bold text-pr-hero group-hover:underline">
                  Abrir
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="actividad"
          className="pr-reveal pr-reveal-delay-2 scroll-mt-24 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
            <h2 className="text-lg font-extrabold text-pr-foreground">
              Actividad reciente
            </h2>
            <Link
              className="text-sm font-bold text-pr-hero hover:underline"
              href="/#actividad"
            >
              Ver todo
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-pr-border bg-pr-card">
            {ACTIVITY.map((item, i) => (
              <div key={item.id}>
                <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      item.out ? "bg-red-500/10" : "bg-pr-secondary"
                    }`}
                  >
                    {item.out ? (
                      <TrendingDown
                        className="h-4 w-4 text-pr-destructive"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <TrendingUp
                        className="h-4 w-4 text-pr-hero"
                        strokeWidth={2.5}
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-pr-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs font-semibold text-pr-muted-fg">
                      {item.detail}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-extrabold ${
                      item.out ? "text-pr-destructive" : "text-pr-hero"
                    }`}
                  >
                    {item.amount}
                  </p>
                </div>
                {i < ACTIVITY.length - 1 && (
                  <div className="h-px bg-pr-border/70 ml-[3.25rem] sm:ml-16" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section
          id="novedades"
          className="pr-reveal pr-reveal-delay-3 scroll-mt-24 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
            <h2 className="text-lg font-extrabold text-pr-foreground">
              Novedades
            </h2>
            <span className="text-sm text-pr-muted-fg">
              Blog / avisos ampliado vs. móvil
            </span>
          </div>
          <ul className="space-y-2">
            {NEWS.map((n) => (
              <li
                key={n.id}
                className="flex items-start gap-3 rounded-2xl border border-pr-border bg-pr-card p-4"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${n.accent}18` }}
                >
                  <n.Icon
                    className="h-6 w-6"
                    style={{ color: n.accent }}
                    strokeWidth={1.75}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] font-extrabold uppercase tracking-wide"
                    style={{ color: n.accent }}
                  >
                    {n.kicker}
                  </p>
                  <p className="text-sm font-bold leading-snug text-pr-foreground">
                    {n.title}
                  </p>
                  <p className="mt-1 text-xs text-pr-foreground/70">
                    Toca la app para notificaciones push; aquí, lectura
                    relajada y enlace a ayuda.
                  </p>
                </div>
                <ChevronRight
                  className="mt-1 h-4 w-4 shrink-0 text-pr-muted-fg"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
