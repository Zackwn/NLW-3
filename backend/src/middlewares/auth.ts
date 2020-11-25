import { Request, Response, NextFunction } from 'express'

import { JWTHelper } from '../helpers/jwt'
const jwtHelper = new JWTHelper()

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization
    if (!headerToken) {
        return res.status(401).send()
    }
    const [scheme, token] = headerToken.split(' ')
    if (scheme.toLowerCase() !== 'bearer') {
        return res.status(401).send()
    }
    const payload = jwtHelper.verify<userPayload>(token)
    if (!payload) {
        return res.status(401).send()
    }
    req.userId = payload.userId
    next()
}