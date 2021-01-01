import React from 'react'
import NestedSidebar from '../Sidebars/NestedSidebar'

import '../../styles/components/layouts/nested-sidebar-layout.css'
import { FiInfo, FiMapPin } from 'react-icons/fi'
import { adminRoutes, dashboardRoutes } from '../../routes'

interface NestedSidebarLayoutProps {
   links?: 'admin' | 'user'
}

const NestedSidebarLayout: React.FC<NestedSidebarLayoutProps> = ({ children, links = "user" }) => {
   return (
      <div id="nested-sidebar-layout">
         <NestedSidebar
            nestedLinks={
               links === "admin"
                  ? [
                     { icon: FiMapPin, pathname: adminRoutes.registeredOrphanages },
                     { icon: FiInfo, pathname: adminRoutes.pendingOrphanges }
                  ]
                  : [
                     { icon: FiMapPin, pathname: dashboardRoutes.registeredOrphanages },
                     { icon: FiInfo, pathname: dashboardRoutes.pendingOrphanages }
                  ]
            }
         />

         <div id='nested-sidebar-layout-content-wrapper'>
            {children}
         </div>
      </div>
   )
}

export default NestedSidebarLayout