import React, { useState, useEffect, useRef } from 'react'
import { CFormInput, CFormFeedback, CSpinner, CFormSelect, CTooltip, CFormCheck, CContainer, CCol, CRow, CFormLabel, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CCard, CForm, CImage } from '@coreui/react'
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/usuario";
import person from "../../../assets/landingPage/BannerLanding.png"
import logo from "../../../assets/landingPage/logo.png"
import { Link } from "react-router-dom";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import { FaArrowUp, FaInstagram, FaFacebook, FaTwitter, FaHtml5 } from 'react-icons/fa';
import { ModalServicio } from 'src/components';
import service from "../../../Http/httpHelper";
import rutas from "../../rutas";
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FileDownload from "js-file-download";
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { MdCleaningServices } from 'react-icons/md';
import CardsContainers from "../../../components/ModalServicio/CardsContainers"
import CardRecibo from '../../../components/GeneracionRecibo/CardRecibo';
import appIcon from "../../../assets/landingPage/app-icon.png";
import codeIcon from "../../../assets/landingPage/code-icon.png";
import desingIcon from "../../../assets/landingPage/design-icon.png";
import PreviewVideo from "../../../components/CardYoutube/PreviewVideo";
import registration from "../../../assets/landingPage/registration.png";

const Login = (props) => {
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

  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [validacionRTN, setValidacionRTN] = useState(false)
  const [miniLoader, setMiniLoader] = useState(false)
  const [validacionDNI, setValidacionDNI] = useState(false)
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
        montoTotal: montoTotal,
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
      setServicio({ ...servicio, monto: "", descripcion: "", nombreServicio: "", nombreSubServicio: "", tipoCobroId: "", adicionarMismoServicio: false });
      setRecibo({ ...recibo, identificacion: "", nombreRazon: "", tipoIdentificadorId: "", categoriaServicio: "", montoManual: "", regionalId: "", cantidadServicio: 1 });
      setValidated(false);
      Unchecked();
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
    setRecibo({ ...recibo, categoriaServicio: "", departamentoServicio: "" });
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
    setValidated(true);

    handleSubmit(event);
  }
  const reqSvgs = require.context('../../../assets/landingPage/shapes', false, /.png$/);
  const allSvgFilepaths = reqSvgs.keys();

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
  const [departamentoServicio, setDepartamentoServicio] = useState([])
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
    let departamento = await consultaCatalogo(rutas.catalogos.departamentoServicio);
    let regionales = await consultaCatalogo(rutas.catalogos.regional);
    let tipoIdentificador = await consultaCatalogo(rutas.catalogos.tipoIdentificacion);
    let categoriaServicio = await consultaCatalogo(rutas.catalogos.categoria);
    let tipoUnidades = await consultaCatalogo(rutas.catalogos.unidadMedida);
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
    if (state.areaId !== "" || state.tag !== "" || recibo.categoriaServicio !== "" || state.areaId !== "" || state.codigo !== "" || recibo.departamentoServicio !== "") {
      if (recibo.categoriaServicio == 40) {
        setState({
          ...state,
          defaltQuery: "categoriaId=" + (recibo.categoriaServicio === "" ? 0 : recibo.categoriaServicio) + "&areaId=" + (state.areaId === "" ? 0 : state.areaId) + "&tag=" + state.tag + "&departamentoId=" + (recibo.departamentoServicio === "" ? 0 : recibo.departamentoServicio)
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
    consultarTipos();
  }, [])


  const [state, setState] = useState(
    {
      areaId: 0,
      tag: "",
      buscadorModal: "",
      defaltQuery: "",
      circle: allSvgFilepaths[0],
      halfCircle: allSvgFilepaths[1],
      letters: allSvgFilepaths[2],
      logo: allSvgFilepaths[3],
      points1: allSvgFilepaths[4],
      points2: allSvgFilepaths[5],
      points3: allSvgFilepaths[6],
      points4: allSvgFilepaths[7],
      square: allSvgFilepaths[8],
      triangle: allSvgFilepaths[9],
      wave: allSvgFilepaths[10],
      waveShape: allSvgFilepaths[11],
      x: allSvgFilepaths[12],
      medidaInput: 12,
      codigo: "",
      confirmacion: false,
    }


  )
  useEffect(() => {

  }, [recibo.categoriaServicio, state.areaId]);
  return (
    <>
      <main>
        <header id="headerL" className="headerL">
          <div className="overlayL overlayL-lg">
            <img src={reqSvgs(state.square)} className="shape square" alt="" />
            <img src={reqSvgs(state.circle)} className="shape circle" alt="" />
            <img src={reqSvgs(state.halfCircle)} className="shape half-circle1" alt="" />
            <img src={reqSvgs(state.halfCircle)} className="shape half-circle2" alt="" />
            <img src={reqSvgs(state.x)} className="shape xshape" alt="" />
            <img src={reqSvgs(state.wave)} className="shape wave wave1" alt="" />
            <img src={reqSvgs(state.wave)} className="shape wave wave2" alt="" />
            <img src={reqSvgs(state.triangle)} className="shape triangle" alt="" />
            <img src={reqSvgs(state.letters)} className="letters" alt="" />
            <img src={reqSvgs(state.points1)} className="points points1" alt="" />
          </div>
          <nav>
            <div className="containerL">
              <div className="logoL">
                <img src={logo} alt="" />
              </div>
              <div className="linksL">
                <ul>
                  <li className='me-4 ms-1'>
                    <LinkScroll to={"support"}>
                      <a className="">Soporte Técnico</a>
                    </LinkScroll>
                  </li>
                  <li className='me-1 ms-1'>

                    <Link to={"/register"} >
                      <a className="">Registrarse</a>
                    </Link>
                  </li>
                  <li className='me-1 ms-1'>
                    <Link to={"/login"} >
                      <a className="">Iniciar Sesión</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="headerL-content">
            <div className="containerL grid-2">
              <div className="columnL-1">
                <h1 className="headerL-title">Nuevo Sistema de Pagos</h1>
                <p className="textL">
                  Te damos la bienvenida al nuevo sistema de pagos, donde podrás tener más control de los recibos creados y
                  también darte una facilidad para buscar tu servicio
                </p>
                <CRow>
                  <CCol>
                    <Link to={"/register"} >
                      <a className="btn-landing">Registrarme</a>
                    </Link>
                  </CCol>
                  <CCol>
                    <Link to={"/login"} >
                      <a className="btn-landing-black">Iniciar Sesión</a>
                    </Link>
                  </CCol>
                </CRow>
                <CRow className='mt-2'>
                  <CCol>
                    <LinkScroll to={"contact"}>
                      <a className="textL mt-2 c-pointer">Proceder sin inicio de sesión/registro</a>
                    </LinkScroll>

                  </CCol>
                </CRow>
              </div>
              <div className="columnL-2 image">
                <img src={reqSvgs(state.points2)} className="points points2" alt="" />
                <CImage src={person} />

              </div>
            </div>
          </div>
        </header>
        <section>
          <CardRecibo />



        </section>
        <section className="servicesL section" id="support">
          <div className="containerL">
            <div className="section-headerL">
              <h3 className="titleL" data-title="Sistema de Pagos">Tutoriales</h3>

            </div>

            <div className="cardsL">
              <div className="card-wrapL">
                <img src={reqSvgs(state.points3)} className="points points1 points-sq" alt="" />
                <div className="cardL" data-card="SENASA">
                  <div className="card-content z-index">
                    <img src={registration} className="iconL" alt="" />
                    <h3 className="titleL-sm">Registro y Generacíon </h3>
                    <h3 className="titleL-sm">De Recibos </h3>
                    <p className="textL-2 mt-4">
                      En el siguiente tutorial se explica como realizar el registro de usuario y la generacion de recibos del nuevo sistema de pagos TGR-1
                    </p>
                    <PreviewVideo videoId='5-t-RvGwn34' />

                  </div>
                </div>
              </div>

              <div className="card-wrapL">
                <div className="cardL" data-card="SENASA">
                  <div className="card-content z-index">
                    <img src={codeIcon} className="iconL" alt="" />
                    <h3 className="titleL-sm">Generar sin Registro</h3>

                    <p className="textL-2 mt-3">
                      En este apartado se explica de manera breve como generar TGR-1 sin iniciar sesion o resgistrarnos en el sistema 
                    </p>
                    <PreviewVideo videoId='eOKwQWXl6G0' />


                  </div>
                </div>
              </div>

              <div className="card-wrapL">
                <img src={reqSvgs(state.points3)} className="points points2 points-sq" alt="" />
                <div className="cardL" data-card="SENASA">
                  <div className="card-content z-index">
                    <img src={appIcon} className="iconL" alt="" />
                    <h3 className="titleL-sm">Soporte Tecnico</h3>
                    <p className="textL-2 mt-3">
                      En caso de que se le presente algun problema tecnico puede avocarse al servicio al cliente 
                    </p>
                    <div className="contactS mt-3">
                    <strong>• Ecruz@senasa.gob.hn</strong><br/>
                    <strong>• Rgonzales@senasa.gob.hn</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footerL">
        <div className="containerL">
          <div className="bottom-footerL">
            <div className="copyright">
              <p className="textL">
                Copyright&copy; 2023 <span>SENASA</span>. Servicio Nacional de Sanidad e Inocuidad Agroalimentaria
              </p>
            </div>
            <div className="followme-wrap">
              <div className="followme">
                <h3>Redes Sociales</h3>
                <span className="footerL-line"></span>
                <div className="social-media">
                  <a href="https://es-la.facebook.com/SagSenasaHn">
                    <i className="fab fa-facebook-f"><FaFacebook /></i>
                  </a>
                  <a href="https://twitter.com/sagsenasahn?lang=es">
                    <i className="fab fa-twitter"><FaTwitter /></i>
                  </a>
                  <a href="https://instagram.com/senasahonduras?igshid=YmMyMTA2M2Y=">
                    <i className="fab fa-instagram"><FaInstagram /></i>
                  </a>
                </div>
              </div>
              <div className="back-btn-landing-wrap">
                <a href="#" className="back-btn-landing">
                  <i className="fas fa-chevron-up"><FaArrowUp /></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
const mapStateToProps = (state, ownProps) => {

  return {
    usuario: state,
  };
};

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
