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

function equalizeHeadingHeights(selector) {
  const elements = document.querySelectorAll(selector);
  let maxHeight = 0;

  // Reset all heights first
  elements.forEach(el => {
    el.style.height = 'auto';
  });

  // Find the max height
  elements.forEach(el => {
    const height = el.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  // Set all headings to max height
  elements.forEach(el => {
    el.style.height = maxHeight + 'px';
  });
}

// Run on page load
window.addEventListener('load', () => {
  equalizeHeadingHeights('.about-content h1');
});

// Optional: re-run on window resize
window.addEventListener('resize', () => {
  equalizeHeadingHeights('.about-content h1');
});

