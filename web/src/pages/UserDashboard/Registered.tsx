import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import OrphanageModal from '../../components/Orphanage/OrphanageModal'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import api from '../../services/api'
import { OrphanageInterface } from '../../@types/orphanage'
import DashboardContentLayout from '../../components/Layouts/DashboardContentLayout'
import OrphanageModalsWrapper from '../../components/Orphanage/OrphanageModalsWrapper'

const Registered: React.FC = () => {
   const history = useHistory()

   const [orphanages, setOrphanages] = useState<OrphanageInterface[]>()

   useEffect(() => {
      async function getOrphanages() {
         const { data } = await api.get('/user/orphanages?pending=false')
         setOrphanages(data)
      }

      getOrphanages()
   }, [])

   function handleUpdateOrphanage(orphanage: OrphanageInterface) {
      history.push('/orphanages/update', { orphanage })
   }

   return (
      <DashboardContentLayout
         header={{ title: 'Orfanatos Cadastrados', length: orphanages?.length }}
      >
         <OrphanageModalsWrapper>
            {orphanages && orphanages.map((orphanage) => {
               return (
                  <OrphanageModal
                     key={orphanage.id}
                     orphanage={orphanage}
                  >
                     <div
                        className='icon-button'
                        onClick={() => handleUpdateOrphanage(orphanage)}
                     >
                        <FiEdit3 color='#15C3D6' size={26} />
                     </div>
                     <div
                        className='icon-button'
                        onClick={() => handleUpdateOrphanage(orphanage)}
                     >
                        <FiTrash color='#15C3D6' size={26} />
                     </div>
                  </OrphanageModal>
               )
            })}
         </OrphanageModalsWrapper>
      </DashboardContentLayout>
   )
}

export default Registered