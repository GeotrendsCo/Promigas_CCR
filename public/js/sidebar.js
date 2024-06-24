// JavaScript para manejar el sidebar
function openNav() {
    const sidebar = document.getElementById('sidebar');
    const pageContent = document.getElementById('page-content');
    const branding = document.getElementById('branding');

    sidebar.classList.add('open');
    pageContent.classList.add('shifted');
    branding.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const closeSidebarIcon = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const pageContent = document.getElementById('page-content');
    const branding = document.getElementById('branding');

    closeSidebarIcon.addEventListener('click', () => {
        sidebar.classList.remove('open');
        pageContent.classList.remove('shifted');
        branding.style.display = 'flex';
    });
});
