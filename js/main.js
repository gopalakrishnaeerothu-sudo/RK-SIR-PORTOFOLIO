/* RamaRaju Portfolio: site logic.
   Content lives in js/data.js; you shouldn't need to edit this file. */
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     Image helpers: show a styled placeholder if a file is missing
     --------------------------------------------------------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function placeholder(label, w = 400, h = 600) {
    const initials = String(label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "RR";
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#123048'/><stop offset='1' stop-color='#05080f'/></linearGradient></defs>` +
      `<rect width='100%' height='100%' fill='url(#g)'/>` +
      `<circle cx='${w / 2}' cy='${h * 0.4}' r='${w * 0.2}' fill='none' stroke='#3fe3ff' stroke-opacity='.45' stroke-width='2'/>` +
      `<text x='50%' y='${h * 0.4 + w * 0.06}' font-family='Georgia,serif' font-size='${w * 0.16}' fill='#3fe3ff' text-anchor='middle'>${esc(initials)}</text>` +
      `<text x='50%' y='${h * 0.68}' font-family='Georgia,serif' font-size='${w * 0.065}' fill='#ffffff' fill-opacity='.8' text-anchor='middle'>${esc(label)}</text>` +
      `<text x='50%' y='${h * 0.68 + w * 0.08}' font-family='Arial,sans-serif' font-size='${w * 0.035}' fill='#a9aeb5' fill-opacity='.7' text-anchor='middle' letter-spacing='2'>IMAGE COMING SOON</text>` +
      `</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function setImg(img, src, label, w, h) {
    img.alt = label;
    img.onerror = () => { img.onerror = null; img.src = placeholder(label, w, h); };
    img.src = src || placeholder(label, w, h);
  }

  /* ---------------------------------------------------------------
     Fill page content from data.js
     --------------------------------------------------------------- */
  $("#yogaIntro").textContent = SITE.yogaIntro;
  $("#year").textContent = new Date().getFullYear();
  setImg($("#aboutPhoto"), SITE.aboutPhoto, SITE.name, 400, 500);
  $("#bio").innerHTML = SITE.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#statFilms").textContent = MOVIES.length;

  // shared with hero.js
  window.RK = { esc, setImg, placeholder, openMovie: (m) => openMovie(m) };

  /* ---------------------------------------------------------------
     Films
     --------------------------------------------------------------- */
  const grid = $("#filmsGrid");
  MOVIES.forEach((m, idx) => {
    const card = document.createElement("article");
    card.className = "film-card reveal";
    card.style.transitionDelay = (idx % 4) * 0.08 + "s";
    card.innerHTML = `
      <div class="film-poster"><img loading="lazy" /></div>
      ${m.year ? `<span class="film-year">${esc(m.year)}</span>` : ""}
      ${m.link ? `<span class="film-play" title="Watch available">▶</span>` : ""}
      <div class="film-info">
        <h3>${esc(m.title)}</h3>
        <p>${esc([m.role ? "as " + m.role : m.genre, m.language].filter(Boolean).join(" · "))}</p>
      </div>
      <div class="film-shine"></div>`;
    setImg($("img", card), m.poster, m.title, 400, 600);
    card.addEventListener("click", () => openMovie(m));
    addTilt(card, 14);
    grid.appendChild(card);
  });

  function addTilt(el, max) {
    if (isMobile || reduceMotion) return;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `rotateY(${(x - 0.5) * max}deg) rotateX(${(0.5 - y) * max}deg) translateZ(10px)`;
      el.style.setProperty("--mx", x * 100 + "%");
      el.style.setProperty("--my", y * 100 + "%");
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  }
  document.querySelectorAll(".tilt").forEach((el) => addTilt(el, 8));

  // Movie modal
  const modal = $("#movieModal");
  function openMovie(m) {
    setImg($("#mPoster"), m.poster, m.title, 400, 600);
    $("#mTitle").textContent = m.title;
    $("#mMeta").textContent = [m.year, m.language, m.genre].filter(Boolean).join(" · ");
    $("#mRole").textContent = m.role ? "as " + m.role : "";
    $("#mDesc").textContent = m.description || "";
    const link = $("#mLink"), noLink = $("#mNoLink");
    if (m.link) { link.href = m.link; link.style.display = ""; }
    else link.style.display = "none";
    noLink.textContent = m.watchOn ? "Streaming on: " + m.watchOn : "Watch link coming soon";
    noLink.style.display = m.link && !m.watchOn ? "none" : "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  /* ---------------------------------------------------------------
     Yoga services
     --------------------------------------------------------------- */
  $("#yogaGrid").innerHTML = YOGA_SERVICES.map((s, i) => `
    <div class="yoga-card reveal" style="transition-delay:${i * 0.1}s">
      <span class="yoga-icon">${esc(s.icon)}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
    </div>`).join("");

  /* ---------------------------------------------------------------
     Gallery: 3D carousel
     --------------------------------------------------------------- */
  const carousel = $("#carousel");
  const stage = $("#carouselStage");
  const lightbox = $("#lightbox");
  const n = GALLERY.length;
  const step = 360 / Math.max(n, 1);
  let rot = 0, targetRot = 0, dragging = false, dragMoved = false, lastX = 0, hovering = false;

  GALLERY.forEach((g, i) => {
    const fig = document.createElement("figure");
    fig.className = "carousel-item";
    fig.innerHTML = `<img />${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}`;
    setImg($("img", fig), g.src, g.caption || SITE.name, 300, 400);
    fig.addEventListener("click", () => {
      if (dragMoved) return;
      openLightbox($("img", fig).src, g.caption);
    });
    carousel.appendChild(fig);
  });

  function layoutCarousel() {
    const w = carousel.offsetWidth;
    const radius = n > 1 ? Math.round(w / 2 / Math.tan(Math.PI / n)) + 40 : 0;
    carousel.dataset.radius = radius;
    [...carousel.children].forEach((el, i) => {
      el.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
    });
  }
  layoutCarousel();
  window.addEventListener("resize", layoutCarousel);

  stage.addEventListener("pointerdown", (e) => {
    dragging = true; dragMoved = false; lastX = e.clientX;
    stage.classList.add("dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    if (Math.abs(dx) > 2) dragMoved = true;
    lastX = e.clientX;
    targetRot += dx * 0.35;
    rot = targetRot;
  });
  window.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove("dragging");
    targetRot = Math.round(targetRot / step) * step; // snap
    setTimeout(() => (dragMoved = false), 0);
  });
  stage.addEventListener("mouseenter", () => (hovering = true));
  stage.addEventListener("mouseleave", () => (hovering = false));
  $("#prevBtn").addEventListener("click", () => { targetRot = Math.round(targetRot / step) * step + step; });
  $("#nextBtn").addEventListener("click", () => { targetRot = Math.round(targetRot / step) * step - step; });

  function animateCarousel() {
    if (!dragging && !hovering && !reduceMotion) targetRot -= 0.06;
    rot += (targetRot - rot) * 0.08;
    carousel.style.transform = `translateZ(-${carousel.dataset.radius || 0}px) rotateY(${rot}deg)`;
    requestAnimationFrame(animateCarousel);
  }
  animateCarousel();

  function openLightbox(src, caption) {
    $("#lbImg").src = src;
    $("#lbCaption").textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  /* ---------------------------------------------------------------
     3D film strips (photos scroll past like film frames)
     --------------------------------------------------------------- */
  const stripPhotos = [
    { src: SITE.heroPhoto, caption: SITE.name },
    { src: SITE.aboutPhoto, caption: SITE.name },
    ...GALLERY
  ].filter((p, i, arr) => arr.findIndex((q) => q.src === p.src) === i);

  function fillStrip(track, list) {
    // render the list twice so the loop is seamless
    [...list, ...list].forEach((p) => {
      const f = document.createElement("div");
      f.className = "strip-frame";
      f.innerHTML = "<img loading='lazy' />";
      const img = $("img", f);
      setImg(img, p.src, p.caption || SITE.name, 330, 225);
      f.addEventListener("click", () => openLightbox(img.src, p.caption));
      track.appendChild(f);
    });
  }
  fillStrip($("#stripTrack"), stripPhotos);
  fillStrip($("#stripTrack2"), [...stripPhotos].reverse());

  // Cinematic spotlight on the About photo follows the cursor
  const cine = $("#aboutCine");
  cine.addEventListener("mousemove", (e) => {
    const r = cine.getBoundingClientRect();
    cine.style.setProperty("--sx", ((e.clientX - r.left) / r.width) * 100 + "%");
    cine.style.setProperty("--sy", ((e.clientY - r.top) / r.height) * 100 + "%");
  });

  /* ---------------------------------------------------------------
     Contact
     --------------------------------------------------------------- */
  const c = SITE.contact;
  const links = [
    c.email && `<a href="mailto:${esc(c.email)}">✉ ${esc(c.email)}</a>`,
    c.phone && `<a href="tel:${esc(c.phone.replace(/\s/g, ""))}">☎ ${esc(c.phone)}</a>`,
    c.whatsapp && `<a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`,
    c.instagram && `<a href="${esc(c.instagram)}" target="_blank" rel="noopener">Instagram</a>`,
    c.youtube && `<a href="${esc(c.youtube)}" target="_blank" rel="noopener">YouTube</a>`,
    c.facebook && `<a href="${esc(c.facebook)}" target="_blank" rel="noopener">Facebook</a>`,
    c.imdb && `<a href="${esc(c.imdb)}" target="_blank" rel="noopener">IMDb</a>`,
    c.location && `<span>📍 ${esc(c.location)}</span>`
  ].filter(Boolean);
  $("#contactLinks").innerHTML = links.length ? links.join("") : `<p class="contact-empty">Contact details coming soon.</p>`;

  /* ---------------------------------------------------------------
     Modals, nav, reveal
     --------------------------------------------------------------- */
  function closeAll() {
    [modal, lightbox].forEach((m) => { m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); });
  }
  document.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", closeAll));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeAll(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  // compact top bar shows once the hero has scrolled away
  /* ---------------- dark / light theme ---------------- */
  const root = document.documentElement;
  const isLight = () => root.getAttribute("data-theme") === "light";
  function syncToggles() {
    document.querySelectorAll("[data-theme-toggle]").forEach((b) =>
      b.setAttribute("aria-label", isLight() ? "Switch to dark theme" : "Switch to light theme"));
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const next = isLight() ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("rr-theme", next); } catch (err) { /* private mode: theme just won't persist */ }
    syncToggles();
    window.dispatchEvent(new Event("themechange"));
  }));
  syncToggles();

  const topbar = $("#topbar");
  new IntersectionObserver(([en]) => topbar.classList.toggle("show", !en.isIntersecting), { threshold: 0.15 })
    .observe($("#home"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------------------------------------------------------------
     3D particle background (Three.js)
     The particles morph into a different shape for each section:
     0 sphere · 1 double helix · 2 film reel · 3 lotus · 4 galaxy
     --------------------------------------------------------------- */
  if (typeof THREE === "undefined") return; // offline: site still works without 3D

  const canvas = $("#bg3d");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 9;

  const COUNT = isMobile ? 2600 : 5200;
  const TAU = Math.PI * 2;
  const rand = (a, b) => a + Math.random() * (b - a);

  function shapeSphere() {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      const R = 3.2 + rand(-0.08, 0.08);
      a.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3);
    }
    return a;
  }

  function shapeHelix() {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random(), strand = i % 3; // 2 strands + rungs
      const ang = t * TAU * 3, y = (t - 0.5) * 9;
      if (strand < 2) {
        const off = strand * Math.PI;
        a.set([Math.cos(ang + off) * 1.6 + rand(-.07, .07), y, Math.sin(ang + off) * 1.6 + rand(-.07, .07)], i * 3);
      } else {
        const k = Math.round(t * 36) / 36, ang2 = k * TAU * 3, s = rand(-1, 1);
        a.set([Math.cos(ang2) * 1.6 * s, (k - 0.5) * 9, Math.sin(ang2) * 1.6 * s], i * 3);
      }
    }
    return a;
  }

  function shapeReel() {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const p = Math.random();
      let x, y, z = rand(-0.12, 0.12);
      if (p < 0.38) { // outer rim (torus)
        const u = rand(0, TAU), v = rand(0, TAU);
        x = (3.3 + 0.22 * Math.cos(v)) * Math.cos(u); y = (3.3 + 0.22 * Math.cos(v)) * Math.sin(u); z = 0.22 * Math.sin(v);
      } else if (p < 0.78) { // five holes
        const h = Math.floor(rand(0, 5)), hc = h * TAU / 5 + Math.PI / 2, u = rand(0, TAU);
        x = Math.cos(hc) * 1.85 + Math.cos(u) * 0.75; y = Math.sin(hc) * 1.85 + Math.sin(u) * 0.75;
      } else if (p < 0.9) { // hub
        const u = rand(0, TAU), r = rand(0.2, 0.45);
        x = Math.cos(u) * r; y = Math.sin(u) * r;
      } else { // outer film strip trailing away
        const t = rand(0, 1), u = -Math.PI / 4 - t * 1.2;
        x = Math.cos(u) * 3.3 + t * 3; y = Math.sin(u) * 3.3 - t * 1.4; z = rand(-.05, .05) + (Math.random() < .5 ? .3 : -.3);
      }
      a.set([x, y, z], i * 3);
    }
    return a;
  }

  function shapeLotus() {
    const a = new Float32Array(COUNT * 3);
    const layers = [{ n: 8, len: 3.4, lift: 1.4, off: 0 }, { n: 8, len: 2.6, lift: 2.0, off: TAU / 16 }, { n: 6, len: 1.7, lift: 2.3, off: 0 }];
    for (let i = 0; i < COUNT; i++) {
      if (Math.random() < 0.08) { // centre
        const u = rand(0, TAU), r = Math.sqrt(Math.random()) * 0.5;
        a.set([Math.cos(u) * r, rand(0, .5) - 1, Math.sin(u) * r], i * 3);
        continue;
      }
      const L = layers[Math.floor(Math.random() * layers.length)];
      const k = Math.floor(rand(0, L.n)), v = Math.random(), u = rand(-1, 1);
      const width = Math.sin(Math.PI * Math.pow(v, 0.8)) * (TAU / L.n) * 0.45;
      const ang = L.off + k * TAU / L.n + u * width;
      const r = v * L.len;
      a.set([Math.cos(ang) * r, v * v * L.lift - 1 + (1 - Math.abs(u)) * 0.12, Math.sin(ang) * r], i * 3);
    }
    return a;
  }

  function shapeGalaxy() {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const arm = i % 3, r = Math.pow(Math.random(), 1.4) * 4.6;
      const ang = arm * TAU / 3 + r * 1.1 + rand(-.3, .3) / (r * 0.4 + 0.5);
      a.set([Math.cos(ang) * r, rand(-.18, .18) * (1 - r / 5), Math.sin(ang) * r], i * 3);
    }
    return a;
  }

  const shapes = [shapeSphere(), shapeHelix(), shapeReel(), shapeLotus(), shapeGalaxy()];
  // tilt each shape so it reads well on screen
  const shapeRot = [[0, 0], [0.3, 0], [0.15, 0], [0.55, 0], [0.9, 0]];

  const positions = new Float32Array(shapes[0]);
  const colors = new Float32Array(COUNT * 3);
  const PALETTES = {
    dark: ["#3fe3ff", "#14a8c6", "#ffffff", "#5b8cff"].map((c) => new THREE.Color(c)),
    light: ["#0596b3", "#0d3a63", "#14a8c6", "#3a5bd9"].map((c) => new THREE.Color(c))
  };
  const pick = new Uint8Array(COUNT);
  for (let i = 0; i < COUNT; i++) pick[i] = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 4);
  function paint(theme) {
    const pal = PALETTES[theme];
    for (let i = 0; i < COUNT; i++) { const col = pal[pick[i]]; colors.set([col.r, col.g, col.b], i * 3); }
  }
  paint(isLight() ? "light" : "dark");
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // soft round particle sprite
  const spr = document.createElement("canvas");
  spr.width = spr.height = 64;
  const sctx = spr.getContext("2d");
  const grd = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.3, "rgba(255,255,255,.6)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  sctx.fillStyle = grd;
  sctx.fillRect(0, 0, 64, 64);

  const mat = new THREE.PointsMaterial({
    size: isMobile ? 0.07 : 0.06, vertexColors: true, map: new THREE.CanvasTexture(spr),
    transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geo, mat);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // distant star dust
  const dustGeo = new THREE.BufferGeometry();
  const dust = new Float32Array(900 * 3);
  for (let i = 0; i < dust.length; i++) dust[i] = rand(-30, 30);
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: 0.05, color: 0xa9aeb5, transparent: true, opacity: 0.35, depthWrite: false }));
  scene.add(dustPts);

  // additive glow vanishes on a light page, so light mode uses normal blending and darker dots
  function applyParticleTheme() {
    const light = isLight();
    paint(light ? "light" : "dark");
    geo.attributes.color.needsUpdate = true;
    mat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    mat.opacity = light ? 0.6 : 0.85;
    mat.needsUpdate = true;
    dustPts.material.color.set(light ? 0x4a5563 : 0xa9aeb5);
  }
  applyParticleTheme();
  window.addEventListener("themechange", applyParticleTheme);

  let current = 0, target = shapes[0];
  const mouse = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; });

  // pick shape from the section nearest the middle of the screen
  const sections = [...document.querySelectorAll("[data-shape]")];
  function updateShape() {
    const mid = window.innerHeight / 2;
    let best = sections[0], bestD = Infinity;
    sections.forEach((s) => {
      const r = s.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = s; }
    });
    const idx = +best.dataset.shape;
    if (idx !== current) { current = idx; target = shapes[idx]; }
  }
  window.addEventListener("scroll", updateShape, { passive: true });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  (function render() {
    const t = clock.getElapsedTime();
    const pos = geo.attributes.position.array;
    for (let i = 0; i < pos.length; i++) pos[i] += (target[i] - pos[i]) * 0.045;
    geo.attributes.position.needsUpdate = true;

    smooth.x += (mouse.x - smooth.x) * 0.05;
    smooth.y += (mouse.y - smooth.y) * 0.05;
    const [rx] = shapeRot[current];
    group.rotation.x += (rx + smooth.y * 0.5 - group.rotation.x) * 0.04;
    group.rotation.y = t * (reduceMotion ? 0 : 0.12) + smooth.x * 0.8;
    // keep the shape to the side on wide screens so text stays readable
    const sideX = window.innerWidth > 900 ? (current === 0 ? 3.2 : current % 2 ? -3.4 : 3.4) : 0;
    group.position.x += (sideX - group.position.x) * 0.03;
    group.position.y = Math.sin(t * 0.6) * 0.15;
    dustPts.rotation.y = t * 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  })();
})();
