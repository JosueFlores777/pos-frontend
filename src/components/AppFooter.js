import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer" className = "aFooter">
        GQ Racing
        </a>
        <span className="ms-1">&copy; 2024.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Desarrollado con apoyo de</span>
        <a  target="_blank"  className = "aFooter" rel="noopener noreferrer">
          GI
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
