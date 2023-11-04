function guardar() {

    let email_ = document.getElementById('email').value
    let password_ = document.getElementById('password').value    

    let data =
    {   
        email: email_,
        password: password_        
    }
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-email':`${document.getElementById('email').value}`
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };
       
        fetch('/auth',request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => {
                console.log(error)
                reject(`[error]: ${error}`)
            
            });
    })
}

function iniciarSesion() {
    var mensaje = "";
    guardar()
        .then((response) => {
            const token = response.body.token
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/representante.html`;            
            document.cookie = `emailUser=${document.getElementById('email').value}; expires=${expirationDate.toUTCString()}; path=/representante.html`;            
            window.location.href = "/representante.html";
        })
        .catch((error) => {
            alert('Email o Password no existe');
        })

}


