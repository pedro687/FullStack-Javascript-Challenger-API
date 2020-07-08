const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const User = require('../app/models/User')
const Files = require('../app/models/Files')
const Appointment = require('../app/models/Appointment')

const Models = [User, Files, Appointment]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
       
        Models
         .map(model => model.init(this.connection))
        
         Models.map(model => model.association && model.association(this.connection.models))        
        
    }
}

module.exports = new Database()