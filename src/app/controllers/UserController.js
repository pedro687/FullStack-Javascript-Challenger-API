const User = require('../models/User')

class UserController {
    async store(req, res) {
        const { email, name, password, provider } = req.body

        if(!email || !password ) {
            return res.status(401).json({ error: "Not Authorized. Verify All Fields" })
        }

        const userExists = await User.findOne({ where: { email } })

        if(userExists) {
            return res.status(401).json({ error: "Email Already exists" })
        }
        
        User.create({
            email,
            name,
            password,
            provider
        })

        return res.status(200).json({ success: "User created" })
    }

    updateUser(req, res) {
        console.log(req.userId)
        return res.json({ message: "Chegamos até aqui" })
    }
}

module.exports = new UserController()