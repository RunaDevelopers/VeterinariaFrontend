import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Usuario } from "@/types/usuario.interface";
import { loginApi } from "../api/auth";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";

interface AuthStore {
  user: Usuario | null;
  token?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginSchema) => Promise<void>;
  // register: (data: RegisterSchema) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Simulacion de inicio de sesion y registro
      login: async (credentials) => {
        try {
          set({ isLoading: true });

          const usuarioData = await loginApi(credentials);

          // Actualizar estado
          set({
            user: usuarioData.user,
            token: usuarioData.access_token,
            isAuthenticated: true,
            isLoading: false,
          });

          // Guardar token en cookies para el middleware
          if (typeof document !== "undefined") {
            document.cookie = `auth-token=${usuarioData.access_token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 días
          }

          toast.success("Sesión iniciada", {
            description: `Bienvenido ${usuarioData.user.nombres} ${usuarioData.user.apellidos} - Rol: ${usuarioData.user.nombreRol}`,
          });
        } catch (error) {
          set({ isLoading: false, isAuthenticated: false, user: null });
          const message =
            error instanceof Error ? error.message : "Error al iniciar sesión";
          toast.error("Error de autenticación", {
            description: message,
          });
          throw error;
        }
      },

      // Registrar nuevo usuario (simulación)
      // register: async (data) => {
      // },

      /**
       * Cerrar sesión
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          token: undefined,
        });

        // Eliminar token de cookies
        if (typeof document !== "undefined") {
          document.cookie = "auth-token=; path=/; max-age=0";
        }

        toast.info("Sesión cerrada", {
          description: "Has cerrado sesión exitosamente",
        });
      },
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);
