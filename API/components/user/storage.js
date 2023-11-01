const Model = require('./model')
const ModelRol = require('../role/model')

async function agregarUser( dato ) {
    const user = await new Model( dato )
    user.password = await Model.encrypted_password(user.password)
    return user.save()

}
module.exports = {
    agregar:agregarUser    
}

