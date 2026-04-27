"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type SidebarValue = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return (
    <SidebarContext.Provider value={{ open, openMenu, closeMenu, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const c = useContext(SidebarContext);
  if (!c) {
    throw new Error("useSidebar debe usarse dentro de SidebarProvider");
  }
  return c;
}
