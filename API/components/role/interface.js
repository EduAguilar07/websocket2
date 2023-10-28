const express = require('express')
const controller = require('../role/controller')
const response = require('../../network/response')

const routes = express.Router()

routes.post('/', function(req, res){
    controller.agregarRol( req.body )
    .then( (data) => response.success(req, res, data, 201) )
    .catch( (error) => response.error(req, res, error, 400) );
});

routes.get('/', function(req, res){
    const filtro = req.body || null
    controller.obtenerRol( filtro )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

module.exports = routes

