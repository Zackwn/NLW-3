import React, { ChangeEvent, useState } from 'react'
import { FiX, FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { OrphanageInterface } from '../@types/orphanage'
import ManageOrphanageLayout from '../components/Orphanage/ManageOrphanageLayout'

interface Image {
   url: string,
   isNew: boolean
}

const UpdateOrphanage: React.FC = () => {
   const { location } = useHistory<{ orphanage: OrphanageInterface }>()

   const [images, setImages] = useState<File[]>([])
   const [previewImages, setPreviewImages] = useState<Image[]>(
      location.state.orphanage.images.map(image => ({
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
         <div className="images-wrapper">
            <label htmlFor="images">Fotos</label>

            <div className="images-container">
               {previewImages.map((image, index) => (
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
         {/* <div className="input-block">
            <label htmlFor="images">Fotos</label>

            <div className="images-container">
               {previewImages.map((image, index) => (
                  <div key={index} className='image-wrapper'>
                     <img src={image.url} alt={name} />
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
               className='image-input'
               onChange={handleSelectFile}
            />
         </div> */}
      </ManageOrphanageLayout>
   )
}

export default UpdateOrphanage