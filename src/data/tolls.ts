/** Peajes RD Vial (16 estaciones). Tarifas y ubicaciones orientativas — confirma en el punto de cobro (nivelación 2025). */

export type TollSite = {
  id: string;
  name: string;
  /** Línea corta en la tarjeta del carrusel */
  subtitle: string;
  /** Región para chip (ej. Cibao, SDO) */
  regionLabel: string;
  /** Etiquetas cortas (telepeaje, horario, etc.) */
  badges?: string[];
  latitude: number;
  longitude: number;
  car: string;
  bus: string;
  truck: string;
  /** Texto largo en el detalle */
  description: string;
  highway?: string;
  hours?: string;
  paymentNote?: string;
};

export const PEAJES_NOTE =
  "Son 16 estaciones bajo el fideicomiso RD Vial (MOPC). Ubicaciones y tarifas son referencia; confirma en caja o Paso Rápido.";

/** Vista inicial del mapa (República Dominicana). */
export const DR_MAP_INITIAL_REGION = {
  latitude: 18.78,
  longitude: -70.12,
  latitudeDelta: 2.55,
  longitudeDelta: 2.42,
} as const;

/** Límites aproximados para la vista esquemática en web. */
export const DR_BOUNDS = {
  north: 19.92,
  south: 17.48,
  west: -71.92,
  east: -68.35,
} as const;

/** Corredor estándar (Cat.1 RD$100 livianos, enero 2025 en vías principales). */
const TARIFA_STD = {
  car: "RD$100",
  bus: "RD$200",
  truck: "RD$300+",
} as const;

const TARIFA_CIRC = {
  car: "RD$100",
  bus: "RD$200",
  truck: "RD$300–600",
} as const;

const TARIFA_NORDESTE = {
  car: "RD$200",
  bus: "RD$300",
  truck: "RD$500+",
} as const;

const TARIFA_CATEY = {
  car: "RD$400",
  bus: "RD$1,000+",
  truck: "RD$1,300+",
} as const;

