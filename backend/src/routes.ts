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
import { ManageOrphanagesController } from './controllers/ManageOrphanageController'

const jwtHelper = new JWTHelper()

const orphanagesController = new OrphanagesController()
const manageOrphanagesController = new ManageOrphanagesController()
const usersController = new UsersController(jwtHelper)
const usersPassword = new UsersPasswordController()

const routes = Router()
const upload = multer(multerConfig)

/* Users */
routes.post('/user', (req, res) => usersController.create(req, res))
routes.post('/user/login', (req, res) => usersController.login(req, res))

/* User Password */
routes.post('/user/forgot-password', (req, res) => usersPassword.forgotPassword(req, res))
routes.post('/user/change-password', (req, res) => usersPassword.changePassword(req, res))

/* See Orphanages */
routes.get('/orphanages', orphanagesController.index)
routes.get('/orphanages/:id', orphanagesController.show)

/* Protected Routes bellow */
routes.use(authMiddleware)

/* Create and Update */
routes.post('/orphanage', upload.array('images'), orphanagesController.create)
// routes.put('/orphanage', orphanagesController.update)

/* Manage Orphanages */
routes.get('/user/orphanages/', manageOrphanagesController.getUserOrphanages)

export default routes