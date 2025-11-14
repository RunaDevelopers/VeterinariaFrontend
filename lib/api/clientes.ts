import { Cliente } from "@/types/cliente.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getClientes(): Promise<Cliente[]> {
  const response = await fetch(`${API_URL}/clientes`, {
    cache: 'force-cache',
    // next: { revalidate: 60 } // Revalidar cada 60 segundos
  })
  
  if (!response.ok) throw new Error('Error al obtener clientes')
  return response.json()
}

export async function getClienteById(idCliente: string): Promise<Cliente> {
  const response = await fetch(`${API_URL}/clientes/${idCliente}`, {
    cache: 'force-cache',
  })
  
  if (!response.ok) throw new Error('Error al obtener el cliente')
  return response.json()
}