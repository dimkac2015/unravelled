// Unravelled — front-end flow: front page -> 4 story pages -> finale.
// All durations and cat names live in CONFIG.

import { PALETTES, renderScene, renderIcon } from "./art/scenes.js";
import { renderCharacter, renderMovie } from "./art/characters.js";
import { renderCat, CAT_ROSTER } from "./art/cats.js";

const CONFIG = {
  durations: {
    pageTurn: 500,     // fade + slide between pages
    ballShrink: 900,   // one full ball rotation while shrinking, ease-in-out
    threadGrow: 900,   // thread dashoffset animation per page
    catLeave: 2500,    // finale: cats walk off over ~2.5 s total
    catWalk: 500,      // one cat walking in/out
    regrow: 600,       // ball regrows with a bounce on a new link
  },
  ballScales: { front: 1, p1: 0.8, p2: 0.6, p3: 0.4, p4: 0.22, finale: 0 },
  threadLen:  { front: 150, p1: 320, p2: 500, p3: 680, p4: 850, finale: 0 },
  pullThreshold: 110, // px of thread drag on the front page that triggers unravel
  cats: {
    names: { black_a: "Black 1", black_b: "Black 2", ginger: "Ginger", black_fluffy: "Fluffy", grey: "Grey" },
  },
};

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);
const STEP_KEYS = ["front", "p1", "p2", "p3", "p4", "finale"];
const PAGE_IDS = ["page-front", "page-1", "page-2", "page-3", "page-4", "page-5"];

const DEMO_PLAYLISTS = {
  hozier: [
    { title: "Take Me to Church", artist: "Hozier" },
    { title: "Work Song", artist: "Hozier" },
    { title: "Cherry Wine", artist: "Hozier" },
    { title: "From Eden", artist: "Hozier" },
    { title: "Like Real People Do", artist: "Hozier" },
    { title: "In the Woods Somewhere", artist: "Hozier" },
  ],
  metal: [
    { title: "Master of Puppets", artist: "Metallica" },
    { title: "Raining Blood", artist: "Slayer" },
    { title: "War Ensemble", artist: "Slayer" },
    { title: "Battery", artist: "Metallica" },
    { title: "Holy Wars", artist: "Megadeth" },
  ],
  pop: [
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "As It Was", artist: "Harry Styles" },
    { title: "Flowers", artist: "Miley Cyrus" },
    { title: "Dance Monkey", artist: "Tones and I" },
  ],
};

let state = {
  step: 0,
  analysis: null,
  tracks: [],
  playlistTitle: null,
  quote: null,
  threadLen: CONFIG.threadLen.front,
  catsVisible: false,
  catsLeaving: false,
};

/* ================= dock: ball + thread ================= */

const BALL = { cx: 130, cy: 118, r: 62 };

function buildBallStrands() {
  const g = $("ball-strands");
  let s = "";
  for (let i = 0; i < 9; i++) {
    const y = BALL.cy - 52 + i * 12;
    const wob = (i % 3) * 8 - 8;
    s += `<path d="M ${BALL.cx - 58 + i * 2} ${y} C ${BALL.cx - 20} ${y - 12 + wob}, ${BALL.cx + 20} ${y + 10 - wob}, ${BALL.cx + 58 - i * 2} ${y + 2}"/>`;
  }
  for (let i = 0; i < 6; i++) {
    const x = BALL.cx - 40 + i * 16;
    s += `<path d="M ${x} ${BALL.cy - 58} Q ${x + 14} ${BALL.cy} ${x - 8} ${BALL.cy + 58}"/>`;
  }
  g.innerHTML = s;
}

function ballStartPoint() {
  const s = CONFIG.ballScales[STEP_KEYS[state.step]];
  return { x: BALL.cx + BALL.r * s * 0.75, y: BALL.cy + BALL.r * s * 0.55 };
}

function drawThread(len, animate) {
  const p = $("dock-thread");
  const start = ballStartPoint();
  const endX = Math.min(980, start.x + len);
  const d = `M ${start.x} ${start.y} C ${start.x + 40} ${start.y + 30}, ${start.x + len * 0.4} ${192}, ${start.x + len * 0.7} ${188} S ${endX - 30} ${194}, ${endX} ${190}`;
  p.setAttribute("d", d);
  const total = p.getTotalLength();
  p.style.strokeDasharray = String(total);
  if (animate && !REDUCED) {
    p.style.transition = "none";
    p.style.strokeDashoffset = String(total);
    void p.getBoundingClientRect();
    p.style.transition = `stroke-dashoffset ${CONFIG.durations.threadGrow}ms ease`;
    p.style.strokeDashoffset = "0";
  } else {
    p.style.transition = "none";
    p.style.strokeDashoffset = "0";
  }
  let hit = $("pull-hit");
  if (!hit) {
    hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hit.setAttribute("id", "pull-hit");
    $("dock-svg").appendChild(hit);
    hit.addEventListener("pointerdown", onPullStart);
  }
  hit.setAttribute("d", `M ${start.x} ${start.y} Q ${start.x + 46} ${start.y + 34} ${endX} ${190}`);
  hit.classList.toggle("hidden", state.step !== 0);
}

