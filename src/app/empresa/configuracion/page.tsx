"use client";

import { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Lock,
  UserPlus,
  Save,
  SlidersHorizontal,
} from "lucide-react";
import { useEmpresaData } from "@/context/EmpresaDataContext";
import { useAccount, ROLE_LABEL } from "@/context/AccountContext";
import { formatCurrency } from "@/lib/format";
import { PageHeader } from "@/components/empresa/shared";
import type { AccountRole } from "@/types/empresa";
import { cn } from "@/lib/utils";

const ROLES: AccountRole[] = ["admin", "operador", "visor"];

export default function ConfiguracionPage() {
  const { empresa, members, updateEmpresa, addMember, updateMember } =
    useEmpresaData();
  const { can, role } = useAccount();
  const canConfig = can("config:write");
  const canManageUsers = can("usuarios:manage");

  const [form, setForm] = useState({
    razonSocial: empresa.razonSocial,
    rnc: empresa.rnc,
    direccion: empresa.direccion ?? "",
    contactoEmail: empresa.contactoEmail,
    contactoTelefono: empresa.contactoTelefono,
    umbralAutoRecarga: empresa.umbralAutoRecarga,
    limiteGasto: 50000,
  });
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<AccountRole>("visor");
  const [notice, setNotice] = useState<string | null>(null);

  const flash = (m: string) => {
    setNotice(m);
    setTimeout(() => setNotice(null), 3500);
  };

  const set = (k: keyof typeof form, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const saveProfile = () => {
    updateEmpresa({
      razonSocial: form.razonSocial,
      rnc: form.rnc,
      direccion: form.direccion || undefined,
      contactoEmail: form.contactoEmail,
      contactoTelefono: form.contactoTelefono,
      umbralAutoRecarga: Number(form.umbralAutoRecarga),
    });
    flash("Configuración guardada.");
  };

  const invite = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    addMember({
      nombre: inviteName.trim(),
      email: inviteEmail.trim(),
      rol: inviteRole,
      activo: true,
    });
    setInviteName("");
    setInviteEmail("");
    setInviteRole("visor");
    flash("Invitación enviada (demo).");
  };

  return (
    <div className="min-h-full bg-slate-50/50 pb-12">
      <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Administración"
          title="Configuración de empresa"
          description="Perfil fiscal, políticas de gasto y gestión de usuarios y roles."
        />

        {notice && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-800">
            {notice}
          </div>
        )}

        {!canConfig && (
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600">
            <Lock className="size-4 text-slate-400" />
            Tu rol ({ROLE_LABEL[role]}) es de solo lectura en esta sección.
          </div>
        )}

        {/* ── Perfil de empresa ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Settings className="size-4 text-slate-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Perfil de empresa
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ConfigField
              label="Razón social"
              value={form.razonSocial}
              onChange={(v) => set("razonSocial", v)}
              disabled={!canConfig}
            />
            <ConfigField
              label="RNC"
              value={form.rnc}
              onChange={(v) => set("rnc", v)}
              disabled={!canConfig}
            />
            <ConfigField
              label="Dirección"
              value={form.direccion}
              onChange={(v) => set("direccion", v)}
              disabled={!canConfig}
            />
            <ConfigField
              label="Correo de contacto"
              value={form.contactoEmail}
              onChange={(v) => set("contactoEmail", v)}
              disabled={!canConfig}
            />
            <ConfigField
              label="Teléfono"
              value={form.contactoTelefono}
              onChange={(v) => set("contactoTelefono", v)}
              disabled={!canConfig}
            />
          </div>
        </section>

        {/* ── Políticas ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-slate-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Políticas
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ConfigField
              label="Umbral de auto-recarga (RD$)"
              type="number"
              value={String(form.umbralAutoRecarga)}
              onChange={(v) => set("umbralAutoRecarga", Number(v))}
              disabled={!canConfig}
              hint="Recarga automática al caer bajo este saldo."
            />
            <ConfigField
              label="Límite de gasto por vehículo (RD$/mes)"
              type="number"
              value={String(form.limiteGasto)}
              onChange={(v) => set("limiteGasto", Number(v))}
              disabled={!canConfig}
              hint={`Actual: ${formatCurrency(form.limiteGasto)}`}
            />
          </div>
          {canConfig && (
            <div className="mt-5 flex justify-end">
              <button
                onClick={saveProfile}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Save className="size-4" /> Guardar cambios
              </button>
            </div>
          )}
        </section>

        {/* ── Usuarios y roles ── */}
        <section
          id="usuarios"
          className="scroll-mt-20 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="size-4 text-slate-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Usuarios y roles
            </h2>
          </div>

          {canManageUsers && (
            <div className="mb-5 grid grid-cols-1 gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-[1fr_1fr_auto_auto]">
              <input
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Nombre"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="correo@empresa.do"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as AccountRole)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium focus:border-emerald-500 focus:outline-none"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABEL[r]}
                  </option>
                ))}
              </select>
              <button
                onClick={invite}
                disabled={!inviteName.trim() || !inviteEmail.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-40"
              >
                <UserPlus className="size-4" /> Invitar
              </button>
            </div>
          )}

          <ul className="divide-y divide-slate-100">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {m.nombre
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {m.nombre}
                      {!m.activo && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          inactivo
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {canManageUsers ? (
                    <>
                      <select
                        value={m.rol}
                        onChange={(e) =>
                          updateMember(m.id, {
                            rol: e.target.value as AccountRole,
                          })
                        }
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {ROLE_LABEL[r]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          updateMember(m.id, { activo: !m.activo })
                        }
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors",
                          m.activo
                            ? "border-slate-300 text-slate-600 hover:bg-slate-50"
                            : "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
                        )}
                      >
                        {m.activo ? "Desactivar" : "Activar"}
                      </button>
                    </>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {ROLE_LABEL[m.rol]}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function ConfigField({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
          disabled && "cursor-not-allowed bg-slate-50 text-slate-500",
        )}
      />
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </label>
  );
}
