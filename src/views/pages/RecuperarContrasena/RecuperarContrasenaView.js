import React, { useRef, useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CButton,
  CFormFeedback,
  CContainer,
  CCardGroup,
  CSpinner,
} from '@coreui/react'
import * as FontAwesome from 'react-icons/fa';
import PropTypes from 'prop-types';
import logoUsaid from "../../../assets/brand/logoUsaid.png";
import logoH from "../../../assets/brand/escudoH333.png";
import {
  Link
} from "react-router-dom";
import service from "../../../Http/httpHelper";
import rutas from "../../rutas";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginFondo from "../../../assets/brand/forgotPass.png";
const RecuperarContrasena = ({ onSubmit, ...props }) => {
  const [miniLoading, setMiniLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate();
  const reqSvgs = require.context('../../../assets/landingPage/shapes', false, /.png$/);
  const allSvgFilepaths = reqSvgs.keys();
  const [state, setState] = useState(
    {
      correo: "",
      codigoTemporal: "",
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
    }

  )

  const [solicitud, setsolicitud] = useState(false);

  const enviarcorreo = async (data) => {
    if (data.correo !== "") {
      try {
        let request = {
          identificadorAcceso: state.correo,
        }

        await service.apiAuth.post(rutas.usuarios.SolicitudCodigo, request);
        toast.success("Se ha Enviado El codigo a su Correo");
        setMiniLoading(false);
        setsolicitud(true);
      }
      catch {
        setMiniLoading(false);
      }
    }

  }
  const enviarCodigo = async (data) => {
    try {
      setMiniLoading(true);
      if (data.codigoTemporal !== "") {
        let request = {
          codigoTemporal: state.codigoTemporal,
          correo: state.correo,
        }
        var usuario = await service.apiAuth.post(rutas.usuarios.Codigo, request);

        if (usuario?.id) {
          navigate('/cambiarPassword/' + usuario.id);
        }
        if (usuario == "") {
          toast.error("Codigo Incorrecto");
        }
        setMiniLoading(false);
      }

    } catch {
      setMiniLoading(false);
    }


  }
  const validate = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setMiniLoading(true);
    setValidated(true)
    enviarcorreo(state);
  }
  return (
    <div className=" home_recoverPass headerL">

      <CContainer className='main'>

        <CRow className="justify-content-left">
          <CCol md={8} className="mt-5">
            <CCol className="mt-5" md={10}>
              <img className="img-fluid mt-5 fondo-Login" src={loginFondo} alt="Fondo Login"></img>
            </CCol>

          </CCol>
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4 borderNone">
                <CCardBody>
                  <CForm

                    className="row needs-validation "
                    noValidate
                    validated={validated}
                  >
                    <img className="img-fluid" src={logoH} alt="Logo Login"></img>
                    <h1 className="text-center" >GQ Racing</h1>
                    <p className="text-medium-emphasis text-center">Recupera tu contraseña a través de tu correo / identificador asociado</p>

                    {!solicitud && (
                      <>
                        <CFormInput
                          className='inputLogin contactL-input mb-1'
                          placeholder="Correo / Identificador"
                          type="text"

                          value={state.correo}
                          aria-describedby="username"
                          autoComplete="off"
                          onChange={e => {

                            setState({ ...state, correo: e.target.value })
                          }}

                          required
                        />
                        <CFormFeedback invalid>Ingresa un Correo / Identificador.</CFormFeedback>
                      </>
                    )}

                    {solicitud && (
                      <>
                        <CFormInput
                          className='inputLogin contactL-input mt-3 mb-3'
                          placeholder="Código"
                          type="text"
                          id="codigo"
                          aria-describedby="username"
                          onChange={(e) => {

                            setState({ ...state, codigoTemporal: e.target.value })
                          }
                          }
                          required
                        />
                      </>
                    )}


                    <CRow>
                      <CCol className="d-grid gap-2 col-6 mx-auto mt-3 ">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                          <Link to={"/login"}>
                            <CButton color="secondary" className="px-4 me-md-2 btn-black" >
                              Cancelar
                            </CButton>
                          </Link>
                          {!solicitud && (
                            <CButton color="primary" className="px-4 me-md-2 btn-blue" onClick={(e) => validate(e)}>
                              Código
                              {miniLoading && (
                                <CSpinner size='sm' className='ms-2' />
                              )}
                            </CButton>
                          )}
                          {solicitud && (
                            <CButton color="primary" className="px-4 me-md-2 btn-blue" onClick={() => enviarCodigo(state.codigoTemporal)} >
                              Ingresar
                              {miniLoading && (
                                <CSpinner size='sm' className='ms-2' />
                              )}
                            </CButton>
                          )}

                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img alt='Logo Usaid' src={logoUsaid} className="img-fluid d-block  mx-auto mb-4 position-absolute bottom-0 start-50 translate-middle-x" style={{ width: 170 + "px" }}></img>
        </div>
      </CContainer>
    </div>
  );
}


RecuperarContrasena.propTypes = {
  overridenData: PropTypes.object,
  accion: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default RecuperarContrasena;