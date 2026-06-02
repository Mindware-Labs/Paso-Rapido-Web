/**
 * Modelo de datos de la vista empresarial (mock + contrato para backend futuro).
 * Ver `docs/vista-empresarial-plan.md` §6.
 */

export type AccountType =
  | "personal"
  | "familiar"
  | "pymes"
  | "corporativa"
  | "gremial";

export type AccountRole = "admin" | "operador" | "visor";

export type TagStatus = "activo" | "bajo_balance" | "congelado";

export interface Empresa {
  id: string;
  razonSocial: string;
  rnc: string;
  tipo: "pymes" | "corporativa" | "gremial";
  direccion?: string;
  contactoEmail: string;
  contactoTelefono: string;
  /** Billetera central de la flota, en RD$. */
  saldoCentral: number;
  /** Umbral de auto-recarga por TAG (RD$). 0 = desactivado. */
  umbralAutoRecarga: number;
}

export interface CostCenter {
  id: string;
  nombre: string;
  codigo: string;
  responsable?: string;
}

export interface Driver {
  id: string;
  nombre: string;
  cedula: string;
  costCenterId?: string;
  activo: boolean;
  ultimoUso?: string;
}

export interface FleetVehicle {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  year: string;
  color: string;
  tagNumber: string;
  tagStatus: TagStatus;
  balance: number;
  pasesMes: number;
  gastoMes: number;
  driverId?: string;
  costCenterId?: string;
}

export type TransactionType = "paso" | "recarga";
export type TransactionStatus =
  | "Procesado"
  | "Aprobado"
  | "Pendiente"
  | "Rechazado";

export interface FleetTransaction {
  id: string;
  /** ISO datetime. */
  fecha: string;
  tipo: TransactionType;
  vehicleId?: string;
  costCenterId?: string;
  peaje?: string;
  referencia: string;
  monto: number;
  estado: TransactionStatus;
}

export interface RechargeOrder {
  id: string;
  fecha: string;
  monto: number;
  destino: "central" | "masiva";
  vehicleIds?: string[];
  estado: "Aprobado" | "Pendiente";
}

export interface Invoice {
  id: string;
  /** `2026-05`. */
  periodo: string;
  total: number;
  estado: "Pagada" | "Pendiente";
  ncf?: string;
  urlDescarga?: string;
}

export interface MemberUser {
  id: string;
  nombre: string;
  email: string;
  rol: AccountRole;
  activo: boolean;
}
