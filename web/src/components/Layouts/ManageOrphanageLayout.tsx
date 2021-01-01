import React from 'react';

import '../../styles/components/layouts/manage-orphanage-layout.css'
import Sidebar from '../Sidebars/Sidebar';

const ManageOrphanageLayout: React.FC = ({ children }) => {
   return (
      <div id='manage-orphanage-layout'>
         <Sidebar />

         <main id='manage-orphanage-container'>
            {children}
         </main>
      </div>
   )
}

export default ManageOrphanageLayout