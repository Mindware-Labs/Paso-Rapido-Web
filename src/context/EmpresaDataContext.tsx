"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  CostCenter,
  Driver,
  Empresa,
  FleetVehicle,
  FleetTransaction,
  Invoice,
  MemberUser,
  RechargeOrder,
} from "@/types/empresa";
import { EMPRESA } from "@/data/empresa/empresa";
import { FLEET } from "@/data/empresa/fleet";
import { DRIVERS } from "@/data/empresa/drivers";
import { COST_CENTERS } from "@/data/empresa/costCenters";
import { TRANSACTIONS } from "@/data/empresa/transactions";
import { RECHARGES } from "@/data/empresa/recharges";
import { INVOICES } from "@/data/empresa/invoices";
import { MEMBERS } from "@/data/empresa/members";

/**
 * Store mock en memoria para la vista empresarial. Mantiene estado mutable
 * (asignaciones, congelados, recargas) de modo que los cambios se reflejen al
 * navegar entre páginas durante la demo. La capa de datos real (futuro backend)
 * reemplazaría estas mutaciones por llamadas a `empresaApi` — ver plan §6.3.
 */

type EmpresaDataValue = {
  empresa: Empresa;
  fleet: FleetVehicle[];
  drivers: Driver[];
  costCenters: CostCenter[];
  transactions: FleetTransaction[];
  recharges: RechargeOrder[];
  invoices: Invoice[];
  members: MemberUser[];

  // Empresa
  updateEmpresa: (patch: Partial<Empresa>) => void;

  // Flota
  toggleFreeze: (vehicleId: string) => void;
  assignVehicle: (
    vehicleId: string,
    patch: Pick<FleetVehicle, "driverId" | "costCenterId">,
  ) => void;
  bulkAssignCostCenter: (vehicleIds: string[], costCenterId: string) => void;
  bulkFreeze: (vehicleIds: string[], frozen: boolean) => void;

  // Conductores
  addDriver: (d: Omit<Driver, "id">) => void;
  updateDriver: (id: string, patch: Partial<Driver>) => void;
  removeDriver: (id: string) => void;

  // Centros de costo
  addCostCenter: (c: Omit<CostCenter, "id">) => void;
  updateCostCenter: (id: string, patch: Partial<CostCenter>) => void;
  removeCostCenter: (id: string) => void;

  // Recargas
  rechargeCentral: (monto: number) => void;
  rechargeMasiva: (vehicleIds: string[], monto: number) => void;

  // Usuarios
  addMember: (m: Omit<MemberUser, "id">) => void;
  updateMember: (id: string, patch: Partial<MemberUser>) => void;
};

const EmpresaDataContext = createContext<EmpresaDataValue | null>(null);

let seq = 1000;
const nextId = (prefix: string) => `${prefix}-${++seq}`;