function setBall(stepIdx, animate) {
  const key = STEP_KEYS[stepIdx];
  const scale = CONFIG.ballScales[key];
  const g = $("ball-group");
  $("pile-group").classList.toggle("hidden", key !== "finale");
  g.classList.toggle("hidden", key === "finale");
  if (REDUCED || !animate) {
    g.setAttribute("transform", `translate(${BALL.cx} ${BALL.cy}) scale(${scale}) translate(${-BALL.cx} ${-BALL.cy})`);
    $("ball-spin").setAttribute("transform", "rotate(0)");
    return;
  }
  if (stepIdx === 0) {
    // regrow with a small bounce
    const spin = $("ball-spin");
    spin.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: CONFIG.durations.regrow, easing: "ease-out" }
    );
    g.animate(
      [
        { transform: `translate(${BALL.cx}px, ${BALL.cy}px) scale(0) translate(${-BALL.cx}px, ${-BALL.cy}px)` },
        { transform: `translate(${BALL.cx}px, ${BALL.cy}px) scale(1.14) translate(${-BALL.cx}px, ${-BALL.cy}px)`, offset: 0.6 },
        { transform: `translate(${BALL.cx}px, ${BALL.cy}px) scale(1) translate(${-BALL.cx}px, ${-BALL.cy}px)` },
      ],
      { duration: CONFIG.durations.regrow, easing: "ease-out" }
    );
    return;
  }
  const spin = $("ball-spin");
  spin.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: CONFIG.durations.ballShrink, easing: "ease-in-out" }
  );
  const from = g.getAttribute("transform") || "";
  const m = from.match(/scale\(([\d.]+)\)/);
  const fromScale = m ? Number(m[1]) : 1;
  const t0 = performance.now();
  (function step(now) {
    const k = Math.min(1, (now - t0) / CONFIG.durations.ballShrink);
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const s = fromScale + (scale - fromScale) * e;
    g.setAttribute("transform", `translate(${BALL.cx} ${BALL.cy}) scale(${s}) translate(${-BALL.cx} ${-BALL.cy})`);
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}

function buildPile() {
  const g = $("pile-group");
  let s = "";
  for (let i = 0; i < 8; i++) {
    const rx = 62 - i * 6, ry = 20 - i * 2, rot = (i * 47) % 60 - 30;
    s += `<ellipse cx="${BALL.cx}" cy="${BALL.cy + 34 - i * 3}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${BALL.cx} ${BALL.cy + 34 - i * 3})" fill="none" stroke="#f4efe3" stroke-width="4" stroke-linecap="round"/>`;
  }
  g.innerHTML = s;
}

/* ================= cats ================= */

let catsBuilt = false;

function buildCats() {
  if (catsBuilt) return;
  catsBuilt = true;
  const row = $("cats-row");
  CAT_ROSTER.forEach((c) => {
    const d = document.createElement("div");
    d.className = "cat cat-" + c.id;
    d.title = CONFIG.cats.names[c.id] || c.id;
    d.innerHTML = renderCat(c.id);
    row.appendChild(d);
  });
}

function catEl(id) {
  return document.querySelector(".cat-" + id);
}

function walkCat(el, fromX, toX, ms, done) {
  if (REDUCED) {
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" });
    if (done) setTimeout(done, 250);
    return;
  }
  el.animate(
    [
      { transform: `translateX(${fromX}px)`, opacity: 0.4 },
      { transform: `translateX(${toX}px)`, opacity: 1 },
    ],
    { duration: ms, easing: "ease-out", fill: "forwards" }
  ).onfinish = done || null;
}

// entering page 1: cats walk in, reverse of the leaving order
function catsEnter() {
  buildCats();
  state.catsVisible = true;
  $("cats-row").classList.remove("hidden");
  const order = ["ginger", "grey", "black_b", "black_a", "black_fluffy"]; // reverse leave order
  order.forEach((id, i) => {
    const el = catEl(id);
    const from = i % 2 === 0 ? 120 : -120;
    setTimeout(() => walkCat(el, from, 0, CONFIG.durations.catWalk), i * 140);
  });
}

// finale: fluffy first, then the black pair together, then grey (looks back), ginger last (yawn)
function catsLeave() {
  if (state.catsLeaving) return;
  state.catsLeaving = true;
  state.catsVisible = false;
  const seq = [
    { ids: ["black_fluffy"], at: 0,    dir: -1, extra: null },
    { ids: ["black_a", "black_b"], at: 400, dir: 1, extra: null },
    { ids: ["grey"],         at: 750, dir: -1, extra: "lookback" },
    { ids: ["ginger"],       at: 1100, dir: 1, extra: "yawn" },
  ];
  const total = CONFIG.durations.catLeave;
  for (const step of seq) {
    setTimeout(() => {
      for (const id of step.ids) {
        const el = catEl(id);
        if (!el) continue;
        const head = el.querySelector(".head");
        if (step.extra === "yawn" && head && !REDUCED) {
          head.animate(
            [{ transform: "scaleY(1)" }, { transform: "scaleY(0.72)" }, { transform: "scaleY(1)" }],
            { duration: 500, easing: "ease-in-out" }
          );
        }
        if (step.extra === "lookback" && head && !REDUCED) {
          head.animate(
            [{ transform: "rotate(0deg)" }, { transform: "rotate(-160deg)", offset: 0.55 }, { transform: "rotate(0deg)" }],
            { duration: 700, easing: "ease-in-out" }
          );
        }
        const ms = Math.max(400, total - step.at - 300);
        walkCat(el, 0, step.dir * 220, ms);
      }
    }, step.at);
  }
}

function catsReact() {
  const row = $("cats-row");
  row.classList.add("reacting");
  setTimeout(() => row.classList.remove("reacting"), CONFIG.durations.ballShrink);
}

/* ================= front page: drag the loose thread OR press Unravel ================= */

let pullStart = null;

function onPullStart(e) {
  if (state.step !== 0) return;
  pullStart = { y: e.clientY, len: state.threadLen };
  $("pull-hit").setPointerCapture(e.pointerId);
  e.preventDefault();
}

document.addEventListener("pointermove", (e) => {
  if (!pullStart) return;
  const dy = e.clientY - pullStart.y;
  state.threadLen = Math.max(CONFIG.threadLen.front, Math.min(420, pullStart.len + dy));
  drawThread(state.threadLen, false);
});
document.addEventListener("pointerup", () => {
  if (!pullStart) return;
  const pulled = state.threadLen - CONFIG.threadLen.front;
  pullStart = null;
  if (pulled >= CONFIG.pullThreshold) startUnravel();
  else { state.threadLen = CONFIG.threadLen.front; drawThread(state.threadLen, true); }
});

$("link-form").addEventListener("submit", (e) => {
  e.preventDefault();
  startUnravel();
});

$("btn-paste-go").addEventListener("click", () => {
  const tracks = $("paste-tracks").value.split("\n")
    .map((l) => l.trim()).filter(Boolean)
    .map((l) => {
      const parts = l.split(/\s+[–-]\s+/);
      return parts.length >= 2
        ? { artist: parts[0].trim(), title: parts.slice(1).join(" – ").trim() }
        : { artist: "", title: l };
    })
    .filter((t) => t.title);
  if (tracks.length) runAnalysis(tracks, null);
  else $("front-error").textContent = "paste at least one track: Artist – Title";
});

document.querySelectorAll(".demo-btn").forEach((b) => {
  b.addEventListener("click", () => runAnalysis(DEMO_PLAYLISTS[b.dataset.demo], "demo playlist"));
});

async function startUnravel() {
  const url = $("link-input").value;
  $("front-error").textContent = "";
  if (!url.trim()) {
    $("front-error").textContent = "paste a spotify playlist link first";
    return;
  }
  $("front-error").textContent = "reading the playlist…";
  try {
    const r = await fetch("/api/playlist", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const j = await r.json();
    if (j.ok && j.tracks && j.tracks.length >= 5) {
      runAnalysis(j.tracks, j.playlistTitle);
    } else {
      $("paste-fallback").classList.remove("hidden");
      $("front-error").textContent = "couldn't read that playlist automatically — paste the tracks below, or try a demo";
    }
  } catch {
    $("paste-fallback").classList.remove("hidden");
    $("front-error").textContent = "couldn't reach the playlist — paste the tracks below, or try a demo";
  }
}

async function runAnalysis(tracks, playlistTitle) {
  $("front-error").textContent = "analyzing the mood…";
  const r = await fetch("/api/analyze", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tracks }),
  });
  const j = await r.json();
  if (!j.ok) { $("front-error").textContent = j.error || "analysis failed"; return; }
  state.analysis = j.analysis;
  state.tracks = tracks;
  state.playlistTitle = playlistTitle;
  state.catsLeaving = false;
  $("demo-note").classList.toggle("hidden", !j.demo);
  state.quote = null;
  fetchQuote(j.analysis.quote_candidates);
  renderAllPages();
  showPage(1);
  $("front-error").textContent = "";
}

