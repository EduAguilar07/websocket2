const express = require('express')
const controller = require('./controller')
const response = require('../../network/response')
const auth_jwt = require('../middlewares/auth.jwt')
const routes = express.Router()


routes.post('/', [auth_jwt.verify_token, auth_jwt.is_admin], function(req, res){
    controller.agregarEmpresa( req.body )
        .then((data) => {
            // Emitir notificacion cuando se agrega una empresa.
            const notificacionEmpresa = {                
                nombreEmpresa: req.body.nombre,                
                responsable: req.body.representante != null ? req.body.representante : ""
            };              
            req.io.emit('notificacionEmpresa', notificacionEmpresa);
            console.log('notificacionEmpresa exitosa');
            response.success(req, res, data, 201);
        })
        .catch((error) => response.error(req, res, error, 400));
});

routes.get('/',[auth_jwt.verify_token, auth_jwt.is_admin], function(req, res){
    const filtro = req.body || null
    controller.obtenerEmpresa( filtro )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

routes.put('/', [auth_jwt.verify_token, auth_jwt.is_admin], function(req, res){
    controller.actualizarEmpresa( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 400) )
})

routes.delete('/', [auth_jwt.verify_token, auth_jwt.is_admin], function(req, res){
    controller.eliminarEmpresa( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 400) )
})

module.exports = routes

