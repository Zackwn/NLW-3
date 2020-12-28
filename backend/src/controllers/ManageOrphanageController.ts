import { Request, Response } from 'express'
import { FindManyOptions, getManager, getRepository } from 'typeorm'
import deleteImages from '../helpers/deleteImages'
import Image from '../models/Images'
import Orphanage from '../models/Orphanages'
import { orphanageIsFromUserOrFail } from '../utils/orphanageIsFromUserOrFail'
import { parseIntOrFail } from '../utils/parseIntOrFail'
import OrphanageView from '../views/orphanages_view'
// import OrphanageValidation from '../validation/orphanages'

export class ManageOrphanageController {
    async getUserOrphanages(req: Request, res: Response) {
        const { pending } = req.query

        const whereOptions: FindManyOptions<Orphanage> = {
            where: {
                creator_id: req.userId
            },
            relations: ['user', 'images']
        }

        if (pending === "true") {
            whereOptions.where['pending'] = true
        }

        if (pending === "false") {
            whereOptions.where['pending'] = false
        }

        const orphanageRepository = getRepository(Orphanage)

        const pendingOrphanages = await orphanageRepository.find(whereOptions)

        return res.json(OrphanageView.renderMany(pendingOrphanages))
    }

    async deleteById(req: Request, res: Response) {
        const orphanageId = parseIntOrFail(req.params.id)

        const orphanage = (await getRepository(Orphanage).findOneOrFail(orphanageId, {
            relations: ['images']
        }))

        await orphanageIsFromUserOrFail(
            { userId: req.userId, userRole: req.userRole },
            orphanage.creator_id,
            { passAdmin: false }
        )

        // delete orphanage
        await getManager().transaction(async runInTransaction => {
            const orphanageRepository = runInTransaction.getRepository(Orphanage)
            const imageRepository = runInTransaction.getRepository(Image)

            await orphanageRepository.delete(orphanageId)

            const deleteImagesPromises = orphanage.images.map(image => imageRepository.delete(image.id))

            await Promise.all(deleteImagesPromises)
        })

        deleteImages.many(orphanage.images)

        return res.status(204).send()
    }
}