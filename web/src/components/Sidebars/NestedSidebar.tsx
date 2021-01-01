import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FiPower } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'

import mapMarkerImg from '../../assets/map-marker.svg'
import { useHistory } from 'react-router-dom'

import '../../styles/components/sidebars/nested-sidebar.css'
import AuthContext from '../../context/auth/AuthContext'

export interface NestedLinks {
   pathname: string,
   icon: IconType
}

interface NestedSidebarProps {
   nestedLinks: NestedLinks[]
}

const NestedSidebar: React.FC<NestedSidebarProps> = ({ nestedLinks }) => {
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
      <aside id="nested-sidebar">
         <img src={mapMarkerImg} alt="Happy" />

         <div id='nested-links'>
            {nestedLinks.map((nestedLink) => {
               return (
                  <button
                     key={nestedLink.pathname}
                     type='button'
                     onClick={() => push(nestedLink.pathname)}
                     className={pathname === nestedLink.pathname ? 'active' : ''}
                  >
                     <nestedLink.icon size={24} color="#FFF" />
                  </button>
               )
            })}
         </div>

         <footer>
            <button type="button" onClick={handleLogout}>
               <FiPower size={24} color="#FFF" />
            </button>
         </footer>
      </aside>
   )
}

export default NestedSidebar