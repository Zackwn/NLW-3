import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FiPower, FiMapPin, FiInfo } from 'react-icons/fi'

import mapMarkerImg from '../../assets/map-marker.svg'
import { useHistory } from 'react-router-dom'

import { dashboardRoutes } from '../../routes'

import '../../styles/components/dashboard/sidebar.css'
import AuthContext from '../../context/auth/AuthContext'

const DashboardSidebar: React.FC = () => {
   const { push, listen } = useHistory()
   const { handleLogout } = useContext(AuthContext)

   const formatPathname = useCallback((pathname: string): string => {
      if (pathname.split('')[pathname.length - 1] !== '/') {
         pathname += '/'
      }

      return pathname
   }, [])

   const [pathname, setPathname] = useState<string>(formatPathname(window.location.pathname))

   useEffect(() => {
      const cleanUp = listen(({ pathname }) => {
         setPathname(formatPathname(pathname))
      })

      return cleanUp
   }, [formatPathname, listen])

   return (
      <aside id="dashboard-sidebar">
         <img src={mapMarkerImg} alt="Happy" />

         <div id='dashboard-links'>
            <button
               type='button'
               onClick={() => push(dashboardRoutes.registeredOrphanages)}
               className={pathname === dashboardRoutes.registeredOrphanages ? 'active' : ''}
            >
               <FiMapPin size={24} color="#FFF" />
            </button>

            <button
               type='button'
               onClick={() => push(dashboardRoutes.pendingOrphanages)}
               className={pathname === dashboardRoutes.pendingOrphanages ? 'active' : ''}
            >
               <FiInfo size={24} color="#FFF" />
            </button>
         </div>

         <footer>
            <button type="button" onClick={handleLogout}>
               <FiPower size={24} color="#FFF" />
            </button>
         </footer>
      </aside>
   )
}

export default DashboardSidebar