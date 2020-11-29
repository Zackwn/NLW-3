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

    constructor(status: number, errors?: JsonError) {
        this.status = status
        this.json = errors
    }
}