import React from 'react';

import '../../styles/components/orphanage/manage-orphanage-layout.css'
import Sidebar from '../Sidebar';

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