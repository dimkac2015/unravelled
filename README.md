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

`GET /api/quote?artist=&title=` returns one short line (max 12 words) from the keyless lyrics.ovh API. The frontend tries the 3 quote candidates in order; if none works it shows just song title + artist. Lyrics are never invented.

## Secrets

Only `MISTRAL_API_KEY` in `.env` (server-side only, git-ignored). No Spotify credentials, no OAuth.
