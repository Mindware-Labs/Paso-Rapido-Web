# Plan — Vista Empresarial (Paso Rápido Web)

> Documento de planificación. Define qué construir, por qué, con qué estructura y en
> qué fases para incorporar una **vista empresarial / de flota** en el portal web.
>
> **Estado:** ✅ implementado (Fases 0–6) con datos mock. Decisiones de §11 resueltas
> con las opciones **recomendadas**: ruta propia `/empresa`, gráficas SVG sin
> dependencias, roles admin/operador/visor, alcance `pymes`/`corporativa`
> (gremial diferido), facturación mock con RNC/NCF de demo y switcher visible.
> **Autor:** generado a partir del análisis del repositorio (`Paso-Rapido-Web`, `backend_demo`).

---

## 1. Contexto y análisis

### 1.1 Qué existe hoy

- **Producto**: sistema de peaje electrónico (TAG + recarga de saldo). El landing ya
  comercializa **5 tipos de cuenta** (`src/data/cuentaTipos.ts`):

  | Tipo | Vehículos | Perfil |
  |------|-----------|--------|
  | `personal` | 1 | Persona natural, uso individual |
  | `familiar` | 2–10 | Persona natural, hogar |
  | `pymes` | 2–15 | Pequeña/mediana empresa |
  | `corporativa` | 5+ | Persona jurídica, flota grande |
  | `gremial` | Variable | Cuenta matriz → subcuentas (asociaciones) |

- **Dashboard web** (`src/app/dashboard/**`): pensado para **una sola persona**
  ("Mis Vehículos", "Mi cuenta"). Navegación **config-driven** en
  `src/config/navigation.ts` (grupos: `general`, `ops`, `account`, `support`),
  renderizada por `src/components/sidebar/AppSidebar.tsx`. Protección de rutas con
  `src/app/dashboard/ProtectedLayout.tsx`. Chrome compartido: `SiteHeader` + `AppSidebar`.
- **Datos**: **todo es mock** (p. ej. `dashboard/vehiculos/page.tsx` define
  `INITIAL_VEHICLES`; `historico` define `INITIAL_ROWS`). Las páginas anotan
  *"conecta API cuando el backend esté disponible"*.
- **Backend** (`backend_demo`): **solo** módulo `auth` con la entidad `User`. **No existe**
  ningún concepto de empresa, RNC, flota, centro de costo ni roles.
- **Naturaleza del proyecto** (`docs/context.md`): demo *frontend-only*, mockear datos,
  Framer Motion disponible.
- **Design system** (memoria del proyecto): primario `emerald`, neutros `slate`,
  contenedores `rounded-lg`/máx `rounded-xl`, sombras `shadow-sm`/`shadow-md`, tono
  **institucional**, componentes reutilizables en `src/components/ui/*`.

### 1.2 Brecha que cubre la vista empresarial

El dashboard actual no resuelve las necesidades de una **flota**:

- Visión **consolidada** de muchos vehículos (no tarjeta por tarjeta).
- Asignación de vehículos a **conductores** y **centros de costo / departamentos**.
- **Billetera central** y **recarga masiva** (en vez de recargar TAG por TAG).
- **Movimientos consolidados** con filtros (vehículo, centro, peaje, fecha) y **exportación**.
- **Reportes** de gasto por periodo / vehículo / centro / peaje.
- **Facturación** con datos fiscales (RNC / NCF) y comprobantes mensuales.
- **Roles** internos: titular/administrador, operador de recargas, visor.

### 1.3 Principio rector

Mantener **coherencia total** con el portal existente (mismo chrome, design system,
patrones de mock y el modo demo). La vista empresarial es una **extensión**, no un
producto aparte. Todo con datos mock, pero con un **contrato de datos** claro para
una futura integración con backend.

---

## 2. Objetivo y alcance

### 2.1 Objetivo

Incorporar una **vista empresarial** que permita a una cuenta de tipo flota
(`pymes` / `corporativa` / `gremial`) administrar de forma centralizada vehículos,
conductores, saldo, movimientos, reportes y facturación, respetando el look & feel
institucional del portal.

