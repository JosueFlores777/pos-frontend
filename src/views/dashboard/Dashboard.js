import React, { useEffect, useState } from 'react'
import AuthGuard from "../../seguridad";
import {
  Link
} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { FaSearch } from 'react-icons/fa';
import moment from "moment";
import { MdOutlinePlace, MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEye, AiOutlineFieldTime, AiOutlineSetting } from "react-icons/ai";
import GridTable from 'src/components/GridTable/index';
import rutas from "../rutas";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CCardTitle,
  CInputGroup,
  CCardText,
  CRow,
  CInputGroupText,
  CFormSelect,
  CFormInput,
  CBadge,
  CSpinner,
  CWidgetStatsB,
  CButton,
  CCardImage
} from '@coreui/react'
import service from "../../Http/httpHelper";
import { useNavigate } from 'react-router-dom';
import { TiWarningOutline } from "react-icons/ti"
import { IoFileTrayFullOutline } from "react-icons/io5"
import { IoMdDoneAll } from "react-icons/io"
import { AiOutlineAlert } from "react-icons/ai"
import { CgDanger } from "react-icons/cg"
import { FaMoneyBillWave } from "react-icons/fa"
import { Loader } from 'src/components';
import escudoH333 from "src/assets/brand/search.png"
import LoaderTable from 'src/components/GridTable/LoaderTable';
import { Reloj } from 'src/components';
import { format, startOfMonth, endOfDay } from "date-fns";
const Dashboard = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [miniLoading, setMiniLoading] = useState(true);
  const [state, setState] = useState(
    {
      numeroRecibo: "",
      estadoReciboSefin: 0,
      estadoReciboSenasa: 0,
      defaltQuery: "",
      totalRecibos: 0,
      fechaInicio: "",
      fechaFin: "",
      recibosSinPagar: 0,
      recibosPagados: 0,
      recibosUtilizados: 0,
      mesSeleccionado: 0,
      anioSeleccionado: 0,
      areaId: 0,
      regionalId: 0,
      porcentajeReciboPorProcesar: 0,
      colorPorcentajeReciboPorProcesar: ""
    }
  );


  const usuario = useSelector((state) => state.usuario)
  const [moneda, setMoneda] = useState([]);
  const [regional, setRegional] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const buscarCatalogoId = (catalogo, id) => {
    let label = "";

    catalogo.forEach(element => {
      if (element.value === id) {

        label = element.label
      }
    });
    return label;
  }

  const consultaCatalogoArea = async (rutaCatalogo) => {
    var dataResponse = await service.apiBackend.get(rutaCatalogo);
    let dataResponseList = dataResponse.lista;
    let data = [{ value: 0, label: "Todas" }];

    dataResponseList.forEach((element) => {
      data.push({ value: element.id, label: element.nombre });
    });

    return data;
  }

  const consultaCatalogoRegional = async (rutaCatalogo) => {

    var dataResponse = await service.apiBackend.get(rutaCatalogo);
    let dataResponseList = dataResponse.lista;
    let data = [];
    usuario.usuarioRegional.forEach((item) => {
      dataResponseList.forEach((element) => {
        if (item.regionalId === element.id) {
          data.push({ value: element.id, label: element.nombre });
        }
      });
    })
    return data;
  }
  useEffect(() => {

    const today = new Date();
    const primerDiaDelMesAnterior = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const ultimoDiaDelMesActual = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    setFechaInicio(format(primerDiaDelMesAnterior, "yyyy-MM-dd"));
    setFechaFin(format(ultimoDiaDelMesActual, "yyyy-MM-dd"));
    setState({
      ...state,
      fechaInicio: format(primerDiaDelMesAnterior, "yyyy-MM-dd"),
      fechaFin: format(ultimoDiaDelMesActual, "yyyy-MM-dd")
    });
  
  }, []);

  const consultaReporte = async (areasCatalogo, regionalCatalogo) => {
    console.log(fechaInicio,fechaFin)

    var fechaInicioQ = fechaInicio;
    var fechaFinQ = fechaFin;




    if (usuario.tipoUsuario === "importador") {

      let request = {
        fechaInicio: fechaInicioQ,
        fechaFin: fechaFinQ,
      }
      var dataResponse = await service.apiBackend.post(rutas.recibo.reporteUsuario, request);
      setState({
        ...state, ...dataResponse,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        defaltQuery: "fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin
      });
     
      setMiniLoading(false);
    } else if (usuario.tipoUsuario === "usuario-interno") {

      var areaId = 0;
      var regionalId = 0;

      areaId = areasCatalogo[0].value;
      regionalId = regionalCatalogo[0].value;
      
      let request = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        areaId: (state.areaId != 0 ? state.areaId : areaId),
        regionalId: (state.regionalId != 0 ? state.regionalId : regionalId),
      }
      console.log(request) ;
      var dataResponse = await service.apiBackend.post(rutas.recibo.reporteUsuario, request);
      var colorRecibos = setColor(dataResponse.porcentajeReciboPorProcesar);
      console.log(dataResponse);
      setState({
        ...state, ...dataResponse,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        colorPorcentajeReciboPorProcesar: colorRecibos,
        defaltQuery: "regionalId=" + (state.regionalId != 0 ? state.regionalId : regionalId) + "&areaId=" + (state.areaId != 0 ? state.areaId : areaId + "&fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin),
        areaId: (state.areaId != 0 ? state.areaId : areaId),
        regionalId: (state.regionalId != 0 ? state.regionalId : regionalId),
      });
      setMiniLoading(false);
    }

    setLoading(false);
  }

  const consultarTipos = async () => {

    let regionales = await consultaCatalogoRegional(rutas.catalogos.regional);
    let areas = await consultaCatalogoArea(rutas.catalogos.areas);
    setRegional(regionales);
    setDepartamentos(areas);

    if (fechaInicio != "" && fechaFin !== "") {
      consultaReporte(areas, regionales);
    }

  }


  const buscarRecibo = async () => {

    let recibo = await service.apiBackend.get(
      rutas.recibo.base + "/" + state.numeroRecibo
    );

    navigate("/recibo/gestionar/" + recibo.id);
  }

  const setColor = (porcentaje) => {
    let color = "";
    if (porcentaje <= 50) {
      color = "danger"
    } else if (porcentaje > 50 && porcentaje <= 75) {
      color = "warning"
    } else if (porcentaje > 75 && porcentaje <= 99) {
      color = "success"
    } else {
      color = "primary"
    }
    return color;
  }



  useEffect(() => {
    setMiniLoading(true);
    consultarTipos();
  }, [fechaInicio, fechaFin, state.areaId, state.regionalId])


  const colDef = [
    { header: "Número Recibo", field: "id" },
    {
      header: "Estado Senasa",
      render(row, props) {
        if (row.estadoSenasaId == 6) {
          return <CBadge className='bg-info-2' shape="rounded-pill" >Creado</CBadge>;
        } else if (row.estadoSenasaId == 7) {
          return <CBadge className='bg-success-2' shape="rounded-pill"  >Pagado</CBadge>;
        } else if (row.estadoSenasaId == 8) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Procesado</CBadge>;
        } else if (row.estadoSenasaId == 9) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Utilizado</CBadge>;
        } else if (row.estadoSenasaId == 10) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Solicitado</CBadge>;
        }
        return <CBadge className='bg-danger-2' shape="rounded-pill"  >Elimiado</CBadge>;
      },
    },
    {
      header: "Estado Sefin",
      render(row, props) {
        if (row.estadoSefinId == 6) {
          return <CBadge className='bg-info-2' shape="rounded-pill" >Creado</CBadge>;
        } else if (row.estadoSefinId == 7) {
          return <CBadge className='bg-success-2' shape="rounded-pill"  >Pagado</CBadge>;
        } else if (row.estadoSefinId == 8) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Procesado</CBadge>;
        } else if (row.estadoSefinId == 9) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Utilizado</CBadge>;
        } else if (row.estadoSefinId == 10) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Solicitado</CBadge>;
        }
        return <CBadge className='bg-danger-2' shape="rounded-pill"  >Elimiado</CBadge>;
      },
    },
    { header: "Identificador", field: "identificacion" },
    { header: "Nombre O Razón Social", field: "nombreRazon" },
    {
      header: "Monto",
      render(row, props) {
        return (
          <div>
            {
              <p> {buscarCatalogoId(moneda, row.detalleRecibos[0].servicio.monedaId)} {((Math.round(row.montoTotal * 100) / 100).toFixed(2))} </p>
            }
          </div>
        );
      },
    },
    {
      header: "Acciones",
      render(row, props) {
        let validacion = false;
        usuario.usuarioArea.forEach(element => {

          if (element.areaId == row.detalleRecibos[0].servicio.areaId) {
            validacion = true;
          }
        });

        return (
          <div>


            <AuthGuard permiso="recibo-ver">
              <Link to={"/recibo/ver/" + row.id} >
                <AiOutlineEye color="#2278E5" size={22} className='me-1 mb-1' />
              </Link>
            </AuthGuard>

          </div>
        );
      },
    },
  ];
  const colDef2 = [
    { header: "Número Recibo", field: "id" },

    { header: "Identificador", field: "identificacion" },
    { header: "Nombre O Razón Social", field: "nombreRazon" },
    {
      header: "Area",
      render(row, props) {
        return (
          <div>
            {
              <p> {buscarCatalogoId(departamentos, row.areaId)}  </p>
            }
          </div>
        );
      },
    },
    {
      header: "Fecha de Limite de Procesamiento",
      render(row) {
        var fechaActual = moment(new Date());
        var fechaFinVigencia = moment(row.finVigencia);
        var fechaAlerta = fechaFinVigencia.subtract(10, 'days');

        if (fechaActual.isSameOrAfter(fechaAlerta, 'day')) {
          return (
            <>
              <CgDanger color='red' className='mb-1 me-1' />
              {moment(row.finVigencia).format("DD-MM-YYYY")}
            </>
          );
        } else {
          return moment(row.finVigencia).format("DD-MM-YYYY");
        }
      }
    },
    {
      header: "Monto",
      render(row, props) {
        return (
          <div>
            {
              <p> {buscarCatalogoId(moneda, row.detalleRecibos[0].servicio.monedaId)} {((Math.round(row.montoTotal * 100) / 100).toFixed(2))} </p>
            }
          </div>
        );
      },
    },
    {
      header: "Acciones",
      render(row, props) {
        let validacion = false;
        usuario.usuarioArea.forEach(element => {

          if (element.areaId == row.detalleRecibos[0].servicio.areaId) {
            validacion = true;
          }
        });

        return (
          <div>
            <AuthGuard permiso="recibo-ver">
              <Link to={"/recibo/ver/" + row.id} >
                <AiOutlineEye color="#2278E5" size={22} className='me-1 mb-1' />
              </Link>
            </AuthGuard>
            {row.estadoSefinId === 7 && row.estadoSenasaId === 6 && validacion && (
              <AuthGuard permiso="recibo-gestionar">
                <Link to={"/recibo/gestionar/" + row.id} >
                  <AiOutlineFieldTime color="#399F68" size={21} className='me-1 mb-1 ' />
                </Link>
              </AuthGuard>
            )}
          </div>
        );
      },
    },
  ];
  if (loading) {
    return (
      <Loader />
    )
  }
  if (usuario.tipoUsuario === "importador") {

    return (
      <>
        <CRow>
          <CCol>
            <p className="fs-2">Hola, {usuario.nombre}.
              <p className="fs-4 fw-light text-muted">Administra las gestiones de tus Recibos TGR-1.</p>
            </p>

          </CCol>
          <CCol>

          </CCol>
        </CRow>
        <CRow>
          <CRow>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className='text-muted'>Fecha Inicio</CFormLabel>
              <CInputGroup className="mb-3 ms-1">
                <CFormInput
                  type='date'
                  value={fechaInicio}
                  onChange={(e) => {
                    setFechaInicio(e.target.value);
                  }}
                />

              </CInputGroup>
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className='text-muted'>Fecha Fin</CFormLabel>
              <CInputGroup className="mb-3 ms-1">
                <CFormInput
                  type='date'
                  value={fechaFin}
                  onChange={(e) => {
                    setFechaFin(e.target.value);
                  }}
                />

              </CInputGroup>
            </CCol>
          </CRow>
          <CCol xs>
            <CCard color="white"
              className="mb-2 shadow p-3  bg-body ">
              <CCardHeader color="white" className="  bg-body ">Resumen Mensual</CCardHeader>
              <CCardBody>

                <CRow>

                  <CCol xs={12} md={6} xl={6}>

                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3">

                          <div className="text-medium-emphasis small">Total De Recibos</div>
                          <div className="fs-5 fw-semibold ">  <IoFileTrayFullOutline className='me-2' color='#3399FF' />
                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.totalRecibos
                            )}
                          </div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Recibos Sin Pagar</div>
                          <div className="fs-5 fw-semibold"> <TiWarningOutline className='me-2' color='orange' />

                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.recibosSinPagar
                            )}
                          </div>
                        </div>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />

                  </CCol>

                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Recibos Pagados Sin Utilizar</div>
                          <div className="fs-5 fw-semibold"><AiOutlineAlert className='me-2' color='red' />
                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.recibosPagados
                            )}
                          </div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Recibos Utilizados</div>
                          <div className="fs-5 fw-semibold"> <IoMdDoneAll className='me-2' color='#2EB85C' />

                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.recibosUtilizados
                            )}
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                    <hr className="mt-0" />
                  </CCol>
                </CRow>

              </CCardBody>
            </CCard>
            <CCard color="white"
              className="mb-2 shadow p-3  bg-body ">
              <CCardHeader color="white" className="  bg-body ">Gestiones Activas</CCardHeader>
              <CCardBody>

                <br />

                <GridTable
                  definicion={colDef}
                  servicio={service.apiBackend}
                  baseRoute={rutas.recibo.reporteUsuarioListado}
                  rootParms={usuario}
                  pageSize={10}
                  defaltQuery={state.defaltQuery}

                ></GridTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  } else {
    return (
      <>
        <CRow>
          <CCol>
            <p className="fs-2">Hola, {usuario.nombre}.
              <p className="fs-4 fw-light text-muted">Administra las gestiones de tus Recibos TGR-1.</p>
            </p>

          </CCol>
          <CCol>

          </CCol>
        </CRow>
        <CRow>
          <CRow>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className='text-muted'>Fecha Inicio</CFormLabel>
              <CInputGroup className="mb-3 ms-1">
                <CFormInput
                  type='date'
                  value={fechaInicio}
                  onChange={(e) => {
                    setFechaInicio(e.target.value);
                  }}
                />

              </CInputGroup>
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className='text-muted'>Fecha Fin</CFormLabel>
              <CInputGroup className="mb-3 ms-1">
                <CFormInput
                  type='date'
                  value={fechaFin}
                  onChange={(e) => {
                    setFechaFin(e.target.value);
                  }}
                />

              </CInputGroup>
            </CCol>
            <CCol sm={3}>
              <CFormLabel htmlFor="basic-url" className='text-muted'>Regional</CFormLabel>
              <CInputGroup className="mb-3 ms-1">
                <CInputGroupText component="label" htmlFor="inputGroupSelect01"><MdOutlinePlace /></CInputGroupText>

                <CFormSelect
                  aria-label="Default select example"
                  options={regional}
                  onChange={(e) => {
                    setState({ ...state, regionalId: e.target.value });
                  }}
                  value={state.regionalId}
                />
              </CInputGroup>
            </CCol>
            <CCol sm={5}>
              <CFormLabel htmlFor="basic-url" className='text-muted'>Area</CFormLabel>
              <CInputGroup className="mb-3 ms-1">
                <CInputGroupText component="label" htmlFor="inputGroupSelect01"><AiOutlineSetting /></CInputGroupText>

                <CFormSelect
                  aria-label="Default select example"
                  options={departamentos}
                  onChange={(e) => {
                    setState({ ...state, areaId: e.target.value });
                  }}
                  value={state.areaId}
                />
              </CInputGroup>
            </CCol>
          </CRow>
          <CCol xs>
            <CRow >
              <CCol >
                <CCard color="white"
                  className=" shadow p-4  bg-body ">
                  <CCardHeader color="white" className="  bg-body ">Resumen Mensual</CCardHeader>
                  <CCardBody>

                    <CRow>
                      <CCol sm={6} className="mb-2">
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-4">
                          <div className="text-medium-emphasis small">Recibos Por Procesar</div>
                          <div className="fs-5 fw-semibold"><AiOutlineAlert className='me-2' color='orange' />
                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.recibosPagados
                            )}
                          </div>
                        </div>

                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3">

                          <div className="text-medium-emphasis small">Total De Recibos</div>
                          <div className="fs-5 fw-semibold ">  <IoFileTrayFullOutline className='me-2' color='#3399FF' />
                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.recibosPagados + state.recibosUtilizados
                            )}
                          </div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Recibos En Termino</div>
                          <div className="fs-5 fw-semibold"> <TiWarningOutline className='me-2' color='red' />

                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              state.recibosPorVencer
                            )}
                          </div>
                        </div>


                      </CCol>



                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">Monto A Facturar</div>
                          <div className="fs-5 fw-semibold"> <FaMoneyBillWave className='me-2' color='green' />

                            {miniLoading && (
                              <CSpinner className='ms-2' size='sm' />
                            )}
                            {!miniLoading && (
                              "$ " + state.montoTotal
                            )}
                          </div>
                        </div>

                      </CCol>
                      <hr className="mt-0" />
                    </CRow>

                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CRow className='mb-3'>
                  <CCol>
                    <CCard color="white" className="shadow" >
                      <CRow className="g-0">

                        <CCol md={8}>
                          <CCardBody>
                            <CCardTitle> <FaSearch className='mb-1' size={"15"} /> Buscar TGR-1</CCardTitle>
                            <CCardText>
                              <CInputGroup className="mb-3 mt-3">


                                <CFormInput
                                  value={state.numeroRecibo}
                                  onChange={e =>
                                    setState({ ...state, numeroRecibo: e.target.value })
                                  }
                                />
                                <CButton color="secondary" variant="outline" onClick={(e) => buscarRecibo(e)} >
                                  <FaSearch className='mb-1' size={"15"} />
                                </CButton>
                              </CInputGroup>
                              <CCardText><small className="text-medium-emphasis">Busquedad Directa</small></CCardText>
                            </CCardText>

                          </CCardBody>
                        </CCol>
                        <CCol md={4}>
                          <CCardImage className='mt-4' src={escudoH333} />
                        </CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                  <CCol className=''>
                    <Reloj className="shadow" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CWidgetStatsB
                      className="mb-1     bg-body shadow"
                      progress={{ color: state.colorPorcentajeReciboPorProcesar, value: state.porcentajeReciboPorProcesar }}
                      text="Es importante procesar todos los recibos"
                      title="Total de Recibos Procesados"
                      value={<><AiOutlineFieldTime className='mb-1' size={"23"} />  {state.porcentajeReciboPorProcesar.toFixed(2) + "%"}</>}
                    />
                  </CCol>
                </CRow>


              </CCol>
            </CRow>

            <CCard color="white"
              className="mb-1 shadow p-3  bg-body ">
              <CCardHeader color="white" className="  bg-body ">Gestiones Activas</CCardHeader>
              <CCardBody>

                <br />
                {miniLoading && (
                  <LoaderTable />
                )}
                {!miniLoading && (
                  <GridTable
                    definicion={colDef2}
                    servicio={service.apiBackend}
                    baseRoute={rutas.recibo.reporteUsuarioListado}
                    rootParms={usuario}
                    pageSize={10}
                    defaltQuery={state.defaltQuery}

                  />
                )}

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }

}

const mapStateToProps = (state, ownProps) => {

  return {
    usuario: state,
  };
};

export default connect(mapStateToProps)(Dashboard);
