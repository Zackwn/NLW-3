import { getRepository } from 'typeorm'
import { AppError } from '../errors/appError'
import Orphanage from '../models/Orphanages'
import { UserRole } from '../models/Users'

interface isOrphanageFromUserOptions {
    ignoreIfAdmin: boolean
}

interface isOrphanageFromUserUserParams {
    userRole: UserRole,
    userId: number
}

/**
 * @param options ignoreIfAdmin default value is false
 * @returns If orphanage is from user will return the orphanage object. if orphanage is not from user an response with 403 status will be send
 */
export async function orphanageIsFromUserOrFail(
    { userId, userRole }: isOrphanageFromUserUserParams,
    orphanageId: number,
    options?: isOrphanageFromUserOptions
): Promise<Orphanage> {
    if (userRole === UserRole.ADMIN && options.ignoreIfAdmin) {
        return getRepository(Orphanage).findOne(orphanageId)
    }

    // check if user own the orphanage
    const orphanage = (await getRepository(Orphanage).findOne(orphanageId))

    if (orphanage.creator_id !== userId) {
        throw new AppError(403)
    }
}