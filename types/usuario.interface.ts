import { Rol } from "./rol.interface";

export interface Usuario {
    idUsuario: string;
    idRol: string;  // El backend envía solo el ID como string
    nombreRol: string;  // El backend envía el nombre del rol directamente
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    username: string;
    // passwordHash: string;
    documentoIdentidad?: string;
    tipoDocumento?: string;
    direccion?: string;
    especialidad?: string;
    numeroColegiatura?: string;
    activo?: boolean;
    ultimoAcceso?: Date;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
}