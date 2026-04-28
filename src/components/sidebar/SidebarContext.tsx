"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type SidebarValue = {
  open: boolean;        // Para el sheet móvil
  isOpen: boolean;      // Para el sidebar desktop
  openMenu: () => void;
  closeMenu: () => void;
  toggle: () => void;
  setIsOpen: (value: boolean) => void;
};

const SIDEBAR_COOKIE = "sidebar_state";

const SidebarContext = createContext<SidebarValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);           // Mobile sheet
  const [isOpen, setIsOpen] = useState(true);         // Desktop sidebar
  const [mounted, setMounted] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COOKIE);
    if (saved !== null) {
      setIsOpen(saved === "true");
    }
    setMounted(true);
  }, []);

  // Save state changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_COOKIE, String(isOpen));
    }
  }, [isOpen, mounted]);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider 
      value={{ 
        open, 
        isOpen, 
        openMenu, 
        closeMenu, 
        toggle, 
        setIsOpen 
      }}
    >
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