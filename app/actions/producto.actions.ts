"use server";

import { Producto } from "@/types/producto.interface";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createProducto(producto: Producto) {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    throw new Error("Error al crear producto");
  }
  revalidatePath("/productos");
  return response.json();
}

export async function updateProducto(
  idProducto: string,
  producto: Partial<Producto>
) {
  const response = await fetch(`${API_URL}/productos/${idProducto}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar producto");
  }
  revalidatePath("/productos");
  revalidatePath(`/productos/${idProducto}`);
  return response.json();
}

export async function deleteProducto(idProducto: string) {
  const response = await fetch(`${API_URL}/productos/${idProducto}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar producto");
  }
  revalidatePath("/productos");
}