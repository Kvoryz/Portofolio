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

  // Text 1: Developer Object
  const codeLines1 = [
    { text: "const ", class: "keyword" },
    { text: "developer ", class: "variable" },
    { text: "= ", class: "operator" },
    { text: "{\n", class: "punctuation" },
    { text: "  name: ", class: "property" },
    { text: '"Raffi Andhika R",', class: "string" },
    { text: "  alias: ", class: "property" },
    { text: '"Kvory",\n', class: "string" },
    { text: "  role: ", class: "property" },
    { text: '"Full Stack Developer",\n', class: "string" },
    { text: "  skills: ", class: "property" },
    { text: '["JavaScript", "PHP", "Python"],\n', class: "string" },
    { text: "  learning: ", class: "property" },
    { text: '"Laravel & Java",\n', class: "string" },
    { text: "  github: ", class: "property" },
    { text: '"github.com/kvoryz",\n', class: "string" },
    { text: "  coffee: ", class: "property" },
    { text: '"Infinite ☕",\n', class: "string" },
    { text: "  available: ", class: "property" },
    { text: "true\n", class: "keyword" },
    { text: "};", class: "punctuation" },
  ];

  // Text 2: Hire Function
  // Text 2: Hire Function
  const codeLines2 = [
    { text: "function ", class: "keyword" },
    { text: "hire", class: "variable" },
    { text: "(developer) ", class: "punctuation" },
    { text: "{\n", class: "punctuation" },
    { text: "  if ", class: "keyword" },
    { text: "(developer.", class: "punctuation" },
    { text: "available", class: "property" },
    { text: ") {\n", class: "punctuation" },
    { text: "    return ", class: "keyword" },
    { text: '"Let’s build something great."', class: "string" },
    { text: ";\n", class: "punctuation" },
    { text: "  } ", class: "punctuation" },
    { text: "else", class: "keyword" },
    { text: " {\n", class: "punctuation" },
    { text: "    return ", class: "keyword" },
    { text: '"Currently working on another project."', class: "string" },
    { text: ";\n", class: "punctuation" },
    { text: "  }\n", class: "punctuation" },
    { text: "}\n\n", class: "punctuation" },
    { text: "hire", class: "variable" },
    { text: "(developer); ", class: "punctuation" },
    { text: "// Ready when you are", class: "comment" },
  ];

  // Delete animation type: 0 = Ctrl+A, 1 = one by one
  const deleteTypes = [0, 1]; // Text 1: Ctrl+A, Text 2: one by one

  const allTexts = [codeLines1, codeLines2];
  let currentTextIndex = 0;
  let codeLines = allTexts[currentTextIndex];

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

  // Typo simulation variables
  let isTypingTypo = false;
  let typoCharsToDelete = 0;
  let pendingCorrectChar = "";
  const typoChance = 0.03;
  const typoChars = "asdfghjklqwertyuiopzxcvbnm";

  function getTypingDelay(char, prevChar) {
    // Variable speed based on character
    if (prevChar === "." || prevChar === ",") return 150;
    if (prevChar === "{" || prevChar === "}") return 180;
    if (prevChar === "(") return 120;
    if (char === "\n") return 100;
    return Math.random() * 40 + 30; // 30-70ms normal
  }

  function typeCode() {
    if (!codeElement) return;

    // Handle typo deletion
    if (typoCharsToDelete > 0) {
      const spans = codeElement.querySelectorAll("span:not(.cursor-blink)");
      for (let i = spans.length - 1; i >= 0; i--) {
        if (spans[i].textContent.length > 0) {
          spans[i].textContent = spans[i].textContent.slice(0, -1);
          if (spans[i].textContent.length === 0) {
            spans[i].remove();
          }
          break;
        }
      }
      typoCharsToDelete--;
      updateLineNumbers();
      setTimeout(typeCode, 80);
      return;
    }

    // Type the correct character after typo was deleted
    if (pendingCorrectChar !== "") {
      const currentSpan = codeElement.querySelector(`.line-${lineIndex}`);
      if (currentSpan) {
        currentSpan.textContent += pendingCorrectChar;
      }
      pendingCorrectChar = "";
      charIndex++;
      updateLineNumbers();
      setTimeout(typeCode, Math.random() * 40 + 30);
      return;
    }

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
        const char = fullText.charAt(charIndex);
        const prevChar = charIndex > 0 ? fullText.charAt(charIndex - 1) : "";

        // Random typo (only for letters, not at end of segment)
        if (
          Math.random() < typoChance &&
          /[a-zA-Z]/.test(char) &&
          !isTypingTypo &&
          charIndex < fullText.length - 1
        ) {
          const wrongChar = typoChars.charAt(
            Math.floor(Math.random() * typoChars.length)
          );
          currentSpan.textContent += wrongChar;
          isTypingTypo = true;
          typoCharsToDelete = 1;
          pendingCorrectChar = char;
          updateLineNumbers();
          setTimeout(typeCode, 300);
          return;
        }

        isTypingTypo = false;
        currentSpan.textContent += char;
        charIndex++;
        updateLineNumbers();
        setTimeout(typeCode, getTypingDelay(char, prevChar));
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeCode, 80);
      }
    } else {
      setTimeout(deleteCode, 2000);
    }
  }

  function deleteCode() {
    if (!codeElement) return;
    const spans = codeElement.querySelectorAll("span:not(.cursor-blink)");
    const deleteType = deleteTypes[currentTextIndex];

    if (spans.length > 0) {
      if (deleteType === 0) {
        // Ctrl+A style: highlight all then delete
        spans.forEach((span) => {
          span.style.background = "rgba(32, 201, 151, 0.3)";
          span.style.borderRadius = "2px";
        });

        setTimeout(() => {
          spans.forEach((span) => span.remove());
          updateLineNumbers();
          switchToNextText();
        }, 800);
      } else {
        // One by one delete
        deleteOneByOne();
      }
    } else {
      switchToNextText();
    }
  }

  function deleteOneByOne() {
    const spans = codeElement.querySelectorAll("span:not(.cursor-blink)");
    const allText = Array.from(spans)
      .map((s) => s.textContent)
      .join("");

    if (allText.length > 0) {
      for (let i = spans.length - 1; i >= 0; i--) {
        if (spans[i].textContent.length > 0) {
          spans[i].textContent = spans[i].textContent.slice(0, -1);
          if (spans[i].textContent.length === 0) {
            spans[i].remove();
          }
          break;
        }
      }
      updateLineNumbers();
      setTimeout(deleteOneByOne, 15);
    } else {
      switchToNextText();
    }
  }

  function switchToNextText() {
    currentTextIndex = (currentTextIndex + 1) % allTexts.length;
    codeLines = allTexts[currentTextIndex];
    lineIndex = 0;
    charIndex = 0;
    setTimeout(typeCode, 500);
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
      // Title removed from UI

      if (folder === "projects") {
        if (projectsGrid) {
          projectsGrid.style.display = "grid";
          document
            .querySelectorAll("#projects-grid .finder-icon")
            .forEach(function (icon) {
              icon.style.display = "flex";
            });
        }
        if (certificatesGrid) certificatesGrid.style.display = "none";
      } else if (folder === "certificates") {
        if (projectsGrid) projectsGrid.style.display = "none";
        if (certificatesGrid) certificatesGrid.style.display = "grid";
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
      // Title removed from UI

      if (projectsGrid) {
        projectsGrid.style.display = "grid";
        document
          .querySelectorAll("#projects-grid .finder-icon")
          .forEach(function (icon) {
            icon.style.display = "flex";
          });
      }
      if (certificatesGrid) certificatesGrid.style.display = "none";

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

// --- GitHub Stats Integration ---
async function fetchGitHubStats() {
  const username = "Kvoryz";
  
  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
    
    // Fetch events for contribution activity
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
    const events = await eventsResponse.json();
    
    // Calculate stats from events
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    
    // Count push events as contributions
    let totalContributions = 0;
    let weeklyContributions = 0;
    let dailyContributions = {};
    
    events.forEach(event => {
      if (event.type === "PushEvent" || event.type === "CreateEvent" || event.type === "PullRequestEvent") {
        const eventDate = new Date(event.created_at);
        const dateKey = eventDate.toISOString().split('T')[0];
        
        // Count commits in push events
        let count = 1;
        if (event.type === "PushEvent" && event.payload && event.payload.commits) {
          count = event.payload.commits.length;
        }
        
        totalContributions += count;
        
        if (eventDate >= oneWeekAgo) {
          weeklyContributions += count;
        }
        
        dailyContributions[dateKey] = (dailyContributions[dateKey] || 0) + count;
      }
    });
    
    // Calculate best day and average
    const dailyCounts = Object.values(dailyContributions);
    const bestDay = dailyCounts.length > 0 ? Math.max(...dailyCounts) : 0;
    const avgPerDay = dailyCounts.length > 0 ? Math.round(totalContributions / Math.max(dailyCounts.length, 1)) : 0;
    
    // Update DOM
    const totalEl = document.getElementById("gh-total");
    const weekEl = document.getElementById("gh-week");
    const bestEl = document.getElementById("gh-best");
    const avgEl = document.getElementById("gh-avg");
    
    if (totalEl) totalEl.textContent = totalContributions || userData.public_repos * 10;
    if (weekEl) weekEl.textContent = weeklyContributions;
    if (bestEl) bestEl.textContent = bestDay;
    if (avgEl) avgEl.textContent = avgPerDay;
    
  } catch (error) {
    console.log("GitHub API error:", error);
    // Fallback to placeholder values
    const totalEl = document.getElementById("gh-total");
    const weekEl = document.getElementById("gh-week");
    const bestEl = document.getElementById("gh-best");
    const avgEl = document.getElementById("gh-avg");
    
    if (totalEl) totalEl.textContent = "100+";
    if (weekEl) weekEl.textContent = "10";
    if (bestEl) bestEl.textContent = "15";
    if (avgEl) avgEl.textContent = "2";
  }
}

// Fetch GitHub stats on load
fetchGitHubStats();
