"use server";

import { Especie } from "@/types/especie.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createEspecie(especie: Especie) {
  const response = await fetch(`${API_URL}/especies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(especie),
  });

  if (!response.ok) {
    throw new Error("Error al crear especie");
  }

  revalidatePath("/especies");
  return response.json();
}

export async function updateEspecie(
  idEspecie: string,
  especie: Partial<Especie>
) {
  const response = await fetch(`${API_URL}/especies/${idEspecie}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(especie),
  });

  if (!response.ok) throw new Error("Error al actualizar");

  revalidatePath("/especies");
  revalidatePath(`/especies/${idEspecie}`);
  return response.json();
}

export async function deleteEspecie(idEspecie: string) {
  const response = await fetch(`${API_URL}/especies/${idEspecie}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar");

  revalidatePath("/especies");
}
