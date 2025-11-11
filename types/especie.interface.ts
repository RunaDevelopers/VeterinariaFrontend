
export interface Especie {
  idEspecie: string;
  nombreEspecie: string;
  nombreCientifico?: string;
  descripcion?: string;
  activo?: boolean;
  fechaCreacion?: Date;
}