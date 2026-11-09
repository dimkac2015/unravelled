// Unravelled — front-end flow (change request Stage 1: flow, ball, thread, cats).
// Front page -> page 1 scenery -> 2 era -> 3 character -> 4 movie -> 5 impression -> 6 finale.
// All durations, angles, cat names/order live in CONFIG.

import { PALETTES, renderScene, renderIcon } from "./art/scenes.js";
import { renderCharacter, renderMovie } from "./art/characters.js";
import { renderCat, CAT_ROSTER } from "./art/cats.js";

const CONFIG = {
  durations: {
    pageTurn: 500,
    ballMove: 900,      // ball scale change AND thread draw AND ball turn share 900 ms
    threadGrow: 900,
    catWalk: 650,       // one cat walking in
    catLeaveGap: 600,   // cats leave one by one, 0.6 s apart
    catLeaveWalk: 1200, // each walks off-screen in ~1.2 s
    regrow: 600,
  },
  ballTurnDeg: 50,      // calm clockwise rotation per page change (40-60 deg)
  ballScales: { front: 1, p1: 0.85, p2: 0.68, p3: 0.51, p4: 0.34, p5: 0.17, finale: 0 },
  pullThreshold: 110,
  cats: {
    order: ["chertyaka", "didyuka", "chernika", "ryzhik", "mysh"],
    names: Object.fromEntries(CAT_ROSTER.map((c) => [c.id, { latin: c.latin, cyr: c.cyr }])),
  },
};

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);
const STEP_KEYS = ["front", "p1", "p2", "p3", "p4", "p5", "finale"];
const PAGE_IDS = ["page-front", "page-1", "page-2", "page-3", "page-4", "page-5", "page-6"];
const N_PAGES = 6;

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
  threadLen: 150,
  ballDeg: 0,
  ballScale: 1,
  catsAppeared: 0,
  catsGone: false,
};

/* ================= dock geometry ================= */
// viewBox 1000x200, baseline y=200. Ball sits at the LEFT end, bottom on the baseline.
const BALL = { cx: 95, cy: 138, r: 62 };
const CAT_X = [250, 395, 540, 685, 830]; // cat slots along the dock baseline

/* ================= dock: ball ================= */

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

// outer wrapper #ball-pos: position+scale, origin bottom-centre (stays sitting on baseline).
// inner #ball-spin: rotation only, around the exact centre of the ball.
function setBall(stepIdx, animate) {
  const key = STEP_KEYS[stepIdx];
  const scale = CONFIG.ballScales[key];
  const pos = $("ball-pos");
  const spin = $("ball-spin");
  $("pile-wrap").classList.toggle("hidden", key !== "finale");
  pos.classList.toggle("hidden", key === "finale");
  if (REDUCED || !animate) {
    pos.style.transform = `scale(${scale})`;
    spin.style.transform = `rotate(${state.ballDeg}deg)`;
    state.ballScale = scale;
    return;
  }
  if (stepIdx === 0) {
    // regrow with a small bounce
    state.ballDeg += CONFIG.ballTurnDeg;
    spin.animate(
      [{ transform: `rotate(${state.ballDeg - CONFIG.ballTurnDeg}deg)` }, { transform: `rotate(${state.ballDeg}deg)` }],
      { duration: CONFIG.durations.regrow, easing: "ease-out", fill: "forwards" }
    );
    pos.animate(
      [{ transform: "scale(0)" }, { transform: "scale(1.14)", offset: 0.6 }, { transform: "scale(1)" }],
      { duration: CONFIG.durations.regrow, easing: "ease-out", fill: "forwards" }
    );
    state.ballScale = 1;
    return;
  }
  // calm clockwise turn around the ball's own centre, same 900 ms as the shrink
  const fromDeg = state.ballDeg;
  state.ballDeg += CONFIG.ballTurnDeg;
  spin.animate(
    [{ transform: `rotate(${fromDeg}deg)` }, { transform: `rotate(${state.ballDeg}deg)` }],
    { duration: CONFIG.durations.ballMove, easing: "ease-in-out", fill: "forwards" }
  );
  const fromScale = state.ballScale;
  state.ballScale = scale;
  pos.animate(
    [{ transform: `scale(${fromScale})` }, { transform: `scale(${scale})` }],
    { duration: CONFIG.durations.ballMove, easing: "ease-in-out", fill: "forwards" }
  );
}

