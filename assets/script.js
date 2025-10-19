document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        updateActiveNav(this);

        const mobileNav = document.getElementById("mobileNav");
        if (mobileNav.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(mobileNav);
          bsCollapse.hide();
        }
      }
    });
  });

  function updateActiveNav(clickedLink) {
    document.querySelectorAll(".nav-link-minimal").forEach((link) => {
      link.classList.remove("active");
    });

    clickedLink.classList.add("active");
  }

  const navLinks = document.querySelectorAll(
    ".nav-link-minimal, .mobile-nav-link"
  );
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    });
  });

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section, div[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document.querySelectorAll(".nav-link-minimal").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});

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

  const isMobile = window.innerWidth < 768;

  document.querySelectorAll("#myTabContent [data-aos]").forEach((el, index) => {
    let mobileAos = "fade-right";

    if (isMobile) {
      el.setAttribute("data-aos", mobileAos);
    } else {
      el.setAttribute("data-aos", "fade-up");
    }
  });

  AOS.init({
    duration: 800,
    easing: "ease",
    once: false,
    offset: 100,
  });

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
