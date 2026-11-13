/* Hero stage: scaled design canvas, type fitter, 3D perspective ring,
   opening portrait, menu and the one-time entrance timeline. */
(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const stage = $("#home"), canvas = $("#canvas"), nav = $("#nav");
  const H = SITE.hero;

  /* ---------------- text from data.js ---------------- */
  $("#h1a").textContent = H.hello;
  $("#sub1").textContent = H.tagline1;
  $("#sub2").textContent = H.tagline2;
  $("#ctaLabel").textContent = H.navCta;
  $("#vpLabel").textContent = H.heroCta;

  const wa = $("#wa");
  const firstPhone = (SITE.contact.phones || []).find((p) => p && p.trim());
  if (firstPhone) wa.href = "https://wa.me/" + RK.waNumber(firstPhone);
  else wa.classList.add("hidden");

  /* ---------------- starfield ---------------- */
  function stars(el, n, blur, a0, a1) {
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push(`${(Math.random() * 100).toFixed(2)}vw ${(Math.random() * 100).toFixed(2)}vh ${blur}px 0 rgba(255,255,255,${(a0 + Math.random() * (a1 - a0)).toFixed(3)})`);
    }
    el.style.boxShadow = out.join(",");
  }
  stars($("#stA"), 150, 0, 0.05, 0.3);
  stars($("#stB"), 18, 1.2, 0.35, 0.7);

  /* ---------------- opening portrait (in front of the 3D wheel) ---------------- */
  const portrait = $("#portrait"), ptMagnet = $("#ptMagnet"), ptImg = $("#ptImg");
  ptImg.addEventListener("error", () => portrait.classList.add("broken"));
  ptImg.src = H.cutout;
  // magnet: the portrait drifts toward the cursor when it comes near, and tilts in 3D
  if (!reduce.matches && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      const r = portrait.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const on = Math.abs(dx) < r.width / 2 + 160 && Math.abs(dy) < r.height / 2 + 160;
      ptMagnet.style.transition = on ? "transform .3s ease-out" : "transform .6s ease-in-out";
      ptMagnet.style.transform = on
        ? `translate3d(${dx / 6}px, ${dy / 8}px, 0) rotateY(${dx / 30}deg) rotateX(${-dy / 40}deg)`
        : "none";
    });
  }

  /* ---------------- 3D ring ---------------- */
  const R = 891, N = 37, STEP = 360 / N, CULL = 42, SPEED = 1.9;
  const photos = RING_PHOTOS.length ? RING_PHOTOS : [SITE.heroPhoto];
  let pk = 0;
  const P = () => photos[pk++ % photos.length];

  const SHOTS = [
    { v: "pay", url: P() },
    { v: "launch", url: P() },
    { v: "shop", url: P() },
    { v: "brand", url: P() },
    { v: "frete", url: P() },
    { v: "plain", url: P(), t: "THE ACTOR" },
    { v: "power", url: P() },
    { v: "plain", url: P(), t: "THE WRITER" },
    { v: "off", url: P() },
    { v: "plain", url: P(), t: "ON SET" }
  ];

  function creative(d) {
    const im = `<img alt="" src="${esc(d.url)}">`;
    switch (d.v) {
      case "pay": return `
        <div class="fill" style="background:#efedea"></div>
        <div class="ph" style="top:112px;bottom:0">${im}</div>
        <svg class="ph" style="top:118px;bottom:0;background:none" viewBox="0 0 130 182" preserveAspectRatio="none">
          <g stroke="#e5202f" stroke-width="8" fill="none" opacity=".92" stroke-linecap="square">
            <path d="M2 42h30M14 30v96M4 100l26-16"/>
            <path d="M96 34v58M120 34v58M96 92q12 15 24 0"/>
            <path d="M92 108l14 34M126 108l-12 34"/></g></svg>
        <div class="cv" style="top:20px;text-align:right;font-size:3.4px;letter-spacing:.15em;color:#8d9298">METHOD OF ACTING</div>
        <div class="cv t-big" style="top:32px;font-size:14px;color:#16171b">Emotion</div>
        <div class="cv t-big" style="top:47px;font-size:14px;color:#e5202f">In the eyes</div>
        <div class="cv" style="top:76px;font-size:5.2px;font-weight:700;color:#16171b;line-height:1.7">
          <div><b class="dot"></b>FELT VIA <b>THE EYES</b></div>
          <div style="margin-top:8px"><b class="dot sq"></b>HEARD VIA <b>DIALOGUE</b><br><span style="margin-left:11px">THAT STAYS</span></div>
        </div>`;
      case "launch": return `
        <div class="fill" style="background:linear-gradient(168deg,#f9d9e5,#f3bdd2 55%,#e8a3c0)"></div>
        <div class="ph" style="top:100px;bottom:0">${im}<div class="fill" style="background:linear-gradient(180deg,rgba(249,217,229,.97),rgba(249,217,229,0) 30%)"></div></div>
        <div class="cv t-serif" style="top:36px;font-size:17px;color:#b03a63">EVERY LOOK.</div>
        <div class="cv t-serif" style="top:55px;font-size:17px;color:#b03a63">EVERY LINE.</div>`;
      case "shop": return `
        <div class="fill" style="background:#fff"></div>
        <div class="ph" style="top:0;height:148px">${im}</div>
        <div class="cv" style="top:158px;font-size:5.4px;font-weight:700;letter-spacing:.09em;color:#16171b">THE WRITER</div>
        <div class="cv" style="top:168px;font-size:4.2px;color:#7b8087">Emotional dialogues · Honest lines</div>
        <div style="position:absolute;left:10px;top:180px;padding:4px 11px;border-radius:20px;background:#16171b;font-size:4.6px;font-weight:600;color:#fff;letter-spacing:.05em">Written to be felt</div>`;
      case "brand": return `
        <div class="fill" style="background:linear-gradient(180deg,#0a2a4a,#0d3a63 50%,#08192b)"></div>
        <div class="ph" style="top:92px;bottom:0">${im}<div class="fill" style="background:linear-gradient(180deg,rgba(10,42,74,.98),rgba(10,42,74,0) 36%)"></div></div>
        <div class="cv" style="top:16px;font-size:4.2px;line-height:1.7;color:rgba(255,255,255,.82);width:74px">Actor and writer: emotion in the eyes, truth in the words, and a story in every frame.</div>
        <div style="position:absolute;right:10px;top:16px;font-size:5.4px;font-weight:600;color:#fff;opacity:.92">✳ RR</div>`;
      case "frete": return `
        <div class="fill" style="background:linear-gradient(158deg,#4a0c80 0%,#7a16a6 40%,#a81fc6 66%,#5c0e90 100%)"></div>
        <div class="ph" style="top:140px;bottom:0;opacity:.45;mix-blend-mode:screen">${im}</div>
        <div class="fill" style="background:radial-gradient(44% 16% at 50% 62%, rgba(255,255,255,.92), rgba(255,255,255,0) 72%)"></div>
        <div style="position:absolute;left:-6px;right:-6px;top:44px;height:13px;background:#ff2d8a;transform:rotate(-2.6deg);box-shadow:0 4px 12px rgba(255,45,138,.5)"></div>
        <div style="position:absolute;left:0;right:0;top:45.5px;transform:rotate(-2.6deg);text-align:center;font-size:5.6px;font-weight:700;letter-spacing:.05em;color:#fff">TELUGU · TAMIL · KANNADA</div>
        <div class="cv t-big" style="top:64px;font-size:24px;color:#fff;text-shadow:0 3px 0 rgba(84,9,124,.6)">${MOVIES.length}</div>
        <div class="cv t-big" style="top:87px;font-size:24px;color:#fff;text-shadow:0 3px 0 rgba(84,9,124,.6)">Films</div>
        <div class="cv t-big" style="top:113px;font-size:19px;color:#fff">+</div>`;
      case "power": return `
        <div class="ph phf">${im}</div>
        <div class="fill" style="background:linear-gradient(180deg,rgba(6,5,10,0) 34%,rgba(6,5,10,.55) 52%,rgba(6,5,10,.92) 72%)"></div>
        <div class="cv t-serif" style="top:132px;font-size:16px;color:#fff">A STORY</div>
        <div class="cv t-serif" style="top:150px;font-size:16px;color:#fff">TELLER</div>
        <div class="cv" style="top:171px;font-size:4.4px;letter-spacing:.07em;color:rgba(255,255,255,.85)">living every role he plays</div>`;
      case "off": return `
        <div class="ph phf">${im}</div>
        <div class="fill" style="background:linear-gradient(180deg,rgba(3,9,20,0) 30%,rgba(3,9,20,.6) 48%,rgba(3,9,20,.95) 70%)"></div>
        <div class="cv t-big" style="top:126px;font-size:10px;color:#fff;opacity:.9">Now · on</div>
        <div class="cv t-big" style="top:139px;font-size:22px;color:#3fe3ff;text-shadow:0 0 16px rgba(63,227,255,.5)">Screen</div>`;
      default: return `
        <div class="ph phf">${im}</div>
        <div class="fill" style="background:linear-gradient(180deg,rgba(4,8,16,0) 38%,rgba(4,8,16,.85) 68%)"></div>
        <div class="cv" style="top:150px;font-size:5.4px;font-weight:600;letter-spacing:.2em;color:#fff">${esc(d.t || "")}</div>`;
    }
  }

  const ring = $("#ring");
  const cards = [];
  for (let i = 0; i < N; i++) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = creative(SHOTS[i % SHOTS.length]) + '<div class="edge"></div>';
    el.querySelectorAll("img").forEach((img) => img.addEventListener("error", () => el.classList.add("broken")));
    ring.appendChild(el);
    cards.push(el);
  }

  let phase = -2;
  function placeCards() {
    for (let i = 0; i < N; i++) {
      const el = cards[i];
      const a = (((i * STEP + phase) % 360) + 540) % 360 - 180;
      if (Math.abs(a) > CULL) { el.style.visibility = "hidden"; continue; }
      el.style.visibility = "visible";
      const r = (a * Math.PI) / 180, c = Math.cos(r);
      el.style.transform = `translate3d(${(R * Math.sin(r)).toFixed(2)}px,0,${(R * (1 - c)).toFixed(2)}px) rotateY(${(-a).toFixed(3)}deg)`;
      el.style.filter = `brightness(${(0.84 + 0.5 * (1 / c - 1)).toFixed(3)})`;
    }
  }
  let last = 0;
  function tick(t) {
    const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
    last = t;
    if (!reduce.matches) phase -= SPEED * dt;
    placeCards();
    requestAnimationFrame(tick);
  }
  document.addEventListener("visibilitychange", () => { last = 0; });

  /* ---------------- type fitter ---------------- */
  const CW = 1172, TAB_MAX = 1080, TAB_MIN = 701, DW_MIN = 920;
  let k = 1, mode = "desktop", tboost = 1;
  const mctx = document.createElement("canvas").getContext("2d");

  function fontOf(el) {
    const cs = getComputedStyle(el);
    return { css: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, size: parseFloat(cs.fontSize), weight: cs.fontWeight, family: cs.fontFamily };
  }
  const inkWidth = (el) => el.getBoundingClientRect().width / (mode === "phone" ? 1 : k);
  function capRatio(el) {
    const f = fontOf(el);
    mctx.font = `${f.weight} 100px ${f.family}`;
    return (mctx.measureText("H").actualBoundingBoxAscent || 70) / 100;
  }
  // exact cap height; scale the ink width to `tw` (or only squeeze to `maxW` when keepNatural)
  function fitBox(el, tw, tc, pre = "", keepNatural = false) {
    el.style.transform = pre;
    el.style.fontSize = tc / capRatio(el) + "px";
    const w = inkWidth(el);
    let sx = tw / w;
    if (keepNatural) sx = Math.min(1, sx);
    el.style.transform = `${pre} scaleX(${sx})`.trim();
  }
  function baseline(el, y) {
    const f = fontOf(el);
    mctx.font = f.css;
    const m = mctx.measureText("H");
    const A = m.fontBoundingBoxAscent || f.size * 0.8, D = m.fontBoundingBoxDescent || f.size * 0.2;
    el.style.top = y - ((f.size - (A + D)) / 2 + A) + "px";
  }
  function centreLabel(btn, el, capPx) {
    el.style.top = "0px";
    const probe = document.createElement("i");
    probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
    el.appendChild(probe);
    const b = btn.getBoundingClientRect(), p = probe.getBoundingClientRect();
    probe.remove();
    const base = (p.top - b.top) / k, btnH = b.height / k;
    el.style.top = btnH / 2 - (base - capPx / 2) + 1.1 + "px";
  }

  const fitted = ["h1a", "sub1", "sub2", "wmName", "ctaLabel", "vpLabel"].map((id) => document.getElementById(id));
  const links = $("#links");

  function layout() {
    if (mode === "phone") {
      fitted.forEach((el) => { el.style.fontSize = ""; el.style.top = ""; el.style.transform = ""; });
      links.style.fontSize = ""; links.style.transform = "";
      [...links.children].forEach((a) => (a.style.fontSize = ""));
      placeCards();
      return;
    }
    const T = mode === "tablet" ? tboost : 1;
    const [h1a, sub1, sub2, wmName, ctaLabel, vpLabel] = fitted;
    // headline: spec cap heights; ink widths kept natural, squeezed only if too wide
    // giant "HI, I'M ..." heading: font size chosen so the line spans the canvas width
    h1a.style.transform = "translateX(-50%)";
    h1a.style.fontSize = "100px";
    h1a.style.fontSize = (100 * 1100) / inkWidth(h1a) + "px";
    baseline(h1a, 222);
    // tagline sits left, under the heading (GK-style bottom-left copy, raised above the wheel)
    fitBox(sub1, 340, 10.5 * T, "", true); baseline(sub1, 300);
    fitBox(sub2, 340, 10.5 * T, "", true); baseline(sub2, 322);
    fitBox(wmName, 51 * T, 11.4 * T, "", true); baseline(wmName, 38.5);
    fitBox(ctaLabel, 100 * T, 8.9 * T, "", true); centreLabel($("#navCta"), ctaLabel, 8.9 * T);
    fitBox(vpLabel, 100 * T, 9.5 * T, "", true); centreLabel($("#cta2"), vpLabel, 9.5 * T);
    links.style.transform = "";
    if (mode === "tablet") {
      [...links.children].forEach((a) => (a.style.fontSize = ""));
    } else {
      const fs = 7.9 / capRatio(links.firstElementChild);
      [...links.children].forEach((a) => (a.style.fontSize = fs + "px"));
      const rw = links.getBoundingClientRect().width / k;
      links.style.transform = `scaleX(${Math.min(1, 317 / rw)})`;
    }
    placeCards();
  }

  function resize() {
    const vw = stage.clientWidth, vh = stage.clientHeight;
    const prev = mode;
    mode = vw <= 700 ? "phone" : vw <= TAB_MAX ? "tablet" : "desktop";
    if (prev !== mode) closeMenu();
    const st = canvas.style;
    if (mode === "phone") {
      k = 1;
      ["--k", "--top", "--stshift", "--sshift", "--rs"].forEach((p) => st.removeProperty(p));
      layout();
      return;
    }
    let W = CW, ramp = 0;
    tboost = 1;
    if (mode === "tablet") {
      W = DW_MIN + ((vw - TAB_MIN) * (CW - DW_MIN)) / (TAB_MAX - TAB_MIN);
      if (vh > vw * 1.15) W = Math.min(W, 900);
      ramp = Math.min(1, (TAB_MAX - vw) / 120);
      tboost = 1 + 0.14 * ramp;
    }
    // FULL_H: the design height that includes the bottom of the 3D wheel (cards end near y=770),
    // so the carousel is never cropped; spare height centres the composition vertically
    const FULL_H = 790;
    k = Math.min(vw / W, vh / FULL_H);
    st.setProperty("--k", k);
    st.setProperty("--top", Math.max(0, (vh - FULL_H * k) / 2) + "px");
    st.setProperty("--sshift", "0px");
    st.setProperty("--rs", 1);
    st.setProperty("--stshift", "0px");
    layout();
  }

  /* ---------------- menu ---------------- */
  const burger = $("#burger");
  function closeMenu(focus) {
    if (!nav.classList.contains("open")) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    if (focus) burger.focus();
  }
  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(true); });
  $("#navmenu").addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });

  window.addEventListener("resize", resize);
  if (window.visualViewport) visualViewport.addEventListener("resize", resize);
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  setTimeout(layout, 400);
  setTimeout(layout, 1400);
  requestAnimationFrame(tick);

  /* ---------------- entrance timeline (runs once) ---------------- */
  (function intro() {
    const root = document.documentElement;
    const settle = () => {
      if (document.getAnimations) document.getAnimations().forEach((a) => { if (String(a.id).startsWith("intro:")) a.cancel(); });
      root.classList.remove("intro");
    };
    if (!root.classList.contains("intro") || reduce.matches || !Element.prototype.animate) return settle();

    const D = window.innerWidth <= 700 ? 0.66 : 1;
    const EXPO = "cubic-bezier(.16,1,.3,1)", SOFT = "cubic-bezier(.22,.61,.36,1)";
    const Y = (px) => "0 " + px * D + "px";
    let n = 0, lastAnim = null, lastEnd = 0;
    function play(el, from, dur, delay, ease) {
      if (!el) return;
      const to = { opacity: 1 };
      if ("translate" in from) to.translate = "0 0";
      if ("scale" in from) to.scale = "1";
      if ("clipPath" in from) to.clipPath = "inset(-30% 0 -30% 0)";
      const a = el.animate([from, to], { duration: dur, delay, easing: ease, fill: "both" });
      a.id = "intro:" + n++;
      if (delay + dur > lastEnd) { lastEnd = delay + dur; lastAnim = a; }
    }
    play(nav, { opacity: 0, translate: Y(-9) }, 620, 60, EXPO);
    play($(".mark"), { opacity: 0, translate: Y(6) }, 520, 150, SOFT);
    play($(".wm"), { opacity: 0, translate: Y(6) }, 520, 185, SOFT);
    [...links.children].forEach((a, i) => play(a, { opacity: 0, translate: Y(6) }, 460, 215 + i * 45, SOFT));
    play(burger, { opacity: 0, translate: Y(6) }, 460, 300, SOFT);
    play($("#navCta"), { opacity: 0, translate: Y(6) }, 500, 400, SOFT);
    play($("#h1a"), { opacity: 0, translate: Y(15), clipPath: "inset(100% 0 -30% 0)" }, 900, 380, EXPO);
    play($("#sub1"), { opacity: 0, translate: Y(10) }, 620, 690, EXPO);
    play($("#sub2"), { opacity: 0, translate: Y(10) }, 620, 745, EXPO);
    play($("#cta2"), { opacity: 0, translate: Y(13), scale: ".985" }, 620, 830, EXPO);
    play(ring, { opacity: 0, translate: Y(18), scale: ".99" }, 950, 700, EXPO);
    play(portrait, { opacity: 0, translate: Y(40), scale: ".96" }, 1000, 900, EXPO);
    if (!wa.classList.contains("hidden")) play(wa, { opacity: 0, scale: ".88" }, 500, 1260, EXPO);
    root.classList.remove("intro"); // animations (fill:both) now hold the start frames
    lastAnim.finished.then(settle).catch(settle);
    setTimeout(settle, 4000); // failsafe: content can never be stranded invisible
  })();
})();
