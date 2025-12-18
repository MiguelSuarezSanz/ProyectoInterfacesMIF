function buscar() {
    let buscador = document.querySelector('#buscador');
    busqueda = buscador.value.trim();
    console.log(busqueda);
    frameworkUtils.renderize("busqueda");
}

function openPopup(innerHtml) {
    let black = document.querySelector("#black");
    black.style.height = "100vh";
    black.style.width = "100vw";

    let popup = document.querySelector("#popup");
    popup.style.top = "10vh";
    popup.innerHTML = innerHtml;
}

function closePopup() {
    let black = document.querySelector("#black");
    black.style.height = "0";
    black.style.width = "0";

    document.querySelector("#popup").style.top = "-1000px";
}

document.querySelector("#black").addEventListener('click',closePopup);
var busquedaAvanzada = [];
var busqueda = "";