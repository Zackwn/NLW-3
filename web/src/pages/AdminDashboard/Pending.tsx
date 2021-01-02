import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { OrphanageInterface, OrphanageParams } from '../../@types/orphanage';
import DashboardContentLayout from '../../components/Layouts/DashboardContentLayout';
import OrphanageModal from '../../components/Orphanage/OrphanageModal';
import OrphanageModalsWrapper from '../../components/Orphanage/OrphanageModalsWrapper';
import { adminRoutes } from '../../routes';
import api from '../../services/api';

const Pending: React.FC = () => {
   const { push: historyPush } = useHistory()

   const [orphanages, setOrphanages] = useState<OrphanageInterface[]>([])

   useEffect(() => {
      async function fetchOrphanages() {
         const { data } = (await api.get('/orphanages?pending=true'))
         setOrphanages(data)
      }

      fetchOrphanages()
   }, [])

   return (
      <DashboardContentLayout
         header={{ title: 'Orfanatos Pendentes', length: orphanages.length }}
      >
         <OrphanageModalsWrapper>
            {orphanages.map(orphanage => {
               return (
                  <OrphanageModal
                     orphanage={orphanage}
                     key={orphanage.id}
                  >
                     <div
                        className='icon-button'
                        onClick={() => {
                           // TODO
                           historyPush(adminRoutes.pendingOrphanageDetail, {
                              orphanage: orphanage
                           } as OrphanageParams)
                        }}
                     >
                        <FiArrowRight color='#15C3D6' size={26} />
                     </div>
                  </OrphanageModal>
               )
            })}
         </OrphanageModalsWrapper>
      </DashboardContentLayout >
   )
}

export default Pending