import React from 'react';
import { Link } from 'react-router-dom'

import '../styles/pages/landing.css'
import logoImg from '../assets/logo.svg'
import { FiArrowRight } from 'react-icons/fi'

const Landing: React.FC = () => {
   return (
      <div id="page-landing">
         <div className="content-wrapper">
            <div id="landing-header">
               <div id='logo-location-wrapper'>
                  <img src={logoImg} alt="Happy" />

                  <div className="location">
                     <strong>Rio do Sul</strong>
                     <span>Santa Catarina</span>
                  </div>
               </div>

               <Link to='/admin'>
                  <button id='access-restrict-button'>
                     Acesso Restrito
               </button>
               </Link>

            </div>

            <main>
               <h1>Leve felicidade para o mundo</h1>
               <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>

            <Link to='/orphanages' className='enter-app'>
               <FiArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
            </Link>
         </div>
      </div>
   )
}

export default Landing;