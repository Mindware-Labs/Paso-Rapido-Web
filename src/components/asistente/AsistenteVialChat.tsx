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
  Clock,
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
    text: "Hola, soy el Asistente Vial de Paso Rápido. Puede consultarme sobre peajes, recargas, vehículos, vinculados, métodos de pago y más. También puede guardar esta conversación en su historial para futuras referencias.",
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
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_ASISTENTE_VIAL_URL,
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
    setMessages((prev) => [
      ...prev,
      { id, from: "user", text: value, time: now() },
    ]);
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
      entry.messages.length > 0
        ? entry.messages.map((m) => ({ ...m }))
        : BASE_MESSAGES,
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
      prev.map((m) =>
        m.id === msgId
          ? { ...m, action: undefined, confirmRequired: false }
          : m,
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
    <div className="min-h-full bg-slate-50/50 pb-12">
      {/* ── CONTENEDOR FLUIDO ── */}
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Encabezado Institucional ── */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-emerald-600"
              >
                <ArrowLeft className="h-3 w-3" />
                Panel
              </Link>
              <span className="text-slate-300">/</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Soporte Inteligente
              </p>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Asistente Vial
              </h1>
              <div
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1"
                title={hasRemote ? "Conectado al motor remoto" : "Modo local"}
              >
                <Sparkles className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  {hasRemote ? "En Línea" : "Local"}
                </span>
              </div>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Gestione su cuenta conversando de forma natural. Puede pedir
              recargas, revisar peajes o administrar sus vehículos rápidamente.
            </p>
          </div>
        </header>

        {/* ── Grid Principal (Split Layout) ── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* ── MAIN: Ventana de Chat ── */}
          <main className="lg:col-span-8 flex flex-col h-[600px] lg:h-[calc(100vh-16rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Cabecera del Chat (Controles) */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                  <BotMessageSquare
                    className="h-5 w-5 text-emerald-700"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Agente Virtual
                  </p>
                  <p className="text-xs text-slate-500">Paso Rápido</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {statusText && (
                  <span className="mr-2 hidden text-xs font-bold text-emerald-600 sm:inline-block animate-in fade-in">
                    {statusText}
                  </span>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={startNewChat}
                  className="h-9 gap-1.5 border-slate-200 text-slate-600"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Nueva</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openSaveModal}
                  className="h-9 gap-1.5 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Guardar</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearConversation}
                  className="h-9 w-9 px-0 border-slate-200 text-red-600 hover:bg-red-50"
                  title="Borrar borrador"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hilo de Mensajes */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
              {messages.map((m) => {
                const user = m.from === "user";
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex w-full",
                      user ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm",
                        user
                          ? "bg-emerald-600 text-white rounded-tr-sm"
                          : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm",
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {m.text}
                      </p>

                      {/* Acciones de Mensaje (Si es bot y requiere confirmación) */}
                      {!user && m.action && (
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          {m.confirmRequired ? (
                            <div className="flex flex-wrap gap-2">
                              <Button
                                type="button"
                                size="sm"
                                className="h-8 bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
                                onClick={() => {
                                  runAction(m.action as AssistantAction);
                                  clearMessageAction(m.id);
                                }}
                              >
                                Confirmar Acción
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs border-slate-200"
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
                              className="h-8 border border-slate-200 text-xs font-bold"
                              onClick={() =>
                                runAction(m.action as AssistantAction)
                              }
                            >
                              {m.action.type === "phone"
                                ? "Llamar a Soporte"
                                : "Ir a la sección"}
                            </Button>
                          )}
                        </div>
                      )}

                      <p
                        className={cn(
                          "mt-2 text-right text-[10px] font-bold",
                          user ? "text-emerald-100" : "text-slate-400",
                        )}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                );
              })}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-white border border-slate-200 px-4 py-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    <span className="text-xs font-bold text-slate-500">
                      Asistente escribiendo...
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} className="h-px w-full shrink-0" />
            </div>

            {/* Prompts Rápidos y Caja de Texto */}
            <div className="border-t border-slate-200 bg-white p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => void send(p)}
                    className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-3">
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
                  placeholder="Describa su solicitud..."
                  className="min-h-[3rem] flex-1 resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <Button
                  type="button"
                  onClick={() => void send()}
                  className="h-12 shrink-0 gap-2 rounded-xl bg-emerald-600 px-5 font-bold text-white hover:bg-emerald-700"
                >
                  <SendHorizonal className="h-5 w-5" />
                  <span className="hidden sm:inline">Enviar</span>
                </Button>
              </div>
            </div>
          </main>

          {/* ── SIDEBAR: Contexto y Memoria ── */}
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            {/* Secciones Rápidas */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                Accesos Directos
              </p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {SITE_QUICK.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historial de Conversaciones */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm max-h-[400px]">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <History className="h-4 w-4 text-emerald-600" strokeWidth={2} />
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Historial Guardado
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {savedConversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <Clock className="mx-auto h-8 w-8 text-slate-300 mb-3" />
                    <p className="text-xs leading-relaxed text-slate-500">
                      No hay conversaciones guardadas. Utilice el botón{" "}
                      <strong className="text-slate-700">Guardar</strong> en el
                      chat para almacenar consultas importantes.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {savedConversations.map((s) => (
                      <li
                        key={s.id}
                        className="group relative flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-emerald-200 hover:bg-white"
                      >
                        <div className="min-w-0 pr-8">
                          <p className="font-bold text-sm text-slate-900 truncate">
                            {s.title}
                          </p>
                          <p className="mt-1 text-[10px] font-bold text-slate-400">
                            {new Date(s.updatedAt).toLocaleString("es-DO", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="h-7 px-3 text-xs border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            onClick={() => loadSavedIntoChat(s)}
                          >
                            Cargar
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-slate-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => requestRemoveSaved(s.id, s.title)}
                          >
                            Quitar
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Dialogos de Confirmación y Guardado ── */}
      <Dialog open={saveModalOpen} onOpenChange={setSaveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guardar Conversación</DialogTitle>
            <DialogDescription>
              Asigne un nombre descriptivo para encontrar fácilmente esta
              consulta en su historial.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label
              htmlFor="save-conv-name"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Nombre de la consulta
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-slate-200"
              onClick={() => setSaveModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
              onClick={applySaveFromModal}
            >
              Guardar en Historial
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
        <DialogContent>
          {confirmState?.type === "newChat" && (
            <DialogHeader>
              <DialogTitle>Nueva conversación</DialogTitle>
              <DialogDescription>
                El borrador actual se reemplazará. Las entradas que ya guardó en
                el historial no se eliminarán. ¿Desea continuar?
              </DialogDescription>
            </DialogHeader>
          )}
          {confirmState?.type === "clear" && (
            <DialogHeader>
              <DialogTitle>Borrar conversación</DialogTitle>
              <DialogDescription>
                Se eliminará el progreso actual de esta ventana. ¿Está seguro?
              </DialogDescription>
            </DialogHeader>
          )}
          {confirmState?.type === "remove" && (
            <DialogHeader>
              <DialogTitle>Quitar del historial</DialogTitle>
              <DialogDescription>
                ¿Quitar{" "}
                <strong className="text-slate-900">
                  "{confirmState.title}"
                </strong>{" "}
                de sus registros guardados? Esta acción es permanente.
              </DialogDescription>
            </DialogHeader>
          )}
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              className="border-slate-200"
              onClick={() => setConfirmState(null)}
            >
              Cancelar
            </Button>
            {confirmState?.type === "remove" ||
            confirmState?.type === "clear" ? (
              <Button
                variant="destructive"
                className="font-bold"
                onClick={onConfirmAction}
              >
                {confirmState.type === "remove"
                  ? "Eliminar Registro"
                  : "Limpiar Chat"}
              </Button>
            ) : (
              <Button
                className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                onClick={onConfirmAction}
              >
                Empezar Nueva
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
