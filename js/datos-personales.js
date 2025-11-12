document.addEventListener("DOMContentLoaded", () => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const tipo = document.getElementById("tipo");
  const documento = document.getElementById("documento");
  const fechaNacimiento = document.getElementById("fecha-nacimiento");
  const telefono = document.getElementById("telefono");
  const emailSecundario = document.getElementById("email-secundario");
  const btnGuardar = document.getElementById("btn-guardar");


  const validarEmail = (email) => {
    const regex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/; 
    return regex.test(email.trim());
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
    const validaciones = [
      validarNombreApellido(nombre.value),
      validarNombreApellido(apellido.value),
      validarTipo(tipo.value),
      validarDocumento(documento.value),
      validarEdad(fechaNacimiento.value),
      validarTelefono(telefono.value),
      validarEmail(emailSecundario.value),
    ];

    const todoValido = validaciones.every(Boolean);

    btnGuardar.disabled = !todoValido;
    btnGuardar.style.opacity = todoValido ? "1" : "0.5";
    btnGuardar.style.cursor = todoValido ? "pointer" : "not-allowed";
  };

  
  [nombre, apellido, tipo, documento, fechaNacimiento, telefono, emailSecundario]
    .forEach((campo) => campo.addEventListener("input", validarFormulario));

  btnGuardar.disabled = true;
  btnGuardar.style.opacity = "0.5";
  btnGuardar.style.cursor = "not-allowed";

  btnGuardar.addEventListener("click", (e) => {
    if (btnGuardar.disabled) e.preventDefault();
  });
});
