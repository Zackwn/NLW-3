import { LeafletMouseEvent } from 'leaflet'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import { ImageInterface } from '../@types/image'
import { OrphanageInterface } from '../@types/orphanage'
import { PositionInterface } from '../@types/position'
import Button from '../components/Button'
import FormController from '../components/FormController'
import Input from '../components/Input'
import ManageOrphanageLayout from '../components/Layouts/ManageOrphanageLayout'
import Textarea from '../components/Textarea'
import ToastContext from '../context/toast/ToastContext'
import api from '../services/api'
import mapIcon from '../utils/mapIcon'

// css -> ../../styles/pages/orphanage/form.css

interface PreviewImage extends ImageInterface {
   isNew: boolean
}

interface RemovedImages {
   path: string
   id: number
}

interface FormError { [key: string]: string }

const UpdateOrphanage: React.FC = () => {
   const { location, push } = useHistory<{ orphanage: OrphanageInterface }>()
   const { toast } = useContext(ToastContext)

   useEffect(() => {
      if (!location?.state) {
         push('/dashboard/orphanages')
      }
   }, [location, location.state, push])

   const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(location.state?.orphanage.open_on_weekends)

   const [position, setPosition] = useState<PositionInterface>({
      latitude: location.state?.orphanage.latitude || 1,
      longitude: location.state?.orphanage.longitude || 1
   })

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

   function handleMapClick({ latlng }: LeafletMouseEvent) {
      setPosition({
         latitude: latlng.lat,
         longitude: latlng.lng
      })
   }

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

   return (
      <ManageOrphanageLayout>
         <FormController
            className='orphanage-form'
            initialValues={{
               name: location.state?.orphanage.name,
               about: location.state?.orphanage.about,
               instructions: location.state?.orphanage.instructions,
               opening_hours: location.state?.orphanage.opening_hours
            }}
            initialErrors={{}}
            onSubmit={async (data, setErrors) => {
               console.log({ position, openOnWeekends, previewImages, removedImages })
               console.log(data)

               const formData = new FormData()

               formData.append('name', data.name)
               formData.append('about', data.about)
               formData.append('instructions', data.instructions)
               formData.append('opening_hours', data.opening_hours)

               formData.append('latitude', String(position.latitude))
               formData.append('longitude', String(position.longitude))
               formData.append('open_on_weekends', String(openOnWeekends))
               formData.append('removed_images', JSON.stringify(removedImages))

               images.forEach(image => {
                  formData.append('new_images', image)
               })

               const orphanageID = location.state?.orphanage.id

               try {
                  await api.put(`/orphanage/${orphanageID}`, formData, {
                     headers: { 'Content-Type': 'multipart/form-data' }
                  })

                  toast({ message: `${data.name} atualizado com sucesso!`, type: 'success' })

                  push('/dashboard/orphanages')
               } catch (error) {
                  console.log(error.response)

                  const responseErrors = error?.response?.data?.errors as { [key: string]: string[] }

                  if (!responseErrors) {
                     return
                  }

                  let errors: FormError = {}

                  Object.entries(responseErrors).forEach(error => {
                     const key = error[0]
                     const value = error[1][0] // first string
                     errors[key] = value
                  })

                  console.log({ errors })

                  setErrors(errors)
               }
            }}
         >
            {({ data, errors }) => {
               return (
                  <>
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
                           defaultValue={data.name}
                           onChange={(e) => { data.name = e.target.value }}
                           error={errors.name}
                        />

                        <Textarea
                           labelText='Sobre'
                           labelSubText='Máximo de 300 caracteres'
                           id='about'
                           defaultValue={data.about}
                           onChange={(e) => { data.about = e.target.value }}
                           maxLength={300}
                           error={errors.about}
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
                           defaultValue={data.instructions}
                           onChange={(e) => { data.instructions = e.target.value }}
                           error={errors.instructions}
                        />

                        <Input
                           labelText='Horário das visitas'
                           defaultValue={data.opening_hours}
                           onChange={(e) => { data.opening_hours = e.target.value }}
                           error={errors.opening_hours}
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
                  </>
               )
            }}

         </FormController>
      </ManageOrphanageLayout >
   )
}

export default UpdateOrphanage