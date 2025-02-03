// Copyright (c) 2025 Traa Factory | Lisensi: MIT

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});
document.onkeydown = function(e) {
    if (e.keyCode == 123) return false; // F12
};

const searchBox = document.getElementById('searchBox');
const searchIcon = document.getElementById('searchIcon');
const mobileSearch = document.getElementById('mobileSearch');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const overlay = document.getElementById('overlay');

searchIcon.addEventListener('click', () => {
    if (window.innerWidth <= 775) {
        if (mobileSearch.classList.contains('active')) {
            mobileSearch.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            mobileSearch.classList.add('active');
            overlay.classList.add('active');
            setTimeout(() => mobileSearchInput.focus(), 300);
        }
    }
});

overlay.addEventListener('click', () => {
    mobileSearch.classList.remove('active');
    overlay.classList.remove('active');
});

mobileSearchInput.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        mobileSearch.classList.remove('active');
        overlay.classList.remove('active');
    }
});

const images = document.querySelectorAll('.slider img');
let currentIndex = 0;

function updateSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const offset = -currentIndex * sliderContainer.clientWidth;
    document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

function moveNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

function movePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

updateSlider();
window.addEventListener('resize', updateSlider);

// Animasi Scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    observer.observe(element);
});

const products = document.querySelectorAll('.product');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementById('closeModal');

products.forEach(product => {
    product.addEventListener('click', () => {
        const image = product.querySelector('img').src;
        const title = product.getAttribute('data-title');
        const description = product.getAttribute('data-description');
        modalImage.src = image;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});

function filterProducts(searchTerm) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const title = product.getAttribute('data-title').toLowerCase();
        const keywords = product.getAttribute('data-keywords').toLowerCase();
        if (title.includes(searchTerm) || keywords.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

const desktopSearch = document.getElementById('desktopSearch');
desktopSearch.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filterProducts(searchTerm);
});

const mobileSearchInput2 = document.getElementById('mobileSearchInput');
mobileSearchInput2.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filterProducts(searchTerm);
});