### 2.2 En alcance (demo frontend)

- Nueva sección de rutas con su navegación y layout.
- Contexto de cuenta (tipo + rol) en frontend con **switcher de demo**.
- Páginas: Panel, Flota, Conductores/Usuarios, Centros de costo, Recargas,
  Movimientos, Reportes, Facturación, Configuración de empresa.
- Componentes reutilizables nuevos (tabla de datos, KPI card, wrappers de gráficas).
- Datos mock + tipos TypeScript + contrato de API documentado.
- Estados de carga/vacío/error, responsive y accesibilidad.

### 2.3 Fuera de alcance (por ahora)

- Implementación de backend (endpoints, entidades, persistencia).
- Facturación fiscal real (emisión de NCF, integración DGII).
- Pagos reales / pasarela.
- Jerarquía completa **matriz→subcuentas** del tipo `gremial` (se difiere; ver §9).

---

## 3. Decisiones de arquitectura (recomendadas)

> Estas son decisiones **propuestas**. Las que conviene confirmar antes de codificar
> están listadas en §11.

### 3.1 Ubicación de rutas — **Recomendado: grupo de rutas propio `/empresa`**

```
src/app/empresa/
  layout.tsx              → reusa ProtectedLayout + SiteHeader + EmpresaSidebar
  page.tsx                → Panel (resumen)
  flota/page.tsx
  conductores/page.tsx
  centros-costo/page.tsx
  recargas/page.tsx
  movimientos/page.tsx
  reportes/page.tsx
  facturacion/page.tsx
  configuracion/page.tsx
```

**Por qué `/empresa` y no un grupo dentro de `/dashboard`:**
- La arquitectura de información empresarial difiere lo suficiente (entidades flota,
  centros de costo, roles) como para justificar un contexto propio.
- Permite un **sidebar y header** con identidad "modo empresa" sin contaminar el
  dashboard personal.
- Reutiliza el chrome existente (`ProtectedLayout`, `SiteHeader`) para no divergir.

**Alternativa (más barata):** añadir un grupo `empresa` a `src/config/navigation.ts`
y páginas bajo `/dashboard/empresa/*`. Menos archivos, pero mezcla ambos mundos en el
mismo sidebar. *(Ver §11 para decidir.)*

### 3.2 Contexto de cuenta y rol — **`AccountContext` (frontend, mock)**

Como el backend no distingue tipo de cuenta ni rol, se crea
`src/context/AccountContext.tsx`:

```ts
type AccountType = "personal" | "familiar" | "pymes" | "corporativa" | "gremial";
type AccountRole = "admin" | "operador" | "visor";

interface AccountContextValue {
  accountType: AccountType;
  role: AccountRole;
  isEnterprise: boolean;          // pymes | corporativa | gremial
  empresa: Empresa | null;        // datos de la empresa (mock)
  setAccountType: (t: AccountType) => void;  // switcher de DEMO
  setRole: (r: AccountRole) => void;         // switcher de DEMO
}
```

- Persistir la selección demo en `localStorage` (igual que `AuthContext` con el token).
- Un **switcher de demo** en el header (visible solo en modo demo) para que un revisor
  alterne Personal ↔ Empresarial y entre roles. Esto es coherente con la filosofía
  *"mock all data"* de `docs/context.md`.
- **Gating de acceso**: `/empresa/**` redirige al dashboard si `!isEnterprise`
  (patrón calcado de `ProtectedLayout`).

### 3.3 Permisos por rol (UI-level)

| Capacidad | admin | operador | visor |
|-----------|:-----:|:--------:|:-----:|
| Ver panel / reportes / movimientos | ✅ | ✅ | ✅ |
| Recargar (central / masiva) | ✅ | ✅ | — |
| Alta/edición de vehículos y conductores | ✅ | — | — |
| Gestión de usuarios y roles | ✅ | — | — |
| Configuración de empresa / facturación | ✅ | — | — |

