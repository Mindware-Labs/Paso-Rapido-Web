import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const sans = Plus_Jakarta_Sans({
  variable: "--font-pr",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Paso Rápido — recarga, peajes y TAG",
  description:
    "Experiencia web ampliada de la app Paso Rápido: saldo, peajes, vehículos y ayuda. Demostración de diseño (sin backend).",
  openGraph: {
    title: "Paso Rápido",
    description: "Peajes y TAG en un solo lugar — versión web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
