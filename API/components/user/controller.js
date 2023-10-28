const storage = require('./storage')

function agregarUser( dato ) {
    return new Promise((resolve, reject) => {
        resolve( storage.agregar( dato ) )
    })
}


module.exports = {
    agregarUser
}