Helper `can(action)` derivado del rol; los botones/acciones no permitidos se ocultan
o se muestran deshabilitados con tooltip.

### 3.4 Gráficas

- **Recomendado:** añadir `recharts` (ligero, encaja con React/Tailwind) para barras,
  líneas y donas de los reportes.
- **Alternativa sin dependencia:** componentes SVG/`div` con Tailwind (barras simples).
  Suficiente para una demo y evita peso extra. *(Decisión en §11.)*

---

## 4. Mapa de navegación (sidebar empresa)

Nuevo archivo `src/config/empresaNavigation.ts` (mismo formato que `navigation.ts`):

```
EMPRESA — General
  • Panel              /empresa                 (LayoutDashboard)
  • Flota              /empresa/flota           (Truck)
  • Conductores        /empresa/conductores     (Users)
  • Centros de costo   /empresa/centros-costo   (Building2)

EMPRESA — Finanzas
  • Recargas           /empresa/recargas        (Wallet)
  • Movimientos        /empresa/movimientos     (ListOrdered)
  • Reportes           /empresa/reportes        (BarChart3)
  • Facturación        /empresa/facturacion     (FileText)

EMPRESA — Administración
  • Usuarios y roles   /empresa/configuracion#usuarios  (ShieldCheck)
  • Configuración      /empresa/configuracion           (Settings)
```

- Botón "Volver a vista personal" en el footer del sidebar (cambia `accountType` y
  navega a `/dashboard`).
- Reusar `SidebarNav` de `AppSidebar.tsx` parametrizando el origen de `APP_NAV`
  (refactor menor) o un `EmpresaSidebar` análogo.

---

## 5. Páginas / vistas (detalle funcional)

### 5.1 Panel (`/empresa`)
- **KPIs consolidados** (KpiCard): saldo total de la flota, nº de vehículos
  (activos/congelados), pases del mes, gasto del mes, saldo bajo (alertas).
- **Gráfica** de gasto últimos 6 meses + **top 5 vehículos** por gasto.
- **Alertas**: vehículos con saldo bajo, TAGs congelados, recargas pendientes.
- **Accesos rápidos**: recarga masiva, exportar movimientos, agregar vehículo.

### 5.2 Flota (`/empresa/flota`)
- **Tabla** (no cards) con: placa, marca/modelo, TAG, conductor, centro de costo,
  estado, saldo, pases mes, gasto mes.
- Filtros (estado, centro de costo, conductor, búsqueda por placa/TAG), orden y
  paginación. **Acciones masivas** (congelar, asignar centro/conductor, recargar
  selección). Acciones por fila (editar, congelar, ver detalle).
- Vista responsive: en móvil colapsa a tarjetas (reutiliza el patrón actual de
  `dashboard/vehiculos`).

### 5.3 Conductores / Usuarios (`/empresa/conductores`)
- Empleados con TAG/vehículo asignado: nombre, cédula, vehículo, centro, estado,
  último uso. Alta/edición/baja (admin). Parte del modelo de "Vinculados" actual
  (`relacion: "Empleado"`) escala aquí.

### 5.4 Centros de costo / Departamentos (`/empresa/centros-costo`)
- CRUD de centros (nombre, código, responsable). Cada vehículo pertenece a un centro.
- Resumen de gasto por centro (para asignación contable).

### 5.5 Recargas (`/empresa/recargas`)
- **Billetera central** (saldo de empresa) + historial de recargas.
- **Recarga masiva**: repartir saldo a un conjunto de TAGs (monto fijo o por umbral).
- **Auto-recarga** por umbral mínimo (configuración mock).
- Reutiliza el método de pago y formato `formatCurrency` existentes.

### 5.6 Movimientos (`/empresa/movimientos`)
- Tabla consolidada de transacciones de toda la flota (escala `historico`).
- Filtros: rango de fechas, vehículo, centro, peaje, tipo (paso/recarga), estado.
- **Exportar** CSV (y PDF en fase posterior). Totales y subtotales por filtro.

