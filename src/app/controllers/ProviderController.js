const User = require('../models/User')
const Files = require('../models/Files')

class ProviderController { 
    async index(req, res) {
        const providers = await User.findAll({
            where: { provider:true },
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [{
                model: Files,
                attributes: ['name', 'path', 'url'],
                as: 'avatar'
            }]
        })

       return res.json(providers)
    }   
}

module.exports = new ProviderController()