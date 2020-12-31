import React from 'react';

import '../../styles/pages/dashboard/index.css'

export interface DashboardContentLayoutProps {
   header: {
      title: string
      length?: number
   }
}

const DashboardContentLayout: React.FC<DashboardContentLayoutProps> = ({ children, header }) => {
   return (
      <div id='dashboard-content-container'>
         <div id='dashboard-content-header'>
            <h1 className='dashboard-content-title'>
               {header.title}
            </h1>
            <span>{header.length || 0} orfanatos</span>
         </div>

         <div id='dashboard-content-wrapper'>
            {children}
         </div>
      </div>
   )
}

export default DashboardContentLayout