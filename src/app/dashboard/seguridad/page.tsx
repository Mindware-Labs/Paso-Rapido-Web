import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Fingerprint,
  Lock,
  Phone,
  Shield,
  UserCheck,
} from "lucide-react";

const TIPS: { t: string; d: string }[] = [
  { t: "Clave única y fuerte", d: "Mínimo 10 caracteres; mezcle letras, números y símbolos. No reutilice la misma clave de su correo u otras webs." },
  { t: "Equipo o PC compartido", d: "Cierre sesión al terminar. En el móvil, active bloqueo con PIN, patrón o biometría." },
  { t: "Correo y recuperación", d: "Ese email es clave para avisos y recuperación. Protéjalo con otra clave sólida." },
];

const FAQ_COMPACT: { q: string; a: string }[] = [
  { q: "¿Me pedirán la clave por WhatsApp?", a: "No. Es suplantación. Use solo el sitio oficial y la app Paso Rápido." },
  { q: "Mensaje o enlace raro", a: "No instale nada. Llame a la línea y compruebe movimientos en su cuenta." },
];

const SIGNALS: string[] = [
  "Diferencia leve al escribir la web (falso dominio).",
  "Urgencia: “cierre hoy o pierde su TAG”.",
  "Piden captura de pantalla de su tarjeta bancaria.",
];

export default function SeguridadPage() {
  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="border-b border-slate-200 pb-8">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Cuenta y acceso
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Seguridad</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            Protege tu cuenta, saldo y telepeaje. Cuida tu clave, el correo y evita el phishing: nadie
            de Paso Rápido pide claves o datos de tarjeta completa por chat o redes.
          </p>
          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200/90 bg-amber-50/70 px-4 py-3.5 text-amber-950/90">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
              strokeWidth={2}
              aria-hidden
            />
            <p className="text-sm leading-relaxed">
              <span className="font-bold text-amber-900">Importante. </span>
              Entre solo por el sitio y la app oficiales. Ignore mensajes con enlaces a “verificar
              cuenta” o “actualizaciones de seguridad” de números desconocidos.
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: Bell,
              t: "Alertas y avisos",
              d: "Pases, recargas y movimientos: notificaciones en la app; en web cuando esté habilitado.",
            },
            { Icon: Fingerprint, t: "Verificación reforzada", d: "Próximamente: un segundo factor al entrar. Lo anunciaremos aquí." },
            { Icon: Phone, t: "Línea de abuso o fraude", d: "809-200-0000. Horario de atención habitual del contact center.", tel: "tel:8092000000" as const },
            { Icon: Lock, t: "Recargas y peajes", d: "Pago vía pasarela certificada. No almacenamos su CVV en nuestros servidores." },
          ].map((item) => {
            const card = (
              <div
                className={[
                  "flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
                  "tel" in item && item.tel ? "transition hover:border-blue-200 hover:shadow-md" : "",
                ].join(" ")}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                  <item.Icon className="h-5 w-5 text-slate-600" strokeWidth={1.75} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">{item.t}</h2>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500">{item.d}</p>
                {"tel" in item && item.tel ? (
                  <span className="mt-3 text-xs font-bold uppercase tracking-wide text-blue-600">
                    Tocar para llamar
                  </span>
                ) : null}
              </div>
            );
            if ("tel" in item && item.tel) {
              return (
                <a
                  key={item.t}
                  href={item.tel}
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                >
                  {card}
                </a>
              );
            }
            return <div key={item.t}>{card}</div>;
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { Icon: Shield, t: "HTTPS", d: "Tráfico cifrado en el portal" },
            { Icon: UserCheck, t: "Cuenta verificada", d: "Vinculada a su registro" },
            { Icon: CheckCircle2, t: "Peajes y saldo", d: "Movimientos con registro" },
          ].map((x) => (
            <div
              key={x.t}
              className="flex gap-3 rounded-2xl border border-emerald-100/90 bg-white px-4 py-3.5 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/80">
                <x.Icon className="h-5 w-5 text-emerald-700" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{x.t}</p>
                <p className="text-xs text-slate-500">{x.d}</p>
              </div>
            </div>
          ))}
        </div>

        <section
          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
          aria-labelledby="signals-h"
        >
          <h2
            id="signals-h"
            className="text-[10px] font-bold uppercase tracking-wider text-slate-500"
          >
            Señales de alerta
          </h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-1 md:grid-cols-3">
            {SIGNALS.map((s) => (
              <li
                key={s}
                className="flex gap-2.5 text-xs leading-relaxed text-slate-600"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                  aria-hidden
                />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2"
            aria-labelledby="tips-h"
          >
            <h2 id="tips-h" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Buenas prácticas
            </h2>
            <ul className="mt-4 space-y-4">
              {TIPS.map((row) => (
                <li
                  key={row.t}
                  className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <p className="text-sm font-bold text-slate-900">{row.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{row.d}</p>
                </li>
              ))}
            </ul>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rápido</h3>
            {FAQ_COMPACT.map((f) => (
              <div key={f.q} className="mt-4 first:mt-3 border-b border-slate-200/80 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-bold text-slate-800">{f.q}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.a}</p>
              </div>
            ))}
            <a
              href="tel:8092000000"
              className="mt-4 flex w-full items-center justify-center rounded-xl border border-blue-200 bg-white py-2.5 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50/50"
            >
              809-200-0000
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
