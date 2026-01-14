"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Users, 
  Calendar, 
  Package, 
  TrendingUp, 
  DollarSign,
  Activity,
  UserCheck,
  ClipboardList,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminDashboardPage() {
  // 📊 Data de ejemplo (Mockup) - Reemplazar con API calls
  const metrics = {
    totalClientes: 128,
    clientesNuevos: 12,
    citasHoy: 8,
    citasPendientes: 15,
    productosBajoStock: 5,
    ventasMes: 24500,
    leadsActivos: 23,
    tasaConversion: 68
  };

  return (
    <div className="space-y-6 p-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Dashboard Administrativo</h1>
          <p className="text-textSecondary mt-1">
            Visión general de tu clínica veterinaria
          </p>
        </div>
      </div>

      {/* 📊 Métricas Principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Clientes */}
        <Card className="border-borderColor bg-surface hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Total Clientes
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-textPrimary">{metrics.totalClientes}</div>
            <div className="flex items-center text-xs text-success mt-2">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{metrics.clientesNuevos} nuevos este mes
            </div>
          </CardContent>
        </Card>

        {/* Citas de Hoy */}
        <Card className="border-borderColor bg-surface hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Citas de Hoy
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Calendar className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-textPrimary">{metrics.citasHoy}</div>
            <div className="flex items-center text-xs text-textMuted mt-2">
              <Activity className="h-3 w-3 mr-1" />
              {metrics.citasPendientes} pendientes
            </div>
          </CardContent>
        </Card>

        {/* Ventas del Mes */}
        <Card className="border-borderColor bg-surface hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Ventas del Mes
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-textPrimary">
              ${metrics.ventasMes.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-success mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% vs mes anterior
            </div>
          </CardContent>
        </Card>

        {/* Leads Activos */}
        <Card className="border-borderColor bg-surface hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">
              Leads Activos
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <UserCheck className="h-5 w-5 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-textPrimary">{metrics.leadsActivos}</div>
            <div className="flex items-center text-xs text-textMuted mt-2">
              <Activity className="h-3 w-3 mr-1" />
              {metrics.tasaConversion}% conversión
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ⚡ Acciones Rápidas */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <Button className="h-14 text-sm font-medium bg-secondary hover:bg-secondaryHover text-white">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Cita
        </Button>
        <Button className="h-14 text-sm font-medium bg-primary hover:bg-primaryHover text-white">
          <Users className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
        <Button className="h-14 text-sm font-medium bg-accent hover:bg-accent/90 text-white">
          <Package className="mr-2 h-4 w-4" />
          Registrar Producto
        </Button>
        <Button className="h-14 text-sm font-medium bg-info hover:bg-info/90 text-white">
          <Activity className="mr-2 h-4 w-4" />
          Registrar Mascota
        </Button>
      </div>

      {/* Grid de 2 columnas */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* 📅 Citas Recientes */}
        <Card className="border-borderColor bg-surface">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-textPrimary">Citas de Hoy</span>
              <Badge className="bg-primarySoft text-primary">{metrics.citasHoy} activas</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "1", hora: "09:00", cliente: "María González", mascota: "Max", tipo: "Consulta" },
              { id: "2", hora: "10:30", cliente: "Carlos Ruiz", mascota: "Luna", tipo: "Vacunación" },
              { id: "3", hora: "11:00", cliente: "Ana Torres", mascota: "Rocky", tipo: "Cirugía" },
              { id: "4", hora: "14:00", cliente: "Luis Pérez", mascota: "Bella", tipo: "Control" },
            ].map((cita) => (
              <div key={cita.id} className="flex items-center justify-between p-3 rounded-lg bg-background border border-borderColor hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-md bg-primary text-white font-semibold">
                    <span className="text-xs">Hoy</span>
                    <span className="text-sm">{cita.hora}</span>
                  </div>
                  <div>
                    <p className="font-medium text-textPrimary">{cita.cliente}</p>
                    <p className="text-sm text-textSecondary">{cita.mascota} - {cita.tipo}</p>
                  </div>
                </div>
                <Link href={`/dashboard/admin/citas/${cita.id}`}>
                  <Button variant="outline" size="sm">Ver</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 🚨 Alertas y Notificaciones */}
        <Card className="border-borderColor bg-surface">
          <CardHeader>
            <CardTitle className="text-textPrimary">Alertas y Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-error/10 border border-error/20">
              <Package className="h-5 w-5 text-error mt-0.5" />
              <div>
                <p className="font-medium text-error">{metrics.productosBajoStock} Productos Bajo Stock</p>
                <p className="text-sm text-textSecondary">Revisa el inventario y realiza pedidos</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <ClipboardList className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning">{metrics.citasPendientes} Citas Pendientes de Confirmar</p>
                <p className="text-sm text-textSecondary">Contacta a los clientes para confirmar</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-info/10 border border-info/20">
              <UserCheck className="h-5 w-5 text-info mt-0.5" />
              <div>
                <p className="font-medium text-info">{metrics.leadsActivos} Leads Requieren Seguimiento</p>
                <p className="text-sm text-textSecondary">No olvides hacer seguimiento hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
