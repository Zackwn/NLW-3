const folder = process.env.NODE_ENV === "production" ? "dist" : "src"
const extension = process.env.NODE_ENV === "production" ? ".js" : ".ts"
console.log()
module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    // database: 'nlwhappy',
    migrations: [
        `./${folder}/database/migrations/*${extension}`
    ],
    entities: [
        `./${folder}/models/*${extension}`
    ],
    cli: {
        migrationsDir: `./${folder}/database/migrations`
    },
    logging: true
}