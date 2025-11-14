export interface Producto {
    idProducto: string;
    idTipoProducto: string;
    codigoProducto: string;
    nombreProducto: string;
    descripcion?: string;
    marca?: string;
    presentacion?: string;
    requiereReceta?: boolean;
    requiereRefrigeracion?: boolean;
    stockActual?: number;
    stockMinimo?: number;
    unidadMedida?: string;
    precioCompra?: number;
    precioVenta?: number;
    fechaVencimiento?: Date;
    lote?: string;
    proveedor?: string;
    activo?: boolean;
    fechaRegistro?: Date;
    fechaModificacion?: Date;
}