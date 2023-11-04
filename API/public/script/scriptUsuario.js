function guardar() {

    let user_ = document.getElementById('user').value
    let email_ = document.getElementById('email').value
    let password_ = document.getElementById('password').value    
    let roles_ = document.getElementById('listaroles').value

    let rolesJson_ = JSON.parse('[' + roles_.slice(0, -1) + ']');

    let data =
    {
        username: user_,
        email: email_,
        password: password_,        
        roles: rolesJson_
    }
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/user', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardarUsuario() {
    var mensaje = "";
    guardar()
        .then((response) => {
            mensaje = 'Registro exitoso.';
            document.getElementById('btnGuardar').disabled = false;
            alert('Usuario Creado.');
            window.location.href = "/index.html";
        })
        .catch((error) => {
            console.log(error)
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
        option.text = element.name;
        option.value = element._id;
        select.appendChild(option);
    });
}

window.addEventListener('load', function () {
    obtenerRoles();
})

