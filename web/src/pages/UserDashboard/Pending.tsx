import React, { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { OrphanageInterface, OrphanageParams } from '../../@types/orphanage'
import OrphanageModal from '../../components/Orphanage/OrphanageModal'
import api from '../../services/api'

import '../../styles/pages/dashboard/index.css'

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
      <div id='dashboard-content-container'>
         <div id='dashboard-content-header'>
            <h1 className='dashboard-content-title'>
               Cadastros pendentes
            </h1>
            <span>{orphanages?.length} orfanatos</span>
         </div>

         <div id='orphanages-modal-wrapper'>
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
         </div>
      </div>
   )
}

export default Pending