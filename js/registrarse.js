document.addEventListener('DOMContentLoaded', () => {

const nombreUsuario = document.getElementById("nombreUsuario");
const email = document.getElementById("email");
const contrasenia = document.getElementById("contrasenia");
const confirmacionContrasenia = document.getElementById("confirmacionContrasenia");
const aceptoCondiciones = document.getElementById("acepto-condiciones");
const botonRegistro = document.getElementById("btn-registrar");

const errorNombreUsuario = document.getElementById("errorNombreUsuario");
const errorEmail = document.getElementById("errorEmail");
const errorContrasenia = document.getElementById("errorContrasenia");
const errorConfContrasenia = document.getElementById("errorConfContrasenia");
const mensajeError = document.getElementById("mensaje-error");

function mostrarError(campo, spanError, mensaje) {
  spanError.textContent = mensaje;
  spanError.style.display = "block";
  campo.classList.add("input-error");
}

function ocultarError(campo, spanError) {
  spanError.textContent = "";
  spanError.style.display = "none";
  campo.classList.remove("input-error");
}

function validarCamposObligatorios() {
    const nombreLleno = nombreUsuario.value !== "";
    const emailLleno = email.value !== "";
    const contraseniaLleno = contrasenia.value !== "";
    const confirmacionLleno = confirmacionContrasenia.value !== "";
    const casillaMarcada = aceptoCondiciones.checked; 

    const todoLleno = nombreLleno && emailLleno && contraseniaLleno && confirmacionLleno && casillaMarcada;

    const requisitoEmail = /^[^@\s]+@[^@\s]+\.(com|org|net)$/i;
    const esEmailValido = requisitoEmail.test(email.value.trim()); 
    
    const longitudContraseniaValida = contrasenia.value.length >= 8 && contrasenia.value.length <= 12; 
    const contraseniasCoinciden = contrasenia.value === confirmacionContrasenia.value; 
    
    const debeEstarHabilitado = todoLleno && esEmailValido && longitudContraseniaValida && contraseniasCoinciden;
    
    botonRegistro.disabled = !debeEstarHabilitado;
    botonRegistro.style.background = debeEstarHabilitado ? "#145222" : "grey";
}

function validarFormulario(event) {
  event.preventDefault();
  mensajeError.textContent = "";
  let valido = true;

  const nombreValor = nombreUsuario.value.trim();
    if (nombreValor === "") {
        mostrarError(nombreUsuario, errorNombreUsuario, "El nombre de usuario es obligatorio."); 
        valido = false;
    } else {
        ocultarError(nombreUsuario, errorNombreUsuario);
    }

  const emailValor = email.value.trim();
  const requisitoEmail = /^[^@\s]+@[^@\s]+\.(com|org|net)$/i;
  if (emailValor === "") {
        mostrarError(email, errorEmail, "El email es obligatorio");
    valido = false;
  } else if (!requisitoEmail.test(emailValor)) {
        mostrarError(email, errorEmail, "El formato del email no es válido (.com, .org o .net)");
    valido = false;
  } else {
        ocultarError(email, errorEmail);
  }

  const contraseniaValor = contrasenia.value;
  const requisitoContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
    if (contraseniaValor === "") {
        mostrarError(contrasenia, errorContrasenia, "La contraseña es obligatoria");
        valido = false;
    } else if (!requisitoContrasenia.test(contraseniaValor)) {
        mostrarError(contrasenia, errorContrasenia, "Debe tener 8-12 caracteres, una mayúscula, una minúscula, un número y un símbolo (#?!%$)");
        valido = false;
    } else {
        ocultarError(contrasenia, errorContrasenia);
    }

  const confirmValor = confirmacionContrasenia.value;
  if (confirmValor === "") {
       mostrarError(confirmacionContrasenia, errorConfContrasenia, "Debe confirmar la contraseña");
      valido = false;
  } else if (confirmValor !== contraseniaValor) {
        mostrarError(confirmacionContrasenia, errorConfContrasenia, "Las contraseñas no coinciden");
        valido = false;
  } else {
       ocultarError(confirmacionContrasenia, errorConfContrasenia);
  }

  if (!aceptoCondiciones.checked) {
        valido = false; 
    }

  if (valido) {
    alert("Registro exitoso");
    document.getElementById("registro-formulario").reset();
    validarCamposObligatorios();
  }
}

[nombreUsuario, email, contrasenia, confirmacionContrasenia].forEach(campo => {
  campo.addEventListener("input", validarCamposObligatorios);
});

botonRegistro.addEventListener("click", validarFormulario);

});


