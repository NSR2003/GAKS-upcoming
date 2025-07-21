const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
  
const scrollIcon = document.querySelector('.mouse-scroll');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollIcon.classList.add('hidden');
  } else {
    scrollIcon.classList.remove('hidden');
  }
});