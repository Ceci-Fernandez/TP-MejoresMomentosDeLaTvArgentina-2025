import items from "/data/items.json" with { type: 'json' };


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


export function generadorDeEstrellas(rating) {
  rating = parseInt(rating);
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    estrellas += `<span class="${i <= rating ? 'llena' : 'vacia'}">★</span>`;
  }
  return `
    <div class="rating-contenedor">
      <span class="texto-rating">${rating}</span>
      <span class="texto-estrellas">${estrellas}</span>
    </div>
  `;
}

export function insertarCorazones() {
  document.querySelectorAll(".item-valor-nombre").forEach(item => {
    if (!item.querySelector(".corazon")) {
      const corazon = document.createElement("span");
      corazon.classList.add("corazon");
      corazon.textContent = "♡";
      item.appendChild(corazon);

      corazon.addEventListener("click", () => {
        corazon.classList.toggle("activo");
        corazon.textContent = corazon.classList.contains("activo") ? "♥" : "♡";
      });
    }
  });
}

export function insertarEstrellas() {
  const elementosRating = document.querySelectorAll('.item-valor-rating');
  elementosRating.forEach((elemento, index) => {
    const item = items[index];
    if (item && item.Rating) {
      elemento.innerHTML = generadorDeEstrellas(item.Rating);
    }
  });
}

export function refrescarDecoraciones() {
  insertarCorazones();
  insertarEstrellas();
}

refrescarDecoraciones();
