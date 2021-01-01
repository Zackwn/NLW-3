import React from 'react';
import { FiCheck, FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { OrphanageParams } from '../../@types/orphanage';
import OrphanageDetailModal from '../../components/Orphanage/OrphanageDetailModal';
import { adminRoutes } from '../../routes';
import api from '../../services/api';

import '../../styles/pages/admin-orphanage/pending-orphanage-detail.css'

const PendingOrphanageDetail: React.FC = () => {
   const { location, push: historyPush } = useHistory<OrphanageParams>()

   async function handleRecuse() {
      console.log('Recuse')
   }

   async function handleAccept(pending: boolean) {
      const endpoint = `/orphanage/${location.state.orphanage?.id}`
      await api.patch(endpoint, {
         pending: false
      })
      historyPush(adminRoutes.pendingOrphanges)
   }

   return (
      <>
         <OrphanageDetailModal
            orphanage={location.state.orphanage!}
         />
         <div id='pending-orphanage-detail-options-wrapper'>
            <button
               className='option-button recuse'
               onClick={() => handleRecuse()}
            >
               <FiXCircle color='#fff' size={24} /> Recusar
            </button>
            <button
               className='option-button accept'
               onClick={() => handleAccept(false)} // accept -> not pending
            >
               <FiCheck color='#fff' size={24} /> Aceitar
            </button>
         </div>
      </>
   )
}

export default PendingOrphanageDetail