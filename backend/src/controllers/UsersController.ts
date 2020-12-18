import {
    hash as generatePasswordHash
} from 'argon2'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import UserValidation from '../validation/user'
import UserView from '../views/users_view'

export class UsersController {
    async create(req: Request, res: Response) {
        const {
            email,
            password,
            name
        } = req.body

        const userData = {
            email, password, name
        }

        await UserValidation.create.validate(userData, {
            abortEarly: false
        })

        const hashPassword = await generatePasswordHash(password)

        userData.password = hashPassword

        const userRepository = getRepository(User)

        const newUser = userRepository.create(userData)

        await userRepository.save(newUser)

        return res.status(201).json({
            message: 'Successfuly created!',
            user: UserView.render(newUser)
        })
    }
}