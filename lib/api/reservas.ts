import { Reserva } from "@/types/reserva.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getReservas(): Promise<Reserva[]> {
  const response = await fetch(`${API_URL}/reservas`, {
    cache: "force-cache",
    // next: { revalidate: 60 } // Revalidar cada 60 segundos
  });

  if (!response.ok) throw new Error("Error al obtener reservas");
  return response.json();
}

export async function getReservaById(idReserva: string): Promise<Reserva> {
  const response = await fetch(`${API_URL}/reservas/${idReserva}`, {
    cache: "force-cache",
  });

  if (!response.ok) throw new Error("Error al obtener reserva");
  return response.json();
}
