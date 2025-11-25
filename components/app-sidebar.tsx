"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  User,
  Calendar,
  Heart,
  UserCircle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Panel",
            url: "/dashboard/admin",
          },
        ],
      },
      {
        title: "Gestión",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Reservas",
            url: "/dashboard/admin/reservas",
          },
          {
            title: "Clientes",
            url: "/dashboard/admin/clientes",
          },
          {
            title: "Mascotas",
            url: "/dashboard/admin/mascotas",
          },
          {
            title: "Especies",
            url: "/dashboard/admin/especies",
          },
          {
            title: "Razas",
            url: "/dashboard/admin/razas",
          },
          {
            title: "Tipos de Servicios",
            url: "/dashboard/admin/tipos-servicios",
          }
        ],
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
        url: "#",
        icon: Settings2,
      },
    ],
  },
  cliente: {
    navMain: [
      {
        title: "Mi Dashboard",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Inicio",
            url: "/dashboard/cliente",
          },
        ],
      },
      {
        title: "Mis Servicios",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Mis Mascotas",
            url: "/dashboard/cliente/mis-mascotas",
          },
          {
            title: "Mis Citas",
            url: "/dashboard/cliente/mis-citas",
          },
          {
            title: "Mi Perfil",
            url: "/dashboard/cliente/perfil",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Soporte",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Ayuda",
        url: "#",
        icon: Send,
      },
    ],
  },
  veterinario: {
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Panel",
            url: "/dashboard/veterinario",
          },
        ],
      },
      {
        title: "Atención",
        url: "#",
        icon: Heart,
        items: [
          {
            title: "Consultas",
            url: "/dashboard/veterinario/consultas",
          },
          {
            title: "Historiales",
            url: "/dashboard/veterinario/historiales",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Soporte",
        url: "#",
        icon: LifeBuoy,
      },
    ],
  },
  recepcionista: {
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Panel",
            url: "/dashboard/recepcionista",
          },
        ],
      },
      {
        title: "Atención al Cliente",
        url: "#",
        icon: Calendar,
        items: [
          {
            title: "Citas",
            url: "/dashboard/recepcionista/citas",
          },
          {
            title: "Clientes",
            url: "/dashboard/recepcionista/clientes",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Soporte",
        url: "#",
        icon: LifeBuoy,
      },
    ],
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAdmin, isCliente, isVeterinario, isRecepcionista } = useAuth();

  // Determinar qué configuración de sidebar mostrar según el rol
  const getSidebarData = () => {
    if (isAdmin()) return sidebarConfig.admin;
    if (isCliente()) return sidebarConfig.cliente;
    if (isVeterinario()) return sidebarConfig.veterinario;
    if (isRecepcionista()) return sidebarConfig.recepcionista;
    
    // Por defecto, mostrar configuración básica
    return {
      navMain: [],
      navSecondary: [],
    };
  };

  const sidebarData = getSidebarData();

  // Datos del usuario para el footer
  const userData = {
    name: user ? `${user.nombres} ${user.apellidos}` : "Usuario",
    email: user?.email || "",
    avatar: "/avatars/default.jpg",
  };

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Veterinaria</span>
                  <span className="truncate text-xs">{user?.nombreRol || "Sistema"}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
