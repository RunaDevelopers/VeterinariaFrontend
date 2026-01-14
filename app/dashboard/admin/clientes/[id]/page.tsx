"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Dog,
  Clock,
  FileText,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClienteDetailPage() {
  const params = useParams();
  const clienteId = params.id;

  // 📊 Datos de ejemplo (mockup) - Reemplazar con API
  const cliente = {
    id: clienteId,
    nombre: "María González",
    email: "maria@email.com",
    telefono: "+52 555-1234",
    direccion: "Av. Reforma 123, Col. Centro, CDMX",
    fechaRegistro: "2024-03-15",
    estado: "Activo",
    notas: "Cliente frecuente, prefiere citas matutinas",
  };

  const mascotas = [
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      foto: "🐕",
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: "2 años",
      foto: "🐈",
    },
  ];

  const citasRecientes = [
    {
      id: 1,
      fecha: "2026-01-10",
      hora: "10:00",
      mascota: "Max",
      tipo: "Consulta General",
      veterinario: "Dr. Rodríguez",
      estado: "Completada",
    },
    {
      id: 2,
      fecha: "2026-01-15",
      hora: "14:30",
      mascota: "Luna",
      tipo: "Vacunación",
      veterinario: "Dra. Martínez",
      estado: "Pendiente",
    },
    {
      id: 3,
      fecha: "2026-01-20",
      hora: "11:00",
      mascota: "Max",
      tipo: "Control",
      veterinario: "Dr. Rodríguez",
      estado: "Pendiente",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/clientes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-textPrimary">
            {cliente.nombre}
          </h1>
          <p className="text-textSecondary">Cliente desde {cliente.fechaRegistro}</p>
        </div>
        <Badge
          className={
            cliente.estado === "Activo"
              ? "bg-success/10 text-success"
              : "bg-textMuted/10 text-textMuted"
          }
        >
          {cliente.estado}
        </Badge>
        <Button className="bg-primary hover:bg-primaryHover">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Columna Izquierda - Info del Cliente */}
        <div className="space-y-6">
          {/* Información de Contacto */}
          <Card className="border-borderColor bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-textPrimary">
                <User className="h-5 w-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-textMuted">Email</p>
                  <p className="text-textPrimary">{cliente.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-textMuted">Teléfono</p>
                  <p className="text-textPrimary">{cliente.telefono}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-textMuted">Dirección</p>
                  <p className="text-textPrimary">{cliente.direccion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mascotas */}
          <Card className="border-borderColor bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-textPrimary">
                <span className="flex items-center gap-2">
                  <Dog className="h-5 w-5" />
                  Mascotas ({mascotas.length})
                </span>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mascotas.map((mascota) => (
                <div
                  key={mascota.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background border border-borderColor hover:shadow-md transition"
                >
                  <div className="text-3xl">{mascota.foto}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-textPrimary">
                      {mascota.nombre}
                    </p>
                    <p className="text-sm text-textSecondary">
                      {mascota.raza} • {mascota.edad}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notas */}
          <Card className="border-borderColor bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-textPrimary">
                <FileText className="h-5 w-5" />
                Notas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-textSecondary text-sm">{cliente.notas}</p>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha - Citas y Calendario */}
        <div className="md:col-span-2 space-y-6">
          {/* Acciones Rápidas */}
          <div className="grid grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2 bg-primary hover:bg-primaryHover">
              <Calendar className="h-6 w-6" />
              Nueva Cita
            </Button>
            <Button className="h-20 flex-col gap-2 bg-secondary hover:bg-secondaryHover">
              <FileText className="h-6 w-6" />
              Ver Historial
            </Button>
            <Button className="h-20 flex-col gap-2 bg-accent hover:bg-accent/90">
              <Dog className="h-6 w-6" />
              Nueva Mascota
            </Button>
          </div>

          {/* Próximas Citas */}
          <Card className="border-borderColor bg-surface">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-textPrimary">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Citas ({citasRecientes.length})
                </span>
                <Button size="sm" className="bg-primary hover:bg-primaryHover">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {citasRecientes.map((cita) => (
                <div
                  key={cita.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background border border-borderColor hover:shadow-md transition"
                >
                  {/* Fecha */}
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary text-white">
                    <span className="text-xs font-medium">
                      {new Date(cita.fecha).toLocaleDateString("es", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-2xl font-bold">
                      {new Date(cita.fecha).getDate()}
                    </span>
                  </div>

                  {/* Info de la Cita */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-textPrimary">
                        {cita.tipo}
                      </h4>
                      <Badge
                        className={
                          cita.estado === "Completada"
                            ? "bg-success/10 text-success"
                            : cita.estado === "Pendiente"
                            ? "bg-warning/10 text-warning"
                            : "bg-info/10 text-info"
                        }
                      >
                        {cita.estado}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-textSecondary">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {cita.hora}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dog className="h-3 w-3" />
                        {cita.mascota}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {cita.veterinario}
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendario Visual (Mockup Simple) */}
          <Card className="border-borderColor bg-surface">
            <CardHeader>
              <CardTitle className="text-textPrimary">
                Calendario de Citas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background border border-borderColor rounded-lg p-6 text-center">
                <Calendar className="h-16 w-16 text-textMuted mx-auto mb-4" />
                <p className="text-textSecondary mb-2">
                  Calendario interactivo próximamente
                </p>
                <p className="text-sm text-textMuted">
                  Instala: <code className="bg-primarySoft text-primary px-2 py-1 rounded">pnpm add react-big-calendar</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
