(function() {

    let innerBusqueda = busqueda;
    let innerBusquedaAvanzada = busquedaAvanzada;

    busqueda = "";
    busquedaAvanzada = [];

    let mensaje = "";

    if (innerBusqueda != "") {
        mensaje += `<h2>Busqueda: ${innerBusqueda}</h2>`;
    }

    console.log(innerBusquedaAvanzada);

    for (const [key, value] of Object.entries(innerBusquedaAvanzada)) {
        console.log(mensaje);
        if (parseInt(value)) {
            mensaje += `<p>Etiqueta: ${key}</p>`;
        }
    }

    if (mensaje == "") {
        mensaje = "Busquda no encontrada"
    }
    document.querySelector("#main").innerHTML = mensaje;
})();