### 5.7 Reportes (`/empresa/reportes`)
- Gasto por **periodo**, por **vehículo**, por **centro de costo**, por **peaje**.
- Gráficas (barras/líneas/dona) + tabla descargable.
- (Futuro) programar envío por correo.

### 5.8 Facturación (`/empresa/facturacion`)
- Datos fiscales de la empresa (razón social, RNC, dirección).
- Listado de **facturas/comprobantes** mensuales (mock) con descarga.
- Nota explícita: emisión fiscal real (NCF/DGII) fuera de alcance.

### 5.9 Configuración de empresa (`/empresa/configuracion`)
- Perfil de empresa (razón social, RNC, contacto, logo).
- **Usuarios y roles** (sección `#usuarios`): invitar usuarios, asignar rol.
- Políticas: límites de gasto por vehículo/centro, umbral de auto-recarga.

---

## 6. Modelo de datos (mock) y contrato

### 6.1 Tipos TypeScript — `src/types/empresa.ts`

```ts
export interface Empresa {
  id: string;
  razonSocial: string;
  rnc: string;
  tipo: "pymes" | "corporativa" | "gremial";
  direccion?: string;
  contactoEmail: string;
  contactoTelefono: string;
  saldoCentral: number;          // billetera central (centavos o RD$)
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

export interface FleetVehicle {           // extiende el Vehicle actual
  id: string;
  placa: string;
  marca: string; modelo: string; year: string; color: string;
  tagNumber: string;
  tagStatus: "activo" | "bajo_balance" | "congelado";
  balance: number;
  pasesMes: number;
  gastoMes: number;
  driverId?: string;
  costCenterId?: string;
}

export interface FleetTransaction {        // extiende INITIAL_ROWS de historico
  id: string;
  fecha: string;
  tipo: "paso" | "recarga";
  vehicleId?: string;
  costCenterId?: string;
  peaje?: string;
  referencia: string;
  monto: number;
  estado: "Procesado" | "Aprobado" | "Pendiente" | "Rechazado";
}

export interface RechargeOrder {
  id: string; fecha: string; monto: number;
  destino: "central" | "masiva";
  vehicleIds?: string[];
  estado: "Aprobado" | "Pendiente";
}

export interface Invoice {
  id: string; periodo: string;            // "2026-05"
  total: number; estado: "Pagada" | "Pendiente";
  ncf?: string; urlDescarga?: string;
}

export interface MemberUser {
  id: string; nombre: string; email: string;
  rol: "admin" | "operador" | "visor";
  activo: boolean;
}
```

### 6.2 Mocks — `src/data/empresa/*.ts`
`empresa.ts`, `fleet.ts`, `drivers.ts`, `costCenters.ts`, `transactions.ts`,
`invoices.ts`, `members.ts`. Datos coherentes entre sí (IDs cruzados) y en `es-DO`.

### 6.3 Contrato de API (futuro backend) — documentado, no implementado

```
GET    /empresa                      → Empresa
PUT    /empresa                      → actualizar perfil/fiscal
GET    /empresa/vehiculos            → FleetVehicle[]
POST   /empresa/vehiculos            → alta
PATCH  /empresa/vehiculos/:id        → editar / congelar / asignar
GET    /empresa/conductores          → Driver[]
GET    /empresa/centros-costo        → CostCenter[]
GET    /empresa/movimientos?filtros  → FleetTransaction[] (+ totales)
POST   /empresa/recargas             → RechargeOrder (central o masiva)
GET    /empresa/recargas             → RechargeOrder[]
GET    /empresa/facturas             → Invoice[]
GET    /empresa/reportes?dimension   → series agregadas
GET    /empresa/usuarios             → MemberUser[]
POST   /empresa/usuarios             → invitar / asignar rol
```

> Implementación de capa de datos a futuro: replicar el patrón de `src/lib/authApi.ts`
> en un `src/lib/empresaApi.ts` (mismo helper `request`/`requestWithAuth` y `/api-proxy`).
> Para la demo, cada página lee de los mocks vía hooks (`useFleet()`, etc.).

---

