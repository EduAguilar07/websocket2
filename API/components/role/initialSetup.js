const Role = require('./model')

async function create_roles() {
    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) 
            return
        
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'admin'}).save()
        ])
        
        console.log( values )    
    } catch(error) {
        console.error( error )
    }
}

module.exports = {
    create_roles
}