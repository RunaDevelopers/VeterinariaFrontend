import { useAuthStore } from "../store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Cliente fetch personalizado que automáticamente incluye el token de autorización
 * Similar a los interceptors de Axios
 */
export async function fetchWithAuth(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { requiresAuth = true, headers, ...restOptions } = options;

  // Configurar headers por defecto
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Agregar headers personalizados
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        defaultHeaders[key] = value;
      }
    });
  }

  // Agregar token si la petición lo requiere
  if (requiresAuth) {
    // Obtener token del store (solo en cliente)
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;
      
      if (token) {
        defaultHeaders.Authorization = `Bearer ${token}`;
      }
    }
  }

  // Construir URL completa
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: defaultHeaders,
    });

    // Manejar token expirado o no autorizado
    if (response.status === 401 && requiresAuth) {
      // Hacer logout automático
      if (typeof window !== "undefined") {
        useAuthStore.getState().logout();
        
        // Redirigir al login
        window.location.href = "/auth/login";
      }
      
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    return response;
  } catch (error) {
    // Re-lanzar el error para que sea manejado por el código que llama
    throw error;
  }
}

/**
 * Helper para hacer peticiones GET
 */
export async function get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: "GET",
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper para hacer peticiones POST
 */
export async function post<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper para hacer peticiones PUT
 */
export async function put<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper para hacer peticiones PATCH
 */
export async function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper para hacer peticiones DELETE
 */
export async function del<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
