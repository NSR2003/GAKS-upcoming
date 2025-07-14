let items = document.querySelectorAll('.slider .list .item');

let countItem = items.length;
let itemActive = 0;

// auto run slider
let refreshInterval = setInterval(() => {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
}, 5000);

function showSlider() {
    // remove old active slide
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    itemActiveOld.classList.remove('active');

    // remove old active description
    let descActiveOld = document.querySelector('.slide-description .desc-item.active');
    if (descActiveOld) descActiveOld.classList.remove('active');

    // add new active slide
    items[itemActive].classList.add('active');

    // add new active description
    let descItems = document.querySelectorAll('.slide-description .desc-item');
    if (descItems[itemActive]) descItems[itemActive].classList.add('active');
}


const preloader = document.getElementById("preloader");
const startTime = performance.now();

window.addEventListener("load", () => { 
    preloader.classList.add("hidden");
    document.body.classList.remove("hidden-content");
    document.body.classList.add("reveal-content");
});

