document.addEventListener('DOMContentLoaded', () => {
    const panoramaContainer = document.getElementById('panorama');

    // Inicializa el visor Panolens
    const viewer = new PANOLENS.Viewer({
        container: panoramaContainer,
        controlBar: true, // Mostrar la barra de control
        autoHideControlBar: false,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        compass: true,
        output: 'console'
    });

    // Función para cargar una imagen panorámica
    function loadPanorama(imageUrl) {
        const panorama = new PANOLENS.ImagePanorama(imageUrl);
        viewer.setPanorama(panorama);
    }

    // Manejar la selección de diferentes vistas 360
    const vistas360List = document.getElementById('vistas360-list').children;

    Array.from(vistas360List).forEach(listItem => {
        listItem.addEventListener('click', () => {
            const imageUrl = listItem.getAttribute('data-image-url');
            loadPanorama(imageUrl);
        });
    });

    // Cargar la primera imagen por defecto
    loadPanorama('/images/photos360/promigas360_1.jpg');
});