async function fetchQuote(candidates) {
  for (const c of (candidates || []).slice(0, 3)) {
    try {
      const r = await fetch(`/api/quote?artist=${encodeURIComponent(c.artist)}&title=${encodeURIComponent(c.song)}`);
      const j = await r.json();
      if (j.ok && j.line) {
        state.quote = { line: j.line, song: c.song, artist: c.artist };
        renderQuote();
        return;
      }
    } catch { /* try next candidate */ }
  }
  if (candidates && candidates[0]) {
    state.quote = { line: null, song: candidates[0].song, artist: candidates[0].artist };
    renderQuote();
  }
}

/* ================= pages ================= */

function renderQuote() {
  const q = state.quote;
  const el = $("quote-block");
  if (!q || !el) return;
  el.innerHTML = q.line
    ? `<p class="quote">“${esc(q.line)}”</p><cite>— “${esc(q.song)}” · ${esc(q.artist)}</cite>`
    : `<p class="quote">“${esc(q.song)}”</p><cite>— ${esc(q.artist)}</cite>`;
}

function esc(s) {
  return String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c]));
}

function renderAllPages() {
  const a = state.analysis;
  const pal = PALETTES[a.palette] || PALETTES.golden_hour;

  const art1 = $("art-1");
  const svg1 = renderScene(a.scene, pal);
  if (svg1) art1.innerHTML = svg1;
  $("panel-1").innerHTML = `
    <p class="kicker">page 1 · the scenery</p>
    <h2>${esc(a.scene_title)}</h2>
    <div id="quote-block"></div>`;
  renderQuote();

  $("panel-2").innerHTML = `
    <p class="kicker">page 2 · the era</p>
    <div class="big-icon" id="era-icon">${renderIcon(a.era.icon, pal.accent)}</div>
    <h2>${esc(a.era.name)}, ${esc(a.era.season)}</h2>
    <p class="feel">${esc(a.era.feel)}</p>`;
  $("panel-2").style.background = pal.dark + "d9";

  $("panel-3").innerHTML = `
    <p class="kicker">page 3 · the character</p>
    <div class="art-slot" id="art-3">${renderCharacter(a.character, pal)}</div>
    <h2>${esc(a.character.name)}</h2>
    <p class="from-line">from “${esc(a.character.source)}”</p>
    <p class="feel">${esc(a.character.why)}</p>`;

  $("panel-4").innerHTML = `
    <p class="kicker">page 4 · the movie</p>
    <div class="art-slot" id="art-4">${renderMovie(a.movie, pal)}</div>
    <h2>${esc(a.movie.title)} (${a.movie.year})</h2>
    <p class="feel">${esc(a.movie.why)}</p>`;

  $("panel-5").innerHTML = `
    <p class="kicker">unravelled</p>
    <h2>The thread lies in a pile.</h2>
    <p class="feel">${esc(a.summary)}</p>
    <button id="btn-again" type="button">Unravel another playlist</button>`;
  $("btn-again").addEventListener("click", resetToFront);
}

