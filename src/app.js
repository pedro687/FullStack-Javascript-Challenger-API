const express = require('express')
const routes = require('./router')
const path = require('path')

require('./database/index')

class App {
    constructor() {
        this.server = express()
        this.middlewares()
        this.router()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(
            '/providers',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        )
    }

    router() {
        this.server.use(routes)
    }
}

module.exports = new App().server