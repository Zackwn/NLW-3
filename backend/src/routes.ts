import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/upload'

// helpers
import { JWTHelper } from './helpers/jwt'

// controllers
import { OrphanagesController } from './controllers/OrphanagesController'
import { UsersController } from './controllers/UsersController'

const jwtHelper = new JWTHelper()

const orphanagesController = new OrphanagesController()
const usersController = new UsersController(jwtHelper)

const routes = Router()
const upload = multer(multerConfig)

/* Orphanages */
routes.get('/orphanages', orphanagesController.index)
routes.get('/orphanages/:id', orphanagesController.show)
routes.post('/orphanage', upload.array('images'), orphanagesController.create)

/* Users */
routes.post('/user', (req, res) => usersController.create(req, res))
routes.post('/user/login', (req, res) => usersController.login(req, res))

export default routes