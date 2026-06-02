import type {
  CostCenter,
  FleetTransaction,
  FleetVehicle,
  Invoice,
} from "@/types/empresa";

/** Resumen de KPIs del panel. */
export function fleetSummary(fleet: FleetVehicle[]) {
  const saldoTotal = fleet.reduce((s, v) => s + v.balance, 0);
  const activos = fleet.filter((v) => v.tagStatus === "activo").length;
  const congelados = fleet.filter((v) => v.tagStatus === "congelado").length;
  const bajoBalance = fleet.filter((v) => v.tagStatus === "bajo_balance").length;
  const pasesMes = fleet.reduce((s, v) => s + v.pasesMes, 0);
  const gastoMes = fleet.reduce((s, v) => s + v.gastoMes, 0);
  return {
    saldoTotal,
    activos,
    congelados,
    bajoBalance,
    pasesMes,
    gastoMes,
    total: fleet.length,
  };
}

/** Serie de gasto por periodo a partir de las facturas (coherente con §6). */
export function spendByPeriod(invoices: Invoice[]) {
  return [...invoices]
    .sort((a, b) => a.periodo.localeCompare(b.periodo))
    .map((inv) => ({ label: inv.periodo, value: inv.total }));
}

/** Top N vehículos por gasto del mes. */
export function topVehiclesBySpend(fleet: FleetVehicle[], n = 5) {
  return [...fleet]
    .sort((a, b) => b.gastoMes - a.gastoMes)
    .slice(0, n)
    .map((v) => ({ label: v.placa, value: v.gastoMes, vehicle: v }));
}

/** Gasto agregado por centro de costo. */
export function spendByCostCenter(
  fleet: FleetVehicle[],
  costCenters: CostCenter[],
) {
  return costCenters
    .map((cc) => ({
      label: cc.nombre,
      codigo: cc.codigo,
      value: fleet
        .filter((v) => v.costCenterId === cc.id)
        .reduce((s, v) => s + v.gastoMes, 0),
      vehiculos: fleet.filter((v) => v.costCenterId === cc.id).length,
    }))
    .sort((a, b) => b.value - a.value);
}

/** Gasto por peaje (solo pasos). */
export function spendByToll(transactions: FleetTransaction[]) {
  const map = new Map<string, number>();
  for (const t of transactions) {
    if (t.tipo !== "paso" || !t.peaje) continue;
    map.set(t.peaje, (map.get(t.peaje) ?? 0) + t.monto);
  }
  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

/** Gasto por vehículo (solo pasos), top N, con placa. */
export function spendByVehicle(
  transactions: FleetTransaction[],
  fleet: FleetVehicle[],
  n = 8,
) {
  const map = new Map<string, number>();
  for (const t of transactions) {
    if (t.tipo !== "paso" || !t.vehicleId) continue;
    map.set(t.vehicleId, (map.get(t.vehicleId) ?? 0) + t.monto);
  }
  return [...map.entries()]
    .map(([id, value]) => ({
      label: fleet.find((v) => v.id === id)?.placa ?? id,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n);
}
