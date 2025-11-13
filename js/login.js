const formulario = document.getElementById("formulario-login");
const correoInput = document.getElementById("correo");
const contraseniaInput = document.getElementById("contrasenia");
const sesionBtn = document.getElementById("sesionBtn");

sesionBtn.disabled = true;
sesionBtn.style.cursor = "not-allowed";

function validarCorreo(correo) {
  const regular = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;
  return regular.test(correo);
}

function validarContrasenia(contrasenia) {
  const regular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
  return regular.test(contrasenia);
}

function verificarCampos() {
  const correoValido = validarCorreo(correoInput.value.trim());
  const contraseniaValida = validarContrasenia(contraseniaInput.value.trim());

  if (correoValido && contraseniaValida) {
    sesionBtn.disabled = false;
    sesionBtn.style.cursor = "pointer";
  } else {
    sesionBtn.disabled = true;
    sesionBtn.style.cursor = "not-allowed";
  }
}

function validarCampoIndividual(input, funcionValidacion, msjError) {

  const errorPrevio = input.nextElementSibling;
  if (errorPrevio && errorPrevio.classList.contains("error-texto")) {
    errorPrevio.remove();
  }

  const valor = input.value.trim();
  const esValido = funcionValidacion(valor);

  if (valor === "") {
    input.style.border = "2px solid red";
  } else if (!esValido) {
    input.style.border = "2px solid red";
    const p = document.createElement("p");
    p.classList.add("error-texto");
    p.textContent = msjError;
    input.insertAdjacentElement("afterend", p);
  } else {
    input.style.border = "2px solid green";
  }
}

correoInput.addEventListener("input", () => {
  validarCampoIndividual(
    correoInput,
    validarCorreo,
    "Ingrese un email válido (@, .com, .org o .net)"
  );
  verificarCampos();
});

contraseniaInput.addEventListener("input", () => {
  validarCampoIndividual(
    contraseniaInput,
    validarContrasenia,
    "La contraseña debe tener 8-12 caracteres, incluir mayúscula, minúscula, número y un símbolo (#?!%$)"
  );
  verificarCampos();
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!sesionBtn.disabled) {
    formulario.reset();
    sesionBtn.disabled = true;
    sesionBtn.style.cursor = "not-allowed";
    correoInput.style.border = "";
    contraseniaInput.style.border = "";
    document.querySelectorAll(".error-texto").forEach((e) => e.remove());
  }
});