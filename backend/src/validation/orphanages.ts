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
        open_on_weekends: Yup.boolean().required(),
        images: Yup.array(
            Yup.object().shape({
                path: Yup.string().required()
            })
        )
    }),

    update: Yup.object().shape({
        name: Yup.string().required("Nome é um campo obrigatório"),
        latitude: Yup.number().required("Latitude é um campo obrigatório"),
        longitude: Yup.number().required("Longitude é um campo obrigatório"),
        about: Yup.string().max(300).required("Sobre é um campo obrigatório"),
        instructions: Yup.string().required("Instruções é um campo obrigatório"),
        opening_hours: Yup.string().required("Horário de abertura é um campo obrigatório"),
        open_on_weekends: Yup.boolean().required("Abre nos fins de semana é um campo obrigatório"),

        new_images: Yup.array(
            Yup.object().shape({
                orphanage_id: Yup.number().required("Id do orfanato é um campo obrigatório"),
                path: Yup.string().required("Path é um campo obrigatório")
            })
        ),
        removed_images: Yup.array(
            Yup.object().shape({
                id: Yup.number().required((messageParams) => {
                    messageParams.path = 'removed_images'
                    return 'ID é um campo obrigatório'
                }),

                path: Yup.string().required((messageParams) => {
                    messageParams.path = 'removed_images'
                    return 'Path é um campo obrigatório'
                })
            })
        )
    })
}