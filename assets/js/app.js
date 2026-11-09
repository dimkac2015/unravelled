// unravelled — flow: landing (grab the thread on the ball, or press unravel)
// → analyze → 4 panels → finale

import { parseSpotifyUrl, buildReading } from "./mood.js";
import { clientTracks, clientQuote } from "./spotify.js";
import { renderScene, SCENE_FAMILIES } from "./scenes.js";
import { renderPortrait, renderPoster, renderEraIcon } from "./portraits.js";
import { yarnBallSvg, threadPileSvg, catSvg } from "./yarn.js";
import { makeRng, escapeXml } from "./rng.js";

const $ = (id) => document.getElementById(id);
const LOADING_LINES = ["reading the playlist…", "counting the songs…", "feeling the tempo…", "finding a lyric…", "pulling the thread…"];

/* pull-the-thread geometry (pull-layer viewBox is 280x280, ball is centred) */
const ANCHOR = { x: 206, y: 118 };          // where the thread leaves the ball
const CURL_END = { x: 238, y: 182 };          // resting tip of the loose thread
const CURL = `M ${ANCHOR.x} ${ANCHOR.y} Q 246 128 248 164 Q 249 180 238 182`;
const PULL_DIST = 150;                        // how far you must pull to trigger

let reading = null;
let dragging = false, finishing = false, pendingParsed = null, currentTip = { ...CURL_END };

/* ---------- landing ---------- */
$("landing-ball-svg").innerHTML = yarnBallSvg(190);
setThread(currentTip);

function setThread(tip) {
  currentTip = tip;
  const d = threadPath(tip);
  $("pull-thread").setAttribute("d", d);
  $("pull-thread-hit").setAttribute("d", d);
}

function threadPath(tip) {
  const mx = (ANCHOR.x + tip.x) / 2, my = (ANCHOR.y + tip.y) / 2;
  const dist = Math.hypot(tip.x - ANCHOR.x, tip.y - ANCHOR.y);
  if (dist > 200) {
    // long pull: add a loop so it reads as yarn unwinding
    return `M ${ANCHOR.x} ${ANCHOR.y} C ${ANCHOR.x + 60} ${ANCHOR.y - 40}, ${mx - 70} ${my - 60}, ${mx} ${my - 20} ` +
           `C ${mx + 55} ${my + 30}, ${tip.x - 40} ${tip.y + 40}, ${tip.x} ${tip.y}`;
  }
  return `M ${ANCHOR.x} ${ANCHOR.y} C ${ANCHOR.x + 45} ${ANCHOR.y - 25}, ${mx - 35} ${my + 25}, ${mx} ${my} S ${tip.x - 15} ${tip.y + 8}, ${tip.x} ${tip.y}`;
}

function layerPoint(e) {
  const rect = $("pull-layer").getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (280 / rect.width),
    y: (e.clientY - rect.top) * (280 / rect.height),
  };
}

function animateThreadTo(target, ms, done) {
  const from = { ...currentTip };
  const t0 = performance.now();
  (function step(now) {
    const k = Math.min(1, (now - t0) / ms);
    const e = 1 - Math.pow(1 - k, 3);
    setThread({ x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e });
    if (k < 1) requestAnimationFrame(step);
    else if (done) done();
  })(t0);
}

function validParsed() {
  const parsed = parseSpotifyUrl($("playlist-input").value);
  if (!parsed) {
    $("landing-error").textContent = "paste a spotify playlist link first — https://open.spotify.com/playlist/…";
    return null;
  }
  $("landing-error").textContent = "";
  return parsed;
}

/* grab the thread on the ball and pull it — or just tap it / tap the ball / press the button */
let dragStart = null;

$("landing-ball").addEventListener("pointerdown", (e) => {
  const parsed = validParsed();
  if (!parsed || finishing) return;
  pendingParsed = parsed;
  dragStart = { x: e.clientX, y: e.clientY, t: performance.now(), onThread: e.target.id === "pull-thread-hit" };
  dragging = true;
  $("landing-ball").setPointerCapture(e.pointerId);
  e.preventDefault();
});

$("landing-ball").addEventListener("pointermove", (e) => {
  if (!dragging || finishing || !dragStart || !dragStart.onThread) return;
  const pt = layerPoint(e);
  setThread(pt);
  const dist = Math.hypot(pt.x - ANCHOR.x, pt.y - ANCHOR.y);
  if (dist > PULL_DIST) finishPull();
});

