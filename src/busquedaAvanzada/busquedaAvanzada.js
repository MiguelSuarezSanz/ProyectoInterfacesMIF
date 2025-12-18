(function() {
    
    let etiquetasContainer = document.querySelector("#tagsContainer");
    for (let i = 1; i <= 20; i++) {
        etiquetasContainer.innerHTML += `<div class="tag">Etiqueta ${i}</div>`;
    }
    
    let etiquetas = document.querySelectorAll('.tag');

    busquedaAvanzada = []

    etiquetas.forEach(etiqueta => {

        etiqueta.dataset.selecter = 1;
        etiqueta.addEventListener('click', () => {

            if (parseInt(etiqueta.dataset.selecter)) {
                etiqueta.dataset.selecter = 0;
                etiqueta.classList.add('tag-selected');
                busquedaAvanzada[etiqueta.innerHTML] = 1;
                return;
            } 
            etiqueta.dataset.selecter = 1;
            etiqueta.classList.remove('tag-selected');
            busquedaAvanzada[etiqueta.innerHTML] = 0;

        });

    });

    function buscarAvanzado() {
        let buscador = document.querySelector('#buscadorAvanzado');
        busqueda = buscador.value.trim();
        console.log(busqueda);
        frameworkUtils.renderize("busqueda");
    }

    document.querySelector('#seracher_advance').addEventListener('click',buscarAvanzado);

})();