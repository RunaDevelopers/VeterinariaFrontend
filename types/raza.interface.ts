import { Especie } from "./especie.interface";

export interface Raza {
  idRaza: string;
  idEspecie: Especie;
  nombreRaza: string;
  tamanio?: "Pequeño" | "Mediano" | "Grande";
  caracteristicas?: string;
  pesoPromedioMin?: number;
  pesoPromedioMax?: number;
  esperanzaVidaAnios?: number;
  activo?: boolean;
  fechaCreacion?: Date;
}