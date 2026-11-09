// mood analysis + the banks the reading is drawn from

import { makeRng } from "./rng.js";

export function parseSpotifyUrl(input) {
  const s = String(input || "").trim();
  let m = s.match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  if (m) return { id: m[1], url: `https://open.spotify.com/playlist/${m[1]}` };
  m = s.match(/spotify:playlist:([A-Za-z0-9]+)/);
  if (m) return { id: m[1], url: `https://open.spotify.com/playlist/${m[1]}` };
  return null;
}

export const MOOD_KEYWORDS = {
  aggressive: ["metal", "screamo", "hardcore", "thrash", "death metal", "black metal", "punk", "rage", "fight", "kill", "war", "heavy", "scream", "breakdown", "enemy", "burn", "riot", "venom", "doom"],
  dark: ["dark", "night", "midnight", "black", "shadow", "ghost", "death", "die", "alone", "rain", "storm", "witch", "demon", "hell", "goth", "halloween", "haunted", "abyss", "void", "bury"],
  sunny: ["sun", "summer", "happy", "dance", "party", "joy", "smile", "golden", "beach", "shine", "love", "sweet", "fun", "upbeat", "disco", "holiday", "sunshine", "la la", "hello", "good vibes"],
  lush: ["orchestra", "orchestral", "symphony", "choir", "strings", "brass", "ensemble", "concerto", "philharmonic", "chamber", "anthem", "epic", "cinematic", "deluxe", "live", "session", "grand", "waltz"],
  chill: ["chill", "lo-fi", "lofi", "acoustic", "slow", "calm", "relax", "ambient", "sleep", "study", "coffee", "bedroom", "mellow", "breeze", "ballad", "acoustic", "rainy day", "sunday"],
  melancholic: ["sad", "lonely", "goodbye", "cry", "tears", "blue", "miss you", "homesick", "empty", "winter", "goodbye", "last", "alone", "fading", "grey", "sorry"],
};

const MOODS = Object.keys(MOOD_KEYWORDS);

function countHits(text, words) {
  let n = 0;
  for (const w of words) if (text.includes(w)) n++;
  return n;
}

export function moodFromTracks(tracks, stats) {
  const scores = Object.fromEntries(MOODS.map(m => [m, 0]));
  const texts = tracks.map(t => `${t.name} ${t.artist}`.toLowerCase());
  for (const txt of texts) {
    for (const m of MOODS) scores[m] += countHits(txt, MOOD_KEYWORDS[m]);
  }
  const total = texts.length || 1;
  for (const m of MOODS) scores[m] /= Math.sqrt(total);
  if (stats) {
    if (stats.energy > 0.72) { scores.aggressive += 1.4; scores.sunny += 0.5; }
    if (stats.energy < 0.35) { scores.chill += 1.1; scores.melancholic += 0.6; }
    if (stats.valence > 0.68) scores.sunny += 1.6;
    if (stats.valence < 0.34) { scores.melancholic += 1.0; scores.dark += 0.9; }
    if (stats.tempo > 145) { scores.sunny += 0.7; scores.aggressive += 0.7; }
    if (stats.tempo < 85) { scores.chill += 0.8; scores.melancholic += 0.5; }
    if (stats.acousticness > 0.55) { scores.lush += 0.9; scores.chill += 0.8; }
    if (stats.danceability > 0.7) scores.sunny += 0.9;
  }
  return scores;
}

export function dominantMood(scores, rng) {
  let best = "chill", bestV = -1;
  for (const m of MOODS) {
    const v = scores[m] + rng.next() * 0.35; // break ties with seeded randomness
    if (v > bestV) { bestV = v; best = m; }
  }
  return best;
}

