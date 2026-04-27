import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const sans = Plus_Jakarta_Sans({
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
      className={cn("h-full", "antialiased", sans.variable, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col">
        <SidebarProvider>
<<<<<<< HEAD
          <AppSidebar />
          <main className="flex-1">{children}</main>
=======
          <SiteHeader />
          <div className="flex min-h-0 flex-1 items-stretch">
            <AppSidebar />
            <main className="min-w-0 flex-1 bg-background">{children}</main>
          </div>
>>>>>>> 7950ce0c746ffa2b9833b0bc52c69f0d7eab961a
          <SiteFooter />
        </SidebarProvider>
      </body>
    </html>
  );
}
