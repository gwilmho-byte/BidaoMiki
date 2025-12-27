// Mobile menu toggle
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

burger?.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Footer year
const yearEl = document.getElementById('y');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Close drawer when clicking a link
drawer?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => drawer.classList.remove('open'));
});

// Respect reduced motion (optional)
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}

//SLIDER ALL
const track = document.querySelector('.slide-track');
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');

const STEP = 300; 
const INTERVAL = 3000; 
let autoSlide;

function scrollNext() {
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: STEP, behavior: 'smooth' });
  }
}

function scrollPrev() {
  if (track.scrollLeft <= 5) {
    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: -STEP, behavior: 'smooth' });
  }
}

const startAutoSlide = () => {
  autoSlide = setInterval(scrollNext, INTERVAL);
};

const resetTimer = () => {
  clearInterval(autoSlide);
  startAutoSlide();
};

startAutoSlide();

btnNext.addEventListener('click', () => {
  scrollNext();
  resetTimer();
});

btnPrev.addEventListener('click', () => {
  scrollPrev();
  resetTimer();
});

track.addEventListener('touchstart', () => clearInterval(autoSlide));
track.addEventListener('touchend', resetTimer);
track.addEventListener('wheel', () => {
  clearInterval(autoSlide);

  clearTimeout(window.wheelTimer);
  window.wheelTimer = setTimeout(resetTimer, 2000);
});

// ====== DOTS ======
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function next() {
  nextSlide();
  currentIndex = (currentIndex + 1) % dots.length;
  updateDots(currentIndex);
}

function prev() {
  prevSlide();
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateDots(currentIndex);
}

btnNext.addEventListener("click", next);
btnPrev.addEventListener("click", prev);

clearInterval(autoSlide);
autoSlide = setInterval(next, INTERVAL);

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlide);
    const index = Number(dot.dataset.index);
    const diff = index - currentIndex;

    if (diff === 0) return;

    track.scrollBy({ left: STEP * diff, behavior: "smooth" });

    currentIndex = index;
    updateDots(currentIndex);
  });
});


// ==== POP-UP ====
  const openBtn = document.querySelector('.more');
  const modal = document.getElementById('storyModal');
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  overlay.addEventListener('click', () => {
    modal.classList.remove('show');
  });
