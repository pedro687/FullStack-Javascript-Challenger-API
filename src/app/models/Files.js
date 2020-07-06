const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Files extends Model {
    static init(sequelize) { 
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING
        },
        {
            sequelize
        })
    }
}

module.exports = Files