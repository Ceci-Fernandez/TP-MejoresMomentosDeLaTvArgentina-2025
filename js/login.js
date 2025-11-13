const formulario = document.getElementById("login-formulario");
const emailInput = document.getElementById("correo");
const contraseniaInput = document.getElementById("contrasenia");
const btnSubmit = formulario.querySelector(".btn");
const campoErrorCorreo = document.getElementById("texto-error-correo");
const campoErrorContra = document.getElementById("texto-error-contrasenia");

btnSubmit.disabled = true;
btnSubmit.style.cursor = "not-allowed";


function validarEmail(email) {
  const regular = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;
  return regular.test(email);
}

function validarContrasenia(contrasenia) {
  const regular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
  return regular.test(contrasenia);
}

function verificarCampos() {
  const emailValido = validarEmail(emailInput.value.trim());
  const passValida = validarContrasenia(contraseniaInput.value.trim());

  if (emailValido && passValida) {
    btnSubmit.disabled = false;
    btnSubmit.style.cursor = "pointer";
  } else {
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = "not-allowed";
  }
}

function validarCampoIndividual(input, funcionValidacion, mensajeError) {
  const valor = input.value.trim();
  const esValido = funcionValidacion(valor);

  let error = input.nextElementSibling;
  if (error && error.classList.contains("error-texto")) {
    error.remove();
  }

  if (valor === "") {
    input.style.border = "2px solid red";
  } else if (!esValido) {
    input.style.border = "2px solid red";
    const span = document.createElement("span");
    span.classList.add("error-texto");
    span.textContent = mensajeError;
    input.insertAdjacentElement("afterend", span);
  } else {
    input.style.border = "2px solid green";
  }
}

emailInput.addEventListener("input", () => {
  validarCampoIndividual(
    emailInput,
    validarEmail,
    "Email inválido. Debe tener @ y terminar en .com, .org o .net"
  );
  verificarCampos();
});

contraseniaInput.addEventListener("input", () => {
  validarCampoIndividual(
    contraseniaInput,
    validarContrasenia,
    "Debe tener 8-12 caracteres, mayúscula, minúscula, número y símbolo (#?!%$)"
  );
  verificarCampos();
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!btnSubmit.disabled) {
    formulario.reset();

    // reset visual
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = "not-allowed";
    emailInput.style.border = "";
    contraseniaInput.style.border = "";
    document.querySelectorAll(".error-texto").forEach((e) => e.remove());
  }
});