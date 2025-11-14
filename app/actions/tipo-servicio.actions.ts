"use server";

import { TipoServicio } from "@/types/tipo-servicio.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTipoServicio(tipoServicio: TipoServicio) {
  const response = await fetch(`${API_URL}/tipos-servicio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoServicio),
  });
  if (!response.ok) {
    throw new Error("Error al crear tipo de servicio");
  }
  revalidatePath("/tipos-servicio");
  return response.json();
}

export async function updateTipoServicio(
  idTipoServicio: string,
  tipoServicio: Partial<TipoServicio>
) {
  const response = await fetch(`${API_URL}/tipos-servicio/${idTipoServicio}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipoServicio),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar tipo de servicio");
  }
  revalidatePath("/tipos-servicio");
  revalidatePath(`/tipos-servicio/${idTipoServicio}`);
  return response.json();
}

export async function deleteTipoServicio(idTipoServicio: string) {
  const response = await fetch(`${API_URL}/tipos-servicio/${idTipoServicio}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar tipo de servicio");
  }
  revalidatePath("/tipos-servicio");
  return response.json();
}
