import { Mascota } from "@/types/mascota.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMascotas(): Promise<Mascota[]> {
  const response = await fetch(`${API_URL}/mascotas`);
  if (!response.ok) {
    throw new Error("Error al obtener mascotas");
  }
  return response.json();
}

export async function getMascota(idMascota: string): Promise<Mascota> {
  const response = await fetch(`${API_URL}/mascotas/${idMascota}`);
  if (!response.ok) {
    throw new Error("Error al obtener mascota");
  }
  return response.json();
}