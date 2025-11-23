import { renderFavoritosPerfil } from "./favoritos.js";

document.addEventListener("DOMContentLoaded", function () {
  var menuLinks = document.querySelectorAll(".menu-lista li");
  var secciones = document.querySelectorAll(".opcion-menu");
  var emailUsuario = document.getElementById("email-usuario");
  var passwordUsuario = document.getElementById("password");
  var btnCambiar = document.getElementById("btn-cambiar");
  var nombre = document.getElementById("nombre");
  var apellido = document.getElementById("apellido");
  var tipo = document.getElementById("tipo");
  var documento = document.getElementById("documento");
  var fechaNacimiento = document.getElementById("fecha-nacimiento");
  var telefono = document.getElementById("telefono");
  var btnGuardar = document.getElementById("btn-guardar");
  var emailSecundario = document.getElementById("email-secundario");

  secciones[0].classList.add("activo");
  secciones[1].classList.add("hide");
  secciones[2].classList.add("hide");
  menuLinks[0].classList.add("activo"); 

  for (var i = 0; i < menuLinks.length; i++) { 
    menuLinks[i].addEventListener("click", function (e) {
      e.preventDefault();
      var target = this.querySelector("a").getAttribute("data-target");
      
     
      for (var j = 0; j < secciones.length; j++) {
        secciones[j].classList.remove("activo");
        secciones[j].classList.add("hide");
      }
      
      
      var secciontarget = document.getElementById(target);
      if (secciontarget) {
        secciontarget.classList.add("activo");
        secciontarget.classList.remove("hide");
      }
      
      
      var menuItems = document.querySelectorAll(".menu-lista li");
      for (var k = 0; k < menuItems.length; k++) {
        menuItems[k].classList.remove("activo");
      }
      this.classList.add("activo");
    });
  }

  function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.(com|org|net)$/;
    return regex.test(email.trim());
  }

  function validarPassword(pass) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$]).{8,12}$/;
    return regex.test(pass);
  }

  function soloLetras(txt) {
    var regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ' -]+$/;
    return regex.test(txt.trim());
  }

  function soloNumeros(txt) {
    var regex = /^[0-9]+$/;
    return regex.test(txt.trim());
  }

  function validarTelefono(txt) {
    var regex = /^[0-9()+\- ]*$/;
    return regex.test(txt.trim());
  }

  function validarEdad(fecha) {
    if (!fecha) return false;
    var nacimiento = new Date(fecha);
    var hoy = new Date();
    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var cumple = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    return edad > 16 || (edad === 16 && hoy >= cumple);
  }

  function mostrarError(input, mensaje) {
    eliminarError(input);
    if (mensaje) {
      var span = document.createElement("span");
      span.classList.add("mensaje-error");
      span.textContent = mensaje;
      input.insertAdjacentElement("afterend", span);
      input.classList.add("invalido");
      input.classList.remove("valido");
    } else {
      input.classList.add("valido");
      input.classList.remove("invalido");
    }
  }

  function eliminarError(input) {
    var siguiente = input.nextElementSibling;
    if (siguiente && siguiente.classList.contains("mensaje-error")) {
      siguiente.remove();
    }
  }

  function validarMiUsuario() {
    var emailValido = validarEmail(emailUsuario.value);
    var passValida = validarPassword(passwordUsuario.value);
    mostrarError(emailUsuario, emailValido ? "" : "Email inválido");
    mostrarError(passwordUsuario, passValida ? "" : "Contraseña inválida (8-12 carac., mayús., minús., número y #?!%$)");
    btnCambiar.disabled = !(emailValido && passValida);
  }

  function validarDatosPersonales() {
    var nombreValido = soloLetras(nombre.value);
    var apellidoValido = soloLetras(apellido.value);
    var tipoValido = ["DNI", "CI", "PASAPORTE"].includes(tipo.value);
    var docValido = soloNumeros(documento.value);
    var edadValida = validarEdad(fechaNacimiento.value);
    var telValido = validarTelefono(telefono.value);
    var emailValido = validarEmail(emailSecundario.value);

    mostrarError(nombre, nombreValido ? "" : "Solo letras, espacios o guiones.");
    mostrarError(apellido, apellidoValido ? "" : "Solo letras, espacios o guiones.");
    mostrarError(tipo, tipoValido ? "" : "Debe seleccionar DNI, CI o PASAPORTE.");
    mostrarError(documento, docValido ? "" : "Solo números.");
    mostrarError(fechaNacimiento, edadValida ? "" : "Debe tener al menos 16 años.");
    mostrarError(telefono, telValido ? "" : "Formato inválido.");
    mostrarError(emailSecundario, emailValido ? "" : "Email inválido");

    btnGuardar.disabled = !(nombreValido && apellidoValido && tipoValido && docValido && edadValida && telValido && emailValido);
  }

  emailUsuario.addEventListener("input", validarMiUsuario);
  passwordUsuario.addEventListener("input", validarMiUsuario);
  nombre.addEventListener("input", validarDatosPersonales);
  apellido.addEventListener("input", validarDatosPersonales);
  tipo.addEventListener("input", validarDatosPersonales);
  documento.addEventListener("input", validarDatosPersonales);
  fechaNacimiento.addEventListener("input", validarDatosPersonales);
  telefono.addEventListener("input", validarDatosPersonales);
  emailSecundario.addEventListener("input", validarDatosPersonales);

  btnCambiar.disabled = true;
  btnGuardar.disabled = true;

  var style = document.createElement("style");
  style.textContent = `
    .menu-lista li.activo {
      background-color: var(--dark-color-acento-2);
      color: #fff;
      font-weight: bold;
      border-radius: 6px;
    }
    input.invalido {
      border: 2px solid #dc3545;
      background-color: #fdeaea;
    }
    .mensaje-error {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 2px;
      display: block;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);

  renderFavoritosPerfil();

});
