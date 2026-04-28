"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BotMessageSquare,
  CarFront,
  CircleHelp,
  History,
  Loader2,
  MapPinned,
  MessageSquarePlus,
  Save,
  SendHorizonal,
  Sparkles,
  Trash2,
  Wallet,
} from "lucide-react";
import {
  createAssistantReply,
  type AssistantAction,
  type AssistantContext,
} from "@/lib/asistenteVial";
import { fetchAssistantFromServer } from "@/lib/asistenteVialApi";
import { mainRouteToWebPath } from "@/lib/asistenteVialWebPaths";
import {
  clearDraftStorage,
  loadDraft,
  loadSavedConversations,
  persistDraft,
  persistSavedConversations,
  type AsistenteVialMsg,
  type SavedAsistenteConversation,
} from "@/lib/asistenteVialStorage";
import { Button } from "@/components/ui/button";

type Msg = AsistenteVialMsg;

const BASE_MESSAGES: Msg[] = [
  {
    id: "1",
    from: "bot",
    text: "Hola, soy el asistente vial. Pregunta por peajes, recargas, vehículos, vinculados, métodos de pago y más. Puedes guardar la charla con un nombre y verla luego en el historial a la izquierda.",
    time: "Ahora",
  },
];

const SITE_QUICK: { href: string; label: string; Icon: typeof MapPinned }[] = [
  { href: "/dashboard/peajes", label: "Red de peajes", Icon: MapPinned },
  { href: "/dashboard/recargar", label: "Recargar", Icon: Wallet },
  { href: "/dashboard/vehiculos", label: "Vehículos", Icon: CarFront },
  { href: "/dashboard/ayuda", label: "Centro de ayuda", Icon: CircleHelp },
];

function useHasRemoteAssistant(): boolean {
  return Boolean(
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_ASISTENTE_VIAL_URL,
  );
}

