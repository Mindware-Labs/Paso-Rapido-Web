import { cn } from "@/lib/utils";

/**
 * Pin de mapa clásico: gota roja, punta abajo, círculo claro (agujero) en la cabeza.
 * Mismo lenguaje visual que el icono de referencia (estilo “map pin” genérico).
 */
export function PeajeMapPinIcon({ selected }: { selected: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none drop-shadow-md transition-transform duration-200",
        selected && "scale-110",
      )}
      style={{ width: selected ? 40 : 34, height: selected ? 58 : 50 }}
      aria-hidden
    >
      <svg
        viewBox="0 0 48 72"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0.5C11.4 0.5 1.5 10.4 1.5 23.1C1.5 32.2 6.1 40.1 9.2 45.1L24 70.5L38.8 45.1C42 40.1 46.5 32.2 46.5 23.1C46.5 10.4 36.6 0.5 24 0.5Z"
          fill="#E53935"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.6"
        />
        <circle cx="24" cy="22" r="8.2" fill="white" />
        {selected && (
          <circle
            cx="24"
            cy="22"
            r="3.2"
            fill="#E53935"
            fillOpacity={0.35}
          />
        )}
      </svg>
    </div>
  );
}
