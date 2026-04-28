import type { CuentaSlug } from "@/data/cuentaTipos";

type Theme = {
  frame: string;
  glow: string;
};

const THEME: Record<CuentaSlug, Theme> = {
  personal: {
    frame: "from-[#e8f5f0] via-white to-[#d4eef3]",
    glow: "rgba(15, 157, 88, 0.12)",
  },
  familiar: {
    frame: "from-[#f0f7ed] via-white to-[#e8f2e4]",
    glow: "rgba(22, 163, 98, 0.14)",
  },
  pymes: {
    frame: "from-[#fff8ed] via-white to-[#f0f9f4]",
    glow: "rgba(180, 120, 40, 0.1)",
  },
  corporativa: {
    frame: "from-[#e8ece9] via-white to-[#dfe8e3]",
    glow: "rgba(12, 80, 60, 0.12)",
  },
  gremial: {
    frame: "from-[#e6f0ed] via-white to-[#e8e4f2]",
    glow: "rgba(15, 120, 100, 0.11)",
  },
};

function SvgPersonal({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full max-w-[min(100%,22rem)]" aria-hidden>
      <defs>
        <linearGradient id={`${id}-road`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d58" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0c8a55" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${id}-car`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15a972" />
          <stop offset="100%" stopColor="#0c6b44" />
        </linearGradient>
      </defs>
      <rect x="40" y="180" width="320" height="36" rx="6" fill={`url(#${id}-road)`} />
      <rect x="55" y="198" width="18" height="3" fill="white" opacity="0.7" />
      <rect x="95" y="198" width="18" height="3" fill="white" opacity="0.7" />
      <rect x="135" y="198" width="18" height="3" fill="white" opacity="0.7" />
      <path
        d="M78 152h108c8 0 15 4 19 11l12 17h-58l-8-10H95l-8 10H38l19-25c4-7 12-13 21-13z"
        fill={`url(#${id}-car)`}
        opacity="0.95"
      />
      <rect x="100" y="128" width="64" height="28" rx="4" fill="#0a0a0a" opacity="0.15" />
      <circle cx="95" cy="184" r="12" fill="#1a1a1a" />
      <circle cx="95" cy="184" r="5" fill="#e5e5e5" />
      <circle cx="185" cy="184" r="12" fill="#1a1a1a" />
      <circle cx="185" cy="184" r="5" fill="#e5e5e5" />
      <path
        d="M260 88c32 0 58 26 58 58s-26 58-58 58-58-26-58-58 26-58 58-58z"
        fill="none"
        stroke="#0f9d58"
        strokeWidth="2.5"
        strokeDasharray="6 8"
        opacity="0.45"
      />
      <circle cx="260" cy="146" r="8" fill="#0f9d58" opacity="0.85" />
    </svg>
  );
}

function SvgFamiliar({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full max-w-[min(100%,22rem)]" aria-hidden>
      <defs>
        <linearGradient id={`${id}-n`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#18b87a" />
          <stop offset="100%" stopColor="#0f9d58" />
        </linearGradient>
      </defs>
      <g stroke="#0f9d58" strokeWidth="1.5" fill="none" opacity="0.35">
        <path d="M200 200 L120 120 M200 200 L280 120 M200 200 L200 80" />
      </g>
      {[
        { cx: 120, cy: 120, r: 28 },
        { cx: 200, cy: 72, r: 24 },
        { cx: 280, cy: 120, r: 28 },
        { cx: 200, cy: 200, r: 32 },
      ].map((c, i) => (
        <g key={i}>
          <circle
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="white"
            stroke={`url(#${id}-n)`}
            strokeWidth="2.5"
            opacity="0.95"
          />
          <circle cx={c.cx} cy={c.cy} r={c.r * 0.35} fill="#0f9d58" opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}

function SvgPymes({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full max-w-[min(100%,22rem)]" aria-hidden>
      <defs>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0f9d58" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => {
        const x = 80 + i * 100;
        return (
          <g key={i} transform={`translate(${x}, 100)`}>
            <rect x={-32} y={-18} width="64" height="36" rx="6" fill="#0a0a0a" opacity="0.08" />
            <rect x={-20} y={-28} width="40" height="12" rx="2" fill={`url(#${id}-v)`} opacity="0.9" />
            <rect x={-32} y={-10} width="64" height="20" rx="3" fill="#0f9d58" opacity="0.85" />
            <circle cx={-16} cy={20} r="7" fill="#1a1a1a" />
            <circle cx={16} cy={20} r="7" fill="#1a1a1a" />
          </g>
        );
      })}
      <path
        d="M50 200h300"
        stroke="#0f9d58"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
}

function SvgCorporativa() {
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full max-w-[min(100%,22rem)]" aria-hidden>
      <defs>
        <linearGradient id="corp-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d58" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0a3d28" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {[
        { x: 110, w: 55, h: 120, lines: 4 },
        { x: 180, w: 55, h: 90, lines: 3 },
        { x: 250, w: 55, h: 140, lines: 5 },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={200 - b.h}
            width={b.w}
            height={b.h}
            rx="4"
            fill="url(#corp-glass)"
            stroke="#0a0a0a"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />
          {Array.from({ length: b.lines }).map((_, j) => (
            <rect
              key={j}
              x={b.x + 8}
              y={200 - b.h + 14 + j * 22}
              width={b.w - 16}
              height="2.5"
              fill="#0f9d58"
              opacity="0.25"
              rx="1"
            />
          ))}
        </g>
      ))}
      <rect x="95" y="48" width="210" height="3" fill="#0f9d58" opacity="0.4" rx="1.5" />
    </svg>
  );
}

function SvgGremial() {
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full max-w-[min(100%,22rem)]" aria-hidden>
      <g stroke="#0f9d58" strokeWidth="1.2" fill="none" opacity="0.3">
        <path d="M200 50 L100 120 M200 50 L300 120 M200 200 L100 120 M200 200 L300 120 M100 120 L80 200 M300 120 L320 200" />
      </g>
      {[
        { cx: 200, cy: 50, r: 12 },
        { cx: 100, cy: 120, r: 10 },
        { cx: 300, cy: 120, r: 10 },
        { cx: 200, cy: 200, r: 14 },
        { cx: 80, cy: 200, r: 8 },
        { cx: 320, cy: 200, r: 8 },
      ].map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="white"
          stroke="#0f9d58"
          strokeWidth="2"
        />
      ))}
      <circle cx="200" cy="130" r="22" fill="#0f9d58" opacity="0.15" stroke="#0f9d58" strokeWidth="2" />
    </svg>
  );
}

type Props = {
  slug: CuentaSlug;
};

/**
 * Ilustración abstracta por tipo de cuenta (sin assets externos) para reforzar identidad visual.
 */
export default function CuentaTipoIllustration({ slug }: Props) {
  const t = THEME[slug];
  const uid = `art-${slug}`;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-br p-6 shadow-[0_18px_50px_-28px_rgba(10,10,10,0.2)] sm:p-8 ${t.frame}`}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
        style={{ background: t.glow }}
      />
      <div className="relative flex min-h-[200px] items-center justify-center sm:min-h-[240px]">
        {slug === "personal" && <SvgPersonal id={uid} />}
        {slug === "familiar" && <SvgFamiliar id={uid} />}
        {slug === "pymes" && <SvgPymes id={uid} />}
        {slug === "corporativa" && <SvgCorporativa />}
        {slug === "gremial" && <SvgGremial />}
      </div>
    </div>
  );
}
