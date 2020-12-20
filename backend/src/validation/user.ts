import * as yup from 'yup'
import { UserRole } from '../models/Users'

const userRole = yup.mixed<UserRole>().oneOf(Object.values(UserRole))

export default {
    create: yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role: userRole.notRequired()
    })
}