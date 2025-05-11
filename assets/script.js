document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.addEventListener("click", function () {
      const modalId = `projectModal${index + 1}`;
      const modal = new bootstrap.Modal(document.getElementById(modalId));
      modal.show();
    });
  });

  const certificateCards = document.querySelectorAll(
    "#certificates .project-card"
  );
  certificateCards.forEach((card, index) => {
    card.addEventListener("click", function () {
      const modalId = `certModal${index + 1}`;
      const modal = new bootstrap.Modal(document.getElementById(modalId));
      modal.show();
    });
  });

  const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
  tabEls.forEach((tabEl) => {
    tabEl.addEventListener("shown.bs.tab", (event) => {
      AOS.refreshHard();
    });
  });

  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector("i").classList.add("fa-beat");
    });

    item.addEventListener("mouseleave", function () {
      this.querySelector("i").classList.remove("fa-beat");
    });
  });

  AOS.init({
    duration: 800,
    easing: "ease",
    once: false,
    offset: 100,
  });

  const galleryContainer = document.querySelector(".gallery-container");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const prevBtn = document.querySelector(".gallery-nav.prev");
  const nextBtn = document.querySelector(".gallery-nav.next");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const itemCount = galleryItems.length;

  function updateGallery() {
    galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    updateGallery();
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % itemCount;
    updateGallery();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      currentIndex = index;
      updateGallery();
    });
  });

  updateGallery();

  setInterval(function () {
    currentIndex = (currentIndex + 1) % itemCount;
    updateGallery();
  }, 6000);

  const typedText = document.getElementById("typed-text");
  const phrases = [
    "A Informatics Engineering Student.",
    "A Photography Enthusiast.",
    "A Web Developer.",
    "A Backend Developer.",
  ];
  let phraseIndex = 0;
  let isTyping = true;
  let i = 0;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isTyping && i < currentPhrase.length) {
      typedText.innerHTML += currentPhrase.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    } else if (isTyping && i >= currentPhrase.length) {
      isTyping = false;
      setTimeout(typeEffect, 500);
    } else if (!isTyping && i > 0) {
      i--;
      typedText.innerHTML = currentPhrase.substring(0, i);
      setTimeout(typeEffect, 60);
    } else if (!isTyping && i === 0) {
      isTyping = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 200);
    }
  }

  typeEffect();

  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("show");
    });
  }
});
