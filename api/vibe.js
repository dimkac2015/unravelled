const FAMILIES = ["ocean", "forest", "stars", "desert", "mountains", "aurora", "city", "meadow", "canyon", "lake", "sakura", "tundra", "waterfall", "lavender", "volcano", "lighthouse"];

import { createRequire } from "node:module";
const require2 = createRequire(import.meta.url);

function loadEnv() {
  try {
    const fs = require2("node:fs");
    const path = require2("node:path");
    const file = path.join(process.cwd(), ".env");
    if (fs.existsSync(file)) {
      for (const line of fs.readFileSync(file, "utf8").split("\n")) {
        const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
      }
    }
  } catch (e) {}
}
loadEnv();

function hashString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let spotifyTokenCache = { token: null, expires: 0 };

async function spotifyToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return null;
  if (spotifyTokenCache.token && Date.now() < spotifyTokenCache.expires) return spotifyTokenCache.token;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(id + ":" + secret).toString("base64")
    },
    body: "grant_type=client_credentials"
  });
  if (!res.ok) return null;
  const data = await res.json();
  spotifyTokenCache = { token: data.access_token, expires: Date.now() + (data.expires_in - 60) * 1000 };
  return data.access_token;
}

async function fetchPlaylist(url) {
  const m = String(url || "").match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  if (!m) return null;
  const token = await spotifyToken();
  if (!token) return null;
  const id = m[1];
  const headers = { Authorization: "Bearer " + token };
  const meta = await fetch(`https://api.spotify.com/v1/playlists/${id}?fields=name`, { headers });
  if (!meta.ok) return null;
  const metaData = await meta.json();
  const tracks = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=100&fields=items(track(name,artists(name)))`, { headers });
  const tracksData = tracks.ok ? await tracks.json() : { items: [] };
  const names = (tracksData.items || [])
    .map(i => i.track && i.track.name ? i.track.name + " " + (i.track.artists || []).map(a => a.name).join(" ") : null)
    .filter(Boolean)
    .slice(0, 60);
  return { id, name: metaData.name || id, tracks: names };
}

const LANGS = {
  en: "English", ru: "Russian", be: "Belarusian", fr: "French"
};

async function judgeWithMistral(playlist, lang) {
  const key = process.env.MISTRAL_API_KEY;
  if (!key) return null;
  const model = process.env.MISTRAL_MODEL || "mistral-small-latest";
  const sys = `You judge the mood of a Spotify playlist purely from track and artist names. Reply with JSON only, no markdown, no commentary. Shape: {"scene":{"family":one of ${FAMILIES.join(",")},"palette":0-7,"title":"poetic scenery name in ${LANGS[lang] || "English"}, max 5 words"},"words":["w1","w2","w3"],"verdict":"one short mood line in ${LANGS[lang] || "English"}, max 12 words","character":"one character archetype in ${LANGS[lang] || "English"}, max 4 words","film":"one real film or cartoon title","persona":{"compliment":"one warm compliment in ${LANGS[lang] || "English"}, max 14 words","roast":"one light friendly roast, playful never mean, in ${LANGS[lang] || "English"}, max 14 words"}}. Tone: understated, warm, playful, no exclamation marks, no emojis.`;
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: `Playlist: ${playlist.name}\nTracks:\n- ` + playlist.tracks.join("\n- ") }
      ],
      response_format: { type: "json_object" }
    })
  });
  if (!res.ok) return null;
  const data = await res.json();
  const text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  if (!text) return null;
  const parsed = JSON.parse(text);
  if (!FAMILIES.includes(parsed.scene && parsed.scene.family)) return null;
  parsed.scene.palette = Math.max(0, Math.min(7, parseInt(parsed.scene.palette) || 0));
  return parsed;
}

const DEMO = {
  en: { title: "The Last Ferry Home", words: ["fog", "patience", "devotion"], verdict: "a quiet harbour at dusk", character: "the lighthouse keeper", film: "Cinema Paradiso", compliment: "your taste has a quiet confidence to it", roast: "you would absolutely reorganize a stranger's bookshelf by mood, watch you unravel" },
  ru: { title: "Последний паром домой", words: ["туман", "терпение", "преданность"], verdict: "тихая гавань на закате", character: "смотритель маяка", film: "Cinema Paradiso", compliment: "в вашем вкусе есть тихая уверенность", roast: "чужую полку вы бы разобрали по настроению, смотри, как я распускаюсь" },
  be: { title: "Апошні паром дадому", words: ["туман", "цярпенне", "адданасць"], verdict: "ціхая гавань на захадзе", character: "смотрынік маяка", film: "Cinema Paradiso", compliment: "у вашым густэ ёсць ціхая ўпэўненасць", roast: "чужую паліцу вы б разабралі па настроях, глядзі, як я размотваюся" },
  fr: { title: "Le Dernier Ferry du Soir", words: ["brouillard", "patience", "dévouement"], verdict: "un port tranquille au crépuscule", character: "le gardien du phare", film: "Cinema Paradiso", compliment: "votre goût a une confiance tranquille", roast: "vous réorganiseriez l'étagère d'un inconnu par humeur, regarde-moi me défaire" }
};

function demoReading(url, lang) {
  const seed = hashString(String(url) + (lang || "en"));
  const rng = mulberry32(seed);
  const d = DEMO[lang] || DEMO.en;
  const family = FAMILIES[Math.floor(rng() * FAMILIES.length)];
  return {
    demo: true,
    playlist: { name: "november, forever" },
    scene: { family, palette: Math.floor(rng() * 8), title: d.title },
    words: d.words,
    verdict: d.verdict,
    character: d.character,
    film: d.film,
    persona: { compliment: d.compliment, roast: d.roast },
    seed
  };
}

export async function analyze(body) {
  const url = String(body.url || "");
  const lang = LANGS[body.lang] ? body.lang : "en";
  const m = url.match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  if (!m) return { error: "bad link" };
  const playlist = await fetchPlaylist(url);
  if (playlist && playlist.tracks.length) {
    const judged = await judgeWithMistral(playlist, lang);
    if (judged) {
      return {
        demo: false,
        playlist: { name: playlist.name, tracks: playlist.tracks.length },
        scene: judged.scene,
        words: judged.words,
        verdict: judged.verdict,
        character: judged.character,
        film: judged.film,
        persona: judged.persona,
        seed: hashString(playlist.name + judged.scene.title)
      };
    }
  }
  return demoReading(url, lang);
}

export default async function handler(req, res) {
  let body = "";
  if (req.method === "POST") {
    for await (const chunk of req) body += chunk;
  } else if (req.url && req.url.includes("?")) {
    body = new URL(req.url, "http://x").searchParams.get("body") || "{}";
  }
  const data = await analyze(JSON.parse(body || "{}"));
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
}
