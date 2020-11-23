import { Request, Response } from 'express'
import { hash } from 'argon2'
import { getRepository } from 'typeorm'
import User from '../models/Users'

export class UsersController {
    async create(req: Request, res: Response) {
        const {
            email,
            password,
            name
        } = req.body

        const hashPassword = await hash(password)

        const userData = { email, password: hashPassword, name }

        const userRepository = getRepository(User)

        const newUser = userRepository.create(userData)

        await userRepository.save(newUser)

        return res.status(201).json({
            message: 'Successfuly created!',
            user: newUser
        })
    }
}