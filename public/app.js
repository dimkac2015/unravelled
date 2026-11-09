// Unravelled — front-end (change request Stages 2+3: page 5 activity, i18n, no demo).
// Front page -> 1 scenery -> 2 era -> 3 character -> 4 movie -> 5 impression -> 6 finale.

import { PALETTES, renderScene, renderIcon } from "./art/scenes.js";
import { renderCharacter, renderMovie } from "./art/characters.js";
import { renderActivity } from "./art/activities.js";
import { renderCat, CAT_ROSTER } from "./art/cats.js";
import { I18N, LANGS } from "./i18n.js";

const CONFIG = {
  durations: {
    pageTurn: 500,
    ballMove: 900,
    threadGrow: 900,
    catWalk: 650,
    catLeaveGap: 600,
    catLeaveWalk: 1200,
    regrow: 600,
  },
  ballTurnDeg: 50,
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

/* ---------- language ---------- */
let lang = localStorage.getItem("unravelled-lang");
if (!LANGS.includes(lang)) {
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  lang = LANGS.includes(nav) ? nav : "en";
}
const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

function applyLang() {
  document.documentElement.lang = lang;
  $("lang-btn").textContent = lang.toUpperCase();
  $("link-input").placeholder = t("placeholder");
  $("btn-unravel").textContent = t("unravel");
  $("btn-back").textContent = t("back");
  $("btn-next").textContent = state.step === 0 ? t("unravel") : state.step === N_PAGES ? "Done" : t("next");
  $("btn-paste-go").textContent = t("continue");
  $("paste-text").textContent = t("manual");
  $("btn-retry").textContent = t("retry");
  if (state.analysis) renderAllPages();
}

function setLang(l) {
  if (!LANGS.includes(l)) return;
  lang = l;
  localStorage.setItem("unravelled-lang", l);
  applyLang();
}

$("lang-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  $("lang-menu").classList.toggle("hidden");
});
document.addEventListener("click", () => $("lang-menu").classList.add("hidden"));
document.querySelectorAll("#lang-menu button").forEach((b) => {
  b.addEventListener("click", () => { setLang(b.dataset.lang); $("lang-menu").classList.add("hidden"); });
});

/* ---------- state ---------- */
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
  lastUrl: null,
  lastTracks: null,
};

/* ================= dock geometry ================= */
const BALL = { cx: 95, cy: 138, r: 62 };
const CAT_X = [250, 395, 540, 685, 830];

// the ball, drawn properly: radial-shaded sphere, many organic winding strands
// clipped to the sphere, a specular highlight, and a soft contact shadow (not rotating)
function buildBall() {
  const svg = $("dock-svg");
  if (!document.getElementById("ball-grad")) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `<radialGradient id="ball-grad" cx="0.35" cy="0.28" r="0.95">
        <stop offset="0" stop-color="#fbf6e9"/><stop offset="0.55" stop-color="#ece2c8"/>
        <stop offset="0.85" stop-color="#cfc0a0"/><stop offset="1" stop-color="#b3a37f"/>
      </radialGradient>
      <clipPath id="ball-clip"><circle cx="${BALL.cx}" cy="${BALL.cy}" r="59"/></clipPath>`;
    svg.insertBefore(defs, svg.firstChild);
  }
  let seed = 987654321;
  const rnd = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  let strands = "";
  for (let i = 0; i < 16; i++) {
    const y = BALL.cy - 52 + i * 6.8;
    const wob = rnd() * 14 - 7;
    strands += `<path d="M ${BALL.cx - 56 - rnd() * 4} ${y} C ${BALL.cx - 20} ${y - 10 + wob}, ${BALL.cx + 20} ${y + 8 - wob}, ${BALL.cx + 56 + rnd() * 4} ${y + 2}" stroke-width="${1.8 + rnd() * 1.2}" opacity="${0.5 + rnd() * 0.35}"/>`;
  }
  for (let i = 0; i < 8; i++) {
    const x = BALL.cx - 42 + i * 12;
    strands += `<path d="M ${x} ${BALL.cy - 56} Q ${x + 12 + rnd() * 10} ${BALL.cy} ${x - 8 + rnd() * 8} ${BALL.cy + 56}" stroke-width="${1.6 + rnd()}" opacity="${0.4 + rnd() * 0.35}"/>`;
  }
  const hx = BALL.cx - 24, hy = BALL.cy - 30;
  $("ball-spin").innerHTML = `
    <circle cx="${BALL.cx}" cy="${BALL.cy}" r="62" fill="url(#ball-grad)" stroke="#8f8468" stroke-width="2.5"/>
    <g clip-path="url(#ball-clip)" fill="none" stroke="#a89468" stroke-linecap="round">${strands}</g>
    <g clip-path="url(#ball-clip)" fill="none" stroke="#f8f1de" stroke-width="1.6" opacity="0.8">
      <path d="M ${BALL.cx - 50} ${BALL.cy - 30} Q ${BALL.cx} ${BALL.cy - 46} ${BALL.cx + 50} ${BALL.cy - 28}"/>
      <path d="M ${BALL.cx - 54} ${BALL.cy - 12} Q ${BALL.cx} ${BALL.cy - 28} ${BALL.cx + 54} ${BALL.cy - 10}"/>
    </g>
    <ellipse cx="${hx}" cy="${hy}" rx="24" ry="13" fill="#ffffff" opacity="0.35" transform="rotate(-25 ${hx} ${hy})"/>`;
}

