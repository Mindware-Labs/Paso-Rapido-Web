import {
  AlertTriangle,
  Bell,
  Fingerprint,
  Lock,
  Phone,
  Shield,
  UserCheck,
} from "lucide-react";

const TIPS: { t: string; d: string }[] = [
  { t: "Clave única", d: "10+ caracteres, mezcla de letras, números y símbolos." },
  { t: "Equipo compartido", d: "Cerrar sesión al terminar; bloqueo del teléfono con PIN o huella." },
  { t: "Correo de acceso", d: "Mismo mail que en registro; procura que ese correo esté protegido." },
];

const FAQ_COMPACT: { q: string; a: string }[] = [
  { q: "¿Me pedirán la clave por WhatsApp?", a: "No. Es fraude. Solo use el sitio oficial o la app." },
  { q: "Clonación o SMS raro", a: "No abra enlaces. Llame al número oficial abajo e infórmenos." },
];

export default function SeguridadPage() {
  return (
    <div className="min-h-full bg-slate-50/50 pb-8">
      <div className="w-full space-y-5 px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <header className="border-b border-slate-200 pb-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cuenta y acceso</p>
          <h1 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Seguridad</h1>
          <p className="mt-1.5 max-w-xl text-xs text-slate-500">
            Protege tu cuenta, saldo y TAG. Evita phishing: Paso Rápido no pide claves completas por chat
            ni redes.
          </p>
          <div className="mt-3 flex gap-2 rounded-lg border border-amber-200/80 bg-amber-50/70 px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden />
            <p className="text-[11px] leading-snug text-amber-950/90">
              Acceda solo por el dominio y la app oficiales. No instale “actualizaciones” que lleguen
              por mensaje.
            </p>
          </div>
        </header>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: Bell,
              t: "Alertas y avisos",
              d: "Pases y recargas: desde la app o, cuando esté disponible, notificaciones en el portal.",
            },
            {
              Icon: Fingerprint,
              t: "2FA (próximamente)",
              d: "Segundo factor al iniciar sesión.",
            },
            {
              Icon: Phone,
              t: "Reportar abuso",
              d: "Línea 809-200-0000",
              tel: "tel:8092000000" as const,
            },
            {
              Icon: Lock,
              t: "Pagos",
              d: "Pasarela segura. No guardamos el CVV.",
            },
          ].map((item) => {
            const inner = (
              <div
                className={[
                  "flex h-full flex-col rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm",
                  "tel" in item && item.tel ? "transition hover:border-blue-200" : "",
                ].join(" ")}
              >
                <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-slate-50">
                  <item.Icon className="h-3.5 w-3.5 text-slate-600" strokeWidth={1.75} />
                </div>
                <h2 className="text-xs font-bold text-slate-900">{item.t}</h2>
                <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">{item.d}</p>
              </div>
            );
            if ("tel" in item && item.tel) {
              return (
                <a
                  key={item.t}
                  href={item.tel}
                  className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                >
                  {inner}
                </a>
              );
            }
            return <div key={item.t}>{inner}</div>;
          })}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { Icon: Shield, l: "HTTPS" },
            { Icon: UserCheck, l: "Cuenta identificada" },
            { Icon: Lock, l: "Peajes cifrados" },
          ].map((x) => (
            <div
              key={x.l}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100/90 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-emerald-800 shadow-sm"
            >
              <x.Icon className="h-3 w-3" strokeWidth={1.75} />
              {x.l}
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
          <section
            className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm lg:col-span-2"
            aria-labelledby="tips-h"
          >
            <h2 id="tips-h" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Buenas prácticas
            </h2>
            <ul className="mt-2 space-y-2.5">
              {TIPS.map((row) => (
                <li
                  key={row.t}
                  className="flex gap-2 border-b border-slate-50 pb-2 last:border-0 last:pb-0"
                >
                  <span className="shrink-0 font-bold text-slate-800 tabular-nums">·</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{row.t}</p>
                    <p className="text-[10px] leading-relaxed text-slate-500">{row.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rápido</h3>
            {FAQ_COMPACT.map((f) => (
              <div key={f.q} className="border-b border-slate-200/80 pb-2 last:border-0 last:pb-0">
                <p className="font-bold text-slate-800">{f.q}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">{f.a}</p>
              </div>
            ))}
            <a
              href="tel:8092000000"
              className="mt-1 block rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-center text-[10px] font-bold text-blue-700 shadow-sm"
            >
              809-200-0000
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
