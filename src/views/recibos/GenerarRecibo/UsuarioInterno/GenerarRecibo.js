import React, { useState, useEffect } from 'react'
import { connect, useSelector } from "react-redux";
import { CFormInput, CSpinner, CFormFeedback, CFormCheck, CTooltip, CFormSelect, CContainer, CCol, CRow, CFormLabel, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CCard, CForm } from '@coreui/react'
import PropTypes from 'prop-types';
import { ModalServicio } from 'src/components';
import service from "../../../../Http/httpHelper";
import rutas from "../../../rutas";
import { MdCleaningServices } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FileDownload from "js-file-download";
import { Loader } from 'src/components';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import CardsContainers from "../../../../components/ModalServicio/CardsContainers"
import CardRecibo from 'src/components/GeneracionRecibo/CardRecibo';
const ReciboForm = ({ onSubmit, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [miniLoader, setMiniLoader] = useState(false)
    const usuario = useSelector((state) => state.usuario)

    const colDef = [
        {
            header: "Nombre Servicio",
            render(row) {
                return row.nombreServicio;
            },
        },
        {
            header: "Nombre SubServicio",
            render(row) {
                return row.nombreSubServicio;
            },
        },
        {
            header: "Acciones",
            render(row, props) {

                return (
                    //{row.verificado === true ? "Seleccionar" : "Servicio No Disponible"}
                    <button disabled={!row.activo} onClick={() => { traerServicio(row) }} className='card__apply'>{row.activo === true ? "Seleccionar" : "Servicio No Disponible"}</button>
                );


            }
        },
        {
            header: "Codigo",
            render(row) {
                return row.codigo;
            },
        },
        {
            header: "Descripcion",
            render(row) {
                return row.descripcion;
            },
        },


    ];
    const [servicio, setServicio] = useState({
        id: "",
        nombreServicio: "",
        nombreSubServicio: "",
        monto: "",
        monedaId: "",
        descripcion: "",
        confirmacion: true,

    });
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [validacionRTN, setValidacionRTN] = useState(false)
    const [validacionDNI, setValidacionDNI] = useState(false)
    const [validacionPSPT, setValidacionPSPT] = useState(false)
    const [recibo, setRecibo] = useState({
        identificacion: "",
        nombreRazon: "",
        montoTotal: "",
        regionalId: "",
        servicioId: "",
        tipoIdentificadorId: "",
        categoriaServicio: "",
        cantidad: "",
        cantidadServicio: 1,
    });
    const handleChange = () => {
        setIsConfirmed(current => !current);
    };
    const handleSubmit = async (e) => {

        if (servicio.id !== "" && recibo.identificacion !== "" && recibo.tipoIdentificadorId !== "" && recibo.nombreRazon !== "" && (!validacionDNI && !validacionPSPT && !validacionRTN && isConfirmed)) {
            setMiniLoader(true);
            e.preventDefault();

            let request = {
                identificacion: recibo.identificacion,
                nombreRazon: recibo.nombreRazon,
                montoTotal: parseFloat(montoTotal),
                regionalId: recibo.regionalId,
                monedaId: servicio.monedaId,
                tipoIdentificadorId: parseInt(recibo.tipoIdentificadorId),
                detalleRecibos: serviciosRecibo
            }
            let respuesta = await service.apiBackend.post(rutas.recibo.base, request);
            desCargarpermiso(respuesta.id);
            toast.success("Se ha creado el recibo");
            setMontoTotal(0);
            setCantidad(1);
            setServiciosRecibo([]);
            limpiarCategoria();
            setIsConfirmed(false);
            setServicio({ ...servicio, monto: "", descripcion: "", nombreServicio: "", nombreSubServicio: "", tipoCobroId: "", adicionarMismoServicio: false });
            setRecibo({ ...recibo, categoriaServicio: "", montoManual: "", regionalId: "", cantidadServicio: 1 });
            //setValidated(false);
            setMiniLoader(false);
        }
    }
    const desCargarpermiso = (id) => {
        service
            .getBackenParaArchivos("recibo/pdf/" + id)
            .then(({ data }) => {
                FileDownload(data, "recibo-" + id + ".pdf");
            });
    }
    const validarIdentificador = (value) => {
        let valorModificado = value.replace(/-/g, "");

        if (recibo.tipoIdentificadorId == 5 && valorModificado.length <= 14) {
            //RTN
            if (valorModificado.length != 14 && valorModificado.length <= 13) {
                setValidacionRTN(true);
            } else {
                setValidacionRTN(false);
            }
            setRecibo({ ...recibo, identificacion: valorModificado })
        } else if (recibo.tipoIdentificadorId == 3 && valorModificado.length <= 13) {
            //DNI
            if (valorModificado.length != 13 && valorModificado.length <= 13) {
                setValidacionDNI(true);
            } else {
                setValidacionDNI(false);
            }
            setRecibo({ ...recibo, identificacion: valorModificado })
        } else if (recibo.tipoIdentificadorId == 4 && valorModificado.length <= 20) {
            //PASAPORTE
            if (valorModificado.length <= 4 && valorModificado.length <= 13) {
                setValidacionPSPT(true);
            } else {
                setValidacionPSPT(false);
            }
            setRecibo({ ...recibo, identificacion: valorModificado })
        }


    }

    const limpiarCategoria = () => {
        setServiciosRecibo([]);
        setServicioLaboratorio(false);
        setState({ ...state, medidaInput: 12, areaId: "" })
        setRecibo({ ...recibo, categoriaServicio: "" });
        setMontoTotal(0);
    }
    const cambiarTipoIdentificador = () => {
        setValidacionDNI(false);
        setValidacionPSPT(false);
        setValidacionRTN(false);

    }

    const validate = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        handleSubmit(event);
    }



    const [validated, setValidated] = useState(false);

    const [visibleLg, setVisibleLg] = useState(false)
    const [visible, setVisible] = useState(false)

    const [idServicio, setIdServicio] = useState([]);
    const [servicioLaboratorio, setServicioLaboratorio] = useState(false)
    const [montoTotal, setMontoTotal] = useState(0)
    const [cantidad, setCantidad] = useState(1)
    const [listaCobros, setListaCobros] = useState("")
    const [serviciosRecibo, setServiciosRecibo] = useState([])
    const [identificadorCatalogos, setIdentificadorCatalogos] = useState([])
    const [regionales, setRegionales] = useState([])
    const [categoriaServicio, setCategoriaServicio] = useState([])
    const [tiposUnidades, settiposUnidades] = useState([])
    const [areaServicio, setAreaServicio] = useState([])
    const [eliminarServicioId, setEliminarServicioId] = useState(0)
    const consultaCatalogo = async (rutaCatalogo) => {
        var dataResponse = await service.apiBackend.get(rutaCatalogo);
        let dataResponseList = dataResponse.lista;
        let data = ["",];
        dataResponseList.forEach((element) => {
            data.push({ value: element.id, label: element.nombre });
        });
        return data;
    }
    const consultarTipos = async () => {
        let area = await consultaCatalogo(rutas.catalogos.areas);
        let regionales = await consultaCatalogo(rutas.catalogos.regional);
        let tipoIdentificador = await consultaCatalogo(rutas.catalogos.tipoIdentificacion);
        let categoriaServicio = await consultaCatalogo(rutas.catalogos.categoria);
        let tipoUnidades = await consultaCatalogo(rutas.catalogos.unidadMedida);
        setIdentificadorCatalogos(tipoIdentificador);
        setRegionales(regionales);
        setCategoriaServicio(categoriaServicio);
        settiposUnidades(tipoUnidades);
        setAreaServicio(area);
    }
    const traerServicio = (row, servicioRango) => {

        if (recibo.cantidad === "" && servicioRango) {

            toast.warning("Debes Ingresar Una Cantidad");
        } else {
            let listaCobro = [];
            let rangoCobro = row.monto;
            let listaServicios = serviciosRecibo;
            if (row.tipoCobroId == 60) {
                let unidades = buscarCatalogoId(tiposUnidades, row.tipoCobroUnidadesId);
                setVisible(!visible);

                rangoCobro = definirCobro(row.rangoCobros, recibo.cantidad);
                row.rangoCobros.forEach(element => {

                    listaCobro.push(<p>De <strong>{element.valorMinimo + " " + unidades} </strong> a <strong>{element.valorMaximo === 0 ? "Sin Limite" : element.valorMaximo + " " + unidades} </strong>se cobra <strong>{row.monedaId == 64 ? "L " : "$ "}  {(Math.round((element.monto) * 100) / 100).toFixed(2)}</strong>  {element.porCada !== 0 ? " Por cada  " + element.porCada + " " + unidades : " "}</p>);
                });
                setListaCobros(listaCobro);
            }

            const dataServicio = row ?? {};
            if (servicioLaboratorio) {
                listaServicios.push({
                    cantidadServicio: 1,
                    monto: rangoCobro,
                    codigoServicio: dataServicio.codigo,
                    servicio: dataServicio,
                    servicioId: dataServicio.id,
                    eliminar: (
                        <>
                            <CButton className='btn-black' onClick={() => { eliminarServicio(dataServicio.id) }}>
                                <CIcon color='red' icon={cilTrash} />
                            </CButton>
                        </>
                    ),
                    cantidadInput: (
                        <>
                            <CFormInput
                                type="number"
                                onChange={(e) => cantidadXServicio(e.target.value, dataServicio.id)}
                                value={1}
                            />
                        </>
                    ),
                });
            } else {
                listaServicios = [];
                listaServicios.push({
                    cantidadServicio: 1,
                    monto: rangoCobro,
                    codigoServicio: dataServicio.codigo,
                    servicio: dataServicio,
                    servicioId: dataServicio.id,
                    eliminar: (
                        <>
                            <CButton className='btn-black' onClick={() => { eliminarServicio(dataServicio.id) }}>
                                <CIcon color='red' icon={cilTrash} />
                            </CButton>
                        </>
                    ),
                    cantidadInput: (
                        <>
                            <CFormInput
                                type="number"
                                onChange={(e) => cantidadXServicio(e.target.value, dataServicio.id)}
                                value={1}
                            />
                        </>
                    ),
                });
            }

            if (dataServicio.areaId == 52) {
                setRecibo({ ...recibo, categoriaServicio: 40 });
                setServicioLaboratorio(true);
                setState({ ...state, medidaInput: 11, areaId: 52 })

            }
            setServiciosRecibo(listaServicios);
            construirMontoTotal(listaServicios);
            setMontoTotal(construirMontoTotal(listaServicios))
            setServicio({ ...servicio, ...dataServicio, monto: rangoCobro });
            setRecibo({ ...recibo, categoriaServicio: dataServicio.categoriaId })
            setVisibleLg(false)
        }

    }

    const eliminarServicio = (idServicio) => {
        setEliminarServicioId(idServicio);
    }
    const cantidadXServicio = (cantidad, idServicio) => {
        if (cantidad >= 0) {
            toast.info('Calculando Tarifa!', {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIdServicio(idServicio);
            setCantidad(parseInt(cantidad));
        }

    }
    useEffect(() => {
        if (cantidad >= 0) {
            let ListaServicios = serviciosRecibo;
            let newLista = ListaServicios.map(p =>
                p.servicioId === idServicio ? {
                    ...p,
                    cantidadServicio: cantidad,
                    monto: p.servicio.monto * cantidad,
                    cantidadInput: (
                        <>
                            <CFormInput
                                type="number"
                                className=""
                                onChange={(e) => cantidadXServicio(e.target.value, idServicio)}
                                value={cantidad}
                            />
                        </>
                    ),
                } : p
            );


            setServiciosRecibo(newLista);
            setMontoTotal(construirMontoTotal(newLista));

        }

    }, [cantidad]);
    useEffect(() => {
        let ListaServicios = serviciosRecibo;
        let newLista = ListaServicios.filter((item) => item.servicioId !== eliminarServicioId)
        setServiciosRecibo(newLista);
        setMontoTotal(construirMontoTotal(newLista));
        setEliminarServicioId(0);
    }, [eliminarServicioId]);
    const construirMontoTotal = (listaServicios) => {
        var montoTotal = 0;
        listaServicios.forEach(element => {
            montoTotal += element.monto;
        });

        return montoTotal;
    }
    const buscarCatalogoId = (catalogo, id) => {
        let label = "";
        catalogo.forEach(element => {
            if (element.value === id) {
                label = element.label
            }
        });
        return label;
    }

    const definirCobro = (rangoCobros, cantidad) => {
        //
        let rangoCobro = 0;
        let cantidadRedondeada = Math.round(cantidad);
        rangoCobros.forEach(element => {
            if (element.porCada !== 0 && cantidadRedondeada >= element.valorMinimo && (cantidadRedondeada <= element.valorMaximo || element.valorMaximo === 0)) {
                let sobrante = cantidadRedondeada - element.basePeso;

                let ratio = sobrante / element.porCada;
                let extra = ratio * element.monto;
                let total = element.baseTarifa + extra;
                total = Math.round((total + Number.EPSILON) * 100) / 100;
                rangoCobro = total;

            } else if (cantidadRedondeada >= element.valorMinimo && (cantidadRedondeada <= element.valorMaximo || element.valorMaximo === 0)) {

                rangoCobro = element.monto;
            }
        })

        return rangoCobro;
    }
    const buscarServicio = () => {
        if (recibo.categoriaServicio !== "") {
            setState({
                ...state,
                defaltQuery: "categoriaId=" + recibo.categoriaServicio
            });
            setVisibleLg(!visibleLg)
        } else {
            setState({
                ...state,
                defaltQuery: "categoriaId=0"
            });
            setVisibleLg(!visibleLg)
        }
    }
    const buscar = () => {
        if (state.areaId !== "" || state.tag !== "" || recibo.categoriaServicio !== "" || state.areaId !== "") {
            if (recibo.categoriaServicio == 40) {
                setState({
                    ...state,
                    defaltQuery: "categoriaId=" + (recibo.categoriaServicio === "" ? 0 : recibo.categoriaServicio) + "&areaId=" + (state.areaId === "" ? 0 : state.areaId) + "&tag=" + state.tag
                });
            } else {
                setState({
                    ...state,
                    defaltQuery: "categoriaId=" + (recibo.categoriaServicio === "" ? 0 : recibo.categoriaServicio) + "&areaId=" + (state.areaId === "" ? 0 : state.areaId) + "&tag=" + state.tag + "&codigo=" + (state.codigo === "" ? 0 : state.codigo)
                });
            }
        }

        else {
            setState({
                ...state,
                defaltQuery: "",
                codigo: ""
            });
        }

    }
    const limpiarBusquedad = () => {
        setState({
            ...state,
            defaltQuery: "",
            tag: "",
            areaId: "",
            codigo: "",
        });
        setRecibo({ ...recibo, categoriaServicio: "" })
        if (servicioLaboratorio) {
            setServiciosRecibo([])
            setServicio({ ...servicio, monto: "", descripcion: "", nombreServicio: "", nombreSubServicio: "", tipoCobroId: "", adicionarMismoServicio: false })
            setServicioLaboratorio(false);
        }

    }

    useEffect(() => {

        if (usuario.tipoUsuario == "importador") {
            consultarImportador(usuario.id);
        } else {
            setLoading(false);
        }
        consultarTipos();

    }, [])

    const consultarImportador = async (id) => {
        let importador = await service.apiAuth.get(
            rutas.importador.getPorUsuario + "/" + id
        );
        setRecibo({ ...recibo, identificacion: importador.identificador, tipoIdentificadorId: importador.tipoIdentificadorId, nombreRazon: importador.nombre });
        setLoading(false);
    }
    const [state, setState] = useState(
        {
            areaId: 0,
            tag: "",
            buscadorModal: "",
            defaltQuery: "",
            medidaInput: 12,
            codigo: "",
        }


    )
    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div className="animated fadeIn">
            <CardRecibo/>
        </div >
    )
}

ReciboForm.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
    editView: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {

    return {
        usuario: state,
    };
};

export default connect(mapStateToProps)(ReciboForm);
