import { z } from "zod";

// Esquema de validación para el formulario de inicio de sesión

export const leadSchema = z.object({
  nombres: z.string().min(1, "Los nombres son obligatorios"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),
  correo: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),
  fechaTentativa: z.date().min(new Date(), "La fecha tentativa debe ser futura"),
  idTipoServicios: z.string().min(1, "El tipo de servicio es obligatorio"),
});
