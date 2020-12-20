import { Request, Response } from 'express'
import { getRepository, getManager, DeleteResult } from 'typeorm'
import Orphanage from '../models/Orphanages'
import OrphanageView from '../views/orphanages_view'
import OrphanageValidation from '../validation/orphanages'
import deleteImages from '../helpers/deleteImages'
import { AppError } from '../errors/appError'
import Image from '../models/Images'
import { UserRole } from '../models/Users'

export class OrphanagesController {
    async update(req: Request, res: Response) {
        // get the orphanage id and parse to number
        let id: number | string = req.params.id

        id = Number(id)

        if (isNaN(id)) {
            throw new AppError(400)
        }

        if (req.userRole !== UserRole.ADMIN) {
            // check if user own the orphanage
            const { creator_id } = (await getRepository(Orphanage).findOne(id))

            if (creator_id !== req.userId) {
                throw new AppError(403)
            }
        }

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
            return { path: image.filename, orphanage_id: id } as Image
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

        let deleteImagesResult: Promise<DeleteResult>[]

        await getManager().transaction(async runInTransaction => {
            const orphanageRepository = runInTransaction.getRepository(Orphanage)
            const imageRepository = runInTransaction.getRepository(Image)

            await orphanageRepository.update(id, updateOrphanageData)

            await imageRepository.insert(new_images)

            deleteImagesResult = removedImages.map(image => {
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

    async index(_: Request, res: Response) {
        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find({
            where: { pending: false },
            relations: ['images', 'user']
        })

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