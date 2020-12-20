import { __prod__ } from './src/constants'
import { ConnectionOptions } from 'typeorm'
export default {
    type: "postgres",
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    // database: 'nlwhappy',
    migrations: [
        "./src/database/migrations/*.ts"
    ],
    entities: [
        "./src/models/*.ts"
    ],
    cli: {
        migrationsDir: "./src/database/migrations"
    },
    logging: !__prod__
} as ConnectionOptions