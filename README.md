# unravelled

Paste a public Spotify playlist link, pull the thread, and watch the music unravel into a scenery, three words, a character, a film, and a few words about you.

Zero-dependency vanilla project. No build step. Node 18+.

## Run locally

```bash
cp .env.example .env   # fill in keys (optional, demo mode works without them)
npm start              # serves http://127.0.0.1:3000 (loopback only)
```

## Keys (optional)

- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` — Spotify dev app, client-credentials flow, no user login. Reads playlist name + track/artist names only.
- `MISTRAL_API_KEY` — console.mistral.ai. `MISTRAL_MODEL` optional (default `mistral-small-latest`). The model judges the mood purely from track and artist names and answers JSON only.

Without keys (or if any call fails) the site falls back to a built-in demo reading, localized in EN/RU/BE/FR, so it always works.

## Deploy

Vercel (free): import this repo, add the env vars, deploy. `api/vibe.js` is the serverless function; static files are served from the root. Friends just open the URL, no login.

## Structure

- `index.html` — landing, loading (yarn ball), thread (cards) screens
- `assets/js/app.js` — flow and animations
- `assets/js/scenes.js` — 16 scene families x 8 palettes, seeded SVG renderer (800x500)
- `assets/js/i18n.js` — EN/RU/BE/FR strings
- `assets/css/style.css` — deep green theme
- `api/vibe.js` — engine (Spotify + Mistral + demo fallback), also the Vercel function
- `server.js` — zero-dep dev server, binds 127.0.0.1 only
