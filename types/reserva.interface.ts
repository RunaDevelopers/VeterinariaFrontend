import { Cliente } from "./cliente.interface";
import { Mascota } from "./mascota.interface";
import { TipoServicio } from "./tipo-servicio.interface";
import { Usuario } from "./usuario.interface";

export interface Reserva {
  idReserva: string;
  idCliente: Cliente;
  idMascota: Mascota;
  idTipoServicio: TipoServicio;
  fechaSolicitada: string;
  horaSolicitada: string;
  estado?: string;
  observacionesCliente?: string;
  motivoRechazo?: string;
  fechaRespuesta?: string;
  idUsuarioResponde?: Usuario;
  fechaCreacion?: string;
  fechaModificacion?: string;
}
