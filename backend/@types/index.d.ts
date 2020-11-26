import { Redis } from 'ioredis'

declare global {
    declare type userPayload = { userId: number }

    declare namespace Express {
        export interface Request {
            userId: number,
            redis: Redis
        }
    }
}
