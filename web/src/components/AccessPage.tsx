import React from 'react'

import '../styles/components/access-page.css'

import BigLogo from '../assets/full-logo.svg'

const AccessPage: React.FC = ({ children }) => {
   return (
      <div id='access-page-container'>
         <div id='presentation'>
            <div id='presentation-content-container'>
               <img src={BigLogo} alt='Happy Logo' />

               <p className='location' id='city'>Rio do Sul</p>
               <p className='location' id='state'>Santa Catarina</p>
            </div>
         </div>
         <div id='form'>
            {children}
         </div>
      </div>
   )
}

export default AccessPage