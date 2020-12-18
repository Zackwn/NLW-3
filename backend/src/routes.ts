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
import { UsersSessionController } from './controllers/UsersSessionController'

const jwtHelper = new JWTHelper()

const orphanagesController = new OrphanagesController()
const manageOrphanagesController = new ManageOrphanagesController()
const usersController = new UsersController()
const usersPassword = new UsersPasswordController()
const usersSessionController = new UsersSessionController(jwtHelper)

const routes = Router()
const upload = multer(multerConfig)

/* Users */
routes.post('/user', (req, res) => usersController.create(req, res))
routes.post('/user/login', (req, res) => usersSessionController.authenticate(req, res))
routes.post(
    '/user/refresh-token',
    authMiddleware, // need a valid token to refresh
    (req, res) => usersSessionController.refreshToken(req, res)
)

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
routes.put('/orphanage/:id', upload.array('new_images'), orphanagesController.update)

/* Manage Orphanages */
routes.get('/user/orphanages/', manageOrphanagesController.getUserOrphanages)

export default routes