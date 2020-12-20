import { __prod__ } from './src/constants'
export default {
    type: "sqlite",
    database: "./src/database/database.sqlite",
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
}