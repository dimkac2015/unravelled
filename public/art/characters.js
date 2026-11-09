// Character & movie art. Characters are drawn in the style of the video game
// "This Is the Police" (the original brief): flat 2D vector, big rounded head,
// simple dot eyes and nose, muted flat colours, hat/clothes per archetype,
// soft shade on one side (no noir split-face). Movie posters: poster-style flat scene.

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

function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * f));
  const b = Math.min(255, Math.round((n & 255) * f));
  return `rgb(${r},${g},${b})`;
}

/* archetype → hat, anchored to the head (cx, top, rx) */
function hat(arch, cx, top, rx, hair, accent, hi) {
  switch (arch) {
    case "detective": return `<rect x="${cx - rx - 10}" y="${top + 6}" width="${(rx + 10) * 2}" height="13" rx="6" fill="${hair}"/><path d="M ${cx - 34} ${top + 8} L ${cx - 28} ${top - 44} L ${cx + 28} ${top - 44} L ${cx + 34} ${top + 8} Z" fill="${hair}"/><rect x="${cx - 30}" y="${top - 6}" width="60" height="9" fill="${accent}"/>`;
    case "cowboy": return `<ellipse cx="${cx}" cy="${top + 10}" rx="${rx + 24}" ry="11" fill="${hair}"/><path d="M ${cx - 30} ${top + 8} Q ${cx - 26} ${top - 34} ${cx} ${top - 36} Q ${cx + 26} ${top - 34} ${cx + 30} ${top + 8} Z" fill="${hair}"/><path d="M ${cx - 26} ${top - 12} L ${cx + 26} ${top - 12}" stroke="${accent}" stroke-width="7"/>`;
    case "witch": return `<path d="M ${cx} ${top - 96} Q ${cx + 8} ${top - 30} ${cx + rx + 4} ${top + 10} L ${cx - rx - 4} ${top + 10} Q ${cx - 8} ${top - 30} ${cx} ${top - 96} Z" fill="${hair}"/><ellipse cx="${cx}" cy="${top + 10}" rx="${rx + 12}" ry="9" fill="${hair}"/><path d="M ${cx - rx + 10} ${top - 2} L ${cx + rx - 10} ${top - 2}" stroke="${accent}" stroke-width="7"/>`;
    case "soldier": return `<path d="M ${cx - rx + 4} ${top + 10} L ${cx - rx + 10} ${top - 30} L ${cx + rx - 10} ${top - 30} L ${cx + rx - 4} ${top + 10} Z" fill="${hair}"/><rect x="${cx - rx - 8}" y="${top + 6}" width="${(rx + 8) * 2}" height="9" rx="4" fill="${hair}"/><circle cx="${cx}" cy="${top - 16}" r="6" fill="${accent}"/>`;
    case "rebel": return `<path d="M ${cx - rx - 2} ${top + 26} Q ${cx} ${top - 6} ${cx + rx + 2} ${top + 26} L ${cx + rx + 2} ${top + 40} Q ${cx} ${top + 12} ${cx - rx - 2} ${top + 40} Z" fill="${accent}"/>`;
    case "clown": return `<path d="M ${cx} ${top - 48} L ${cx + 13} ${top + 2} L ${cx - 13} ${top + 2} Z" fill="${accent}"/><circle cx="${cx}" cy="${top - 50}" r="7" fill="${hi}"/>`;
    case "scientist": return `<path d="M ${cx - rx} ${top + 14} Q ${cx} ${top - 14} ${cx + rx} ${top + 14} L ${cx + rx} ${top + 26} Q ${cx} ${top} ${cx - rx} ${top + 26} Z" fill="${hair}"/><circle cx="${cx - 17}" cy="${top + 34}" r="12" fill="none" stroke="${hi}" stroke-width="5"/><circle cx="${cx + 17}" cy="${top + 34}" r="12" fill="none" stroke="${hi}" stroke-width="5"/><line x1="${cx - 5}" y1="${top + 34}" x2="${cx + 5}" y2="${top + 34}" stroke="${hi}" stroke-width="5"/>`;
    case "noble": return `<path d="M ${cx - rx + 6} ${top + 12} L ${cx - rx + 6} ${top - 18} L ${cx - rx / 2} ${top} L ${cx} ${top - 28} L ${cx + rx / 2} ${top} L ${cx + rx - 6} ${top - 18} L ${cx + rx - 6} ${top + 12} Z" fill="${accent}"/>`;
    case "wanderer": return `<path d="M ${cx} ${top - 52} Q ${cx - rx - 14} ${top + 8} ${cx - rx - 4} ${top + 90} L ${cx - rx + 14} ${top + 90} Q ${cx - rx + 6} ${top + 30} ${cx} ${top + 16} Q ${cx + rx - 6} ${top + 30} ${cx + rx + 4} ${top + 90} L ${cx + rx + 4} ${top + 90} Q ${cx + rx + 14} ${top + 8} ${cx} ${top - 52} Z" fill="${hair}"/>`;
    default: return `<path d="M ${cx - rx} ${top + 16} Q ${cx - rx + 4} ${top - 12} ${cx} ${top - 14} Q ${cx + rx - 4} ${top - 12} ${cx + rx} ${top + 16} Q ${cx} ${top + 2} ${cx - rx} ${top + 16} Z" fill="${hair}"/>`;
  }
}

