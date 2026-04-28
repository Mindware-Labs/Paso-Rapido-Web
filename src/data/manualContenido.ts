/** Contenido del manual (textos breves; la presentación vive en el componente visual). */

export const MANUAL_INTRO = {
  lede: "TAG + app: pagas el peaje sin detenerte. Saldo, vehículos e historial en móvil (y portal web si aplica).",
};

export const MANUAL_PRIMEROS_PASOS: {
  id: string;
  title: string;
  short: string;
}[] = [
  {
    id: "descarga",
    title: "Descarga la app",
    short: "iOS o Android. Entra con la misma cuenta del kit o regístrate.",
  },
  {
    id: "cuenta",
    title: "Cuenta y vehículos",
    short: "Añade placas / TAG según tu plan (personal, familiar, pymes…).",
  },
  {
    id: "recarga",
    title: "Recarga",
    short: "Recargar: monto + método. Suele acreditarse al instante.",
  },
  {
    id: "via",
    title: "A circular",
    short: "Con saldo, el paso se registra solo. Revisa movimientos en Historial.",
  },
];

export const MANUAL_KIT = {
  precio: "RD$ 250",
  recargaInicial: "RD$ 200",
  highlights: [
    { label: "Recarga incluida", value: "RD$ 200" },
    { label: "Uso inmediato", value: "Listo al activar" },
  ],
  bullets: [
    "Multi-vehículo según plan.",
    "Toda la gestión desde la app.",
  ],
  nota: "40+ puntos autorizados; también estaciones oficiales.",
};

export const MANUAL_FUNCIONES_APP: {
  id: string;
  title: string;
  short: string;
}[] = [
  { id: "inicio", title: "Inicio", short: "Saldo y atajos." },
  { id: "peajes", title: "Red de peajes", short: "Mapa y estaciones." },
  { id: "vehiculos", title: "Vehículos", short: "Placas y TAG." },
  { id: "recargar", title: "Recargar", short: "Monto y medios de pago." },
  { id: "historial", title: "Historial", short: "Movimientos y peajes." },
  { id: "cuenta", title: "Cuenta", short: "Perfil y sesión." },
  { id: "pagos", title: "Métodos de pago", short: "Tarjetas y orden de cobro." },
  { id: "soporte", title: "Ayuda y soporte", short: "Centro de ayuda, noticias, reclamos." },
];

export const MANUAL_AYUDA_MOVIL = {
  short: "En Ayuda: Preguntas, Guías, Llamar. Burbuja arrastrable → toque corto = asistente.",
  pictogramSteps: [
    { label: "Arrastra", hint: "Sin tapar el mapa" },
    { label: "Toca", hint: "Abre asistente" },
    { label: "Soporte", hint: "Tel. o reclamación" },
  ],
};

export const MANUAL_PUNTOS_VENTA = {
  oneLiner: "Kits y recargas en red de aliados y estaciones.",
  marcas: ["Carol", "CardNet", "Hidalgos", "Axgen", "BmCargo", "Texaco*"],
  foot: "*Donde aplique en estación",
};

export const MANUAL_WEB_PORTAL = {
  oneLiner: "Mismo criterio de acceso: login con tu usuario de app o registro.",
};

export const MANUAL_CONTACTO = {
  telefonoHref: "tel:+18092220274",
  telefonoTexto: "(809) 222-0274.5",
  sub: "Opción 1 · Oficina Coordinadora",
  pie: "NCF: desde Mis recargas en app.",
};
