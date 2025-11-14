import { Producto } from "@/types/producto.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductos(): Promise<Producto[]> {
  const response = await fetch(`${API_URL}/productos`, {
    cache: 'force-cache',
    // next: { revalidate: 60 } // Revalidar cada 60 segundos
  }) 

  if (!response.ok) throw new Error('Error al obtener productos')
  return response.json()
}

export async function getProductoById(idProducto: string): Promise<Producto> {
  const response = await fetch(`${API_URL}/productos/${idProducto}`, {
    cache: 'force-cache',
  })

  if (!response.ok) throw new Error('Error al obtener producto')
  return response.json()
}
