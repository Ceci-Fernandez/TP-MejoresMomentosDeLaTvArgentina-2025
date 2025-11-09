//boton de acceder
const btnAcceder = document.querySelector("#btnAcceder");

btnAcceder.addEventListener("mouseover", () => {
    btnAcceder.style.backgroundColor = "#00c46c";
}); //al pasar el mouse 

btnAcceder.addEventListener("mouseleave", () => {
    btnAcceder.style.backgroundColor = "#145222";
}); //cuando saco el mouse 

//buscador
const buscador = document.getElementById('buscador');

buscador.addEventListener('focus', () => {
  buscador.style.boxShadow = '0 0 6px 1px #145222';
  buscador.style.outline = 'none';
  buscador.style.transition = 'all 0.2s ease';
});

buscador.addEventListener('blur', () => {
  buscador.style.boxShadow = 'none';
  buscador.style.backgroundColor = 'var(--light-color-acento-1)';
});

//carrousel

const img = [
  "assets/img/atiendo-boludos.jpg",
  "assets/img/me-gusta-el-arte.jpeg",
  "assets/img/maniobra-hemlichpng.webp"
];

let actual = 0;
const btnIzquierda = document.getElementById("btnIzquierda");
const btnDerecha = document.getElementById("btnDerecha");
const imgCarrousel = document.getElementById("imgCarrousel");
const circulos = document.querySelectorAll(".circulo-carrousel i");

function mostrarImagen() {
  imgCarrousel.src = img[actual];

  circulos.forEach((c, i) => {
    c.style.color = (i === actual) ? "#145222" : "#dee2e6";
  });
}

btnDerecha.addEventListener("click", (e) => {
  e.preventDefault();
  actual = (actual + 1) % img.length;
  mostrarImagen();
});

btnIzquierda.addEventListener("click", (e) => {
  e.preventDefault();
  actual = (actual - 1 + img.length) % img.length;
  mostrarImagen();
});

circulos.forEach((c, i) => {
  c.addEventListener("click", (e) => {
    e.preventDefault();
    actual = i;
    mostrarImagen();
  });
});

mostrarImagen();