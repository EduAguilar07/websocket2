const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')

const routes = express.Router()

routes.post('/signin', function(req, res){
    controller.sign_in( req.body )
    .then( (data) => response.success(req, res, data, 201) )
    .catch( (error) => response.error(req, res, error, 400) );
});

routes.post('/signup', function(req, res){
    controller.sign_up( req.body )
    .then( (data) => response.success(req, res, data, 201) )
    .catch( (error) => response.error(req, res, error, 400) );
});

module.exports = routes

