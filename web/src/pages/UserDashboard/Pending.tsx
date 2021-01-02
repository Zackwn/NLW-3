import React, { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { OrphanageInterface, OrphanageParams } from '../../@types/orphanage'
import DashboardContentLayout from '../../components/Layouts/DashboardContentLayout'
import OrphanageModal from '../../components/Orphanage/OrphanageModal'
import OrphanageModalsWrapper from '../../components/Orphanage/OrphanageModalsWrapper'
import api from '../../services/api'

const Pending: React.FC = () => {
   const { push: historyPush } = useHistory()

   const [orphanages, setOrphanages] = useState<OrphanageInterface[]>()

   useEffect(() => {
      async function getOrphanages() {
         const { data: orphanages } = await api.get('/user/orphanages?pending=true')
         setOrphanages(orphanages)
      }

      getOrphanages()
   }, [])

   return (
      <DashboardContentLayout
         header={{ title: 'Cadastros Pendentes', length: orphanages?.length }}
      >
         <OrphanageModalsWrapper>
            {orphanages?.map(orphanage => {
               return (
                  <OrphanageModal
                     orphanage={orphanage}
                  >
                     <div
                        className='icon-button'
                        onClick={() =>
                           historyPush('/orphanages/detail/', {
                              orphanage: orphanage
                           } as OrphanageParams)
                        }>
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