## 7. Componentes reutilizables nuevos

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `KpiCard` | `src/components/empresa/KpiCard.tsx` | Tarjeta de indicador (icono, label, valor, delta) |
| `DataTable` | `src/components/empresa/DataTable.tsx` | Tabla genérica: orden, filtro, paginación, selección, responsive → cards |
| `Chart*` | `src/components/empresa/charts/*` | Wrappers de barras/líneas/dona (recharts o SVG) |
| `EmpresaSidebar` | `src/components/empresa/EmpresaSidebar.tsx` | Sidebar de la sección (o reuso parametrizado de `AppSidebar`) |
| `AccountSwitcher` | `src/components/empresa/AccountSwitcher.tsx` | Switcher demo de tipo de cuenta y rol (en header) |
| `ExportButton` | `src/components/empresa/ExportButton.tsx` | Exporta a CSV (PDF en fase posterior) |
| `EmptyState` / `TableSkeleton` | `src/components/empresa/*` | Estados vacío y de carga |

**Reutilizar tal cual:** `ui/card`, `ui/badge`, `ui/button`, `ui/dialog`, `ui/sheet`,
`ui/scroll-area`, `ui/separator`, `SiteHeader`, `ProtectedLayout`, `cn`,
`formatCurrency` (extraer a `src/lib/format.ts` ya que hoy está duplicado en varias páginas).

---

## 8. Fases de implementación

> Cada fase es entregable e independiente. Estimación **relativa** (S/M/L), no en horas.

### Fase 0 — Fundamentos · **M**
- `AccountContext` + provider en `app/layout.tsx` + persistencia en `localStorage`.
- `AccountSwitcher` (demo) en `SiteHeader`.
- Tipos (`src/types/empresa.ts`) y mocks (`src/data/empresa/*`).
- Grupo de rutas `app/empresa/` con `layout.tsx` (gating `isEnterprise`), `EmpresaSidebar`
  y `empresaNavigation.ts`.
- Extraer `formatCurrency` a `src/lib/format.ts`.
- **Aceptación:** alternar a "Empresarial" muestra el shell de `/empresa` con sidebar;
  Personal no puede entrar a `/empresa`.

### Fase 1 — Panel + Flota · **L**
- `KpiCard`, `DataTable`, `EmptyState`, `TableSkeleton`.
- Página Panel (KPIs + 1 gráfica + alertas).
- Página Flota (tabla con filtros, orden, paginación, acciones masivas y por fila;
  responsive a cards).
- **Aceptación:** flota navegable, filtrable y con acciones mock funcionando en estado local.

### Fase 2 — Conductores + Centros de costo · **M**
- CRUD mock de conductores y centros; asignación vehículo↔conductor↔centro.
- **Aceptación:** asignar un vehículo a un centro se refleja en los filtros de Flota.

### Fase 3 — Recargas + Movimientos + Export · **L**
- Billetera central, recarga masiva y por umbral (mock).
- Movimientos consolidados con filtros + `ExportButton` (CSV).
- **Aceptación:** filtrar movimientos por centro/fecha y exportar CSV correcto.

### Fase 4 — Reportes · **M**
- Reportes por periodo/vehículo/centro/peaje con gráficas + tabla descargable.
- **Aceptación:** las 4 dimensiones renderizan gráfica + tabla coherentes con los mocks.

### Fase 5 — Facturación + Configuración + Usuarios/Roles · **M**
- Listado de facturas (mock), perfil fiscal, gestión de usuarios y roles, políticas.
- Aplicar `can(action)` por rol en toda la sección.
- **Aceptación:** un `visor` no ve acciones de escritura; `operador` solo recarga.

### Fase 6 — Pulido · **M**
- Responsive fino, accesibilidad (roles ARIA en tablas, foco, contraste), estados
  vacíos/error, microinteracciones con Framer Motion, revisión de design system.
- **Aceptación:** lint/typecheck limpios, navegación por teclado, móvil correcto.

---

## 9. Caso especial: cuenta `gremial` (matriz → subcuentas)

