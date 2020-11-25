import React from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/components/access-page.css'

import BigLogo from '../assets/full-logo.svg'
import { FiArrowLeft } from 'react-icons/fi'

const AccessPage: React.FC = ({ children }) => {
   const { goBack } = useHistory()

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
            <button id='go-back-button' type='button' onClick={goBack}>
               <FiArrowLeft color='#15C3D6' />
            </button>
            {children}
         </div>
      </div>
   )
}

export default AccessPage