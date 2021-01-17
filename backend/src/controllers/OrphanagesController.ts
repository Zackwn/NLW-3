import { Request, Response } from 'express'
import { FindManyOptions, getManager, getRepository } from 'typeorm'
import { AppError } from '../errors/appError'
import deleteImages from '../helpers/deleteImages'
import Image from '../models/Images'
import Orphanage from '../models/Orphanages'
import { secureGetOrphanage } from '../utils/secureGetOrphanage'
import { parseIntOrFail } from '../utils/parseIntOrFail'
import OrphanageValidation from '../validation/orphanages'
import OrphanageView from '../views/orphanages_view'

export class OrphanagesController {
    async update(req: Request, res: Response) {
        let orphanageId = parseIntOrFail(req.params.id)

        await secureGetOrphanage(
            { userId: req.userId, userRole: req.userRole, passAdmin: true },
            orphanageId,
        )

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

        const updateOrphanageData = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === "true"
        }

        await OrphanageValidation.update.validate(updateOrphanageData, {
            abortEarly: false
        })

        await getManager().transaction(async runInTransaction => {
            const orphanageRepository = runInTransaction.getRepository(Orphanage)

            await orphanageRepository.update(orphanageId, updateOrphanageData)
        })

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

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
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

    async patchImages(req: Request, res: Response) {
        const orphanageID = parseIntOrFail(req.params.id)
        const { removed_images } = req.body

        let removedImages: Image[]
        try {
            removedImages = JSON.parse(removed_images)
        } catch (e) {
            throw new AppError(400, {
                error: 'Invalid JSON'
            })
        }

        await secureGetOrphanage({
            userId: req.userId,
            userRole: req.userRole,
            passAdmin: false
        }, orphanageID)

        const requestImages = req.files as Express.Multer.File[]

        const images = requestImages.map(image => {
            return { path: image.filename, orphanage_id: orphanageID } as Image
        })

        await getManager().transaction(async runInTransaction => {
            const imageRepository = runInTransaction.getRepository(Image)

            await imageRepository.insert(images)
            const deleteImagesResult = removedImages?.map(removedImages => {
                return imageRepository.delete(removedImages.id)
            })

            await Promise.all(deleteImagesResult)
        })

        return res.status(204).send()
    }
}