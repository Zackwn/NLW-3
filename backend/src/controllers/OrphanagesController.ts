import { Request, Response } from 'express'
import { FindManyOptions, getManager, getRepository } from 'typeorm'
import { AppError } from '../errors/appError'
import deleteImages from '../helpers/deleteImages'
import Image from '../models/Images'
import Orphanage from '../models/Orphanages'
import { orphanageIsFromUserOrFail } from '../utils/orphanageIsFromUserOrFail'
import { parseIntOrFail } from '../utils/parseIntOrFail'
import OrphanageValidation from '../validation/orphanages'
import OrphanageView from '../views/orphanages_view'

export class OrphanagesController {
    async update(req: Request, res: Response) {
        // get the orphanage id and parse to number
        let orphanageId = parseIntOrFail(req.params.id)

        const { creator_id } = (await getRepository(Orphanage).findOneOrFail(orphanageId))

        orphanageIsFromUserOrFail(
            { userId: req.userId, userRole: req.userRole },
            creator_id,
            { passAdmin: true }
        )

        // get removed images id and parse to json
        const { removed_images } = req.body

        let removedImages: Image[]
        try {
            removedImages = JSON.parse(removed_images)
        } catch (e) {
            throw new AppError(400, {
                error: 'Invalid JSON'
            })
        }

        // get orphanage data
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body

        // get and parse multer files to images entity format
        const requestImages = req.files as Express.Multer.File[]

        const new_images = requestImages.map(image => {
            return { path: image.filename, orphanage_id: orphanageId } as Image
        })

        const updateOrphanageData = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === "true"
        }

        await OrphanageValidation.update.validate({
            ...updateOrphanageData,
            removed_images: removedImages,
            new_images
        }, {
            abortEarly: false
        })

        console.log({
            updateOrphanageData,
            removedImages,
            new_images
        })

        await getManager().transaction(async runInTransaction => {
            const orphanageRepository = runInTransaction.getRepository(Orphanage)
            const imageRepository = runInTransaction.getRepository(Image)

            await orphanageRepository.update(orphanageId, updateOrphanageData)

            await imageRepository.insert(new_images)

            const deleteImagesResult = removedImages.map(image => {
                return imageRepository.delete(image.id)
            })

            await Promise.all(deleteImagesResult)
        })

        deleteImages.many(removedImages)

        return res.status(204).send()
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const orphanageRepository = getRepository(Orphanage)

        const orphanage = await orphanageRepository.findOne(id, {
            relations: ['images', 'user']
        })

        if (!orphanage) {
            return res.json()
        }

        return res.json(OrphanageView.render(orphanage))
    }

    async index(req: Request, res: Response) {
        const { pending } = req.query

        const whereOptions: FindManyOptions<Orphanage> = {
            relations: ['images', 'user'],
            where: {}
        }

        if (pending === "true") {
            whereOptions.where['pending'] = true
        }

        if (pending === "false") {
            whereOptions.where['pending'] = false
        }

        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find(whereOptions)

        return res.json(OrphanageView.renderMany(orphanages))
    }

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body

        const orphanageRepository = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[]

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
            creator_id: req.userId
        }

        await OrphanageValidation.create.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanageRepository.create(data)

        await orphanageRepository.save(orphanage)

        return res.status(201).json({
            message: 'Successfuly created!',
            orphanage
        })
    }
}