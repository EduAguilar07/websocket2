const representante = require('../components/representantelegal/interface')
const empresa = require('../components/empresa/interface')
const user = require('../components/user/interface')
const auth = require('../components/auth/interface')
const rol = require('../components/role/interface')

const routes = function( server ) {
    server.use('/representantelegal',representante)
    server.use('/empresa', empresa)
    server.use('/user', user)
    server.use('/auth', auth)
    server.use('/rol', rol)
    
}

module.exports = routes