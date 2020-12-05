import React, { ChangeEvent, useEffect, useState } from 'react'
import { FiX, FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import ManageOrphanageLayout from '../components/Orphanage/ManageOrphanageLayout'
import { Map, Marker, TileLayer } from 'react-leaflet'

import { OrphanageInterface } from '../@types/orphanage'
import { PositionInterface } from '../@types/position'
import mapIcon from '../utils/mapIcon'
import { LeafletMouseEvent } from 'leaflet'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Button from '../components/Button'

interface Image {
   url: string,
   isNew: boolean
}

const UpdateOrphanage: React.FC = () => {
   const { location, push } = useHistory<{ orphanage: OrphanageInterface }>()

   useEffect(() => {
      if (!location?.state) {
         push('/dashboard/orphanages')
      }
   }, [location, location.state, push])

   const [position, setPosition] = useState<PositionInterface>({
      latitude: location.state?.orphanage.latitude || 1,
      longitude: location.state?.orphanage.longitude || 1
   })

   function handleMapClick({ latlng }: LeafletMouseEvent) {
      setPosition({
         latitude: latlng.lat,
         longitude: latlng.lng
      })
   }

   const [name, setName] = useState<string>(location.state?.orphanage.name)
   const [about, setAbout] = useState<string>(location.state?.orphanage.about)
   const [instructions, setInstructions] = useState<string>(location.state?.orphanage.about)
   const [openingHours, setOpeningHours] = useState<string>(location.state?.orphanage.opening_hours)

   const [images, setImages] = useState<File[]>([])
   const [previewImages, setPreviewImages] = useState<Image[]>(
      location.state?.orphanage.images.map(image => ({
         url: image.url,
         isNew: false
      }))
   )
   const [removedImagesIds, setRemovedImagesIds] = useState<number[]>([])

   function handleRemoveImage(image: Image, imageIndex: number) {
      if (image.isNew) {
         console.log({ imageIndex })
         const filteredImages = images.filter((_, index) => {
            return index !== imageIndex
         })

         console.log({ filteredImages })

         setImages(filteredImages)

         const filteredPreviewImages = previewImages.filter((_, index) => {
            return index !== imageIndex
         })

         setPreviewImages(filteredPreviewImages)
      } else {
         console.log('delete not new')
         setRemovedImagesIds([...removedImagesIds, imageIndex])

         const filteredPreviewImages = previewImages.filter((_, index) => {
            return index !== imageIndex
         })

         setPreviewImages(filteredPreviewImages)
      }
   }

   function handleSelectFile({ target }: ChangeEvent<HTMLInputElement>) {
      const { files } = target
      if (!files) {
         return
      }

      const selectedImages = Array.from(files).concat(images)

      setImages(selectedImages)

      const selectedImagesPreview = selectedImages.map(image => {
         return {
            url: URL.createObjectURL(image),
            isNew: true
         } as Image
      })

      setPreviewImages(prevPreviewImages => {
         // new images first
         return [...selectedImagesPreview, ...prevPreviewImages.filter(prevPreviewImage => {
            return prevPreviewImage.isNew === false
         })]
      })
   }

   return (
      <ManageOrphanageLayout>
         <form className='orphanage-form'>
            <fieldset>
               <legend>Dados</legend>

               <div className='orphanage-edit-wrapper'>
                  <Map
                     zoomControl={false}
                     center={[
                        location.state?.orphanage.latitude || 1,
                        location.state?.orphanage.longitude || 1
                     ]}
                     onclick={handleMapClick}
                     className='orphanage-map'
                     zoom={6}
                  >
                     <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                     />
                     {position && (
                        <Marker
                           interactive={false}
                           icon={mapIcon}
                           position={[
                              position.latitude,
                              position.longitude
                           ]}
                        />
                     )}
                  </Map>
                  <div>
                     <span>Clique no mapa para alterar a localização</span>
                  </div>
               </div>

               <Input
                  labelText='Nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />

               <Textarea
                  labelText='Sobre'
                  labelSubText='Máximo de 300 caracteres'
                  id='about'
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  maxLength={300}
               />

               <div className="images-wrapper">
                  <label htmlFor="images">Fotos</label>

                  <div className="images-container">
                     {previewImages?.map((image, index) => (
                        <div key={index} className='image-wrapper'>
                           <img src={image.url} alt='Imagem' />
                           <span
                              onClick={() => handleRemoveImage(image, index)}
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
                     className='image-input'
                     onChange={handleSelectFile}
                  />
               </div>
            </fieldset>
            <fieldset>
               <legend>Visitação</legend>

               <Textarea
                  labelText='Instruções'
                  labelSubText=''
                  id='instructions'
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
               />

               <Input
                  labelText='Horário das visitas'
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
               />
            </fieldset>
            <Button type='submit'>
               Confirmar
            </Button>
         </form>
      </ManageOrphanageLayout>
   )
}

export default UpdateOrphanage