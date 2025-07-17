// --- Menú hamburguesa ---
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// --- Lightbox para galería ---
const galleryContainers = document.querySelectorAll(".gallery div");
const galleryImages = document.querySelectorAll(".gallery div img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const nextBtn = document.querySelector(".lightbox .next");
const prevBtn = document.querySelector(".lightbox .prev");
const counter = document.getElementById("counter");

let currentIndex = 0;

galleryContainers.forEach((div, index) => {
  div.addEventListener("click", () => {
    currentIndex = index;
    showImage();
  });
});

function showImage() {
  lightboxImg.classList.remove("fade");
  lightboxImg.classList.add("fade-out");
  lightboxImg.src = "";

  setTimeout(() => {
    lightboxImg.src = galleryImages[currentIndex].src;
    counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    lightboxImg.onload = () => {
      lightboxImg.classList.remove("fade-out");
      lightboxImg.classList.add("fade");
    };
  }, 200);

  lightbox.classList.add("show");
  document.body.classList.add("noscroll");
}

function closeLightbox() {
  lightbox.classList.add("closing");

  setTimeout(() => {
    lightbox.classList.remove("show", "closing");
    document.body.classList.remove("noscroll");
  }, 300);
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (nextBtn) nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});
if (prevBtn) prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});
if (lightbox) lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage();
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage();
  }

  if (e.key === "Escape") {
    closeLightbox();
  }
});

// --- Envío de formulario con Formspree ---
const form = document.querySelector("form");
const msg = document.getElementById("form-msg");

if (form && msg) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    }).then((response) => {
      if (response.ok) {
        msg.style.display = "block";
        form.reset();
      } else {
        msg.textContent = "Hubo un error. Intentalo nuevamente.";
        msg.style.display = "block";
      }
    });
  });
}

// --- Efecto scroll en botón subir y contactos ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
const contactoTop = document.getElementById("contactos");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 50;

  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("visible", scrolled);
  }

  if (contactoTop) {
    contactoTop.classList.toggle("scrolled", scrolled);
  }
});


// Soporte para swipe en el lightbox - deslizar con el dedo las imágenes en celulares
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, false);

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}, false);

function handleSwipe() {
  const diff = startX - endX;
  if (Math.abs(diff) > 50) { // Mínimo desplazamiento para contar como swipe
    if (diff > 0) {
      // swipe izquierda
      document.querySelector('.next')?.click();
    } else {
      // swipe derecha
      document.querySelector('.prev')?.click();
    }
  }
}
