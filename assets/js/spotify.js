// client-side playlist reading for static hosting (no server keys needed):
// playlist name via Spotify oEmbed, track list scraped from the public playlist /
// embed pages through free CORS relays, and a real lyric line via keyless lyrics.ovh

import { MOOD_KEYWORDS } from "./mood.js";

const OEMBED = "https://open.spotify.com/oembed?url=";
const LYRICS = "https://api.lyrics.ovh/v1";
const RELAYS = [
  (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
];

async function fetchText(url, timeoutMs = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.text();
  } finally { clearTimeout(t); }
}

async function fetchJson(url, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } finally { clearTimeout(t); }
}

export async function clientAnalyze(parsed) {
  const playlist = { id: parsed.id, url: parsed.url, name: null };
  try {
    const j = await fetchJson(OEMBED + encodeURIComponent(parsed.url), 6000);
    playlist.name = j.title || null;
  } catch { /* name stays null */ }

  const pages = [
    parsed.url,
    `https://open.spotify.com/embed/playlist/${parsed.id}`,
  ];
  let tracks = [];
  outer: for (const page of pages) {
    for (const relay of RELAYS) {
      try {
        const html = await fetchText(relay(page), 14000);
        tracks = extractTracks(html);
        if (tracks.length) break outer;
      } catch { /* try next relay */ }
    }
  }

  let quote = null;
  if (tracks.length) quote = await clientQuote(tracks);

  return {
    ok: true,
    playlist,
    tracks,
    stats: null,
    quote,
    source: tracks.length ? (quote ? "client+lyrics" : "client") : "demo",
  };
}

export function extractTracks(html) {
  const seen = new Set();
  const out = [];
  const push = (o) => {
    if (o && typeof o.uri === "string" && o.uri.startsWith("spotify:track:") &&
        typeof o.name === "string" && o.name.length > 1 && o.name.length < 120 &&
        !seen.has(o.uri)) {
      seen.add(o.uri);
      const artist = Array.isArray(o.artists) && o.artists.length
        ? o.artists.map(a => a && a.name).filter(Boolean).join(", ")
        : "";
      out.push({ name: o.name, artist });
    }
  };
  // every embedded JSON blob ( __NEXT_DATA__ and friends )
  const scripts = html.matchAll(/<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/g);
  for (const m of scripts) {
    try {
      const data = JSON.parse(m[1]);
      (function walk(o) {
        if (!o || typeof o !== "object") return;
        if (Array.isArray(o)) { o.forEach(walk); return; }
        push(o);
        for (const k of Object.keys(o)) walk(o[k]);
      })(data);
    } catch { /* skip malformed blob */ }
  }
  if (!out.length) {
    // best-effort regex fallback on the raw markup
    const re = /"uri":"spotify:track:[A-Za-z0-9]{22}"[\s\S]{0,700}?"name":"((?:[^"\\]|\\.){2,100})"[\s\S]{0,700}?"artists":\[\{"uri":"spotify:artist:[A-Za-z0-9]{22}"[^}]*?"name":"((?:[^"\\]|\\.){1,80})"/g;
    let m;
    while ((m = re.exec(html)) && out.length < 60) {
      const uri = html.slice(m.index, m.index + 60).match(/spotify:track:([A-Za-z0-9]{22})/)[1];
      if (!seen.has(uri)) { seen.add(uri); out.push({ name: m[1], artist: m[2] }); }
    }
  }
  return out.slice(0, 60);
}

function trackMoodScore(t) {
  const txt = `${t.name} ${t.artist}`.toLowerCase();
  let bestN = 0;
  for (const words of Object.values(MOOD_KEYWORDS)) {
    let n = 0;
    for (const w of words) if (txt.includes(w)) n++;
    if (n > bestN) bestN = n;
  }
  return bestN;
}

function pickQuoteLine(lyrics) {
  const lines = String(lyrics || "").split("\n")
    .map(l => l.trim())
    .filter(l => l.length >= 24 && l.length <= 96 && !/^\[.*\]$/.test(l) && !/^(chorus|verse|intro|outro|hook|bridge|pre-chorus)/i.test(l));
  if (!lines.length) return null;
  return lines[Math.floor(lines.length / 2)];
}

async function clientQuote(tracks) {
  const scored = tracks
    .filter(t => t.name.length <= 60)
    .map(t => ({ t, s: trackMoodScore(t) }))
    .sort((a, b) => b.s - a.s);
  for (const { t } of scored.slice(0, 20)) {
    const artist = (t.artist.split(/,| feat\.| ft\.| & /i)[0] || "").trim();
    if (!artist) continue;
    try {
      const data = await fetchJson(`${LYRICS}/${encodeURIComponent(artist)}/${encodeURIComponent(t.name)}`, 6000);
      const line = pickQuoteLine(data.lyrics);
      if (line) return { text: line, song: t.name, artist: t.artist };
    } catch { /* try the next song */ }
  }
  return null;
}
