import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../../styles/pages/dashboard/index.css'
import OrphanageModal from '../../components/Dashboard/OrphanageModal'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import api from '../../services/api'
import { OrphanageInterface } from '../../@types/orphanage'

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
      <div id='dashboard-content-container'>
         <div id='dashboard-content-header'>
            <h1 className='dashboard-content-title'>
               Orfanatos Cadastrados
            </h1>
            <span>{orphanages?.length} orfanatos</span>
         </div>

         <div id='orphanages-modal-wrapper'>
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

         </div>

      </div>
   )
}

export default Registered