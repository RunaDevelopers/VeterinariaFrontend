"use server";

import { TipoProducto } from "@/types/tipo-producto.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTipoProducto(tipoProducto: TipoProducto) {
  const response = await fetch(`${API_URL}/tipos-producto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoProducto),
  });
  if (!response.ok) {
    throw new Error("Error al crear tipo de producto");
  }
  revalidatePath("/tipos-producto");
  return response.json();
}

export async function updateTipoProducto(
  idTipoProducto: string,
  tipoProducto: Partial<TipoProducto>
) {
  const response = await fetch(`${API_URL}/tipos-producto/${idTipoProducto}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipoProducto),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar tipo de producto");
  }
  revalidatePath("/tipos-producto");
  revalidatePath(`/tipos-producto/${idTipoProducto}`);
  return response.json();
}

export async function deleteTipoProducto(idTipoProducto: string) {
  const response = await fetch(`${API_URL}/tipos-producto/${idTipoProducto}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar tipo de producto");
  }
  revalidatePath("/tipos-producto");
  return response.json();
}
