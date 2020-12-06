import Image from '../models/Images'
import { unlinkSync } from 'fs'
import path from 'path'

export class deleteImages {
    many(images: Image[]) {
        images.forEach((image) => {
            this.one(image)
        })
    }

    one(image: Image) {
        try {
            unlinkSync(path.resolve(
                __dirname, '..', '..', 'uploads', image.path
            ))
        } catch (error) {
            console.log(error)
        }
    }
}

export default new deleteImages()