function buildPile() {
  // loose curly pile where the ball was (ball centre 95,138 in a 140x160 wrap)
  let s = `<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">`;
  for (let i = 0; i < 8; i++) {
    const rx = 58 - i * 6, ry = 19 - i * 2, rot = (i * 47) % 60 - 30;
    s += `<ellipse cx="70" cy="${118 - i * 3}" rx="${rx}" ry="${ry}" transform="rotate(${rot} 70 ${118 - i * 3})" fill="none" stroke="#f4efe3" stroke-width="4" stroke-linecap="round"/>`;
  }
  s += `<path d="M 118 84 Q 136 78 138 96" fill="none" stroke="#f4efe3" stroke-width="4" stroke-linecap="round"/></svg>`;
  $("pile-wrap").innerHTML = s;
}

/* ================= dock: one continuous thread, looped around cat paws ================= */

function ballAttach() {
  // single point on the ball's surface (right side), follows the ball scale
  return { x: BALL.cx + BALL.r * state.ballScale * 0.92, y: BALL.cy - 6 };
}

// path from the ball along the baseline, small paw-loop at each cat up to `upto` (1..5)
function threadPathD(upto) {
  const a = ballAttach();
  let d = `M ${a.x} ${a.y}`;
  let x = a.x, y = a.y;
  const base = 190;
  for (let i = 0; i < upto; i++) {
    const cx = CAT_X[i];
    // sagging curve along the baseline to just before the cat
    d += ` C ${x + 40} ${y + 8}, ${cx - 60} ${base + 4}, ${cx - 22} ${base - 2}`;
    // one small loop around the cat's front paws (never near the face), then continue
    d += ` c -12 -2 -14 -14 -4 -16 c 10 -2 16 8 8 14 c -5 4 -12 2 -12 -4`;
    x = cx + 4; y = base - 6;
    if (i < upto - 1) d += ` C ${cx + 40} ${base - 8}, ${CAT_X[i + 1] - 80} ${base + 5}, ${CAT_X[i + 1] - 30} ${base - 2}`;
  }
  return d;
}

function drawThread(upto, animate) {
  const p = $("dock-thread");
  const full = threadPathD(5);
  p.setAttribute("d", full);
  const total = p.getTotalLength();
  // measure how much path reaches cat N
  let visible = total;
  if (upto < 5) {
    const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tmp.setAttribute("d", threadPathD(upto));
    $("dock-svg").appendChild(tmp);
    visible = tmp.getTotalLength();
    tmp.remove();
  }
  p.style.strokeDasharray = String(total);
  const targetOffset = total - visible;
  if (animate && !REDUCED) {
    p.style.transition = "none";
    p.style.strokeDashoffset = String(total); // hide all, then draw progressively
    void p.getBoundingClientRect();
    p.style.transition = `stroke-dashoffset ${CONFIG.durations.threadGrow}ms ease`;
    p.style.strokeDashoffset = String(targetOffset);
  } else {
    p.style.transition = "none";
    p.style.strokeDashoffset = String(targetOffset);
  }
  // grabbable loose end on the front page only
  let hit = $("pull-hit");
  if (!hit) {
    hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hit.setAttribute("id", "pull-hit");
    $("dock-svg").appendChild(hit);
    hit.addEventListener("pointerdown", onPullStart);
  }
  const a = ballAttach();
  hit.setAttribute("d", `M ${a.x} ${a.y} Q ${a.x + 50} ${a.y + 40} ${Math.min(980, a.x + 150)} 190`);
  hit.classList.toggle("hidden", state.step !== 0 || upto > 0);
}

/* ================= cats ================= */

let catsBuilt = false;
let lang = "en"; // real language switch lands in Stage 3

function catName(id) {
  const n = CONFIG.cats.names[id];
  return (lang === "ru" || lang === "be") && n ? n.cyr : n ? n.latin : id;
}

function buildCats() {
  if (catsBuilt) return;
  catsBuilt = true;
  const row = $("cats-row");
  CONFIG.cats.order.forEach((id, i) => {
    const c = CAT_ROSTER.find((x) => x.id === id);
    const d = document.createElement("div");
    d.className = "cat cat-" + id + " hidden";
    d.dataset.id = id;
    d.style.left = (CAT_X[i] / 1000 * 100) + "%";
    d.innerHTML = renderCat(id);
    d.addEventListener("mouseenter", () => showCatTip(d, id));
    d.addEventListener("mouseleave", hideCatTip);
    d.addEventListener("click", () => showCatTip(d, id));
    row.appendChild(d);
  });
}

function catEl(id) { return document.querySelector(".cat-" + id); }

