document.addEventListener("DOMContentLoaded", () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyG6muqOuuaL0ZMxINAio_EwmalCFJ2PUXtI14Fs97EFrk2Rr_v2bFTBLXo7TjlPIUz/exec';
    const idClienteGuardado = localStorage.getItem("idcliente");

 // Referencias a elementos HTML
const nombreApellidoHeader = document.getElementById("nombre-apellido");
const idClienteElem = document.getElementById("id-cliente");
const telefonoElem = document.getElementById("telefono");
const emailElem = document.getElementById("email");
const fechaInscripcionElem = document.getElementById("fecha-inscripcion");
const tipoMembresiaElem = document.getElementById("tipo-membresia"); // Nueva referencia
const fechaCuotaElem = document.getElementById("fecha-cuota"); // Nueva referencia
const vencimientoElem = document.getElementById("vencimiento"); // Nueva referencia
const qrImageElem = document.getElementById("qr-image");
const botonCerrarSesion = document.getElementById("cerrar-sesion");

// Redirigir si no hay un cliente guardado
if (!idClienteGuardado) {
    alert("Debes iniciar sesión primero.");
    window.location.href = "../index.html";
    return;
}

// Obtener datos desde Google Apps Script
fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verifica los datos recibidos
        const cliente = data.find(item => item.idcliente === idClienteGuardado);

        if (cliente) {
            // Mostrar los datos en la página
            nombreApellidoHeader.innerText = `${cliente.Nombre} ${cliente.Apellido}`;
            idClienteElem.innerText = cliente.idcliente;
            telefonoElem.innerText = cliente.Telefono;
            emailElem.innerText = cliente.Email;
            fechaInscripcionElem.innerText = new Date(cliente["Fecha de inscripcion"]).toLocaleDateString();
            tipoMembresiaElem.innerText = cliente["Tipo de membresia"];
            fechaCuotaElem.innerText = cliente["Fecha de cuota"];
            vencimientoElem.innerText = new Date(cliente.Vencimiento).toLocaleDateString();

            // Mostrar el código QR
            qrImageElem.src = cliente.qr;
        } else {
            alert("Cliente no encontrado.");
            window.location.href = "../index.html";
        }
    })
    .catch(error => {
        console.error("Error al obtener los datos del cliente:", error);
        alert("Hubo un error al obtener los datos del cliente.");
    });


    // Cerrar sesión
    botonCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("idcliente");
        window.location.href = "/index.html"; // Actualizar la ruta
    });
});
