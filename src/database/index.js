const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const User = require('../app/models/User')
const Files = require('../app/models/Files')

const Models = [User, Files]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)

        Models.map(model => model.init(this.connection))
    }
}

module.exports = new Database()