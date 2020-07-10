const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const FileController = require('./app/controllers/FileController')
const ProviderController = require('./app/controllers/ProviderController')
const AppointmentController = require('./app/controllers/AppointmentController')
const ScheduleControlller = require('./app/controllers/ScheduleController')

const Auth = require('./app/middlewares/Auth')

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/', UserController.store)
routes.post('/session', SessionController.store)

routes.use(Auth) /*authentication middleware */

routes.put('/user', UserController.updateUser)

routes.post('/files', upload.single('file'), FileController.store)

routes.get('/providers', ProviderController.index)

routes.get('/appointments', AppointmentController.index)
routes.post('/appointments', AppointmentController.store)

routes.get('/schedules', ScheduleControlller.index)

module.exports = routes