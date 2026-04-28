import type { MainAppRoute } from "@/lib/asistenteVial";

/** Mapea rutas del asistente (mismas claves que la app Expo) a rutas del dashboard web. */
export const DASHBOARD_PATH_BY_MAIN_ROUTE: Record<MainAppRoute, string> = {
  "/(main)": "/dashboard",
  "/(main)/recargar": "/dashboard/recargar",
  "/(main)/peajes": "/dashboard/peajes",
  "/(main)/vehiculos": "/dashboard/vehiculos",
  "/(main)/ayuda": "/dashboard/ayuda",
  "/(main)/asistente-vial": "/dashboard/asistente-vial",
  "/(main)/notificaciones": "/dashboard/notificaciones",
  "/(main)/cuenta": "/dashboard/cuenta",
  "/(main)/contrasena": "/dashboard/seguridad",
  "/(main)/metodos-pago": "/dashboard/metodos-pago",
  "/(main)/vinculados": "/dashboard/vinculados",
  "/(main)/reclamaciones": "/dashboard/reclamaciones",
  "/(main)/noticias": "/dashboard/noticias",
  "/(main)/historico": "/dashboard/historico",
  "/(main)/movimientos": "/dashboard/historico",
  "/(main)/recurrentes": "/dashboard/recargar",
  "/(main)/agregarVehiculo": "/dashboard/vehiculos",
  "/(main)/VincularPersona": "/dashboard/vinculados",
};

export function mainRouteToWebPath(route: MainAppRoute): string {
  return DASHBOARD_PATH_BY_MAIN_ROUTE[route] ?? "/dashboard";
}
