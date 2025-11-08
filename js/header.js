const btnAcceder = document.querySelector("#btnAcceder");

btnAcceder.addEventListener("mouseover", () => {
    btnAcceder.style.backgroundColor = "#00c46c";
});
//al pasar el mouse 

btnAcceder.addEventListener("mouseleave", () => {
    btnAcceder.style.backgroundColor = "#145222";
});
//cuando saco el mouse 