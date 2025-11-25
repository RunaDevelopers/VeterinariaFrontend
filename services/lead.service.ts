import { Lead } from "@/types/lead.interface";
import { fetchWithAuth } from "@/lib/api/client";
import { z } from "zod";
import { leadSchema } from "@/schemas/lead.schema";

type CreateLeadData = z.infer<typeof leadSchema>;

export async function createLead(data: CreateLeadData): Promise<Lead> {
  const response = await fetchWithAuth("/leads", {
    method: "POST",
    body: JSON.stringify(data),
    requiresAuth: false, // Endpoint público para landing page
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al crear la solicitud de reserva");
  }

  return response.json();
}

export async function getLeads(): Promise<Lead[]> {
  const response = await fetchWithAuth("/leads", {
    method: "GET",
    requiresAuth: true, // Requiere autenticación (admin)
  });

  if (!response.ok) {
    throw new Error("Error al obtener leads");
  }

  return response.json();
}

export async function getLeadById(id: string): Promise<Lead> {
  const response = await fetchWithAuth(`/leads/${id}`, {
    method: "GET",
    requiresAuth: true,
  });

  if (!response.ok) {
    throw new Error("Error al obtener el lead");
  }

  return response.json();
}

export async function updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
  const response = await fetchWithAuth(`/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    requiresAuth: true,
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el lead");
  }

  return response.json();
}

export async function deleteLead(id: string): Promise<void> {
  const response = await fetchWithAuth(`/leads/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el lead");
  }
}
