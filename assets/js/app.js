// unravelled — flow: landing → analyze → 4 panels → finale

import { parseSpotifyUrl, buildReading } from "./mood.js";
import { renderScene, SCENE_FAMILIES } from "./scenes.js";
import { renderPortrait, renderPoster, renderEraIcon } from "./portraits.js";
import { yarnBallSvg, threadPileSvg, catSvg } from "./yarn.js";
import { makeRng } from "./rng.js";

const $ = (id) => document.getElementById(id);
const LOADING_LINES = ["listening…", "counting the songs…", "feeling the tempo…", "pulling the thread…", "almost there…"];

let reading = null;

/* ---------- landing ---------- */
$("landing-ball").innerHTML = yarnBallSvg(190);

$("link-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const raw = $("playlist-input").value;
  const parsed = parseSpotifyUrl(raw);
  if (!parsed) {
    $("landing-error").textContent = "that doesn't look like a spotify playlist link — try https://open.spotify.com/playlist/…";
    return;
  }
  $("landing-error").textContent = "";
  await unravel(parsed);
});

/* ---------- analyze ---------- */
async function fetchAnalysis(url) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error("bad status " + res.status);
    return await res.json();
  } catch {
    return null; // static hosting or offline → local demo reading
  }
}

async function unravel(parsed) {
  showLoading();
  const api = await fetchAnalysis(parsed.url);
  const seed = parsed.id + "|" + (api && api.playlist && api.playlist.name ? api.playlist.name : "");
  reading = buildReading(seed, api && api.ok ? api : null);
  renderJourney(reading);
  hideLoading();
  $("landing").classList.add("hidden");
  $("journey").classList.remove("hidden");
  $("ball-dock").classList.remove("hidden");
  setStep("scene");
  $("scroller").scrollTo({ top: 0 });
  $("journey-playlist").textContent = reading.playlist.name
    ? `“${reading.playlist.name}” — ${reading.source === "demo" ? "demo reading" : "analysed"}`
    : (reading.source === "demo" ? "demo reading" : "analysed");
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
  $("quote-cite").textContent = "— " + r.quote.song + (r.quote.artist && !r.quote.artist.includes("fallback") ? ", " + r.quote.artist : "");

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
  $("cats").innerHTML = catSvg(false, 54) + catSvg(true, 46);
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
