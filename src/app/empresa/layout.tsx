import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { EmpresaSidebar } from "@/components/empresa/EmpresaSidebar";
import { EmpresaDataProvider } from "@/context/EmpresaDataContext";
import { ProtectedLayout } from "../dashboard/ProtectedLayout";
import { EmpresaGate } from "./EmpresaGate";

export const metadata: Metadata = {
  title: "Vista empresarial — Paso Rápido",
  description:
    "Administración centralizada de flota: vehículos, conductores, recargas, movimientos, reportes y facturación.",
};

export default function EmpresaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout>
      <EmpresaGate>
        <EmpresaDataProvider>
          <SidebarProvider>
            <SiteHeader />
            <div className="flex flex-1 min-h-0">
              <EmpresaSidebar />
              <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
            </div>
          </SidebarProvider>
        </EmpresaDataProvider>
      </EmpresaGate>
    </ProtectedLayout>
  );
}