export const TOLL_SITES: TollSite[] = [
  {
    id: "las-americas",
    name: "Peaje Las Américas",
    subtitle: "Autop. Las Américas · Km 22",
    regionLabel: "Santo Domingo / SDE",
    badges: ["Paso Rápido", "24/7"],
    latitude: 18.4345,
    longitude: -69.6789,
    ...TARIFA_STD,
    highway: "Autopista Las Américas (Higüey / aeropuerto SDQ)",
    hours: "Operación continua",
    paymentNote: "Efectivo, tarjeta o telepeaje según carril.",
    description:
      "Principal peaje del corredor hacia el este y el aeropuerto. Varios carriles y exclusivos de Paso Rápido / telepeaje.",
  },
  {
    id: "duarte",
    name: "Peaje Autopista Duarte",
    subtitle: "Duarte · troncal norte (referencia Km 25–32)",
    regionLabel: "Hato Nuevo / Villa Altagracia",
    badges: ["Paso Rápido", "24/7", "Carga"],
    latitude: 18.668,
    longitude: -70.22,
    ...TARIFA_STD,
    highway: "Autopista Duarte (Santo Domingo – Santiago)",
    hours: "Operación continua",
    paymentNote: "Tarifas homologadas con otras vías troncales; revisa categoría de vehículo.",
    description:
      "Peaje del corredor hacia el Cibao. Punto de control clave de flujo y recaudo en la ruta SD–Santiago.",
  },
  {
    id: "seis-de-noviembre",
    name: "Peaje 6 de Noviembre",
    subtitle: "Autop. 6 de Noviembre · Km 5",
    regionLabel: "Santo Domingo Oeste / SC",
    badges: ["Paso Rápido", "24/7"],
    latitude: 18.456,
    longitude: -70.018,
    ...TARIFA_STD,
    highway: "Autopista 6 de Noviembre (Santo Domingo – San Cristóbal)",
    hours: "Operación continua",
    paymentNote: "Carril dedicado a usuarios con tag, según señalética.",
    description: "Conecta el área metropolitana con San Cristóbal; alto volumen de tránsito diario.",
  },
  {
    id: "sanchez",
    name: "Peaje Sánchez",
    subtitle: "Autop. Sánchez · Km 12",
    regionLabel: "San Cristóbal / Baní",
    badges: ["Paso Rápido", "24/7"],
    latitude: 18.45,
    longitude: -70.24,
    ...TARIFA_STD,
    highway: "Autopista Sánchez (San Cristóbal – Baní / sur)",
    hours: "Operación continua",
    paymentNote: "Categorías MOPC; efectivo o electrónico en carriles habilitados.",
    description: "Acceso hacia el corredor sur; importante para quienes se dirigen a la costa y Baní.",
  },
  {
    id: "coral-i",
    name: "Peaje Coral I",
    subtitle: "Autop. del Coral · Km 18",
    regionLabel: "Higüey / El Este",
    badges: ["Turismo", "Paso Rápido"],
    latitude: 18.42,
    longitude: -68.9,
    ...TARIFA_STD,
    highway: "Autopista del Coral (La Romana – Punta Cana)",
    hours: "Operación continua",
    paymentNote: "Tramo 1 de la red Coral; el viaje completo puede incluir más de un peaje.",
    description: "Primer peaje de la Autopista del Coral en el recorrido hacia la zona hotelera del este.",
  },
  {
    id: "coral-ii",
    name: "Peaje Coral II",
    subtitle: "Autop. del Coral · Km 52",
    regionLabel: "Miches / El Este",
    badges: ["Turismo", "Paso Rápido"],
    latitude: 18.55,
    longitude: -68.63,
    ...TARIFA_STD,
    highway: "Autopista del Coral (continuación oriente)",
    hours: "Operación continua",
    paymentNote: "Segundo tramo Coral en el mismo recorrido hacia el este profundo.",
    description: "Segunda estación en la Autopista del Coral; conecta corredor turístico hacia Miches y zonas al este de Higüey.",
  },
  {
    id: "la-romana",
    name: "Peaje Circunvalación La Romana",
    subtitle: "Anillo vial La Romana",
    regionLabel: "La Romana",
    badges: ["Regional", "24/7"],
    latitude: 18.415,
    longitude: -68.975,
    ...TARIFA_STD,
    highway: "Circunvalación de La Romana",
    hours: "Operación continua",
    paymentNote: "Categoría según tablas RD Vial; confirmar monto en caja o telepeaje.",
    description:
      "Desvío periférico de La Romana para aliviar tránsito del casco urbano. Esquema alineado con otras vías bajo RD Vial (verifica en puesto).",
  },
  {
    id: "santiago",
    name: "Peaje Circunvalación Santiago",
    subtitle: "Circunvalación · Km 21.8 (aprox.)",
    regionLabel: "Santiago",
    badges: ["Cibao", "Paso Rápido"],
    latitude: 19.45,
    longitude: -70.7,
    ...TARIFA_CIRC,
    highway: "Circunvalación de Santiago",
    hours: "Operación continua",
    paymentNote: "Infraestructura reciente; esquema cat. 1–5 según MOPC.",
    description: "Vía de circunvalación alrededor de Santiago: desvío para tráfico regional sin cruzar todo el centro.",
  },
  {
    id: "juan-bosch-i",
    name: "Peaje Juan Bosch I (CJBI)",
    subtitle: "Circunvalación Juan Bosch · tramo I",
    regionLabel: "Santo Domingo Norte / Este",
    badges: ["Alto flujo", "Paso Rápido"],
    latitude: 18.555,
    longitude: -69.86,
    ...TARIFA_CIRC,
    highway: "Circunvalación Prof. Juan Bosch (tramo I)",
    hours: "Operación continua",
    paymentNote: "Una de las estaciones con mayor recaudo a nivel nacional.",
    description: "Primer tramo del anillo Juan Bosch, parte del circuito de descongestión de la capital.",
  },
  {
    id: "juan-bosch-ii",
    name: "Peaje Juan Bosch II",
    subtitle: "Circunvalación Juan Bosch · tramo II",
    regionLabel: "Santo Domingo Oeste / Norte",
    badges: ["Alto flujo", "Paso Rápido"],
    latitude: 18.525,
    longitude: -69.96,
    ...TARIFA_CIRC,
    highway: "Circunvalación Prof. Juan Bosch (tramo II)",
    hours: "Operación continua",
    paymentNote: "Continuación del anillo periférico; revisa ramales y salidas.",
    description: "Segundo tramo de la circunvalación; enlaza múltiples accesos metropolitanos del Gran Santo Domingo.",
  },
  {
    id: "juan-bosch-iib",
    name: "Peaje Juan Bosch IIB (tramo 2B)",
    subtitle: "Circunvalación Juan Bosch · 2B",
    regionLabel: "Santo Domingo",
    badges: ["Conexión tramo", "Paso Rápido"],
    latitude: 18.495,
    longitude: -70.0,
    ...TARIFA_CIRC,
    highway: "Circunvalación Prof. Juan Bosch (tramo 2B)",
    hours: "Operación continua",
    paymentNote: "Tramo 2B del mismo sistema de circunvalación.",
    description: "Rama complementaria del anillo Juan Bosch, según trazado oficial MOPC.",
  },
  {
    id: "marbella",
    name: "Peaje Marbella",
    subtitle: "Autop. Juan Pablo II · Km 10 (aprox.)",
    regionLabel: "Santo Domingo Este",
    badges: ["Nordeste", "Paso Rápido"],
    latitude: 18.51,
    longitude: -69.8,
    ...TARIFA_STD,
    highway: "Autopista Juan Pablo II (Higüey / autovía del Nordeste – inicio troncal)",
    hours: "Operación continua",
    paymentNote: "Fue de los peajes con actualización a RD$100 (livianos) en 2025.",
    description: "Paso de acceso a la troncal hacia el nordeste (Samaná / Monte Plata); conexión clave con la red oriental.",
  },
  {
    id: "guaraguao",
    name: "Peaje Guaraguao",
    subtitle: "Autovía del Nordeste · Km 69 (aprox.)",
    regionLabel: "Pimentel / Duarte",
    badges: ["Nordeste", "24/7"],
    latitude: 19.12,
    longitude: -70.12,
    ...TARIFA_NORDESTE,
    highway: "Autovía del Nordeste",
    hours: "Operación continua",
    paymentNote: "Tarifas mayores al corredor estándar; señalética indica carril y categoría.",
    description: "Segunda estación en el eje de la Autovía del Nordeste, en zona de Pimentel / corredor Duarte.",
  },
  {
    id: "naranjal",
    name: "Peaje Naranjal",
    subtitle: "Autovía del Nordeste · Km 145 (aprox.)",
    regionLabel: "Naranjal / Monte Plata",
    badges: ["Nordeste", "24/7"],
    latitude: 18.82,
    longitude: -70.0,
    ...TARIFA_NORDESTE,
    highway: "Autovía del Nordeste",
    hours: "Operación continua",
    paymentNote: "Junto a Guaraguao y Catey conforma el costo del eje hacia Samaná.",
    description: "Tercer peaje principal del corredor nordeste; en municipio Naranjal, provincia Monte Plata.",
  },
  {
    id: "el-catey",
    name: "Peaje El Catey",
    subtitle: "Autop. / boulevard hacia Samaná · Km 225 (aprox.)",
    regionLabel: "Aeropuerto El Catey / Samaná",
    badges: ["Alta tarifa", "Turismo", "BTA"],
    latitude: 19.27,
    longitude: -69.74,
    ...TARIFA_CATEY,
    highway: "Boulevard Turístico del Atlántico / acceso noreste",
    hours: "Operación continua",
    paymentNote: "Entre las tarifas más altas del sistema (livianos y pesados).",
    description: "Cerca del aeropuerto Samaná El Catey y conexión hacia Las Terrenas / Samaná; vía con fuerte componente turístico.",
  },
  {
    id: "azua",
    name: "Peaje Azua",
    subtitle: "Vía de peaje en Azua (2023–)",
    regionLabel: "Azua",
    badges: ["Sur", "Paso Rápido"],
    latitude: 18.45,
    longitude: -70.74,
    ...TARIFA_CIRC,
    highway: "Sistema vial de Azua (MOPC / RD Vial)",
    hours: "Operación continua",
    paymentNote: "Inaugurado en 2023; confirma categoría y promociones locales.",
    description: "Peaje al sur, en el corredor hacia la región de Azua; busca aliviar y financiar obras de la vía de acceso.",
  },
];
