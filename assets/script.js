document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  header.style.position = "fixed";
  header.style.top = "0";
  header.style.left = "0";
  header.style.right = "0";
  header.style.zIndex = "1000";
  header.style.background = "inherit";
  header.style.backdropFilter = "blur(10px)";
  header.style.webkitBackdropFilter = "blur(10px)";

  document.getElementById("home").style.marginTop = "80px";

  function setActiveNav(targetId) {
    document.querySelectorAll(".nav-link-minimal").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        setActiveNav(targetId);

        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        const mobileNav = document.getElementById("mobileNav");
        if (mobileNav.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(mobileNav);
          bsCollapse.hide();
        }
      }
    });
  });

  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY + 100;

    if (scrollPos < document.getElementById("about").offsetTop) {
      setActiveNav("#home");
    } else if (scrollPos < document.getElementById("expert").offsetTop) {
      setActiveNav("#about");
    } else if (scrollPos < document.getElementById("skill").offsetTop) {
      setActiveNav("#expert");
    } else if (scrollPos < document.getElementById("contact").offsetTop) {
      setActiveNav("#skill");
    } else {
      setActiveNav("#contact");
    }
  });

  setActiveNav("#home");
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
});
