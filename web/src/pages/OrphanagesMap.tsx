import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/pages/orphanages-map.css'

import mapMarker from '../assets/map-marker.svg'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'
import { OrphanageInterface } from '../@types/orphanage'
import getInitialLocation from '../utils/getInitialLocation'

const OrphanagesMap: React.FC = () => {
   const [orphanages, setOrphanages] = useState<OrphanageInterface[]>()
   const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

   useEffect(() => {
      getInitialLocation().then(coords => setInitialPosition(coords))
   }, [])

   useEffect(() => {
      async function getOrphanages() {
         const response = await api.get('/orphanages')
         setOrphanages(response.data)
      }

      getOrphanages()
   }, [])

   return (
      <div id="page-map">
         <aside>
            <header>
               <img src={mapMarker} alt='Happy' />

               <h2>Escolha um orfanato no mapa</h2>
               <p>Muitas crianças estão esperando a sua visita {':)'}</p>
            </header>

            <footer>
               <strong>Sua cidade</strong>
               <p>seu estado</p>
            </footer>
         </aside>

         <div className='map'>
            <Map
               center={initialPosition}
               zoom={15}
               style={{ width: '100%', height: '100%' }}

            >
               {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
               <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

               {
                  orphanages?.map(orphanage => (
                     <Marker
                        key={orphanage.id}
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon={mapIcon}
                     >
                        <Popup className='map-popup' closeButton={false} maxWidth={240} minWidth={240} >
                           {orphanage.name}
                           <Link to={`/orphanages/${orphanage.id}`}>
                              <FiArrowRight />
                           </Link>
                        </Popup>
                     </Marker>

                  ))
               }
            </Map>

            <Link to='/orphanages/create' className='create-orphanages'>
               <FiPlus size={32} color='#FFF' />
            </Link>
         </div>
      </div>
   )
}

export default OrphanagesMap