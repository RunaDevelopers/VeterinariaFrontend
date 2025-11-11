import { Raza } from "./raza.interface";
import { Especie } from "./especie.interface";
import { Cliente } from "./cliente.interface";

export interface Mascota {
  idMascota: string;
  idCliente: Cliente;
  idEspecie: Especie;
  idRaza?: Raza;
  nombreMascota?: string;
  fechaNacimiento?: Date;
  edadEstimada?: string;
  sexo?: "M" | "F";
  color?: string;
  seniasParticulares?: string;
  numeroRegistro?: string;
  pesoActual?: number;
  esterilizado?: boolean;
  fechaEsterilizacion?: Date;
  comportamiento?: string;
  foto?: string;
  activo?: boolean;
  fallecido: boolean;
  fechaFallecimiento?: Date;
  causaFallecimiento?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}