function endDrag(e) {
  if (!dragging || finishing) return;
  dragging = false;
  const moved = dragStart ? Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y) : 999;
  const dt = performance.now() - (dragStart ? dragStart.t : 0);
  if (moved < 14 && dt < 600) {
    autoPull(); // a tap on the thread (or the ball) unravels
  } else if (dragStart && dragStart.onThread) {
    animateThreadTo(CURL_END, 350); // not pulled far enough — spring back
  }
  dragStart = null;
}
$("landing-ball").addEventListener("pointerup", endDrag);
$("landing-ball").addEventListener("pointercancel", endDrag);

function autoPull() {
  if (finishing) return;
  animateThreadTo({ x: ANCHOR.x - 30, y: -90 }, 1100, finishPull);
}

/* the unravel button pulls the thread for you */
$("link-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validParsed() || finishing) return;
  autoPull();
});

/* enough thread pulled: ball unwinds and shrinks, thread flies off, then we read */
function finishPull() {
  if (finishing) return;
  finishing = true;
  dragging = false;
  const ball = $("landing-ball");
  ball.classList.add("shrink");
  animateThreadTo({ x: ANCHOR.x + 10, y: -140 }, 900, () => setThread({ x: ANCHOR.x + 10, y: -140 }));
  setTimeout(() => {
    const parsed = pendingParsed;
    pendingParsed = null;
    ball.classList.remove("spin-slow", "shrink");
    setThread(CURL_END);
    finishing = false;
    if (parsed) unravel(parsed);
  }, 1250);
}

/* ---------- analyze: server API first, then client-side reading ---------- */
function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchServerAnalysis(url) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error("bad status " + res.status);
    const data = await res.json();
    return data && data.ok ? data : null;
  } catch {
    return null;
  }
}

// both lookups run in parallel with hard caps — the user never waits more than ~8s
async function getAnalysis(parsed) {
  const serverP = Promise.race([fetchServerAnalysis(parsed.url), delay(7500).then(() => null)]);
  const clientP = Promise.race([clientTracks(parsed).catch(() => null), delay(8000).then(() => null)]);
  const [server, client] = await Promise.all([serverP, clientP]);
  let api;
  if (server && server.tracks && server.tracks.length) api = server;
  else if (client && client.tracks && client.tracks.length) api = client;
  else api = server || client || { ok: true, playlist: { id: parsed.id, url: parsed.url, name: null }, tracks: [], stats: null, quote: null, source: "demo" };
  const other = api === server ? client : server;
  if (api.playlist && !api.playlist.name && other && other.playlist && other.playlist.name) api.playlist.name = other.playlist.name;
  if (!api.quote && other && other.quote) api.quote = other.quote;
  return api;
}

async function unravel(parsed) {
  showLoading();
  const api = await getAnalysis(parsed);
  const seed = parsed.id + "|" + (api.playlist && api.playlist.name ? api.playlist.name : "");
  reading = buildReading(seed, api);
  renderJourney(reading);
  hideLoading();
  $("landing").classList.add("hidden");
  $("journey").classList.remove("hidden");
  $("ball-dock").classList.remove("hidden");
  setStep("scene");
  $("scroller").scrollTo({ top: 0 });
  const label = reading.playlist.name ? `“${reading.playlist.name}”` : "your playlist";
  $("journey-playlist").textContent = `${label} — ${reading.source === "demo" ? "demo reading" : "analysed"}`;
  // if we have real tracks but no lyric yet, fetch one in the background and swap it in
  if (api.tracks && api.tracks.length && !api.quote) {
    clientQuote(api.tracks).then((q) => {
      if (!q || !reading) return;
      reading.quote = q;
      $("quote-text").textContent = "“" + q.text + "”";
      $("quote-cite").innerHTML = `— <strong>“${escapeXml(q.song)}”</strong>` + (q.artist ? ` · ${escapeXml(q.artist)}` : "");
    }).catch(() => {});
  }
}

