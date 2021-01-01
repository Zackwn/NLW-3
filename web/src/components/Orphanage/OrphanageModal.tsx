import React from 'react'

import { Map, TileLayer, Marker, } from 'react-leaflet'
import { OrphanageInterface } from '../../@types/orphanage'
import { formatToShortText } from '../../utils/formatToShortText'

import '../../styles/components/orphanage/orphanage-modal.css'
import mapIcon from "../../utils/mapIcon"

interface OrphanageModalProps {
   orphanage: OrphanageInterface
}

/**
 * 
 * @param children bottom right side buttons
 */
const OrphanageModal: React.FC<OrphanageModalProps> = ({ orphanage, children: icons }) => {
   return (
      <div className='orphanage-modal'>
         <div className='orphanage-modal-map'>
            <Map
               center={[
                  orphanage.latitude,
                  orphanage.longitude
               ]}
               style={{ width: '100%', height: 280 }}
               zoom={8}

               dragging={true}
               scrollWheelZoom={true}

               zoomControl={false}
               touchZoom={false}
            >
               <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
               />
               {/* <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               /> */}
               <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[
                     orphanage.latitude,
                     orphanage.longitude
                  ]}
               />
            </Map>
         </div>
         <div className='orphanage-modal-detail'>
            <p>{formatToShortText(orphanage.name)}</p>
            <div className='orphanage-modal-detail-icons'>
               {icons}
            </div>
         </div>
      </div>
   )
}

export default OrphanageModal