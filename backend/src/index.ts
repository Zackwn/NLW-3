import express from 'express'
import Redis from 'ioredis'
import cors from 'cors'
import path from 'path'
import { createConnection } from 'typeorm'

import 'express-async-errors'
import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'
import { __prod__ } from './constants'

const main = async () => {
    const conn = await createConnection()
    conn.runMigrations()

    const app = express()
    const redisClient = new Redis({
        // password: "docker",
        host: "127.0.0.1",
        port: 6379
    })

    app.use(cors())
    app.use(express.json())

    app.use((req, _, next) => {
        req.redis = redisClient
        next()
    })

    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
    app.use(routes)
    app.use(errorHandler)

    return app
}

export { main }