/* ball: outer wrapper = position+scale (origin bottom-centre); inner g = rotation (centre) */
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
  let s = `<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">`;
  for (let i = 0; i < 8; i++) {
    const rx = 58 - i * 6, ry = 19 - i * 2, rot = (i * 47) % 60 - 30;
    s += `<ellipse cx="70" cy="${118 - i * 3}" rx="${rx}" ry="${ry}" transform="rotate(${rot} 70 ${118 - i * 3})" fill="none" stroke="#f4efe3" stroke-width="4" stroke-linecap="round"/>`;
  }
  s += `<path d="M 118 84 Q 136 78 138 96" fill="none" stroke="#f4efe3" stroke-width="4" stroke-linecap="round"/></svg>`;
  $("pile-wrap").innerHTML = s;
}

/* ================= thread: one continuous path, paw-loop per cat ================= */

function ballAttach() {
  return { x: BALL.cx + BALL.r * state.ballScale * 0.92, y: BALL.cy - 6 };
}

function threadPathD(upto) {
  const a = ballAttach();
  let d = `M ${a.x} ${a.y}`;
  let x = a.x, y = a.y;
  const base = 190;
  for (let i = 0; i < upto; i++) {
    const cx = CAT_X[i];
    d += ` C ${x + 40} ${y + 8}, ${cx - 60} ${base + 4}, ${cx - 22} ${base - 2}`;
    d += ` c -12 -2 -14 -14 -4 -16 c 10 -2 16 8 8 14 c -5 4 -12 2 -12 -4`;
    x = cx + 4; y = base - 6;
    if (i < upto - 1) d += ` C ${cx + 40} ${base - 8}, ${CAT_X[i + 1] - 80} ${base + 5}, ${CAT_X[i + 1] - 30} ${base - 2}`;
  }
  return d;
}

// px of thread visible when it reaches cat `upto` (0 = front page loose end)
function threadLenFor(upto) {
  if (upto <= 0) return state.step === 0 ? state.threadLen : 0;
  const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tmp.setAttribute("d", threadPathD(upto));
  $("dock-svg").appendChild(tmp);
  const len = tmp.getTotalLength();
  tmp.remove();
  return len;
}

