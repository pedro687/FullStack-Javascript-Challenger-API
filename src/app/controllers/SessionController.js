const jwt = require('jsonwebtoken')
const User = require('../models/User')
const AuthConfig = require('../../config/Auth')

class SessionController {
    async store(req, res) {
        const { email, password } = req.body
       
        if(!email || !password ) {
            return res.status(401).json({ error: "Not Authorized. Verify All Fields" })
        }

        const users = await User.findOne({ where: { email } })

        if(!users) {
            return res.status(400).json({ error: "Email doenst exists" })
        }

        if(!(await users).checkPassword) { 
           return res.status(401).json({ error: "Password doenst match" })
        }

        const { id, name, provider } = users
        
        return res.status(200).json({
            id,
            name,
            email,
            provider,
            token: jwt.sign({ id }, AuthConfig.secret, {
                expiresIn: AuthConfig.expiresIn
            })
        })
    }
}

module.exports = new SessionController()