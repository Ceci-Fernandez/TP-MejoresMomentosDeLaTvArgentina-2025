const formulario = document.getElementById("registro-formulario");

const nombre = document.getElementById("usuario");
const email = document.getElementById("email");
const contrasenia = document.getElementById("contrasenia");
const confirmacionContrasenia = document.getElementById("confirmacionContrasenia");
const checkCondiciones = document.getElementById("acepto-condiciones");

const botonRegistrar = document.getElementById("btn-registrar");

botonRegistrar.disabled = true;

function validarEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;
  return reg.test(email);
}

function validarContrasenia(contrasenia) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
  return reg.test(contrasenia);
}

function validarConfirmacion(contrasenia, confirmacionContrasenia) {
  return contrasenia === confirmacionContrasenia && confirmacionContrasenia.trim() !== "";
}

function mostrarErrorDebajo(input, mensaje) {

  const errorPrevio = input.nextElementSibling;
  if (errorPrevio && errorPrevio.classList.contains("error-texto")) {
    errorPrevio.remove();
  }

  input.classList.add("input-error");
  input.classList.remove("input-ok");

  const p = document.createElement("p");
  p.classList.add("error-texto");
  p.textContent = mensaje;
  input.insertAdjacentElement("afterend", p);
}

function limpiarError(input) {

  const errorPrevio = input.nextElementSibling;
  if (errorPrevio && errorPrevio.classList.contains("error-texto")) {
    errorPrevio.remove();
  }

  input.classList.remove("input-error");
  input.classList.add("input-ok");

}

function validarCampoVacio(input) {
  if (input.value.trim() === "") {
    mostrarErrorDebajo(input, "Este campo es obligatorio");
    return false;
  }
  limpiarError(input);
  return true;
}

function validarTodo() {

  const nombreOk = validarCampoVacio(nombre);
  const emailOk = validarEmail(email.value.trim());
  const contraOk = validarContrasenia(contrasenia.value.trim());
  const confirmOk = validarConfirmacion(
    contrasenia.value.trim(),
    confirmacionContrasenia.value.trim()
  );
  const checkOk = checkCondiciones.checked;

  if (email.value.trim() !== "" && !emailOk) {
    mostrarErrorDebajo(
      email,
      "Ingrese un email válido (@ y termina en .com, .org o .net)"
    );
  } else if (emailOk) {
    limpiarError(email);
  }

  if (contrasenia.value.trim() !== "" && !contraOk) {
    mostrarErrorDebajo(
      contrasenia,
      "La contraseña debe tener 8-12 caracteres, mayúscula, minúscula, número y símbolo (#?!%$)"
    );
  } else if (contraOk) {
    limpiarError(contrasenia);
  }

  if (confirmacionContrasenia.value.trim() !== "" && !confirmOk) {
    mostrarErrorDebajo(
      confirmacionContrasenia,
      "Las contraseñas no coinciden"
    );
  } else if (confirmOk) {
    limpiarError(confirmacionContrasenia);
  }

  const todoCorrecto =
    nombreOk && emailOk && contraOk && confirmOk && checkOk;

  if (todoCorrecto) {
    botonRegistrar.disabled = false;
    
  } else {
    botonRegistrar.disabled = true;
    
  }
}


[nombre, email, contrasenia, confirmacionContrasenia].forEach(campo => {
  campo.addEventListener("input", validarTodo);
});

checkCondiciones.addEventListener("change", validarTodo);


formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  validarTodo();

  if (!botonRegistrar.disabled) {
    alert("Registro exitoso");

    formulario.reset();
    botonRegistrar.disabled = true;
    

    document.querySelectorAll(".error-texto").forEach(e => e.remove());
  }
});



