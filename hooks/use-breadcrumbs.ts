"use client"

import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href?: string
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname()

  // Definir rutas y sus labels
  const routeLabels: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/admin": "Administración",
    "/dashboard/cliente": "Cliente",
    "/dashboard/veterinario": "Veterinario",
    "/dashboard/recepcionista": "Recepción",
    "/dashboard/admin/tipos-servicios": "Tipos de Servicios",
    "/dashboard/admin/usuarios": "Usuarios",
    "/dashboard/admin/roles": "Roles",
    "/dashboard/admin/clientes": "Clientes",
    "/dashboard/admin/mascotas": "Mascotas",
    "/dashboard/admin/especies": "Especies",
    "/dashboard/admin/razas": "Razas",
    "/dashboard/admin/productos": "Productos",
    "/dashboard/admin/tipo-producto": "Tipo de Producto",
    "/dashboard/admin/servicios": "Servicios",
    "/dashboard/admin/cirugias": "Cirugías",
    "/dashboard/admin/citas-medicas": "Citas Médicas",
    "/dashboard/admin/reservas": "Reservas",
    "/dashboard/admin/historial-clinico": "Historial Clínico",
    "/dashboard/admin/vacunaciones": "Vacunaciones",
    "/dashboard/admin/desparacitaciones": "Desparacitaciones",
    "/dashboard/admin/examenes-laboratorio": "Exámenes Laboratorio",
    "/dashboard/admin/recetas-medicas": "Recetas Médicas",
    "/dashboard/admin/condiciones-cronicas": "Condiciones Crónicas",
    "/dashboard/admin/alergias-mascotas": "Alérgias Mascotas",
    "/dashboard/admin/auditoria": "Auditoría",
  }

  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  let currentPath = ""

  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = routeLabels[currentPath]

    if (label) {
      breadcrumbs.push({
        label,
        href: currentPath === pathname ? undefined : currentPath,
      })
    }
  }

  return breadcrumbs
}