import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/upload'

// controllers
import { OrphanagesController } from './controllers/OrphanagesController'
import { UsersController } from './controllers/UsersController'

const orphanagesController = new OrphanagesController()
const usersController = new UsersController()

const routes = Router()
const upload = multer(multerConfig)

/* Orphanages */
routes.get('/orphanages', orphanagesController.index)
routes.get('/orphanages/:id', orphanagesController.show)
routes.post('/orphanage', upload.array('images'), orphanagesController.create)

/* Users */
routes.post('/user', usersController.create)

export default routes