"use client";

import { useEffect } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map";
import type { TollSite } from "@/data/tolls";
import { DR_BOUNDS, DR_MAP_INITIAL_REGION } from "@/data/tolls";
import { PeajeMapPinIcon } from "./PeajeMapPinIcon";

const MAX_B: [[number, number], [number, number]] = [
  [DR_BOUNDS.west, DR_BOUNDS.south],
  [DR_BOUNDS.east, DR_BOUNDS.north],
];

function EaseToSelection({ site }: { site: TollSite }) {
  const { map, isLoaded } = useMap();
  useEffect(() => {
    if (!map || !isLoaded) return;
    map.easeTo({
      center: [site.longitude, site.latitude],
      zoom: 9,
      duration: 700,
    });
  }, [map, isLoaded, site.id, site.longitude, site.latitude]);
  return null;
}

type Props = {
  sites: TollSite[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function PeajesMap({ sites, selectedId, onSelect }: Props) {
  const selected = sites.find((s) => s.id === selectedId) ?? sites[0];
  if (!selected) {
    return (
      <div className="flex h-[min(50vh,420px)] w-full items-center justify-center rounded-2xl border border-dashed border-pr-border bg-pr-muted text-sm text-pr-muted-fg">
        Sin estaciones
      </div>
    );
  }

  return (
    <div className="relative isolate z-0 h-[min(55vh,520px)] w-full min-h-[320px] overflow-hidden rounded-2xl border border-pr-hero/20 bg-pr-secondary/35 shadow-inner ring-1 ring-pr-hero/10 shadow-md shadow-pr-hero/10">
      <Map
        className="h-full w-full"
        center={[
          DR_MAP_INITIAL_REGION.longitude,
          DR_MAP_INITIAL_REGION.latitude,
        ]}
        zoom={7.2}
        maxBounds={MAX_B}
        minZoom={6}
        maxZoom={16}
        theme="light"
      >
        <MapControls
          position="bottom-right"
          showZoom
          showCompass={false}
        />
        <EaseToSelection site={selected} />
        {sites.map((s) => {
          const isOn = s.id === selectedId;
          return (
            <MapMarker
              key={s.id}
              longitude={s.longitude}
              latitude={s.latitude}
              anchor="bottom"
              onClick={() => onSelect(s.id)}
            >
              <MarkerContent className="!cursor-pointer">
                <PeajeMapPinIcon selected={isOn} />
              </MarkerContent>
              <MarkerPopup closeButton className="min-w-[200px]">
                <p className="text-sm font-extrabold text-foreground">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground">{s.subtitle}</p>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}
