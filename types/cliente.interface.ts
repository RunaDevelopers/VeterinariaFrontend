export interface Cliente {
  idCliente: string;
  nombres: string;
  apellidos: string;
  documentoIdentidad?: string;
  tipoDocumento?: string;
  email: string;
  telefono: string;
  telefonoSecundario?: string;
  direccion?: string;
  distrito?: string;
  ciudad?: string;
  referenciaDireccion?: string;
  fechaNacimiento?: string;
  preferenciaContacto?: string;
  notasEspeciales?: string;
  prioridadCliente?: string;
  activo?: boolean;
  fechaRegistro?: string;
  fechaModificacion?: string;
}