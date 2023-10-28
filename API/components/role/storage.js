const Model = require('./model')

async function agregarRol( dato ) {
    const resultado = await new Model( dato )
    const rol = resultado.save()
    return rol
}

async function obtenerRol( filtro ) {
    let mi_filtro = {}

    if (filtro.name != null) {
        mi_filtro = { name: filtro.name }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}

module.exports = {
    agregar:agregarRol,
    obtener:obtenerRol
}