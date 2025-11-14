import { TipoProducto } from "@/types/tipo-producto.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTiposProducto(): Promise<TipoProducto[]> {
  const response = await fetch(`${API_URL}/tipos-producto`, {
    cache: "force-cache",
    // next: { revalidate: 60 } // Revalidar cada 60 segundos
  });
  if (!response.ok) {
    throw new Error("Error al obtener tipos de producto");
  }
  return response.json();
}

export async function getTipoProductoById(
  idTipoProducto: string
): Promise<TipoProducto> {
  const response = await fetch(`${API_URL}/tipos-producto/${idTipoProducto}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Error al obtener tipo de producto");
  }
  return response.json();
}
