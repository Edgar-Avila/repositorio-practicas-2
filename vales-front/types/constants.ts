export const unidadesMedida = [
  "GALON",
  "LITRO",
  "UNIDAD",
  "KILO",
  "METRO",
] as const;
export type UnidadMedida = (typeof unidadesMedida)[number];

export const tiposCliente = ["HABITUAL", "ASOCIADO"] as const;
export type TipoCliente = (typeof tiposCliente)[number];

export const tiposOperacion = ["VENTA_AL_CONTADO", "VENTA_AL_CREDITO"] as const;
export type TipoOperacion = (typeof tiposOperacion)[number];

export const tiposDocumento = ["RUC", "DNI"] as const;
export type TipoDocumento = (typeof tiposDocumento)[number];

export const estadosEntidad = ["ACTIVO", "INACTIVO"] as const;
export type EstadoEntidad = (typeof estadosEntidad)[number];

export const rolesUsuario = [
  "VENDEDOR",
  "ADMIN",
  "OPERADOR",
  "USUARIO_DEPENDENCIA",
  "CLIENTE",
] as const;
export type RolUsuario = (typeof rolesUsuario)[number];

export const rolesRegistro = ["VENDEDOR", "OPERADOR"] as const;
export type RolRegistro = (typeof rolesRegistro)[number];

export const estadoUsuario = ["HABILITADO", "DESHABILITADO"] as const;
export type EstadoUsuario = (typeof estadoUsuario)[number];

export const tiposDocumentoEmision = [
  "VALE_DE_COMBUSTIBLE",
  "ORDEN_DE_DESPACHO",
  "NOTA_DE_VENTA",
] as const;
export type TipoDocumentoEmision = (typeof tiposDocumentoEmision)[number];

export const ejecucionContrato = [
  "PRINCIPAL",
  "ADICIONAL",
  "COMPLEMENTARIO",
  "SIN_CONTRATO",
] as const;
export type EjecucionContrato = (typeof ejecucionContrato)[number];

export const tipoContrato = [
  "CONTRATO",
  "ORDEN_DE_COMPRA",
  "ORDEN_DE_DESPACHO",
] as const;
export type TipoContrato = (typeof tipoContrato)[number];

export const estadoContrato = [
  "SIN_INICIO",
  "EN_EJECUCION",
  "CULMINADO",
] as const;
export type EstadoContrato = (typeof estadoContrato)[number];

export const estadoDocumento = ["PENDIENTE", "APROBADO", "RECHAZADO"] as const;
export type EstadoDocumento = (typeof estadoDocumento)[number];

export const tiposIncremento = ["ADICIONAL", "PRINCIPAL"] as const;
export type TipoIncremento = (typeof tiposIncremento)[number];

export const tiposDocumentoAdicional = [
  "ACUERDO",
  "RESOLUCION",
  "MEMORANDUM",
  "CARTA",
  "INFORME",
  "ACTA",
  "OFICIO",
  "ADENDA",
] as const;

export type tiposDocumentoAdicional = (typeof tiposDocumentoAdicional)[number];

export const estadosAdicional = ["VIGENTE", "CULMINADO"] as const;
export type EstadoAdicional = (typeof estadosAdicional)[number];
