import items from "/data/items.json" with { type: 'json' };

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
      <span class="texto-estrellas">${estrellas}</span>
    </div>
  `;
}


export function insertarCorazones() {
  document.querySelectorAll(".acciones-articulo").forEach(bloque => {
    const corazon = bloque.querySelector(".corazon");
    if (corazon && !corazon.dataset.listener) {
      corazon.addEventListener("click", () => {
        corazon.classList.toggle("activo");
        corazon.textContent = corazon.classList.contains("activo") ? "♥" : "♡";
      });
      corazon.dataset.listener = "true";
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

const popUp = document.getElementById("pop-up-item");
const cerrarPopUp = document.getElementById("cerrar-pop");
const nombreItem = document.getElementById("nombre-item");
const categoriaItem = document.getElementById("categoria-item");
const descripcionTexto = document.getElementById("descriocion-texto");
const detalleFecha = document.getElementById("detalle-fecha");
const detallePrograma = document.getElementById("detalle-programa");
const detalleProtagonista = document.getElementById("detalle-protagonista");
const detalleImpacto = document.getElementById("detalle-impacto");
const detalleRating = document.getElementById("detalle-rating");
const videoPlayer = document.getElementById("video-player");
const botonFavorito = document.getElementById("boton-favorito");

function mostrarPopup(item) {

  popUp.classList.remove("oculto");

  nombreItem.textContent = item.Nombre;
  categoriaItem.textContent = item.Categoria;
  descripcionTexto.textContent = item.Descripcion;
  detalleFecha.innerHTML = `<strong>Fecha/Año:</strong> ${item["personalizado_1.Fecha/Año"] || ""}`;
  detallePrograma.innerHTML = `<strong>Programa/Canal:</strong> ${item["personalizado_2.Programa/Canal de emisión"] || ""}`;
  detalleProtagonista.innerHTML = `<strong>Protagonistas:</strong> ${item["personalizado_3.Protagonistas"] || ""}`;
  detalleImpacto.innerHTML = `<strong>Impacto/Popularidad:</strong> ${item["personalizado_4.Impacto/Popularidad"] || ""}`;
  detalleRating.innerHTML = `<strong>Puntuación:</strong> ${generadorDeEstrellas(item.Rating || 0)}`;
 


  const videoId = item.Referencia?.split("v=")[1]?.split("&")[0];
  if (videoId) {
    videoPlayer.style.display = "block";
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else {
    videoPlayer.style.display = "none";
    videoPlayer.src = "";
  }
  
const articulo = document.getElementById(item.Id);
const corazon = articulo?.querySelector(".corazon");

if (corazon?.classList.contains("activo")) {
  botonFavorito.textContent = "Quitar de favoritos";
  botonFavorito.classList.add("activo");
} else {
  botonFavorito.textContent = "Agregar a favoritos";
  botonFavorito.classList.remove("activo");
}
nombreItem.dataset.id = item.Id;
}
botonFavorito.addEventListener("click", () => {
  const articulo = document.getElementById(nombreItem.dataset.id);
  const corazon = articulo?.querySelector(".corazon");

  if (!corazon) return;

  corazon.classList.toggle("activo");
  const activo = corazon.classList.contains("activo");

  corazon.textContent = activo ? "♥" : "♡";
  botonFavorito.textContent = activo ? "Quitar de favoritos" : "Agregar a favoritos";
  botonFavorito.classList.toggle("activo", activo);
});
cerrarPopUp.addEventListener("click", () => {
  popUp.classList.add("oculto");
  videoPlayer.src = "";
});


contenedor.addEventListener("click", e => {
  const header = e.target.closest(".header-articulo");
  const acciones = e.target.closest(".acciones-articulo");

  if (acciones) return;

  if (!header) return;

  const articulo = header.closest(".articulo-categoria");
  if (!articulo) return;

  const id = articulo.id;
  const item = items.find(i => i.Id === id);
  if (!item) return;

  mostrarPopup(item);
});