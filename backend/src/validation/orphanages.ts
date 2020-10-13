import * as Yup from 'yup'

export default {
    create: Yup.object().shape({
        /* 
            Pode se passar uma mensagem
            através do required:
            .required('Minha mensagem')
        */
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        images: Yup.array(
            Yup.object().shape({
                path: Yup.string().required()
            })
        )
    })
}