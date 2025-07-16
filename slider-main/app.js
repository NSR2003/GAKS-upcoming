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

let items = document.querySelectorAll('.slider .list .item');

let countItem = items.length;
let itemActive = 0;

// auto run slider
let refreshInterval = setInterval(() => {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
}, 5000);

function showSlider() {
    // remove old active
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    itemActiveOld.classList.remove('active');

    // add new active
    items[itemActive].classList.add('active');
}

const preloader = document.getElementById("preloader");
const startTime = performance.now();

window.addEventListener("load", () => { 
    preloader.classList.add("hidden");
    document.body.classList.remove("hidden-content");
    document.body.classList.add("reveal-content");
});

