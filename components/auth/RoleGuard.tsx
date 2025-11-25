"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

/**
 * Componente para proteger rutas por rol
 * Solo verifica y renderiza, NO redirige (eso lo hace el middleware)
 */
export function RoleGuard({
  children,
  allowedRoles,
}: RoleGuardProps) {
  const { isAuthenticated, isLoading, getUserRole } = useAuth();

  // Mostrar loader mientras verifica
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Si no está autenticado, el middleware ya redirigió al login
  if (!isAuthenticated) {
    return null;
  }

  // Si se especificaron roles permitidos, verificar
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Acceso Denegado</h2>
            <p className="text-muted-foreground">No tienes permisos para acceder a esta sección</p>
          </div>
        </div>
      );
    }
  }

  // Todo está bien, mostrar el contenido
  return <>{children}</>;
}
