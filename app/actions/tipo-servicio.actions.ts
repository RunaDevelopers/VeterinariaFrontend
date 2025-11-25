"use server";

import { TipoServicio } from "@/types/tipo-servicio.interface";
import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/api/client";

export async function createTipoServicio(data: Partial<TipoServicio>): Promise<TipoServicio> {
  const response = await fetchWithAuth("/tipos-servicio", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear tipo de servicio");
  }

  revalidatePath("/tipos-servicio");
  return response.json();
}

export async function updateTipoServicio(
  idTipoServicio: string,
  data: Partial<TipoServicio>
): Promise<TipoServicio> {
  const response = await fetchWithAuth(`/tipo-servicios/${idTipoServicio}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar tipo de servicio");
  }

  revalidatePath("/tipo-servicios");
  revalidatePath(`/tipo-servicios/${idTipoServicio}`);
  return response.json();
}


export async function deleteTipoServicio(idTipoServicio: string): Promise<void> {
  const response = await fetchWithAuth(`/tipo-servicios/${idTipoServicio}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar tipo de servicio");
  }
  revalidatePath("/tipo-servicios");
}
