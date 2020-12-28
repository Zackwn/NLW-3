import { main } from './index'
import { ConnectionOptions } from 'typeorm'

const PORT = process.env.PORT || 3333

main().then(app => {
    app.listen(PORT, () => {
        console.log(`PORT: ${PORT}\nNODE_ENV: ${process.env.NODE_ENV}`)
    })
})