function showLoading() {
  $("loading").classList.remove("hidden");
  $("loading-ball").innerHTML = yarnBallSvg(150);
  let i = 0;
  $("loading-line").textContent = LOADING_LINES[0];
  const timer = setInterval(() => {
    i = (i + 1) % LOADING_LINES.length;
    $("loading-line").textContent = LOADING_LINES[i];
  }, 650);
  $("loading").dataset.timer = timer;
}

function hideLoading() {
  clearInterval(Number($("loading").dataset.timer));
  $("loading").classList.add("hidden");
}

/* ---------- render panels ---------- */
function renderJourney(r) {
  const rng = makeRng(r.seed + "|art");

  const family = rng.pick(SCENE_FAMILIES[r.mood] || SCENE_FAMILIES.chill);
  const scene = renderScene(family, r.palette, rng);
  $("scene-art").innerHTML = scene.svg;
  $("scene-title").textContent = scene.name;
  $("quote-text").textContent = "“" + r.quote.text + "”";
  const isFallback = /fallback/.test(r.quote.artist || "");
  $("quote-cite").innerHTML = isFallback
    ? "— in the mood of your playlist"
    : `— <strong>“${escapeXml(r.quote.song)}”</strong>` + (r.quote.artist ? ` · ${escapeXml(r.quote.artist)}` : "");

  $("era-icon").innerHTML = renderEraIcon(r.era.icon);
  $("era-name").textContent = r.era.name;
  $("era-feel").textContent = r.era.feel;

  $("character-art").innerHTML = renderPortrait(r.character.style);
  $("character-name").textContent = r.character.name;
  $("character-from").textContent = "from “" + r.character.from + "”";
  $("character-line").textContent = r.character.line;

  $("film-art").innerHTML = renderPoster(r.film, r.palette);
  $("film-name").textContent = r.film.name;
  $("film-line").textContent = r.film.line;

  $("finale-note").textContent = r.playlist.name
    ? `“${r.playlist.name}” — ${r.mood} at heart. the cats watched the whole ball go. paste a new link and they'll come back.`
    : `a ${r.mood} playlist. the cats watched the whole ball go. paste a new link and they'll come back.`;

  $("yarn-ball").innerHTML = yarnBallSvg(150);
  $("thread-pile").innerHTML = threadPileSvg(150);
  $("cats").innerHTML = catSvg(false, 58, "#3a3a42", "#565662") + catSvg(true, 48, "#6b4a35", "#8a6a50");
}

/* ---------- step tracking: ball shrinks, dots fill, thread rail grows ---------- */
const PANEL_IDS = ["scene", "era", "character", "film", "finale"];

function setStep(step) {
  document.body.dataset.step = step;
  const el = $("panel-" + step);
  const scale = el ? el.dataset.ball : "1";
  document.documentElement.style.setProperty("--ball-scale", scale);
  const idx = PANEL_IDS.indexOf(step);
  document.querySelectorAll("#progress .dot").forEach((d, i) => d.classList.toggle("on", idx >= 0 && i <= Math.min(idx, 3)));
  const line = $("thread-rail-line");
  const frac = step === "landing" ? 0 : idx < 0 ? 1 : (idx + 1) / PANEL_IDS.length;
  const h = window.innerHeight;
  line.setAttribute("x1", "3"); line.setAttribute("y1", String(h));
  line.setAttribute("x2", "3"); line.setAttribute("y2", String(h * (1 - frac)));
  if (step === "finale") {
    $("thread-pile").classList.remove("hidden");
  } else {
    $("thread-pile").classList.add("hidden");
  }
}

const observer = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (en.isIntersecting) setStep(en.target.id.replace("panel-", ""));
  }
}, { threshold: 0.55 });
PANEL_IDS.forEach(id => observer.observe($("panel-" + id)));

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => {
    const cur = document.body.dataset.step;
    const idx = PANEL_IDS.indexOf(cur);
    const next = PANEL_IDS[Math.min(idx + 1, PANEL_IDS.length - 1)];
    $("panel-" + next).scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("resize", () => setStep(document.body.dataset.step || "landing"));

/* ---------- again ---------- */
$("btn-again").addEventListener("click", () => {
  $("journey").classList.add("hidden");
  $("ball-dock").classList.add("hidden");
  $("landing").classList.remove("hidden");
  $("playlist-input").value = "";
  $("scroller").scrollTo({ top: 0 });
  setStep("landing");
  setThread(CURL_END);
});
