"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Check, ChevronDown, User } from "lucide-react";
import {
  useAccount,
  ROLE_LABEL,
  ACCOUNT_TYPE_LABEL,
} from "@/context/AccountContext";
import type { AccountRole, AccountType } from "@/types/empresa";
import { cn } from "@/lib/utils";

const PERSONAL_TYPES: AccountType[] = ["personal", "familiar"];
const ENTERPRISE_TYPES: AccountType[] = ["pymes", "corporativa", "gremial"];
const ROLES: AccountRole[] = ["admin", "operador", "visor"];

/**
 * Switcher de DEMO (plan §3.2): permite a un revisor alternar tipo de cuenta y
 * rol. Visible siempre en la demo. Cambiar a un tipo empresarial navega a
 * `/empresa`; volver a personal navega a `/dashboard`.
 */
export function AccountSwitcher() {
  const { accountType, role, isEnterprise, setAccountType, setRole } =
    useAccount();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chooseType = (t: AccountType) => {
    setAccountType(t);
    setOpen(false);
    if (ENTERPRISE_TYPES.includes(t)) router.push("/empresa");
    else router.push("/dashboard");
  };

  const chooseRole = (r: AccountRole) => {
    setRole(r);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/60 px-2.5",
          "text-xs font-semibold text-foreground transition-colors",
          "hover:bg-accent hover:border-border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        )}
        title="Cambiar vista (demo)"
      >
        {isEnterprise ? (
          <Building2 className="size-3.5 text-primary" />
        ) : (
          <User className="size-3.5 text-muted-foreground" />
        )}
        <span className="hidden sm:inline">
          {ACCOUNT_TYPE_LABEL[accountType]}
          {isEnterprise && (
            <span className="text-muted-foreground">
              {" "}
              · {ROLE_LABEL[role]}
            </span>
          )}
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-border/60 bg-white p-1.5 shadow-md"
        >
          <p className="px-2 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
            Demo · Tipo de cuenta
          </p>
          {PERSONAL_TYPES.map((t) => (
            <TypeRow
              key={t}
              label={ACCOUNT_TYPE_LABEL[t]}
              active={accountType === t}
              onClick={() => chooseType(t)}
              icon={<User className="size-3.5" />}
            />
          ))}
          <div className="my-1 h-px bg-border/50" />
          {ENTERPRISE_TYPES.map((t) => (
            <TypeRow
              key={t}
              label={ACCOUNT_TYPE_LABEL[t]}
              active={accountType === t}
              onClick={() => chooseType(t)}
              icon={<Building2 className="size-3.5" />}
            />
          ))}

          {isEnterprise && (
            <>
              <p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                Rol
              </p>
              <div className="flex gap-1 px-1 pb-1">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => chooseRole(r)}
                    className={cn(
                      "flex-1 rounded-md px-2 py-1.5 text-[11px] font-semibold transition-colors",
                      role === r
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {ROLE_LABEL[r]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function TypeRow({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors",
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-foreground hover:bg-muted",
      )}
    >
      <span className={active ? "text-primary" : "text-muted-foreground"}>
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {active && <Check className="size-3.5" />}
    </button>
  );
}
