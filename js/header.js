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
  "assets/img/tres-empanadas.jpg",
  "assets/img/que miras bobo.jpeg",
  "assets/img/no me quemes.png",
  "assets/img/no se inunda.gif"
];

let actual = 0;
const btnIzquierda = document.getElementById("btnIzquierda");
const btnDerecha = document.getElementById("btnDerecha");
const imgCarrousel = document.getElementById("imgCarrousel");
const circulos = document.querySelectorAll(".circulo-carrousel i");

function mostrarImagen() {
  imgCarrousel.src = img[actual];

  circulos.forEach((circuloActual, i) => {
    circuloActual.style.color = (i === actual) ? "#145222" : "#dee2e6";
  });
}

function avanzarAuto() {
  actual = (actual + 1) % img.length;
  mostrarImagen();
}

let intervalo = setInterval(avanzarAuto, 3000);

function reiniciarIntervalo() {
  clearInterval(intervalo);
  intervalo = setInterval(avanzarAuto, 3000);
}

btnDerecha.addEventListener("click", (eventoFlecha) => {
  eventoFlecha.preventDefault();
  actual = (actual + 1) % img.length;
  mostrarImagen();
  reiniciarIntervalo();
});

btnIzquierda.addEventListener("click", (eventoFlecha) => {
  eventoFlecha.preventDefault();
  actual = (actual - 1 + img.length) % img.length;
  mostrarImagen();
  reiniciarIntervalo();
});

circulos.forEach((c, i) => {
  c.addEventListener("click", (e) => {
    e.preventDefault();
    actual = i;
    mostrarImagen();
    reiniciarIntervalo();
  });
});

mostrarImagen();