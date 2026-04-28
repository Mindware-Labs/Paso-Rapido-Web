export type CuentaSlug = "personal" | "familiar" | "pymes" | "corporativa" | "gremial";

export const CUENTA_SLUGS: CuentaSlug[] = [
  "personal",
  "familiar",
  "pymes",
  "corporativa",
  "gremial",
];

/** Acentos de UI por tipo: coherentes con la marca, pero distinguibles en cada página */
export const CUENTA_PAGE_THEME: Record<
  CuentaSlug,
  { ring: string; statIcon: string; introChip: string; quoteFrom: string }
> = {
  personal: {
    ring: "ring-cyan-500/15",
    statIcon: "bg-cyan-50 text-cyan-800",
    introChip: "bg-cyan-50/90 text-cyan-900 border-cyan-200/60",
    quoteFrom: "border-l-cyan-500",
  },
  familiar: {
    ring: "ring-emerald-500/20",
    statIcon: "bg-emerald-50 text-emerald-900",
    introChip: "bg-emerald-50/90 text-emerald-950 border-emerald-200/60",
    quoteFrom: "border-l-emerald-500",
  },
  pymes: {
    ring: "ring-amber-500/20",
    statIcon: "bg-amber-50 text-amber-950",
    introChip: "bg-amber-50/80 text-amber-950 border-amber-200/60",
    quoteFrom: "border-l-amber-500",
  },
  corporativa: {
    ring: "ring-slate-500/25",
    statIcon: "bg-slate-100 text-slate-800",
    introChip: "bg-slate-100/90 text-slate-900 border-slate-200/80",
    quoteFrom: "border-l-slate-600",
  },
  gremial: {
    ring: "ring-teal-500/20",
    statIcon: "bg-teal-50 text-teal-900",
    introChip: "bg-teal-50/85 text-teal-950 border-teal-200/60",
    quoteFrom: "border-l-teal-600",
  },
};

export interface CuentaTipoContent {
  slug: CuentaSlug;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  forWho: string;
  vehicleRange: string;
  stats: { label: string; value: string }[];
  ideal: string[];
  advantages: string[];
  includes: string[];
  moreDetails: string[];
  differentiatorTitle: string;
  differentiatorBody: string;
  example: { title: string; body: string };
  /** Texto opcional para aclarar solapamiento con otro tipo */
  overlapNote?: string;
}

