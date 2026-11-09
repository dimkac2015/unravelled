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
const ACTIVITIES = [
  "night_drive", "cooking", "reading_by_window", "running", "walking_in_rain", "road_trip",
  "cleaning_to_music", "painting", "fishing", "coffee_in_cafe", "stargazing", "working_late",
];
const TEMPOS = ["slow", "mid", "fast", "mixed"];
const LANGS = ["en", "ru", "be", "fr"];
const CHARACTER_BANK = [
  "Wednesday Addams (The Addams Family)",
  "Amélie Poulain (Amélie)",
  "Lisbeth Salander (The Girl with the Dragon Tattoo)",
  "The Dude (The Big Lebowski)",
  "Mia (La La Land)",
  "Eleven (Stranger Things)",
  "Forrest Gump (Forrest Gump)",
  "Napoleon Dynamite (Napoleon Dynamite)",
  "Paddington (Paddington)",
  "Walter Mitty (The Secret Life of Walter Mitty)",
  "Ron Swanson (Parks and Recreation)",
  "Chihiro (Spirited Away)",
  "Jack Sparrow (Pirates of the Caribbean)",
  "Tyler Durden (Fight Club)",
  "Neo (The Matrix)",
  "Trinity (The Matrix)",
  "John Wick (John Wick)",
  "Ellen Ripley (Alien)",
  "Sarah Connor (Terminator)",
  "Marty McFly (Back to the Future)",
  "Doc Brown (Back to the Future)",
  "Indiana Jones (Indiana Jones)",
  "Rick Deckard (Blade Runner)",
  "Beatrix Kiddo (Kill Bill)",
  "Jules Winnfield (Pulp Fiction)",
  "Vincent Vega (Pulp Fiction)",
  "Mia Wallace (Pulp Fiction)",
  "Hannibal Lecter (The Silence of the Lambs)",
  "Clarice Starling (The Silence of the Lambs)",
  "Vito Corleone (The Godfather)",
  "Tony Montana (Scarface)",
  "Rocky Balboa (Rocky)",
  "John McClane (Die Hard)",
  "Snake Plissken (Escape from New York)",
  "Max Rockatansky (Mad Max)",
  "Furiosa (Mad Max: Fury Road)",
  "Jack Torrance (The Shining)",
  "Andy Dufresne (The Shawshank Redemption)",
  "Randall McMurphy (One Flew Over the Cuckoo's Nest)",
  "Alex DeLarge (A Clockwork Orange)",
  "Travis Bickle (Taxi Driver)",
  "Holly Golightly (Breakfast at Tiffany's)",
  "SpongeBob (SpongeBob SquarePants)",
  "Patrick Star (SpongeBob SquarePants)",
  "Squidward (SpongeBob SquarePants)",
  "Bart Simpson (The Simpsons)",
  "Lisa Simpson (The Simpsons)",
  "Homer Simpson (The Simpsons)",
  "Marge Simpson (The Simpsons)",
  "Rick Sanchez (Rick and Morty)",
  "Morty Smith (Rick and Morty)",
  "Finn (Adventure Time)",
  "Jake (Adventure Time)",
  "Princess Bubblegum (Adventure Time)",
  "Marceline (Adventure Time)",
  "Gumball (The Amazing World of Gumball)",
  "Darwin (The Amazing World of Gumball)",
  "Totoro (My Neighbor Totoro)",
  "Sophie (Howl's Moving Castle)",
  "Howl (Howl's Moving Castle)",
  "Ash Ketchum (Pokémon)",
  "Naruto Uzumaki (Naruto)",
  "Goku (Dragon Ball)",
  "Monkey D. Luffy (One Piece)",
  "Light Yagami (Death Note)",
  "L (Death Note)",
  "Edward Elric (Fullmetal Alchemist)",
  "Spike Spiegel (Cowboy Bebop)",
  "Motoko Kusanagi (Ghost in the Shell)",
  "Shrek (Shrek)",
  "Donkey (Shrek)",
  "Princess Fiona (Shrek)",
  "Puss in Boots (Puss in Boots)",
  "Po (Kung Fu Panda)",
  "Hiccup (How to Train Your Dragon)",
  "Astrid (How to Train Your Dragon)",
  "Eren Yeager (Attack on Titan)",
  "Mikasa (Attack on Titan)",
  "Levi (Attack on Titan)",
  "Gon Freecss (Hunter x Hunter)",
  "Killua (Hunter x Hunter)",
  "Sailor Moon (Sailor Moon)",
  "Guts (Berserk)",
  "Denji (Chainsaw Man)",
  "Power (Chainsaw Man)",
  "Coraline (Coraline)",
  "WALL-E (WALL-E)",
  "EVE (WALL-E)",
  "Mr. Incredible (The Incredibles)",
  "Elastigirl (The Incredibles)",
  "Violet (The Incredibles)",
  "Dash (The Incredibles)",
  "Mike Wazowski (Monsters, Inc.)",
  "Sully (Monsters, Inc.)",
  "Boo (Monsters, Inc.)",
  "Joy (Inside Out)",
  "Sadness (Inside Out)",
  "Anger (Inside Out)",
  "Wallace (Wallace & Gromit)",
  "Gromit (Wallace & Gromit)"
];
const FILM_BANK = [
  "Amélie (2001)", "La La Land (2016)", "Drive (2011)", "Guardians of the Galaxy (2014)",
  "Into the Wild (2007)", "500 Days of Summer (2009)", "Spirited Away (2001)",
  "Forrest Gump (1994)", "Interstellar (2014)", "Pulp Fiction (1994)",
  "The Grand Budapest Hotel (2014)", "The Secret Life of Walter Mitty (2013)",
];

