const Files = require('../models/Files')

class FileController {
    async store(req, res) { 
        const { originalname: name, filename: path } = req.file

       const file = await Files.create({
            name,
            path
        })
           
        return res.status(200).json(file)
    }
}

module.exports = new FileController()