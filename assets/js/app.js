import { I18N } from "./i18n.js";
import { renderScene, FAMILIES, SCENE_NAMES } from "./scenes.js";

let lang = new URLSearchParams(location.search).get("lang") || "en";
if (!I18N[lang]) lang = "en";
let data = null;
let revealed = 0;

const $ = id => document.getElementById(id);
const t = k => I18N[lang][k];

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $("lang-btn").textContent = lang.toUpperCase() + " ▾";
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

function cycleLoadingLines() {
  const el = $("loading-line");
  const lines = t("loadingLines");
  let i = 0;
  el.textContent = lines[0];
  return setInterval(() => { i = (i + 1) % lines.length; el.textContent = lines[i]; }, 900);
}

function unravelAnimation(done) {
  const layer = $("thread-layer");
  const w = window.innerWidth, h = window.innerHeight;
  const cx = w / 2, cy = h * 0.45;
  const ball = $("yarn-ball");
  if (ball) ball.classList.add("spin");
  const x0 = cx + 62, y0 = cy + 20;
  const d = `M ${x0} ${y0} C ${cx + 104} ${cy - 30}, ${cx + 9} ${cy - 63}, ${cx - 30} ${cy + 2} C ${cx - 52} ${cy + 37}, ${cx + 4} ${cy + 50}, ${cx + 11} ${cy + 78} C ${cx + 19} ${cy + 130}, ${cx - 22} ${cy + 195}, ${cx - 9} ${h * 0.97}`;
  const path = $("thread-path");
  path.setAttribute("d", d);
  const len = path.getTotalLength();
  path.style.transition = "none";
  path.style.opacity = "1";
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  const strands = [];
  for (let i = 0; i < 2; i++) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const off = 16 + i * 12;
    p.setAttribute("d", `M ${x0 + off} ${y0 + 9} C ${cx + 100 + off} ${cy - 9}, ${cx + 24} ${cy + 46}, ${cx + off} ${cy + 100} C ${cx + off - 13} ${cy + 175}, ${cx - off} ${cy + 265}, ${cx + 4} ${h * 0.97}`);
    p.setAttribute("fill", "none");
    p.style.stroke = "#e8dfc8";
    p.style.strokeWidth = "1.5";
    p.style.opacity = "0.55";
    layer.appendChild(p);
    strands.push(p);
  }
  path.getBoundingClientRect();
  strands.forEach((p, i) => {
    const l = p.getTotalLength();
    p.style.strokeDasharray = l;
    p.style.strokeDashoffset = l;
    p.style.transition = `stroke-dashoffset ${1 + i * 0.16}s ease-in ${0.16 + i * 0.1}s`;
    p.style.strokeDashoffset = "0";
  });
  path.style.transition = "stroke-dashoffset 1.25s ease-in-out";
  path.style.strokeDashoffset = "0";
  const start = Date.now();
  setTimeout(() => {
    path.style.transition = "opacity 1.8s ease-out";
    path.style.opacity = "0";
    strands.forEach(p => { p.style.transition = "opacity 1.8s ease-out"; p.style.opacity = "0"; });
    const wait = Math.max(0, 2400 - (Date.now() - start));
    setTimeout(() => {
      strands.forEach(p => p.remove());
      path.style.strokeDasharray = "";
      if (ball) ball.classList.remove("spin");
      done();
    }, Math.max(1850, wait));
  }, 1300);
}

async function submit() {
  const url = $("playlist-input").value.trim();
  const err = $("landing-error");
  if (!/open\.spotify\.com\/playlist\/[A-Za-z0-9]+/.test(url)) {
    err.textContent = t("badLink");
    return;
  }
  err.textContent = "";
  showScreen("screen-loading");
  const lineTimer = cycleLoadingLines();
  const fetchPromise = fetch("/api/vibe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, lang })
  }).then(r => r.json()).catch(() => clientDemo(url, lang));
  const startUnravel = () => {
    clearInterval(lineTimer);
    unravelAnimation(async () => {
      data = await fetchPromise;
      buildThread();
      showScreen("screen-thread");
    });
  };
  const ball = $("yarn-ball");
  ball.onclick = startUnravel;
  ball.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startUnravel(); } };
}