export function EmpresaDataProvider({ children }: { children: ReactNode }) {
  const [empresa, setEmpresa] = useState<Empresa>(EMPRESA);
  const [fleet, setFleet] = useState<FleetVehicle[]>(FLEET);
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [costCenters, setCostCenters] = useState<CostCenter[]>(COST_CENTERS);
  const [transactions, setTransactions] =
    useState<FleetTransaction[]>(TRANSACTIONS);
  const [recharges, setRecharges] = useState<RechargeOrder[]>(RECHARGES);
  const [invoices] = useState<Invoice[]>(INVOICES);
  const [members, setMembers] = useState<MemberUser[]>(MEMBERS);

  const updateEmpresa = useCallback((patch: Partial<Empresa>) => {
    setEmpresa((e) => ({ ...e, ...patch }));
  }, []);

  const toggleFreeze = useCallback((vehicleId: string) => {
    setFleet((list) =>
      list.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              tagStatus:
                v.tagStatus === "congelado"
                  ? v.balance < 100
                    ? "bajo_balance"
                    : "activo"
                  : "congelado",
            }
          : v,
      ),
    );
  }, []);

  const assignVehicle = useCallback(
    (
      vehicleId: string,
      patch: Pick<FleetVehicle, "driverId" | "costCenterId">,
    ) => {
      setFleet((list) =>
        list.map((v) => (v.id === vehicleId ? { ...v, ...patch } : v)),
      );
    },
    [],
  );

  const bulkAssignCostCenter = useCallback(
    (vehicleIds: string[], costCenterId: string) => {
      const set = new Set(vehicleIds);
      setFleet((list) =>
        list.map((v) => (set.has(v.id) ? { ...v, costCenterId } : v)),
      );
    },
    [],
  );

  const bulkFreeze = useCallback((vehicleIds: string[], frozen: boolean) => {
    const set = new Set(vehicleIds);
    setFleet((list) =>
      list.map((v) =>
        set.has(v.id)
          ? {
              ...v,
              tagStatus: frozen
                ? "congelado"
                : v.balance < 100
                  ? "bajo_balance"
                  : "activo",
            }
          : v,
      ),
    );
  }, []);

  const addDriver = useCallback((d: Omit<Driver, "id">) => {
    setDrivers((list) => [...list, { ...d, id: nextId("d") }]);
  }, []);

  const updateDriver = useCallback((id: string, patch: Partial<Driver>) => {
    setDrivers((list) =>
      list.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    );
  }, []);

  const removeDriver = useCallback((id: string) => {
    setDrivers((list) => list.filter((d) => d.id !== id));
    setFleet((list) =>
      list.map((v) =>
        v.driverId === id ? { ...v, driverId: undefined } : v,
      ),
    );
  }, []);

  const addCostCenter = useCallback((c: Omit<CostCenter, "id">) => {
    setCostCenters((list) => [...list, { ...c, id: nextId("cc") }]);
  }, []);

  const updateCostCenter = useCallback(
    (id: string, patch: Partial<CostCenter>) => {
      setCostCenters((list) =>
        list.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      );
    },
    [],
  );

  const removeCostCenter = useCallback((id: string) => {
    setCostCenters((list) => list.filter((c) => c.id !== id));
    setFleet((list) =>
      list.map((v) =>
        v.costCenterId === id ? { ...v, costCenterId: undefined } : v,
      ),
    );
  }, []);

  const rechargeCentral = useCallback((monto: number) => {
    setEmpresa((e) => ({ ...e, saldoCentral: e.saldoCentral + monto }));
    const fecha = new Date().toISOString();
    setRecharges((list) => [
      { id: nextId("rc"), fecha, monto, destino: "central", estado: "Aprobado" },
      ...list,
    ]);
    setTransactions((list) => [
      {
        id: nextId("tx"),
        fecha,
        tipo: "recarga",
        referencia: nextId("RC").toUpperCase(),
        monto,
        estado: "Aprobado",
      },
      ...list,
    ]);
  }, []);

  const rechargeMasiva = useCallback(
    (vehicleIds: string[], monto: number) => {
      const total = monto * vehicleIds.length;
      const set = new Set(vehicleIds);
      const fecha = new Date().toISOString();

      setEmpresa((e) => ({
        ...e,
        saldoCentral: Math.max(0, e.saldoCentral - total),
      }));

      setFleet((list) =>
        list.map((v) =>
          set.has(v.id)
            ? {
                ...v,
                balance: v.balance + monto,
                tagStatus:
                  v.tagStatus === "bajo_balance" && v.balance + monto >= 100
                    ? "activo"
                    : v.tagStatus,
              }
            : v,
        ),
      );

      setRecharges((list) => [
        {
          id: nextId("rc"),
          fecha,
          monto: total,
          destino: "masiva",
          vehicleIds,
          estado: "Aprobado",
        },
        ...list,
      ]);
    },
    [],
  );

  const addMember = useCallback((m: Omit<MemberUser, "id">) => {
    setMembers((list) => [...list, { ...m, id: nextId("m") }]);
  }, []);

  const updateMember = useCallback(
    (id: string, patch: Partial<MemberUser>) => {
      setMembers((list) =>
        list.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      );
    },
    [],
  );

  const value = useMemo<EmpresaDataValue>(
    () => ({
      empresa,
      fleet,
      drivers,
      costCenters,
      transactions,
      recharges,
      invoices,
      members,
      updateEmpresa,
      toggleFreeze,
      assignVehicle,
      bulkAssignCostCenter,
      bulkFreeze,
      addDriver,
      updateDriver,
      removeDriver,
      addCostCenter,
      updateCostCenter,
      removeCostCenter,
      rechargeCentral,
      rechargeMasiva,
      addMember,
      updateMember,
    }),
    [
      empresa,
      fleet,
      drivers,
      costCenters,
      transactions,
      recharges,
      invoices,
      members,
      updateEmpresa,
      toggleFreeze,
      assignVehicle,
      bulkAssignCostCenter,
      bulkFreeze,
      addDriver,
      updateDriver,
      removeDriver,
      addCostCenter,
      updateCostCenter,
      removeCostCenter,
      rechargeCentral,
      rechargeMasiva,
      addMember,
      updateMember,
    ],
  );

  return (
    <EmpresaDataContext.Provider value={value}>
      {children}
    </EmpresaDataContext.Provider>
  );
}

export function useEmpresaData(): EmpresaDataValue {
  const ctx = useContext(EmpresaDataContext);
  if (!ctx)
    throw new Error(
      "useEmpresaData debe usarse dentro de <EmpresaDataProvider>",
    );
  return ctx;
}
