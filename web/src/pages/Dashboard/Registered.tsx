import React from 'react'

import '../../styles/pages/dashboard/registered.css'
import '../../styles/pages/dashboard/index.css'

const Registered: React.FC = () => {
   return (
      <div id='dashboard-content-container'>
         <div id='dashboard-content-header'>
            <h1 className='dashboard-content-title'>
               Orfanatos Cadastrados
            </h1>
            <span>22 orfanatos</span>
         </div>
      </div>
   )
}

export default Registered