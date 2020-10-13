import React from 'react'

import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanages-map.css'
import mapMarker from '../assets/map-marker.svg'
import { FiPlus } from 'react-icons/fi'

const OrphanagesMap: React.FC = () => {
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
          center={[-21.2490387, -50.6481808]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        </Map>

        <Link to='/' className='create-orphanages'>
          <FiPlus size={32} color='#FFF' />
        </Link>
      </div>
    </div>
  )
}

export default OrphanagesMap