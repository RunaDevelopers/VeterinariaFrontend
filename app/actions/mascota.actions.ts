"use server";

import { Mascota } from "@/types/mascota.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createMascota(mascota: Mascota) {
  const response = await fetch(`${API_URL}/mascotas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mascota),
  });
  if (!response.ok) {
    throw new Error("Error al crear mascota");
  }

  revalidatePath("/mascotas");
  return response.json();
}

export async function updateMascota(
  idMascota: string,
  mascota: Partial<Mascota>
) {
  const response = await fetch(`${API_URL}/mascotas/${idMascota}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mascota),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar mascota");
  }
  revalidatePath("/mascotas");
  revalidatePath(`/mascotas/${idMascota}`);
  return response.json();
}

export async function deleteMascota(idMascota: string) {
  const response = await fetch(`${API_URL}/mascotas/${idMascota}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar mascota");
  }
  revalidatePath("/mascotas");
  revalidatePath(`/mascotas/${idMascota}`);
  return response.json();
}