import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CuentaTipoDetail from "@/components/Landing/CuentaTipoDetail";
import {
  CUENTA_SLUGS,
  CUENTAS_BY_SLUG,
  type CuentaSlug,
} from "@/data/cuentaTipos";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CUENTA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!CUENTA_SLUGS.includes(slug as CuentaSlug)) {
    return { title: "Cuenta | Paso Rápido" };
  }
  const data = CUENTAS_BY_SLUG[slug as CuentaSlug];
  if (!data) {
    return { title: "Cuenta | Paso Rápido" };
  }
  return {
    title: `${data.metaTitle} — Paso Rápido`,
    description: data.metaDescription,
    openGraph: {
      title: `${data.metaTitle} — Paso Rápido`,
      description: data.metaDescription,
    },
  };
}

export default async function CuentaTipoPage({ params }: Props) {
  const { slug } = await params;
  const data = CUENTAS_BY_SLUG[slug as CuentaSlug];
  if (!data) {
    notFound();
  }
  return <CuentaTipoDetail slug={data.slug} data={data} />;
}
