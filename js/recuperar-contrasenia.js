/* Para los campos recuadrados en rojo se pide validar que no estén vacíos (carga obligatoria) 
o El botón CONTINUAR debe encontrarse deshabilitado (no responder al clic) mientras no se hayan 
completados TODOS los campos de carga obligatoria, y habilitarse una vez completados TODOS esos 
campos. En caso de que se borre el contenido en estos campos (nuevamente vacío), volver a 
deshabilitar el botón. 
o VALIDAR el contenido de los campos que se indican debajo: 
 EMAIL: formato válido de mail (un @ en el medio) y que termine con .com, .org o .net */

document.addEventListener("DOMContentLoaded", () => {
    const email = document.getElementById("email");
    const captchaCheck = document.getElementById("captcha-check");
    const btnRecuperar = document.getElementById("btn-recuperar");
    const mensajeExito = document.getElementById("mensaje_exito")

    const errorEmail = document.getElementById("error-email");
    const errorCaptcha = document.getElementById("error-captcha");

    function validacionDeFormatoEmail(correo) {
        const formatoCorrecto = /^[^\s@]+@[^\s@]+\.(com|org|net)$/i;
        return formatoCorrecto.test(correo);
    }


    function actualizarEstadoBoton() {
        const emailVal = email.value.trim();
        btnRecuperar.disabled = emailVal === "";
        btnRecuperar.classList.toggle("btn_recuperar--activo", emailVal !== "");
    }


    email.addEventListener("blur", () => {
        const emailVal = email.value.trim();
        if (emailVal !== "" && !validacionDeFormatoEmail(emailVal)) {
            errorEmail.textContent = "Por favor, ingrese un correo válido";
            email.classList.add("input-error");
        }
    });


    email.addEventListener("input", () => {
        const emailVal = email.value.trim();
        if (validacionDeFormatoEmail(emailVal)) {
            errorEmail.textContent = "";
            email.classList.remove("input-error");
        }
        actualizarEstadoBoton();
    });


    btnRecuperar.addEventListener("click", (event) => {
        event.preventDefault();

        const emailVal = email.value.trim();
        const captchaMarcado = captchaCheck.checked;

        let hayError = false;


        if (!validacionDeFormatoEmail(emailVal)) {
            errorEmail.textContent = "Por favor, ingrese un correo válido.";
            email.classList.add("input-error");
            hayError = true;
        } else {
            errorEmail.textContent = "";
            email.classList.remove("input-error");
        }


        if (!captchaMarcado) {
            errorCaptcha.textContent = "Por favor, confirme que no es un robot.";
            captchaCheck.classList.add("input-error");
            hayError = true;
        } else {
            errorCaptcha.textContent = "";
            captchaCheck.classList.remove("input-error");
        }

        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));
        const existeCorreo = usuarioGuardado && usuarioGuardado.email === emailVal;

        if (!existeCorreo) {
            errorEmail.textContent = "Ese correo no está registrado.";
            email.classList.add("input-error");
            hayError = true;
        }

        function limpiarFormulario() {
            email.value = "";
            captchaCheck.checked = false;
            btnRecuperar.disabled = true;
            btnRecuperar.classList.remove("btn_recuperar--activo");

            errorEmail.textContent = "";
            errorCaptcha.textContent = "";

            email.classList.remove("input-error");
            captchaCheck.classList.remove("input-error");

            mensajeExito.classList.add("mensaje_exito")
            mensajeExito.textContent = "El requerimiento fue exitoso. Enviamos las instrucciones a tu casilla de correo."

        }

        if (!hayError) {
            limpiarFormulario();
        }
    });


    btnRecuperar.disabled = true;
});