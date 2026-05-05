"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Cliente protector que redirige a login si no está autenticado.
 * Verifica autenticación después de que AuthContext se inicialice.
 */
export function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Esperar a que AuthContext se inicialice desde localStorage
    if (!isInitialized) return;

    // Si no está logeado, redirigir a login
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isInitialized, isLoggedIn, router]);

  // Mientras se verifica la autenticación, mostrar un loader
  if (!isInitialized || !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
          <p className="text-sm text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
