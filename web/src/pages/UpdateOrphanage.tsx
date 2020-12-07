import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiX, FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import ManageOrphanageLayout from '../components/Orphanage/ManageOrphanageLayout'
import { Map, Marker, TileLayer } from 'react-leaflet'

import { OrphanageInterface } from '../@types/orphanage'
import { PositionInterface } from '../@types/position'
import { ImageInterface } from '../@types/image'
import mapIcon from '../utils/mapIcon'
import { LeafletMouseEvent } from 'leaflet'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import api from '../services/api'

interface PreviewImage extends ImageInterface {
   isNew: boolean
}

interface RemovedImages {
   path: string
   id: number
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

   const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(location.state?.orphanage.open_on_weekends)

   const [images, setImages] = useState<File[]>([])
   const [previewImages, setPreviewImages] = useState<PreviewImage[]>(
      location.state?.orphanage.images.map(image => ({
         url: image.url,
         id: image.id,
         isNew: false,
         path: image.path
      }))
   )
   const [removedImages, setRemovedImages] = useState<RemovedImages[]>([])

   function handleRemoveImage(image: PreviewImage, imageIndex: number) {
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
         console.log(previewImages[imageIndex])
         setRemovedImages([...removedImages, {
            id: previewImages[imageIndex].id,
            path: previewImages[imageIndex].path
         }])

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
         } as PreviewImage
      })

      setPreviewImages(prevPreviewImages => {
         // new images first
         return [...selectedImagesPreview, ...prevPreviewImages.filter(prevPreviewImage => {
            return prevPreviewImage.isNew === false
         })]
      })
   }

   async function handleSubmit(event: FormEvent) {
      event.preventDefault()

      const data = new FormData()

      data.append('name', name)
      data.append('latitude', String(position.latitude))
      data.append('longitude', String(position.longitude))
      data.append('about', about)
      data.append('instructions', instructions)
      data.append('opening_hours', openingHours)
      data.append('open_on_weekends', String(openOnWeekends))

      data.append('removed_images_id', JSON.stringify(removedImages))

      images.forEach(image => {
         data.append('new_images', image)
      })

      // let log: any = []
      // data.forEach((e) => log.push(e))
      // console.log({ data: log })

      const orphanageID = location.state?.orphanage.id

      const response = await api.put(`/orphanage/${orphanageID}`, data, {
         headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log(response)
   }

   return (
      <ManageOrphanageLayout>
         <form className='orphanage-form' onSubmit={handleSubmit}>
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

               <div className="open-on-weekends-choices">
                  <label>Atende fim de semana</label>

                  <div>
                     <button
                        type="button"
                        onClick={() => setOpenOnWeekends(true)}
                        className={openOnWeekends ? 'active-yes' : ''}
                     >
                        Sim
                     </button>

                     <button
                        type="button"
                        onClick={() => setOpenOnWeekends(false)}
                        className={openOnWeekends ? '' : 'active-no'}
                     >
                        Não
                     </button>
                  </div>
               </div>

            </fieldset>
            <Button type='submit'>
               Confirmar
            </Button>
         </form>
      </ManageOrphanageLayout>
   )
}

export default UpdateOrphanage