import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { OrphanageInterface } from '../../@types/orphanage'
import mapIcon from '../../utils/mapIcon'
import { Map, Marker, TileLayer } from 'react-leaflet'

import '../../styles/components/orphanage/orphanage-detail-modal.css'

interface OrphanageDetailModalProps {
   orphanage: OrphanageInterface,
   extraPaddingBottom?: boolean
}

const OrphanageDetailModal: React.FC<OrphanageDetailModalProps> = ({
   orphanage,
   extraPaddingBottom = false
}) => {
   const [activeImageIndex, setActiveImageIndex] = useState(0)

   return (
      <div className="orphanage-details">
         {
            orphanage.images[activeImageIndex]?.url
            &&
            <img src={orphanage.images[activeImageIndex].url} alt="Orphanage" />
         }

         <div className="images">
            {
               orphanage.images.map((image, index) => (
                  <button
                     key={image.id}
                     className={activeImageIndex === index ? 'active' : ''}
                     type="button"
                     onClick={() => {
                        setActiveImageIndex(index)
                     }}
                  >
                     <img src={image.url} alt={orphanage.name} />
                  </button>
               ))
            }
         </div>

         <div className={`orphanage-details-content${extraPaddingBottom ? ' extra-padding-bottom' : ''}`}>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
               <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
               >
                  <TileLayer
                     url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
               </Map>

               <footer>
                  <a target='_blank' rel='noopener noreferrer' href={`https://www.google.com.br/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
               </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
               <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                        Segunda à Sexta <br />
                  {orphanage.opening_hours}
               </div>
               {
                  orphanage.open_on_weekends ? (
                     <div className="open-on-weekends">
                        <FiInfo size={32} color="#39CC83" />
                              Atendemos <br />
                              fim de semana
                     </div>
                  ) : (
                        <div className="dont-open">
                           <FiInfo size={32} color="#FF669D" />
                                 Não Atendemos <br />
                                 fim de semana
                        </div>
                     )
               }
            </div>

            <button type="button" className="contact-button">
               <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
         </div>
      </div>
   )
}

export default OrphanageDetailModal