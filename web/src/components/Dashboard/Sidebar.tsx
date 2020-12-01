import React, { useEffect, useState } from 'react'
import { FiPower, FiMapPin, FiInfo } from 'react-icons/fi'

import mapMarkerImg from '../../assets/map-marker.svg'
import { useHistory } from 'react-router-dom'

import '../../styles/components/dashboard/sidebar.css'

const DashboardSidebar: React.FC = () => {
   const { goBack, push, listen } = useHistory()

   const [pathname, setPathname] = useState<string>(window.location.pathname)

   useEffect(() => {
      listen(({ pathname }) => {
         setPathname(pathname)
      })
   }, [listen])

   return (
      <aside id="dashboard-sidebar">
         <img src={mapMarkerImg} alt="Happy" />

         <div id='dashboard-links'>
            <button
               type='button'
               onClick={() => push('/dashboard/registered')}
               className={pathname?.includes('registered') ? 'active' : ''}
            >
               <FiMapPin size={24} color="#FFF" />
            </button>

            <button
               type='button'
               onClick={() => push('/dashboard/pending')}
               className={pathname?.includes('pending') ? 'active' : ''}
            >
               <FiInfo size={24} color="#FFF" />
            </button>
         </div>

         <footer>
            <button type="button" onClick={goBack}>
               <FiPower size={24} color="#FFF" />
            </button>
         </footer>
      </aside>
   )
}

export default DashboardSidebar