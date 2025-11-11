//Efectos de items

const articulos= document.querySelectorAll(".articulo-categoria")
const categorias= document.querySelectorAll(".tab-categoria")

/*categorias.forEach(categoria =>{

})

articulos.forEach(art =>{

art.addEventListener("mouseover", ()=>{
  art.classList.add("articulo-categoria-hover")
})
art.addEventListener("mouseout",()=>{
  art.classList.remove("articulo-categoria-hover")
})
}
)*/
// Seleccionamos el contenedor principal que agrupa todos los artículos de categoría.
// Esto nos permite usar delegación de eventos, ya que los articulos se generan dinámicamente.
const contenedor = document.querySelector("#seccion-categoria");

// Enganchamos un listener para el evento 'mouseover' en el contenedor.
// Esto captura cualquier entrada del mouse sobre un artículo, incluso si fue creado después.
contenedor.addEventListener("mouseover", e => {
  
  // Usamos 'e.target.closest' para encontrar el elemento más cercano con la clase 'articulo-categoria'.
  // Esto garantiza que el efecto se aplique solo si el mouse está sobre un artículo válido.
  const art = e.target.closest(".articulo-categoria");

  // Si no se encontró ningún artículo (por ejemplo, el mouse está sobre un espacio vacío), salimos.
  if (!art) return;

  // Extraemos la parte de categoría del ID del artículo.
  // 'categoria02-item01' obtenemos 'categoria02'.
  const idCategoria = art.id.split("-")[0];

  // Construimos dinámicamente el nombre de la clase CSS que corresponde al efecto de esa categoría.

  art.classList.add(`hover-${idCategoria}`);
});

// Enganchamos otro listener para el evento 'mouseout', que se dispara cuando el mouse sale del artículo.
contenedor.addEventListener("mouseout", e => {

  // Nuevamente buscamos el artículo más cercano al que disparó el evento.
  const art = e.target.closest(".articulo-categoria");

  // Si no hay artículo válido, salimos.
  if (!art) return;

  // Extraemos la categoría del ID como antes.
  const idCategoria = art.id.split("-")[0];

  // Removemos la clase dinámica que se había agregado en el 'mouseover'.
  // Esto quita el efecto visual cuando el mouse se va.
  art.classList.remove(`hover-${idCategoria}`);
});