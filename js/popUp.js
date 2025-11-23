import { generadorDeEstrellas } from "./index.js"
import { toggleFavorito, esFavorito } from "./favoritos.js"

const popUp = document.getElementById("pop-up-item")
const cerrarPopUp = document.getElementById("cerrar-pop")
const nombreItem = document.getElementById("nombre-item")
const categoriaItem = document.getElementById("categoria-item")
const descripcionTexto = document.getElementById("descriocion-texto")
const detalleFecha = document.getElementById("detalle-fecha")
const detallePrograma = document.getElementById("detalle-programa")
const detalleProtagonista = document.getElementById("detalle-protagonista")
const detalleImpacto = document.getElementById("detalle-impacto")
const detalleRating = document.getElementById("detalle-rating")
const detalleHashtag = document.getElementById("detalle-hashTag")
const videoPlayer = document.getElementById("video-player")
const botonFavorito = document.getElementById("boton-favorito")

let itemActualEnPopup = null

export function mostrarPopup(item) {
  popUp.classList.remove("oculto")

  nombreItem.textContent = item.Nombre
  categoriaItem.textContent = item.Categoria
  descripcionTexto.textContent = item.Descripcion
  detalleFecha.innerHTML = `<strong>Fecha/Año:</strong> ${item["personalizado_1.Fecha/Año"] || ""}`
  detallePrograma.innerHTML = `<strong>Programa/Canal:</strong> ${item["personalizado_2.Programa/Canal de emisión"] || ""}`
  detalleProtagonista.innerHTML = `<strong>Protagonistas:</strong> ${item["personalizado_3.Protagonistas"] || ""}`
  detalleImpacto.innerHTML = `<strong>Impacto/Popularidad:</strong> ${item["personalizado_4.Impacto/Popularidad"] || ""}`
  detalleHashtag.innerHTML = ` ${item["personalizado_5.Hashtags"] || ""}`
  detalleRating.innerHTML = `<strong>Puntuación:</strong> ${generadorDeEstrellas(item.Rating || 0)}`

  const videoId = item.Referencia?.split("v=")[1]?.split("&")[0]
  if (videoId) {
    videoPlayer.style.display = "block"
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
  } else {
    videoPlayer.style.display = "none"
    videoPlayer.src = ""
  }

  itemActualEnPopup = item.Id

  const esFav = esFavorito(item.Id)
  if (esFav) {
    botonFavorito.textContent = "Quitar de favoritos"
    botonFavorito.classList.add("activo")
  } else {
    botonFavorito.textContent = "Agregar a favoritos"
    botonFavorito.classList.remove("activo")
  }
}

botonFavorito.addEventListener("click", () => {
  if (!itemActualEnPopup) return

  toggleFavorito(itemActualEnPopup)

  const ahora_es_favorito = esFavorito(itemActualEnPopup)
  botonFavorito.textContent = ahora_es_favorito ? "Quitar de favoritos" : "Agregar a favoritos"
  botonFavorito.classList.toggle("activo", ahora_es_favorito)
})

cerrarPopUp.addEventListener("click", () => {
  popUp.classList.add("oculto")
  videoPlayer.src = ""
})
