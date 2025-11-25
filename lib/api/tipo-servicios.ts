import { TipoServicio } from "@/types/tipo-servicio.interface";
import { fetchWithAuth } from "./client";

export async function getTiposServicio(): Promise<TipoServicio[]> {
  const response = await fetchWithAuth("/tipo-servicios", {
    method: "GET",
    // Opciones de caché de Next.js
    cache: "force-cache", // o "no-store" para siempre fresh
    // next: { revalidate: 60 } // Revalidar cada 60 segundos
  });

  if (!response.ok) {
    throw new Error("Error al obtener tipos de servicio");
  }

  return response.json();
}

export async function getTipoServicioById(
  idTipoServicio: string
): Promise<TipoServicio> {
  const response = await fetchWithAuth(`/tipo-servicios/${idTipoServicio}`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Error al obtener tipo de servicio");
  }

  return response.json();
}