A diferencia de `pymes`/`corporativa` (una empresa, muchos vehículos), `gremial` es una
**jerarquía**: una cuenta **matriz** que alimenta **subcuentas/afiliados**. Esto cambia el
modelo (árbol de cuentas, distribución de saldo, consolidación multinivel).

**Recomendación:** construir primero para `pymes`/`corporativa` (flota plana) y tratar
`gremial` como una **fase posterior** que añade una vista "Red de afiliados" y
distribución matriz→subcuenta sobre los mismos componentes (`DataTable`, KPIs).

---

## 10. Requisitos no funcionales

- **Responsive**: tablas densas en desktop; colapso a tarjetas en móvil.
- **Accesibilidad**: semántica de tabla, navegación por teclado, foco visible,
  contraste AA, `aria-label` en acciones de icono.
- **Rendimiento**: `useMemo` en filtros/orden; paginación; virtualización solo si una
  tabla supera ~200 filas mock.
- **Consistencia**: respetar el design system (emerald/slate, `rounded-lg`/`xl`,
  `shadow-sm`, tono institucional). Sin `rounded-2xl/3xl` salvo donde el portal ya lo usa.
- **i18n**: textos en español (`es-DO`), moneda `RD$` vía `formatCurrency`.
- **Modo demo**: banner/etiqueta "Datos de demostración" coherente con `PlaceholderScreen`.

---

## 11. Decisiones a confirmar (antes de codificar)

1. **Ruta**: ¿grupo propio `/empresa` (recomendado) o grupo `empresa` dentro de
   `/dashboard`?
2. **Gráficas**: ¿añadir `recharts` (más capacidad) o SVG/Tailwind sin dependencias?
3. **Roles**: ¿los 3 roles propuestos (admin/operador/visor) o un set distinto?
4. **Alcance inicial de tipos**: ¿arrancamos solo con `pymes`/`corporativa` y dejamos
   `gremial` para una fase posterior (recomendado)?
5. **Facturación**: ¿mostramos comprobantes mock con RNC/NCF de demo, o lo dejamos como
   "próximamente"?
6. **Switcher de cuenta**: ¿visible siempre en la demo, o detrás de un parámetro/flag?

---

## 12. Resumen de archivos a crear/editar

**Nuevos**
```
src/context/AccountContext.tsx
src/config/empresaNavigation.ts
src/types/empresa.ts
src/lib/format.ts                      (extraído de páginas existentes)
src/data/empresa/{empresa,fleet,drivers,costCenters,transactions,invoices,members}.ts
src/components/empresa/{KpiCard,DataTable,EmpresaSidebar,AccountSwitcher,ExportButton,EmptyState,TableSkeleton}.tsx
src/components/empresa/charts/*
src/app/empresa/layout.tsx
src/app/empresa/page.tsx
src/app/empresa/{flota,conductores,centros-costo,recargas,movimientos,reportes,facturacion,configuracion}/page.tsx
```

**Editados**
```
src/app/layout.tsx                     (montar AccountProvider)
src/components/SiteHeader.tsx          (AccountSwitcher + enlace a /empresa)
src/components/sidebar/AppSidebar.tsx  (refactor opcional para reusar SidebarNav)
src/app/dashboard/{vehiculos,historico}/page.tsx (reusar formatCurrency de lib/format)
package.json                           (solo si se opta por recharts)
```

---

## 13. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Divergencia visual con el portal | Reusar `ui/*`, tokens y chrome; checklist de design system en Fase 6 |
| Duplicación de lógica (mock vs futura API) | Aislar acceso a datos en hooks (`useFleet`, etc.) y documentar contrato §6.3 |
| Sobre-ingeniería para una demo | Empezar con flota plana; `gremial`, recharts y export PDF como fases opcionales |
| Confusión Personal ↔ Empresarial | Switcher claro + gating + etiqueta "modo empresa" en header |

---

### Próximo paso sugerido

Confirmar las decisiones de §11 (sobre todo ruta, gráficas y alcance de tipos) y, con
eso, arrancar la **Fase 0**.
