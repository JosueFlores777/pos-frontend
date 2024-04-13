import React, { useState, useEffect, useRef } from 'react'
import {CCol, CRow, CImage } from '@coreui/react'
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/usuario";
import person from "../../../assets/landingPage/BannerLanding.png"
import logo from "../../../assets/landingPage/logo.png"
import { Link } from "react-router-dom";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import { FaArrowUp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';


import CardRecibo from '../../../components/GeneracionRecibo/CardRecibo';


const Login = (props) => {

  const reqSvgs = require.context('../../../assets/landingPage/shapes', false, /.png$/);
  const allSvgFilepaths = reqSvgs.keys();

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
      </main>
      <footer className="footerL">
        <div className="containerL">
          <div className="bottom-footerL">
            <div className="copyright">
              <p className="textL">
                Copyright&copy; 2024 <span>GQ Racing SPORT</span>. Taller y servicios
              </p>
            </div>
            <div className="followme-wrap">
              <div className="followme">
                <h3>Redes Sociales</h3>
                <span className="footerL-line"></span>
                <div className="social-media">
                  <a href="#">
                    <i className="fab fa-facebook-f"><FaFacebook /></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"><FaTwitter /></i>
                  </a>
                  <a href="#">
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
