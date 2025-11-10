"use client";

import { loginSchema, LoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Componentes de UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { ScaleIn } from "../animations";

// Estado global para autenticacion
import { useAuthStore } from "@/lib/store/auth.store";
import { redirect } from "next/navigation";

interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm = ({ onToggleForm }: LoginFormProps) => {
  const { login, isAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    if (isAuthenticated) {
      redirect("/dashboard/panel");
    }
  };

  return (
    <div className="w-full max-w-md">
      <ScaleIn>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-500 text-sm">
            Bienvenido de vuelta! Por favor ingresa tus credenciales.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Correo
                </FieldLabel>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="username@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </Field>

              <Field>
                <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </FieldLabel>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="*********"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </Field>
            </FieldGroup>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
              </label>
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Recuperar Contraseña
              </button>
            </div>

            <Button
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-300 text-black pointer-events-none" : ""
              }`}
            >
                {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </Button>

            <div className="text-center mt-6">
              <span className="text-gray-500 text-sm">
                ¿Aún no tienes cuenta?{" "}
              </span>
              <button
                type="button"
                onClick={onToggleForm}
                disabled={isSubmitting}
                className={`text-cyan-400 font-semibold text-sm cursor-pointer ${
                  isSubmitting
                    ? "bg-gray-300 text-black pointer-events-none"
                    : ""
                }`}
              >
                Registrate Aqui!
              </button>
            </div>
          </FieldSet>
        </form>
      </ScaleIn>
    </div>
  );
};
