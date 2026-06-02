import type { RechargeOrder } from "@/types/empresa";

export const RECHARGES: RechargeOrder[] = [
  {
    id: "rc-2001",
    fecha: "2026-05-30T16:10:00",
    monto: 2000,
    destino: "masiva",
    vehicleIds: ["v2"],
    estado: "Aprobado",
  },
  {
    id: "rc-2002",
    fecha: "2026-05-28T08:00:00",
    monto: 10000,
    destino: "central",
    estado: "Aprobado",
  },
  {
    id: "rc-2003",
    fecha: "2026-05-26T09:30:00",
    monto: 1500,
    destino: "masiva",
    vehicleIds: ["v7"],
    estado: "Pendiente",
  },
  {
    id: "rc-2004",
    fecha: "2026-05-21T10:20:00",
    monto: 6000,
    destino: "masiva",
    vehicleIds: ["v11", "v1", "v3"],
    estado: "Aprobado",
  },
  {
    id: "rc-2005",
    fecha: "2026-04-25T11:00:00",
    monto: 8000,
    destino: "central",
    estado: "Aprobado",
  },
];
