import { AppError } from '../errors/appError'
import Orphanage from '../models/Orphanages'
import { UserRole } from '../models/Users'

interface isOrphanageFromUserOptions {
    passAdmin: boolean
}

interface isOrphanageFromUserUserParams {
    userRole: UserRole,
    userId: number
}

/**
 * @param options passAdmin default value is false
 * @returns If orphanage is from user will return void. if orphanage is not from user an response with 403 status will be send
 */
export async function orphanageIsFromUserOrFail(
    { userId, userRole }: isOrphanageFromUserUserParams,
    creatorId: number,
    options?: isOrphanageFromUserOptions
): Promise<void> {
    if (userRole === UserRole.ADMIN && options.passAdmin) {
        return
    }

    // check if user own the orphanage
    if (creatorId !== userId) {
        throw new AppError(403)
    }

    return
}