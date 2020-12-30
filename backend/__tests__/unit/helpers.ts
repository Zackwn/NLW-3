import { JWTHelper } from '../../src/helpers/jwt'
import { deleteImages as DeleteImages } from '../../src/helpers/deleteImages'
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import Orphanages from '../../src/models/Orphanages'

describe('Helpers modules', () => {
    describe('jwt', () => {
        const jwtHelper = new JWTHelper()

        it('should successufuly sign and verify a token', () => {
            const payload = { id: 1 }
            const token = jwtHelper.sign(payload)
            expect(jwtHelper.verify(token)).toHaveProperty('id')
        })

        it('should fail to verify token with invalid signature', () => {
            const invalidToken = jsonwebtoken.sign({ id: 1 }, 'random_secret')
            expect(() => {
                jwtHelper.verify(invalidToken)
            }).toThrow(JsonWebTokenError)
        })
    })

    describe('deleteImages', () => {
        const deleteImages = new DeleteImages()

        it('should successfully delete the image', () => {
            var img = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO3gAAAABJRU5ErkJggg=="
            var imgBuffer = Buffer.from(img, 'base64')

            const imgPath = path.join(__dirname, 'image.png')

            fs.writeFile(imgPath, imgBuffer, (err) => {
                if (err) {
                    throw err
                }
            })


            deleteImages.one({
                id: 1,
                orphanage: {} as Orphanages,
                orphanage_id: 1,
                path: imgPath
            })

            expect(fs.existsSync(imgPath)).toBe(false)
        })
    })
})