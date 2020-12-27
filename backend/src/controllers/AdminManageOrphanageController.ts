import { Request, Response } from 'express'
import { getRepository } from "typeorm"
import { AppError } from "../errors/appError"
import Orphanage from '../models/Orphanages'
import { parseIntOrFail } from "../utils/parseIntOrFail"

export class AdminManageOrphanageController {
    async patchPending(req: Request, res: Response) {
        const id = parseIntOrFail(req.params.id)

        const { pending } = req.body

        if (pending === undefined || pending === null) {
            throw new AppError(400)
        }

        await getRepository(Orphanage).update({
            id
        }, {
            pending
        })

        return res.send()
    }
}