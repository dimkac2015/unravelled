import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "256kb" }));
app.use(express.static(path.join(__dirname, "public")));

const MISTRAL_KEY = process.env.MISTRAL_API_KEY || "";
const MISTRAL_MODEL = "mistral-large-latest";
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const SCENES = [
  "ocean_ship", "river", "forest", "autumn_woods", "desert", "mountains", "volcano",
  "night_city", "snowfield", "meadow_summer", "thunderstorm", "space", "swamp",
  "sea_cliffs", "lavender_fields",
];
const PALETTES = [
  "ember", "deep_forest", "golden_hour", "midnight_blue", "neon_night",
  "dusty_sand", "ice", "storm_grey", "violet_dusk", "sea_teal",
];
const ICONS = [
  "top_hat", "pickaxe", "rocket", "gramophone", "sailing_ship", "castle",
  "lantern", "steam_train", "crown", "compass", "key", "hourglass",
];
const ARCHETYPES = [
  "detective", "wanderer", "rebel", "dreamer", "soldier", "witch",
  "clown", "scientist", "cowboy", "noble",
];
const TEMPOS = ["slow", "mid", "fast", "mixed"];

/* ---------------- /api/playlist — read track list without any Spotify keys ---------------- */

function extractPlaylistId(input) {
  const s = String(input || "").trim();
  let m = s.match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  if (m) return m[1];
  m = s.match(/spotify:playlist:([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

function collectTracks(node, out, seen) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) { node.forEach((n) => collectTracks(n, out, seen)); return; }
  // embed-page track shape: { entityType:"track", uri:"spotify:track:…", title, subtitle(artist) }
  // classic shape: { uri:"spotify:track:…", name, artists:[{name}] }
  let title = null, artist = null;
  if ((node.entityType === "track" || (typeof node.uri === "string" && node.uri.startsWith("spotify:track:"))) &&
      typeof node.title === "string" && typeof node.subtitle === "string") {
    title = node.title; artist = node.subtitle;
  } else if (typeof node.name === "string" && node.name.length > 0 && node.name.length < 150 &&
             Array.isArray(node.artists) && node.artists.some((a) => a && typeof a.name === "string")) {
    title = node.name;
    artist = node.artists.map((a) => a.name).filter(Boolean).join(", ");
  }
  if (title && artist) {
    const key = title.toLowerCase() + "|" + artist.toLowerCase();
    if (!seen.has(key)) { seen.add(key); out.push({ title, artist }); }
  }
  for (const k of Object.keys(node)) collectTracks(node[k], out, seen);
}

async function readPlaylist(id) {
  const url = `https://open.spotify.com/embed/playlist/${id}`;
  const res = await fetch(url, {
    headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error("spotify embed HTTP " + res.status);
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("no __NEXT_DATA__ on embed page");
  const data = JSON.parse(m[1]);
  const tracks = [];
  const seen = new Set();
  collectTracks(data, tracks, seen);
  let playlistTitle = null;
  (function findTitle(o) {
    if (playlistTitle || !o || typeof o !== "object") return;
    if (Array.isArray(o)) { o.forEach(findTitle); return; }
    if (o.uri === `spotify:playlist:${id}` && (typeof o.name === "string" || typeof o.title === "string")) playlistTitle = o.name || o.title;
    for (const k of Object.keys(o)) findTitle(o[k]);
  })(data);
  if (!playlistTitle) {
    const og = html.match(/<meta property="og:title" content="([^"]+)"/);
    if (og) playlistTitle = og[1];
  }
  return { playlistTitle, tracks: tracks.slice(0, 100) };
}

app.post("/api/playlist", async (req, res) => {
  try {
    const id = extractPlaylistId(req.body && req.body.url);
    if (!id) return res.status(400).json({ ok: false, error: "not a spotify playlist link" });
    const data = await readPlaylist(id);
    res.json({ ok: true, id, ...data });
  } catch (e) {
    res.status(502).json({ ok: false, error: String((e && e.message) || e) });
  }
});

/* ---------------- /api/analyze — Mistral JSON analysis, local fallback ---------------- */

const SYSTEM_PROMPT = `You analyze a Spotify playlist's track list (titles + artists only; no audio features are available, infer mood from artists and titles) and answer with STRICT JSON only, no markdown, matching exactly this schema:
{
 "energy": 0-1, "valence": 0-1, "darkness": 0-1, "aggression": 0-1,
 "tempo": "slow|mid|fast|mixed",
 "scene": one id from SCENES,
 "scene_title": short poetic name of the scenery (e.g. "The Last Ship Before Storm"),
 "palette": one id from PALETTES,
 "era": {"name": "...", "season": "...", "feel": "one sentence", "icon": one id from ICONS},
 "character": {"name": "...", "source": "movie/cartoon title", "why": "max 20 words", "archetype": one id from ARCHETYPES},
 "movie": {"title": "...", "year": 0, "why": "max 20 words"},
 "quote_candidates": [3 songs FROM THE GIVEN PLAYLIST that fit the mood: {"song": "...", "artist": "..."}],
 "summary": "one line"
}
SCENES: ${SCENES.join(", ")}
PALETTES: ${PALETTES.join(", ")}
ICONS: ${ICONS.join(", ")}
ARCHETYPES: ${ARCHETYPES.join(", ")}
Rules: character must be a real character from an existing movie or cartoon and the connection to the playlist must feel natural, not far-fetched. Movie must be a real existing film whose soundtrack could plausibly be this playlist. Era is a real historical period plus season, or a believable future setting. Mood-to-scene guidance: aggressive/metal -> volcano or thunderstorm in reds and black; fast+happy/nostalgic -> meadow_summer or river in warm yellows and sky blue; lush orchestral folk-gothic (e.g. Hozier) -> forest or autumn_woods in deep greens, moss, amber, mist; slow and sad -> night_city or snowfield in blues and violets; epic and wide -> ocean_ship or mountains; electronic -> space or night_city in neon; dry warm bluesy -> desert. quote_candidates must be copied exactly (song + artist) from the provided track list.`;

function clamp01(x) {
  const n = Number(x);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.5;
}

function sanitizeAnalysis(a, tracks) {
  const pick = (arr, fb) => (arr.includes(a) ? a : fb);
  const era = a && typeof a.era === "object" ? a.era : {};
  const character = a && typeof a.character === "object" ? a.character : {};
  const movie = a && typeof a.movie === "object" ? a.movie : {};
  const qc = Array.isArray(a && a.quote_candidates) ? a.quote_candidates : [];
  const trackKeys = new Set(tracks.map((t) => `${t.title}|${t.artist}`.toLowerCase()));
  const candidates = qc
    .filter((q) => q && typeof q.song === "string" && typeof q.artist === "string")
    .filter((q) => trackKeys.has(`${q.song}|${q.artist}`.toLowerCase()))
    .slice(0, 3);
  return {
    energy: clamp01(a && a.energy),
    valence: clamp01(a && a.valence),
    darkness: clamp01(a && a.darkness),
    aggression: clamp01(a && a.aggression),
    tempo: TEMPOS.includes(a && a.tempo) ? a.tempo : "mixed",
    scene: SCENES.includes(a && a.scene) ? a.scene : "meadow_summer",
    scene_title: typeof (a && a.scene_title) === "string" && a.scene_title ? a.scene_title : "Somewhere Quiet",
    palette: PALETTES.includes(a && a.palette) ? a.palette : "golden_hour",
    era: {
      name: String(era.name || "Modern days"),
      season: String(era.season || "year-round"),
      feel: String(era.feel || "a moment that belongs to this playlist."),
      icon: ICONS.includes(era.icon) ? era.icon : "lantern",
    },
    character: {
      name: String(character.name || "The Wanderer"),
      source: String(character.source || "an old film"),
      why: String(character.why || "they simply fit.").slice(0, 140),
      archetype: ARCHETYPES.includes(character.archetype) ? character.archetype : "wanderer",
    },
    movie: {
      title: String(movie.title || "a film you already love"),
      year: Number.isFinite(Number(movie.year)) ? Number(movie.year) : 2000,
      why: String(movie.why || "the soundtrack fits.").slice(0, 140),
    },
    quote_candidates: candidates.length ? candidates : tracks.slice(0, 3).map((t) => ({ song: t.title, artist: t.artist })),
    summary: typeof (a && a.summary) === "string" ? a.summary : "This playlist has a mood of its own.",
  };
}

/* keyword-based fallback used when MISTRAL_API_KEY is missing or the API call fails */
function localAnalyze(tracks) {
  const text = tracks.map((t) => `${t.title} ${t.artist}`.toLowerCase()).join(" ");
  const has = (...ws) => ws.some((w) => text.includes(w));
  const aggression = has("metal", "scream", "rage", "war", "kill", "heavy", "thrash", "riot", "burn", "venom") ? 0.85
    : has("punk", "fight", "enemy") ? 0.55 : 0.15;
  const darkness = has("dark", "night", "midnight", "black", "shadow", "ghost", "death", "rain", "storm", "hell", "witch", "goth") ? 0.8 : 0.3;
  const valence = has("sun", "summer", "happy", "dance", "party", "love", "joy", "smile", "shine", "golden") ? 0.85 : 0.4;
  const energy = has("fast", "run", "jump", "rock", "drive", "fire", "party") ? 0.8 : 0.45;
  const tempo = aggression > 0.6 || energy > 0.7 ? "fast" : valence > 0.7 && energy < 0.5 ? "slow" : "mid";
  let scene, palette;
  if (aggression > 0.55) { scene = "volcano"; palette = "ember"; }
  else if (darkness > 0.6 && valence < 0.5) { scene = "night_city"; palette = "midnight_blue"; }
  else if (valence > 0.7 && energy > 0.55) { scene = "meadow_summer"; palette = "golden_hour"; }
  else if (darkness > 0.5 && valence > 0.45) { scene = "forest"; palette = "deep_forest"; }
  else if (energy < 0.5 && valence < 0.5) { scene = "snowfield"; palette = "ice"; }
  else { scene = "river"; palette = "sea_teal"; }
  return {
    energy, valence, darkness, aggression, tempo, scene,
    scene_title: "A Place That Fits",
    palette,
    era: { name: "Victorian era", season: "autumn", feel: "Fog, lamplight and a playlist that hums along.", icon: "lantern" },
    character: { name: "The Wanderer", source: "classic road movies", why: "someone who carries their own soundtrack.", archetype: "wanderer" },
    movie: { title: "Into the Wild", year: 2007, why: "a road story with a playlist at its heart." },
    quote_candidates: tracks.slice(0, 3).map((t) => ({ song: t.title, artist: t.artist })),
    summary: "A playlist with a quiet, wandering mood.",
  };
}

app.post("/api/analyze", async (req, res) => {
  const tracks = Array.isArray(req.body && req.body.tracks)
    ? req.body.tracks.filter((t) => t && t.title && t.artist).slice(0, 100)
    : [];
  if (!tracks.length) return res.status(400).json({ ok: false, error: "no tracks" });
  if (!MISTRAL_KEY) return res.json({ ok: true, demo: true, analysis: sanitizeAnalysis(localAnalyze(tracks), tracks) });
  try {
    const r = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${MISTRAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify({ tracks }) },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!r.ok) throw new Error("mistral HTTP " + r.status);
    const j = await r.json();
    const content = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "";
    const parsed = JSON.parse(content);
    res.json({ ok: true, demo: false, analysis: sanitizeAnalysis(parsed, tracks) });
  } catch (e) {
    res.json({ ok: true, demo: true, analysis: sanitizeAnalysis(localAnalyze(tracks), tracks) });
  }
});

/* ---------------- /api/quote — one short line via keyless lyrics.ovh ---------------- */

app.get("/api/quote", async (req, res) => {
  const artist = String(req.query.artist || "").trim();
  const title = String(req.query.title || "").trim();
  if (!artist || !title) return res.status(400).json({ ok: false, error: "artist and title required" });
  try {
    const r = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return res.status(404).json({ ok: false, error: "no lyrics found" });
    const j = await r.json();
    const lines = String(j.lyrics || "").split("\n").map((l) => l.trim());
    const line = lines.find((l) =>
      l && !/^\[.*\]$/.test(l) &&
      l.split(/\s+/).length <= 12 && l.split(/\s+/).length >= 4 &&
      !/^(chorus|verse|intro|outro|hook|bridge|pre-chorus)/i.test(l)
    );
    if (!line) return res.status(404).json({ ok: false, error: "no suitable line" });
    res.json({ ok: true, line });
  } catch (e) {
    res.status(502).json({ ok: false, error: String((e && e.message) || e) });
  }
});

const port = process.env.PORT || 3000;
// local dev stays loopback-only; on Render (RENDER env is set) the service must bind 0.0.0.0
const host = process.env.RENDER ? "0.0.0.0" : "127.0.0.1";
app.listen(port, host, () => {
  console.log(`unravelled listening on ${host}:${port}`);
});
