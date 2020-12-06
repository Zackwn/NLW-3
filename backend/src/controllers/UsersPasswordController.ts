import { Request, Response } from 'express'
import { v4 as generateId } from 'uuid'
import { REDIS_FORGOT_PASSWORD_PREFIX } from '../config/constants'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import { sendMail } from '../helpers/sendMail'
import { hash as hashPassword } from 'argon2'
import { AppError } from '../errors/appError'

export class UsersPasswordController {
    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body

        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            throw new AppError(400, {
                fieldErrors: {
                    email: 'Email não registrado'
                }
            })
        }

        const token = generateId()
        await req.redis.set(
            `${REDIS_FORGOT_PASSWORD_PREFIX}${token}`,
            user.id,
            'ex', // expire
            1000 * 60 * 60 * 2 // two hours
        )

        await sendMail(email, {
            subject: 'Change Password',
            html: `
                <a href="http://localhost:3000/change-password/${token}">
                    <h2>
                        Change password
                    </h2>
                </a>
            `
        })

        return res.send()
    }

    async changePassword(req: Request, res: Response) {
        const { newPassword, confirmPassword, token } = req.body

        if (newPassword !== confirmPassword) {
            throw new AppError(400, {
                error: 'Senhas divergentes'
            })
        }

        const userId = await req.redis.get(
            `${REDIS_FORGOT_PASSWORD_PREFIX}${token}`
        )

        if (!userId) {
            throw new AppError(400, {
                error: 'Token de troca de senha expirou'
            })
        }

        const userRepository = getRepository(User)

        const user = await userRepository.findOne(userId)

        const hashNewPassword = await hashPassword(newPassword)

        await userRepository.update({ id: user.id }, { password: hashNewPassword })

        return res.send()
    }
}