// unravelled — flow: landing (tap the ball) → analyze → 4 panels → finale

import { parseSpotifyUrl, buildReading } from "./mood.js";
import { clientAnalyze } from "./spotify.js";
import { renderScene, SCENE_FAMILIES } from "./scenes.js";
import { renderPortrait, renderPoster, renderEraIcon } from "./portraits.js";
import { yarnBallSvg, threadPileSvg, catSvg } from "./yarn.js";
import { makeRng } from "./rng.js";

const $ = (id) => document.getElementById(id);
const LOADING_LINES = ["reading the playlist…", "counting the songs…", "feeling the tempo…", "finding a lyric…", "pulling the thread…"];

let reading = null;

/* ---------- landing ---------- */
$("landing-ball-svg").innerHTML = yarnBallSvg(190);

$("link-form").addEventListener("submit", (e) => {
  e.preventDefault();
  startUnravel();
});
$("landing-ball").addEventListener("click", startUnravel);

function startUnravel() {
  const parsed = parseSpotifyUrl($("playlist-input").value);
  if (!parsed) {
    $("landing-error").textContent = "paste a spotify playlist link first — https://open.spotify.com/playlist/…";
    return;
  }
  $("landing-error").textContent = "";
  unravel(parsed);
}

/* thread unwinds out of the ball while the ball spins and shrinks */
function playUnravelFx() {
  return new Promise((resolve) => {
    const ball = $("landing-ball");
    const fx = $("unravel-fx");
    const path = $("unravel-thread");
    const w = window.innerWidth, h = window.innerHeight;
    const x0 = w / 2;
    const ballSize = Math.min(190, w * 0.5);
    const y0 = h - Math.max(h * 0.045, 20) - ballSize / 2;
    const loops = 5;
    const up = (y0 - 60) / loops;
    let d = `M ${x0} ${y0}`;
    let x = x0, y = y0;
    for (let i = 0; i < loops; i++) {
      const nx = x0 + (i % 2 ? -1 : 1) * (50 + i * 16);
      d += ` C ${x + 90} ${y - up * 0.4}, ${nx - 90} ${y - up * 0.75}, ${nx} ${y - up}`;
      x = nx; y -= up;
    }
    d += ` C ${x + 50} ${y - 30}, ${x0 - 30} ${y - 70}, ${x0} 30`;
    path.setAttribute("d", d);
    const len = path.getTotalLength();
    path.style.transition = "none";
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    fx.classList.remove("hidden");
    ball.classList.add("spin");
    void path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1.15s ease-in";
    path.style.strokeDashoffset = "0";
    ball.classList.add("shrink");
    setTimeout(() => {
      fx.classList.add("hidden");
      ball.classList.remove("spin", "shrink");
      resolve();
    }, 1350);
  });
}

/* ---------- analyze: server API first, then client-side reading ---------- */
async function fetchServerAnalysis(url) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
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

async function getAnalysis(parsed) {
  const server = await fetchServerAnalysis(parsed.url);
  if (server && server.tracks && server.tracks.length) return server;
  const client = await clientAnalyze(parsed).catch(() => null);
  if (client && client.tracks && client.tracks.length) {
    if (!client.playlist.name && server && server.playlist) client.playlist.name = server.playlist.name;
    if (!client.quote && server && server.quote) client.quote = server.quote;
    return client;
  }
  if (server) return server;
  return client || { ok: true, playlist: { id: parsed.id, url: parsed.url, name: null }, tracks: [], stats: null, quote: null, source: "demo" };
}

async function unravel(parsed) {
  await playUnravelFx();
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
}

function showLoading() {
  $("loading").classList.remove("hidden");
  $("loading-ball").innerHTML = yarnBallSvg(150);
  let i = 0;
  $("loading-line").textContent = LOADING_LINES[0];
  const timer = setInterval(() => {
    i = (i + 1) % LOADING_LINES.length;
    $("loading-line").textContent = LOADING_LINES[i];
  }, 900);
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
  $("quote-cite").textContent = "— “" + r.quote.song + "”" + (r.quote.artist && !r.quote.artist.includes("fallback") ? " · " + r.quote.artist : "");

  $("era-icon").innerHTML = renderEraIcon(r.era.icon);
  $("era-name").textContent = r.era.name;
  $("era-feel").textContent = r.era.feel;

  $("character-art").innerHTML = renderPortrait(r.character.style);
  $("character-name").textContent = r.character.name;
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
});