export const CUENTAS_BY_SLUG: Record<CuentaSlug, CuentaTipoContent> = {
  personal: {
    slug: "personal",
    shortTitle: "Personal",
    metaTitle: "Cuenta personal",
    metaDescription:
      "Un vehículo, una cuenta. Recargas y movimientos individuales con Paso Rápido.",
    tagline: "Pensada para quien conduce y administra un solo carro, sin ruido de más.",
    forWho: "Para una sola persona que tiene 1 vehículo.",
    vehicleRange: "1 vehículo",
    stats: [
      { label: "TAG", value: "1 dispositivo" },
      { label: "Título", value: "Persona natural" },
      { label: "Enfoque", value: "Uso individual" },
    ],
    ideal: [
      "Tienes un carro personal.",
      "Solo necesitas un TAG.",
      "Quieres manejar tus recargas y movimientos de forma individual.",
    ],
    advantages: [
      "Administración simple.",
      "Recargas fáciles desde web, app o puntos autorizados.",
      "Historial de pasos por peajes.",
    ],
    includes: [
      "Acceso a la app y al portal con un solo inicio de sesión.",
      "Mismo saldo o línea de recarga para el vehículo vinculado a tu TAG.",
      "Avisos y comprobante de uso al pasar peajes, según canales activos.",
    ],
    moreDetails: [
      "Puedes revisar en cualquier momento cuándo y en qué estación se registró un paso.",
      "La cuenta personal es el punto de partida si después quieres escalar a una cuenta familiar o empresarial.",
    ],
    differentiatorTitle: "Qué distingue esta cuenta",
    differentiatorBody:
      "Es la opción más directa: una persona, un vehículo, sin capas de administración. No compartes saldo con terceros salvo que tú decidas otra fórmula (por ejemplo, migrar a familiar más adelante).",
    example: {
      title: "Ejemplo",
      body: "Juan Perez tiene un solo vehículo y usa peajes frecuentemente. Esta sería la mejor opción.",
    },
  },
  familiar: {
    slug: "familiar",
    shortTitle: "Familiar",
    metaTitle: "Cuenta familiar",
    metaDescription:
      "De 2 a 10 vehículos en una sola cuenta. Ideal para centralizar pagos y movimientos del hogar.",
    tagline: "Una sola billetera digital del hogar para quienes comparten ruta, pero no el mismo carro.",
    forWho: "Para una persona física que necesita manejar de 2 a 10 vehículos en una sola cuenta.",
    vehicleRange: "2 a 10 vehículos",
    stats: [
      { label: "Límite orientativo", value: "Hasta 10" },
      { label: "Titular", value: "Persona natural" },
      { label: "Uso", value: "Familiar" },
    ],
    ideal: [
      "En tu casa hay varios carros.",
      "Quieres centralizar los pagos del hogar.",
      "Deseas ver movimientos de todos los vehículos desde una sola cuenta.",
    ],
    advantages: [
      "Una sola cuenta para varios TAGs.",
      "Más organización familiar.",
      "Recargas compartidas.",
    ],
    includes: [
      "Alta y gestión de varios vehículos bajo el mismo usuario o según reglas de producto que apliquen.",
      "Movimientos y saldo visibles con contexto de cada placa o TAG (según cómo muestre la app).",
      "Un solo flujo de recarga para alimentar el saldo de los vehículos vinculados.",
    ],
    moreDetails: [
      "Encaja en familias donde varias personas usan el peaje, pero se quiere un solo control y un solo comprobante de carga de saldo.",
      "Reduce fricción frente a tener varias cuentas personales con recargas separadas.",
    ],
    differentiatorTitle: "Qué distingue esta cuenta",
    differentiatorBody:
      "La familiar no es “varias cuentas personales juntas”: es un solo espacio con varios dispositivos o vehículos, pensado en el presupuesto y visibilidad del núcleo familiar, no en la operación de una empresa.",
    example: {
      title: "Ejemplo",
      body: "Padre, madre y dos hijos con carros distintos. Todos pueden estar en la misma cuenta.",
    },
  },
  pymes: {
    slug: "pymes",
    shortTitle: "Pymes",
    metaTitle: "Cuenta Pymes",
    metaDescription:
      "Flotas de 2 a 15 vehículos para pequeñas y medianas empresas. Control y administración centralizada.",
    tagline: "Convierte el peaje en un gasto operativo medible: mensajería, ventas o servicio en ruta.",
    forWho: "Para pequeñas y medianas empresas con 2 a 15 vehículos.",
    vehicleRange: "2 a 15 vehículos",
    stats: [
      { label: "Flota típica", value: "2–15" },
      { label: "Foco", value: "Operación Pyme" },
      { label: "Vista", value: "Gasto por uso" },
    ],
    ideal: [
      "Tienes negocio con mensajeros.",
      "Vehículos de ventas.",
      "Camionetas de servicio técnico.",
      "Flota pequeña de trabajo.",
    ],
    advantages: [
      "Control de gastos operativos.",
      "Administración centralizada.",
      "Facilita seguimiento de uso de peajes por empleado.",
    ],
    includes: [
      "Encaje con equipos de campo que transitan a diario: delivery, reparto o visitas técnicas.",
      "Base para alinear contabilidad básica con lo que realmente se consume en vía (según reportes disponibles en producto).",
      "Escala natural antes de estructuras corporativas o gremiales más amplias.",
    ],
    moreDetails: [
      "Útil cuando la recurrencia de peaje es un costo fijo y quieres verlo junto, no disgregado en tarjetas personales.",
      "Puede convivir con acuerdos comerciales: consulta términos y condiciones vigentes en tu región.",
    ],
    differentiatorTitle: "Qué distingue esta cuenta",
    differentiatorBody:
      "Las Pymes concentra flotas medianas y dinámicas: no requiere la complejidad de un modelo corporativo completo, pero sí ofrece criterio de “empresa chica con muchos carros en la calle”.",
    example: {
      title: "Ejemplo",
      body: "Una empresa de delivery con 8 vehículos.",
    },
    overlapNote:
      "Si tu empresa es persona jurídica y requiere condiciones corporativas o flotas mayores, revisa también la cuenta corporativa.",
  },
  corporativa: {
    slug: "corporativa",
    shortTitle: "Corporativa",
    metaTitle: "Cuenta corporativa",
    metaDescription:
      "Empresas constituidas (persona jurídica) con flotas desde 5 vehículos. Manejo profesional y control financiero.",
    tagline: "Para organizaciones con rigor de contrato, auditoría y volumen: transporte, logística o instituciones.",
    forWho:
      "Para empresas formalmente constituidas (persona jurídica), generalmente con 5 vehículos en adelante.",
    vehicleRange: "Desde 5 vehículos (orientativo)",
    stats: [
      { label: "Figura", value: "Persona jurídica" },
      { label: "Escala", value: "Flotas grandes" },
      { label: "Control", value: "Financiero / logístico" },
    ],
    ideal: [
      "Empresas grandes.",
      "Transportistas.",
      "Instituciones.",
      "Flotas amplias.",
    ],
    advantages: [
      "Manejo empresarial profesional.",
      "Control de muchos vehículos.",
      "Mejor administración financiera y logística.",
    ],
    includes: [
      "Encaje con estructura legal que factura, contrata o reporta a dirección financiera o patrimonial.",
      "Acompaña procesos de conciliación de gasto de traslado o peaje (según integraciones o exportaciones de datos disponibles).",
      "Diseñada para conversaciones con áreas de compras o flotas, no solo con un conductor aislado.",
    ],
    moreDetails: [
      "Los mínimos o topes reales (contrato, SLA, recarga centralizada) dependen de tu trato comercial: úsalos con tu asesor.",
      "Frente a Pyme, el corporativo prioriza gobierno, políticas y reporting para muchos activos en ruta.",
    ],
    differentiatorTitle: "Qué distingue esta cuenta",
    differentiatorBody:
      "Mientras la Pyme cuida la operación diaria de un equipo mediano, el corporativo está alineado a gobierno de flota, formalidad societaria y, en muchos casos, a negociación directa y condiciones a escala.",
    example: {
      title: "Ejemplo",
      body: "Empresa con 30 camionetas de distribución nacional.",
    },
    overlapNote:
      "Traslapes con Pymes en flotas de tamaño intermedio: la opción adecuada depende de tu régimen (persona natural vs. jurídica) y de los términos de tu acuerdo comercial.",
  },
  gremial: {
    slug: "gremial",
    shortTitle: "Gremial",
    metaTitle: "Cuenta gremial",
    metaDescription:
      "Cuenta matriz para asociaciones y federaciones. Recargas y administración de múltiples cuentas o dispositivos.",
    tagline: "Estructura matriz–afiliados: un polo que alimenta saldo y criterio de uso en red.",
    forWho:
      "Para empresas o agrupaciones con una cuenta matriz, desde la cual se recargan múltiples cuentas o dispositivos individuales.",
    vehicleRange: "Variable (red de cuentas)",
    stats: [
      { label: "Modelo", value: "Matriz" },
      { label: "Alcance", value: "Múltiples subcuentas" },
      { label: "Agrupación", value: "Gremial" },
    ],
    ideal: [
      "Asociaciones de transporte.",
      "Federaciones.",
      "Empresas con divisiones internas.",
      "Grandes estructuras operativas.",
    ],
    advantages: [
      "Una cuenta principal administra muchas secundarias.",
      "Mejor control masivo.",
      "Facilita recargas por departamentos o miembros.",
    ],
    includes: [
      "Distribución de recursos desde un solo punto hacia unidades, cooperativas o subcuentas según la figura gremial.",
      "Alineada a entornos con muchos actores: cada afiliado puede operar, pero el “techo” de carga o política sale de la matriz.",
      "Escala cuando no basta con una flota bajo un solo RNC, sino una red bajo un mismo criterio gremial.",
    ],
    moreDetails: [
      "Es distinta a la “flota de empresa”: el foco no es un solo operador, sino una malla con muchas piernas o cuentas satélite.",
      "Los detalles de conexión (quién paga, cómo se audita) se definen con asesor comercial o reglamento gremial.",
    ],
    differentiatorTitle: "Qué distingue esta cuenta",
    differentiatorBody:
      "Si el corporativo ordena un solo negocio con muchos vehículos, el gremial ordena a muchas piezas bajo un mismo andamiaje: matriz, afiliación y criterios compartidos de acceso a saldo o TAG.",
    example: {
      title: "Ejemplo",
      body: "Una federación de transporte con decenas de afiliados.",
    },
  },
};

/** Fila de la tabla resumen (todas las cuentas) */
export const CUENTA_RESUMEN_FILAS: {
  tipo: string;
  slug: CuentaSlug;
  cantidad: string;
  ideal: string;
}[] = [
  { tipo: "Personal", slug: "personal", cantidad: "1", ideal: "Persona individual" },
  { tipo: "Familiar", slug: "familiar", cantidad: "2 a 10", ideal: "Familia" },
  { tipo: "PYMES", slug: "pymes", cantidad: "2 a 15", ideal: "Negocio pequeño/mediano" },
  { tipo: "Corporativa", slug: "corporativa", cantidad: "5+", ideal: "Empresa grande" },
  { tipo: "Gremial", slug: "gremial", cantidad: "Variable", ideal: "Asociaciones o matrices" },
];
