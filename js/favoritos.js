
import items from "/data/items.json" with { type: "json" }
import { mostrarPopup } from "./popUp.js"



export function getUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"))
  if (!usuario) return null
  if (!usuario.favoritos) {
    usuario.favoritos = []
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario))
  }
  return usuario
}

export function toggleFavorito(idItem) {
  const usuario = getUsuario()
  if (!usuario) {
    alert("Debes iniciar sesión para agregar favoritos.");
    window.location.href = "/html/login.html";
    return;
  }
  const index = usuario.favoritos.indexOf(idItem)
  if (index === -1) {
    usuario.favoritos.push(idItem)
  } else {
    usuario.favoritos.splice(index, 1)
  }

  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario))
  renderFavoritosPerfil()
}

export function esFavorito(idItem) {
  const usuario = getUsuario()
  if (!usuario) return false
  return usuario.favoritos.includes(idItem)
}

export function aplicarFavoritos() {
  const usuario = getUsuario()
  if (!usuario) return

  document.querySelectorAll(".articulo-categoria").forEach((articulo) => {
    const id = articulo.id
    const corazon = articulo.querySelector(".corazon")

    if (!corazon) return

    if (usuario.favoritos.includes(id)) {
      corazon.classList.add("activo")
      corazon.textContent = "♥"
    } else {
      corazon.classList.remove("activo")
      corazon.textContent = "♡"
    }
  })
}

export function renderFavoritosPerfil() {
  const contenedorFav = document.querySelector("#favoritos-menu .contenedor-favoritos")
  if (!contenedorFav) return

  contenedorFav.innerHTML = ""

  const usuario = getUsuario()
  if (!usuario || usuario.favoritos.length === 0) {
    contenedorFav.innerHTML = "<p>No tienes favoritos aún.</p>"
    return
  }

  usuario.favoritos.forEach((id) => {
    const item = items.find((i) => i.Id === id)
    if (!item) return

    const div = document.createElement("div")
    div.classList.add("favorito")
    div.innerHTML = `
      <article class="articulo-categoria" id="${item.Id}">
          <header class="header-articulo">
               <p class="item-valor-nombre"><span>Nombre</span> ${item.Nombre}</p>
               <img class="item-valor-portada" src="${item.Portada}" alt="${item.Nombre}">
               <p class="item-valor-descripcion"><span>Descripción</span> ${item.Descripcion}</p>
          </header>

          <div class="acciones-articulo">
               <button class="btn-quitar" data-id="${item.Id}">Quitar</button>
          </div>
      </article>
    `
    const articulo = div.querySelector(".articulo-categoria")
    articulo.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-quitar")) return;
      mostrarPopup(item);
    });

    contenedorFav.appendChild(div)
  })

  agregarEventosQuitarFavorito()
}
function agregarEventosQuitarFavorito() {

  document.querySelectorAll(".btn-quitar").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id

      toggleFavorito(id)

      renderFavoritosPerfil()

      aplicarFavoritos()
    })
  })
}