/* ---------- palettes per mood ---------- */
export const PALETTES = {
  aggressive: [
    { sky: ["#1a1214", "#3d1410"], sun: "#e0492f", sunGlow: "#7a1d12", land: "#241a16", land2: "#171010", water: "#2b1a18", accent: "#ff6b3d", ink: "#f4efe3", name: "ember" },
    { sky: ["#0d0d12", "#26202e"], sun: "#c22f2f", sunGlow: "#571622", land: "#191521", land2: "#100d16", water: "#1c1a26", accent: "#ff8c42", ink: "#f4efe3", name: "ash" },
  ],
  dark: [
    { sky: ["#070b1d", "#141c3a"], sun: "#e8e4d0", sunGlow: "#3a4470", land: "#0c1226", land2: "#080d1d", water: "#0e1830", accent: "#8fa3ff", ink: "#e8e4d8", name: "night" },
    { sky: ["#0a0f14", "#1d2b30"], sun: "#cfd8c9", sunGlow: "#2e4438", land: "#0b1210", land2: "#070c0a", water: "#0d1a17", accent: "#9fd8b4", ink: "#dfe8d8", name: "moss-night" },
  ],
  sunny: [
    { sky: ["#8ec9e8", "#d9ecf2"], sun: "#ffd76a", sunGlow: "#f4b942", land: "#7fb069", land2: "#5d8f4e", water: "#4aa3c7", accent: "#ff8c42", ink: "#173a2c", name: "summer" },
    { sky: ["#f7d9a0", "#f2ead0"], sun: "#ffb347", sunGlow: "#e08e3c", land: "#c98f4e", land2: "#a96f38", water: "#7fb6a4", accent: "#e2603f", ink: "#4a2f1d", name: "golden-hour" },
  ],
  lush: [
    { sky: ["#1d4a34", "#3f7a52"], sun: "#f2d98c", sunGlow: "#c9a84c", land: "#1e4630", land2: "#143322", water: "#2c5f4a", accent: "#ffd76a", ink: "#f2ecd8", name: "canopy" },
    { sky: ["#233a5c", "#4a6a8a"], sun: "#f5e6c4", sunGlow: "#b09a5c", land: "#274432", land2: "#1a2f24", water: "#2e4a63", accent: "#e8c37a", ink: "#eef0e4", name: "velvet" },
  ],
  chill: [
    { sky: ["#aebfc9", "#dde6e9"], sun: "#f4f1e6", sunGlow: "#c9c4ae", land: "#7d94a0", land2: "#5f7683", water: "#8fb0bd", accent: "#e8e3d3", ink: "#2c3a42", name: "mist" },
    { sky: ["#c9d6c5", "#e9efe0"], sun: "#fdf6dd", sunGlow: "#d6cba4", land: "#8aa27b", land2: "#6d855f", water: "#9db8a6", accent: "#f2e3b3", ink: "#33402c", name: "meadow-morning" },
  ],
  melancholic: [
    { sky: ["#5a6b8c", "#93a3bd"], sun: "#e8e2d2", sunGlow: "#8d94a8", land: "#3d4a63", land2: "#2c3749", water: "#46587a", accent: "#c7cede", ink: "#eef0f5", name: "slate" },
    { sky: ["#6b6a7a", "#a39aa8"], sun: "#e5d9c9", sunGlow: "#9a8f96", land: "#484554", land2: "#363344", water: "#525064", accent: "#d8c9b8", ink: "#f0ebe0", name: "twilight" },
  ],
};

/* ---------- eras ---------- */
export const ERAS = [
  { name: "Victorian autumn", icon: "leaf", mood: ["melancholic", "lush"], feel: "fog on the cobblestones, a letter half-written, tea gone cold — beautiful and a little sad." },
  { name: "Gold Rush summer", icon: "pick", mood: ["sunny", "aggressive"], feel: "dust, ambition and banjo strings — everything gleams and everyone is chasing something." },
  { name: "Futuristic winter", icon: "rocket", mood: ["dark", "chill"], feel: "neon snow, silent stations, the hum of a ship that never lands." },
  { name: "Jazz Age Paris", icon: "sax", mood: ["lush", "sunny"], feel: "smokycafés, saxophones at 3 a.m., everyone pretending not to be in love." },
  { name: "Regency ballroom", icon: "crown", mood: ["lush", "melancholic"], feel: "candlelight, string quartets and glances across crowded rooms." },
  { name: "1970s California", icon: "vinyl", mood: ["sunny", "chill"], feel: "vinyl crackle, open windows, long drives with the radio turned up." },
  { name: "Art Deco New York", icon: "skyline", mood: ["dark", "lush"], feel: "chrome towers, cocktails, and secrets told fast in slow elevators." },
  { name: "Wild West dusk", icon: "cactus", mood: ["aggressive", "chill"], feel: "red canyon light, harmonicas, and a piano that only plays in one dusty saloon." },
  { name: "Medieval mist", icon: "castle", mood: ["dark", "melancholic"], feel: "torches on stone walls, minstrels, and a quest nobody remembers starting." },
  { name: "Renaissance Venice", icon: "mask", mood: ["lush", "sunny"], feel: "gondolas, masks, mandolins — a carnival that never quite ends." },
  { name: "Cyberpunk night rain", icon: "neon", mood: ["dark", "aggressive"], feel: "rain on neon, synth bass through the walls, a city that never sleeps because it can't." },
  { name: "Cottagecore spring", icon: "flower", mood: ["chill", "sunny"], feel: "bread in the oven, bees in the clover, letters to friends you haven't met yet." },
];

