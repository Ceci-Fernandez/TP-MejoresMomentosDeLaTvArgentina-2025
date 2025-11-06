import items from "/data/items.json" with { type: 'json' };

const imagenesPorCategoria = {};

items.forEach(item => {
    const categoria = item.Categoria;
    const portada = item.Portada;

    if (!imagenesPorCategoria[categoria]) {
        imagenesPorCategoria[categoria] = portada;
    }

});
const imagenesDelSlider = Object.values(imagenesPorCategoria);

const imagenSlider = document.getElementById("img-carrousel");
const flechaIzquierda = document.getElementById("flecha-izquierda");
const flechaDerecha = document.getElementById("flecha-derecha");
let indiceActual = 0;


function actualizacionCarrousel() {
    imagenSlider.src = imagenesDelSlider[indiceActual]

    const circulitos = document.querySelectorAll(".circulo-carrousel")
    circulitos.forEach((circulo, index) => {
        if (index === indiceActual) {
            circulo.classList.remove("fa-regular")
            circulo.classList.add("fa-solid");
        } else {
            circulo.classList.remove("fa-solid");
            circulo.classList.add("fa-regular");
        }
    })
}
function carrousel(){
    actualizacionCarrousel()

    setInterval(() => {
        indiceActual = (indiceActual + 1) % imagenesDelSlider.length;
         actualizacionCarrousel()
    }, 3000);
    flechaDerecha.addEventListener("click", () => {
        indiceActual = (indiceActual + 1) % imagenesDelSlider.length;
         actualizacionCarrousel()
    })
    flechaIzquierda.addEventListener("click", () => {
        indiceActual = (indiceActual - 1 + imagenesDelSlider.length) % imagenesDelSlider.length;
         actualizacionCarrousel()
    })
    
}

carrousel();


/*estrellas -ranking*/

const elementosRating = document.querySelectorAll('.item-valor-rating');
function generadorDeEstrellas(rating) {
  rating = parseInt(rating);
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    estrellas += `<span class="${i <= rating ? 'llena' : 'vacia'}">★</span>`;
  }
  return `<span class="texto-rating">${rating}</span> ${estrellas}`;
}
  elementosRating.forEach((elemento, index) => {
  const item = items[index];
  if (item && item.Rating) {
    elemento.innerHTML = generadorDeEstrellas(item.Rating);
  }
  })

  /*efectos en items*/
const articulos = document.querySelectorAll('.articulo-categoria');

articulos.forEach(articulo => {
  articulo.addEventListener('click', () => {
    if (articulo.classList.contains('seleccionado')) {
      articulo.classList.remove('seleccionado');
    } else {  
      articulos.forEach(a => a.classList.remove('seleccionado'));
      articulo.classList.add('seleccionado');
    }
  });
});

/*buscador/filtro*/
// 1) guardamos en una variable el input
const buscador= document.getElementById("buscador")
const resultados= document.getElementById("seccion-filtros")
//2) usamos esa variable para agregarle un escuchador de evento.Usamos input y le pedirmos que ejecute una funcion. 
buscador.addEventListener("input",function(){
//3) convertirmos todo el texto a minuscula para no tener problemas
   const texto= buscador.value.toLowerCase();
//4) limpiamos la variable cada vez que se escriba algo. Esto es para que no se junten los resultados de cada busqueda.
  resultados.innerHTML="";

   //5)verificamos qe para que se ejecute la accion , primero se ingresen mas de 3 letras, si es menos no se ejecuta.
   if(texto.length < 3) return;

//6) recorremos el objeto items y por cada uno,tomamos el nombre, descripcion y
//  autor y los convertimos a minuscula.En cada constante hacemos una validacion.
//  (si existe el nombre, lo pasas a minuscula, sino lo dejas vacio.Es para que no de undefined o null)
    items.forEach(item =>{
    const nombre= item.Nombre?.toLowerCase() || "";
    const descripcion= item.Descripcion?.toLowerCase()|| "";
    const autor= item.Autor?.toLowerCase() || "";
//7) guardamos la validacion , de que si nombre, descripcion o autor contiene esa
//  fraccion de texto ingresado dentro de una variable.
  const coincide= nombre.includes(texto)||descripcion.includes(texto)||autor.includes(texto)

//8) validamos con un if si "coincide" devuelve true o false, si es true, creamos  una variable donde
//  guardamos el ID de filtros para crear ahi dentro una grilla con los resultados
  if(coincide){

    //8)creamos un elemento articulo
    const articulo= document.createElement("article")

//9) le agregamos la clase que tiene articulo
    articulo.className= "articulo-categoria";

//10) a articulo le agregamos un bloque de html. En este caso, copiamos el bloque que ya existia de articulo y
//  lo unico que cambiamos fue lo que cambie en cada articulo, imagen, nombre, descripcion ,etc.
articulo.innerHTML=` <header class="header-articulo">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#EA3323">
                        <path d="..."></path>
                    </svg>
                    <p class="item-valor-nombre"><span style="font-weight:bold;text-transform:uppercase;">Nombre</span> ${item.Nombre}</p>
                    <img class="item-valor-portada" src="${item.Portada}" alt="Imagen de Portada">
                    <p class="item-valor-descripcion"><span style="font-weight:bold;text-transform:uppercase;">Descripción</span> ${item.Descripcion}</p>
                    <p class="item-valor-autor"><span style="font-weight:bold;text-transform:uppercase;">Autor</span> ${item.Autor}</p>
                    <p class="item-valor-rating"><span>Rating</span> ${item.Rating}</p>
                </header>
                <div class="detalle-articulo">
                    <h4 class="item-campo-personalizado_1">CAMPO PERSONALIZADO 1</h4>
                    <p class="item-valor-personalizado_1" style="color:gray;">${item.personalizado_1 }</p>
                    <h4 class="item-campo-personalizado_2">CAMPO PERSONALIZADO 2</h4>
                    <p class="item-valor-personalizado_2" style="color:gray;">${item.personalizado_2}</p>
                    <h4 class="item-campo-personalizado_3">CAMPO PERSONALIZADO 3</h4>
                    <p class="item-valor-personalizado_3" style="color:gray;">${item.personalizado_3}</p>
                    <h4 class="item-campo-personalizado_4">CAMPO PERSONALIZADO 4</h4>
                    <p class="item-valor-personalizado_4" style="color:gray;">${item.personalizado_4}</p>
                    <h4 class="item-campo-personalizado_5">CAMPO PERSONALIZADO 5</h4>
                    <p class="item-valor-personalizado_5" style="color:gray;">${item.personalizado_5}</p>
                </div> `
//11) le enchufamos todo el bloque articulo a resultados(grid de articulos filtrados) con un appenchild.
                resultados.appendChild(articulo)
  }
})
//12) si no se encunetran resultados lanzamos un mensaje.
if (resultados.innerHTML === "") {
  resultados.innerHTML = "<p style='color:gray;'>No se encontraron resultados.</p>";
}
} )
