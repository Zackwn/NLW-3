import { AppError } from "../errors/appError";

/**
 * 
 * @description if fail parsing Int a response with 400 status will be send. 
 */
export function parseIntOrFail(target: any) {
    const int = parseInt(target)
    if (isNaN(int)) {
        throw new AppError(400)
    }
    return int
}