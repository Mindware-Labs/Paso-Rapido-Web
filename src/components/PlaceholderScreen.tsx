import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Páginas alineadas con la app móvil (misma jerarquía) hasta conectar API.
 */
export function PlaceholderScreen({ title, description, children }: Props) {
  return (
    <div className="pr-grain">
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-pr-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-pr-foreground/85">{description}</p>
        {children}
        <p className="text-xs text-pr-muted-fg">
          Demostración de diseño: conecta cuentas y servicios reales como en la
          app móvil cuando el backend esté listo.
        </p>
        <Link
          className="inline-block text-sm font-extrabold text-pr-hero hover:underline"
          href="/"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
