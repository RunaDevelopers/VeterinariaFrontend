"use client";

import { TipoServicio } from "@/types/tipo-servicio.interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, DollarSign, Stethoscope, Calendar } from "lucide-react";

interface TipoServicioCardProps {
  tipoServicio: TipoServicio;
}

export const TipoServicioCard = ({ tipoServicio }: TipoServicioCardProps) => {
  const {
    nombreServicio,
    descripcion,
    categoria,
    requiereCita,
    requiereVeterinario,
    duracionEstimadaMinutos,
    precioBase,
    activo = true,
  } = tipoServicio;

  return (
    <Card
      className={`p-0 cursor-pointer transition-all hover:shadow-lg ${!activo ? 'opacity-60' : ''}`}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <div className="flex items-center justify-center h-full">
            <Stethoscope className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {nombreServicio}
          </CardTitle>
          {!activo && (
            <Badge variant="secondary" className="ml-2">
              Inactivo
            </Badge>
          )}
        </div>

        {categoria && (
          <Badge variant="outline" className="mb-2">
            {categoria}
          </Badge>
        )}

        {descripcion && (
          <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {descripcion}
          </CardDescription>
        )}

        <div className="space-y-2">
          {duracionEstimadaMinutos && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {duracionEstimadaMinutos} minutos
            </div>
          )}

          {precioBase && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              ${precioBase.toLocaleString()}
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            {requiereCita && (
              <Badge variant="secondary" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Requiere cita
              </Badge>
            )}

            {requiereVeterinario && (
              <Badge variant="secondary" className="text-xs">
                <Stethoscope className="h-3 w-3 mr-1" />
                Veterinario
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
