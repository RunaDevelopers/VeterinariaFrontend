"use server";

import { Reserva } from "@/types/reserva.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createReserva(reserva: Reserva) {
  const response = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
  });

  if (!response.ok) {
    throw new Error("Error al crear reserva");
  }

  revalidatePath("/reservas");
  return response.json();
}

export async function updateReserva(
  idReserva: string,
  reserva: Partial<Reserva>
) {
  const response = await fetch(`${API_URL}/reservas/${idReserva}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar reserva");
  }

  revalidatePath("/reservas");
  revalidatePath(`/reservas/${idReserva}`);
  return response.json();
}

export async function deleteReserva(idReserva: string) {
  const response = await fetch(`${API_URL}/reservas/${idReserva}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar reserva");
  }

  revalidatePath("/reservas");
  revalidatePath(`/reservas/${idReserva}`);
  return response.json();
}
