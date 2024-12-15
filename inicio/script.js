document.addEventListener("DOMContentLoaded", () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyG6muqOuuaL0ZMxINAio_EwmalCFJ2PUXtI14Fs97EFrk2Rr_v2bFTBLXo7TjlPIUz/exec';
    const idClienteGuardado = localStorage.getItem("idcliente");

    // Referencias a elementos HTML
    const nombreApellidoHeader = document.getElementById("nombre-apellido");
    const idClienteElem = document.getElementById("id-cliente");
    const telefonoElem = document.getElementById("telefono");
    const emailElem = document.getElementById("email");
    const fechaInscripcionElem = document.getElementById("fecha-inscripcion");
    const qrImageElem = document.getElementById("qr-image"); // Nueva referencia
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
            const cliente = data.find(item => item.idcliente === idClienteGuardado);

            if (cliente) {
                // Mostrar los datos en la página
                nombreApellidoHeader.innerText = `${cliente.Nombre} ${cliente.Apellido}`;
                idClienteElem.innerText = cliente.idcliente;
                telefonoElem.innerText = cliente.Telefono;
                emailElem.innerText = cliente.Email;
                fechaInscripcionElem.innerText = new Date(cliente["Fecha de inscripcion"]).toLocaleDateString();

                // Mostrar el código QR
                qrImageElem.src = cliente.qr; // Asignar el enlace del QR al atributo src
                qrImageElem.alt = `QR para ${cliente.Nombre} ${cliente.Apellido}`;
            } else {
                alert("No se encontraron datos para este cliente.");
                window.location.href = "../index.html";
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert("Ocurrió un error al cargar los datos.");
        });

    // Cerrar sesión
    botonCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("idcliente");
        window.location.href = "../index.html";
    });
});
