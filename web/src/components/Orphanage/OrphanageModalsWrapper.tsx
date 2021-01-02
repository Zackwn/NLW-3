import React from 'react'

import '../../styles/components/orphanage/orphanage-modals-wrapper.css'

const OrphanageModalsWrapper: React.FC = ({ children }) => {
   return (
      <div id='orphanage-modals-wrapper'>
         {children}
      </div>
   )
}

export default OrphanageModalsWrapper