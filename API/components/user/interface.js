const express = require('express')
const controller = require('../user/controller')
const response = require('../../network/response')

const routes = express.Router()

routes.post('/', function(req, res){
    controller.createUser( req.body )
    .then( (data) => response.success(req, res, data, 201) )
    .catch( (error) => response.error(req, res, error, 400) );
});

module.exports = routes

