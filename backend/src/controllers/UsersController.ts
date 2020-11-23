import { Request, Response } from 'express'
import {
    hash as generatePasswordHash,
    verify as verifyPassword
} from 'argon2'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import { JWTHelperInterface } from '../helpers/jwt'

export class UsersController {
    jwtHelper: JWTHelperInterface

    constructor(jwtHelper: JWTHelperInterface) {
        this.jwtHelper = jwtHelper
    }

    async create(req: Request, res: Response) {
        const {
            email,
            password,
            name
        } = req.body

        const hashPassword = await generatePasswordHash(password)

        const userData = { email, password: hashPassword, name }

        const userRepository = getRepository(User)

        const newUser = userRepository.create(userData)

        await userRepository.save(newUser)

        return res.status(201).json({
            message: 'Successfuly created!',
            user: newUser
        })
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const userRepository = getRepository(User)

        // verify if user exists
        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({
                errors: {
                    email: 'No registered user with this email'
                }
            })
        }

        // verify if password is correct
        const isPasswordCorrect = await verifyPassword(user.password, password)

        if (!isPasswordCorrect) {
            return res.status(400).send()
        }

        // login user
        const token = this.jwtHelper.sign<userPayload>({ userId: user.id })

        return res.json(token)
    }
}