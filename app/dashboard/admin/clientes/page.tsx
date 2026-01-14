"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Calendar,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Download,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// 📊 Datos de ejemplo (mockup) - Reemplazar con API
const clientesMock = [
  {
    id: 1,
    nombre: "María González",
    email: "maria@email.com",
    telefono: "+52 555-1234",
    direccion: "Av. Reforma 123, CDMX",
    mascotas: 2,
    ultimaCita: "2026-01-10",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Carlos Ruiz",
    email: "carlos@email.com",
    telefono: "+52 555-5678",
    direccion: "Calle 45 #890, Guadalajara",
    mascotas: 1,
    ultimaCita: "2026-01-08",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Ana Torres",
    email: "ana@email.com",
    telefono: "+52 555-9012",
    direccion: "Blvd. Centro 567, Monterrey",
    mascotas: 3,
    ultimaCita: "2026-01-05",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Luis Pérez",
    email: "luis@email.com",
    telefono: "+52 555-3456",
    direccion: "Col. Del Valle 234, CDMX",
    mascotas: 1,
    ultimaCita: "2025-12-28",
    estado: "Inactivo",
  },
  {
    id: 5,
    nombre: "Sofia Martínez",
    email: "sofia@email.com",
    telefono: "+52 555-7890",
    direccion: "Av. Universidad 789, Puebla",
    mascotas: 2,
    ultimaCita: "2026-01-12",
    estado: "Activo",
  },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState(clientesMock);

  // Función de búsqueda
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = clientesMock.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(value.toLowerCase()) ||
        cliente.email.toLowerCase().includes(value.toLowerCase()) ||
        cliente.telefono.includes(value)
    );
    setFilteredClientes(filtered);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">
            Gestión de Clientes
          </h1>
          <p className="text-textSecondary mt-1">
            Administra tu base de clientes y su información
          </p>
        </div>
        <Link href="/dashboard/admin/clientes/nuevo">
          <Button className="bg-primary hover:bg-primaryHover">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Total Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-textPrimary">
              {clientesMock.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Clientes Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {clientesMock.filter((c) => c.estado === "Activo").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Total Mascotas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-textPrimary">
              {clientesMock.reduce((acc, c) => acc + c.mascotas, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-borderColor bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Nuevos (Este mes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <Card className="border-borderColor bg-surface">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-textMuted" />
              <Input
                placeholder="Buscar por nombre, email o teléfono..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Clientes */}
      <Card className="border-borderColor bg-surface">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-textPrimary">
            <Users className="h-5 w-5" />
            Lista de Clientes ({filteredClientes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                className="flex items-center justify-between p-4 rounded-lg border border-borderColor bg-background hover:shadow-md transition-shadow"
              >
                {/* Info del Cliente */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-semibold text-lg">
                    {cliente.nombre.charAt(0)}
                  </div>

                  {/* Datos Principales */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-textPrimary text-lg">
                        {cliente.nombre}
                      </h3>
                      <Badge
                        className={
                          cliente.estado === "Activo"
                            ? "bg-success/10 text-success"
                            : "bg-textMuted/10 text-textMuted"
                        }
                      >
                        {cliente.estado}
                      </Badge>
                    </div>

                    {/* Información de Contacto */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-textSecondary">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {cliente.telefono}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {cliente.direccion}
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-textMuted">
                        🐾 {cliente.mascotas}{" "}
                        {cliente.mascotas === 1 ? "mascota" : "mascotas"}
                      </span>
                      <span className="text-textMuted">
                        📅 Última cita: {cliente.ultimaCita}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/admin/clientes/${cliente.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      Ver
                    </Button>
                  </Link>

                  <Link href={`/dashboard/admin/clientes/${cliente.id}/citas`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 bg-primarySoft text-primary hover:bg-primary hover:text-white"
                    >
                      <Calendar className="h-4 w-4" />
                      Citas
                    </Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar Cita
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-error">
                        Desactivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {/* Estado Vacío */}
          {filteredClientes.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-textMuted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                No se encontraron clientes
              </h3>
              <p className="text-textSecondary mb-4">
                No hay clientes que coincidan con tu búsqueda
              </p>
              <Button onClick={() => handleSearch("")} variant="outline">
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}