import React, { useEffect, useState } from 'react'

import { formatToShortText } from '../../utils/formatToShortText'

import '../../styles/pages/dashboard/index.css'
import OrphanageModal from '../../components/Dashboard/OrphanageModal'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import api from '../../services/api'

interface Orphanage {
   id: number,
   latitude: number,
   longitude: number,
   name: string
}

const Registered: React.FC = () => {
   const [orphanages, setOrphanages] = useState<Orphanage[]>()

   useEffect(() => {
      async function getOrphanages() {
         const { data } = await api.get('/user/orphanages?pending=false')
         setOrphanages(data)
      }

      getOrphanages()
   }, [])

   return (
      <div id='dashboard-content-container'>
         <div id='dashboard-content-header'>
            <h1 className='dashboard-content-title'>
               Orfanatos Cadastrados
            </h1>
            <span>22 orfanatos</span>
         </div>

         <div id='orphanages-modal-wrapper'>
            {orphanages && orphanages.map((orphanage) => {
               return (
                  <OrphanageModal
                     key={orphanage.id}
                     orphanage={{
                        latitude: orphanage.latitude,
                        longitude: orphanage.longitude,
                        name: formatToShortText(orphanage.name)
                     }}
                  >
                     <div className='icon-button'>
                        <FiEdit3 color='#15C3D6' size={26} />
                     </div>
                     <div className='icon-button'>
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