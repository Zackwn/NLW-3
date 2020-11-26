import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/upload'

// helpers
import { JWTHelper } from './helpers/jwt'

// controllers
import { OrphanagesController } from './controllers/OrphanagesController'
import { UsersController } from './controllers/UsersController'
import authMiddleware from './middlewares/auth'
import { UsersPasswordController } from './controllers/UsersPasswordController'

const jwtHelper = new JWTHelper()

const orphanagesController = new OrphanagesController()
const usersController = new UsersController(jwtHelper)
const usersPassword = new UsersPasswordController()

const routes = Router()
const upload = multer(multerConfig)

/* Users */
routes.post('/user', (req, res) => usersController.create(req, res))
routes.post('/user/login', (req, res) => usersController.login(req, res))

/* User Password */
routes.post('/user/forgot-password', (req, res) => usersPassword.forgotPassword(req, res))

/* Protected Routes bellow */
routes.use(authMiddleware)

/* Orphanages */
routes.get('/orphanages', orphanagesController.index)
routes.get('/orphanages/:id', orphanagesController.show)
routes.post('/orphanage', upload.array('images'), orphanagesController.create)


export default routes