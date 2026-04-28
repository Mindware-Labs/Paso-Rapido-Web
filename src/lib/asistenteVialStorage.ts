import type {
  AssistantAction,
  AssistantContext,
} from "@/lib/asistenteVial";

export type AsistenteVialMsg = {
  id: string;
  from: "bot" | "user";
  text: string;
  time: string;
  action?: AssistantAction;
  confirmRequired?: boolean;
};

export type SavedAsistenteConversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: AsistenteVialMsg[];
  context: AssistantContext;
};

const SAVED_KEY = "pasorapido:asistente-vial:saved-v1";
const DRAFT_MESSAGES_KEY = "pasorapido:asistente-vial:chat";
const DRAFT_CONTEXT_KEY = "pasorapido:asistente-vial:context";

export function loadSavedConversations(): SavedAsistenteConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x) =>
        x &&
        typeof x === "object" &&
        "id" in x &&
        "title" in x &&
        "messages" in x,
    ) as SavedAsistenteConversation[];
  } catch {
    return [];
  }
}

export function persistSavedConversations(
  list: SavedAsistenteConversation[],
): void {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  } catch {
    /* quota */
  }
}

export function loadDraft(): {
  messages: AsistenteVialMsg[] | null;
  context: AssistantContext | null;
} {
  if (typeof window === "undefined")
    return { messages: null, context: null };
  try {
    const rawM = localStorage.getItem(DRAFT_MESSAGES_KEY);
    const rawC = localStorage.getItem(DRAFT_CONTEXT_KEY);
    return {
      messages: rawM ? (JSON.parse(rawM) as AsistenteVialMsg[]) : null,
      context: rawC ? (JSON.parse(rawC) as AssistantContext) : null,
    };
  } catch {
    return { messages: null, context: null };
  }
}

export function persistDraft(
  messages: AsistenteVialMsg[],
  context: AssistantContext,
): void {
  try {
    localStorage.setItem(DRAFT_MESSAGES_KEY, JSON.stringify(messages));
    localStorage.setItem(DRAFT_CONTEXT_KEY, JSON.stringify(context));
  } catch {
    /* quota */
  }
}

export function clearDraftStorage(): void {
  try {
    localStorage.removeItem(DRAFT_MESSAGES_KEY);
    localStorage.removeItem(DRAFT_CONTEXT_KEY);
  } catch {
    /* no-op */
  }
}
