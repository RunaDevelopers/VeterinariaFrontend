export interface TipoServicio {
  idTipoServicio: string;
  nombreServicio: string;
  descripcion?: string;
  categoria?: string;
  requiereCita?: boolean;
  requiereVeterinario?: boolean;
  duracionEstimadaMinutos?: number;
  precioBase?: number;
  activo?: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}