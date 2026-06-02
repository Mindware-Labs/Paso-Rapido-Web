import type { CostCenter } from "@/types/empresa";

export const COST_CENTERS: CostCenter[] = [
  { id: "cc1", nombre: "Logística", codigo: "LOG", responsable: "Ana Reyes" },
  { id: "cc2", nombre: "Ventas", codigo: "VEN", responsable: "Carlos Méndez" },
  {
    id: "cc3",
    nombre: "Servicio Técnico",
    codigo: "SVC",
    responsable: "Pedro Jiménez",
  },
  {
    id: "cc4",
    nombre: "Administración",
    codigo: "ADM",
    responsable: "Lucía Fernández",
  },
];
