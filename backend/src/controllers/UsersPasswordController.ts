import { Request, Response } from 'express'
import { v4 as generateId } from 'uuid'
import { REDIS_FORGOT_PASSWORD_PREFIX } from '../config/constants'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import { sendMail } from '../helpers/sendMail'

export class UsersPasswordController {
    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body

        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({
                errors: {
                    email: ['email not registered']
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
    }
}