"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AccountRole, AccountType } from "@/types/empresa";

/**
 * Contexto de cuenta (frontend, mock). El backend aún no distingue tipo de
 * cuenta ni rol, así que la selección vive aquí y se persiste en localStorage,
 * con un switcher de DEMO en el header. Ver `docs/vista-empresarial-plan.md` §3.2.
 */

const TYPE_KEY = "pasorapido_account_type";
const ROLE_KEY = "pasorapido_account_role";

/** Capacidades sujetas a permiso por rol (gating a nivel de UI). */
export type Capability =
  | "recargar"
  | "vehiculos:write"
  | "conductores:write"
  | "centros:write"
  | "usuarios:manage"
  | "config:write"
  | "facturacion:write";

const ROLE_CAPS: Record<AccountRole, Capability[]> = {
  admin: [
    "recargar",
    "vehiculos:write",
    "conductores:write",
    "centros:write",
    "usuarios:manage",
    "config:write",
    "facturacion:write",
  ],
  operador: ["recargar"],
  visor: [],
};

const ENTERPRISE_TYPES: AccountType[] = ["pymes", "corporativa", "gremial"];

type AccountContextValue = {
  accountType: AccountType;
  role: AccountRole;
  isEnterprise: boolean;
  isInitialized: boolean;
  setAccountType: (t: AccountType) => void;
  setRole: (r: AccountRole) => void;
  can: (cap: Capability) => boolean;
};

const AccountContext = createContext<AccountContextValue | null>(null);

function load<T extends string>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return (localStorage.getItem(key) as T | null) ?? fallback;
  } catch {
    return fallback;
  }
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [accountType, setAccountTypeState] =
    useState<AccountType>("personal");
  const [role, setRoleState] = useState<AccountRole>("admin");
  const [isInitialized, setIsInitialized] = useState(false);

  // Restaurar selección demo desde localStorage en cliente (mismo patrón que
  // AuthContext / SidebarContext).
  useEffect(() => {
    setAccountTypeState(load<AccountType>(TYPE_KEY, "personal"));
    setRoleState(load<AccountRole>(ROLE_KEY, "admin"));
    setIsInitialized(true);
  }, []);

  const setAccountType = useCallback((t: AccountType) => {
    setAccountTypeState(t);
    try {
      localStorage.setItem(TYPE_KEY, t);
    } catch {
      /* noop */
    }
  }, []);

  const setRole = useCallback((r: AccountRole) => {
    setRoleState(r);
    try {
      localStorage.setItem(ROLE_KEY, r);
    } catch {
      /* noop */
    }
  }, []);

  const isEnterprise = ENTERPRISE_TYPES.includes(accountType);

  const can = useCallback(
    (cap: Capability) => ROLE_CAPS[role].includes(cap),
    [role],
  );

  const value = useMemo(
    (): AccountContextValue => ({
      accountType,
      role,
      isEnterprise,
      isInitialized,
      setAccountType,
      setRole,
      can,
    }),
    [
      accountType,
      role,
      isEnterprise,
      isInitialized,
      setAccountType,
      setRole,
      can,
    ],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount(): AccountContextValue {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount debe usarse dentro de <AccountProvider>");
  return ctx;
}

export const ROLE_LABEL: Record<AccountRole, string> = {
  admin: "Administrador",
  operador: "Operador",
  visor: "Visor",
};

export const ACCOUNT_TYPE_LABEL: Record<AccountType, string> = {
  personal: "Personal",
  familiar: "Familiar",
  pymes: "Pymes",
  corporativa: "Corporativa",
  gremial: "Gremial",
};
