import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Redirige solo URLs con "Dashboard" (D mayúscula) a la ruta canónica en minúsculas.
 * Los redirects en next.config con `source: "/Dashboard"` hacen match
 * case-insensitive en dev (Windows), provocando 308 en bucle sobre `/dashboard`.
 */
export function middleware(request: NextRequest) {
  const p = request.nextUrl.pathname;
  if (p === "/Dashboard" || p.startsWith("/Dashboard/")) {
    const to = p.replace(/^\/Dashboard/, "/dashboard");
    return NextResponse.redirect(new URL(to, request.url), 308);
  }
  return NextResponse.next();
}

/** Sólo pasa a la lógica si el pathname *real* es /Dashboard… (sensible a mayúsculas). */
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/Dashboard", "/Dashboard/:path*"],
};
