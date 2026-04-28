import { z } from "zod";

// ── Cédula Dominicana ─────────────────────────────────────────────────────────

/** Algoritmo oficial de validación de cédula dominicana (módulo 10). */
export function isValidCedula(value: string): boolean {
  if (!value) return false;
  const digits = value.replace(/-/g, "").trim();
  if (digits.length !== 11 || !/^\d+$/.test(digits)) return false;

  const multipliers = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];
  let total = 0;
  for (let i = 0; i < 11; i++) {
    const calc = parseInt(digits[i]) * multipliers[i];
    if (calc < 10) {
      total += calc;
    } else {
      total += parseInt(calc.toString()[0]) + parseInt(calc.toString()[1]);
    }
  }
  return total % 10 === 0;
}

/** Formatea cédula en XXX-XXXXXXX-X mientras el usuario escribe. */
export function formatCedula(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`;
}

// ── Zod Schemas ───────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  correo: z
    .string()
    .min(1, "El correo es requerido")
    .email("Ingresa un correo válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const registerStep1Schema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(60, "Nombre demasiado largo"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(60, "Apellido demasiado largo"),
  cedula: z
    .string()
    .refine(
      (v) => isValidCedula(v),
      "La cédula no pasa la validación oficial (módulo 10)",
    ),
});

export const registerStep2Schema = z
  .object({
    correo: z
      .string()
      .min(1, "El correo es requerido")
      .email("Ingresa un correo válido"),
    telefono: z
      .string()
      .refine(
        (v) => v.replace(/\D/g, "").length >= 10,
        "Ingresa un teléfono válido (mín. 10 dígitos)",
      ),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos 1 letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos 1 letra minúscula")
      .regex(/[0-9]/, "Debe contener al menos 1 número")
      .regex(/[^A-Za-z0-9]/, "Debe contener al menos 1 carácter especial"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterStep1Values = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Values = z.infer<typeof registerStep2Schema>;
