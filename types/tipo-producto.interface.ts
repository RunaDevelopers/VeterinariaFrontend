
export interface TipoProducto {
    idTipoProducto: string;
    nombreTipo: string;
    descripcion?: string;
    requierePrescripcion?: boolean;
    activo?: boolean;
    fechaCreacion?: Date;
}