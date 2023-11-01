const express = require('express')
const controller = require('./controller')
const init = require('./initialSetup')
const response = require('../../network/response')

const routes = express.Router()

routes.get('/', function(req, res){
    //init.create_roles()
    const filtro = req.query || null
    controller.obtenerRol( filtro )
        .then( (data) => response.success(req, res, data, 200) )
      
})

module.exports = routes