function clientDemo(url, lang) {
  const FAMILY_DEMO = { en: ["The Last Ferry Home", "fog", "patience", "devotion", "a quiet harbour at dusk", "the lighthouse keeper"], ru: ["Последний паром домой", "туман", "терпение", "преданность", "тихая гавань на закате", "смотритель маяка"], be: ["Апошні паром дадому", "туман", "цярпенне", "адданасць", "ціхая гавань на захадзе", "смотрынік маяка"], fr: ["Le Dernier Ferry du Soir", "brouillard", "patience", "dévouement", "un port tranquille au crépuscule", "le gardien du phare"] };
  const d = FAMILY_DEMO[lang] || FAMILY_DEMO.en;
  let h = 1779033703 ^ url.length;
  for (let i = 0; i < url.length; i++) { h = Math.imul(h ^ url.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  const seed = h >>> 0;
  return {
    demo: true,
    playlist: { name: "november, forever" },
    scene: { family: FAMILIES[seed % FAMILIES.length], palette: (seed >> 3) % 8, title: d[0] },
    words: [d[1], d[2], d[3]],
    verdict: d[4],
    character: d[5],
    film: "Cinema Paradiso",
    persona: { compliment: "", roast: "" },
    seed
  };
}

function buildThread() {
  revealed = 0;
  const scene = data.scene;
  const title = scene.title || (SCENE_NAMES[lang] && SCENE_NAMES[lang][scene.family]) || scene.family;
  $("card-scene-art").innerHTML = renderScene(scene.family, scene.palette, data.seed);
  $("card-scene-title").textContent = title;
  $("card-scene-verdict").textContent = data.verdict || "";
  $("card-words").textContent = (data.words || []).join(" · ");
  $("card-character").textContent = data.character || "";
  $("card-film").textContent = data.film || "";
  $("card-persona").textContent = (data.persona ? data.persona.compliment + " " + data.persona.roast : "");
  const curious = $("curious");
  if (data.demo || !data.playlist || !data.playlist.tracks) {
    curious.classList.add("hidden");
  } else {
    curious.classList.remove("hidden");
    $("curious-text").textContent = `${data.playlist.name} · ${data.playlist.tracks} ${t("tracks")}`;
  }
  document.querySelectorAll(".card").forEach(c => c.classList.remove("revealed"));
  updatePullButton();
}

function updatePullButton() {
  const btn = $("pull-more");
  const cards = document.querySelectorAll(".card");
  if (revealed >= cards.length) {
    btn.classList.add("hidden");
  } else {
    btn.classList.remove("hidden");
  }
}

function pullMore() {
  const cards = document.querySelectorAll(".card");
  if (revealed >= cards.length) return;
  unravelAnimation(() => {
    cards[revealed].classList.add("revealed");
    revealed++;
    updatePullButton();
  });
}

async function setLang(l) {
  lang = l;
  applyLang();
  $("lang-menu").classList.remove("open");
  const url = $("playlist-input").value.trim();
  if (data && /open\.spotify\.com\/playlist\/[A-Za-z0-9]+/.test(url)) {
    data = await fetch("/api/vibe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, lang })
    }).then(r => r.json());
    buildThread();
  }
}

$("btn-pull").addEventListener("click", submit);
$("playlist-input").addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
$("pull-more").addEventListener("click", pullMore);
$("btn-again").addEventListener("click", () => { $("playlist-input").value = ""; data = null; showScreen("screen-landing"); });
$("btn-share").addEventListener("click", async () => {
  const url = $("playlist-input").value.trim();
  const link = location.origin + location.pathname + "?playlist=" + encodeURIComponent(url) + "&lang=" + lang;
  try { await navigator.clipboard.writeText(link); $("btn-share").textContent = t("copied"); }
  catch (e) { location.hash = ""; }
});
$("lang-btn").addEventListener("click", () => $("lang-menu").classList.toggle("open"));
document.addEventListener("click", e => { if (!e.target.closest("#lang-bar")) $("lang-menu").classList.remove("open"); });
document.querySelectorAll("#lang-menu button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
$("curious-toggle").addEventListener("click", () => $("curious-text").classList.toggle("hidden"));

const preset = new URLSearchParams(location.search).get("playlist");
if (preset) { $("playlist-input").value = preset; submit(); }
applyLang();
