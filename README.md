# Unravelled

Paste a link to a public Spotify playlist, pull the thread, and watch it unravel into a short story: a scenery, an era, a character, a movie, and a finale with the cats.

## Stack

Node.js + Express backend, plain HTML/CSS/JS frontend. No framework, no build step.

```
server.js               Express server: /api/playlist, /api/analyze, /api/quote
public/index.html       app shell (header / stage / controls / dock)
public/style.css        deep-green theme, anti-overlap grid
public/app.js            flow, CONFIG (durations, cat names), dock ball + thread
public/art/scenes.js    scene ids, palettes, scene renderer
public/art/characters.js archetypes, character + movie renderer
public/art/cats.js      the five cats
```

## Run

```bash
cp .env.example .env   # optional: add MISTRAL_API_KEY for the AI analysis
npm install
npm start              # http://127.0.0.1:3000 (loopback only)
```

## How it reads playlists (no Spotify keys)

`POST /api/playlist` fetches `https://open.spotify.com/embed/playlist/{id}` with a normal browser User-Agent, parses the JSON inside `<script id="__NEXT_DATA__">`, and recursively collects every object with a track title and artist names. If that fails or returns fewer than 5 tracks, the front page offers a textarea to paste tracks manually ("Artist – Title" per line), plus three built-in demo playlists.

`POST /api/analyze` sends the tracks to the Mistral API (`mistral-large-latest`, JSON mode) and returns a strict JSON reading (energy/valence/darkness/aggression, tempo, scene, palette, era, character, movie, quote candidates, summary). Without `MISTRAL_API_KEY` it returns a local keyword-based analysis and the UI shows a "demo mode" note.

<<<<<<< HEAD
`GET /api/quote?artist=&title=` returns one short line (max 12 words) from the keyless lyrics.ovh API. The frontend tries the 3 quote candidates in order; if none works it shows just song title + artist. Lyrics are never invented.

## Secrets

Only `MISTRAL_API_KEY` in `.env` (server-side only, git-ignored). No Spotify credentials, no OAuth.
=======
- `index.html` — landing + journey panels + finale
- `assets/css/style.css` — deep green theme, responsive, ball-shrink & cat animations
- `assets/js/app.js` — flow: tap-the-ball unravel animation, analysis, render panels, step tracking
- `assets/js/spotify.js` — client-side reading on static hosting: playlist name via oEmbed, track list from the public playlist page, real lyric via lyrics.ovh
- `assets/js/mood.js` — mood analysis (tempo/aggressive/dark/sunny/lush…), palettes, era/character/film/quote banks
- `assets/js/scenes.js` — 12 seeded SVG scenery families (ship, river, forest, desert, mountains, volcano…) × mood palettes
- `assets/js/portraits.js` — This-Is-The-Police-style SVG portraits, film posters, era icons
- `assets/js/yarn.js` — yarn ball, thread pile, cats
- `assets/js/rng.js` — seeded RNG (same playlist → same reading)
- `api/vibe.js` — analysis engine (Spotify + lyrics.ovh + demo fallback), also the Vercel function
- `server.js` — zero-dep dev server, binds 127.0.0.1 only
>>>>>>> origin/vibe/unravelled-rebuild-ed694c