function showCatTip(el, id) {
  const tip = $("cat-tip");
  tip.textContent = catName(id);
  tip.classList.remove("hidden");
  const dock = $("dock").getBoundingClientRect();
  const r = el.getBoundingClientRect();
  tip.style.left = Math.min(dock.width - 90, Math.max(4, r.left - dock.left + r.width / 2 - 30)) + "px";
  tip.style.bottom = (dock.height - (r.top - dock.top)) + 6 + "px";
}
function hideCatTip() { $("cat-tip").classList.add("hidden"); }

function walkCatIn(el, done) {
  el.classList.remove("hidden");
  if (REDUCED) { el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" }); done && setTimeout(done, 250); return; }
  el.animate(
    [{ transform: "translateX(170px)", opacity: 0.3 }, { transform: "translateX(0)", opacity: 1 }],
    { duration: CONFIG.durations.catWalk, easing: "ease-out", fill: "forwards" }
  ).onfinish = done || null;
}

// page N shows cats 1..N; the new one walks in from the right edge of the dock
function syncCatsForPage(pageIdx) {
  buildCats();
  const want = Math.max(0, Math.min(5, pageIdx)); // pages 1..5 -> cats 1..5
  for (let i = 0; i < 5; i++) {
    const el = catEl(CONFIG.cats.order[i]);
    if (i < want && el.classList.contains("hidden") && state.catsAppeared === i) {
      state.catsAppeared = i + 1;
      walkCatIn(el, () => reactCat(CONFIG.cats.order[i]));
    } else if (i >= want) {
      el.classList.add("hidden");
    }
  }
  if (want < state.catsAppeared && state.catsAppeared > 0 && pageIdx >= 1) {
    // going back: hide cats beyond the page
    state.catsAppeared = want;
  }
}

// the cat the thread just reached reacts
function reactCat(id) {
  const row = $("cats-row");
  row.classList.add("reacting");
  row.dataset.reached = id;
  setTimeout(() => { row.classList.remove("reacting"); row.dataset.reached = ""; }, CONFIG.durations.ballMove);
}

// page 6: cats leave one by one, 0.6 s apart, each ~1.2 s; left-walkers use the back lane
function catsLeave() {
  if (state.catsGone) return;
  state.catsGone = true;
  const seq = [
    { id: "chernika",  dir: -1, at: 0 },
    { id: "chertyaka", dir: 1,  at: CONFIG.durations.catLeaveGap },
    { id: "mysh",      dir: -1, at: CONFIG.durations.catLeaveGap * 2 },
    { id: "didyuka",   dir: 1,  at: CONFIG.durations.catLeaveGap * 3 },
    { id: "ryzhik",    dir: 1,  at: CONFIG.durations.catLeaveGap * 4, yawn: true },
  ];
  for (const s of seq) {
    setTimeout(() => {
      const el = catEl(s.id);
      if (!el) return;
      if (s.yawn && !REDUCED) {
        const head = el.querySelector(".head");
        if (head) head.animate(
          [{ transform: "scaleY(1)" }, { transform: "scaleY(0.7)" }, { transform: "scaleY(1.08)" }, { transform: "scaleY(1)" }],
          { duration: 600, easing: "ease-in-out" }
        );
      }
      if (s.dir === -1) el.classList.add("back-lane"); // slightly higher, scaled 0.9, behind the pile
      const walkMs = s.yawn ? CONFIG.durations.catLeaveWalk + 500 : CONFIG.durations.catLeaveWalk;
      setTimeout(() => {
        if (REDUCED) { el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }); return; }
        el.animate(
          [
            { transform: s.dir === -1 ? "translate(0, -14px) scale(0.9)" : "translateX(0)", opacity: 1 },
            { transform: s.dir === -1 ? `translate(${s.dir * 260}px, -14px) scale(0.9)` : `translateX(${s.dir * 260}px)`, opacity: 0.2 },
          ],
          { duration: walkMs, easing: "ease-in", fill: "forwards" }
        );
      }, s.yawn ? 600 : 0);
    }, s.at);
  }
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
  state.threadLen = Math.max(150, Math.min(420, pullStart.len + dy));
  drawThread(0, false);
});
document.addEventListener("pointerup", () => {
  if (!pullStart) return;
  const pulled = state.threadLen - 150;
  pullStart = null;
  if (pulled >= CONFIG.pullThreshold) startUnravel();
  else { state.threadLen = 150; drawThread(0, true); }
});

