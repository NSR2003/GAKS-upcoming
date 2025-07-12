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
  const endTime = performance.now();
  const loadDuration = endTime - startTime;

  const minimumDisplayTime = 0; // 1 second

  const remainingTime = minimumDisplayTime - loadDuration;

  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.classList.remove("hidden-content");
    document.body.classList.add("reveal-content");
  }, remainingTime > 0 ? remainingTime : 0);
});