function drawThreadVisible(px, animate) {
  const p = $("dock-thread");
  p.setAttribute("d", threadPathD(5));
  const total = p.getTotalLength();
  p.style.strokeDasharray = String(total);
  const targetOffset = Math.max(0, total - px);
  if (animate && !REDUCED) {
    p.style.transition = "none";
    p.style.strokeDashoffset = String(total);
    void p.getBoundingClientRect();
    p.style.transition = `stroke-dashoffset ${CONFIG.durations.threadGrow}ms ease`;
    p.style.strokeDashoffset = String(targetOffset);
  } else {
    p.style.transition = "none";
    p.style.strokeDashoffset = String(targetOffset);
  }
  // grabbable loose end on the front page, extending to the RIGHT
  let hit = $("pull-hit");
  if (!hit) {
    hit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hit.setAttribute("id", "pull-hit");
    $("dock-svg").appendChild(hit);
    hit.addEventListener("pointerdown", onPullStart);
    hit.addEventListener("click", () => {
      if (state.step === 0) startUnravel();
      else if (state.step < N_PAGES) showPage(state.step + 1);
    });
  }
  const a = ballAttach();
  const endX = Math.min(985, a.x + Math.max(px, 60));
  hit.setAttribute("d", `M ${a.x} ${a.y} Q ${a.x + (endX - a.x) / 2} ${a.y + 26} ${endX} 188`);
  // the thread is clickable on EVERY page (front: start; pages: next)
  hit.classList.remove("hidden");
}

function drawThread(upto, animate) {
  drawThreadVisible(threadLenFor(upto), animate);
}

/* ================= cats ================= */

let catsBuilt = false;

function catName(id) {
  const n = CONFIG.cats.names[id];
  return (lang === "ru" || lang === "be") && n ? n.cyr : n ? n.latin : id;
}

function buildCats() {
  if (catsBuilt) return;
  catsBuilt = true;
  const row = $("cats-row");
  CONFIG.cats.order.forEach((id, i) => {
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
  tip.style.left = Math.min(dock.width - 100, Math.max(4, r.left - dock.left + r.width / 2 - 34)) + "px";
  tip.style.bottom = (dock.height - (r.top - dock.top)) + 6 + "px";
}
function hideCatTip() { $("cat-tip").classList.add("hidden"); }

function walkCatIn(el, done) {
  el.classList.remove("hidden");
  if (REDUCED) { el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "forwards" }); done && setTimeout(done, 250); return; }
  el.animate(
    [{ transform: "translateX(170px)", opacity: 0.3 }, { transform: "translateX(-50%)", opacity: 1 }],
    { duration: CONFIG.durations.catWalk, easing: "ease-out", fill: "forwards" }
  ).onfinish = done || null;
}

function syncCatsForPage(pageIdx) {
  buildCats();
  const want = Math.max(0, Math.min(5, pageIdx));
  for (let i = 0; i < 5; i++) {
    const el = catEl(CONFIG.cats.order[i]);
    if (!el) continue;
    if (i < want && el.classList.contains("hidden") && state.catsAppeared === i) {
      state.catsAppeared = i + 1;
      walkCatIn(el, () => reactCat(CONFIG.cats.order[i]));
    } else if (i >= want) {
      el.classList.add("hidden");
      if (i < state.catsAppeared) state.catsAppeared = i;
    }
  }
}

function reactCat(id) {
  const row = $("cats-row");
  row.classList.add("reacting");
  row.dataset.reached = id;
  setTimeout(() => { row.classList.remove("reacting"); row.dataset.reached = ""; }, CONFIG.durations.ballMove);
}

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
      if (s.dir === -1) el.classList.add("back-lane");
      const walkMs = s.yawn ? CONFIG.durations.catLeaveWalk + 500 : CONFIG.durations.catLeaveWalk;
      setTimeout(() => {
        const gone = () => el.classList.add("hidden"); // fully gone, only the pile stays
        if (REDUCED) {
          el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }).onfinish = gone;
          return;
        }
        el.animate(
          [
            { transform: s.dir === -1 ? "translate(-50%, -14px) scale(0.9)" : "translateX(-50%)", opacity: 1 },
            { transform: s.dir === -1 ? `translate(calc(-50% + ${s.dir * 260}px), -14px) scale(0.9)` : `translateX(calc(-50% + ${s.dir * 260}px))`, opacity: 0 },
          ],
          { duration: walkMs, easing: "ease-in", fill: "forwards" }
        ).onfinish = gone;
      }, s.yawn ? 600 : 0);
    }, s.at);
  }
}

