"use server";

import { Cliente } from "@/types/cliente.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createCliente(cliente: Cliente) {
  const response = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Error al crear cliente");
  }

  revalidatePath("/clientes");
  return response.json();
}

export async function updateCliente(
  idCliente: string,
  cliente: Partial<Cliente>
) {
  const response = await fetch(`${API_URL}/clientes/${idCliente}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) throw new Error("Error al actualizar");

  revalidatePath("/clientes");
  revalidatePath(`/clientes/${idCliente}`);
  return response.json();
}

export async function deleteCliente(idCliente: string) {
  const response = await fetch(`${API_URL}/clientes/${idCliente}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar");

  revalidatePath("/clientes");
}
