document.addEventListener("DOMContentLoaded", function () {
  // --- Header & Navigation ---
  const header = document.querySelector("header");
  if (header) {
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "1000";
    header.style.background = "rgba(18, 18, 18, 0.8)";
    header.style.backdropFilter = "blur(10px)";
    header.style.webkitBackdropFilter = "blur(10px)";
  }

  const homeSec = document.getElementById("home");
  if (homeSec) {
    homeSec.style.marginTop = "80px";
  }

  let isScrolling = false;

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
        isScrolling = true;
        setActiveNav(targetId);
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    });
  });

  window.addEventListener("scroll", function () {
    if (isScrolling) return;
    const scrollPos = window.scrollY + 100;
    const about = document.getElementById("about");
    const expert = document.getElementById("expert");
    const tools = document.getElementById("tools");
    const contact = document.getElementById("contact");

    if (about && scrollPos < about.offsetTop) {
      setActiveNav("#home");
    } else if (expert && scrollPos < expert.offsetTop) {
      setActiveNav("#about");
    } else if (tools && scrollPos < tools.offsetTop) {
      setActiveNav("#expert");
    } else if (contact && scrollPos < contact.offsetTop) {
      setActiveNav("#tools");
    } else {
      setActiveNav("#contact");
    }
  });

  setActiveNav("#home");

  // --- Video Hover ---
  const aboutImgWrapper = document.querySelector(".about-img-wrapper");
  const aboutVideo = document.querySelector(".about-video");
  if (aboutImgWrapper && aboutVideo) {
    aboutImgWrapper.addEventListener("mouseenter", () => {
      aboutVideo.play();
    });
    aboutImgWrapper.addEventListener("mouseleave", () => {
      aboutVideo.pause();
      aboutVideo.currentTime = 0;
    });
  }

  // --- Splash Screen ---
  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    if (sessionStorage.getItem("splashShown")) {
      splashScreen.style.display = "none";
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          splashScreen.classList.add("fade-out");
          sessionStorage.setItem("splashShown", "true");
          setTimeout(() => {
            splashScreen.style.display = "none";
          }, 800);
        }, 1500);
      });
    }
  }

  // --- AOS & Tabs ---
  const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
  tabEls.forEach((tabEl) => {
    tabEl.addEventListener("shown.bs.tab", () => {
      AOS.refreshHard();
    });
  });

  document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector("i").classList.add("fa-beat");
    });
    item.addEventListener("mouseleave", function () {
      this.querySelector("i").classList.remove("fa-beat");
    });
  });

  const isMobile = window.innerWidth < 768;
  document.querySelectorAll("#myTabContent [data-aos]").forEach((el) => {
    el.setAttribute("data-aos", isMobile ? "fade-right" : "fade-up");
  });

  AOS.init({ duration: 800, easing: "ease", once: true, offset: 100 });

  // --- Terminal Typewriter ---
  const codeElement = document.getElementById("code-typewriter");
  const codeLines = [
    { text: "const ", class: "keyword" },
    { text: "developer ", class: "variable" },
    { text: "= ", class: "operator" },
    { text: "{\n", class: "punctuation" },
    { text: "  name: ", class: "property" },
    { text: '"Raffi Andhika R"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  alias: ", class: "property" },
    { text: '"Kvory"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  role: ", class: "property" },
    { text: '"Full Stack Developer"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  passion: ", class: "property" },
    { text: '["Coding", "Sleeping", "Gaming", "Reading"]', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  status: ", class: "property" },
    { text: '"Wanna Die"', class: "string" },
    { text: "\n", class: "punctuation" },
    { text: "};", class: "punctuation" },
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeCode() {
    if (!codeElement) return;
    if (lineIndex < codeLines.length) {
      const currentLine = codeLines[lineIndex];
      const fullText = currentLine.text;
      let currentSpan = codeElement.querySelector(`.line-${lineIndex}`);
      if (!currentSpan) {
        currentSpan = document.createElement("span");
        currentSpan.className = `line-${lineIndex} ${currentLine.class}`;
        codeElement.insertBefore(
          currentSpan,
          codeElement.querySelector(".cursor-blink")
        );
      }
      if (charIndex < fullText.length) {
        currentSpan.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCode, Math.random() * 30 + 20);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCode, 50);
      }
    } else {
      setTimeout(() => {
        const spans = codeElement.querySelectorAll("span:not(.cursor-blink)");
        spans.forEach((span) => span.remove());
        lineIndex = 0;
        charIndex = 0;
        typeCode();
      }, 3000);
    }
  }

  if (codeElement) {
    const cursor = document.createElement("span");
    cursor.className = "cursor-blink";
    codeElement.appendChild(cursor);
    setTimeout(typeCode, 2200);
  }

  // --- Anime.js Rubik's Cube Animation ---
  const rubiksCube = document.querySelector(".rubiks-cube");

  if (rubiksCube && typeof anime !== "undefined") {
    // Remove CSS animation to let Anime.js take over
    rubiksCube.style.animation = "none";

    // Timeline for elegant, showcase rotations
    const cubeTimeline = anime.timeline({
      loop: true,
      easing: "easeInOutSine",
    });

    cubeTimeline
      // Initial position to first turn
      .add({
        targets: rubiksCube,
        rotateX: [-20, -20],
        rotateY: [45, 135],
        duration: 2500,
      })
      // Tilt forward
      .add({
        targets: rubiksCube,
        rotateX: [-20, 30],
        rotateY: [135, 135],
        duration: 1800,
        easing: "easeOutBack",
      })
      // Continue spinning
      .add({
        targets: rubiksCube,
        rotateY: [135, 225],
        duration: 2000,
      })
      // Tilt back
      .add({
        targets: rubiksCube,
        rotateX: [30, -35],
        duration: 1500,
        easing: "easeInOutQuad",
      })
      // Keep spinning
      .add({
        targets: rubiksCube,
        rotateY: [225, 315],
        duration: 2500,
      })
      // Return to start position
      .add({
        targets: rubiksCube,
        rotateX: [-35, -20],
        rotateY: [315, 405],
        duration: 2200,
        easing: "easeOutQuart",
      });
  }
});
