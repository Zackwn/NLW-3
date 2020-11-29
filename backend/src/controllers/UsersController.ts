import { Request, Response } from 'express'
import {
    hash as generatePasswordHash,
    verify as verifyPassword
} from 'argon2'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import { JWTHelperInterface } from '../helpers/jwt'
import UserValidation from '../validation/user'
import UserView from '../views/users_view'

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

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const userRepository = getRepository(User)

        // verify if user exists
        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({
                errors: {
                    email: 'Nenhum usuário cadastrado com esse email'
                }
            })
        }

        // verify if password is correct
        const isPasswordCorrect = await verifyPassword(user.password, password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                errors: {
                    password: 'Senha incorreta'
                }
            })
        }

        // login user
        const token = this.jwtHelper.sign<userPayload>({ userId: user.id })

        return res.json(token)
    }
}