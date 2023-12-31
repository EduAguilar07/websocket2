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
        var email_ = getCookie("emailUser");
        var token_ = getCookie("token");
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':`${token_}`,
                'x-access-email':`${email_}`
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


function agregarEmpresa() {
    var elementoSelect = document.getElementById("empresas");
    var opcionSeleccionada = elementoSelect.options[elementoSelect.selectedIndex];
    var valorSeleccionado = opcionSeleccionada.value;
    var textoSeleccionado = opcionSeleccionada.text;
    if (valorSeleccionado == '') { return; }
    var divEmpresas = document.getElementById("dvEmpresasSeleccionadas");
    var divEmpresa = document.createElement('div');
    divEmpresa.textContent = textoSeleccionado;
    divEmpresas.appendChild(divEmpresa);
    var hdnEmpresas = document.getElementById("hdnEmpresas");
    hdnEmpresas.value = hdnEmpresas.value + '{"_id": "' + valorSeleccionado + '"},';
}



async function obtenerEmpresas() {
    var email_ = getCookie("emailUser");
    var token_ = getCookie("token");
    const request_options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Indicar que se envían datos JSON
            'x-access-token':`${token_}`,
            'x-access-email':`${email_}`
        }        
    };

    fetch('/empresa', request_options)
        .then(response => {
            if (!response.ok) {
                throw new Error('la solicitud no se pudo completar');
            }
            return response.json();
        })
        .then(data => {
            llenarSelectEmpresa(data)
        })
        .catch(error => {
            console.error(error)
        });
}


function llenarSelectEmpresa(data) {
    const select = document.getElementById('empresas');
    select.innerHTML = '';
    const option = document.createElement('option');
    option.text = 'Seleccione una empresa';
    option.value = '';
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);
    data.body.forEach(element => {
        const option = document.createElement('option');
        option.text = element.nombre;
        option.value = element._id;
        select.appendChild(option);
    });
}

window.addEventListener('load', function () {
   // if (document.cookie.indexOf('token=') == 0) {
        obtenerEmpresas();
   // }
   /* else {
        this.alert(document.cookie.indexOf('token='));
        window.location.href = "/index.html";
    }*/
})



function cerrarSession() {

    document.cookie = "token=; max-age=0";
    window.location.href = "/index.html";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  