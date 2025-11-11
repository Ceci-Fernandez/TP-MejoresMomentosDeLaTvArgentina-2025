document.addEventListener("DOMContentLoaded", () => {

  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const tipo = document.getElementById("tipo");
  const documento = document.getElementById("documento");
  const fechaNacimiento = document.getElementById("fecha-nacimiento");
  const telefono = document.getElementById("telefono");
  const emailUsuario = document.getElementById("email-usuario");
  const emailSecundario = document.getElementById("email-secundario");
  const password = document.getElementById("password");
  const btnGuardar = document.querySelector(".btn");

 
  const validarEmail = (email) => {
    const regex = /^[\w.%+-]+@[\w.-]+\.(com|org|net)$/i;
    return regex.test(email.trim());
  };

  
  const validarPassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!%$])[A-Za-z\d#?!%$]{8,12}$/;
    return regex.test(pass);
  };

  
  const validarNombreApellido = (valor) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ' -]+$/;
    return regex.test(valor.trim());
  };

  
  const validarDocumento = (num) => /^\d+$/.test(num.trim());

  
  const validarTelefono = (tel) => /^[0-9()+\- ]*$/.test(tel.trim());

 
  const validarEdad = (fecha) => {
    if (!fecha) return false;
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    return edad > 16 || (edad === 16 && mes >= 0);
  };

  
  const validarTipo = (valor) => ["DNI", "CI", "PASAPORTE"].includes(valor);

  
  const validarFormulario = () => {
    const validaciones = [ validarNombreApellido(nombre.value),
      validarNombreApellido(apellido.value),
      validarTipo(tipo.value),
      validarDocumento(documento.value),
      validarEdad(fechaNacimiento.value),
      validarTelefono(telefono.value),
      validarEmail(emailUsuario.value),
      validarEmail(emailSecundario.value),
      validarPassword(password.value),
    ];

    const todoValido = validaciones.every(Boolean);

    btnGuardar.disabled = !todoValido;

    btnGuardar.style.opacity = todoValido ? "1" : "0.5";
    btnGuardar.style.cursor = todoValido ? "pointer" : "not-allowed";
  };

  
  [ nombre,
    apellido,
    tipo,
    documento,
    fechaNacimiento,
    telefono,
    emailUsuario,
    emailSecundario,
    password,
  ].forEach((campo) => campo.addEventListener("input", validarFormulario));

  
  btnGuardar.disabled = true;
  btnGuardar.style.opacity = "0.5";
  btnGuardar.style.cursor = "not-allowed";

  btnGuardar.addEventListener("click", (e) => {
    if (btnGuardar.disabled) e.preventDefault();
  });
});
