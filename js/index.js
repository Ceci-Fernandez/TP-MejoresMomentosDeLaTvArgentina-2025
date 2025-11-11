//Efectos de items

const articulos = document.querySelectorAll(".articulo-categoria")
const categorias = document.querySelectorAll(".tab-categoria")
const contenedor = document.querySelector("#seccion-categoria");

contenedor.addEventListener("mouseover", e => {

  const art = e.target.closest(".articulo-categoria");

  if (!art) return;

  const idCategoria = art.id.split("-")[0];

  art.classList.add(`hover-${idCategoria}`);
});

contenedor.addEventListener("mouseout", e => {

  const art = e.target.closest(".articulo-categoria");

  if (!art) return;

  const idCategoria = art.id.split("-")[0];

  art.classList.remove(`hover-${idCategoria}`);
});


//generador de estrellas.

