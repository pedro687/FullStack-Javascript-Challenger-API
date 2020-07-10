const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const User = require('../app/models/User')
const Files = require('../app/models/Files')
const Appointment = require('../app/models/Appointment')
const mongoose = require('mongoose')
require('dotenv').config()

const Models = [User, Files, Appointment]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
       
        Models
         .map(model => model.init(this.connection))
        
         Models.map(model => model.association && model.association(this.connection.models))           
    }

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => { 
            console.log("Database Connected")
        })
        .catch((error) => {
             console.log(`Database Error Because -> ${error}`)
        })
    }
}

module.exports = new Database()