/* ---------- characters (drawn This-Is-The-Police style) ---------- */
export const CHARACTERS = [
  { name: "Wednesday Addams", mood: ["dark", "melancholic"], line: "owns it on a rainy Tuesday, alone, perfectly on purpose.", style: { skin: "#e8dcc8", hair: "#1c1a1a", hairStyle: "braids", hat: "none", glasses: false, bg: "#2b2b3a", shirt: "#3a3a4a" } },
  { name: "Amélie Poulain", mood: ["sunny", "melancholic"], line: "collects small joys and red frames; hums while the city sleeps.", style: { skin: "#f0d9be", hair: "#3a2417", hairStyle: "bob", hat: "none", glasses: false, bg: "#c94f3d", shirt: "#e8b64c" } },
  { name: "Lisbeth Salander", mood: ["dark", "aggressive"], line: "hacks at 4 a.m. and rides a motorcycle through the rain.", style: { skin: "#e6d3c0", hair: "#c22f5a", hairStyle: "mohawk", hat: "none", glasses: true, bg: "#1a1a22", shirt: "#26262e" } },
  { name: "The Dude", mood: ["chill", "sunny"], line: "abides. bowls on Sundays, drinks White Russians, minds his own business.", style: { skin: "#e8c9a0", hair: "#8a6a42", hairStyle: "long", hat: "bucket", glasses: true, bg: "#7a5c3a", shirt: "#a3866a" } },
  { name: "Mia (La La Land)", mood: ["sunny", "melancholic"], line: "auditions all day, jazz at the club at night, dreams in Technicolor.", style: { skin: "#eed3b8", hair: "#5a3a22", hairStyle: "bun", hat: "none", glasses: false, bg: "#4a6fa5", shirt: "#e8d34c" } },
  { name: "Eleven", mood: ["dark", "aggressive"], line: "doesn't say much. the playlist says everything.", style: { skin: "#f0dcc8", hair: "#d8b98a", hairStyle: "buzz", hat: "hood", glasses: false, bg: "#20303a", shirt: "#5a7a8a" } },
  { name: "Forrest Gump", mood: ["sunny", "chill"], line: "sits on a bench with chocolates and a story for everyone.", style: { skin: "#eac39a", hair: "#c9a86a", hairStyle: "flat", hat: "cap", glasses: false, bg: "#6a8a4a", shirt: "#d8d2c0" } },
  { name: "Napoleon Dynamite", mood: ["chill", "melancholic"], line: "rides his bike, draws ligers, keeps the playlist to himself — mostly.", style: { skin: "#f0d0ac", hair: "#6a4a2a", hairStyle: "curly", hat: "cap", glasses: true, bg: "#c98a3a", shirt: "#e8e0c8" } },
  { name: "Paddington Bear", mood: ["lush", "sunny"], line: "marmalade sandwiches, a red hat, and manners that disarm everyone.", style: { skin: "#b07a4a", hair: "#8a5a30", hairStyle: "ears", hat: "redhat", glasses: false, bg: "#3a6ea5", shirt: "#c23b2e" } },
  { name: "Walter Mitty", mood: ["lush", "sunny"], line: "daydreams in the office, then actually goes and does the thing.", style: { skin: "#e8c8a4", hair: "#4a3826", hairStyle: "sidepart", hat: "beanie", glasses: true, bg: "#2e7d6a", shirt: "#d8d2c4" } },
  { name: "Ron Swanson", mood: ["melancholic", "aggressive"], line: "would never admit the playlist exists. it exists anyway.", style: { skin: "#e0b48a", hair: "#5a4632", hairStyle: "mustache", hat: "none", glasses: false, bg: "#4a3a2a", shirt: "#6a5a3a" } },
  { name: "Chihiro (Spirited Away)", mood: ["lush", "dark"], line: "brave in a spirit world, stubborn about the things that matter.", style: { skin: "#f2d8b8", hair: "#2a1c12", hairStyle: "ponytail", hat: "ribbon", glasses: false, bg: "#3a5a4a", shirt: "#e8e0d0" } },
];

