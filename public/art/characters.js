// Character & movie art in the style of "This Is the Police" (Stage 3/4):
// flat 2D vector, noir chiaroscuro — no thin outlines, shapes defined by hard-edged
// shadows, angular geometric faces with minimal features, long hard shadows, dark base
// colours with ONE warm accent, figure partly in shadow, simple dark background with
// one light source. Reusable parts parametrised by archetype.

import { PALETTES } from "./scenes.js";

export const ARCHETYPES = [
  "detective", "wanderer", "rebel", "dreamer", "soldier", "witch",
  "clown", "scientist", "cowboy", "noble",
];

function rngFor(seed) {
  let a = 2166136261 >>> 0;
  for (const c of String(seed)) { a ^= c.charCodeAt(0); a = Math.imul(a, 16777619); }
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* archetype → hat / headgear / prop, drawn around head top (head spans x 150-250, top y≈178) */
function headgear(arch, p) {
  const d = p.dark, a = p.accent, h = p.highlight, m = p.mid;
  switch (arch) {
    case "detective": return `<rect x="138" y="168" width="124" height="12" rx="6" fill="${d}"/><rect x="164" y="122" width="72" height="50" rx="6" fill="${d}"/><rect x="164" y="160" width="72" height="10" fill="${a}"/>`;
    case "cowboy": return `<ellipse cx="200" cy="176" rx="86" ry="12" fill="${d}"/><path d="M 168 174 L 176 122 L 224 122 L 232 174 Z" fill="${d}"/><path d="M 176 150 L 224 150" stroke="${a}" stroke-width="7"/>`;
    case "witch": return `<path d="M 200 52 L 146 180 L 254 180 Z" fill="${d}"/><ellipse cx="200" cy="180" rx="72" ry="10" fill="${d}"/><path d="M 160 168 L 240 168" stroke="${a}" stroke-width="7"/>`;
    case "soldier": return `<path d="M 158 176 L 162 132 L 238 132 L 242 176 Z" fill="${d}"/><rect x="146" y="172" width="108" height="10" rx="5" fill="${d}"/><circle cx="200" cy="146" r="7" fill="${a}"/>`;
    case "rebel": return `<path d="M 150 206 Q 200 184 250 206 L 250 222 Q 200 202 150 222 Z" fill="${a}"/>`;
    case "clown": return `<path d="M 200 118 L 214 168 L 186 168 Z" fill="${a}"/><circle cx="200" cy="116" r="8" fill="${h}"/>`;
    case "scientist": return `<circle cx="182" cy="196" r="13" fill="none" stroke="${h}" stroke-width="5"/><circle cx="218" cy="196" r="13" fill="none" stroke="${h}" stroke-width="5"/><line x1="195" y1="196" x2="205" y2="196" stroke="${h}" stroke-width="5"/><path d="M 156 178 Q 200 150 244 178 L 244 168 Q 200 140 156 168 Z" fill="${d}"/>`;
    case "noble": return `<path d="M 162 172 L 162 138 L 181 154 L 200 128 L 219 154 L 238 138 L 238 172 Z" fill="${a}"/>`;
    case "wanderer": return `<path d="M 200 118 Q 136 152 148 252 L 166 252 Q 156 176 200 158 Q 244 176 234 252 L 252 252 Q 264 152 200 118 Z" fill="${d}"/>`;
    case "dreamer": return `<path d="M 152 190 Q 148 140 200 132 Q 252 140 248 190 Q 244 158 200 152 Q 156 158 152 190 Z" fill="${d}"/>`;
    default: return "";
  }
}

export function renderCharacter(character, palette) {
  const p = palette || PALETTES.midnight_blue;
  const arch = ARCHETYPES.includes(character.archetype) ? character.archetype : "wanderer";
  const rng = rngFor((character.name || "x") + arch);
  const d = p.dark, m = p.mid, l = p.light, a = p.accent, h = p.highlight;
  const lean = (rng() - 0.5) * 14;

  // angular head, lit from the left: left plane light, right plane in hard shadow
  const head = `
    <polygon points="158,186 242,186 252,262 200,304 148,262" fill="${l}"/>
    <polygon points="200,186 242,186 252,262 200,304" fill="${d}"/>
    <polygon points="200,238 208,262 192,262" fill="${m}"/>
    <rect x="172" y="232" width="16" height="5" fill="${d}"/>
    <rect x="212" y="232" width="16" height="5" fill="${d}" opacity="0.85"/>
    <rect x="186" y="282" width="28" height="5" fill="${d}"/>`;

  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${character.name || "character"}">
    <rect width="400" height="500" fill="${d}"/>
    <polygon points="0,0 250,0 40,500 0,500" fill="${h}" opacity="0.07"/>
    <rect x="24" y="30" width="120" height="150" fill="${h}" opacity="0.10"/>
    <polygon points="120,500 400,500 400,408 236,462" fill="${d}" opacity="0.9"/>
    <g transform="translate(${lean},0)">
      <path d="M 104 500 L 104 408 Q 104 344 200 344 Q 296 344 296 408 L 296 500 Z" fill="${m}"/>
      <path d="M 200 344 L 168 500 L 200 500 Z" fill="${d}"/>
      <path d="M 200 344 L 232 500 L 200 500 Z" fill="${d}" opacity="0.7"/>
      <rect x="184" y="316" width="32" height="34" fill="${l}"/>
      <polygon points="184,316 216,316 200,344" fill="${d}"/>
      ${head}
      ${headgear(arch, p)}
      <polyline points="150,262 148,300 200,344 104,408" fill="none" stroke="${a}" stroke-width="4" opacity="0.9"/>
    </g>
  </svg>`;
}

/* ---------------- movie poster, same noir style (Stage 4) ---------------- */

const MOTIFS = ["building", "car", "mountain", "ship", "planet", "tree"];

function motif(name, p, rng) {
  const d = p.dark, m = p.mid, l = p.light, a = p.accent, h = p.highlight;
  switch (name) {
    case "building": return `<rect x="120" y="120" width="160" height="300" fill="${m}"/>
      ${[150, 190, 230, 270, 310, 350].map(y => `<rect x="142" y="${y}" width="26" height="24" fill="${a}" opacity="0.85"/><rect x="232" y="${y}" width="26" height="24" fill="${h}" opacity="0.25"/>`).join("")}
      <rect x="100" y="404" width="200" height="16" fill="${d}"/>`;
    case "car": return `<g fill="${m}"><path d="M 60 340 L 100 290 L 260 275 L 330 320 L 345 355 L 60 355 Z"/>
      <path d="M 120 292 L 160 268 L 240 262 L 285 305 L 120 305 Z" fill="${h}" opacity="0.35"/>
      <circle cx="130" cy="358" r="24" fill="${d}"/><circle cx="130" cy="358" r="10" fill="${h}" opacity="0.4"/>
      <circle cx="280" cy="358" r="24" fill="${d}"/><circle cx="280" cy="358" r="10" fill="${h}" opacity="0.4"/></g>
      <rect x="330" y="330" width="26" height="12" fill="${a}"/>`;
    case "mountain": return `<path d="M 40 420 L 190 170 L 280 320 L 330 250 L 380 420 Z" fill="${m}"/>
      <path d="M 190 170 L 158 220 L 222 220 Z" fill="${h}"/>
      <circle cx="310" cy="120" r="34" fill="${a}"/>`;
    case "ship": return `<g><path d="M 60 380 L 340 380 L 305 420 L 95 420 Z" fill="${m}"/>
      <line x1="200" y1="380" x2="200" y2="180" stroke="${l}" stroke-width="8"/>
      <path d="M 206 186 Q 290 240 206 360 Z" fill="${h}"/>
      <path d="M 194 200 Q 120 250 194 350 Z" fill="${l}"/>
      <path d="M 40 440 Q 200 420 360 440" stroke="${a}" stroke-width="6" fill="none"/></g>`;
    case "planet": return `<circle cx="200" cy="280" r="90" fill="${m}"/>
      <path d="M 130 250 Q 200 220 270 255 Q 200 285 130 250 Z" fill="${l}" opacity="0.7"/>
      <ellipse cx="200" cy="280" rx="160" ry="34" fill="none" stroke="${a}" stroke-width="12" transform="rotate(-14 200 280)"/>`;
    case "tree": return `<g fill="${m}"><rect x="188" y="300" width="24" height="120"/><circle cx="200" cy="240" r="90"/><circle cx="140" cy="280" r="50"/><circle cx="262" cy="282" r="46"/></g>
      <circle cx="150" cy="220" r="10" fill="${a}"/><circle cx="240" cy="260" r="8" fill="${a}"/>`;
    default: return motif("mountain", p, rng);
  }
}

export function renderMovie(movie, palette) {
  const p = palette || PALETTES.midnight_blue;
  const rng = rngFor(String(movie.title || "film"));
  const m = MOTIFS[Math.floor(rng() * MOTIFS.length)];
  const title = String(movie.title || "Untitled").toUpperCase();
  const year = movie.year || "";
  return `<svg viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${movie.title || "movie"} poster">
    <rect width="400" height="560" fill="${p.dark}"/>
    <polygon points="0,0 260,0 60,560 0,560" fill="${p.highlight}" opacity="0.08"/>
    <rect x="30" y="36" width="110" height="130" fill="${p.highlight}" opacity="0.10"/>
    <polygon points="110,560 400,560 400,470 240,520" fill="${p.dark}" opacity="0.9"/>
    ${motif(m, p, rng)}
    <rect x="0" y="470" width="400" height="90" fill="${p.dark}"/>
    <text x="200" y="512" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${title.length > 18 ? 19 : 24}" fill="${p.highlight}" letter-spacing="1.5">${title}</text>
    <text x="200" y="544" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="${p.accent}" letter-spacing="3">${year}</text>
  </svg>`;
}