$("link-form").addEventListener("submit", (e) => { e.preventDefault(); startUnravel(); });
$("btn-paste-go").addEventListener("click", () => {
  const tracks = $("paste-tracks").value.split("\n")
    .map((l) => l.trim()).filter(Boolean)
    .map((l) => {
      const parts = l.split(/\s+[–-]\s+/);
      return parts.length >= 2 ? { artist: parts[0].trim(), title: parts.slice(1).join(" – ").trim() } : { artist: "", title: l };
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
  if (!url.trim()) { $("front-error").textContent = "paste a spotify playlist link first"; return; }
  $("front-error").textContent = "reading the playlist…";
  try {
    const r = await fetch("/api/playlist", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const j = await r.json();
    if (j.ok && j.tracks && j.tracks.length >= 5) runAnalysis(j.tracks, j.playlistTitle);
    else {
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
  state.catsGone = false;
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
      if (j.ok && j.line) { state.quote = { line: j.line, song: c.song, artist: c.artist }; renderQuote(); return; }
    } catch { /* next candidate */ }
  }
  if (candidates && candidates[0]) {
    state.quote = { line: null, song: candidates[0].song, artist: candidates[0].artist };
    renderQuote();
  }
}

/* ================= pages ================= */

function esc(s) {
  return String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c]));
}

function renderQuote() {
  const q = state.quote;
  const el = $("quote-block");
  if (!q || !el) return;
  el.innerHTML = q.line
    ? `<p class="quote">“${esc(q.line)}”</p><cite>— “${esc(q.song)}” · ${esc(q.artist)}</cite>`
    : `<p class="quote">“${esc(q.song)}”</p><cite>— ${esc(q.artist)}</cite>`;
}

function renderAllPages() {
  const a = state.analysis;
  const pal = PALETTES[a.palette] || PALETTES.golden_hour;

  const svg1 = renderScene(a.scene, pal);
  if (svg1) $("art-1").innerHTML = svg1;
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
    <div class="art-slot">${renderCharacter(a.character, pal)}</div>
    <h2>${esc(a.character.name)}</h2>
    <p class="from-line">from “${esc(a.character.source)}”</p>
    <p class="feel">${esc(a.character.why)}</p>`;

  $("panel-4").innerHTML = `
    <p class="kicker">page 4 · the movie</p>
    <div class="art-slot">${renderMovie(a.movie, pal)}</div>
    <h2>${esc(a.movie.title)} (${a.movie.year})</h2>
    <p class="feel">${esc(a.movie.why)}</p>`;

  // page 5 content is filled in Stage 2 (analysis JSON gains "activity")
  $("panel-5").innerHTML = `
    <p class="kicker">page 5 · overall impression</p>
    <h2>…</h2>`;

  $("panel-6").innerHTML = `
    <p class="kicker">unravelled</p>
    <h2>The thread lies in a pile.</h2>
    <p class="feel">${esc(a.summary)}</p>
    <button id="btn-again" type="button">Unravel another playlist</button>`;
  $("btn-again").addEventListener("click", resetToFront);
}

function resetToFront() {
  state.step = 0; state.analysis = null; state.quote = null;
  state.threadLen = 150; state.catsAppeared = 0; state.catsGone = false;
  $("link-input").value = "";
  $("paste-fallback").classList.add("hidden");
  CONFIG.cats.order.forEach((id) => catEl(id) && catEl(id).classList.add("hidden"));
  showPage(0);
  setBall(0, true);
  drawThread(0, true);
}

function showPage(i) {
  const prev = state.step;
  state.step = i;
  PAGE_IDS.forEach((id, k) => $(id).classList.toggle("active", k === i));
  document.querySelectorAll("#dots .dot").forEach((d, k) => d.classList.toggle("on", k === i - 1));
  $("btn-back").disabled = i === 0;
  $("btn-next").textContent = i === 0 ? "Unravel" : i === N_PAGES ? "Done" : "Next";
  $("btn-next").disabled = i === N_PAGES;
  setBall(i, true);
  drawThread(Math.max(0, Math.min(5, i)), true); // page N -> thread reaches cat N
  if (i >= 1 && i <= 5) syncCatsForPage(i);
  if (i === N_PAGES) catsLeave();
  if (i !== prev && i > 0 && i < N_PAGES) { /* thread-reach reaction handled in syncCatsForPage */ }
}

$("btn-back").addEventListener("click", () => { if (state.step > 0) showPage(state.step - 1); });
$("btn-next").addEventListener("click", () => {
  if (state.step === 0) { startUnravel(); return; }
  if (state.step < N_PAGES) showPage(state.step + 1);
});

/* ================= init ================= */

(function init() {
  for (let i = 0; i < N_PAGES; i++) {
    const d = document.createElement("span");
    d.className = "dot";
    $("dots").appendChild(d);
  }
  buildBallStrands();
  buildPile();
  buildCats();
  showPage(0);
})();
