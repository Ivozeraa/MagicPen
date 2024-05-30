const navUl = document.querySelector('.nav-ul');
const toggleButton = document.querySelector('.menu-toggle');

toggleButton.addEventListener('click', () => {
  toggleButton.classList.toggle('open');

  if (navUl.classList.contains('active')) {
    navUl.classList.remove('active');
    navUl.classList.add('desactive');
    
    navUl.addEventListener('animationend', () => {
      if (navUl.classList.contains('desactive')) {
        navUl.style.display = 'none';
      }
    }, { once: true });
  } else {
    navUl.style.display = 'flex';
    navUl.classList.remove('desactive');
    navUl.classList.add('active');
  }
});
