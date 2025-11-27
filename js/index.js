
import items from "../data/items.json" with { type: "json" };
import { toggleFavorito, aplicarFavoritos, renderFavoritosPerfil } from "./favoritos.js";
import { mostrarPopup } from "./popUp.js";



/*generador de estrellas dinamicas*/

export function generadorDeEstrellas(rating) {
  rating = Number.parseInt(rating);
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    estrellas += `<span class="${i <= rating ? "llena" : "vacia"}">★</span>`;
  }
  return `
    <div class="rating-contenedor">
      <span class="texto-estrellas">${estrellas}</span>
    </div>
  `;
}

export function insertarEstrellas() {
  const elementosRating = document.querySelectorAll(".item-valor-rating");
  elementosRating.forEach((elemento, index) => {
    const item = items[index];
    if (item && item.Rating) {
      elemento.innerHTML = generadorDeEstrellas(item.Rating);
    }
  });
}

/*Generador de corazones dinamicos*/
export function insertarCorazones() {
  document.querySelectorAll(".acciones-articulo").forEach((bloque) => {
    const corazon = bloque.querySelector(".corazon");
    if (corazon && !corazon.dataset.listener) {
      corazon.addEventListener("click", () => {
        const articulo = corazon.closest(".articulo-categoria");
        if (articulo) {
          const id = articulo.id;
          toggleFavorito(id);
          corazon.classList.toggle("activo");
          corazon.textContent = corazon.classList.contains("activo") ? "♥" : "♡";
        }
      });
      corazon.dataset.listener = "true";
    }
  });
}


export function refrescarDecoraciones() {
  insertarCorazones();
  insertarEstrellas();
  aplicarFavoritos();
  renderFavoritosPerfil();
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("#seccion-categoria");
  if (!contenedor) return;

  contenedor.addEventListener("mouseover", (e) => {
    const art = e.target.closest(".articulo-categoria");
    if (!art) return;
    const idCategoria = art.id.split("-")[0];
    art.classList.add(`hover-${idCategoria}`);
  });

  contenedor.addEventListener("mouseout", (e) => {
    const art = e.target.closest(".articulo-categoria");
    if (!art) return;
    const idCategoria = art.id.split("-")[0];
    art.classList.remove(`hover-${idCategoria}`);
  });

  contenedor.addEventListener("click", (e) => {
    const header = e.target.closest(".header-articulo");
    const acciones = e.target.closest(".acciones-articulo");

    if (acciones) return;
    if (!header) return;

    const articulo = header.closest(".articulo-categoria");
    if (!articulo) return;

    const id = articulo.id;
    const item = items.find((i) => i.Id === id);
    if (!item) return;



    mostrarPopup(item);
  });

  refrescarDecoraciones();
});