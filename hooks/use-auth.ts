import { useAuthStore } from "@/lib/store/auth.store";
import { UserRole, ROLE_ROUTES, DEFAULT_ROUTE_BY_ROLE } from "@/lib/constants/roles";

/**
 * Hook personalizado para manejar la autenticación y roles
 * Proporciona funciones útiles para verificar permisos en componentes
 */
export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout } = useAuthStore();

  /**
   * Obtiene el rol del usuario actual
   */
  const getUserRole = (): string | null => {
    return user?.nombreRol || null;
  };

  /**
   * Verifica si el usuario tiene un rol específico
   */
  const hasRole = (role: UserRole): boolean => {
    const userRole = getUserRole();
    return userRole === role;
  };

  /**
   * Verifica si el usuario es administrador
   */
  const isAdmin = (): boolean => {
    return hasRole(UserRole.ADMIN);
  };

  /**
   * Verifica si el usuario es cliente
   */
  const isCliente = (): boolean => {
    return hasRole(UserRole.CLIENTE);
  };

  /**
   * Verifica si el usuario es veterinario
   */
  const isVeterinario = (): boolean => {
    return hasRole(UserRole.VETERINARIO);
  };

  /**
   * Verifica si el usuario es recepcionista
   */
  const isRecepcionista = (): boolean => {
    return hasRole(UserRole.RECEPCIONISTA);
  };

  /**
   * Verifica si el usuario tiene acceso a una ruta específica
   */
  const canAccessRoute = (route: string): boolean => {
    if (!isAuthenticated || !user) return false;

    const userRole = getUserRole();
    if (!userRole) return false;

    // Buscar el rol en el enum
    const roleKey = Object.entries(UserRole).find(
      ([, value]) => value === userRole
    )?.[0] as keyof typeof UserRole;

    if (!roleKey) return false;

    const allowedRoutes = ROLE_ROUTES[UserRole[roleKey]];
    
    // Verificar si la ruta está permitida (coincidencia exacta o prefijo)
    return allowedRoutes.some(
      (allowedRoute) =>
        route === allowedRoute || route.startsWith(`${allowedRoute}/`)
    );
  };

  /**
   * Obtiene la ruta por defecto según el rol del usuario
   */
  const getDefaultRoute = (): string => {
    const userRole = getUserRole();
    if (!userRole) return "/auth/login";

    // Buscar el rol en el enum
    const roleKey = Object.entries(UserRole).find(
      ([, value]) => value === userRole
    )?.[0] as keyof typeof UserRole;

    if (!roleKey) return "/dashboard";

    return DEFAULT_ROUTE_BY_ROLE[UserRole[roleKey]] || "/dashboard";
  };

  /**
   * Obtiene información completa del usuario
   */
  const getUserInfo = () => {
    if (!user) return null;

    return {
      id: user.idUsuario,
      nombres: user.nombres,
      apellidos: user.apellidos,
      email: user.email,
      username: user.username,
      telefono: user.telefono,
      rol: user.nombreRol,
      nombreCompleto: `${user.nombres} ${user.apellidos}`,
    };
  };

  return {
    // Estado
    user,
    token,
    isAuthenticated,
    isLoading,

    // Acciones
    login,
    logout,

    // Verificaciones de rol
    getUserRole,
    hasRole,
    isAdmin,
    isCliente,
    isVeterinario,
    isRecepcionista,

    // Verificaciones de rutas
    canAccessRoute,
    getDefaultRoute,

    // Información del usuario
    getUserInfo,
  };
}
