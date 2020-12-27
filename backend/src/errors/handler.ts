import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'
import { AppError } from './appError'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

interface IValidationErrors {
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof EntityNotFoundError) {
        return response.status(400).send()
    }

    if (error instanceof AppError) {
        return response.status(error.status).json(error.json)
    }

    if (error instanceof ValidationError) {
        let errors: IValidationErrors = {}

        error.inner.forEach(err => {
            let errorPath: string
            if ((err.params as any)?.path) {
                errorPath = (err.params as any)?.path
            } else {
                errorPath = err.path
            }
            errors[errorPath] = err.errors
        })

        return response.status(400).json({
            message: 'Validation failed',
            errors
        })
    }

    console.error(error)

    return response.status(500).json({
        message: 'Internal server error'
    })
}

export default errorHandler