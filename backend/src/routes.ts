import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/upload'

// controllers
import { OrphanagesController } from './controllers/OrphanagesController'

const orphanagesController = new OrphanagesController()

const routes = Router()
const upload = multer(multerConfig)

routes.get('/orphanages', orphanagesController.index)

routes.get('/orphanages/:id', orphanagesController.show)

routes.post('/orphanage', upload.array('images'), orphanagesController.create)

export default routes