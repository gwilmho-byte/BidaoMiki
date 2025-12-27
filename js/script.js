// --- 1. YEAR & MOBILE MENU ---
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const yearEl = document.getElementById('y');

if (yearEl) yearEl.textContent = new Date().getFullYear();

burger?.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
});

drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        drawer.classList.remove('open');
        if(burger) burger.textContent = '☰';
    });
});

// --- 2. PRODUCT SLIDER LOGIC ---
const track = document.querySelector('.slide-track');
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');
const STEP = 300; 
const INTERVAL = 3000; 
let autoSlide;
let currentIndex = 0;

function updateDots(index) {
    if (dots.length === 0) return;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function scrollNext() {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
        currentIndex = 0;
    } else {
        track.scrollBy({ left: STEP, behavior: 'smooth' });
        currentIndex = (currentIndex + 1) % dots.length;
    }
    updateDots(currentIndex);
}

function scrollPrev() {
    if (track.scrollLeft <= 5) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        currentIndex = dots.length - 1;
    } else {
        track.scrollBy({ left: -STEP, behavior: 'smooth' });
        currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    }
    updateDots(currentIndex);
}

const startAutoSlide = () => { autoSlide = setInterval(scrollNext, INTERVAL); };
const resetTimer = () => { clearInterval(autoSlide); startAutoSlide(); };

startAutoSlide();

btnNext?.addEventListener('click', () => { scrollNext(); resetTimer(); });
btnPrev?.addEventListener('click', () => { scrollPrev(); resetTimer(); });

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const diff = index - currentIndex;
        track.scrollBy({ left: STEP * diff, behavior: "smooth" });
        currentIndex = index;
        updateDots(currentIndex);
        resetTimer();
    });
});

// --- 3. USER INTERACTION (STOP ON TOUCH/WHEEL) ---
track?.addEventListener('touchstart', () => clearInterval(autoSlide), {passive: true});
track?.addEventListener('touchend', resetTimer);
track?.addEventListener('wheel', () => {
    clearInterval(autoSlide);
    clearTimeout(window.wheelTimer);
    window.wheelTimer = setTimeout(resetTimer, 2000);
}, {passive: true});

// --- 4. BRAND STORY POPUP ---
const modal = document.getElementById('storyModal');
const openBtn = document.querySelector('.more');

if (modal && openBtn) {
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    openBtn.addEventListener('click', (e) => { e.preventDefault(); modal.classList.add('show'); });
    const closeModal = () => modal.classList.remove('show');
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
}

// --- 5. REDUCED MOTION ---
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}