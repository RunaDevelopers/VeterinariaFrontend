import { TipoServicio } from "@/types/tipo-servicio.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTiposServicio(): Promise<TipoServicio[]> {
  const response = await fetch(`${API_URL}/tipos-servicio`, {
    cache: "force-cache",
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
  const response = await fetch(`${API_URL}/tipos-servicio/${idTipoServicio}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Error al obtener tipo de servicio");
  }
  return response.json();
}
