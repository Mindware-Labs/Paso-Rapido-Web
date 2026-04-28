import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const sans = Inter({
  variable: "--font-pr",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Paso Rápido — recarga, peajes y TAG",
  description:
    "Portal web corporativo: red de peajes, TAG, recargas y ayuda. Misma identidad de marca, experiencia distinta a la app móvil.",
  openGraph: {
    title: "Paso Rápido",
    description: "Red de peajes y TAG — portal web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        sans.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