/* ================= front page ================= */

let pullStart = null;
let ballTap = null;

function onPullStart(e) {
  if (state.step !== 0) return;
  pullStart = { x: e.clientX, y: e.clientY, len: state.threadLen };
  $("pull-hit").setPointerCapture(e.pointerId);
  e.preventDefault();
}

// tapping the ball itself also unravels
$("dock-svg").addEventListener("pointerdown", (e) => {
  if (state.step !== 0 || e.target.id === "pull-hit") return;
  ballTap = { x: e.clientX, y: e.clientY, t: performance.now() };
});

// pull the thread to the RIGHT to unravel
document.addEventListener("pointermove", (e) => {
  if (!pullStart) return;
  const dx = e.clientX - pullStart.x;
  state.threadLen = Math.max(150, Math.min(620, pullStart.len + dx * 1.6));
  drawThreadVisible(state.threadLen, false);
});
document.addEventListener("pointerup", (e) => {
  if (pullStart) {
    const pulled = state.threadLen - 150;
    pullStart = null;
    if (pulled >= CONFIG.pullThreshold) { startUnravel(); return; }
    state.threadLen = 150;
    drawThreadVisible(150, true);
  }
  if (ballTap) {
    const moved = Math.hypot(e.clientX - ballTap.x, e.clientY - ballTap.y);
    if (moved < 14 && performance.now() - ballTap.t < 600) {
      if (state.step === 0) startUnravel();
      else if (state.step < N_PAGES) showPage(state.step + 1); // ball click advances on every page
    }
  }
  ballTap = null;
});

$("link-form").addEventListener("submit", (e) => { e.preventDefault(); startUnravel(); });

$("btn-paste-go").addEventListener("click", () => {
  const tracks = $("paste-tracks").value.split("\n")
    .map((l) => l.trim()).filter(Boolean)
    .map((l) => {
      const parts = l.split(/\s+[–-]\s+/);
      return parts.length >= 2 ? { artist: parts[0].trim(), title: parts.slice(1).join(" – ").trim() } : { artist: "", title: l };
    })
    .filter((x) => x.title);
  if (tracks.length) runAnalysis(tracks, null);
  else $("front-error").textContent = t("invalidLink");
});

$("btn-retry").addEventListener("click", () => {
  $("btn-retry").classList.add("hidden");
  $("front-error").textContent = t("loading");
  if (state.lastTracks) runAnalysis(state.lastTracks, state.playlistTitle);
  else if (state.lastUrl) startUnravel();
});

