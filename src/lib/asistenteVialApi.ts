import {
  MAIN_APP_ROUTES,
  type AssistantAction,
  type AssistantContext,
  type MainAppRoute,
} from "@/lib/asistenteVial";

export type ServerChatResponse = {
  text: string;
  intent: string;
  context: AssistantContext;
  action?: AssistantAction;
  confirmRequired: boolean;
};

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, "");
}

function parseAction(raw: unknown): AssistantAction | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const a = raw as { type?: string; route?: string; value?: string };
  if (a.type === "phone" && typeof a.value === "string") {
    return { type: "phone", value: a.value };
  }
  if (a.type === "navigate" && typeof a.route === "string") {
    if ((MAIN_APP_ROUTES as readonly string[]).includes(a.route)) {
      return { type: "navigate", route: a.route as MainAppRoute };
    }
  }
  return undefined;
}

/**
 * `NEXT_PUBLIC_ASISTENTE_VIAL_URL` (p. ej. `http://localhost:8123`).
 * Opcional: `NEXT_PUBLIC_ASISTENTE_VIAL_KEY` si el servidor usa `ASISTENTE_VIAL_API_KEY`.
 */
export async function fetchAssistantFromServer(
  message: string,
  context: AssistantContext,
): Promise<ServerChatResponse> {
  const base = process.env.NEXT_PUBLIC_ASISTENTE_VIAL_URL;
  if (!base) {
    throw new Error("Falta NEXT_PUBLIC_ASISTENTE_VIAL_URL");
  }
  const key = (process.env.NEXT_PUBLIC_ASISTENTE_VIAL_KEY || "").trim();
  const res = await fetch(`${normalizeBaseUrl(base)}/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(key ? { "X-Asistente-Key": key } : {}),
    },
    body: JSON.stringify({ message, context }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`asistente-vial: HTTP ${res.status} ${errText || ""}`.trim());
  }
  const j = (await res.json()) as {
    text?: string;
    intent?: string;
    context?: AssistantContext;
    action?: unknown;
    confirmRequired?: boolean;
  };
  return {
    text: j.text ?? "",
    intent: j.intent ?? "unknown",
    context: (j.context && typeof j.context === "object" ? j.context : {}) as AssistantContext,
    action: parseAction(j.action),
    confirmRequired: Boolean(j.action && j.confirmRequired),
  };
}
