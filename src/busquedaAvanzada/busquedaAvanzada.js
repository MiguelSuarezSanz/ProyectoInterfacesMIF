(function() {
    console.log(1);
    let etiquetasContainer = document.querySelector("#tagsContainer");
    for (let i = 1; i <= 20; i++) {
        etiquetasContainer.innerHTML += `<div class="tag">Etiqueta ${i}</div>`;
    }
    console.log(2);
    
    let etiquetas = document.querySelectorAll('.tag');
    etiquetas.forEach(etiqueta => {
        etiqueta.dataset.selecter = 1;
        console.log(3);
        etiqueta.addEventListener('click', () => {
            if (parseInt(etiqueta.dataset.selecter)) {
                etiqueta.dataset.selecter -= 1;
                etiqueta.classList.add('tag-selected');
                return;
            } 
            etiqueta.dataset.selecter += 1;
            etiqueta.classList.remove('tag-selected');
        });
    });
})();