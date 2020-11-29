interface FieldError {
    [key: string]: string
}

type Error = string

interface JsonError {
    error?: Error
    fieldErrors?: FieldError
}

export class AppError {
    status: number
    json: JsonError

    constructor(status: number, errors: {
        fieldErrors?: FieldError,
        error: Error
    }) {
        this.status = status
        if (errors.error) {
            this.json.error = errors.error
        }
        if (errors.fieldErrors) {
            this.json.fieldErrors = errors.fieldErrors
        }
    }
}