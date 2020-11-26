import * as yup from 'yup'

export default {
    create: yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    })
}