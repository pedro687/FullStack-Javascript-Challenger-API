const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const Auth = require('./app/middlewares/Auth')

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/', UserController.store)
routes.post('/session', SessionController.store)

routes.use(Auth)
routes.put('/user', UserController.updateUser)

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true })
})

module.exports = routes