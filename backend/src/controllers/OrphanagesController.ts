import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanages'
import OrphanageView from '../views/orphanages_view'
import OrphanageValidation from '../validation/orphanages'

export class OrphanagesController {
    async allFromUser(req: Request, res: Response) {
        const { userId } = req.params

        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find({
            where: { creator_id: userId },
            relations: ['user', 'images']
        })

        return res.json(OrphanageView.renderMany(orphanages))
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