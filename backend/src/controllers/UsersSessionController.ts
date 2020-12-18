import {
    verify as verifyPassword
} from 'argon2'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { AppError } from '../errors/appError'
import { JWTHelperInterface } from '../helpers/jwt'
import User from '../models/Users'

export class UsersSessionController {
    constructor(
        private jwtHelper: JWTHelperInterface
    ) { }

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body

        const userRepository = getRepository(User)

        // verify if user exists
        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            throw new AppError(400, {
                fieldErrors: {
                    email: 'Nenhum usuário cadastrado com esse email'
                }
            })
        }

        // verify if password is correct
        const isPasswordCorrect = await verifyPassword(user.password, password)

        if (!isPasswordCorrect) {
            throw new AppError(400, {
                fieldErrors: {
                    password: 'Senha incorreta'
                }
            })
        }

        // login user
        const token = this.jwtHelper.sign<userPayload>({ userId: user.id })

        return res.json(token)
    }

    async refreshToken(req: Request, res: Response) {
        const { userId } = req

        const userRepository = getRepository(User)

        const user = await userRepository.findOne(userId)

        if (!user) {
            throw new AppError(400, { error: 'User not exists.' })
        }

        const token = this.jwtHelper.sign({
            userId
        })

        return res.json(token)
    }
}