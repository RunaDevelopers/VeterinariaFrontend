"use client";

import { registerSchema, RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Componentes de UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

// Estado global para autenticacion
import { useAuthStore } from "@/lib/store/auth.store";

interface RegisterFormProps {
  onToggleForm: () => void;
}

import { useState } from "react";
import { ScaleIn } from "../animations";
import { redirect } from "next/navigation";

export const RegisterForm = ({ onToggleForm }: RegisterFormProps) => {
  const { register: registerUser, isAuthenticated } = useAuthStore();

  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser(data);
    if (isAuthenticated) {
      redirect("/dashboard/panel");
    }
  };

  // Validar el primer paso antes de avanzar
  const handleNextStep = async () => {
    const valid = await trigger(["nombres", "apellidos", "telefono"]);
    if (valid) setStep(2);
  };

  return (
    <div className="w-full max-w-md">
      <ScaleIn>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Registrate</h2>
          <p className="text-gray-500 text-sm">Crea tu cuenta para comenzar.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldSet>
            <FieldGroup>
              {step === 1 && (
                <>
                  <Field>
                    <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                      Nombres
                    </FieldLabel>
                    <Input
                      {...register("nombres")}
                      type="text"
                      placeholder="Ej: Juan Pablo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                    {errors.nombres && (
                      <span className="text-red-500 text-sm">
                        {errors.nombres.message}
                      </span>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos
                    </FieldLabel>
                    <Input
                      {...register("apellidos")}
                      type="text"
                      placeholder="Ej: Pérez Diaz"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                    {errors.apellidos && (
                      <span className="text-red-500 text-sm">
                        {errors.apellidos.message}
                      </span>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </FieldLabel>
                    <Input
                      {...register("telefono")}
                      type="tel"
                      placeholder="Ej: 987654321"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                    {errors.telefono && (
                      <span className="text-red-500 text-sm">
                        {errors.telefono.message}
                      </span>
                    )}
                  </Field>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full mt-4"
                  >
                    Siguiente
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <Field>
                    <FieldLabel className="block text-sm font-medium text-gray-700 mb-2">
                      Correo
                    </FieldLabel>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="usuario@correo.com"
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
                  <Button
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting
                        ? "bg-gray-300 text-black pointer-events-none"
                        : ""
                    }`}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </FieldGroup>

            <div className="text-center mt-6">
              <span className="text-gray-500 text-sm">¿Ya tienes cuenta? </span>
              <button
                type="button"
                onClick={onToggleForm}
                className="text-cyan-400 font-semibold text-sm cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </div>
          </FieldSet>
        </form>
      </ScaleIn>
    </div>
  );
};
