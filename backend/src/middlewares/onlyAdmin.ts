import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/appError'
import { UserRole } from '../models/Users'

export default function onlyAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.userRole !== UserRole.ADMIN) {
        throw new AppError(403)
    }
    next()
}