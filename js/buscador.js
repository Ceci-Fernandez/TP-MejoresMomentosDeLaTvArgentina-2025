const inputBuscador = document.getElementById("buscador");
const items = document.querySelectorAll(".articulo-categoria");

inputBuscador.addEventListener("input", () => {
  const texto = inputBuscador.value.trim().toLowerCase();

  if (texto.length < 3) {
    items.forEach(item => item.style.display = "block");
    return;
  }

  items.forEach(item => {
    const nombre = item.querySelector(".item-valor-nombre").textContent.toLowerCase();
    const autor = item.querySelector(".item-valor-autor").textContent.toLowerCase();
    const descripcion = item.querySelector(".item-valor-descripcion").textContent.toLowerCase();

    const coincide =
      nombre.includes(texto) ||
      autor.includes(texto) ||
      descripcion.includes(texto);

    item.style.display = coincide ? "block" : "none";
  });
});