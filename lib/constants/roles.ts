/**
 * Enum de roles disponibles en la aplicación
 * Debe coincidir con los roles definidos en el backend
 */
export enum UserRole {
  ADMIN = "ADMINISTRADOR",
  CLIENTE = "CLIENTE",
  VETERINARIO = "VETERINARIO",
  RECEPCIONISTA = "RECEPCIONISTA",
}

/**
 * Mapeo de rutas por rol
 * Define qué rutas puede acceder cada rol
 */
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: [
    "/dashboard",
    "/dashboard/admin",
    "/dashboard/admin/clientes",
    "/dashboard/admin/mascotas",
    "/dashboard/admin/especies",
    "/dashboard/admin/razas",
    "/dashboard/admin/reservas",
    "/dashboard/admin/panel",
    "/dashboard/admin/tipos-servicios",
  ],
  [UserRole.CLIENTE]: [
    "/dashboard",
    "/dashboard/cliente",
    "/dashboard/cliente/mis-mascotas",
    "/dashboard/cliente/mis-citas",
    "/dashboard/cliente/perfil",
  ],
  [UserRole.VETERINARIO]: [
    "/dashboard/veterinario",
    "/dashboard/veterinario/consultas",
    "/dashboard/veterinario/historiales",
  ],
  [UserRole.RECEPCIONISTA]: [
    "/dashboard/recepcionista",
    "/dashboard/recepcionista/citas",
    "/dashboard/recepcionista/clientes",
  ],
};

/**
 * Rutas públicas que no requieren autenticación
 */
export const PUBLIC_ROUTES = [
  "/",
  "/auth/login",
  "/auth/register",
  "/about",
  "/contact",
];

/**
 * Rutas protegidas que requieren autenticación
 */
export const PROTECTED_ROUTES = ["/dashboard"];

/**
 * Ruta por defecto después del login según el rol
 */
export const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/dashboard/admin/clientes",
  [UserRole.CLIENTE]: "/dashboard/cliente/reservas",
  [UserRole.VETERINARIO]: "/dashboard/veterinario/consultas",
  [UserRole.RECEPCIONISTA]: "/dashboard/recepcionista/citas",
};
