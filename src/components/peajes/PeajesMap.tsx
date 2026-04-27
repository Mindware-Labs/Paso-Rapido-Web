"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import type { TollSite } from "@/data/tolls";
import { DR_BOUNDS, DR_MAP_INITIAL_REGION } from "@/data/tolls";
import "leaflet/dist/leaflet.css";

const SW: [number, number] = [DR_BOUNDS.south, DR_BOUNDS.west];
const NE: [number, number] = [DR_BOUNDS.north, DR_BOUNDS.east];

type FlyToProps = {
  target: TollSite;
};

function FlyTo({ target }: FlyToProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([target.latitude, target.longitude], 9, { duration: 0.6 });
  }, [map, target.id, target.latitude, target.longitude]);
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
    <div className="relative isolate z-0 h-[min(55vh,520px)] w-full min-h-[320px] overflow-hidden rounded-2xl border border-pr-border bg-pr-secondary/20 shadow-inner">
      <MapContainer
        center={[
          DR_MAP_INITIAL_REGION.latitude,
          DR_MAP_INITIAL_REGION.longitude,
        ]}
        zoom={7.2}
        className="h-full w-full"
        style={{ minHeight: 300 }}
        scrollWheelZoom
        maxBounds={[SW, NE]}
        maxBoundsViscosity={0.65}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyTo key={selected.id} target={selected} />
        {sites.map((s) => {
          const isOn = s.id === selectedId;
          return (
            <CircleMarker
              key={s.id}
              center={[s.latitude, s.longitude]}
              radius={isOn ? 12 : 7}
              pathOptions={{
                color: isOn ? "#145a38" : "#1d8c57",
                fillColor: isOn ? "#1d8c57" : "#2ead6c",
                fillOpacity: 0.88,
                weight: 2,
              }}
              eventHandlers={{ click: () => onSelect(s.id) }}
            >
              <Popup>
                <span className="font-bold">{s.name}</span>
                <br />
                <span className="text-xs text-neutral-600">{s.subtitle}</span>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
