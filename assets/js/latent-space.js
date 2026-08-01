(function () {
  "use strict";

  const canvas = document.querySelector("[data-latent-space]");
  if (!canvas || !canvas.getContext) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
  const stars = [];
  const columns = 31;
  const rows = 18;
  let width = 0;
  let height = 0;
  let scale = 1;
  let scrollDepth = 0;
  let frame = 0;
  let lastTime = 0;

  function seedStars() {
    stars.length = 0;
    const count = Math.max(64, Math.min(150, Math.round((width * height) / 10500)));
    for (let index = 0; index < count; index += 1) {
      const bias = Math.pow(Math.random(), 0.72);
      stars.push({
        x: bias,
        y: Math.random(),
        depth: 0.25 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        cyan: Math.random() > 0.25
      });
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    scale = Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.25 : 1.65);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(scale, 0, 0, scale, 0, 0);
    seedStars();
    draw(lastTime || 0);
  }

  function meshPoint(column, row, time) {
    const nx = column / (columns - 1);
    const ny = row / (rows - 1);
    const compact = width < 720;
    const meshStart = compact ? 0.44 : 0.48;
    const meshSpan = compact ? 1.18 : 0.76;
    const baseX = width * (meshStart + nx * meshSpan);
    const baseY = height * (0.055 + ny * 0.91);
    const ridge = Math.exp(-Math.pow(nx - 0.68, 2) / 0.055) *
      Math.exp(-Math.pow(ny - 0.38, 2) / 0.21);
    const valley = Math.exp(-Math.pow(nx - 0.23, 2) / 0.08) *
      Math.exp(-Math.pow(ny - 0.7, 2) / 0.16);
    const wave = Math.sin(nx * 8.4 + ny * 4.2 + time * 0.00022) * 0.5 +
      Math.cos(ny * 9.2 - nx * 2.5 + time * 0.00016) * 0.5;
    const depth = ridge * 1.15 - valley * 0.36 + wave * 0.095;
    const parallaxX = pointer.x * (20 + nx * 28) * (0.2 + depth * 0.55);
    const parallaxY = pointer.y * (10 + nx * 17) * (0.2 + depth * 0.42);
    const scrollWave = Math.sin(scrollDepth * 0.003 + nx * 3.5) * 8;

    let x = baseX + parallaxX + depth * width * 0.038;
    let y = baseY - depth * height * 0.16 + parallaxY + scrollWave;

    if (pointer.active && !coarsePointer.matches) {
      const mouseX = (pointer.x + 1) * width * 0.5;
      const mouseY = (pointer.y + 1) * height * 0.5;
      const deltaX = x - mouseX;
      const deltaY = y - mouseY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const influence = Math.max(0, 1 - distance / 260);
      x += deltaX * influence * 0.09;
      y += deltaY * influence * 0.09 - influence * 11;
    }

    return { x, y, depth, nx, ny };
  }

  function drawStars(time) {
    for (let index = 0; index < stars.length; index += 1) {
      const star = stars[index];
      const drift = reducedMotion.matches ? 0 : Math.sin(time * 0.00018 + star.phase) * 7;
      const x = width * star.x + pointer.x * star.depth * 15;
      const y = height * star.y + drift + pointer.y * star.depth * 10;
      const leftFade = Math.max(0.12, star.x);
      const alpha = (0.08 + star.depth * 0.22) * leftFade;
      const radius = 0.45 + star.depth * 1.05;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = star.cyan
        ? "rgba(56, 210, 255, " + alpha + ")"
        : "rgba(119, 93, 255, " + alpha + ")";
      context.fill();
    }
  }

  function drawMesh(time) {
    const points = [];
    for (let row = 0; row < rows; row += 1) {
      const line = [];
      for (let column = 0; column < columns; column += 1) {
        line.push(meshPoint(column, row, time));
      }
      points.push(line);
    }

    context.lineWidth = 0.65;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const point = points[row][column];
        const intensity = Math.max(0.05, Math.min(0.42, 0.08 + point.depth * 0.25 + point.nx * 0.11));
        const hue = column > columns * 0.69 ? "112, 91, 255" : "42, 202, 255";

        if (column < columns - 1) {
          const next = points[row][column + 1];
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = "rgba(" + hue + ", " + intensity + ")";
          context.stroke();
        }

        if (row < rows - 1) {
          const below = points[row + 1][column];
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(below.x, below.y);
          context.strokeStyle = "rgba(" + hue + ", " + intensity * 0.82 + ")";
          context.stroke();
        }

        if ((row + column) % 3 === 0 && row < rows - 1 && column < columns - 1) {
          const diagonal = points[row + 1][column + 1];
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(diagonal.x, diagonal.y);
          context.strokeStyle = "rgba(" + hue + ", " + intensity * 0.54 + ")";
          context.stroke();
        }
      }
    }

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const point = points[row][column];
        const glow = Math.max(0.08, Math.min(0.7, 0.14 + point.depth * 0.43 + point.nx * 0.13));
        const limeNode = column === columns - 7 && row === rows - 5;
        context.beginPath();
        context.arc(point.x, point.y, limeNode ? 2.25 : 0.65 + Math.max(0, point.depth) * 1.4, 0, Math.PI * 2);
        context.fillStyle = limeNode
          ? "rgba(181, 255, 45, 0.92)"
          : column > columns * 0.69
            ? "rgba(126, 99, 255, " + glow + ")"
            : "rgba(54, 211, 255, " + glow + ")";
        context.fill();
      }
    }
  }

  function draw(time) {
    lastTime = time;
    context.clearRect(0, 0, width, height);
    pointer.x += (pointer.targetX - pointer.x) * 0.045;
    pointer.y += (pointer.targetY - pointer.y) * 0.045;
    drawStars(time);
    drawMesh(time);
  }

  function animate(time) {
    if (!coarsePointer.matches || time - lastTime >= 30) {
      draw(time);
    }
    frame = window.requestAnimationFrame(animate);
  }

  function updatePointer(event) {
    pointer.targetX = (event.clientX / width) * 2 - 1;
    pointer.targetY = (event.clientY / height) * 2 - 1;
    pointer.active = true;
  }

  function clearPointer() {
    pointer.targetX = 0;
    pointer.targetY = 0;
    pointer.active = false;
  }

  function updateScroll() {
    scrollDepth = window.scrollY || 0;
    if (reducedMotion.matches) draw(lastTime);
  }

  function syncMotionPreference() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    if (reducedMotion.matches) {
      draw(0);
    } else {
      frame = window.requestAnimationFrame(animate);
    }
  }

  function stabilizeNavigation() {
    const navigation = document.querySelector("#site-nav");
    if (!navigation) return;

    const visible = navigation.querySelector(".visible-links");
    const hidden = navigation.querySelector(".hidden-links");
    const toggle = navigation.querySelector(".greedy-nav__toggle");
    if (!visible || !hidden || !toggle) return;

    const order = ["Publications", "Projects", "CV"];
    const items = Array.from(navigation.querySelectorAll("li:not(.persist)"));
    items.sort(function (first, second) {
      return order.indexOf(first.textContent.trim()) - order.indexOf(second.textContent.trim());
    });

    if (window.innerWidth > 700) {
      items.forEach(function (item) { visible.appendChild(item); });
      toggle.classList.add("hidden");
      toggle.classList.remove("close");
      hidden.classList.add("hidden");
    } else {
      items.forEach(function (item) { hidden.appendChild(item); });
      toggle.classList.remove("hidden");
      toggle.setAttribute("count", String(items.length));
    }
  }

  function scheduleNavigation() {
    window.requestAnimationFrame(stabilizeNavigation);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("resize", scheduleNavigation, { passive: true });
  window.addEventListener("scroll", updateScroll, { passive: true });
  if (!coarsePointer.matches) {
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("mouseleave", clearPointer, { passive: true });
  }
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener("change", syncMotionPreference);
  } else if (reducedMotion.addListener) {
    reducedMotion.addListener(syncMotionPreference);
  }

  resize();
  syncMotionPreference();
  if (document.readyState === "complete") {
    stabilizeNavigation();
  } else {
    window.addEventListener("load", stabilizeNavigation, { once: true });
  }
})();
