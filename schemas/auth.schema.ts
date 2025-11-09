import { z } from "zod";

// Esquema de validación para el formulario de inicio de sesión
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Esquema de validación para el formulario de registro
export const registerSchema = z.object({
  nombres: z.string().min(1, "Los nombres son obligatorios"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),
  telefono: z
    .string()
    .min(9, "El teléfono debe tener 9 dígitos")
    .max(9, "El teléfono debe tener 9 dígitos")
    .regex(/^9\d{8}$/, "El teléfono debe ser un número celular peruano válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
