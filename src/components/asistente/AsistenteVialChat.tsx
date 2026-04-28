"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Msg = AsistenteVialMsg;

const BASE_MESSAGES: Msg[] = [
  {
    id: "1",
    from: "bot",
    text: "Hola, soy el asistente vial. Pregunta por peajes, recargas, vehículos, vinculados, métodos de pago y más. Puedes guardar la charla con un nombre y verla luego en el historial, más abajo en la página.",
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

function PageBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 pr-grain-dots opacity-35 [background-size:22px_22px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 pr-hero-mesh opacity-[0.22] [mask-image:linear-gradient(180deg,black_0%,black_45%,transparent_100%)]"
        aria-hidden
      />
    </>
  );
}

export function AsistenteVialChat() {
  const router = useRouter();
  const listId = useId();
  const [messages, setMessages] = useState<Msg[]>(BASE_MESSAGES);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [savedConversations, setSavedConversations] = useState<SavedAsistenteConversation[]>(
    [],
  );
  const [draftReady, setDraftReady] = useState(false);
  const contextRef = useRef<AssistantContext>({});
  const endRef = useRef<HTMLDivElement>(null);
  const hasRemote = useHasRemoteAssistant();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [confirmState, setConfirmState] = useState<
    | { type: "newChat" }
    | { type: "clear" }
    | { type: "remove"; id: string; title: string }
    | null
  >(null);

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

  const openSaveModal = () => {
    if (messages.length <= 1) {
      setStatusText("Escribe al menos un mensaje para guardar en el historial");
      window.setTimeout(() => setStatusText(null), 2500);
      return;
    }
    setSaveName(defaultSaveTitle());
    setSaveModalOpen(true);
  };

  const applySaveFromModal = () => {
    const title = saveName.trim();
    if (!title) {
      setStatusText("Sin título: no se guardó");
      window.setTimeout(() => setStatusText(null), 2000);
      return;
    }
    try {
      const id = `s-${Date.now()}`;
      const t = Date.now();
      const entry: SavedAsistenteConversation = {
        id,
        title,
        createdAt: t,
        updatedAt: t,
        messages: messages.map((m) => ({ ...m })),
        context: { ...contextRef.current },
      };
      setSavedConversations((prev) => [entry, ...prev]);
      setSaveModalOpen(false);
      setStatusText(`Guardada: “${title}”`);
      window.setTimeout(() => setStatusText(null), 2500);
      requestAnimationFrame(() => {
        document.getElementById("conversaciones-guardadas")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
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

  const requestRemoveSaved = (id: string, title: string) => {
    setConfirmState({ type: "remove", id, title });
  };

  const performRemoveSaved = (id: string) => {
    setSavedConversations((prev) => prev.filter((s) => s.id !== id));
    setStatusText("Conversación quitada del historial");
    window.setTimeout(() => setStatusText(null), 2000);
  };

  const doNewChat = () => {
    setMessages(BASE_MESSAGES);
    contextRef.current = {};
    setText("");
    setTyping(false);
    clearDraftStorage();
    setStatusText("Nueva conversación");
    window.setTimeout(() => setStatusText(null), 1800);
  };

  const startNewChat = () => {
    if (messages.length > 1) {
      setConfirmState({ type: "newChat" });
      return;
    }
    doNewChat();
  };

  const doClearConversation = () => {
    setMessages(BASE_MESSAGES);
    contextRef.current = {};
    setText("");
    setTyping(false);
    clearDraftStorage();
    setStatusText("Conversación borrada");
    window.setTimeout(() => setStatusText(null), 1600);
  };

  const clearConversation = () => {
    setConfirmState({ type: "clear" });
  };

  const onConfirmAction = () => {
    if (!confirmState) return;
    if (confirmState.type === "remove") {
      performRemoveSaved(confirmState.id);
    } else if (confirmState.type === "newChat") {
      doNewChat();
    } else {
      doClearConversation();
    }
    setConfirmState(null);
  };

  const clearMessageAction = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, action: undefined, confirmRequired: false } : m)),
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
    <div className="relative flex min-h-full min-h-0 flex-col overflow-hidden bg-slate-50/50 pb-10">
      <PageBackdrop />

      <div className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="shrink-0 border-b border-slate-200/90 pb-5">
          <Link
            href="/dashboard"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-emerald-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Volver al panel
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Soporte</p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Asistencia vial
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
            Use <strong className="font-semibold text-slate-700">Guardar</strong> para añadir la
            charla al historial (debajo del chat).
          </p>
        </header>

        {/* Bloque de chat: ocupa el alto útil (viewport); el hilo rellena el espacio entre cabecera y caja de envío */}
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/80">
                    <BotMessageSquare className="h-5 w-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">Asistente vial</p>
                    <p className="truncate text-xs text-slate-500">Paso Rápido — peajes, cuenta y vía</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <div
                    className="mr-1 flex h-8 items-center gap-1 rounded-md border border-emerald-200/80 bg-emerald-50/60 px-2.5"
                    title={hasRemote ? "Hay URL de API configurada" : "Lógica local + datos de peajes"}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                    <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-800/90">
                      {hasRemote ? "Con API" : "En línea"}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 gap-1 border-slate-200 px-2.5 sm:px-3"
                    onClick={startNewChat}
                    title="Nueva conversación (borrador)"
                    aria-label="Nueva conversación"
                  >
                    <MessageSquarePlus className="h-4 w-4 text-emerald-600" />
                    <span className="hidden text-xs font-bold sm:inline">Nueva</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 gap-1 border border-emerald-200/80 bg-emerald-50/40 px-2.5 sm:px-3"
                    onClick={openSaveModal}
                    title="Asigna un nombre y añade al historial"
                    aria-label="Guardar conversación en el historial"
                  >
                    <Save className="h-4 w-4 text-emerald-700" />
                    <span className="text-xs font-bold">Guardar</span>
                  </Button>
                  <a
                    href="#conversaciones-guardadas"
                    className="inline-flex h-8 items-center rounded-md border border-dashed border-slate-300 px-2.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50"
                  >
                    Ver historial
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-200"
                    onClick={clearConversation}
                    title="Borrar borrador de conversación"
                    aria-label="Borrar conversación"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              {statusText ? (
                <p
                  className="mt-2 text-xs font-semibold text-emerald-800/90"
                  role="status"
                  aria-live="polite"
                >
                  {statusText}
                </p>
              ) : null}
            </div>

            <section aria-labelledby={`${listId}-shortcuts`} className="mt-4">
              <h2
                id={`${listId}-shortcuts`}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Secciones del sitio
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {SITE_QUICK.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60"
                    >
                      <Icon className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.75} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

          <div
            className={cn(
              "mt-4 flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white",
              "min-h-[min(100%,420px)] h-[min(70dvh,calc(100dvh-18rem))] max-h-[min(880px,calc(100dvh-14rem))] shadow-sm ring-1 ring-slate-900/[0.04]",
            )}
          >
            <h2 className="sr-only">Chat</h2>
            <div className="h-0.5 w-full shrink-0 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" aria-hidden />

            <div
              className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-3 sm:p-4"
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
                        className="shrink-0 rounded-full border border-emerald-200/90 bg-emerald-50/50 px-3.5 py-2 text-left text-xs font-bold text-emerald-900/90 transition hover:border-emerald-300 hover:bg-emerald-100/50"
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
                          <div className="max-w-[min(100%,32rem)] rounded-2xl rounded-br-md bg-emerald-600 px-3.5 py-2.5 text-white shadow-sm">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>
                            <p className="mt-1.5 text-end text-[10px] font-semibold text-white/85">
                              {m.time}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={m.id} className="flex gap-2.5">
                        <div
                          className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50"
                          aria-hidden
                        >
                          <BotMessageSquare className="h-4 w-4 text-emerald-700" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Asistente
                          </p>
                          <div
                            className="mt-1 max-w-[min(100%,40rem)] rounded-2xl border border-slate-200/90 border-l-4 border-l-emerald-500 bg-white px-3.5 py-2.5 shadow-sm"
                          >
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                              {m.text}
                            </p>
                            {m.action ? (
                              m.confirmRequired ? (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    size="sm"
                                    className="h-8 bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
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
                                    className="h-8 border-slate-200"
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
                                  className="mt-2 h-8 border border-slate-200 font-bold"
                                  onClick={() => runAction(m.action as AssistantAction)}
                                >
                                  {m.action.type === "phone" ? "Llamar" : "Abrir en el sitio"}
                                </Button>
                              )
                            ) : null}
                            <p className="mt-1.5 text-end text-[10px] font-semibold text-slate-500">
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
                        className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 opacity-90"
                      >
                        <BotMessageSquare className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex min-h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2">
                        <Loader2
                          className="h-4 w-4 shrink-0 animate-spin text-emerald-600"
                          aria-hidden
                        />
                        <span className="text-xs font-bold text-slate-500">Escribiendo…</span>
                      </div>
                    </div>
                  ) : null}
                  <div ref={endRef} className="h-px w-full shrink-0" aria-hidden />
                </div>

                <div className="shrink-0 border-t border-slate-200/90 bg-slate-50/50 p-3 sm:px-4 sm:py-3">
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
                      className="min-h-[2.75rem] flex-1 resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <Button
                      type="button"
                      className="h-12 shrink-0 gap-1.5 bg-emerald-600 px-4 font-bold text-white shadow-sm hover:bg-emerald-700"
                      onClick={() => void send()}
                      aria-label="Enviar mensaje"
                    >
                      <SendHorizonal className="h-5 w-5" />
                      Enviar
                    </Button>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                    {hasRemote
                      ? "Se intenta el servidor de asistencia; si falla, se usa la misma lógica local que en la app móvil."
                      : "Respuestas con lógica local y datos de peajes. Puede definirse NEXT_PUBLIC_ASISTENTE_VIAL_URL para el backend vial."}
                  </p>
                </div>
          </div>
        </div>

        <section
          id="conversaciones-guardadas"
          aria-labelledby={`${listId}-saved`}
          className="scroll-mt-20 shrink-0 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-sm ring-1 ring-slate-900/[0.04] sm:p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <h2
              id={`${listId}-saved`}
              className="flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-base"
            >
              <History className="h-5 w-5 text-emerald-600" strokeWidth={1.75} aria-hidden />
              Conversaciones guardadas
            </h2>
          </div>
          {savedConversations.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Aún no hay entradas. Pulsa <strong className="text-slate-800">Guardar</strong> en la barra
              superior; aparecerá aquí.
            </p>
          ) : (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2" role="list">
              {savedConversations.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200/90 bg-slate-50/40 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">{s.title}</p>
                    <p className="text-[10px] text-slate-500">
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
                      className="h-8 border-slate-200 font-bold"
                      onClick={() => loadSavedIntoChat(s)}
                    >
                      Abrir
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 font-bold text-red-600 hover:bg-red-50"
                      onClick={() => requestRemoveSaved(s.id, s.title)}
                    >
                      Quitar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Dialog
        open={saveModalOpen}
        onOpenChange={(open) => {
          setSaveModalOpen(open);
        }}
      >
        <DialogContent showClose>
          <DialogHeader>
            <DialogTitle>Guardar en el historial</DialogTitle>
            <DialogDescription>
              Asigna un nombre para localizarla después en la sección de conversaciones guardadas.
            </DialogDescription>
          </DialogHeader>
          <div className="px-4 pb-2">
            <label htmlFor="save-conv-name" className="text-xs font-bold text-slate-600">
              Nombre
            </label>
            <input
              id="save-conv-name"
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applySaveFromModal();
                }
              }}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border-slate-200"
              onClick={() => setSaveModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
              onClick={applySaveFromModal}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmState !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmState(null);
        }}
      >
        <DialogContent showClose>
          {confirmState?.type === "newChat" ? (
            <>
              <DialogHeader>
                <DialogTitle>Nueva conversación</DialogTitle>
                <DialogDescription>
                  ¿Empezar una charla nueva? El borrador actual se reemplaza; las entradas ya
                  guardadas en el historial no se eliminan.
                </DialogDescription>
              </DialogHeader>
            </>
          ) : null}
          {confirmState?.type === "clear" ? (
            <>
              <DialogHeader>
                <DialogTitle>Borrar conversación</DialogTitle>
                <DialogDescription>¿Borrar toda la conversación de esta charla?</DialogDescription>
              </DialogHeader>
            </>
          ) : null}
          {confirmState?.type === "remove" ? (
            <>
              <DialogHeader>
                <DialogTitle>Quitar del historial</DialogTitle>
                <DialogDescription>
                  ¿Quitar <span className="font-semibold text-slate-800">“{confirmState.title}”</span> del
                  historial guardado? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
            </>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border-slate-200"
              onClick={() => setConfirmState(null)}
            >
              Cancelar
            </Button>
            {confirmState?.type === "remove" ? (
              <Button
                type="button"
                variant="destructive"
                className="font-bold"
                onClick={onConfirmAction}
              >
                Quitar
              </Button>
            ) : null}
            {confirmState?.type === "newChat" ? (
              <Button
                type="button"
                className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                onClick={onConfirmAction}
              >
                Empezar de nuevo
              </Button>
            ) : null}
            {confirmState?.type === "clear" ? (
              <Button
                type="button"
                className="bg-red-600 font-bold text-white hover:bg-red-700"
                onClick={onConfirmAction}
              >
                Borrar
              </Button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
