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
