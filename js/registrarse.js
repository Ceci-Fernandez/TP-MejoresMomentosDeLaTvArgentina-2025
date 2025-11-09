
/* FORMULARIO 2: registrarse.html 
o Para los campos recuadrados en rojo se pide validar que no estén vacíos (carga obligatoria) 
o El botón REGISTRATE debe encontrarse deshabilitado (no responder al clic) mientras no se hayan 
completados TODOS los campos de carga obligatoria, y habilitarse una vez completados TODOS esos 
campos. En caso de que se borre el contenido en estos campos (nuevamente vacío), volver a 
deshabilitar el botón. 
o VALIDAR el contenido de los campos que se indican debajo: 
 EMAIL: formato válido de mail (un @ en el medio) y que termine con .com, .org o .net 
 CONTRASEÑA: longitud de al menos 8 y máxima de 12 caracteres, y que contenga al menos 
una mayúscula, una minúscula, un número, y cualquiera de los siguientes caracteres 
especiales: # ? ! % $ */

const nombreUsuario= document.getElementById("usuario")
const emailUsuario= document.getElementById("email")
const contraseniaUsuario= document.getElementById("contrasenia")
const confContrasenia= document.getElementById("confirmacionContrasenia")
const btnRegistro= document.getElementById("btn-registrar")
const mensajeError= document.getElementById("mensaje-error")


function validacionDeRegistro(){

//En una constante guardamos una validacion que nos devuelve true o false. si es que estan vacios o no.
    const campoNombreNoEstaVacio= nombreUsuario.value.trim()!==""
     const campoEmailNoEstaVacio= emailUsuario.value.trim()!==""
     const campoContraseniaNoEstaVacio=contraseniaUsuario.value.trim()!== ""
     const campoConfContraseniaNoEstaVacio=confContrasenia.value.trim()!== ""
      
     // Ahora validamos con un if si nos dio true o falso.
    const habilitado= campoNombreNoEstaVacio && campoEmailNoEstaVacio
     && campoContraseniaNoEstaVacio &&campoConfContraseniaNoEstaVacio
     
     btnRegistro.disable= !habilitado
     btnRegistro.style.background=!habilitado?"#145222" : "grey";

     btnRegistro.addEventListener("click", (event)=>{
        event.preventDefault()
        //validamos el nombre de usuario
        if(!campoNombreNoEstaVacio){
        nombreUsuario.classList.add("input-error")
        mensajeError.textContent="Por favor, complete este campo"
        }else if(!nombreVerificado){
         nombreUsuario.classList.add("input-error")
        mensajeError.textContent="Por favor, complete este campo"
        }else{
            nombreUsuario.classList.remove("input-error")
            mensajeError.textContent=""
        }
         // validamos el email del usario
        if(!emailUsuario){
        emailUsuario.classList.add("input-error")
        emailUsuario.textContent="Por favor, complete este campo"
        }else if(!emailValido){
           emailUsuario.classList.add("input-error")
        emailUsuario.textContent="Email con formato incorrecto."
        }{
             emailUsuario.classList.remove("input-error")
            mensajeError.textContent=""
        }
        if(!contraseniaUsuario){
        contraseniaUsuario.classList.add("input-error")
        contraseniaUsuario.textContent="Por favor, complete este campo"
        }else{
             contraseniaUsuario.classList.remove("input-error")
            mensajeError.textContent=""
        }
          if(!confContrasenia){
        confContrasenia.classList.add("input-error")
        confContrasenia.textContent="Por favor, complete este campo"
        }else{
             confContrasenia.classList.remove("input-error")
            mensajeError.textContent=""
        }
     })
    }
