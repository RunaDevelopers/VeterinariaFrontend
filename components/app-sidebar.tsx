"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  DollarSign,
  FileText,
  Settings,
  LifeBuoy,
  UserCheck,
  Dog,
  Stethoscope,
  PawPrint,
  Syringe,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"

// Configuración del sidebar según el rol
const sidebarConfig = {
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Clientes",
        url: "/dashboard/admin/clientes",
        icon: Users,
        badge: "128",
      },
      {
        title: "Citas",
        url: "/dashboard/admin/citas",
        icon: Calendar,
        badge: "15",
      },
      {
        title: "Mascotas",
        url: "/dashboard/admin/mascotas",
        icon: Dog,
      },
      {
        title: "Consultas Médicas",
        url: "/dashboard/admin/consultas",
        icon: Stethoscope,
      },
      {
        title: "Productos",
        url: "/dashboard/admin/productos",
        icon: Package,
      },
      {
        title: "Facturación",
        url: "/dashboard/admin/facturacion",
        icon: DollarSign,
      },
      {
        title: "Leads",
        url: "/dashboard/admin/leads",
        icon: UserCheck,
        badge: "23",
      },
      {
        title: "Reportes",
        url: "/dashboard/admin/reportes",
        icon: FileText,
      },
    ],
    navSecondary: [
      {
        title: "Soporte",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Configuración",
        url: "/dashboard/admin/configuracion",
        icon: Settings,
      },
    ],
  },
  cliente: {
    navMain: [
      {
        title: "Mi Dashboard",
        url: "/dashboard/cliente",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Mis Mascotas",
        url: "/dashboard/cliente/mascotas",
        icon: PawPrint,
      },
      {
        title: "Mis Citas",
        url: "/dashboard/cliente/citas",
        icon: Calendar,
      },
      {
        title: "Historial Médico",
        url: "/dashboard/cliente/historial",
        icon: FileText,
      },
    ],
    navSecondary: [
      {
        title: "Soporte",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Mi Perfil",
        url: "/dashboard/cliente/perfil",
        icon: Settings,
      },
    ],
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const role = user?.rol?.nombre?.toLowerCase() || "cliente"

  const config = sidebarConfig[role as keyof typeof sidebarConfig] || sidebarConfig.cliente

  return (
    <Sidebar 
      variant="inset" 
      {...props}
      className="border-r border-borderColor"
    >
      <SidebarHeader className="border-b border-borderColor">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-white">
                  <Dog className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-textPrimary text-lg">
                    vetPet
                  </span>
                  <span className="truncate text-xs text-textSecondary">
                    Sistema Veterinario
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={config.navMain} />
        <NavSecondary items={config.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-borderColor">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
