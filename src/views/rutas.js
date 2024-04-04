// eslint-disable-next-line import/no-anonymous-default-export
export default {
  roles: "/rol",
  cerrarSession: "usuario/cerrar-session",
  catalogoDepartamentosSenasa: "/catalogo/departamento-senasa",
  rolesSinPaginar: "/rol/sinpaginar",
  Cliente: {
    base: "/cliente",
    getPorUsuario: "/cliente/usuario",
    getPorIdentificador: "/cliente/identificador",
    EditarImportador: "/cliente/actualizar-cliente",
    gestionarAccesos: "/cliente/gestionar-accesos",
    invitar: "/cliente/invitar",
    rechazar: "/cliente/rechazar",
    importadoresCorreoVerificado: "/cliente/lista",
    solucitarAcceso: "/cliente/solicitar-acceso",
    verificarCorreo: "/cliente/verificar-correo"
  },
  catalogos: {
    paises: "/catalogo/pais",
    estados: "/catalogo/estado-recibo",
    depto: "/catalogo/departamento",
    municipio: "/catalogo/municipio",
    tipoIdentificacion: "/catalogo/tipo-identificacion",
    base: "/catalogo",
    consultaPorid: "/catalogo/identificador",
    tiposCatalogo: "/catalogo/tipos",
    padresCatalogo: "/catalogo/padres",
    departamentoSenasa: "/catalogo/departamento-senasa",
    areas: "/catalogo/area-servicio",
    descuento: "/catalogo/descuento",
    categoria: "/catalogo/categoria-servicio",
    tipoServicio: "/catalogo/tipo-servicio",
    moneda: "/catalogo/moneda",
    regional: "/catalogo/regional",
    tipoCobro: "/catalogo/tipo-cobro",
    tipoPersona: "/catalogo/tipo-persona",
    departamentoServicio: "/catalogo/departamento-servicio",
    anios: "/catalogo/anio",
    unidadMedida: "/catalogo/tipo-unidad",
    estadosRecibo: "/catalogo/estado-recibo",
    marcaCarro: "/catalogo/marca-carro",
    modeloCarro: "/catalogo/carro-modelo",
  },

  archivos: {
    base: '/archivo',
    registro: "/archivo/registro"
  },

  recibo: {
    base: "/recibo",
    pdf: "/recibo/pdf",
    reporteUsuario: "/recibo/reporteUsuarioExterno",
    listaRecibosPorMes: "/recibo/listaRecibosPorMes",
    anularRecibo: "/recibo/anular",
    reporteUsuarioListado: "/recibo/gestionesActivas",
    reportePDF: "recibo/pdf/reporte/",
  },

  modulosRoles: {
    base: "/rol/modulos"
  },
  servicio: {
    base: "/servicio",

  },
  usuarios: {
    base: "/usuario",
    EditarContraseña: "/Usuario/cambiar-contrasena",
    SolicitudCodigo: "/Usuario/codigo-temporal",
    Codigo: "/Usuario/codigo",
    EditarSoloContraseña: "/Usuario/editar-contrasena",
    SinPermiso: "/Usuario/GetSinPermiso",
  },

};


