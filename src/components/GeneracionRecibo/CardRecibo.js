import React, { useState, useEffect, useRef } from 'react'
import { CFormInput, CFormFeedback, CSpinner, CFormSelect, CTooltip, CFormCheck, CContainer, CCol, CRow, CFormLabel, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CCard, CForm, CImage } from '@coreui/react'
import { connect, useSelector } from "react-redux";
import * as actions from "../../redux/actions/usuario";
import { ModalServicio } from 'src/components';
import service from "../../Http/httpHelper";
import PropTypes from 'prop-types';
import rutas from "../../views/rutas";
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FileDownload from "js-file-download";
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { MdCleaningServices } from 'react-icons/md';
import CardsContainers from "../ModalServicio/CardsContainers"
import { Loader } from 'src/components';
function CardRecibo(props) {
    const usuario = useSelector((state) => state.usuario)
    const [loading, setLoading] = useState(true);
    const ref = useRef([]);

    const checkboxvalue = (e) => {
        if (isConfirmed) {
            Unchecked();
        } else {
            Checked();
        }
    }

    const Unchecked = () => {

        for (let i = 0; i < ref.current.length; i++) {

            ref.current[i].checked = false;
        }
        setIsConfirmed(false);

    }
    const Checked = () => {

        for (let i = 0; i < ref.current.length; i++) {

            ref.current[i].checked = true;
        }
        setIsConfirmed(true);
    }

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
        descuento: false,

    });
    const [isImportador, setIsImportador] = useState(false);
    const [montoFijo, setMontoFijo] = useState(0);
    const [aplicoDescuento, setAplicoDescuento] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [validacionDUI, setvalidacionDUI] = useState(false)
    const [miniLoader, setMiniLoader] = useState(false)
    const [validacionNIT, setvalidacionNIT] = useState(false)
    const [validacionPSPT, setValidacionPSPT] = useState(false)
    const [recibo, setRecibo] = useState({
        identificacion: "",
        departamentoServicio: "",
        nombreRazon: "",
        montoTotal: "",
        regionalId: "",
        servicioId: "",
        tipoIdentificadorId: "",
        categoriaServicio: "",
        cantidad: "",
        cantidadServicio: 1,
        descuentoId: 0
    });
    const aplicarDescuento = (e) => {


        if (aplicoDescuento) {
            setMontoTotal(montoFijo);
            setAplicoDescuento(false);
        } else {
            setMontoFijo(montoTotal);
        }
        let descuentoString = "";
        descuentos.forEach(element => {
            if (element.value == e.target.value) {
                descuentoString = element.label;
            }
        });
        const descuentoDecimal = parseFloat(descuentoString.replace('%', '')) / 100;

        let totalDescuento = (montoTotal * descuentoDecimal);

        if (aplicoDescuento) {

            totalDescuento = (montoFijo * descuentoDecimal);
        }
        setMontoTotal(totalDescuento);

        setRecibo({ ...recibo, descuentoId: e.target.value });
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
        setAplicoDescuento(true);
    }
    const handleSubmit = async (e) => {

        if (servicio.id !== "" && recibo.identificacion !== "" && recibo.regionalId !== "" && recibo.tipoIdentificadorId !== "" && recibo.nombreRazon !== "" && (!validacionNIT && !validacionPSPT && !validacionDUI && isConfirmed)) {
            setMiniLoader(true);
            e.preventDefault();


            if (servicio.descuento) {
                serviciosRecibo.forEach(element => {
                    element.monto = montoTotal;
                });
            }
            if (servicio.tipoCobroId == 58) {
                serviciosRecibo.forEach(element => {
                    element.monto = montoTotal;
                });
            }

            let request = {
                identificacion: recibo.identificacion,
                marcaId: recibo.marcaId,
                modeloId: recibo.modeloId,
                nombreRazon: recibo.nombreRazon,
                montoTotal: montoTotal,
                regionalId: recibo.regionalId,
                monedaId: servicio.monedaId,
                descuentoId: recibo.descuentoId,
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
            setServicio({ ...servicio, monto: "", descripcion: "", nombreServicio: "", nombreSubServicio: "", tipoCobroId: "", adicionarMismoServicio: false, descuento: false });

            setRecibo({ ...recibo, categoriaServicio: "", montoManual: "", regionalId: "", cantidadServicio: 1, descuentoId: 0 });
            if (usuario.tipoUsuario !== "importador") {
                setRecibo({ ...recibo, identificacion: "", nombreRazon: "", tipoIdentificadorId: "" });
            }

            setValidated(false);
            Unchecked();
            setMiniLoader(false);
        }
    }

    const eliminarServicio = (idServicio) => {
        setServicio({ ...servicio, descuento: false })
        setRecibo({ ...recibo, descuentoId: 0 });
        setEliminarServicioId(idServicio);
    }

    const desCargarpermiso = (id) => {
        service
            .getBackenParaArchivos("recibo/pdf/" + id)
            .then(({ data }) => {
                FileDownload(data, "recibo-" + id + ".pdf");
            });

        toast.info('TGR-1: ' + id, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }
    const validarIdentificador = (value) => {
        let valorModificado = value.replace(/-/g, "");

        if (recibo.tipoIdentificadorId == 5 && valorModificado.length <= 14) {
            //NIT
            if (valorModificado.length != 14 && valorModificado.length <= 14) {
                setvalidacionDUI(true);
            } else {
                setvalidacionDUI(false);
            }
            setRecibo({ ...recibo, identificacion: valorModificado })
        } else if (recibo.tipoIdentificadorId == 3 && valorModificado.length <= 9) {
            //DUI
            if (valorModificado.length != 9 && valorModificado.length <= 9) {
                setvalidacionNIT(true);
            } else {
                setvalidacionNIT(false);
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
        setRecibo({ ...recibo, categoriaServicio: "", departamentoServicio: "" });
        setMontoTotal(0);
    }
    const cambiarTipoIdentificador = () => {
        setvalidacionNIT(false);
        setValidacionPSPT(false);
        setvalidacionDUI(false);

    }

    const validate = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true);
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
    const [descuentos, setDescuentos] = useState([])
    const [categoriaServicio, setCategoriaServicio] = useState([])
    const [tiposUnidades, settiposUnidades] = useState([])
    const [areaServicio, setAreaServicio] = useState([])
    const [modelo, setModelo] = useState([])
    const [marca, setMarca] = useState([])
    const [departamentoServicio, setDepartamentoServicio] = useState([])
    const [eliminarServicioId, setEliminarServicioId] = useState(0)
    const consultaCatalogo = async (rutaCatalogo) => {
        var dataResponse = await service.apiBackend.get(rutaCatalogo);
        let dataResponseList = dataResponse.lista;

        let data = ["",];
        if (rutaCatalogo == "/catalogo/descuento") {
            data = [];
        }
        dataResponseList.forEach((element) => {
            data.push({ value: element.id, label: element.nombre });
        });
        return data;
    }
    const estalecerModelos = async (id) => {

        if (id > 0) {
            var modelo = await service.apiBackend.get(rutas.catalogos.modeloCarro + "/id-padre/" + id);

            var modeloLista = modelo.lista;
            let listamodelo = ["",];

            modeloLista.forEach((element) => {
                listamodelo.push({ value: element.id, label: element.nombre });
            });

            setModelo(listamodelo);

        } else {
            setRecibo({ ...recibo, modeloId: 0, mostrarModelo: false, marcaId: 0 });
        }
    }

    const consultarTipos = async () => {
        let area = await consultaCatalogo(rutas.catalogos.areas);
        let descuento = await consultaCatalogo(rutas.catalogos.descuento);
        let departamento = await consultaCatalogo(rutas.catalogos.departamentoServicio);
        let regionales = await consultaCatalogo(rutas.catalogos.regional);
        let tipoIdentificador = await consultaCatalogo(rutas.catalogos.tipoIdentificacion);
        let categoriaServicio = await consultaCatalogo(rutas.catalogos.categoria);
        let tipoUnidades = await consultaCatalogo(rutas.catalogos.unidadMedida);
        let carro = await consultaCatalogo(rutas.catalogos.marcaCarro);
       

        setMarca(carro);
        setDescuentos(descuento);
        setIdentificadorCatalogos(tipoIdentificador);
        setRegionales(regionales);
        setDepartamentoServicio(departamento)
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
                if (recibo.cantidad !== "") {
                    rangoCobro = definirCobro(row.rangoCobros, recibo.cantidad);
                }
                row.rangoCobros.forEach(element => {

                    listaCobro.push(<p>De <strong>{element.valorMinimo + " " + unidades} </strong> a <strong>{element.valorMaximo === 0 ? "Sin Limite" : element.valorMaximo + " " + unidades} </strong>se cobra <strong>{row.monedaId == 64 ? "L " : "$ "}  {(Math.round((element.monto) * 100) / 100).toFixed(2)}</strong>  {element.porCada !== 0 ? " Por cada  " + element.porCada + " " + unidades : " "}</p>);

                    if (element.excedente) {
                        listaCobro.push(<p className="text-muted">Para importaciones arriba de {element.valorMaximo + " " + unidades} se cobrara según corresponda a los rangos anteriores de la tabla</p>);
                    }

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
            var x = construirMontoTotal(listaServicios);
            setMontoTotal(construirMontoTotal(listaServicios))
            setMontoFijo(x);
            setServicio({ ...servicio, ...dataServicio, monto: rangoCobro });
            setRecibo({ ...recibo, categoriaServicio: dataServicio.categoriaId, descuentoId: 0 })
            setVisibleLg(false)
        }

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
        let ciclo = true;
        let rangoCobro = 0;
        let cantidadRedondeada = Math.round(cantidad);
        while (ciclo) {
            rangoCobros.forEach(element => {

                if (element.porCada !== 0 && cantidadRedondeada >= element.valorMinimo && (cantidadRedondeada <= element.valorMaximo || element.valorMaximo === 0)) {
                    let sobrante = cantidadRedondeada - element.basePeso;
                    let ratio = sobrante / element.porCada;
                    let extra = ratio * element.monto;
                    let total = element.baseTarifa + extra;
                    total = Math.round((total + Number.EPSILON) * 100) / 100;
                    rangoCobro = total;
                    ciclo = false;

                } else if (cantidadRedondeada >= element.valorMinimo && (cantidadRedondeada <= element.valorMaximo || element.valorMaximo === 0)) {
                    ciclo = false;
                    rangoCobro += element.monto;
                } else if (cantidadRedondeada >= element.valorMinimo && element.excedente) {
                    cantidadRedondeada = cantidadRedondeada - element.valorMaximo;
                    ciclo = true;
                    rangoCobro += element.monto;
                }

            })
        }


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
        if (state.areaId !== "" || state.tag !== "" || recibo.categoriaServicio !== "" || state.areaId !== "" || state.codigo !== "" || recibo.departamentoServicio !== "") {
            if (recibo.categoriaServicio == 40) {
                setState({
                    ...state,
                    defaltQuery: "categoriaId= 40 &areaId=" + (state.areaId === "" ? 0 : state.areaId) + "&tag=" + state.tag + "&codigo=" + (state.codigo === "" ? "" : state.codigo) + "&departamentoId=" + (recibo.departamentoServicio === "" ? 0 : recibo.departamentoServicio)
                });
            } else {
                setState({
                    ...state,
                    defaltQuery: "categoriaId=" + (recibo.categoriaServicio === "" ? 0 : recibo.categoriaServicio) + "&areaId=" + (state.areaId === "" ? 0 : state.areaId) + "&tag=" + state.tag + "&codigo=" + (state.codigo === "" ? "" : state.codigo) + "&departamentoId=" + (recibo.departamentoServicio === "" ? 0 : recibo.departamentoServicio)
                });
            }
        }

        else {
            setState({
                ...state,
                defaltQuery: "",
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
        setRecibo({ ...recibo, categoriaServicio: "", departamentoServicio: "" })
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
        setIsImportador(true);
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
            confirmacion: false,
        }
    )
    useEffect(() => {

    }, [recibo.categoriaServicio, state.areaId]);
    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div >

            <CForm

                className="needs-validation "
                noValidate
                validated={validated}
            >
                <section className="contactL " id="contact">
                    <div className="containerL">
                        <div className="contactL-box">
                            <div className="contactL-form">
                                <h3 className="fs-3">Generación de Recibo del Servicio</h3>

                                <CRow className="rowL mt-3 mb-3">
                                    <CCol >
                                        <CFormLabel className='textL'>Tipo Identificador</CFormLabel>
                                        <CFormSelect
                                            className="contactL-input"
                                            options={identificadorCatalogos}
                                            value={recibo.tipoIdentificadorId}
                                            disabled={isImportador}
                                            onChange={e => {
                                                setRecibo({ ...recibo, tipoIdentificadorId: e.target.value, identificacion: "" });
                                                cambiarTipoIdentificador();
                                            }}
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa un tipo de identificacion.</CFormFeedback>
                                    </CCol>
                                    <CCol >
                                        <CFormLabel className='textL' >Identificador
                                            {validacionDUI && (
                                                <small className=" ms-2 text-danger">
                                                    {"(NIT debe de tener 14 digitos)"}
                                                </small>
                                            )}
                                            {validacionNIT && (
                                                <small className=" ms-2 text-danger">

                                                    {"(DUI debe de tener 9 digitos)"}
                                                </small>
                                            )}
                                            {validacionPSPT && (
                                                <small className=" ms-2 text-danger">
                                                    {"(El Pasaporte debe de tener entre 4 a 20 digitos)"}
                                                </small>
                                            )}
                                        </CFormLabel>
                                        <CFormInput

                                            className="contactL-input"
                                            onChange={(e) => validarIdentificador(e.target.value)}
                                            value={recibo.identificacion}
                                            disabled={recibo.tipoIdentificadorId === "" || isImportador}
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa una identificacion.</CFormFeedback>

                                    </CCol>

                                </CRow>
                                <CRow className="rowL">
                                    <CCol>
                                        <CFormLabel className='textL' >Nombre o Razon Social</CFormLabel>
                                        <CFormInput
                                            type="textL"
                                            className="contactL-input"
                                            onChange={(e) => setRecibo({ ...recibo, nombreRazon: e.target.value })}
                                            value={recibo.nombreRazon}
                                            required
                                            disabled={isImportador}
                                            invalid={recibo.nombreRazon.length > 0 && recibo.nombreRazon.length < 3}
                                        />
                                        <CFormFeedback invalid>Ingresa un Nombre. <small>{"(Mayor a 3 caracteres)"}</small> </CFormFeedback>
                                    </CCol>
                                    <CCol >
                                        <CFormLabel className='textL' >Lugar de prestación del servicio</CFormLabel>
                                        <CFormSelect
                                            className="contactL-input"
                                            options={regionales}
                                            value={recibo.regionalId}
                                            onChange={e => {
                                                setRecibo({ ...recibo, regionalId: e.target.value });
                                            }}
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa una regional.</CFormFeedback>
                                    </CCol>
                                </CRow>
                                <CRow className="rowL  mt-3 mb-3">
                                    <CCol >
                                        <CFormLabel>Marca Carro</CFormLabel>
                                        <CFormSelect
                                            className="contactL-input"

                                            required
                                            options={marca}
                                            id="marcaId"
                                            value={recibo.marcaId}

                                            onChange={e => {
                                                estalecerModelos(e.target.value);
                                                setRecibo({ ...recibo, marcaId: e.target.value, mostrarModelo: true })

                                            }}
                                        />
                                        <CFormFeedback invalid>Ingresa un Marca.</CFormFeedback>
                                    </CCol >
                                    <CCol>
                                        <CFormLabel>Modelo</CFormLabel>
                                        <CFormSelect
                                            className="contactL-input"
                                            disabled={!recibo.mostrarModelo}
                                            required
                                            options={modelo}
                                            id="modeloId"
                                            value={recibo.modeloId}
                                            onChange={e =>
                                                setRecibo({ ...recibo, modeloId: e.target.value })
                                            }
                                        />
                                        <CFormFeedback invalid>Ingresa un Modelo.</CFormFeedback>
                                    </CCol>

                                </CRow>
                                <CRow className=" mt-3">
                                    <CCol>
                                        <CButton onClick={() => buscarServicio()} className="btn-landing mt-4 mb-3 ">Servicios</CButton>
                                    </CCol>
                                    {servicioLaboratorio && (
                                        <CCol sm={1} xs={4} className='mt-4'>
                                            <CButton
                                                className='mt-3 btn-black'
                                                onClick={() => limpiarCategoria()}
                                            >
                                                <CIcon icon={cilTrash} />
                                            </CButton>
                                        </CCol>
                                    )}

                                </CRow>

                                <CModal backdrop="static" size="xl" visible={visibleLg} onClose={() => setVisibleLg(false)}>
                                    <CModalHeader>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CRow className='ms-3'>
                                            {
                                                <>
                                                    <CCol>
                                                        <CFormLabel>Servicio</CFormLabel>
                                                        <CInputGroup className="mb-1 search-table ">
                                                            <CFormInput
                                                                placeholder='Buscar'
                                                                className="contactL-input"
                                                                value={state.tag}
                                                                onChange={e =>
                                                                    setState({ ...state, tag: e.target.value })
                                                                }
                                                                aria-describedby="basic-addon1"
                                                            />
                                                        </CInputGroup>
                                                    </CCol>
                                                    <CCol>
                                                        <CFormLabel>Área</CFormLabel>
                                                        <CInputGroup className="mb-1 search-table ">
                                                            <CFormSelect
                                                                disabled={servicioLaboratorio}
                                                                className="contactL-input"
                                                                options={areaServicio}
                                                                id="idArea"
                                                                value={state.areaId}
                                                                onChange={e =>
                                                                    setState({ ...state, areaId: e.target.value })
                                                                }
                                                            />
                                                        </CInputGroup>
                                                    </CCol>
                                                    <CCol md={2} >
                                                        <CFormLabel>Código De Servicio</CFormLabel>
                                                        <CInputGroup className="mb-1 search-table ">
                                                            <CFormInput
                                                                type='number'
                                                                placeholder='000'
                                                                className="contactL-input"
                                                                value={state.codigo}
                                                                onChange={e =>
                                                                    setState({ ...state, codigo: e.target.value })
                                                                }
                                                                aria-describedby="basic-addon1"
                                                            />
                                                        </CInputGroup>
                                                    </CCol>


                                                </>


                                            }
                                        </CRow>
                                        <CRow className='ms-3 mt-1'>


                                            <CCol md={1} className="mt-3 me-2" >
                                                <CButton color="primary" className='rounded-pill mt-3 btn-black' onClick={() => buscar()}> <FaSearch className='me-2 ms-auto mb-1 mt-1' /> Buscar</CButton>
                                            </CCol>
                                            {servicioLaboratorio && (
                                                <CCol md={1} className="mt-3 ms-4" >
                                                    <CTooltip
                                                        content="Se te borra el servicio actualmente seleccionado."
                                                        placement="top"
                                                    >
                                                        <CButton color="primary" className='rounded-pill mt-3 btn-black' onClick={() => limpiarBusquedad()}> <MdCleaningServices className='me-2 ms-auto mb-1 mt-1' /> Limpiar</CButton>

                                                    </CTooltip>
                                                </CCol>
                                            )}
                                            {!servicioLaboratorio && (
                                                <CCol md={1} className="mt-3 ms-4" >
                                                    <CButton color="primary" className='rounded-pill mt-3 btn-black' onClick={() => limpiarBusquedad()}> <MdCleaningServices className='me-2 ms-auto mb-1 mt-1' /> Limpiar</CButton>
                                                </CCol>
                                            )}
                                        </CRow>
                                        <ModalServicio
                                            definicion={colDef}
                                            servicio={service.apiBackend}
                                            baseRoute={rutas.servicio.base}
                                            rootParms={props}
                                            pageSize={3}
                                            defaltQuery={state.defaltQuery}
                                        ></ModalServicio>
                                    </CModalBody>
                                </CModal>


                                <CardsContainers ListaServicios={serviciosRecibo} />



                                <CContainer>
                                    {servicio.descuento && (
                                        <>
                                            <CRow className="mb-3">
                                                <CCol className="ms-auto me-auto">
                                                    <p>Cobro Reducido</p>
                                                    <CFormSelect
                                                        className="contactL-input"
                                                        options={descuentos}
                                                        value={recibo.descuentoId}
                                                        onChange={e => {
                                                            aplicarDescuento(e); // Llama a la función aplicarDescuento sin actualizar el estado
                                                        }}
                                                        style={{ width: '200px' }} // Estilo directamente dentro de la etiqueta
                                                    />
                                                </CCol>
                                            </CRow>
                                        </>
                                    )}

                                    <CRow className="titleL-sm mb-3">
                                        <CCol className="ms-auto me-auto " >
                                            <p >
                                                Total a Pagar:
                                            </p>
                                        </CCol>
                                        {servicio.tipoCobroId === 58 && (
                                            <CCol xs="auto" className="ms-auto me-auto">
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Cantidad a pagar"
                                                    value={montoTotal}
                                                    onChange={e => {
                                                        let inputValue = e.target.value;
                                                        // Reemplaza comas por puntos
                                                        // Reemplaza cualquier caracter que no sea número, punto o coma
                                                        inputValue = inputValue.replace(/[^\d.,]/g, '');

                                                        // Valida que el valor sea un número válido
                                                        if (!isNaN(inputValue)) {
                                                            setMontoTotal(inputValue);
                                                        }
                                                    }}
                                                />

                                            </CCol>
                                        )}
                                        {servicio.tipoCobroId !== 58 && (
                                            <CCol xs="auto" className="ms-auto me-auto " >
                                                {servicio.monto !== "" && !servicio.adicionarMismoServicio && (<small className="titleL-sm fw-normal me-auto"> {servicio.monedaId == 64 ? "L " : "$ "} {new Intl.NumberFormat().format((Math.round((montoTotal) * 100) / 100).toFixed(2))}  </small>)}
                                                {servicio.monto !== "" && servicio.adicionarMismoServicio && (<small className="titleL-sm fw-normal  me-auto "> {servicio.monedaId == 64 ? "L " : "$ "} {new Intl.NumberFormat().format((Math.round((montoTotal * recibo.cantidadServicio) * 100) / 100).toFixed(2))}  </small>)}
                                            </CCol>
                                        )}

                                    </CRow>
                                    <CRow>
                                        <CCol xs={12}>
                                            <CFormCheck
                                                type="checkbox"
                                                id="invalidCheck"
                                                ref={(element) => { ref.current[0] = element }}
                                                label="Confirmo que he revisado toda la información ingresada y que los detalles del recibo que corresponden al servicio que se ha solicitado."
                                                required
                                                value={isConfirmed}
                                                onChange={checkboxvalue}
                                            />
                                            <CFormFeedback invalid>Debes de confirmar este campo.</CFormFeedback>
                                        </CCol>
                                    </CRow>
                                </CContainer>
                                <CButton onClick={(e) => validate(e)} className="btn-blue btn-landing mt-3 mb-3">
                                    {miniLoader && (
                                        <>
                                            <CSpinner className='me-2' size='sm' color="light" /> Generando...
                                        </>

                                    )}
                                    {!miniLoader && (
                                        <>
                                            Generar
                                        </>

                                    )}
                                </CButton>
                            </div>
                        </div>
                    </div>
                </section>
            </CForm>
            <CModal size="lg" visible={visible} backdrop="static" >
                <CModalBody>
                    <CRow>
                        <CCol>
                            <p className="fw-bolder">{servicio.nombreServicio}</p>
                            <p className="fw-light ">{servicio.nombreSubServicio}</p>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {servicio.nombreServicio !== "" && (
                                listaCobros
                            )}
                            <CFormLabel className='textL' >Cantidad</CFormLabel>
                            <CFormInput
                                type="number"
                                className="contactL-input"
                                required
                                onChange={(e) => setRecibo({ ...recibo, cantidad: e.target.value })}
                                value={recibo.cantidadForm}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton className='btn-black' onClick={() => {
                        setVisible(false)
                        setServiciosRecibo([])
                        setServicio({ ...servicio, monto: "", descripcion: "", nombreServicio: "", nombreSubServicio: "", tipoCobroId: "", adicionarMismoServicio: false })
                    }}>
                        Cerrar
                    </CButton>
                    <CButton className='btn-blue' onClick={() => traerServicio(servicio, true)}>Aceptar</CButton>
                </CModalFooter>
            </CModal>


        </div>

    );
}
CardRecibo.propTypes = {
    servicio: PropTypes.string,
    subServicio: PropTypes.string,

};

const mapStateToProps = (state, ownProps) => {

    return {
        usuario: state,
    };
};

const mapDispatchToProps = {
    ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardRecibo);
