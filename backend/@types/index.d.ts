import { Redis } from 'ioredis'
import { UserRole } from '../src/models/Users'

declare global {
    declare type userPayload = {
        userId: number,
        userRole: UserRole
    }

    declare namespace Express {
        export interface Request {
            userId: number,
            redis: Redis,
            userRole: UserRole
        }
    }
}
