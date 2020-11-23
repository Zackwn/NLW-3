import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export interface JWTHelperInterface {
    verify<Payload extends {}>(token: string): Payload | null
    sign<T extends {}>(payload: T): string
}

export class JWTHelper implements JWTHelperInterface {
    verify<Payload extends {}>(token: string): Payload | null {
        const payload = jwt.verify(token, String(process.env.JWT_SECRET), {

        })
        if (typeof payload === 'string') {
            return null
        }
        return payload as Payload
    }

    sign<T extends {}>(payload: T,): string {
        return jwt.sign(payload, String(process.env.JWT_SECRET), {
            expiresIn: '2d' // two days
        })
    }
}