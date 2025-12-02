function buscar() {
    let buscador = document.querySelector('#buscador');
    console.log(buscador.innerHTML);
    var busqueda = buscador.innerHTML;
    frameworkUtils.renderize("buscador");
}