const formulario = document.getElementById("formulario-login");
const correoInput = document.getElementById("correo");
const contraseniaInput = document.getElementById("contrasenia");
const sesionBtn = document.getElementById("sesionBtn");

const correoError = document.getElementById("texto-error-correo");
const contraseniaError = document.getElementById("texto-error-contrasenia");

sesionBtn.disabled = true;
sesionBtn.style.opacity = "0.6";
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
    sesionBtn.style.opacity = "1";
    sesionBtn.style.cursor = "pointer";
  } else {
    sesionBtn.disabled = true;
    sesionBtn.style.opacity = "0.6";
    sesionBtn.style.cursor = "not-allowed";
  }
}

function validarCampoIndividual(input, funcionValidacion, msjError, contenedorError) {
  contenedorError.innerHTML = "";

  const valor = input.value.trim();
  const esValido = funcionValidacion(valor);

  if (valor === "") {
    input.style.border = "2px solid red";
  } else if (!esValido) {
    input.style.border = "2px solid red";

    const p = document.createElement("p");
    p.classList.add("error-texto");
    p.textContent = msjError;
    contenedorError.appendChild(p);

  } else {
    input.style.border = "1px solid var(--light-color-acento-1)";
  }
}

correoInput.addEventListener("input", verificarCampos);
contraseniaInput.addEventListener("input", verificarCampos);

correoInput.addEventListener("blur", () => {
  validarCampoIndividual(
    correoInput, validarCorreo, "Ingrese un email válido (@, .com, .org o .net)",
    correoError
  );
});

contraseniaInput.addEventListener("blur", () => {
  validarCampoIndividual(
    contraseniaInput, validarContrasenia, "La contraseña debe tener 8-12 caracteres, incluir mayúscula, minúscula, número y un símbolo (#?!%$)",
    contraseniaError
  );
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  validarLogin(correoInput.value , contraseniaInput.value);
});

function validarLogin(correo, contrasenia){ //Despues corregir las key para que funcione bien con las que estan en el REGISTRAR
  // const correoGuardado = localStorage.getItem("correo"); 
  // const contraseniaGuardada = localStorage.getItem("contrasenia");
  const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if(correo === usuarioRegistrado.correo && contrasenia === usuarioRegistrado.contrasenia){
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioRegistrado));
    window.location.href = "/index.html";
    
  }
  else{
    alert("Los datos ingresados son incorrectos.");
  }
}

//Para probar que la funcion validarLogin funcione correctamente
function probarLocalStorage(){
  const usuario = {correo: "a@a.com", contrasenia: "Melina2025#", nombre: "Melina"}
  localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
  //localStorage.setItem("correo", "a@a.com");
  //localStorage.setItem("contrasenia", "Melina2025#");
}

probarLocalStorage();