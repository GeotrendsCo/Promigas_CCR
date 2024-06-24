let map; // Definir 'map' globalmente

function initializeMap() {
    console.log("Inicializando el mapa");

    const googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // Capas base
    const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
    });


    // Inicializar el mapa con la capa base predeterminada
    map = L.map('map', {
        layers: [googleHybrid],
        center: [11.249983, -73.552175],
        zoom: 19
    });

    // Control de capas base
    const baseLayers = {
        "Google Hybrid": googleHybrid,
        "OSM": streetMap,
        
    };


    // Agregar tus tiles locales
    const ortofoto = L.tileLayer('../output/tiles/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: 'Tu Atribución',
        tms: true // Configurar para usar el esquema TMS
    }).addTo(map);

    // Añadir la capa de ortofoto al mapa pero mantenerla desactivada inicialmente
    const overlayLayers = {
        "Ortofoto": ortofoto
    };

    L.control.layers(baseLayers, overlayLayers).addTo(map);



}

function openMapasRuido() {
    console.log("Abriendo Mapas de Ruido");
    openRightSidebar('ruido');
    setTimeout(() => {
        initializeMap();
    }, 300); // Esperar a que el sidebar termine de abrirse
}

