document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showLogin = document.getElementById("show-login");
    const showRegister = document.getElementById("show-register");
    const barraProgreso = document.getElementById("barraProgreso");
    const barra = document.getElementById("barra");
    const porcentaje = document.getElementById("porcentaje");

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzd-C_nsmMreTVkRVrIKDI87tOelcTpKoLdUXnb2ubIk2OMbmMut8QNYmHfGm9YQwE/exec';

    // **Establecer estado inicial**
    loginForm.classList.remove("hidden"); // Mostrar formulario de inicio
    registerForm.classList.add("hidden"); // Ocultar formulario de registro
    showLogin.classList.add("hidden"); // Ocultar botón de inicio
    showRegister.classList.remove("hidden"); // Mostrar botón de registro

    // Alternar formularios
    showLogin.addEventListener("click", () => {
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        showLogin.classList.add("hidden");
        showRegister.classList.remove("hidden");
    });

    showRegister.addEventListener("click", () => {
        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        showRegister.classList.add("hidden");
        showLogin.classList.remove("hidden");
    });

    // Mostrar barra de progreso
    function mostrarBarraProgreso() {
        barraProgreso.classList.remove("hidden");
        barra.style.width = "0%";
        porcentaje.innerText = "0%";

        // Bloquear la interfaz
        document.body.classList.add('disabled');
    }

    function actualizarBarraProgreso(progreso) {
        barra.style.width = `${progreso}%`;
        porcentaje.innerText = `${progreso}%`;
    }

    // Simulación de progreso
    function simularProgreso(completadoCallback) {
        let progreso = 0;
        const interval = setInterval(() => {
            progreso += 10;
            actualizarBarraProgreso(progreso);
            if (progreso >= 100) {
                clearInterval(interval);
                setTimeout(completadoCallback, 300); // Esperar 300ms después de completar la barra
            }
        }, 500); // Avanzar cada 500ms
    }

    // Enviar registro
    document.getElementById("registerForm").addEventListener("submit", (event) => {
        event.preventDefault();
        mostrarBarraProgreso();

        const formData = new FormData(event.target);

        // Agregar los campos del formulario con los nombres correspondientes
        formData.append("idcliente", formData.get("idcliente"));
        formData.append("nombre", formData.get("nombre"));
        formData.append("apellido", formData.get("apellido"));
        formData.append("telefono", formData.get("telefono"));
        formData.append("email", formData.get("email"));
        formData.append("fecha_inscripcion", formData.get("fecha_inscripcion"));
        formData.append("password", formData.get("password"));

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    simularProgreso(() => {
                        alert("Registro exitoso. Ahora puedes iniciar sesión.");
                        localStorage.setItem("usuario", formData.get("email")); // Guardar email en localStorage
                        localStorage.setItem("idcliente", formData.get("idcliente")); // Guardar idcliente en localStorage
                        showLogin.click();
                        
                        // Eliminar el efecto de opacación y habilitar la interacción
                        document.body.classList.remove('disabled');
                    });
                } else {
                    throw new Error("Error al registrar.");
                }
            })
            .catch(error => alert("Error: " + error.message));
    });

    // Enviar login
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        mostrarBarraProgreso();

        const formData = new FormData(event.target);

        // Agregar solo los campos necesarios para el login
        formData.append("email", formData.get("email"));
        formData.append("password", formData.get("password"));

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    simularProgreso(() => {
                        alert(`Bienvenido, ${data.nombre}`);
                        localStorage.setItem("usuario", data.nombre); // Guardar nombre en localStorage
                        localStorage.setItem("idcliente", data.idcliente); // Guardar idcliente en localStorage
                        window.location.href = "inicio/index.html";
                    });
                } else {
                    throw new Error(data.message || "Credenciales incorrectas.");
                }
            })
            .catch(error => alert("Error: " + error.message));
    });
});
