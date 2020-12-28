import { AppError } from '../../src/errors/appError'
import { UserRole } from '../../src/models/Users'
import { orphanageIsFromUserOrFail } from '../../src/utils/orphanageIsFromUserOrFail'
import { parseIntOrFail } from '../../src/utils/parseIntOrFail'

describe('Utils modules', () => {
    describe('orphanageIsFromUserOrFail', () => {
        it('should fail because user not own orphanage', () => {
            expect(() => {
                orphanageIsFromUserOrFail(
                    { userId: 1, userRole: UserRole.USER },
                    2,
                    { passAdmin: false }
                )
            }).toThrow(AppError)
        })

        it(`shouldn't fail because user is admin and passAdmin is true`, () => {
            expect(() => {
                orphanageIsFromUserOrFail(
                    { userId: 1, userRole: UserRole.ADMIN },
                    2,
                    { passAdmin: true }
                )
            }).not.toThrow(AppError)
        })

        it(`shouldn't fail beacuse user own orphanage`, () => {
            expect(() => {
                orphanageIsFromUserOrFail(
                    { userId: 1, userRole: UserRole.USER },
                    1,
                    { passAdmin: true }
                )
            }).not.toThrow(AppError)
        })
    })

    describe('parseIntOrFail', () => {
        it('should successfully parse int', () => {
            const int = parseIntOrFail('2')
            expect(int).toBe(2)
        })

        it('it should fail parsing int', () => {
            expect(() => {
                parseIntOrFail({})
            }).toThrow(AppError)
        })
    })
})