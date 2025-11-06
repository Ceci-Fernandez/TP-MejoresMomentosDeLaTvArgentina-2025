/* Para los campos recuadrados en rojo se pide validar que no estén vacíos (carga obligatoria) 
o El botón INICIAR SESIÓN debe encontrarse deshabilitado (no responder al clic) mientras no se hayan 
completados TODOS los campos de carga obligatoria, y habilitarse una vez completados TODOS esos 
campos. En caso de que se borre el contenido en estos campos (nuevamente vacío), volver a 
deshabilitar el botón. 
o VALIDAR el contenido de los campos que se indican debajo: 
 EMAIL: formato válido de mail (un @ en el medio) y que termine con .com, .org o .net 
 CONTRASEÑA: longitud de al menos 8 y máxima de 12 caracteres, y que contenga al menos 
una mayúscula, una mi*/

//creamos un mensaje generico de errores de usuario para reutilizar
const mensajeError = document.getElementById("error-usuario")

const usuario = document.getElementById("usuario")
const contrasenia = document.getElementById("contrasenia")
const errorUsuario = document.getElementById("error-usuario")
const errorContrasenia = document.getElementById("error-contrasenia")

const btn_iniciar_sesion = document.getElementById("btn-inicio-sesion")
btn_iniciar_sesion.disabled = true;
btn_iniciar_sesion.style.background = "grey";



/*
function validacionCampos(input, mensajeElemento, mensajeTexto) {

    //VALIDACION DE INPUTS USUARIO

    // obtenemos el valor del input, que definimos como usuario y le aplicamos la funcion trim()
    //que quita los espacios vacios entre letras. y preguntamos si esta vacio.
    if (input.value.trim() === "") {
        // Si esta vacio, se lanza el mensaje de error.
        input.classList.add("input-error");
        mensajeElemento.textContent = mensajeTexto
        return false
    } else {
        input.classList.remove("input-error")
        mensajeElemento.textContent = "";
        return true;
    }
}

usuario.addEventListener("input", () => {
    validacionCampos(usuario, errorUsuario, "Por favor, ingrese su usuario.")
})

contrasenia.addEventListener("input", () => {
    validacionCampos(contrasenia, errorContrasenia, "Por favor, ingrese su contraseña.")
})*/
/*function validarTodo() {
    const usuarioValido = validacionCampos(usuario, errorUsuario, "Por favor, ingrese su usuario.");
    const contraseniaValida = validacionCampos(contrasenia, errorContrasenia, "Por favor, ingrese su contraseña.");

    btn_iniciar_sesion.disabled = !(usuarioValido && contraseniaValida);
    const habilitado = usuarioValido && contraseniaValida
    btn_iniciar_sesion.disabled = !habilitado
    btn_iniciar_sesion.style.background = habilitado ? "#145222" : "grey"
}

usuario.addEventListener("input", validarTodo)
contrasenia.addEventListener("input", validarTodo)
*/
//VALIDACIÓN DE EMAIL:
// formato válido de mail (un @ en el medio) y que termine con .com, .org o .net 
function validarEmailCorrecto(email) {
    const valor = email.value.trim()
    return valor.includes("@") &&
        (valor.endsWith(".com") || valor.endsWith(".org") || valor.endsWith(".net"));
}
//CONTRASEÑA: longitud de al menos 8 y máxima de 12 caracteres, y que contenga al menos 
//una mayúscula, una minuscula*
function validarContrasenia(contrasenia) {
    const valor = contrasenia.value.trim()
    const longitudValida = valor.length >= 8 && valor.length <= 12
    const contieneMayuscula = /[A-Z]/.test(valor)
    const contieneMinuscula = /[a-z]/.test(valor)
    return longitudValida && contieneMayuscula && contieneMinuscula
}
function validarInicioSesion() {
    const email = usuario.value.trim()
    const psw = contrasenia.value.trim()

    const usuarioNoEstaVacio = email !== ""
    const contraseniaNoEstaVacio = psw !== ""

    const emailValido = validarEmailCorrecto(usuario)
    const contraseniaValida = validarContrasenia(contrasenia)


    // validamos que el email no este vacio y tenga el formato que corresponde

    const habilitado = usuarioNoEstaVacio && contraseniaNoEstaVacio
    btn_iniciar_sesion.disabled = !habilitado
    btn_iniciar_sesion.style.background = habilitado ? "#145222" : "grey";

    btn_iniciar_sesion.addEventListener("click", (event) => {
        event.preventDefault();

        if (!usuarioNoEstaVacio) {
            errorUsuario.textContent = "Por favor, ingrese un usuario"
            usuario.classList.add("input-error");

        } else if (!emailValido) {
            errorUsuario.textContent = "El formato del email es invalido."
            usuario.classList.add("input-error")
        } else {
            errorUsuario.textContent = ""
            usuario.classList.remove("input-error")
        }
        //validamos la contrasenia
        if (!contraseniaNoEstaVacio) {
            errorContrasenia.textContent = "Por favor, ingrese una contraseña.";
            contrasenia.classList.add("input-error");
        } else if (!contraseniaValida) {
            errorContrasenia.textContent = "Formato de contraseña inválido.";
            contrasenia.classList.add("input-error");
        } else {
            errorContrasenia.textContent = "";
            contrasenia.classList.remove("input-error");
        }
    })

    const todoCorrecto = usuarioNoEstaVacio && contraseniaNoEstaVacio
   && emailValido && contraseniaValida;
  if (todoCorrecto) {
    window.location.href = "/html/datos-personales.html"; 
  }
}
usuario.addEventListener("input", validarInicioSesion)
contrasenia.addEventListener("input", validarInicioSesion)

usuario.addEventListener("focus", () => {
  errorUsuario.textContent = "";
  usuario.classList.remove("input-error");
});

contrasenia.addEventListener("focus", () => {
  errorContrasenia.textContent = "";
  contrasenia.classList.remove("input-error");
});

  



