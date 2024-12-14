// Obtener el nombre del usuario desde localStorage
const usuario = localStorage.getItem("usuario");

// Mostrar el nombre del usuario en la página
document.getElementById("usuario").textContent = usuario;

// Agregar un evento al botón de cerrar sesión
const cerrarSesionBtn = document.getElementById("cerrarSesion");
cerrarSesionBtn.addEventListener("click", () => {
    // Eliminar el usuario de localStorage
    localStorage.removeItem("usuario");

    // Redirigir a la página de inicio
    window.location.href = "../index.html";
});