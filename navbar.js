function toggleMenu() {
    var navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.classList.toggle('active');

    var title1 = document.querySelector('.title-1');
    if (navbarMenu.classList.contains('active')) {
        title1.style.marginTop = '120px'; // Alteração aqui para ajustar a margem superior
    } else {
        title1.style.marginTop = '0px'; // Alteração aqui para ajustar a margem superior
    }
}