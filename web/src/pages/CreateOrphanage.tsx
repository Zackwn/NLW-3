import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import { FiPlus, FiX } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";
import { LeafletMouseEvent } from "leaflet";
import api from "../services/api";
import { useHistory } from "react-router-dom";

interface PositionInterface {
   latitude: number,
   longitude: number
}

export default function CreateOrphanage() {
   const history = useHistory()

   const [position, setPosition] = useState<PositionInterface>()
   const [name, setName] = useState('')
   const [about, setAbout] = useState('')
   const [instructions, setInstructions] = useState('')
   const [openingHours, setOpeningHours] = useState('')
   const [openOnWeekends, setOpenOnWeekends] = useState(true)
   const [images, setImages] = useState<File[]>([])
   const [previewImages, setPreviewImages] = useState<string[]>([])

   function handleSelectFile({ target }: ChangeEvent<HTMLInputElement>) {
      const { files } = target
      if (!files) {
         return
      }

      const selectedImages = Array.from(files).concat(images)

      setImages(selectedImages)

      const selectedImagesPreview = selectedImages.map(image => {
         return URL.createObjectURL(image)
      })

      setPreviewImages(selectedImagesPreview)
   }

   function handleRemoveImage(index: number) {
      const filteredImages = images.filter((_, i) => {
         return i !== index
      })

      setImages(filteredImages)

      const filteredImagesPreview = filteredImages.map(image => {
         return URL.createObjectURL(image)
      })

      setPreviewImages(filteredImagesPreview)
   }

   async function handleSubmit(event: FormEvent) {
      event.preventDefault()
      if (!position) {
         return
      }

      const { latitude, longitude } = position

      const data = new FormData()

      data.append('name', name)
      data.append('about', about)
      data.append('instructions', instructions)
      data.append('latitude', String(latitude))
      data.append('longitude', String(longitude))
      data.append('opening_hours', openingHours)
      data.append('open_on_weekends', String(openOnWeekends))

      images.forEach(image => {
         data.append('images', image)
      })

      await api.post('/orphanage', data)

      history.push('/orphanages')
   }

   function handleMapClick({ latlng }: LeafletMouseEvent) {
      const { lat, lng } = latlng
      setPosition({
         latitude: lat,
         longitude: lng
      })
   }

   return (
      <div id="page-create-orphanage">
         <Sidebar />

         <main>
            <form className="create-orphanage-form" onSubmit={handleSubmit}>
               <fieldset>
                  <legend>Dados</legend>

                  <Map
                     center={[-27.2092052, -49.6401092]}
                     style={{ width: '100%', height: 280 }}
                     zoom={15}
                     onclick={handleMapClick}
                  >
                     <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                     />
                     {
                        position && (
                           <Marker
                              interactive={false}
                              icon={mapIcon}
                              position={[
                                 position?.latitude,
                                 position?.longitude
                              ]}
                           />
                        )
                     }
                  </Map>

                  <div className="input-block">
                     <label htmlFor="name">Nome</label>
                     <input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                     />
                  </div>

                  <div className="input-block">
                     <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                     <textarea
                        id="name"
                        maxLength={300}
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                     />
                  </div>

                  <div className="input-block">
                     <label htmlFor="images">Fotos</label>

                     <div className="images-container">
                        {previewImages.map((image, index) => (
                           <div key={index} className='image-wrapper'>
                              <img src={image} alt={name} />
                              <span
                                 onClick={() => handleRemoveImage(index)}
                              ><FiX color='#FF669D' size={24} /></span>
                           </div>
                        ))}

                        <label htmlFor='image[]' className="new-image">
                           <FiPlus size={24} color="#15b6d6" />
                        </label>
                     </div>

                     <input
                        multiple
                        type='file'
                        id='image[]'
                        onChange={handleSelectFile}
                     />
                  </div>


               </fieldset>

               <fieldset>
                  <legend>Visitação</legend>

                  <div className="input-block">
                     <label htmlFor="instructions">Instruções</label>
                     <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(event) => setInstructions(event.target.value)}
                     />
                  </div>

                  <div className="input-block">
                     <label htmlFor="opening_hours">Horário de Funcionamento</label>
                     <input
                        id="opening_hours"
                        value={openingHours}
                        onChange={(event) => setOpeningHours(event.target.value)}
                     />
                  </div>

                  <div className="input-block">
                     <label htmlFor="open_on_weekends">Atende fim de semana</label>

                     <div className="button-select">
                        <button
                           type="button"
                           className={openOnWeekends === true ? 'active' : ''}
                           onClick={() => setOpenOnWeekends(true)}
                        >
                           Sim
                        </button>

                        <button
                           type="button"
                           className={openOnWeekends === false ? 'active' : ''}
                           onClick={() => setOpenOnWeekends(false)}
                        >
                           Não
                        </button>
                     </div>
                  </div>
               </fieldset>

               <button className="confirm-button" type="submit">
                  Confirmar
          </button>
            </form>
         </main>
      </div>
   );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
