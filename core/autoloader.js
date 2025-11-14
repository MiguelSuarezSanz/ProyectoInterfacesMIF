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

        fetch(target)
            .then(response => response.text())
            .then(data => document.querySelector(tag).innerHTML = data);

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

        let script = document.querySelector(tag);
        script.src = target;

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
        this.loadCss(route, this.cssTag)
            .then(await this.loadHtml(route, this.htmlTag))
            .then(await this.loadScript(route, this.jsTag))
            .then(clearInterval(interval));

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