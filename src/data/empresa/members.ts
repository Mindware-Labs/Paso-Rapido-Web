import type { MemberUser } from "@/types/empresa";

export const MEMBERS: MemberUser[] = [
  {
    id: "m1",
    nombre: "Lucía Fernández",
    email: "lucia.fernandez@empresademo.do",
    rol: "admin",
    activo: true,
  },
  {
    id: "m2",
    nombre: "Carlos Méndez",
    email: "carlos.mendez@empresademo.do",
    rol: "operador",
    activo: true,
  },
  {
    id: "m3",
    nombre: "Ana Reyes",
    email: "ana.reyes@empresademo.do",
    rol: "operador",
    activo: true,
  },
  {
    id: "m4",
    nombre: "Pedro Jiménez",
    email: "pedro.jimenez@empresademo.do",
    rol: "visor",
    activo: true,
  },
  {
    id: "m5",
    nombre: "Rosa Castillo",
    email: "rosa.castillo@empresademo.do",
    rol: "visor",
    activo: false,
  },
];
