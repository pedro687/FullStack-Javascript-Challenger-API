const { Router } = require('express')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const Auth = require('./app/middlewares/Auth')

const routes = new Router()

routes.post('/', UserController.store)
routes.post('/session', SessionController.store)

routes.use(Auth)
routes.put('/user', UserController.updateUser)


module.exports = routes