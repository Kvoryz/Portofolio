document.addEventListener("DOMContentLoaded", function () {
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

        if (targetId === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          let offset = 70;
          if (targetId === "#contact") {
            offset = 20;
          }
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
    const scrollPos = window.scrollY + 150;

    const about = document.getElementById("about");
    const showcase = document.getElementById("showcase");
    const tools = document.getElementById("tools");
    const contact = document.getElementById("contact");

    // Check from bottom to top for more reliable detection
    if (contact && scrollPos >= contact.offsetTop - 200) {
      setActiveNav("#contact");
    } else if (tools && scrollPos >= tools.offsetTop - 100) {
      setActiveNav("#tools");
    } else if (showcase && scrollPos >= showcase.offsetTop - 100) {
      setActiveNav("#showcase");
    } else if (about && scrollPos >= about.offsetTop - 100) {
      setActiveNav("#about");
    } else {
      setActiveNav("#home");
    }
  });

  setActiveNav("#home");

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

  // Skills Terminal Auto-Type Animation
  const toolsSection = document.getElementById("tools");
  const skillsTypedCommand = document.getElementById("skills-typed-command");
  const skillsCursor = document.getElementById("skills-cursor");
  const skillsPackageInfo = document.getElementById("skills-package-info");
  const skillsTreeContent = document.getElementById("skills-tree-content");

  let skillsTypingDone = false;

  if (toolsSection && skillsTypedCommand) {
    const commandText = "npm list --skills --depth=2";

    const toolsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsTypingDone) {
            skillsTypingDone = true;

            let charIndex = 0;
            const typeInterval = setInterval(() => {
              if (charIndex < commandText.length) {
                skillsTypedCommand.textContent += commandText.charAt(charIndex);
                charIndex++;
              } else {
                clearInterval(typeInterval);

                // Hide cursor after typing
                setTimeout(() => {
                  if (skillsCursor) skillsCursor.style.display = "none";

                  // Show package info with fade
                  if (skillsPackageInfo) {
                    skillsPackageInfo.style.display = "block";
                    skillsPackageInfo.style.animation = "fadeIn 0.5s ease";
                  }

                  // Show skills tree with fade
                  setTimeout(() => {
                    if (skillsTreeContent) {
                      skillsTreeContent.style.display = "block";
                      skillsTreeContent.style.animation = "fadeIn 0.5s ease";
                    }
                  }, 300);
                }, 200);
              }
            }, 80);
          }
        });
      },
      { threshold: 0.3 }
    );

    toolsObserver.observe(toolsSection);
  }

  AOS.init({ duration: 800, easing: "ease", once: true, offset: 100 });

  const codeElement = document.getElementById("code-typewriter");

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
    { text: '"Junior Software Developer",\n', class: "string" },
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
    { text: " // Hint: not everything here is static.", class: "comment" },
  ];

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
  ];

  const deleteTypes = [0, 1]; // Text 1: Ctrl+A, Text 2: one by one

  const allTexts = [codeLines1, codeLines2];
  let currentTextIndex = 0;
  let codeLines = allTexts[currentTextIndex];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineNum = 1;

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

  let isTypingTypo = false;
  let typoCharsToDelete = 0;
  let pendingCorrectChar = "";
  const typoChance = 0.03;
  const typoChars = "asdfghjklqwertyuiopzxcvbnm";

  function getTypingDelay(char, prevChar) {
    if (prevChar === "." || prevChar === ",") return 150;
    if (prevChar === "{" || prevChar === "}") return 180;
    if (prevChar === "(") return 120;
    if (char === "\n") return 100;
    return Math.random() * 40 + 30;
  }

  function typeCode() {
    if (!codeElement) return;

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

  const rubiksCube = document.querySelector(".rubiks-cube");

  if (rubiksCube && typeof anime !== "undefined") {
    rubiksCube.style.animation = "none";

    const cubeTimeline = anime.timeline({
      loop: true,
      easing: "easeInOutSine",
    });

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

  const sidebarItems = document.querySelectorAll(".sidebar-item[data-folder]");
  const tagItems = document.querySelectorAll(".sidebar-item[data-tag]");
  const projectsGrid = document.getElementById("projects-grid");
  const certificatesGrid = document.getElementById("certificates-grid");
  const gamesGrid = document.getElementById("games-grid");
  const finderTitle = document.getElementById("finder-current-folder");
  const finderIcons = document.querySelectorAll(".finder-icon");
  const quicklook = document.getElementById("quicklook");
  const quicklookClose = document.getElementById("quicklook-close");
  const quicklookImage = document.getElementById("quicklook-image");
  const quicklookName = document.getElementById("quicklook-name");
  const quicklookTitle = document.getElementById("quicklook-title");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      tagItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const folder = this.dataset.folder;

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
        if (gamesGrid) gamesGrid.style.display = "none";
      } else if (folder === "certificates") {
        if (projectsGrid) projectsGrid.style.display = "none";
        if (certificatesGrid) certificatesGrid.style.display = "grid";
        if (gamesGrid) gamesGrid.style.display = "none";
      } else if (folder === "games") {
        if (projectsGrid) projectsGrid.style.display = "none";
        if (certificatesGrid) certificatesGrid.style.display = "none";
        if (gamesGrid) gamesGrid.style.display = "grid";
      }
    });
  });

  tagItems.forEach((item) => {
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      tagItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const tag = this.dataset.tag;

      if (projectsGrid) {
        projectsGrid.style.display = "grid";
        document
          .querySelectorAll("#projects-grid .finder-icon")
          .forEach(function (icon) {
            icon.style.display = "flex";
          });
      }
      if (certificatesGrid) certificatesGrid.style.display = "none";
      if (gamesGrid) gamesGrid.style.display = "none";

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

  if (quicklookClose) {
    quicklookClose.addEventListener("click", function () {
      quicklook.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (quicklook) {
    quicklook.addEventListener("click", function (e) {
      if (e.target === this) {
        quicklook.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

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

async function fetchGitHubStats() {
  const username = "Kvoryz";

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`
    );
    const events = await eventsResponse.json();

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    let totalContributions = 0;
    let weeklyContributions = 0;
    let dailyContributions = {};

    events.forEach((event) => {
      if (
        event.type === "PushEvent" ||
        event.type === "CreateEvent" ||
        event.type === "PullRequestEvent"
      ) {
        const eventDate = new Date(event.created_at);
        const dateKey = eventDate.toISOString().split("T")[0];

        let count = 1;
        if (
          event.type === "PushEvent" &&
          event.payload &&
          event.payload.commits
        ) {
          count = event.payload.commits.length;
        }

        totalContributions += count;

        if (eventDate >= oneWeekAgo) {
          weeklyContributions += count;
        }

        dailyContributions[dateKey] =
          (dailyContributions[dateKey] || 0) + count;
      }
    });

    const dailyCounts = Object.values(dailyContributions);
    const bestDay = dailyCounts.length > 0 ? Math.max(...dailyCounts) : 0;
    const avgPerDay =
      dailyCounts.length > 0
        ? Math.round(totalContributions / Math.max(dailyCounts.length, 1))
        : 0;

    const totalEl = document.getElementById("gh-total");
    const weekEl = document.getElementById("gh-week");
    const bestEl = document.getElementById("gh-best");
    const avgEl = document.getElementById("gh-avg");

    if (totalEl)
      totalEl.textContent = totalContributions || userData.public_repos * 10;
    if (weekEl) weekEl.textContent = weeklyContributions;
    if (bestEl) bestEl.textContent = bestDay;
    if (avgEl) avgEl.textContent = avgPerDay;
  } catch (error) {
    console.log("GitHub API error:", error);

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

fetchGitHubStats();

(function () {
  const snakeContainer = document.getElementById("terminal-game-container");
  const terminalInputLine = document.getElementById("terminal-input-line");
  const canvas = document.getElementById("snake-canvas");
  const overlay = document.getElementById("terminal-game-overlay");
  const startScreen = document.getElementById("snake-start-screen");
  const gameOverScreen = document.getElementById("snake-game-over");
  const startBtn = document.getElementById("snake-start-btn");
  const restartBtn = document.getElementById("snake-restart-btn");
  const exitBtn = document.getElementById("snake-exit-btn");
  const closeBtn = document.getElementById("snake-close-btn");
  const scoreEl = document.getElementById("snake-score");
  const finalScoreEl = document.getElementById("snake-final-score");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let snake = [];
  let food = { x: 0, y: 0 };
  let obstacles = [];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let score = 0;
  let lastObstacleScore = 0;
  let gameLoop = null;
  let gridSize = 15;
  let tileCount = { x: 0, y: 0 };

  const colors = {
    background: "#0d1117",
    grid: "#161b22",
    snake: "#39d353",
    snakeHead: "#39d353",
    food: "#f85149",
    foodGlow: "rgba(248, 81, 73, 0.3)",
    obstacle: "#8957e5",
  };

  function resizeCanvas() {
    if (!snakeContainer) return;

    canvas.width = snakeContainer.offsetWidth;
    canvas.height = snakeContainer.offsetHeight || 250;

    tileCount.x = Math.floor(canvas.width / gridSize);
    tileCount.y = Math.floor(canvas.height / gridSize);
  }

  function initGame() {
    resizeCanvas();

    const centerX = Math.floor(tileCount.x / 2);
    const centerY = Math.floor(tileCount.y / 2);
    snake = [
      { x: centerX, y: centerY },
      { x: centerX - 1, y: centerY },
      { x: centerX - 2, y: centerY },
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    lastObstacleScore = 0;
    obstacles = [];
    updateScore();
    spawnFood();
  }

  function spawnFood() {
    let validPosition = false;
    while (!validPosition) {
      food.x = Math.floor(Math.random() * tileCount.x);
      food.y = Math.floor(Math.random() * tileCount.y);

      validPosition =
        !snake.some(
          (segment) => segment.x === food.x && segment.y === food.y
        ) && !obstacles.some((obs) => obs.x === food.x && obs.y === food.y);
    }
  }

  function spawnObstacle() {
    let validPosition = false;
    let newObs = { x: 0, y: 0 };

    while (!validPosition) {
      newObs.x = Math.floor(Math.random() * tileCount.x);
      newObs.y = Math.floor(Math.random() * tileCount.y);

      const onSnake = snake.some((s) => s.x === newObs.x && s.y === newObs.y);
      const onFood = food.x === newObs.x && food.y === newObs.y;
      const onObstacle = obstacles.some(
        (o) => o.x === newObs.x && o.y === newObs.y
      );

      validPosition = !onSnake && !onFood && !onObstacle;
    }

    obstacles.push(newObs);
  }

  function draw() {
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = colors.grid;
    for (let x = 0; x < tileCount.x; x++) {
      for (let y = 0; y < tileCount.y; y++) {
        ctx.fillRect(
          x * gridSize + 1,
          y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      }
    }

    ctx.shadowColor = colors.food;
    ctx.shadowBlur = 10;
    ctx.fillStyle = colors.food;
    ctx.beginPath();
    ctx.arc(
      food.x * gridSize + gridSize / 2,
      food.y * gridSize + gridSize / 2,
      gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = colors.snakeHead;
        ctx.shadowColor = colors.snakeHead;
        ctx.shadowBlur = 8;
      } else {
        const alpha = 1 - (index / snake.length) * 0.5;
        ctx.fillStyle = `rgba(32, 201, 151, ${alpha})`;
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.roundRect(
        segment.x * gridSize + 1,
        segment.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2,
        3
      );
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    if (obstacles.length > 0) {
      ctx.fillStyle = colors.obstacle;
      ctx.shadowColor = colors.obstacle;
      ctx.shadowBlur = 5;
      obstacles.forEach((obs) => {
        ctx.fillRect(
          obs.x * gridSize + 2,
          obs.y * gridSize + 2,
          gridSize - 4,
          gridSize - 4
        );
      });
      ctx.shadowBlur = 0;
    }
  }

  function update() {
    direction = { ...nextDirection };

    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (head.x < 0) head.x = tileCount.x - 1;
    if (head.x >= tileCount.x) head.x = 0;
    if (head.y < 0) head.y = tileCount.y - 1;
    if (head.y >= tileCount.y) head.y = 0;

    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      gameOver();
      return;
    }

    if (obstacles.some((obs) => obs.x === head.x && obs.y === head.y)) {
      gameOver();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      updateScore();
      spawnFood();

      if (score >= 50 && score - lastObstacleScore >= 50) {
        spawnObstacle();
        spawnObstacle();
        spawnObstacle();
        lastObstacleScore = score;
      }
    } else {
      snake.pop();
    }

    draw();
  }

  function updateScore() {
    if (scoreEl) scoreEl.textContent = score;
  }

  function gameOver() {
    clearInterval(gameLoop);
    gameLoop = null;

    if (finalScoreEl) finalScoreEl.textContent = score;
    if (startScreen) startScreen.style.display = "none";
    if (gameOverScreen) gameOverScreen.style.display = "block";
    if (overlay) overlay.classList.remove("hidden");
  }

  function startGame() {
    initGame();
    if (overlay) overlay.classList.add("hidden");
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 100);
  }

  function showGame() {
    if (snakeContainer) snakeContainer.classList.add("active");
    if (terminalInputLine) terminalInputLine.style.display = "none";
    if (overlay) overlay.classList.remove("hidden");
    if (startScreen) startScreen.style.display = "block";
    if (gameOverScreen) gameOverScreen.style.display = "none";

    resizeCanvas();
    draw();
  }

  function hideGame() {
    if (gameLoop) {
      clearInterval(gameLoop);
      gameLoop = null;
    }
    if (snakeContainer) snakeContainer.classList.remove("active");
    if (terminalInputLine) terminalInputLine.style.display = "flex";
  }

  window.launchSnakeGame = showGame;

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (restartBtn) restartBtn.addEventListener("click", startGame);
  if (exitBtn) exitBtn.addEventListener("click", hideGame);
  if (closeBtn) closeBtn.addEventListener("click", hideGame);

  document.addEventListener("keydown", function (e) {
    if (!snakeContainer || !snakeContainer.classList.contains("active")) return;
    if (gameLoop === null) return;

    const key = e.key.toLowerCase();

    switch (key) {
      case "w":
        if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
        break;
      case "s":
        if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
        break;
      case "a":
        if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
        break;
      case "d":
        if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
        break;
    }
  });

  window.addEventListener("resize", function () {
    if (snakeContainer && snakeContainer.classList.contains("active")) {
      resizeCanvas();
      if (gameLoop === null) draw();
    }
  });
})();

(function () {
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");
  const terminalBody = document.getElementById("terminal-body");
  const terminalSection = document.getElementById("terminal-section");
  const terminalTrigger = document.getElementById("terminal-trigger");

  if (!terminalInput || !terminalOutput) return;

  let typingAnimationRun = false;
  function typeWelcomeMessage() {
    const welcomeText = document.getElementById("welcome-text");
    const welcomeCursor = document.getElementById("welcome-cursor");
    if (!welcomeText || typingAnimationRun) return;

    typingAnimationRun = true;
    const message = "Welcome to Kvory's Terminal!";
    let i = 0;
    welcomeText.textContent = "";

    function typeChar() {
      if (i < message.length) {
        welcomeText.textContent += message.charAt(i);
        i++;
        setTimeout(typeChar, 50);
      } else {
        setTimeout(() => {
          if (welcomeCursor) welcomeCursor.style.display = "none";
        }, 1000);
      }
    }
    typeChar();
  }

  if (terminalTrigger && terminalSection) {
    terminalTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (terminalSection.style.display === "none") {
        terminalSection.style.display = "block";
        terminalInput.focus();

        typeWelcomeMessage();
      } else {
        terminalSection.style.display = "none";
      }
    });
  }

  const terminalClose = document.getElementById("terminal-close");
  if (terminalClose && terminalSection) {
    terminalClose.addEventListener("click", function () {
      terminalSection.style.display = "none";
    });
  }

  let commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: function () {
      return `
<div class="terminal-line"><span class="text-success">Available commands:</span></div>
<div class="terminal-line"><span class="text-warning">$ help</span> <span class="text-muted">- Show this help message</span></div>
<div class="terminal-line"><span class="text-warning">$ game</span> <span class="text-muted">- Launch Snake Game</span></div>
<div class="terminal-line"><span class="text-warning">$ reaction</span> <span class="text-muted">- Reaction Time Test</span></div>
<div class="terminal-line"><span class="text-warning">$ ttt</span> <span class="text-muted">- Tic Tac Toe</span></div>
<div class="terminal-line"><span class="text-warning">$ minesweeper</span> <span class="text-muted">- Play Minesweeper</span></div>
<div class="terminal-line"><span class="text-warning">$ clear</span> <span class="text-muted">- Clear terminal output</span></div>
<div class="terminal-line"><span class="text-warning">$ neofetch</span> <span class="text-muted">- Display system info</span></div>
<div class="terminal-line"><span class="text-warning">$ surprise</span> <span class="text-muted">- Random Easter egg </span></div>
<div class="terminal-line"><span class="text-warning">$ matrix</span> <span class="text-muted">- Enter the Matrix </span></div>
<div class="terminal-line"><span class="text-warning">$ exit</span> <span class="text-muted">- Close terminal</span></div>
      `.trim();
    },

    game: function () {
      if (typeof window.launchSnakeGame === "function") {
        terminalOutput.innerHTML = "";
        setTimeout(() => window.launchSnakeGame(), 100);
        return '<div class="terminal-line"><span class="text-success">Launching Snake Game...</span></div>';
      }
      return '<div class="terminal-line"><span class="text-danger">Error: Game not available</span></div>';
    },

    clear: function () {
      terminalOutput.innerHTML = "";
      return null;
    },

    cat: function () {
      return `
<div class="terminal-line"><span class="text-success" style="white-space:pre; font-family: monospace;">
    /\\_/\\  
   ( o.o ) 
    > ^ <   Meow! Keep coding! 🐱
   
   (This is not the unix cat you're looking for...)
</span></div>
      `.trim();
    },

    neofetch: function () {
      const asciiArt = `
   ╔═══════════════════╗
   ║   ██╗  ██╗██╗   ██║
   ║   ██║ ██╔╝██║   ██║
   ║   █████╔╝ ██║   ██║
   ║   ██╔═██╗ ╚██╗ ██╔╝
   ║   ██║  ██╗ ╚████╔╝ ║
   ║   ╚═╝  ╚═╝  ╚═══╝  ║
   ╚═══════════════════╝`;

      return `
<div class="neofetch-container">
  <div class="neofetch-ascii">${asciiArt}</div>
  <div class="neofetch-info">
    <div><span class="label">kvory</span><span class="value">@terminal</span></div>
    <div>─────────────────</div>
    <div><span class="label">OS:</span> <span class="value">Web Browser</span></div>
    <div><span class="label">Host:</span> <span class="value">Kvory Portfolio</span></div>
    <div><span class="label">Kernel:</span> <span class="value">JavaScript ES6+</span></div>
    <div><span class="label">Uptime:</span> <span class="value">∞ (Always Online)</span></div>
    <div><span class="label">Shell:</span> <span class="value">kvory-terminal 1.0</span></div>
    <div><span class="label">Theme:</span> <span class="value">GitHub Dark</span></div>
    <div><span class="label">Terminal:</span> <span class="value">Interactive Web Terminal</span></div>
    <div><span class="label">CPU:</span> <span class="value">Your Brain @ ∞ GHz</span></div>
    <div><span class="label">Memory:</span> <span class="value">Unlimited Ideas</span></div>
    <div class="neofetch-colors">
      <span style="background:#0d1117"></span>
      <span style="background:#f85149"></span>
      <span style="background:#febc2e"></span>
      <span style="background:#28c840"></span>
      <span style="background:#39d353"></span>
      <span style="background:#58a6ff"></span>
      <span style="background:#8957e5"></span>
      <span style="background:#e6edf3"></span>
    </div>
  </div>
</div>
      `.trim();
    },

    surprise: function () {
      const surprises = [
        {
          type: "quote",
          content: `
<div class="terminal-line"><span class="text-warning">💡 Quote of the moment:</span></div>
<div class="terminal-line"><span class="text-muted">"Code is like humor. When you have to explain it, it's bad."</span></div>
<div class="terminal-line"><span class="text-primary">— Cory House</span></div>`,
        },
        {
          type: "ascii",
          content: `
<div class="terminal-line"><span class="text-success" style="white-space:pre;">
  ╔══════════════════════════════════╗
  ║  🎉 You found an Easter Egg! 🎉  ║
  ║     Thanks for exploring!        ║
  ╚══════════════════════════════════╝
</span></div>`,
        },
        {
          type: "joke",
          content: `
<div class="terminal-line"><span class="text-warning">😂 Dev Joke:</span></div>
<div class="terminal-line"><span class="text-muted">Why do programmers prefer dark mode?</span></div>
<div class="terminal-line"><span class="text-success">Because light attracts bugs! 🐛</span></div>`,
        },
        {
          type: "fortune",
          content: `
<div class="terminal-line"><span class="text-warning">🔮 Your Fortune:</span></div>
<div class="terminal-line"><span class="text-muted">A great coding session awaits you today.</span></div>
<div class="terminal-line"><span class="text-primary">Lucky numbers: 42, 404, 500</span></div>`,
        },
        {
          type: "cat",
          content: `
<div class="terminal-line"><span class="text-success" style="white-space:pre;">
    /\\_/\\  
   ( o.o ) 
    > ^ <   Meow! Keep coding! 🐱
</span></div>`,
        },
        {
          type: "matrix",
          content: `
<div class="terminal-line"><span class="text-success">Wake up, Neo...</span></div>
<div class="terminal-line"><span class="text-success">The Matrix has you...</span></div>
<div class="terminal-line"><span class="text-success">Follow the white rabbit.</span></div>`,
        },
      ];

      const random = surprises[Math.floor(Math.random() * surprises.length)];
      return random.content.trim();
    },

    reaction: function () {
      terminalOutput.innerHTML = "";

      const container = document.createElement("div");
      container.id = "reaction-container";
      container.style.cssText = `
        width: 100%;
        height: 200px;
        background: #f85149;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        margin: 10px 0;
        transition: background 0.3s;
        font-family: monospace;
      `;

      const text = document.createElement("div");
      text.style.cssText = "color: white; font-size: 20px; font-weight: bold;";
      text.textContent = "Wait for green...";
      container.appendChild(text);

      const subtext = document.createElement("div");
      subtext.style.cssText =
        "color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 10px;";
      subtext.textContent = "Click when the box turns green!";
      container.appendChild(subtext);

      terminalOutput.appendChild(container);

      let startTime = 0;
      let waiting = true;
      let tooEarly = false;
      let timeout = null;

      function startWait() {
        waiting = true;
        tooEarly = false;
        container.style.background = "#f85149";
        text.textContent = "Wait for green...";
        subtext.textContent = "Click when the box turns green!";

        const delay = 2000 + Math.random() * 3000;
        timeout = setTimeout(() => {
          container.style.background = "#39d353";
          text.textContent = "CLICK NOW!";
          subtext.textContent = "";
          startTime = Date.now();
          waiting = false;
        }, delay);
      }

      container.addEventListener("click", () => {
        if (waiting) {
          clearTimeout(timeout);
          container.style.background = "#f0883e";
          text.textContent = "Too early! ⚠️";
          subtext.textContent = "Click to try again";
          tooEarly = true;
        } else if (tooEarly) {
          startWait();
        } else {
          const reactionTime = Date.now() - startTime;
          container.style.background = "#58a6ff";

          let rating = "";
          if (reactionTime < 200) rating = "🏆 Incredible!";
          else if (reactionTime < 250) rating = "🥇 Excellent!";
          else if (reactionTime < 300) rating = "🥈 Great!";
          else if (reactionTime < 400) rating = "🥉 Good";
          else if (reactionTime < 500) rating = "👍 Average";
          else rating = "🐢 Slow";

          text.textContent = reactionTime + " ms";
          subtext.innerHTML =
            rating +
            "<br><span style='font-size:12px;margin-top:8px;display:block;'>Click to try again</span>";
          tooEarly = true;
        }
      });

      startWait();

      return '<div class="terminal-line"><span class="text-success">⏱️ Reaction Time Test started! Wait for green, then click!</span></div>';
    },

    ttt: function () {
      terminalOutput.innerHTML = "";

      let board = ["", "", "", "", "", "", "", "", ""];
      let currentPlayer = "X";
      let gameOver = false;
      let winner = null;

      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function checkWinner() {
        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }
        return board.includes("") ? null : "draw";
      }

      function aiMove() {
        if (gameOver) return;

        // Simple AI: try to win, block, or pick random
        let move = -1;

        // Try to win
        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          const cells = [board[a], board[b], board[c]];
          if (
            cells.filter((c) => c === "O").length === 2 &&
            cells.includes("")
          ) {
            move = pattern[cells.indexOf("")];
            break;
          }
        }

        // Block player
        if (move === -1) {
          for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            const cells = [board[a], board[b], board[c]];
            if (
              cells.filter((c) => c === "X").length === 2 &&
              cells.includes("")
            ) {
              move = pattern[cells.indexOf("")];
              break;
            }
          }
        }

        // Take center or random
        if (move === -1) {
          if (board[4] === "") move = 4;
          else {
            const empty = board
              .map((c, i) => (c === "" ? i : -1))
              .filter((i) => i !== -1);
            move = empty[Math.floor(Math.random() * empty.length)];
          }
        }

        if (move !== -1) {
          board[move] = "O";
          winner = checkWinner();
          if (winner) gameOver = true;
          else currentPlayer = "X";
          renderBoard();
        }
      }

      function renderBoard() {
        const boardDiv = document.getElementById("ttt-board");
        if (!boardDiv) return;

        let html = '<div style="font-family: monospace; margin: 10px 0;">';
        html +=
          '<div style="color: #8b949e; margin-bottom: 10px;">You are X, AI is O</div>';
        html += '<table style="border-collapse: collapse; margin: 0 auto;">';

        for (let i = 0; i < 3; i++) {
          html += "<tr>";
          for (let j = 0; j < 3; j++) {
            const idx = i * 3 + j;
            const cell = board[idx];
            let color = "#8b949e";
            if (cell === "X") color = "#58a6ff";
            else if (cell === "O") color = "#f85149";

            const cursor = !gameOver && cell === "" ? "pointer" : "default";
            html += `<td style="width:60px;height:60px;text-align:center;font-size:28px;font-weight:bold;border:2px solid #30363d;color:${color};cursor:${cursor};background:#0d1117;" class="ttt-cell" data-idx="${idx}">${cell}</td>`;
          }
          html += "</tr>";
        }
        html += "</table>";

        if (gameOver) {
          if (winner === "draw") {
            html +=
              '<div style="color:#f0883e;margin-top:15px;font-size:18px;text-align:center;">Draw!</div>';
          } else if (winner === "X") {
            html +=
              '<div style="color:#39d353;margin-top:15px;font-size:18px;text-align:center;">You Win!</div>';
          } else {
            html +=
              '<div style="color:#f85149;margin-top:15px;font-size:18px;text-align:center;">AI Wins!</div>';
          }
          html +=
            '<div style="color:#8b949e;margin-top:5px;font-size:12px;text-align:center;">Type $ ttt to play again</div>';
        }
        html += "</div>";
        boardDiv.innerHTML = html;
      }

      const boardDiv = document.createElement("div");
      boardDiv.id = "ttt-board";
      terminalOutput.appendChild(boardDiv);
      renderBoard();

      boardDiv.addEventListener("click", (e) => {
        if (gameOver) return;
        const cell = e.target.closest(".ttt-cell");
        if (cell && currentPlayer === "X") {
          const idx = parseInt(cell.dataset.idx);
          if (board[idx] === "") {
            board[idx] = "X";
            winner = checkWinner();
            if (winner) {
              gameOver = true;
              renderBoard();
            } else {
              currentPlayer = "O";
              renderBoard();
              setTimeout(aiMove, 500);
            }
          }
        }
      });

      return '<div class="terminal-line"><span class="text-success">Tic Tac Toe started! You are X. Click a cell to play!</span></div>';
    },

    minesweeper: function () {
      terminalOutput.innerHTML = "";

      const size = 8;
      const mines = 10;
      let board = [];
      let revealed = [];
      let flagged = [];
      let gameOver = false;
      let won = false;

      // Initialize board
      for (let i = 0; i < size; i++) {
        board[i] = [];
        revealed[i] = [];
        flagged[i] = [];
        for (let j = 0; j < size; j++) {
          board[i][j] = 0;
          revealed[i][j] = false;
          flagged[i][j] = false;
        }
      }

      // Place mines
      let placed = 0;
      while (placed < mines) {
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);
        if (board[r][c] !== -1) {
          board[r][c] = -1;
          placed++;
        }
      }

      // Calculate numbers
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (board[i][j] === -1) continue;
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di,
                nj = j + dj;
              if (
                ni >= 0 &&
                ni < size &&
                nj >= 0 &&
                nj < size &&
                board[ni][nj] === -1
              )
                count++;
            }
          }
          board[i][j] = count;
        }
      }

      function renderBoard() {
        let html = '<div style="font-family: monospace; margin: 10px 0;">';
        html +=
          '<div style="color: #8b949e; margin-bottom: 5px;">Click: reveal | Right-click/Two finger: flag</div>';
        html += '<table style="border-collapse: collapse;">';
        for (let i = 0; i < size; i++) {
          html += "<tr>";
          for (let j = 0; j < size; j++) {
            let cellStyle = `
              width: 28px; height: 28px; text-align: center; cursor: pointer;
              border: 1px solid #30363d; font-weight: bold; font-size: 14px;
            `;
            let content = "";
            let bg = "#21262d";

            if (revealed[i][j]) {
              bg = "#0d1117";
              if (board[i][j] === -1) {
                content = "💣";
                bg = "#f85149";
              } else if (board[i][j] > 0) {
                const colors = [
                  "",
                  "#58a6ff",
                  "#39d353",
                  "#f85149",
                  "#8957e5",
                  "#f0883e",
                  "#39d353",
                  "#8b949e",
                  "#e6edf3",
                ];
                content = `<span style="color: ${colors[board[i][j]]}">${
                  board[i][j]
                }</span>`;
              }
            } else if (flagged[i][j]) {
              content = "🚩";
            }

            html += `<td style="${cellStyle} background: ${bg};" data-row="${i}" data-col="${j}" class="ms-cell">${content}</td>`;
          }
          html += "</tr>";
        }
        html += "</table>";

        if (gameOver) {
          html +=
            '<div style="color: #f85149; margin-top: 10px; font-size: 16px;"> GAME OVER! You hit a mine.</div>';
        } else if (won) {
          html +=
            '<div style="color: #39d353; margin-top: 10px; font-size: 16px;">YOU WIN! All mines cleared!</div>';
        }
        html += "</div>";
        return html;
      }

      function reveal(r, c) {
        if (r < 0 || r >= size || c < 0 || c >= size) return;
        if (revealed[r][c] || flagged[r][c]) return;

        revealed[r][c] = true;

        if (board[r][c] === -1) {
          gameOver = true;
          // Reveal all mines
          for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
              if (board[i][j] === -1) revealed[i][j] = true;
            }
          }
          return;
        }

        if (board[r][c] === 0) {
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              reveal(r + di, c + dj);
            }
          }
        }

        // Check win
        let unrevealedSafe = 0;
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (!revealed[i][j] && board[i][j] !== -1) unrevealedSafe++;
          }
        }
        if (unrevealedSafe === 0) won = true;
      }

      const boardDiv = document.createElement("div");
      boardDiv.id = "minesweeper-board";
      boardDiv.innerHTML = renderBoard();
      terminalOutput.appendChild(boardDiv);

      boardDiv.addEventListener("click", (e) => {
        if (gameOver || won) return;
        const cell = e.target.closest(".ms-cell");
        if (cell) {
          const r = parseInt(cell.dataset.row);
          const c = parseInt(cell.dataset.col);
          if (!flagged[r][c]) {
            reveal(r, c);
            boardDiv.innerHTML = renderBoard();
          }
        }
      });

      boardDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (gameOver || won) return;
        const cell = e.target.closest(".ms-cell");
        if (cell) {
          const r = parseInt(cell.dataset.row);
          const c = parseInt(cell.dataset.col);
          if (!revealed[r][c]) {
            flagged[r][c] = !flagged[r][c];
            boardDiv.innerHTML = renderBoard();
          }
        }
      });

      return (
        '<div class="terminal-line"><span class="text-success">Minesweeper started! ' +
        mines +
        " mines hidden in " +
        size +
        "x" +
        size +
        " grid.</span></div>"
      );
    },

    quit: function () {
      return '<div class="terminal-line"><span class="text-warning">Game exited. Thanks for playing!</span></div>';
    },

    matrix: function () {
      const terminalBody = document.getElementById("terminal-body");
      if (!terminalBody) return null;

      // Create matrix container
      let matrixContainer = document.getElementById("matrix-effect");
      if (!matrixContainer) {
        matrixContainer = document.createElement("div");
        matrixContainer.id = "matrix-effect";
        matrixContainer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          z-index: 100;
          overflow: hidden;
          font-family: monospace;
        `;
        terminalBody.style.position = "relative";
        terminalBody.appendChild(matrixContainer);
      }

      matrixContainer.innerHTML = "";

      const chars =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
      const columns = Math.floor(matrixContainer.offsetWidth / 14);
      const drops = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -50;
      }

      const canvas = document.createElement("canvas");
      canvas.width = matrixContainer.offsetWidth;
      canvas.height = matrixContainer.offsetHeight;
      matrixContainer.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      let frameCount = 0;
      const maxFrames = 300; // ~5 seconds at 60fps

      function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#39d353";
        ctx.font = "14px monospace";

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * 14, drops[i] * 14);

          if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        frameCount++;
        if (frameCount < maxFrames) {
          requestAnimationFrame(drawMatrix);
        } else {
          // End matrix effect
          setTimeout(() => {
            matrixContainer.remove();
          }, 500);
        }
      }

      drawMatrix();

      return `
<div class="terminal-line"><span class="text-success">Wake up, Neo...</span></div>
<div class="terminal-line"><span class="text-success">The Matrix has you...</span></div>
<div class="terminal-line"><span class="text-success">Follow the white rabbit. 🐇</span></div>
      `.trim();
    },

    exit: function () {
      const terminalSection = document.getElementById("terminal-section");
      if (terminalSection) {
        terminalSection.style.display = "none";
      }
      return null;
    },
  };

  function processCommand(input) {
    const rawInput = input.trim();

    if (rawInput === "") return null;

    if (!rawInput.startsWith("$")) {
      const cmdLine = document.createElement("div");
      cmdLine.className = "terminal-line command";
      cmdLine.innerHTML = `<span class="text-success">kvory</span><span class="text-muted">@</span><span class="text-primary">terminal</span><span class="text-muted"> ~$</span> <span class="cmd">${escapeHtml(
        rawInput
      )}</span>`;
      terminalOutput.appendChild(cmdLine);

      const errorLine = document.createElement("div");
      errorLine.className = "terminal-line";
      errorLine.innerHTML = `<span class="text-danger">Commands must start with $</span>. Example: <span class="text-warning">$ help</span>`;
      terminalOutput.appendChild(errorLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return null;
    }

    const cmd = rawInput.slice(1).trim().toLowerCase();

    // Clear previous output before new command (except for clear command itself)
    if (cmd !== "clear") {
      terminalOutput.innerHTML = "";
    }

    commandHistory.unshift(cmd);
    if (commandHistory.length > 50) commandHistory.pop();
    historyIndex = -1;

    const cmdLine = document.createElement("div");
    cmdLine.className = "terminal-line command";
    cmdLine.innerHTML = `<span class="text-success">kvory</span><span class="text-muted">@</span><span class="text-primary">terminal</span><span class="text-muted"> ~$</span> <span class="cmd">${escapeHtml(
      cmd
    )}</span>`;
    terminalOutput.appendChild(cmdLine);

    if (window.tttActive && /^[1-9]$/.test(cmd)) {
      const result = handleTTTMove(parseInt(cmd));
      if (result) {
        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = result;
        terminalOutput.appendChild(resultDiv);
      }
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return null;
    }

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) {
        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = result;
        terminalOutput.appendChild(resultDiv);
      }
    } else {
      const errorLine = document.createElement("div");
      errorLine.className = "terminal-line";
      errorLine.innerHTML = `<span class="text-danger">Command not found:</span> <span class="text-muted">${escapeHtml(
        cmd
      )}</span>. Type <span class="text-warning">help</span> for available commands.`;
      terminalOutput.appendChild(errorLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  terminalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      processCommand(this.value);
      this.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        this.value = commandHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        this.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        this.value = "";
      }
    }
  });

  terminalBody.addEventListener("click", function () {
    terminalInput.focus();
  });
})();
