const seccionLogueado = document.getElementById("seccion-logueado");
const seccionSinLoguear = document.getElementById("seccion-sin-loguear");
const nombreUsuarioLogueado = document.getElementById("nombre-usuario-logueado");
const btnCerrarSesion = document.getElementById("boton-cerrar-sesion");

window.addEventListener("load", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        seccionSinLoguear.classList.remove("seccion-login");
        seccionSinLoguear.classList.add("invisible");
        nombreUsuarioLogueado.textContent = "Bienvenido: " + usuarioLogueado.nombre;
    } else {
        seccionLogueado.classList.remove("seccion-iconos-header");
        seccionLogueado.classList.add("invisible");
        
        const menuHamburguesa = document.getElementById("menu-hamburguesa-logueado");
        menuHamburguesa?.classList.add("invisible");


    }
})

btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "../index.html";
});

btnCerrarSesion.addEventListener("mouseover", () => {
    btnCerrarSesion.style.backgroundColor = "#00c46c";
}); 

btnCerrarSesion.addEventListener("mouseleave", () => {
    btnCerrarSesion.style.backgroundColor = "#145222";
}); 