const LANGUAGE_RULES = {
  en: "Write all human-readable text fields in English.",
  ru: "Write all human-readable text fields in Russian. Use established Russian titles of films and characters where they exist; otherwise keep the original title.",
  fr: "Write all human-readable text fields in French. Use established French titles of films and characters where they exist; otherwise keep the original title.",
  be: "Write all human-readable text fields in natural literary Belarusian in the current official orthography, with real Belarusian words and Belarusian spelling (і, ў, ё/я/е/а per the akanne rules, ч/ц per pronunciation, etc.). Do NOT produce Russian text with Belarusian letters swapped in, and do not invent words — if unsure about a word, use a simpler real Belarusian word. Titles of films and characters: use the established Belarusian title if one exists, otherwise the original title.",
};

function systemPrompt(lang) {
  return `You analyze a Spotify playlist's track list (titles + artists only; no audio features are available, infer mood from artists and titles) and answer with STRICT JSON only, no markdown, matching exactly this schema:
{
 "energy": 0-1, "valence": 0-1, "darkness": 0-1, "aggression": 0-1,
 "tempo": "slow|mid|fast|mixed",
 "scene": one id from SCENES,
 "scene_title": short poetic name of the scenery (e.g. "The Last Ship Before Storm"),
 "palette": one id from PALETTES,
 "era": {"name": "...", "season": "...", "feel": "one sentence", "icon": one id from ICONS},
 "character": {"name": "...", "source": "movie/cartoon title", "why": "max 20 words", "archetype": one id from ARCHETYPES},
 "movie": {"title": "...", "year": 0, "why": "max 20 words"},
 "note": "character MUST be one entry of CHARACTER_BANK (name and source exactly as listed, in the requested language for the name if a localized form exists); movie MUST be one entry of FILM_BANK (title and year exactly as listed)",
 "activity": {"title": "short activity name, e.g. 'A night drive with the windows down'", "why": "one sentence, max 20 words", "scene_id": one id from ACTIVITIES},
 "quote_candidates": [3 songs FROM THE GIVEN PLAYLIST that fit the mood: {"song": "...", "artist": "..."}],
 "summary": "one line"
}
SCENES: ${SCENES.join(", ")}
PALETTES: ${PALETTES.join(", ")}
ICONS: ${ICONS.join(", ")}
ARCHETYPES: ${ARCHETYPES.join(", ")}
ACTIVITIES: ${ACTIVITIES.join(", ")}
CHARACTER_BANK: ${CHARACTER_BANK.join(" | ")}
FILM_BANK: ${FILM_BANK.join(" | ")}
Rules: pick the character ONLY from CHARACTER_BANK and the movie ONLY from FILM_BANK, copying name/source/title/year exactly (localize the displayed name only if an established translation exists in the requested language). The connection to the playlist must feel natural, not far-fetched. The movie's soundtrack must plausibly be this playlist. Era is a real historical period plus season, or a believable future setting. Activity must be one of the ACTIVITIES ids with a fitting title. The era name must NOT repeat the season word (e.g. never "1970s autumn, autumn" — if the name already contains the season, leave season as is). Mood-to-scene guidance: aggressive/metal -> volcano or thunderstorm in reds and black; fast+happy/nostalgic -> meadow_summer or river in warm yellows and sky blue; lush orchestral folk-gothic (e.g. Hozier) -> forest or autumn_woods in deep greens, moss, amber, mist; slow and sad -> night_city or snowfield in blues and violets; epic and wide -> ocean_ship or mountains; electronic -> space or night_city in neon; dry warm bluesy -> desert. quote_candidates must be copied exactly (song + artist) from the provided track list.
LANGUAGE: ${LANGUAGE_RULES[lang] || LANGUAGE_RULES.en} Keep ALL id fields (scene, palette, icon, archetype, scene_id) in English exactly as listed. Song titles, artist names and lyrics are NEVER translated.`;
}

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

