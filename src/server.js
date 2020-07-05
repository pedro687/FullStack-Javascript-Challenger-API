const Server = require('./app')
const port = 3000



Server.listen(port, () => {
    console.log(` Server Running at ${port} `)
})