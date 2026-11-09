// /api/analyze — playlist analysis engine.
// Works three ways, best first:
//   1. SPOTIFY_CLIENT_ID/SECRET set → real track list + audio features, real lyric line via api.lyrics.ovh (keyless)
//   2. no keys → playlist name via Spotify oEmbed, mood from a deterministic demo reading
//   3. any failure → demo reading so the site always answers
// Also the Vercel serverless function (default export).

const LYRICS_API = "https://api.lyrics.ovh/v1";
const OEMBED = "https://open.spotify.com/oembed?url=";

const MOOD_KEYWORDS = {
  aggressive: ["metal", "scream", "rage", "fight", "kill", "war", "heavy", "riot", "burn", "doom", "thrash", "punk"],
  dark: ["dark", "night", "midnight", "black", "shadow", "ghost", "death", "rain", "storm", "witch", "hell", "haunted", "void", "abyss"],
  sunny: ["sun", "summer", "happy", "dance", "party", "joy", "smile", "golden", "beach", "shine", "love", "sweet", "fun", "disco", "sunshine"],
  lush: ["orchestra", "symphony", "choir", "strings", "epic", "cinematic", "anthem", "grand", "waltz", "philharmonic"],
  chill: ["chill", "lo-fi", "lofi", "acoustic", "slow", "calm", "relax", "ambient", "sleep", "coffee", "mellow", "ballad"],
  melancholic: ["sad", "lonely", "goodbye", "cry", "tears", "blue", "miss", "homesick", "empty", "winter", "alone", "fading"],
};

function parsePlaylistId(input) {
  const s = String(input || "").trim();
  let m = s.match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  if (m) return m[1];
  m = s.match(/spotify:playlist:([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

async function fetchJson(url, opts = {}, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal, headers: { "User-Agent": "unravelled/1.0", ...(opts.headers || {}) } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function spotifyToken() {
  const id = process.env.SPOTIFY_CLIENT_ID, secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return null;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: "Basic " + Buffer.from(id + ":" + secret).toString("base64") },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) return null;
  return (await res.json()).access_token || null;
}

async function spotifyTracks(id, token) {
  const h = { Authorization: "Bearer " + token };
  const meta = await fetchJson(`https://api.spotify.com/v1/playlists/${id}?fields=name,external_urls`, { headers: h });
  const tracks = [];
  let url = `https://api.spotify.com/v1/playlists/${id}/tracks?limit=100&fields=items(track(name,artists(name),id,is_local))`;
  while (url && tracks.length < 100) {
    const page = await fetchJson(url, { headers: h });
    for (const item of page.items || []) {
      const tr = item.track;
      if (tr && tr.name && !tr.is_local) tracks.push({ name: tr.name, artist: (tr.artists || []).map(a => a.name).join(", "), id: tr.id });
    }
    url = page.next;
  }
  let stats = null;
  const ids = tracks.filter(t => t.id).map(t => t.id);
  if (ids.length) {
    try {
      const feats = await fetchJson(`https://api.spotify.com/v1/audio-features?ids=${ids.slice(0, 100).join(",")}`, { headers: h });
      const fs = (feats.audio_features || []).filter(Boolean);
      if (fs.length) {
        const avg = (k) => fs.reduce((a, f) => a + f[k], 0) / fs.length;
        stats = { energy: avg("energy"), valence: avg("valence"), tempo: avg("tempo"), danceability: avg("danceability"), acousticness: avg("acousticness") };
      }
    } catch { stats = null; }
  }
  return { name: meta.name || null, url: `https://open.spotify.com/playlist/${id}`, tracks, stats };
}

function trackMoodScore(t) {
  const txt = `${t.name} ${t.artist}`.toLowerCase();
  let best = null, bestN = 0;
  for (const [mood, words] of Object.entries(MOOD_KEYWORDS)) {
    let n = 0;
    for (const w of words) if (txt.includes(w)) n++;
    if (n > bestN) { bestN = n; best = mood; }
  }
  return { mood: best || "chill", n: bestN };
}

function pickQuoteLine(lyrics, mood) {
  const lines = String(lyrics || "").split("\n")
    .map(l => l.trim())
    .filter(l => l.length >= 24 && l.length <= 96 && !/^\[.*\]$/.test(l) && !/^(chorus|verse|intro|outro|hook|bridge)/i.test(l));
  if (!lines.length) return null;
  const words = MOOD_KEYWORDS[mood] || [];
  const hit = lines.find(l => words.some(w => l.toLowerCase().includes(w)));
  return hit || lines[Math.floor(lines.length / 2)];
}

async function fetchQuote(tracks) {
  if (!tracks || !tracks.length) return null;
  const scored = tracks.map(t => ({ t, s: trackMoodScore(t) }));
  scored.sort((a, b) => b.s.n - a.s.n);
  const dominant = scored[0].s.mood;
  const candidates = scored.filter(x => x.t.name.length <= 60).slice(0, 12);
  for (const { t } of candidates) {
    const artist = t.artist.split(/,| feat\.| ft\.| & /i)[0].trim();
    try {
      const data = await fetchJson(`${LYRICS_API}/${encodeURIComponent(artist)}/${encodeURIComponent(t.name)}`, {}, 7000);
      const line = pickQuoteLine(data.lyrics, dominant);
      if (line) return { text: line, song: t.name, artist: t.artist };
    } catch { /* try next track */ }
  }
  return null;
}

async function oembedName(id) {
  try {
    const data = await fetchJson(OEMBED + encodeURIComponent(`https://open.spotify.com/playlist/${id}`), {}, 6000);
    return data.title || null;
  } catch { return null; }
}

export async function analyze(body) {
  const id = parsePlaylistId(body && body.url);
  if (!id) return { ok: false, error: "not a spotify playlist url" };
  const playlist = { id, url: `https://open.spotify.com/playlist/${id}`, name: null };

  const token = await spotifyToken().catch(() => null);
  if (token) {
    try {
      const { name, tracks, stats } = await spotifyTracks(id, token);
      playlist.name = name;
      const quote = await fetchQuote(tracks).catch(() => null);
      return { ok: true, playlist, tracks, stats, quote, source: quote ? "spotify+lyrics" : "spotify" };
    } catch { /* fall through to demo */ }
  }

  playlist.name = await oembedName(id);
  return { ok: true, playlist, tracks: [], stats: null, quote: null, source: "demo" };
}

// Vercel serverless handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }
  try {
    const body = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
    const data = await analyze(body);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
