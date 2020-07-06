const multer = require('multer')
const crypto = require('crypto')
const { extname, resolve } = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, callback) => { 
            crypto.randomBytes(16, (error, res) => {
                if(error) return callback(error);

                return callback(null, res.toString('hex') + extname(file.originalname))
            })
        }
    })
}