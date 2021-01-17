import { getRepository } from 'typeorm'
import { AppError } from '../errors/appError'
import Orphanage from '../models/Orphanages'
import { UserRole } from '../models/Users'

interface isOrphanageFromUserUserParams {
    userRole: UserRole,
    userId: number,
    passAdmin?: boolean
}

/**
 * @param passAdmin default value is false
 */
export async function secureGetOrphanage(
    { userId, userRole, passAdmin = false }: isOrphanageFromUserUserParams,
    orphanageID: number,
    relations?: string[]
): Promise<Orphanage> {
    const orphanage = (await getRepository(Orphanage).findOneOrFail(orphanageID, {
        relations
    }))

    if (userRole === UserRole.ADMIN && passAdmin) {
        return orphanage
    }

    // check if user own the orphanage
    if (orphanage.creator_id !== userId) {
        throw new AppError(403)
    }

    return orphanage
}