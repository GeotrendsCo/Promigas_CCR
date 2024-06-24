let currentSection = null;

function openRightSidebar(section) {
    const rightSidebar = document.getElementById('right-sidebar');
    const leftSidebar = document.getElementById('sidebar');
    const openRightSidebarIcon = document.getElementById('open-right-sidebar');

    console.log(`Abriendo sidebar derecho para la sección: ${section}`);

    // Si el sidebar derecho ya está abierto con la misma sección, no hacer nada
    if (currentSection === section && rightSidebar.classList.contains('open')) {
        closeRightSidebar();
        return;
    }

    // Ocultar todas las secciones
    document.querySelectorAll('.right-sidebar-section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    document.getElementById(`${section}-content`).style.display = 'block';
    currentSection = section;

    // Ajustar el ancho del sidebar derecho
    if (leftSidebar.classList.contains('open')) {
        const leftSidebarWidth = leftSidebar.offsetWidth;
        const viewportWidth = window.innerWidth;
        const rightSidebarWidth = viewportWidth - leftSidebarWidth;

        rightSidebar.style.width = `${rightSidebarWidth}px`;
    } else {
        rightSidebar.style.width = '100%';
    }

    rightSidebar.classList.add('open');
    rightSidebar.classList.remove('closed');
    openRightSidebarIcon.style.display = 'none';
}

function closeRightSidebar() {
    const rightSidebar = document.getElementById('right-sidebar');
    const openRightSidebarIcon = document.getElementById('open-right-sidebar');
    rightSidebar.classList.remove('open');
    rightSidebar.classList.add('closed');
    openRightSidebarIcon.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const closeRightSidebarIcon = document.getElementById('close-right-sidebar');
    const openRightSidebarIcon = document.getElementById('open-right-sidebar');

    closeRightSidebarIcon.addEventListener('click', closeRightSidebar);
    openRightSidebarIcon.addEventListener('click', () => openRightSidebar(currentSection || 'ruido')); // O abre el último contenido visible

    const closeSidebarIcon = document.getElementById('close-sidebar');
    closeSidebarIcon.addEventListener('click', () => {
        closeRightSidebar();
        document.getElementById('sidebar').classList.remove('open');
        expandRightSidebar();
        document.getElementById('branding').style.display = 'flex';
    });

    const openSidebarButton = document.querySelector('.openbtn');
    openSidebarButton.addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('open');
        contractRightSidebar();
        document.getElementById('branding').style.display = 'none';
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            closeRightSidebar();
            document.getElementById('sidebar').classList.remove('open');
        } else {
            const rightSidebar = document.getElementById('right-sidebar');
            const leftSidebarWidth = document.getElementById('sidebar').offsetWidth;
            const viewportWidth = window.innerWidth;
            const rightSidebarWidth = viewportWidth - leftSidebarWidth;

            rightSidebar.style.width = `${rightSidebarWidth}px`;
        }
    });
});
