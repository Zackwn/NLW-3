import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import Orphanage from '../models/Orphanages'
import OrphanageView from '../views/orphanages_view'
// import OrphanageValidation from '../validation/orphanages'

export class ManageOrphanagesController {
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
}