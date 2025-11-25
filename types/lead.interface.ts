import { TipoServicio } from "./tipo-servicio.interface";

export interface Lead {
    idLead: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    correo: string;
    fechaTentativa: Date;
    idTipoServicios: TipoServicio;
}