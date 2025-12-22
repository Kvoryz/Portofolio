document.addEventListener("DOMContentLoaded", function () {
  // --- Navigation ---
  let isScrolling = false;

  function setActiveNav(targetId) {
    document.querySelectorAll(".rubik-nav-cube").forEach((link) => {
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

        // Special case for home - scroll to very top
        if (targetId === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const offset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }

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
    { text: "  alias: ", class: "property" },
    { text: '"Kvory"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  role: ", class: "property" },
    { text: '"Full Stack Developer"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  skills: ", class: "property" },
    { text: '["JavaScript", "PHP", "Python"]', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  learning: ", class: "property" },
    { text: '"Laravel & Java"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  github: ", class: "property" },
    { text: '"github.com/kvoryz"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  coffee: ", class: "property" },
    { text: '"Infinite ☕"', class: "string" },
    { text: ",\n", class: "punctuation" },
    { text: "  available: ", class: "property" },
    { text: "true", class: "keyword" },
    { text: "\n", class: "punctuation" },
    { text: "};", class: "punctuation" },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineNum = 1;

  // Update line numbers display
  function updateLineNumbers() {
    const lineNumElement = document.getElementById("line-numbers");
    if (!lineNumElement) return;

    const codeText = codeElement ? codeElement.textContent : "";
    const lines = codeText.split("\n");
    const numLines = Math.max(1, lines.length);

    let lineNumsHTML = "";
    for (let i = 1; i <= numLines; i++) {
      lineNumsHTML += i + "\n";
    }
    lineNumElement.textContent = lineNumsHTML.trim();
  }

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
        updateLineNumbers();
        setTimeout(typeCode, Math.random() * 30 + 20);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCode, 50);
      }
    } else {
      // Start delete animation after typing is complete
      setTimeout(deleteCode, 2000);
    }
  }

  function deleteCode() {
    if (!codeElement) return;
    const spans = codeElement.querySelectorAll("span:not(.cursor-blink)");
    const allText = Array.from(spans)
      .map((s) => s.textContent)
      .join("");

    if (allText.length > 0) {
      // Find the last span with content
      for (let i = spans.length - 1; i >= 0; i--) {
        if (spans[i].textContent.length > 0) {
          spans[i].textContent = spans[i].textContent.slice(0, -1);
          if (spans[i].textContent.length === 0) {
            spans[i].remove();
          }
          break;
        }
      }
      setTimeout(deleteCode, 15);
      updateLineNumbers();
    } else {
      // All deleted, restart typing
      lineIndex = 0;
      charIndex = 0;
      setTimeout(typeCode, 500);
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

    // Animasi dengan struktur face-based
    cubeTimeline
      // 1. Rotate cube untuk melihat sisi berbeda
      .add({
        targets: rubiksCube,
        rotateY: "+=90",
        duration: 1200,
        easing: "easeInOutQuad",
      })

      // 2. Tilt untuk efek dinamis
      .add({
        targets: rubiksCube,
        rotateX: "+=45",
        rotateY: "+=45",
        duration: 1000,
        easing: "easeInOutQuad",
      })

      // 3. Putar 180 derajat
      .add({
        targets: rubiksCube,
        rotateY: "+=180",
        duration: 1500,
        easing: "easeInOutQuad",
      })

      // 4. Gerakan mengitari sumbu X
      .add({
        targets: rubiksCube,
        rotateX: "+=180",
        duration: 1400,
        easing: "easeInOutQuad",
      })

      // 5. Kombinasi putaran
      .add({
        targets: rubiksCube,
        rotateX: "-=45",
        rotateY: "+=90",
        duration: 1200,
        easing: "easeInOutQuad",
      })

      // 6. Kembali ke posisi awal
      .add({
        targets: rubiksCube,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        duration: 1600,
        easing: "easeInOutQuad",
      });
  }

  // --- Finder Portfolio Interactivity ---
  const sidebarItems = document.querySelectorAll(".sidebar-item[data-folder]");
  const tagItems = document.querySelectorAll(".sidebar-item[data-tag]");
  const projectsGrid = document.getElementById("projects-grid");
  const certificatesGrid = document.getElementById("certificates-grid");
  const finderTitle = document.getElementById("finder-current-folder");
  const finderIcons = document.querySelectorAll(".finder-icon");
  const quicklook = document.getElementById("quicklook");
  const quicklookClose = document.getElementById("quicklook-close");
  const quicklookImage = document.getElementById("quicklook-image");
  const quicklookName = document.getElementById("quicklook-name");
  const quicklookTitle = document.getElementById("quicklook-title");

  // Sidebar folder navigation
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      tagItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const folder = this.dataset.folder;
      finderTitle.textContent = this.textContent.trim();

      if (folder === "projects") {
        projectsGrid.style.display = "grid";
        certificatesGrid.style.display = "none";
      } else if (folder === "certificates") {
        projectsGrid.style.display = "none";
        certificatesGrid.style.display = "grid";
      }
    });
  });

  // Tag filtering
  tagItems.forEach((item) => {
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      tagItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const tag = this.dataset.tag;
      finderTitle.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);

      projectsGrid.style.display = "grid";
      certificatesGrid.style.display = "none";

      document
        .querySelectorAll("#projects-grid .finder-icon")
        .forEach((icon) => {
          if (icon.dataset.tags && icon.dataset.tags.includes(tag)) {
            icon.style.display = "flex";
          } else {
            icon.style.display = "none";
          }
        });
    });
  });

  // Icon click - Quick Look
  finderIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const img = this.querySelector(".finder-icon-img");
      const name = this.querySelector(".finder-icon-name").textContent;

      quicklookImage.src = img.src;
      quicklookName.textContent = name;
      quicklookTitle.textContent = name;

      quicklook.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close Quick Look
  if (quicklookClose) {
    quicklookClose.addEventListener("click", function () {
      quicklook.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Close Quick Look on overlay click
  if (quicklook) {
    quicklook.addEventListener("click", function (e) {
      if (e.target === this) {
        quicklook.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // ESC to close Quick Look
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      quicklook &&
      quicklook.classList.contains("active")
    ) {
      quicklook.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
