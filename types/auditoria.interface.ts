export interface Auditoria {
    idAuditoria: string;
    idUsuario: string;
    tablaAfectada: string;
    operacion: string;
    registroId?: string;
    datosAnteriores?: JSON;
    datosNuevos?: JSON;
    userAgent?: string;
    fechaOperacion?: Date;
}