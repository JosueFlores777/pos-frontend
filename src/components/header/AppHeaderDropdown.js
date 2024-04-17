import React from 'react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CSidebarBrand,
  CAvatar,
  CButton
} from '@coreui/react'
import {
  cilDeaf,
  cilEducation,
  cilElevator,
  cilExitToApp,
  cilPen
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import servicio from "../../Http/httpHelper";
import rutas from "../../views/rutas";
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as actions from "../../redux/actions/usuario";

import { FaUserTie } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import AuthGuard from "../../seguridad";
const AppHeaderDropdown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salir = async (e) => {
    await servicio.apiAuth.post(rutas.cerrarSession, {});
    actions.logout()(dispatch);
    navigate("/")
  }

  const Edita = async (e) => {

    navigate("/usuario/editarstaff/" + usuario.id)
  }
  const usuario = useSelector((state) => state.usuario)
  return (

    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 shadow rounded-pill " caret={false}>

        <FaUserTie className='m-2' color='#333' size={25} />
        <AiFillCaretDown color='#333' className='mt-1' />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 mt-1" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2 mt-2">Sistema de Pagos</CDropdownHeader>
        <CDropdownDivider />
        <AuthGuard permiso="catalogo-ver">
          <CDropdownItem onClick={(e) => Edita(e)} className="btn-logout">
            <CIcon icon={cilPen} className="me-2" />
            Editar
          </CDropdownItem>
        </AuthGuard>
        <CDropdownItem onClick={(e) => salir(e)} className="btn-logout">
          <CIcon icon={cilExitToApp} className="me-2" />
          Salir
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    usuario: state.usuario,
  };
};

export default connect(mapStateToProps)(AppHeaderDropdown);

