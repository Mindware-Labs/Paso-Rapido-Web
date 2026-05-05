"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Banknote,
  Bus,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  MapPin,
  Search,
  Share2,
  Truck,
} from "lucide-react";
import { TOLL_SITES, type TollSite } from "@/data/tolls";
import { cn } from "@/lib/utils";
import PeajesMap from "./PeajesMap";

function mapsExternalUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function TollDetail({ site }: { site: TollSite }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const descId = useId();

  const summaryText = [
    site.name,
    site.subtitle,
    `Liv. ${site.car} · Bus ${site.bus} · Carga ${site.truck}`,
    site.highway,
    site.hours,
  ]
    .filter(Boolean)
    .join("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Paso Rápido — ${site.name}`,
          text: summaryText,
        });
        setShared(true);
        window.setTimeout(() => setShared(false), 2000);
        return;
      } catch {
        /* cancel */
      }
    }
    await handleCopy();
  }

  return (
    <section
      id="ficha-estacion"
      className="overflow-hidden rounded-lg border border-pr-hero/15 bg-white shadow-sm shadow-pr-hero/5 ring-1 ring-pr-hero/10"
    >
      <div className="border-b border-pr-hero/10 bg-gradient-to-r from-pr-secondary/50 to-slate-50/90">
        <div className="flex border-l-4 border-l-pr-hero">
          <div className="flex min-w-0 flex-1 gap-3 px-4 py-3 sm:px-5">
            <FileText
              className="mt-0.5 h-4 w-4 shrink-0 text-pr-hero"
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                {site.name}
              </h2>
              <p className="text-xs text-slate-500">{site.subtitle}</p>
              <p className="mt-1 text-xs text-slate-600">
                {site.regionLabel}
                {site.badges?.length ? ` · ${site.badges.join(" · ")}` : null}
              </p>
            </div>
          </div>
          <div className="hidden w-20 shrink-0 border-l border-pr-hero/10 bg-pr-secondary/30 sm:flex sm:flex-col sm:justify-center sm:px-2">
            <p className="text-center text-[8px] font-medium uppercase text-pr-hero/70">
              ID
            </p>
            <p className="text-center font-mono text-[9px] text-pr-secondary-fg">
              {site.id}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-pr-hero/10 bg-pr-secondary/15 px-3 py-1.5 sm:px-4">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-7 items-center gap-1 rounded border border-slate-200/80 bg-white px-2 text-[10px] font-medium text-slate-700 hover:border-pr-hero/35 hover:bg-pr-secondary/40 hover:text-pr-secondary-fg"
        >
          {copied ? (
            <Check className="h-3 w-3 text-pr-hero" />
          ) : (
            <Copy className="h-3 w-3 text-pr-hero/80" />
          )}
          {copied ? "Listo" : "Copiar"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex h-7 items-center gap-1 rounded border border-slate-200/80 bg-white px-2 text-[10px] font-medium text-slate-700 hover:border-pr-hero/35 hover:bg-pr-secondary/40 hover:text-pr-secondary-fg"
        >
          {shared ? (
            <Check className="h-3 w-3 text-pr-hero" />
          ) : (
            <Share2 className="h-3 w-3 text-pr-hero/80" />
          )}
          {shared ? "Listo" : "Compartir"}
        </button>
        <a
          href="#vista-mapa-peajes"
          className="inline-flex h-7 items-center gap-0.5 rounded border border-pr-hero/30 bg-pr-hero/10 px-2 text-[10px] font-semibold text-pr-hero shadow-sm ring-1 ring-pr-hero/15 transition hover:bg-pr-hero/15"
        >
          <MapPin className="h-3 w-3" />
          Mapa
        </a>
        <a
          href={mapsExternalUrl(site.latitude, site.longitude)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-0.5 rounded border border-slate-200/80 bg-white px-2 text-[10px] font-medium text-slate-700 hover:border-pr-hero/35 hover:bg-pr-secondary/40"
        >
          <ExternalLink className="h-3 w-3 text-pr-hero/80" />
          Maps
        </a>
      </div>

      <div className="px-4 py-3.5 sm:px-5">
        <p
          id={descId}
          className="line-clamp-2 text-sm text-slate-600"
          title={site.description}
        >
          {site.description}
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          {site.highway && (
            <div>
              <dt className="text-[9px] font-medium uppercase text-pr-hero/80">
                Vía
              </dt>
              <dd className="mt-0.5 text-slate-800">{site.highway}</dd>
            </div>
          )}
          {site.hours && (
            <div>
              <dt className="text-[9px] font-medium uppercase text-pr-hero/80">
                Horario
              </dt>
              <dd className="mt-0.5 text-slate-800">{site.hours}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="border-t border-pr-hero/10 bg-gradient-to-b from-pr-secondary/30 to-slate-50/80 px-4 py-3 sm:px-5">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-pr-hero">
          Tarifas (ref.)
        </p>
        <div className="mt-1.5 overflow-x-auto">
          <table className="w-full min-w-[280px] text-center text-sm">
            <thead>
              <tr className="text-[9px] text-pr-secondary-fg/90">
                <th className="pb-1.5 font-medium">
                  <Car className="mx-auto mb-0.5 h-3.5 w-3.5 text-pr-hero" />
                  Liv.
                </th>
                <th className="border-l border-pr-hero/15 pb-1.5 font-medium">
                  <Bus className="mx-auto mb-0.5 h-3.5 w-3.5 text-pr-hero" />
                  Bus
                </th>
                <th className="border-l border-pr-hero/15 pb-1.5 font-medium">
                  <Truck className="mx-auto mb-0.5 h-3.5 w-3.5 text-pr-hero" />
                  Carga
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pt-1.5 text-base font-semibold tabular-nums text-pr-hero">
                  {site.car}
                </td>
                <td className="border-l border-pr-hero/15 pt-1.5 font-medium tabular-nums text-slate-800">
                  {site.bus}
                </td>
                <td className="border-l border-pr-hero/15 pt-1.5 font-medium tabular-nums text-slate-800">
                  {site.truck}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {site.paymentNote && (
          <p className="mt-2.5 flex gap-1.5 text-[11px] text-slate-600">
            <Banknote className="mt-0.5 h-3 w-3 shrink-0 text-pr-hero" />
            {site.paymentNote}
          </p>
        )}
      </div>
    </section>
  );
}

export function PeajesView() {
  const [selectedId, setSelectedId] = useState(TOLL_SITES[0]?.id ?? "");
  const [searchQ, setSearchQ] = useState("");

  const filteredSites = useMemo(() => {
    const t = searchQ.trim().toLowerCase();
    if (!t) return TOLL_SITES;
    return TOLL_SITES.filter(
      (s) =>
        s.name.toLowerCase().includes(t) ||
        s.subtitle.toLowerCase().includes(t) ||
        s.regionLabel.toLowerCase().includes(t) ||
        s.id.toLowerCase().includes(t),
    );
  }, [searchQ]);

  useEffect(() => {
    if (filteredSites.length === 0) return;
    if (!filteredSites.some((s) => s.id === selectedId)) {
      setSelectedId(filteredSites[0]!.id);
    }
  }, [filteredSites, selectedId]);

  useEffect(() => {
    const el = document.getElementById(`toll-card-${selectedId}`);
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedId]);

  const stationIndex = useMemo(
    () => filteredSites.findIndex((s) => s.id === selectedId),
    [filteredSites, selectedId],
  );
  const selected = useMemo(
    () => TOLL_SITES.find((s) => s.id === selectedId) ?? TOLL_SITES[0],
    [selectedId],
  );

  const navRef = useRef({ filteredSites, stationIndex });
  navRef.current = { filteredSites, stationIndex };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      ) {
        return;
      }
      const { filteredSites: f, stationIndex: i } = navRef.current;
      if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        setSelectedId(f[i - 1]!.id);
      }
      if (e.key === "ArrowRight" && i >= 0 && i < f.length - 1) {
        e.preventDefault();
        setSelectedId(f[i + 1]!.id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasPrev = stationIndex > 0;
  const hasNext = stationIndex >= 0 && stationIndex < filteredSites.length - 1;

  return (
    <div className="min-h-full pr-grain">
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <div className="flex items-center gap-3">
            <span
              className="h-9 w-1 shrink-0 rounded-full bg-pr-hero shadow-sm shadow-pr-hero/30"
              aria-hidden
            />
            <div>
              <h1 className="text-2xl font-bold text-pr-foreground sm:text-3xl">
                Peajes
              </h1>
              <p className="mt-1 text-sm text-pr-foreground/80">
                {TOLL_SITES.length} estaciones · referencia RD Vial
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pr-hero">
              <span className="h-2 w-2 rounded-full bg-pr-hero shadow-[0_0_0_2px] shadow-pr-hero/25" />
              Mapa
            </h2>
            <a
              href="#ficha-estacion"
              className="text-[10px] font-semibold text-pr-hero hover:underline"
            >
              Ir a ficha
            </a>
          </div>
          <div id="vista-mapa-peajes" className="scroll-mt-4">
            <PeajesMap
              sites={TOLL_SITES}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pr-hero">
              <span className="h-2 w-2 rounded-full bg-pr-hero shadow-[0_0_0_2px] shadow-pr-hero/25" />
              Estaciones
            </h2>
            <div className="relative max-w-md flex-1">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pr-hero/50"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Buscar…"
                className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-2 text-xs text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-pr-hero/40 focus:outline-none focus:ring-2 focus:ring-pr-hero/20"
                aria-label="Buscar estación"
              />
            </div>
          </div>
          {filteredSites.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-3 py-4 text-center text-sm text-slate-500">
              Sin coincidencias. Prueba otro término o vacía el filtro.
            </p>
          ) : (
            <div
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pl-0.5 pr-3"
              style={{ scrollPaddingLeft: 8, scrollPaddingRight: 8 }}
              role="list"
            >
              {filteredSites.map((s) => {
                const on = s.id === selectedId;
                return (
                  <button
                    type="button"
                    key={s.id}
                    id={`toll-card-${s.id}`}
                    onClick={() => setSelectedId(s.id)}
                    className={cn(
                      "w-[min(100vw-2.5rem,260px)] max-w-[260px] flex-none snap-center overflow-hidden rounded-lg border text-left transition",
                      "border-l-4",
                      on
                        ? "border-l-pr-hero border-pr-hero/20 bg-pr-secondary/35 shadow-sm shadow-pr-hero/10"
                        : "border-l-slate-200 border-slate-200 bg-white hover:border-l-pr-hero/50 hover:shadow-sm hover:shadow-pr-hero/5",
                    )}
                  >
                    <div className="p-3">
                      <p
                        className="text-[9px] font-medium uppercase text-slate-500"
                        style={on ? { color: "var(--pr-hero)" } : undefined}
                      >
                        {s.regionLabel}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-900">
                        {s.name}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">
                        {s.subtitle}
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-xs font-semibold tabular-nums",
                          on ? "text-pr-hero" : "text-slate-800",
                        )}
                      >
                        {s.car}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pr-hero/20 pb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-pr-hero" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-pr-hero">
                Ficha
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-0.5">
              <span
                className="text-[10px] font-medium tabular-nums text-pr-secondary-fg/80"
                title="Posición en la lista actual (respeta el filtro)"
              >
                {stationIndex >= 0 ? stationIndex + 1 : "—"} /{" "}
                {Math.max(0, filteredSites.length)}
              </span>
              {searchQ.trim() ? null : (
                <span
                  className="hidden text-[9px] text-slate-400 sm:inline"
                  aria-hidden
                >
                  · ← →
                </span>
              )}
              <button
                type="button"
                onClick={() =>
                  hasPrev && setSelectedId(filteredSites[stationIndex - 1]!.id)
                }
                disabled={!hasPrev}
                className="inline-flex h-7 w-7 items-center justify-center rounded text-pr-secondary-fg hover:bg-pr-secondary hover:text-pr-hero disabled:opacity-30"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  hasNext && setSelectedId(filteredSites[stationIndex + 1]!.id)
                }
                disabled={!hasNext}
                className="inline-flex h-7 w-7 items-center justify-center rounded text-pr-secondary-fg hover:bg-pr-secondary hover:text-pr-hero disabled:opacity-30"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          {selected && filteredSites.length > 0 ? (
            <TollDetail site={selected} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