/* ---------- films (existing movies) ---------- */
export const FILMS = [
  { name: "Amélie (2001)", mood: ["sunny", "melancholic"], line: "a Paris of accordions, red and green, and small kindnesses.", poster: "paris" },
  { name: "La La Land (2016)", mood: ["sunny", "lush"], line: "sunset jazz and city lights — love and ambition in the same key.", poster: "lalaland" },
  { name: "Into the Wild (2007)", mood: ["chill", "melancholic"], line: "open road, ukulele, and the wilderness calling louder than people.", poster: "road" },
  { name: "The Grand Budapest Hotel (2014)", mood: ["lush", "sunny"], line: "pink facades, fast dialogue, and a soundtrack that marches.", poster: "hotel" },
  { name: "Drive (2011)", mood: ["dark", "aggressive"], line: "night drives, synth waves, neon — cool until it isn't.", poster: "drive" },
  { name: "500 Days of Summer (2009)", mood: ["melancholic", "sunny"], line: "a love story told out of order, with a mixtape in the middle.", poster: "summer" },
  { name: "Spirited Away (2001)", mood: ["lush", "dark"], line: "a spirit world with strings and steam trains.", poster: "ghibli" },
  { name: "Forrest Gump (1994)", mood: ["sunny", "chill"], line: "a life like a box of chocolates, scored warm and unhurried.", poster: "bench" },
  { name: "The Secret Life of Walter Mitty (2013)", mood: ["lush", "sunny"], line: "one playlist for the daydream and another for the jump.", poster: "mountain" },
  { name: "Interstellar (2014)", mood: ["dark", "lush"], line: "organ music in a space station — awe with a heartbeat.", poster: "space" },
  { name: "Pulp Fiction (1994)", mood: ["aggressive", "chill"], line: "surf rock and crime dialogue, cool in every sense.", poster: "diner" },
  { name: "Guardians of the Galaxy (2014)", mood: ["sunny", "aggressive"], line: "mixtapes on a spaceship — the soundtrack IS the hero.", poster: "space" },
];

/* ---------- fallback quotes per mood (used when lyrics can't be fetched) ---------- */
export const QUOTES = {
  aggressive: [
    { text: "I am the fire that burns against the cold.", song: "Fire", artist: "mood fallback" },
    { text: "We are the storm that the sky forgot.", song: "Storm", artist: "mood fallback" },
  ],
  dark: [
    { text: "The night is long and full of songs.", song: "Night Song", artist: "mood fallback" },
    { text: "We walk alone through the dark we made.", song: "Alone", artist: "mood fallback" },
  ],
  sunny: [
    { text: "Here comes the sun, and I say it's all right.", song: "Here Comes the Sun", artist: "mood fallback" },
    { text: "Dancing in the moonlight, everybody's feeling warm and bright.", song: "Dancing in the Moonlight", artist: "mood fallback" },
  ],
  lush: [
    { text: "And in the end, the love you take is equal to the love you make.", song: "The End", artist: "mood fallback" },
    { text: "We all shine on, like the moon and the stars.", song: "Shine On", artist: "mood fallback" },
  ],
  chill: [
    { text: "Slow down, you move too fast.", song: "Slow Down", artist: "mood fallback" },
    { text: "Come as you are, as you were.", song: "Come As You Are", artist: "mood fallback" },
  ],
  melancholic: [
    { text: "Yesterday, all my troubles seemed so far away.", song: "Yesterday", artist: "mood fallback" },
    { text: "Hello darkness, my old friend.", song: "The Sound of Silence", artist: "mood fallback" },
  ],
};

/* ---------- assemble the full reading ---------- */
export function buildReading(seedStr, api) {
  const rng = makeRng(seedStr);
  const tracks = api && api.tracks && api.tracks.length ? api.tracks : null;
  const scores = tracks ? moodFromTracks(tracks, api.stats || null) : demoScores(rng);
  const mood = dominantMood(scores, rng);
  const palette = rng.pick(PALETTES[mood]);

  const eras = rng.shuffle(ERAS.filter(e => e.mood.includes(mood)));
  const era = eras.length ? eras[0] : rng.pick(ERAS);

  const chars = rng.shuffle(CHARACTERS.filter(c => c.mood.includes(mood)));
  const character = chars.length ? chars[0] : rng.pick(CHARACTERS);

  const films = rng.shuffle(FILMS.filter(f => f.mood.includes(mood)));
  const film = films.length ? films[0] : rng.pick(FILMS);

  let quote = api && api.quote ? api.quote : rng.pick(QUOTES[mood]);

  return {
    seed: seedStr,
    mood,
    scores,
    palette,
    era,
    character,
    film,
    quote,
    playlist: api && api.playlist ? api.playlist : { id: null, name: null },
    source: api && api.source ? api.source : "demo",
  };
}

function demoScores(rng) {
  const base = Object.fromEntries(MOODS.map(m => [m, rng.next() * 0.8]));
  base[rng.pick(MOODS)] += 2.2; // one clear dominant mood
  return base;
}
