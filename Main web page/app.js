const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
  
const scrollIcon = document.querySelector('.mouse-scroll');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollIcon.classList.add('hidden');
    header.classList.add('scrolled');
  } else {
    scrollIcon.classList.remove('hidden');
    header.classList.remove('scrolled');
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

window.addEventListener("load", () => { 
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
    document.body.classList.remove("hidden-content");
    document.body.classList.add("reveal-content");
  },700);
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

addEventListener('resize', () => {
  if(window.innerWidth < 960){
    equalizeHeadingHeights('.about-content h1');
  }else{
    document.querySelectorAll('.about-content h1').forEach(el => {
    el.style.height = 'auto';  
    })
  }
})

