const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Files extends Model {
    static init(sequelize) { 
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() { 
                    return `http://localhost:3000/providers/${this.path}`
                }
            }
        },
        {
            sequelize
        })
    }
}

module.exports = Files