import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de Next.js para proteger rutas
 * Se ejecuta antes de renderizar cualquier página
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener el token desde las cookies (si usas cookies) o desde el header
  // Como estamos usando localStorage, verificaremos en el cliente
  // Pero podemos usar cookies para una mejor seguridad
  const token = request.cookies.get("auth-token")?.value;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/about",
    "/contact",
  ];

  // Verificar si la ruta es pública
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // Si es una ruta pública, permitir el acceso
  if (isPublicRoute) {
    // Si está autenticado y intenta acceder al login, redirigir al dashboard
    if (token && pathname === "/auth/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Proteger rutas del dashboard
  if (pathname.startsWith("/dashboard")) {
    // Si no hay token, redirigir al login
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      // Guardar la URL original para redirigir después del login
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Aquí podrías decodificar el JWT para verificar el rol
    // y redirigir según los permisos, pero eso lo haremos en el layout
    // para evitar duplicar lógica
  }

  return NextResponse.next();
}

/**
 * Configuración del middleware
 * Define en qué rutas se debe ejecutar
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|img).*)",
  ],
};
