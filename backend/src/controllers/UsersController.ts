import { Request, Response } from 'express'

export class UsersController {
    async create(req: Request, res: Response) {
        const {
            email,
            password,
            name
        } = req.body

        // create user

        return res.status(201).send()
    }
}