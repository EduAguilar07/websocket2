function guardar() {

    let ruc_ = document.getElementById('ruc').value
    let cedula_ = document.getElementById('cedula').value
    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value
    let email_ = document.getElementById('email').value
    let domicilio_ = document.getElementById('domicilio').value
    let telefono_ = document.getElementById('telefono').value
    let empresas_ = document.getElementById('hdnEmpresas').value

    let empresasJson_ = JSON.parse('[' + empresas_.slice(0, -1) + ']');

    let data =
    {
        ruc: ruc_,
        cedula: cedula_,
        nombre: nombre_,
        apellido: apellido_,
        email: email_,
        domicilio: domicilio_,
        telefono: telefono_,
        empresas: empresasJson_
    }
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/representantelegal', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardarRepresentante() {
    var mensaje = "";
    guardar()
        .then((response) => {
            mensaje = 'Registro exitoso.';
            document.getElementById('btnGuardar').disabled = false;
            let notificationbody = document.getElementById('notification-body');
            notificationbody.textContent = 'Registro Existoso';
            var notification = new bootstrap.Toast(document.getElementById('notification'));
            notification.show();
        })
        .catch((error) => {
            alert('Error al ingresar.');
        })

}


function agregarRoles() {
    var elementoSelect = document.getElementById("roles");
    var opcionSeleccionada = elementoSelect.options[elementoSelect.selectedIndex];
    var valorSeleccionado = opcionSeleccionada.value;
    var textoSeleccionado = opcionSeleccionada.text;
    if(valorSeleccionado == '') {return};
    var divRoles = document.getElementById("dvRolesSeleccionadas");
    var divRol = document.createElement('div');
    divRol.textContent = textoSeleccionado;
    divRoles.appendChild(divRol);
    var listaroles = document.getElementById("listaroles");
    listaroles.value = listaroles.value + '{"_id": "' + valorSeleccionado + '"},';
}



async function obtenerRoles() {
    fetch('/rol')
        .then(response => {
            if (!response.ok) {
                throw new Error('la solicitud no se pudo completar');
            }
            return response.json();
        })
        .then(data => {
            llenarSelectRoles(data)
        })
        .catch(error => {
            llenarSelectRoles(null)
            console.error(error)
        });
}


function llenarSelectRoles(data) {
    const select = document.getElementById('roles');
    select.innerHTML = '';
    const option = document.createElement('option');
    option.text = 'Seleccione un Rol';
    option.value = '';
    select.appendChild(option);
    data.body.forEach(element => {
        const option = document.createElement('option');
        option.text = element.nombre;
        option.value = element._id;
        select.appendChild(option);
    });
}

window.addEventListener('load', function () {
    obtenerRoles();
})

