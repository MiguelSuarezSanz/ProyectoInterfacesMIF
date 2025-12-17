class FrameworkUtils {

    routeError = "error404";
    cssTag = "#cssRender";
    jsTag = "#jsRender";
    htmlTag = "main";

    indexName = "index";
    headerName = "header";
    footerName = "footer";

    urlParams = new URLSearchParams(window.location.search);

    constructor() {

        this.autoInit();

    }

    async loadHtml(target, tag) {
        
    target += ".html";

    if (!this.checkRoute(target)) {
        console.error(`FATAL ERROR, error HTML not found: ${target}`);
        return;
    }

    const response = await fetch(target);
    const data = await response.text();
    const container = document.querySelector(tag);
    container.innerHTML = data;
    
    // Forzar re-rendering de inputs
    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        const parent = input.parentNode;
        const next = input.nextSibling;
        parent.removeChild(input);
        parent.insertBefore(input, next);
    });

    }

    async loadCss(target, tag) {

        target += ".css";

        if (!this.checkRoute(target)) {
            console.error(`FATAL ERROR, error CSS not found: ${target}`);
            return;
        }

        let link = document.querySelector(tag);
        link.href = target;

    }

    async loadScript(target, tag) {

        target += ".js";
    
        if (!this.checkRoute(target)) {
            console.error(`FATAL ERROR, error Script not found: ${target}`);
            return;
        }
    
        // ✅ Eliminar el script anterior completamente
        let oldScript = document.querySelector(tag);
        if (oldScript) {
            oldScript.remove();
        }
    
        // ✅ Crear un NUEVO script (no reutilizar el anterior)
        let newScript = document.createElement('script');
        newScript.id = tag.replace('#', '');
        newScript.src = target;
        
        // Esperar a que cargue
        return new Promise((resolve) => {
            newScript.onload = resolve;
            document.body.appendChild(newScript);
        });
    }

    async renderize(target) {

        let interval = await this.loandingProcess();
        let route = `src/${target}/${target}`;
        let comprobar = await this.checkRoute(`src/${target}`);

        if (!comprobar) {

            if (target == this.routeError) {
                console.error(`FATAL ERROR, error route not found: ${this.routeError}`);
                return;
            }

            clearInterval(interval);
            this.renderize(this.routeError);
            return;
        }

        this.anadirSegmentoAUrL(target);
        
        // Cargar CSS primero
        await this.loadCss(route, this.cssTag);
        
        // Luego cargar HTML
        await this.loadHtml(route, this.htmlTag);
        
        // Esperar un tick para que el DOM se actualice completamente
        await new Promise(resolve => setTimeout(resolve, 0));
        
        // Finalmente cargar el script
        await this.loadScript(route, this.jsTag);

        clearInterval(interval);

    }

    async checkRoute(route) {
        try {

            const response = await fetch(route);

            if (!response.ok) {
                return false;
            }
            return true;

        } catch (error) {
            return false;
        }

    }

    anadirSegmentoAUrL(nuevoSegmento) {
        // 1. Crear un objeto URL a partir de la URL actual.
        const url = new URL(window.location.href);
    
        // 2. Limpiar el path para volver a la raíz ("/"). Esto deja solo el origen.
        url.pathname = '/';
    
        // 3. Quitar todos los parámetros de consulta existentes (vaciar el query string).
        // Esto cumple con el requisito de "quitar los parametros".
        url.search = '';
    
        // 4. Añadir el 'nuevoSegmento' como un parámetro de consulta llamado 'target'.
        // Usamos encodeURIComponent para asegurar que el valor es seguro para la URL.
        const segmentoCodificado = encodeURIComponent(nuevoSegmento);
        url.searchParams.set('target', segmentoCodificado);
    
        // El hash (#seccion) se mantiene automáticamente ya que no lo hemos modificado.
    
        // 5. Manipular el historial del navegador sin recargar la página (el "falseo").
        try {
            const nuevaUrlString = url.toString(); 
    
            // Usamos history.pushState para actualizar la URL visible.
            window.history.pushState(
                null, // Objeto de estado
                "",   // Título (ignorado)
                nuevaUrlString
            );
            return;
        } catch (error) {
            return;
        }
    }

    async autoInit() {

        this.loadHtml(`includes/html/${this.headerName}`, "header");
        this.loadHtml(`includes/html/${this.footerName}`, "footer");

        if (this.urlParams.has("target")) {

            this.renderize(this.urlParams.get("target"));

        } else {

            this.renderize(this.indexName);

        }

    }

    async loandingProcess() {
        let intervalo = null;

        await this.loadHtml("includes/html/loading", "main")

            .then(() => {

                intervalo = setInterval(() => {

                    let puntos = document.querySelector(".puntos");
                    let puntosText = puntos.innerHTML;
                    let numMaxPuntos = 3;

                    if (puntosText.length != numMaxPuntos) {
                        puntos.innerHTML += ".";
                    } else {
                        puntos.innerHTML = "";
                    }

                }, 500);

            });

        return intervalo;
    }

};

let frameworkUtils = new FrameworkUtils();