/* ---------------- /api/analyze — Mistral JSON analysis (no demo fallback) ---------------- */

function clamp01(x) {
  const n = Number(x);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.5;
}

function sanitizeAnalysis(a, tracks) {
  const era = a && typeof a.era === "object" ? a.era : {};
  const character = a && typeof a.character === "object" ? a.character : {};
  const movie = a && typeof a.movie === "object" ? a.movie : {};
  const activity = a && typeof a.activity === "object" ? a.activity : {};
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
    activity: {
      title: String(activity.title || "A quiet evening at home"),
      why: String(activity.why || "the mood fits.").slice(0, 140),
      scene_id: ACTIVITIES.includes(activity.scene_id) ? activity.scene_id : "working_late",
    },
    quote_candidates: candidates.length ? candidates : tracks.slice(0, 3).map((t) => ({ song: t.title, artist: t.artist })),
    summary: typeof (a && a.summary) === "string" ? a.summary : "This playlist has a mood of its own.",
  };
}

app.post("/api/analyze", async (req, res) => {
  const tracks = Array.isArray(req.body && req.body.tracks)
    ? req.body.tracks.filter((t) => t && t.title && t.artist).slice(0, 100)
    : [];
  if (!tracks.length) return res.status(400).json({ ok: false, error: "no tracks" });
  if (!MISTRAL_KEY) return res.status(503).json({ ok: false, error: "MISTRAL_API_KEY is not configured" });
  const lang = LANGS.includes(req.body && req.body.lang) ? req.body.lang : "en";
  try {
    const r = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${MISTRAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt(lang) },
          { role: "user", content: JSON.stringify({ lang, tracks }) },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!r.ok) throw new Error("mistral HTTP " + r.status);
    const j = await r.json();
    const content = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "";
    const parsed = JSON.parse(content);
    res.json({ ok: true, analysis: sanitizeAnalysis(parsed, tracks) });
  } catch (e) {
    res.status(502).json({ ok: false, error: String((e && e.message) || e) });
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
// local dev (no PORT env) stays loopback-only; on Render PORT is always set, so bind 0.0.0.0 there
const host = process.env.PORT ? "0.0.0.0" : "127.0.0.1";
app.get("/healthz", (req, res) => res.status(200).send("ok"));
app.listen(port, host, () => {
  console.log(`unravelled listening on ${host}:${port}`);
});
