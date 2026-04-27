import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Páginas interiores con el mismo look & feel del portal web (no el de la app).
 */
export function PlaceholderScreen({ title, description, children }: Props) {
  return (
    <div className="pr-grain-dots min-h-0 border-b border-border/80 bg-background">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-heading text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">{description}</p>
        {children}
        <p className="text-xs text-muted-foreground">
          Contenido de demostración: conecta API y reglas de negocio cuando el
          backend esté disponible.
        </p>
        <Link
          className="inline-flex text-sm font-bold text-primary hover:underline"
          href="/"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