async function startUnravel() {
  const url = $("link-input").value;
  state.lastUrl = url;
  $("front-error").textContent = "";
  $("btn-retry").classList.add("hidden");
  if (!/open\.spotify\.com\/playlist\/|spotify:playlist:/.test(url.trim())) {
    $("front-error").textContent = t("invalidLink");
    return;
  }
  $("front-error").textContent = t("loading");
  try {
    const r = await fetch("/api/playlist", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const j = await r.json();
    if (j.ok && j.tracks && j.tracks.length >= 5) {
      state.lastTracks = j.tracks;
      runAnalysis(j.tracks, j.playlistTitle);
    } else {
      $("paste-fallback").classList.remove("hidden");
      $("front-error").textContent = t("manual");
    }
  } catch {
    $("paste-fallback").classList.remove("hidden");
    $("front-error").textContent = t("error");
    $("btn-retry").classList.remove("hidden");
  }
}

async function runAnalysis(tracks, playlistTitle) {
  state.lastTracks = tracks;
  $("front-error").textContent = t("loading");
  try {
    const r = await fetch("/api/analyze", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tracks, lang }),
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "analysis failed");
    state.analysis = j.analysis;
    state.tracks = tracks;
    state.playlistTitle = playlistTitle;
    state.catsGone = false;
    state.quote = null;
    fetchQuote(j.analysis.quote_candidates);
    renderAllPages();
    showPage(1);
    $("front-error").textContent = "";
  } catch {
    $("front-error").textContent = t("error");
    $("btn-retry").classList.remove("hidden");
  }
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
    <p class="kicker">${t("pageScenery")}</p>
    <h2>${esc(a.scene_title)}</h2>
    <div id="quote-block"></div>`;
  renderQuote();

  // never print the season twice: "1970s autumn, autumn" must not happen
  const eraName = String(a.era.name || "");
  const eraSeason = String(a.era.season || "");
  const eraHeading = eraSeason && eraName.toLowerCase().includes(eraSeason.toLowerCase())
    ? eraName
    : (eraName ? `${eraName}, ${eraSeason}` : eraSeason);
  $("panel-2").innerHTML = `
    <p class="kicker">${t("pageEra")}</p>
    <div class="big-icon">${renderIcon(a.era.icon, pal.accent)}</div>
    <h2>${esc(eraHeading)}</h2>
    <p class="feel">${esc(a.era.feel)}</p>`;
  $("panel-2").style.background = pal.dark + "d9";

  $("panel-3").innerHTML = `
    <p class="kicker">${t("pageCharacter")}</p>
    <div class="art-slot">${renderCharacter(a.character, pal)}</div>
    <h2>${esc(a.character.name)}</h2>
    <p class="from-line">${esc(a.character.source)}</p>
    <p class="feel">${esc(a.character.why)}</p>`;

  $("panel-4").innerHTML = `
    <p class="kicker">${t("pageMovie")}</p>
    <div class="art-slot">${renderMovie(a.movie, pal)}</div>
    <h2>${esc(a.movie.title)} (${a.movie.year})</h2>
    <p class="feel">${esc(a.movie.why)}</p>`;

  $("panel-5").innerHTML = `
    <p class="kicker">${t("pageImpression")}</p>
    <div class="art-slot">${renderActivity(a.activity.scene_id, pal)}</div>
    <h2>${esc(a.activity.title)}</h2>
    <p class="feel">${esc(a.activity.why)}</p>`;

  $("panel-6").innerHTML = `
    <p class="kicker">unravelled</p>
    <h2>${t("finale")}</h2>
    <p class="feel">${esc(a.summary)}</p>
    <button id="btn-again" type="button">${t("another")}</button>`;
  $("btn-again").addEventListener("click", resetToFront);
}

function resetToFront() {
  state.step = 0; state.analysis = null; state.quote = null;
  state.threadLen = 150; state.catsAppeared = 0; state.catsGone = false;
  $("link-input").value = "";
  $("paste-fallback").classList.add("hidden");
  $("btn-retry").classList.add("hidden");
  CONFIG.cats.order.forEach((id) => { const el = catEl(id); if (el) el.classList.add("hidden"); });
  showPage(0);
  setBall(0, true);
  drawThread(0, true);
}

function showPage(i) {
  state.step = i;
  PAGE_IDS.forEach((id, k) => $(id).classList.toggle("active", k === i));
  document.querySelectorAll("#dots .dot").forEach((d, k) => d.classList.toggle("on", k === i - 1));
  $("btn-back").disabled = i === 0;
  $("btn-back").textContent = t("back");
  $("btn-next").textContent = i === 0 ? t("unravel") : i === N_PAGES ? "Done" : t("next");
  $("btn-next").disabled = i === N_PAGES;
  $("lang-wrap").classList.toggle("hidden", i !== 0); // language switch on the front page only
  setBall(i, true);
  drawThread(Math.max(0, Math.min(5, i)), true);
  if (i >= 1 && i <= 5) syncCatsForPage(i);
  if (i === N_PAGES) catsLeave();
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
  buildBall();
  buildPile();
  buildCats();
  applyLang();
  showPage(0);
})();
