import { TOLL_SITES, type TollSite } from "@/data/tolls";

type Intent =
  | "greeting"
  | "toll_price"
  | "near_tolls"
  | "recharge"
  | "vehicles"
  | "help"
  | "emergency"
  | "unknown"
  | "add_flow";

export type AssistantContext = {
  lastTollId?: string;
};

export type AssistantReply = {
  text: string;
  intent: Intent;
  context: AssistantContext;
  action?: AssistantAction;
};

/** Rutas Expo alineadas con el menú y con `app/vial_scripts/navigation.py`. */
export const MAIN_APP_ROUTES = [
  "/(main)",
  "/(main)/recargar",
  "/(main)/peajes",
  "/(main)/vehiculos",
  "/(main)/ayuda",
  "/(main)/asistente-vial",
  "/(main)/notificaciones",
  "/(main)/cuenta",
  "/(main)/contrasena",
  "/(main)/metodos-pago",
  "/(main)/vinculados",
  "/(main)/reclamaciones",
  "/(main)/noticias",
  "/(main)/historico",
  "/(main)/movimientos",
  "/(main)/recurrentes",
  "/(main)/agregarVehiculo",
  "/(main)/VincularPersona",
] as const;

export type MainAppRoute = (typeof MAIN_APP_ROUTES)[number];

export type AssistantAction =
  | { type: "navigate"; route: MainAppRoute }
  | { type: "phone"; value: string };

const SUGGESTION_TEXT =
  "Tarifas y peajes, mapa, recargas, vehículos (incl. agregar uno), vincular una persona, métodos de pago, reclamos y más. Di “abre [pantalla]” para ir.";

