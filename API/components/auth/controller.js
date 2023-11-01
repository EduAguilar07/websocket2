const jwt = require('jsonwebtoken')
const User = require('../user/model')
const Role = require('../role/model')
const config = require ('../../config')

async function sign_up( req ) {
        const {username, email, password, roles} = req.body
        const new_user = new User({ 
            username, 
            email, 
            password: User.encrypted_password(password) 
        })
        if (roles) {
            const found_roles = await Role.find({name: {$in: roles}})
            new_user.roles = found_roles.map( role => role._id )
        } else {
            const role = await Role.find({name: 'user'})
            new_user.roles = [role._id]
        }
        const saved_user = await new_user.save()
        const token = jwt.sign({ id:saved_user._id }, config.SECRET, {
            expiresIn: 86400 // 24 horas
        })
        return token
}

async function sign_in ( req ) {

        // Se busca al usuario en la BD a traves del correo
        const user_found = await User.findOne({email: req.body.email})

        if (!user_found) {
            throw new ('User not found')
        }
        // Se verifica el password ingresado en el formulario vs. el password encriptado en la BD
        const verify_password = User.compare_password(req.body.password, user_found.password)
        
        if (!verify_password) {
            throw new ('Password invalido')
        }
        // Creacion del token para comunicacion autenticada.
        const token = jwt.sign({id: user_found._id}, config.SECRET, {
            expiresIn: 86400 // 24 horas
        })
       return {token: token}
 }

module.exports = {
    sign_up,
    sign_in
}