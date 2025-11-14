import { Especie } from "@/types/especie.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEspecies(): Promise<Especie[]> {
  const response = await fetch(`${API_URL}/especies`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Error al obtener especies");
  }
  return response.json();
}

export async function getEspecieById(idEspecie: string): Promise<Especie> {
  const response = await fetch(`${API_URL}/especies/${idEspecie}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Error al obtener especie");
  }
  return response.json();
}
