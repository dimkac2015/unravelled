# unravelled

Paste a public Spotify playlist link, press **unravel**, and pull the thread through four pages — a scenery with a lyric line from your playlist, the era it belongs to, the character who owns it (drawn in the flat style of *This Is The Police*), and the film with that soundtrack. The yarn ball stays in the corner and shrinks with every page until only a pile of thread is left and the cats walk away.

Zero-dependency vanilla project. No build step. Node 18+. Works on phones and computers.

## Run locally

```bash
cp .env.example .env   # optional — demo mode works without keys
npm start              # serves http://127.0.0.1:3000 (loopback only)
```

## Keys (optional)

- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — Spotify dev app, client-credentials flow, no user login. With these the site reads the real track list + audio features (energy, valence, tempo…) and picks a lyric line from an actual song in the playlist via the keyless [lyrics.ovh](https://lyrics.ovh) API.
- Without keys (or on failure, or on static hosting like GitHub Pages) the site falls back to a deterministic demo reading derived from the playlist URL, so it always works.

## Deploy

Vercel (free): import this repo, optionally add the env vars, deploy. `api/vibe.js` is the serverless function (`POST /api/analyze`); static files are served from the root. Friends just open the URL, no login.

## Structure

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
