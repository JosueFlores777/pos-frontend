import React, { useEffect, useState } from 'react'
import AuthGuard from "../../seguridad";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import GridTable from 'src/components/GridTable/index';
import rutas from "../rutas";
import service from "../../Http/httpHelper";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol, CFormInput, CFormLabel,
    CInputGroup,
    CRow,
    CButtonGroup,
    CBadge,
    CButton,
    CFormText
} from '@coreui/react'

import { useNavigate } from 'react-router-dom';
import { BsDownload } from "react-icons/bs"
import { RiDeleteBinLine } from "react-icons/ri"
import FileDownload from "js-file-download";
import { Loader } from 'src/components';
import LoaderTable from 'src/components/GridTable/LoaderTable';
import ExportExcel from "src/components/ExcelExport/excelExport"
import { toast } from 'react-toastify';
import { format, startOfMonth, endOfDay } from "date-fns";

const Reporteria = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [miniLoading, setMiniLoading] = useState(true);
    const [anular, setAnular] = useState(false);
    const [excelLoading, setExcelLoading] = useState(false);
    const [state, setState] = useState(
        {
            nombreArchivo: "",
            numeroRecibo: "",
            estadoReciboSefin: 0,
            estadoReciboSenasa: 0,
            defaltQuery: "",
            totalRecibos: 0,
            recibosSinPagar: 0,
            recibosPagados: 0,
            recibosUtilizados: 0,
            porcentajeReciboPorProcesar: 0,
            colorPorcentajeReciboPorProcesar: ""
        }
    );

    const [catalogoAnios, setCatalogoAnios] = useState([])
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [nombreRazon, setNombreRazon] = useState("");
    
   
    const usuario = useSelector((state) => state.usuario)
    const [moneda, setMoneda] = useState([]);
    const buscarCatalogoId = (catalogo, id) => {
        let label = "";

        catalogo.forEach(element => {
            if (element.value === id) {

                label = element.label
            }
        });
        return label;
    }
    const buscarRubroId = (detallesRecibo) => {
        let id = detallesRecibo[0].servicio.rubro
        let label = "";

        if (id == 12199) {
            label = "12199 - Tasas Varias";
        }
        else if (id == 12121) {
            label = "12121 - Emisión, Constancias, Certificaciones y Otros";
        }
        else if (id == 12499) {
            label = "12499 - Multas y Penas Diversas";
        }
        else if (id == 12806) {
            label = "12806 - Devoluciones de Ejercicios Fisc. Anteriores";
        }
        else if (id == 15104) {
            label = "15104 - Venta de Artículos y Mat. Diversos";
        }
        return label;
    }
    const consultaCatalogo = async (rutaCatalogo) => {
        var dataResponse = await service.apiBackend.get(rutaCatalogo);
        let dataResponseList = dataResponse.lista;
        let data = [];
        dataResponseList.forEach((element) => {
            data.push({ value: element.id, label: element.nombre });
        });
        return data;
    }

    
   
    const consultaReporte = async (fechaInicio_, fechaFin_) => {
        const today = new Date();

        const primerDiaDelMes = startOfMonth(today);
        const ultimoDiaDelDia = endOfDay(today);
        var fechaInicioX = format(primerDiaDelMes, "yyyy-MM-dd")
        var fechaFinX = format(ultimoDiaDelDia, "yyyy-MM-dd")
        var nombreSearch = nombreRazon;
        var fechaInicioQ = (fechaInicio === "" && fechaInicio_ === "") ? fechaInicioX : (fechaInicio === "" ? fechaInicio_ : fechaInicio);
        var fechaFinQ = (fechaFin === "" && fechaFin_ === "") ? fechaFinX : (fechaFin === "" ? fechaFin_ : fechaFin);



        setState({
            ...state,
            nombreArchivo: "Reporte_" + fechaInicioQ,
            defaltQuery: "reporte=" + true + "&fechaInicio=" + fechaInicioQ + "&fechaFin=" + fechaFinQ +"&nombreRazon="+ nombreSearch ,
        });
        setAnular(false);
        setMiniLoading(false);
        setLoading(false);
    }
    const consultarTipos2 = async () => {


        let anios = await consultaCatalogo(rutas.catalogos.anios);
        var monedas = await service.apiBackend.get(rutas.catalogos.moneda);
        var monedaLista = monedas.lista;
        let listaM = ["",];
        monedaLista.forEach((element) => {
            listaM.push({ value: element.id, label: element.abreviatura });
        });
        setMoneda(listaM);
        setCatalogoAnios(anios);

    }
    const consultarTipos = async () => {
        var fecha_inicio = fechaInicio;
        var fecha_fin = fechaFin;
        consultaReporte(fecha_inicio, fecha_fin);

    }
    const anularRecibo = async (id) => {

        await service.apiBackend.put(rutas.recibo.anularRecibo + "/" + id);
        toast.warning("Recibo " + id + " Anulado")
        setAnular(true);
    }
    const exportToPDF = async (e) => {
       
        desCargarpermiso(fechaInicio, fechaFin);
    }
    const desCargarpermiso = (fechaInicio, fechaFin) => {

        service
            .getBackenParaArchivos(rutas.recibo.reportePDF + fechaInicio + "/" + fechaFin +"/"+nombreRazon)
            .then(({ data }) => {
                FileDownload(data, state.nombreArchivo + ".pdf");
            });
    }

    useEffect(() => {
        consultarTipos();
    }, [fechaInicio, fechaFin, anular])

    useEffect(() => {
        consultaReporte(fechaInicio,fechaFin);
    }, [nombreRazon,state.defaltQuery])

    useEffect(() => {

        const today = new Date();
        const primerDiaDelMes = startOfMonth(today);
        const ultimoDiaDelDia = endOfDay(today);
        setFechaInicio(format(primerDiaDelMes, "yyyy-MM-dd"));
        setFechaFin(format(ultimoDiaDelDia, "yyyy-MM-dd"));
        consultarTipos2();

    }, [])

    const colDef2 = [
        { header: "Número Recibo", field: "id" },
        { header: "Nombre O Razón Social", field: "nombreRazon" },
        {
            header: "Rubro",
            render(row, props) {
                return (
                    <div>
                        {

                            <p> {buscarRubroId(row.detalleRecibos)}  </p>
                        }
                    </div>
                );
            },
        },
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
                return <CBadge className='bg-danger-2' shape="rounded-pill"  >Anulado</CBadge>;
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
                return <CBadge className='bg-danger-2' shape="rounded-pill"  >Anulado</CBadge>;
            },
        },
        {
            header: "Monto",
            render(row, props) {
                return (
                    <div>
                        {
                            <p> {buscarCatalogoId(moneda, row.detalleRecibos[0].servicio.monedaId)}{"L. "} {((Math.round(row.montoTotal * 100) / 100).toFixed(2))} </p>
                        }
                    </div>
                );
            },
        },
        {
            header: "Fecha Pagado",
            render(row) {
                return (
                    <>
                        {moment(row.fechaPago).format("DD-MM-YYYY")}
                    </>

                );
            }
        },
        {
            header: "Fecha Utilizado",
            render(row) {
                return (
                    <>
                        {moment(row.fechaUtilizado).format("DD-MM-YYYY")}
                    </>

                );
            }
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
                        {row.estadoSefinId === 8 && row.estadoSenasaId !== 11 && (
                            <AuthGuard permiso="generar-reporte">
                                <CButton variant="ghost" onClick={(e) => anularRecibo(row.id)} >
                                    <RiDeleteBinLine color='red' />
                                </CButton>
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

    return (
        <>
            <CRow>
                <CRow>
                    <CCol xl={12}>
                        <CCard className='border-0'>
                            <CCardBody>
                                <CCol md={14}>
                                    <CCard className={`mb-5 border-secondary border-0  text-black shadow-lg mb-3`}>
                                        <div className="position-relative ">
                                            <div className="position-absolute top-0 start-0">
                                                <CFormText className='fs-2 fw-bold text-body'>Reportería</CFormText>
                                            </div>

                                        </div>
                                    </CCard>
                                </CCol>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow className='ms-1'>
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
                    <CCol sm={4}>
                        <CFormLabel htmlFor="basic-url" className='text-muted'>Nombre o Razon Social</CFormLabel>
                        <CInputGroup className="mb-3 ms-1">
                            <CFormInput
                                type='text'
                                value={nombreRazon}
                                onChange={(e) => {
                                    setNombreRazon(e.target.value);
                                }}
                            />

                        </CInputGroup>
                    </CCol>
                    <CCol className='mt-4'>
                        <AuthGuard permiso="generar-reporte">
                            <CButtonGroup role="group" aria-label="Default button group ">
                                <CButton color="dark" variant="outline" onClick={(e) => exportToPDF()} >Exportar a PDF
                                    <BsDownload className='ms-1' />
                                </CButton>
                                <ExportExcel fechaInicio={fechaInicio} fechaFin={fechaFin} fileName={state.nombreArchivo} nombreRazon ={nombreRazon} />
                            </CButtonGroup>
                        </AuthGuard>
                    </CCol>


                </CRow>
                <CCol xs>


                    <CCard color="white"
                        className="mb-1 shadow p-3  bg-body ">
                        <CCardHeader color="white" className="  bg-body ">Recibos Procesados</CCardHeader>
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
                                    pageSize={15}
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

const mapStateToProps = (state, ownProps) => {

    return {
        usuario: state,
    };
};

export default connect(mapStateToProps)(Reporteria);