function normalize(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

function isActionInstruction(normalized: string) {
  return includesAny(normalized, [
    "abre",
    "abrir",
    "llevame",
    "ve a",
    "ir a",
    "quiero ir",
    "quiero abrir",
    "navega",
    "muestrame",
    "vamos a",
    "agregar",
    "anade",
    "anadir",
    "registrar",
    "vincular",
    "nuevo",
    "nueva",
    "crear",
  ]);
}

function routeFromInstruction(normalized: string): AssistantAction | undefined {
  if (includesAny(normalized, ["inicio", "home", "principal", "pantalla principal"]) && !includesAny(normalized, ["notif", "recl"])) {
    return { type: "navigate", route: "/(main)" };
  }
  if (includesAny(normalized, ["agregar vehicul", "nuevo vehicul", "registrar vehicul", "nueva placa", "registrar placa", "nuevo carro", "nuevo auto"])) {
    return { type: "navigate", route: "/(main)/agregarVehiculo" };
  }
  if (includesAny(normalized, ["vincular per", "agregar vincul", "nueva vincu", "registrar vincul", "nueva per", "persona autoriz", "vincular alguien", "familiar vincu"])) {
    return { type: "navigate", route: "/(main)/VincularPersona" };
  }
  if (includesAny(normalized, ["nueva tarjeta", "agregar tarjeta", "nuevo metodo de pago", "agregar metodo", "nuevo pago", "registrar tarjeta"])) {
    return { type: "navigate", route: "/(main)/metodos-pago" };
  }
  if (includesAny(normalized, ["reclamaciones", "mis reclamaciones", "pantalla reclamacion "])) {
    return { type: "navigate", route: "/(main)/reclamaciones" };
  }
  if (includesAny(normalized, ["recargar", "recarga", "saldo", "top up", "cargar saldo", "billetera "])) {
    return { type: "navigate", route: "/(main)/recargar" };
  }
  if (includesAny(normalized, ["peajes", "peaje", "mapa de peaj", "mapa peaj", "mapa de vial", "vial "])) {
    return { type: "navigate", route: "/(main)/peajes" };
  }
  if (includesAny(normalized, ["asistente vial", "asistencia vial", "chat vial", "chat del peaje "])) {
    return { type: "navigate", route: "/(main)/asistente-vial" };
  }
  if (includesAny(normalized, ["vinculados", "listado vincu", "lista de vincu", "personas vincu", "mis vincu"])) {
    return { type: "navigate", route: "/(main)/vinculados" };
  }
  if (includesAny(normalized, ["metodo de pago", "metodos de pago", "billetera pago", "pago banco"]) && !includesAny(normalized, ["nueva tarj", "agregar t"])) {
    return { type: "navigate", route: "/(main)/metodos-pago" };
  }
  if (includesAny(normalized, ["vehicul", "placa", "mis carro", "registro de vehic", "mis aut"])) {
    return { type: "navigate", route: "/(main)/vehiculos" };
  }
  if (includesAny(normalized, ["ayuda", "soporte", "reclamo", "reclamacion"])) {
    return { type: "navigate", route: "/(main)/ayuda" };
  }
  if (includesAny(normalized, ["notificaciones", "alertas", "notificacion"])) {
    return { type: "navigate", route: "/(main)/notificaciones" };
  }
  if (includesAny(normalized, ["perfil", "mi cuenta", "mi perfil "]) && !includesAny(normalized, ["metodo", "banco", "pago p"])) {
    return { type: "navigate", route: "/(main)/cuenta" };
  }
  if (includesAny(normalized, ["contrasena", "password", "seguridad acceso", "cambio de clave"])) {
    return { type: "navigate", route: "/(main)/contrasena" };
  }
  if (includesAny(normalized, ["noticias", "novedades oficia", "novedad "])) {
    return { type: "navigate", route: "/(main)/noticias" };
  }
  if (includesAny(normalized, ["historico", "histórico", "historial d"])) {
    return { type: "navigate", route: "/(main)/historico" };
  }
  if (includesAny(normalized, ["movimient", "transaccion", "debito", "credito mov"])) {
    return { type: "navigate", route: "/(main)/movimientos" };
  }
  if (includesAny(normalized, ["recurrente", "pago automatico", "pago recurr", "suscripcion sald"])) {
    return { type: "navigate", route: "/(main)/recurrentes" };
  }
  if (includesAny(normalized, ["asistente", "asistente ", " asistente"])) {
    return { type: "navigate", route: "/(main)/asistente-vial" };
  }
  return undefined;
}

function findTollInMessage(normalized: string): TollSite | undefined {
  return TOLL_SITES.find((t) => {
    const n = normalize(t.name);
    const short = n.replace("peaje ", "").replace("autopista ", "");
    return normalized.includes(n) || normalized.includes(short);
  });
}

function tollSummary(t: TollSite) {
  return `${t.name}: carros ${t.car}, autobuses ${t.bus}, camiones ${t.truck}.`;
}

function topZones() {
  const regions = new Set<string>();
  for (const t of TOLL_SITES) regions.add(t.regionLabel);
  return Array.from(regions).slice(0, 4).join(", ");
}

function nearestExamples() {
  return TOLL_SITES.slice(0, 3)
    .map((t) => t.name.replace("Peaje ", ""))
    .join(", ");
}

function wantsAddVehicle(n: string) {
  if (!includesAny(n, ["agregar", "nuevo", "nueva", "registrar", "anade", "anadir", "crear"])) return false;
  if (!includesAny(n, ["vehicul", "placa", "carro", "auto", "moto"])) return false;
  if (includesAny(n, ["vincul", "familiar "])) return false;
  return true;
}

function wantsVincularPersona(n: string) {
  return (
    includesAny(n, [
      "vincular per",
      "vincular familiar",
      "vincular al",
      "agregar vincu",
      "nueva vincu",
      "registrar vincu",
      "nueva per",
    ]) && !includesAny(n, ["vinculados", "listado vincu", "mis vincu"])
  );
}

function wantsAddPayment(n: string) {
  if (!includesAny(n, ["agregar", "nueva", "nuevo", "registrar", "anade", "anadir"])) return false;
  if (includesAny(n, ["vehicul", "vincu", "peaje "])) return false;
  if (includesAny(n, ["tarjeta", "pago banco", "metodo de p", "banco", "pago n"])) return true;
  return false;
}

export function createAssistantReply(input: string, prev: AssistantContext): AssistantReply {
  const normalized = normalize(input);
  const toll = findTollInMessage(normalized);
  const instructedAction = routeFromInstruction(normalized);
  if (isActionInstruction(normalized) && instructedAction) {
    return {
      intent: "help",
      context: prev,
      action: instructedAction,
      text: "Listo. ¿Confirmas la acción? Te llevaré a la pantalla indicada.",
    };
  }

  if (includesAny(normalized, ["hola", "buenas", "saludos", "hello", "qué tal", "que tal"])) {
    return {
      intent: "greeting",
      context: prev,
      text: `Hola, soy el asistente vial. ${SUGGESTION_TEXT}`,
    };
  }

  if (includesAny(normalized, ["911", "accidente", "emergencia", "auxilio", "grua", "rescat", "herido", "ambulanc"])) {
    return {
      intent: "emergency",
      context: prev,
      action: { type: "phone", value: "911" },
      text:
        "Parece un tema de emergencia. Puedo abrir el marcador al 911, o seguimos con peajes y la app.",
    };
  }

  if (includesAny(normalized, ["tarifa", "precio", "cuanto", "peaje", "cost", "pagar", "cuesta", "monto"])) {
    if (toll) {
      return {
        intent: "toll_price",
        context: { ...prev, lastTollId: toll.id },
        text: `${tollSummary(toll)} Referencia para ${toll.regionLabel}.`,
      };
    }
    if (prev.lastTollId) {
      const last = TOLL_SITES.find((t) => t.id === prev.lastTollId);
      if (last) {
        return {
          intent: "toll_price",
          context: prev,
          text: `Sobre ${last.name}: carros ${last.car}, autobuses ${last.bus}, camiones ${last.truck}.`,
        };
      }
    }
    return {
      intent: "toll_price",
      context: prev,
      text: `Dime un peaje por nombre (por ejemplo: Las Américas o Autopista del Coral) o pide el mapa en “Peajes”. ${SUGGESTION_TEXT}`,
    };
  }

  if (includesAny(normalized, ["cerca", "proximo", "zona", "region", "ubicacion", "donde ", "peajes cerca"])) {
    return {
      intent: "near_tolls",
      context: prev,
      text: `Zonas: ${topZones()}. Algunos peajes: ${nearestExamples()}. Puedo abrir el mapa con “abre peajes”.`,
    };
  }

  if (wantsAddVehicle(normalized)) {
    return {
      intent: "add_flow",
      context: prev,
      action: { type: "navigate", route: "/(main)/agregarVehiculo" },
      text: "Puedo llevarte a Agregar vehículo para completar placa, datos y tag. Toca el botón cuando quieras.",
    };
  }

  if (wantsVincularPersona(normalized)) {
    return {
      intent: "add_flow",
      context: prev,
      action: { type: "navigate", route: "/(main)/VincularPersona" },
      text: "Para añadir una persona autorizada (vínculo), abre el formulario desde aquí. Confirma y completa los datos requeridos.",
    };
  }

  if (wantsAddPayment(normalized)) {
    return {
      intent: "add_flow",
      context: prev,
      action: { type: "navigate", route: "/(main)/metodos-pago" },
      text: "Puedo abrir Métodos de pago para registrar o cambiar una tarjeta. Confirma para continuar en la app.",
    };
  }

  if (includesAny(normalized, ["recarga", "saldo", "balance", "pagar tag", "top up", "billetera "]) && !includesAny(normalized, ["peaje t", "tarifa "])) {
    return {
      intent: "recharge",
      context: prev,
      action: includesAny(normalized, ["quiero", "abre", "ir", "llevam"]) ? { type: "navigate", route: "/(main)/recargar" } : undefined,
      text: "Puedes recargar con la pestaña Recargar, revisar el histórico o configurar recargas recurrentes en el menú.",
    };
  }

  if (includesAny(normalized, ["vehiculo", "vehiculos", "placa", "auto", "carro", "moto "]) && !wantsAddVehicle(normalized)) {
    return {
      intent: "vehicles",
      context: prev,
      action: includesAny(normalized, ["abre", "ir", "llevam", "mis veh", "ve a"]) ? { type: "navigate", route: "/(main)/vehiculos" } : undefined,
      text: "En Mis vehículos ves placas, estado y movimientos. Para añadir uno, di: “agregar vehículo” o “nuevo vehículo”.",
    };
  }

  if (includesAny(normalized, ["ayuda", "soporte", "reclamo", "notificacion", "problema", "queja"])) {
    return {
      intent: "help",
      context: prev,
      action: includesAny(normalized, ["abre", "ir", "llevam", "pantalla ayu"]) ? { type: "navigate", route: "/(main)/ayuda" } : undefined,
      text: "Revisa notificaciones e historial. Si aplica, abre una reclamación con peaje, hora y monto. También: “reclamaciones” en el menú.",
    };
  }

  return {
    intent: "unknown",
    context: prev,
    text: `No tengo una respuesta exacta. ${SUGGESTION_TEXT}`,
  };
}