export function AsistenteVialChat() {
  const router = useRouter();
  const listId = useId();
  const [messages, setMessages] = useState<Msg[]>(BASE_MESSAGES);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [savedConversations, setSavedConversations] = useState<
    SavedAsistenteConversation[]
  >([]);
  const [draftReady, setDraftReady] = useState(false);
  const contextRef = useRef<AssistantContext>({});
  const endRef = useRef<HTMLDivElement>(null);
  const hasRemote = useHasRemoteAssistant();

  const quickPrompts = useMemo(
    () => [
      "Tarifa Las Américas",
      "Mapa de peajes",
      "Necesito recargar",
      "Agregar un vehículo",
      "Vincular a una persona",
      "Añadir método de pago",
      "Ayuda con un reclamo",
    ],
    [],
  );

  useEffect(() => {
    setSavedConversations(loadSavedConversations());
    try {
      const { messages: m, context: c } = loadDraft();
      if (m && Array.isArray(m) && m.length > 0) {
        setMessages(m);
      }
      if (c && typeof c === "object") {
        contextRef.current = c;
      }
    } catch {
      /* no-op */
    }
    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    persistDraft(messages, contextRef.current);
  }, [messages, draftReady]);

  useEffect(() => {
    persistSavedConversations(savedConversations);
  }, [savedConversations]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const now = () =>
    new Intl.DateTimeFormat("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

  const pushUserMessage = (value: string) => {
    const id = `${Date.now()}-u`;
    setMessages((prev) => [...prev, { id, from: "user", text: value, time: now() }]);
  };

  const pushBotMessage = (
    value: string,
    action?: AssistantAction,
    confirmRequired = false,
  ) => {
    const id = `${Date.now()}-b`;
    setMessages((prev) => [
      ...prev,
      { id, from: "bot", text: value, time: now(), action, confirmRequired },
    ]);
  };

  const runAction = (action: AssistantAction) => {
    if (action.type === "navigate") {
      router.push(mainRouteToWebPath(action.route));
      return;
    }
    if (action.type === "phone") {
      window.location.href = `tel:${action.value}`;
    }
  };

  const defaultSaveTitle = () => {
    const firstUser = messages.find((x) => x.from === "user");
    if (firstUser?.text) {
      const t = firstUser.text.replace(/\s+/g, " ").trim();
      return t.length > 48 ? `${t.slice(0, 48)}…` : t;
    }
    return `Conversación ${new Date().toLocaleString("es-DO", { dateStyle: "short", timeStyle: "short" })}`;
  };

  const saveConversationToList = () => {
    if (messages.length <= 1) {
      setStatusText("Escribe al menos un mensaje para guardar en el historial");
      window.setTimeout(() => setStatusText(null), 2500);
      return;
    }
    const input = window.prompt("Nombre para esta conversación", defaultSaveTitle());
    if (input === null) return;
    const title = input.trim();
    if (!title) {
      setStatusText("Sin título: no se guardó");
      window.setTimeout(() => setStatusText(null), 2000);
      return;
    }
    try {
      const id = `s-${Date.now()}`;
      const now = Date.now();
      const entry: SavedAsistenteConversation = {
        id,
        title,
        createdAt: now,
        updatedAt: now,
        messages: messages.map((m) => ({ ...m })),
        context: { ...contextRef.current },
      };
      setSavedConversations((prev) => [entry, ...prev]);
      setStatusText(`Guardada: “${title}”`);
      window.setTimeout(() => setStatusText(null), 2500);
      requestAnimationFrame(() => {
        document
          .getElementById("conversaciones-guardadas")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } catch {
      setStatusText("No se pudo guardar (almacenamiento lleno o bloqueado)");
      window.setTimeout(() => setStatusText(null), 3000);
    }
  };

  const loadSavedIntoChat = (entry: SavedAsistenteConversation) => {
    setMessages(
      entry.messages.length > 0
        ? entry.messages.map((m) => ({ ...m }))
        : BASE_MESSAGES,
    );
    contextRef.current = { ...entry.context };
    persistDraft(
      entry.messages.length > 0 ? entry.messages.map((m) => ({ ...m })) : BASE_MESSAGES,
      { ...entry.context },
    );
    setStatusText(`Cargada: “${entry.title}”`);
    window.setTimeout(() => setStatusText(null), 2000);
  };

  const removeSaved = (id: string, title: string) => {
    if (!window.confirm(`¿Quitar “${title}” del historial guardado?`)) return;
    setSavedConversations((prev) => prev.filter((s) => s.id !== id));
    setStatusText("Conversación quitada del historial");
    window.setTimeout(() => setStatusText(null), 2000);
  };

  const startNewChat = () => {
    if (
      messages.length > 1 &&
      !window.confirm(
        "¿Empezar una charla nueva? El borrador actual se reemplaza (las guardadas en el historial no se eliminan).",
      )
    ) {
      return;
    }
    setMessages(BASE_MESSAGES);
    contextRef.current = {};
    setText("");
    setTyping(false);
    clearDraftStorage();
    setStatusText("Nueva conversación");
    window.setTimeout(() => setStatusText(null), 1800);
  };

  const clearConversation = () => {
    if (
      !window.confirm(
        "¿Borrar toda la conversación? No afecta tu cuenta, solo el texto en este dispositivo.",
      )
    ) {
      return;
    }
    setMessages(BASE_MESSAGES);
    contextRef.current = {};
    setText("");
    setTyping(false);
    clearDraftStorage();
    setStatusText("Conversación borrada");
    window.setTimeout(() => setStatusText(null), 1600);
  };

  const clearMessageAction = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, action: undefined, confirmRequired: false } : m,
      ),
    );
  };

  const send = async (preset?: string) => {
    const v = (preset ?? text).trim();
    if (!v) return;
    pushUserMessage(v);
    setText("");
    setTyping(true);
    const remote = (process.env.NEXT_PUBLIC_ASISTENTE_VIAL_URL || "").trim();
    let replyText: string;
    let replyAction: AssistantAction | undefined;
    let confirmRequired: boolean;
    try {
      if (remote) {
        try {
          const r = await fetchAssistantFromServer(v, contextRef.current);
          contextRef.current = r.context;
          replyText = r.text;
          replyAction = r.action;
          confirmRequired = r.confirmRequired;
        } catch {
          const local = createAssistantReply(v, contextRef.current);
          contextRef.current = local.context;
          replyText = local.text;
          replyAction = local.action;
          confirmRequired = Boolean(local.action);
        }
      } else {
        await new Promise((r) => setTimeout(r, 400));
        const local = createAssistantReply(v, contextRef.current);
        contextRef.current = local.context;
        replyText = local.text;
        replyAction = local.action;
        confirmRequired = Boolean(local.action);
      }
    } finally {
      setTyping(false);
    }
    pushBotMessage(replyText, replyAction, confirmRequired);
  };

  return (
    <div className="pr-grain min-h-0">
      <div
        className="h-1 w-full bg-pr-hero"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        <header>
          <div className="flex items-center gap-3">
            <span
              className="h-9 w-1 shrink-0 rounded-full bg-pr-hero shadow-sm shadow-pr-hero/30"
              aria-hidden
            />
            <div>
              <h1 className="text-2xl font-bold text-pr-foreground sm:text-3xl">
                Asistencia vial
              </h1>
              <p className="mt-1 text-sm text-pr-foreground/80">
                Usa <strong className="text-pr-foreground">Guardar</strong> para
                añadir la charla al historial. Borrador en este dispositivo — misma
                lógica que en la app móvil.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <section
          id="conversaciones-guardadas"
          aria-labelledby={`${listId}-saved`}
          className="scroll-mt-24 rounded-2xl border-2 border-pr-hero/35 bg-pr-secondary/25 p-4 shadow-md ring-1 ring-pr-hero/15 lg:col-span-4 lg:max-h-[min(calc(100vh-7rem),860px)] lg:overflow-y-auto lg:sticky lg:top-20"
        >
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-pr-hero/15 pb-3">
            <h2
              id={`${listId}-saved`}
              className="flex items-center gap-2 text-base font-extrabold text-pr-foreground sm:text-lg"
            >
              <History className="h-5 w-5 text-pr-hero" strokeWidth={1.75} />
              Conversaciones guardadas
            </h2>
            <p className="text-[10px] font-medium text-pr-secondary-fg">
              Solo en este navegador
            </p>
          </div>
          {savedConversations.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-pr-foreground/80">
              Aún no hay entradas. Pulsa{" "}
              <strong className="text-pr-foreground">Guardar</strong> en la barra del
              chat para añadir la charla con un nombre; aparecerá aquí.
            </p>
          ) : (
            <ul className="mt-3 space-y-2" role="list">
              {savedConversations.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-col gap-2 rounded-xl border border-pr-border/80 bg-pr-card p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-pr-foreground">{s.title}</p>
                    <p className="text-[10px] text-pr-muted-fg">
                      {new Date(s.updatedAt).toLocaleString("es-DO", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}{" "}
                      · {s.messages.length} mensajes
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-8 font-bold"
                      onClick={() => loadSavedIntoChat(s)}
                    >
                      Abrir
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 font-bold text-pr-destructive hover:bg-pr-destructive/10"
                      onClick={() => removeSaved(s.id, s.title)}
                    >
                      Quitar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="min-w-0 space-y-6 lg:col-span-8">
        <div className="rounded-xl border border-pr-border bg-pr-card p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-pr-hero/25 bg-pr-secondary"
              >
                <BotMessageSquare
                  className="h-5 w-5 text-pr-hero"
                  strokeWidth={1.5}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-pr-foreground">
                  Asistente vial
                </p>
                <p className="truncate text-xs text-pr-muted-fg">
                  Paso Rápido — peajes, cuenta y vía
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <div
                className="mr-1 flex h-8 items-center gap-1 rounded-md bg-pr-secondary px-2.5"
                title={hasRemote ? "Hay URL de API configurada" : "Solo lógica local + datos de peajes"}
              >
                <Sparkles className="h-3.5 w-3.5 text-pr-hero" />
                <span className="text-[9px] font-extrabold uppercase tracking-wide text-pr-secondary-fg">
                  {hasRemote ? "Con API" : "En línea"}
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-8 gap-1 border-pr-border px-2.5 sm:px-3"
                onClick={startNewChat}
                title="Nueva conversación (borrador)"
                aria-label="Nueva conversación"
              >
                <MessageSquarePlus className="h-4 w-4 text-pr-hero" />
                <span className="hidden text-xs font-bold sm:inline">Nueva</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-8 gap-1 border-pr-border border-pr-hero/40 bg-pr-secondary/30 px-2.5 sm:px-3"
                onClick={saveConversationToList}
                title="Asigna un nombre y añade esta charla al panel de conversaciones guardadas"
                aria-label="Guardar conversación en el historial"
              >
                <Save className="h-4 w-4 text-pr-hero" />
                <span className="text-xs font-extrabold">Guardar</span>
              </Button>
              <a
                href="#conversaciones-guardadas"
                className="inline-flex h-8 items-center rounded-md border border-dashed border-pr-hero/50 px-2.5 text-[10px] font-extrabold uppercase tracking-wide text-pr-hero hover:bg-pr-secondary/60 lg:hidden"
              >
                Ver historial
              </a>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 border-pr-border"
                onClick={clearConversation}
                title="Borrar historial"
                aria-label="Borrar conversación"
              >
                <Trash2 className="h-4 w-4 text-pr-destructive" />
              </Button>
            </div>
          </div>

          {statusText ? (
            <p
              className="mt-2 text-xs font-semibold text-pr-secondary-fg"
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>
          ) : null}
        </div>

        <section aria-labelledby={`${listId}-shortcuts`}>
          <h2
            id={`${listId}-shortcuts`}
            className="text-[10px] font-extrabold uppercase tracking-wider text-pr-hero"
          >
            Secciones del sitio
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {SITE_QUICK.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-pr-hero/25 bg-white px-3 py-1.5 text-xs font-bold text-pr-hero shadow-sm transition hover:bg-pr-secondary"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="min-w-0">
        <h2
          className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-pr-hero"
        >
          Chat
        </h2>
        <div
          className="flex min-h-[min(56vh,520px)] flex-col rounded-2xl border border-pr-border bg-pr-card/80 shadow-inner"
        >
          <div
            className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div
              className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => void send(p)}
                  className="shrink-0 rounded-full border border-pr-hero/30 bg-pr-secondary/50 px-3.5 py-2 text-left text-xs font-bold text-pr-hero shadow-sm transition hover:bg-pr-secondary"
                >
                  {p}
                </button>
              ))}
            </div>

            {messages.map((m) => {
              const user = m.from === "user";
              if (user) {
                return (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[min(100%,32rem)] rounded-2xl rounded-br-md bg-pr-hero px-3.5 py-2.5 text-pr-on-hero shadow-sm">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>
                      <p className="mt-1.5 text-end text-[10px] font-semibold text-white/80">
                        {m.time}
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={m.id} className="flex gap-2.5">
                  <div
                    className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pr-secondary"
                    aria-hidden
                  >
                    <BotMessageSquare className="h-4 w-4 text-pr-hero" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-pr-muted-fg">
                      Asistente
                    </p>
                    <div
                      className="mt-1 max-w-[min(100%,40rem)] rounded-2xl border border-pr-border border-l-4 border-l-pr-hero bg-pr-card px-3.5 py-2.5 shadow-sm"
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-pr-foreground">
                        {m.text}
                      </p>
                      {m.action ? (
                        m.confirmRequired ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Button
                              type="button"
                              size="sm"
                              className="h-8 bg-pr-hero text-sm font-extrabold text-pr-on-hero hover:bg-pr-hero/90"
                              onClick={() => {
                                runAction(m.action as AssistantAction);
                                clearMessageAction(m.id);
                              }}
                            >
                              Confirmar
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-8"
                              onClick={() => clearMessageAction(m.id)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="mt-2 h-8 font-bold"
                            onClick={() => runAction(m.action as AssistantAction)}
                          >
                            {m.action.type === "phone"
                              ? "Llamar"
                              : "Abrir en el sitio"}
                          </Button>
                        )
                      ) : null}
                      <p className="mt-1.5 text-end text-[10px] font-semibold text-pr-muted-fg">
                        {m.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {typing ? (
              <div className="flex gap-2.5">
                <div
                  className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pr-secondary opacity-80"
                >
                  <BotMessageSquare className="h-4 w-4 text-pr-hero" />
                </div>
                <div className="flex min-h-12 items-center gap-2 rounded-2xl border border-pr-border bg-pr-muted px-3.5 py-2">
                  <Loader2
                    className="h-4 w-4 shrink-0 animate-spin text-pr-hero"
                    aria-hidden
                  />
                  <span className="text-xs font-bold text-pr-muted-fg">Escribiendo…</span>
                </div>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-pr-border bg-pr-card p-3 sm:px-4 sm:py-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <label className="sr-only" htmlFor={`${listId}-composer`}>
                Mensaje
              </label>
              <textarea
                id={`${listId}-composer`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={2}
                maxLength={2000}
                placeholder="Escribe un mensaje… (Enter envía, mayús+Enter = nueva línea)"
                className="min-h-[2.75rem] flex-1 resize-y rounded-xl border border-pr-border bg-pr-muted/80 px-3 py-2.5 text-sm text-pr-foreground placeholder:text-pr-muted-fg focus:border-pr-hero/50 focus:outline-none focus:ring-2 focus:ring-pr-hero/20"
              />
              <Button
                type="button"
                className="h-12 shrink-0 gap-1.5 bg-pr-hero px-4 font-extrabold text-pr-on-hero hover:bg-pr-hero/90"
                onClick={() => void send()}
                aria-label="Enviar mensaje"
              >
                <SendHorizonal className="h-5 w-5" />
                Enviar
              </Button>
            </div>
            <p className="mt-2 text-[10px] text-pr-muted-fg">
              {hasRemote
                ? "Intentamos el servidor de asistencia; si falla, usamos la misma lógica local que la app móvil."
                : "Respuestas con la lógica local y datos de peajes de la app. Configura NEXT_PUBLIC_ASISTENTE_VIAL_URL para conectar el mismo backend del servidor vial."}
            </p>
          </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