function resetToFront() {
  state.step = 0; state.analysis = null; state.quote = null;
  state.threadLen = CONFIG.threadLen.front;
  $("link-input").value = "";
  $("paste-fallback").classList.add("hidden");
  $("cats-row").classList.add("hidden");
  state.catsVisible = false;
  showPage(0);
  setBall(0, true);
  drawThread(state.threadLen, true);
}

function showPage(i) {
  const prev = state.step;
  state.step = i;
  PAGE_IDS.forEach((id, k) => $(id).classList.toggle("active", k === i));
  document.querySelectorAll("#dots .dot").forEach((d, k) => d.classList.toggle("on", k === i - 1));
  $("btn-back").disabled = i === 0;
  $("btn-next").textContent = i === 0 ? "Unravel" : i === 5 ? "Done" : "Next";
  $("btn-next").disabled = i === 5;
  setBall(i, true);
  state.threadLen = CONFIG.threadLen[STEP_KEYS[i]];
  drawThread(state.threadLen, true);
  if (i >= 1 && !state.catsVisible) catsEnter();
  if (i === 5) catsLeave();
  if (i !== prev && i > 0 && i < 5) catsReact();
}

$("btn-back").addEventListener("click", () => { if (state.step > 0) showPage(state.step - 1); });
$("btn-next").addEventListener("click", () => {
  if (state.step === 0) { startUnravel(); return; }
  if (state.step < 5) showPage(state.step + 1);
});

/* ================= init ================= */

(function init() {
  for (let i = 0; i < 5; i++) {
    const d = document.createElement("span");
    d.className = "dot";
    $("dots").appendChild(d);
  }
  buildBallStrands();
  buildPile();
  $("cats-row").classList.add("hidden");
  showPage(0);
})();
