"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/context/AccountContext";

/**
 * Gating de la vista empresarial: si la cuenta no es de tipo flota
 * (`pymes`/`corporativa`/`gremial`) redirige al dashboard personal. Patrón
 * calcado de `dashboard/ProtectedLayout` (espera a que el contexto inicialice).
 */
export function EmpresaGate({ children }: { children: ReactNode }) {
  const { isEnterprise, isInitialized } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;
    if (!isEnterprise) router.replace("/dashboard");
  }, [isInitialized, isEnterprise, router]);

  if (!isInitialized || !isEnterprise) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
          <p className="text-sm text-muted-foreground">Cargando vista empresarial…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
