document.addEventListener("DOMContentLoaded", () => {
  const btnHamburguesa = document.getElementById("btnHamburguesa");
  const menuDesplegable = document.getElementById("menuDesplegable");
  const nombreUsuarioMenu = document.getElementById("nombreUsuarioMenu");
  const menuHamburguesa = document.getElementById("menu-hamburguesa-logueado");
  const btnCerrarSesionMenu = document.getElementById("btnCerrarSesionMenu");

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (usuarioLogueado && usuarioLogueado.nombre) {
    nombreUsuarioMenu.textContent = usuarioLogueado.nombre;
    menuHamburguesa.classList.remove("invisible");
  } else {
    menuHamburguesa.classList.add("invisible");
  }

  btnHamburguesa.addEventListener("click", () => {
    menuDesplegable.classList.toggle("invisible");
  });

  btnCerrarSesionMenu.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "/index.html";
  });
});