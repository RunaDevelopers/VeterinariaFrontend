import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Usuario } from "@/types/usuario.interface";
import { Rol } from "@/types/rol.interface";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";

interface AuthStore {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginSchema) => Promise<void>;
  register: (data: RegisterSchema) => Promise<void>;
  logout: () => void;
}

// Roles de prueba
const rolAdmin: Rol = {
  idRol: "1",
  nombreRol: "Administrador",
  descripcion: "Acceso total al sistema",
  activo: true,
};

const rolCliente: Rol = {
  idRol: "2",
  nombreRol: "Cliente",
  descripcion: "Usuario cliente del sistema",
  activo: true,
};

// Usuarios de prueba
const usuariosPrueba: Record<string, { password: string; usuario: Usuario }> = {
  "admin@demo.com": {
    password: "admin123",
    usuario: {
      idUsuario: "1",
      idRol: rolAdmin,
      nombres: "Admin",
      apellidos: "Sistema",
      email: "admin@demo.com",
      telefono: "987654321",
      username: "admin",
      activo: true,
    },
  },
  "cliente@demo.com": {
    password: "cliente123",
    usuario: {
      idUsuario: "2",
      idRol: rolCliente,
      nombres: "Cliente",
      apellidos: "Demo",
      email: "cliente@demo.com",
      telefono: "912345678",
      username: "cliente",
      activo: true,
    },
  },
};

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

          // Simular delay de red
          await new Promise((resolve) => setTimeout(resolve, 800));

          const usuarioData = usuariosPrueba[credentials.email];

          if (!usuarioData || usuarioData.password !== credentials.password) {
            throw new Error("Credenciales incorrectas");
          }

          // Actualizar estado
          set({
            user: usuarioData.usuario,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success("Sesión iniciada", {
            description: `Bienvenido ${usuarioData.usuario.nombres} ${usuarioData.usuario.apellidos} - Rol: ${usuarioData.usuario.idRol.nombreRol}`,
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
      register: async (data) => {
        try {
          set({ isLoading: true });

          // Simular delay de red
          await new Promise((resolve) => setTimeout(resolve, 800));

          // Verificar si el email ya existe
          if (usuariosPrueba[data.email]) {
            throw new Error("El email ya está registrado");
          }

          // Crear nuevo usuario con rol Cliente por defecto
          const nuevoUsuario: Usuario = {
            idUsuario: String(Date.now()),
            idRol: rolCliente,
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            username: data.email.split("@")[0], // Generar username desde el email
            activo: true,
          };

          // Actualizar estado
          set({
            user: nuevoUsuario,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success("Registro exitoso", {
            description: `Bienvenido ${nuevoUsuario.nombres}`,
          });
        } catch (error) {
          set({ isLoading: false, isAuthenticated: false, user: null });
          const message =
            error instanceof Error
              ? error.message
              : "Error al registrar usuario";
          toast.error("Error de registro", {
            description: message,
          });
          throw error;
        }
      },

      /**
       * Cerrar sesión
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

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
      }),
    }
  )
);
