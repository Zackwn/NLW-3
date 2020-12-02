import React from 'react'
import DashboardSidebar from './Sidebar'

import '../../styles/components/dashboard/wrapper.css'

const DashboardWrapper: React.FC = ({ children }) => {
   return (
      <div id="dashboard-wrapper">
         <DashboardSidebar />

         <div id='dashboard-content-wrapper'>
            {children}
         </div>
      </div>
   )
}

export default DashboardWrapper