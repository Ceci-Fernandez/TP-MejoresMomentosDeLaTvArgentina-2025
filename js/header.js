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

const imgLista = [ 
  "assets/img/atiendo-boludos.jpg",
  "assets/img/tres-empanadas.jpg",
  "assets/img/que miras bobo.jpeg",
  "assets/img/no me quemes.png",
  "assets/img/aja las pelotas.jpg",
  "assets/img/Yo nunca dije eso.jpg",
  "assets/img/Yo con 40 grados no voy a ningun lado.jpg",
  "assets/img/Ya lo vas a entender.jpg",
  "assets/img/Traelo a Bal.jpg",
  "assets/img/Tiene cara de boludo.jpg",
  "assets/img/Susana Gimenez y una salamandra.png",
  "assets/img/Si, absolutamente..jpg",
  "assets/img/Quienes son.jpg",
  "assets/img/Que lo demuestre.jpg",
  "assets/img/Pelea Alberto Samid vs Mauro Viale.jpg",
  "assets/img/pedazo de boludo.gif",
  "assets/img/No metas a tu abuela.avif",
  "assets/img/mis jugadores favoritos.png",
  "assets/img/martiiin, gol.jpg",
  "assets/img/Mama cortaste toda la luz.avif",
  "assets/img/las torres de serbia.png",
  "assets/img/juega nico gonzalez.jpeg",
  "assets/img/hermosa mañna verdad.webp",
  "assets/img/Franco Mattioli.avif",
  "assets/img/fabbiani erra el gol de la fecha.webp",
  "assets/img/España vs Argentina.jpg",
  "assets/img/Eramos amigas y ahora no, Lam.jpg",
  "assets/img/era una broma.jpg",
  "assets/img/En medio de sus sabanas.webp",
  "assets/img/El pitufo enrique.jpg",
  "assets/img/el huevo de Campazzo.png",
  "assets/img/El 17 de octubre tambien murio San Martin.jpeg",
  "assets/img/Conmigo no te metas.jpg",
  "assets/img/chau y hasta nunca.jpg",
  "assets/img/Carlos Saúl Menem y la estratosfera.jpg",
  "assets/img/Bueno ahora te voy a pegar un tiro.jpg",
  "assets/img/bisman.jpg",
  "assets/img/aja las pelotas.jpg",
  "assets/img/Ahí veo al compañero de garganta profunda.jpg",
  "assets/img/aguante el Pity.jpg",
  "assets/img/me-gusta-el-arte.jpeg",
  "assets/img/maniobra-hemlichpng.webp",
  "assets/img/mi familia es jurio.webp",
  "assets/img/no se inunda.gif"
];

const img = [];
const copia = [...imgLista];  

for (let i = 0; i < 5; i++) {
  const index = Math.floor(Math.random() * copia.length);
  img.push(copia[index]);
  copia.splice(index, 1);
}

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

btnDerecha.addEventListener("click", (e) => {
  e.preventDefault();
  actual = (actual + 1) % img.length;
  mostrarImagen();
  reiniciarIntervalo();
});

btnIzquierda.addEventListener("click", (e) => {
  e.preventDefault();
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