export function renderCharacter(character, palette) {
  const p = palette || PALETTES.midnight_blue;
  const arch = ARCHETYPES.includes(character.archetype) ? character.archetype : "wanderer";
  const rng = rngFor((character.name || "x") + arch + p.dark);

  // muted flat palette for the figure
  const bg = p.dark;
  const backdrop = p.mid;
  const skin = p.light;
  const skinShade = shade(p.light, 0.82);
  const hair = shade(p.light, 0.45);
  const shirt = p.mid;
  const shirtShade = shade(p.mid, 0.8);
  const accent = p.accent;
  const ink = shade(p.dark, 0.6);

  // seeded variation: head size, position, shirt colour, backdrop shape
  const rx = 62 + rng() * 10, ry = 66 + rng() * 8;
  const cx = 200 + (rng() - 0.5) * 20, cy = 225 + (rng() - 0.5) * 12;
  const top = cy - ry;
  const shirtCol = rng() > 0.5 ? shirt : shade(shirt, 0.85);
  const sw = 96 + rng() * 16; // shoulder half-width

  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${character.name || "character"}">
    <rect width="400" height="500" fill="${bg}"/>
    <circle cx="${cx}" cy="${cy + 40}" r="150" fill="${backdrop}"/>
    <path d="M ${cx - sw} 500 L ${cx - sw} 420 Q ${cx - sw} ${cy + ry + 58} ${cx} ${cy + ry + 58} Q ${cx + sw} ${cy + ry + 58} ${cx + sw} 420 L ${cx + sw} 500 Z" fill="${shirtCol}"/>
    <path d="M ${cx - sw} 500 L ${cx - sw} 420 Q ${cx - sw} ${cy + ry + 58} ${cx} ${cy + ry + 58} L ${cx} 500 Z" fill="${shirtShade}" opacity="0.55"/>
    <path d="M ${cx - 26} ${cy + ry - 12} Q ${cx} ${cy + ry + 8} ${cx + 26} ${cy + ry - 12} L ${cx + 20} ${cy + ry + 30} Q ${cx} ${cy + ry + 44} ${cx - 20} ${cy + ry + 30} Z" fill="${shirtShade}"/>
    <rect x="${cx - 17}" y="${cy + ry - 26}" width="34" height="40" fill="${skin}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/>
    <path d="M ${cx + rx * 0.25} ${cy - ry * 0.7} A ${rx} ${ry} 0 0 1 ${cx + rx * 0.9} ${cy + ry * 0.4} L ${cx + rx * 0.55} ${cy + ry * 0.1} A ${rx * 0.62} ${ry * 0.62} 0 0 0 ${cx + rx * 0.18} ${cy - ry * 0.45} Z" fill="${skinShade}" opacity="0.7"/>
    <circle cx="${cx - rx - 4}" cy="${cy + 4}" r="10" fill="${skin}"/><circle cx="${cx + rx + 4}" cy="${cy + 4}" r="10" fill="${skin}"/>
    <circle cx="${cx - 20}" cy="${cy - 6}" r="5.5" fill="${ink}"/><circle cx="${cx + 20}" cy="${cy - 6}" r="5.5" fill="${ink}"/>
    <path d="M ${cx - 26} ${cy - 22} Q ${cx - 20} ${cy - 26} ${cx - 14} ${cy - 23} M ${cx + 14} ${cy - 23} Q ${cx + 20} ${cy - 26} ${cx + 26} ${cy - 22}" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M ${cx} ${cy + 2} Q ${cx + 6} ${cy + 16} ${cx - 2} ${cy + 22} Q ${cx - 8} ${cy + 16} ${cx} ${cy + 2} Z" fill="${skinShade}"/>
    <path d="M ${cx - 13} ${cy + 36} Q ${cx} ${cy + 42} ${cx + 13} ${cy + 36}" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    ${hat(arch, cx, top, rx, hair, accent, p.highlight)}
  </svg>`;
}

/* ---------------- movie poster: flat poster-style scene ---------------- */

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
    <circle cx="200" cy="290" r="170" fill="${p.mid}" opacity="0.6"/>
    ${motif(m, p, rng)}
    <rect x="0" y="470" width="400" height="90" fill="${p.dark}"/>
    <text x="200" y="512" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${title.length > 18 ? 19 : 24}" fill="${p.highlight}" letter-spacing="1.5">${title}</text>
    <text x="200" y="544" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="${p.accent}" letter-spacing="3">${year}</text>
  </svg>`;
}
