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

/* signature look per well-known character (matched by name), so each one is
   recognizable: hair shape + hat + glasses */
const FEATURES = [
  { match: "wednesday", hair: "braids" },
  { match: "amelie", hair: "bob" },
  { match: "lisbeth", hair: "mohawk", pierce: true },
  { match: "dude", hair: "long", glasses: "sun", robe: true },
  { match: "mia", hair: "bun" },
  { match: "eleven", hair: "buzz", hat: "hood" },
  { match: "forrest", hair: "flat", hat: "cap" },
  { match: "napoleon", hair: "curly", hat: "cap", glasses: "round" },
  { match: "paddington", hat: "redhat" },
  { match: "walter", hair: "sidepart", hat: "beanie", glasses: "round" },
  { match: "ron", hair: "mustache" },
  { match: "chihiro", hair: "ponytail", hat: "ribbon" },
  { match: "jack sparrow", hair: "long", hat: "bandana", beard: true },
  { match: "neo", glasses: "sun", hair: "buzz" },
  { match: "trinity", glasses: "sun", hair: "long" },
  { match: "indiana", hat: "cap", hair: "sidepart", beard: true },
  { match: "doc brown", hair: "wild" },
  { match: "marty", hat: "cap", hair: "curly" },
  { match: "ash", hat: "cap", hair: "spiky" },
  { match: "goku", hair: "spiky" },
  { match: "luffy", hat: "redhat", hair: "curly" },
  { match: "naruto", hair: "spiky", hat: "bandana" },
  { match: "spongebob", hair: "flat" },
  { match: "lisa", hair: "spiky" },
  { match: "bart", hair: "spiky" },
  { match: "homer", hair: "buzz", beard: true },
  { match: "rick sanchez", hair: "wild", glasses: "round" },
  { match: "spike", hair: "curly", glasses: "round" },
  { match: "guts", hair: "long", eyepatch: true },
  { match: "shrek", hair: "buzz" },
  { match: "puss", hat: "cap", hair: "sidepart", beard: true },
  { match: "walle", hair: "flat" },
  { match: "joy", hair: "bob" },
  { match: "sadness", hair: "bun", glasses: "round" },
];
const HAIR_KINDS = ["braids", "bob", "mohawk", "long", "bun", "buzz", "flat", "curly", "ponytail", "sidepart", "spiky", "wild", "default"];
const HAT_KINDS = [null, "cap", "beanie", "hood", "redhat", "ribbon", "bandana"];

function featureFor(name) {
  const n = String(name || "").toLowerCase();
  return FEATURES.find((f) => n.includes(f.match)) || null;
}

/* hair shapes anchored to the head (cx, top, rx) */
function hairShape(kind, cx, top, rx, color) {
  switch (kind) {
    case "braids": return `<path d="M ${cx - rx} ${top + 20} Q ${cx - rx - 8} ${top + 90} ${cx - rx + 14} ${top + 130} L ${cx - rx + 30} ${top + 126} Q ${cx - rx + 12} ${top + 86} ${cx - rx + 16} ${top + 26} Z" fill="${color}"/>
      <path d="M ${cx + rx} ${top + 20} Q ${cx + rx + 8} ${top + 90} ${cx + rx - 14} ${top + 130} L ${cx + rx - 30} ${top + 126} Q ${cx + rx - 12} ${top + 86} ${cx + rx - 16} ${top + 26} Z" fill="${color}"/>
      <path d="M ${cx - rx} ${top + 18} Q ${cx} ${top - 16} ${cx + rx} ${top + 18} L ${cx + rx} ${top + 40} Q ${cx} ${top + 6} ${cx - rx} ${top + 40} Z" fill="${color}"/>`;
    case "bob": return `<path d="M ${cx - rx - 4} ${top + 60} Q ${cx - rx - 8} ${top - 10} ${cx} ${top - 14} Q ${cx + rx + 8} ${top - 10} ${cx + rx + 4} ${top + 60} L ${cx + rx - 14} ${top + 58} Q ${cx + rx - 8} ${top + 10} ${cx} ${top + 6} Q ${cx - rx + 8} ${top + 10} ${cx - rx + 14} ${top + 58} Z" fill="${color}"/>`;
    case "mohawk": return `<path d="M ${cx - 14} ${top - 34} L ${cx} ${top - 52} L ${cx + 14} ${top - 34} L ${cx + 12} ${top + 6} Q ${cx} ${top - 12} ${cx - 12} ${top + 6} Z" fill="${color}"/>
      <path d="M ${cx - rx} ${top + 14} Q ${cx} ${top - 14} ${cx + rx} ${top + 14} L ${cx + rx} ${top + 30} Q ${cx} ${top + 2} ${cx - rx} ${top + 30} Z" fill="${color}"/>`;
    case "long": return `<path d="M ${cx - rx} ${top + 16} Q ${cx - rx - 6} ${top + 120} ${cx - rx + 16} ${top + 150} L ${cx - rx + 34} ${top + 146} Q ${cx - rx + 18} ${top + 110} ${cx - rx + 12} ${top + 30} Q ${cx} ${top} ${cx + rx - 12} ${top + 30} Q ${cx + rx - 18} ${top + 110} ${cx + rx - 34} ${top + 146} L ${cx + rx - 16} ${top + 150} Q ${cx + rx + 6} ${top + 120} ${cx + rx} ${top + 16} Q ${cx} ${top - 14} ${cx - rx} ${top + 16} Z" fill="${color}"/>`;
    case "bun": return `<circle cx="${cx}" cy="${top - 16}" r="16" fill="${color}"/><path d="M ${cx - rx} ${top + 16} Q ${cx} ${top - 14} ${cx + rx} ${top + 16} L ${cx + rx} ${top + 34} Q ${cx} ${top + 4} ${cx - rx} ${top + 34} Z" fill="${color}"/>`;
    case "buzz": return `<path d="M ${cx - rx + 4} ${top + 10} Q ${cx} ${top - 18} ${cx + rx - 4} ${top + 10} L ${cx + rx - 4} ${top + 22} Q ${cx} ${top} ${cx - rx + 4} ${top + 22} Z" fill="${color}"/>`;
    case "flat": return `<path d="M ${cx - rx} ${top + 12} L ${cx + rx} ${top + 12} L ${cx + rx - 6} ${top - 8} Q ${cx} ${top - 18} ${cx - rx + 6} ${top - 8} Z" fill="${color}"/>`;
    case "curly": return `<g fill="${color}">${[-0.7, -0.35, 0, 0.35, 0.7].map(o => `<circle cx="${cx + o * rx}" cy="${top + 2 - Math.abs(o) * -8}" r="15"/>`).join("")}</g><path d="M ${cx - rx} ${top + 18} Q ${cx} ${top - 6} ${cx + rx} ${top + 18} L ${cx + rx} ${top + 30} Q ${cx} ${top + 8} ${cx - rx} ${top + 30} Z" fill="${color}"/>`;
    case "ponytail": return `<path d="M ${cx - rx} ${top + 16} Q ${cx} ${top - 14} ${cx + rx} ${top + 16} L ${cx + rx} ${top + 32} Q ${cx} ${top + 4} ${cx - rx} ${top + 32} Z" fill="${color}"/><path d="M ${cx + rx - 6} ${top + 10} Q ${cx + rx + 26} ${top + 60} ${cx + rx + 8} ${top + 120} Q ${cx + rx - 6} ${top + 112} ${cx + rx + 2} ${top + 60} Q ${cx + rx - 2} ${top + 34} ${cx + rx - 10} ${top + 18} Z" fill="${color}"/>`;
    case "sidepart": return `<path d="M ${cx - rx} ${top + 14} Q ${cx - rx + 6} ${top - 12} ${cx} ${top - 14} Q ${cx + rx - 4} ${top - 12} ${cx + rx} ${top + 20} L ${cx + rx - 12} ${top + 16} Q ${cx + rx - 14} ${top - 2} ${cx - 8} ${top + 2} Q ${cx - rx + 6} ${top + 4} ${cx - rx + 12} ${top + 22} Z" fill="${color}"/>`;
    case "spiky": return `<g fill="${color}">${[-0.75, -0.4, -0.05, 0.3, 0.65].map(o => `<path d="M ${cx + o * rx} ${top + 12} L ${cx + o * rx + 8} ${top - 26 - Math.abs(o) * -14} L ${cx + o * rx + 18} ${top + 14} Z"/>`).join("")}</g><path d="M ${cx - rx} ${top + 16} Q ${cx} ${top - 6} ${cx + rx} ${top + 16} L ${cx + rx} ${top + 28} Q ${cx} ${top + 6} ${cx - rx} ${top + 28} Z" fill="${color}"/>`;
    case "wild": return `<g fill="${color}">${[-0.8, -0.5, -0.2, 0.1, 0.4, 0.7].map((o, i) => `<circle cx="${cx + o * rx}" cy="${top - 6 - (i % 3) * 14}" r="${16 - (i % 2) * 5}"/>`).join("")}</g>`;
    default: return `<path d="M ${cx - rx} ${top + 16} Q ${cx} ${top - 14} ${cx + rx} ${top + 16} L ${cx + rx} ${top + 32} Q ${cx} ${top + 2} ${cx - rx} ${top + 32} Z" fill="${color}"/>`;
  }
}

/* hats anchored to the head (cx, top, rx) */
function hat(kind, cx, top, rx, hair, accent, hi) {
  const brimY = top + 12;
  switch (kind) {
    case "cap": return `<ellipse cx="${cx}" cy="${brimY}" rx="${rx + 18}" ry="9" fill="${hair}"/><path d="M ${cx - 30} ${brimY - 2} Q ${cx - 26} ${top - 34} ${cx} ${top - 36} Q ${cx + 26} ${top - 34} ${cx + 30} ${brimY - 2} Z" fill="${hair}"/><rect x="${cx + 18}" y="${brimY - 4}" width="28" height="8" rx="4" fill="${hair}"/>`;
    case "redhat": return `<path d="M ${cx - 30} ${brimY - 2} Q ${cx - 26} ${top - 40} ${cx} ${top - 42} Q ${cx + 26} ${top - 40} ${cx + 30} ${brimY - 2} Z" fill="${accent}"/><rect x="${cx - rx - 12}" y="${brimY - 4}" width="${(rx + 12) * 2}" height="10" rx="5" fill="${accent}"/><circle cx="${cx}" cy="${top - 44}" r="7" fill="${hi}"/>`;
    case "beanie": return `<path d="M ${cx - rx + 4} ${brimY} Q ${cx - rx + 8} ${top - 30} ${cx} ${top - 32} Q ${cx + rx - 8} ${top - 30} ${cx + rx - 4} ${brimY} Z" fill="${hair}"/><rect x="${cx - rx - 2}" y="${brimY - 8}" width="${(rx + 2) * 2}" height="12" rx="6" fill="${hair}"/>`;
    case "hood": return `<path d="M ${cx} ${top - 46} Q ${cx - rx - 14} ${top + 4} ${cx - rx - 4} ${top + 100} L ${cx - rx + 14} ${top + 100} Q ${cx - rx + 6} ${top + 34} ${cx} ${top + 20} Q ${cx + rx - 6} ${top + 34} ${cx + rx + 4} ${top + 100} L ${cx + rx + 4} ${top + 100} Q ${cx + rx + 14} ${top + 4} ${cx} ${top - 46} Z" fill="${hair}"/>`;
    case "ribbon": return `<path d="M ${cx - 12} ${top - 6} L ${cx} ${top - 20} L ${cx + 12} ${top - 6} L ${cx + 5} ${top + 4} L ${cx - 5} ${top + 4} Z" fill="${accent}"/>`;
    case "bandana": return `<path d="M ${cx - rx - 2} ${top + 8} Q ${cx} ${top - 10} ${cx + rx + 2} ${top + 8} L ${cx + rx + 2} ${top + 22} Q ${cx} ${top + 4} ${cx - rx - 2} ${top + 22} Z" fill="${accent}"/><circle cx="${cx + rx - 2}" cy="${top + 24}" r="6" fill="${accent}"/>`;
    default: return "";
  }
}

const ARCH_HAT = { detective: "cap", soldier: "cap", cowboy: "cap", noble: "ribbon", wanderer: "hood" };

function glasses(kind, cx, cy, ink, hi) {
  if (kind === "sun") return `<g><rect x="${cx - 34}" y="${cy - 14}" width="26" height="16" rx="6" fill="${ink}"/><rect x="${cx + 8}" y="${cy - 14}" width="26" height="16" rx="6" fill="${ink}"/><line x1="${cx - 8}" y1="${cy - 8}" x2="${cx + 8}" y2="${cy - 8}" stroke="${ink}" stroke-width="4"/><line x1="${cx - 34}" y1="${cy - 10}" x2="${cx - 44}" y2="${cy - 14}" stroke="${ink}" stroke-width="4"/><line x1="${cx + 34}" y1="${cy - 10}" x2="${cx + 44}" y2="${cy - 14}" stroke="${ink}" stroke-width="4"/></g>`;
  if (kind === "round") return `<g fill="none" stroke="${ink}" stroke-width="4"><circle cx="${cx - 20}" cy="${cy - 6}" r="13"/><circle cx="${cx + 20}" cy="${cy - 6}" r="13"/><line x1="${cx - 7}" y1="${cy - 6}" x2="${cx + 7}" y2="${cy - 6}"/></g><circle cx="${cx - 20}" cy="${cy - 6}" r="4" fill="${ink}"/><circle cx="${cx + 20}" cy="${cy - 6}" r="4" fill="${ink}"/>`;
  return "";
}

export function renderCharacter(character, palette) {
  const p = palette || PALETTES.midnight_blue;
  const arch = ARCHETYPES.includes(character.archetype) ? character.archetype : "wanderer";
  const rng = rngFor((character.name || "x") + arch + p.dark);

  // muted flat palette for the figure — skin is a real warm tone, never the palette's green
  const bg = p.dark;
  const backdrop = p.mid;
  const SKINS = ["#eccfae", "#e0b98f", "#d9a878", "#b07a52", "#8a5f42", "#f2d8b8"];
  const skin = SKINS[Math.floor(rng() * SKINS.length)];
  const skinShade = shade(skin, 0.82);
  const hair = shade(p.dark, 1.6);
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

  // signature look of a known character; otherwise a seeded varied combination,
  // so every one of the 100 bank characters looks different
  const feat = featureFor(character.name);
  const hairKind = feat && feat.hair && feat.hair !== "mustache"
    ? feat.hair
    : HAIR_KINDS[Math.floor(rng() * HAIR_KINDS.length)];
  const hatKind = feat && feat.hat ? feat.hat
    : (rng() < 0.45 ? HAT_KINDS[Math.floor(rng() * HAT_KINDS.length)] : (ARCH_HAT[arch] || null));
  const glassesKind = feat && feat.glasses ? feat.glasses : (rng() < 0.22 ? (rng() < 0.5 ? "round" : "sun") : null);
  const mustache = feat && feat.hair === "mustache" ? true : rng() < 0.08;
  const beard = feat && feat.beard ? true : rng() < 0.1;
  const robe = feat && feat.robe;
  const pierce = feat && feat.pierce ? true : rng() < 0.08;
  const eyepatch = feat && feat.eyepatch;
  const hairDraw = mustache ? "" : hairShape(hairKind, cx, top, rx, hair);
  const glassesDraw = glasses(glassesKind, cx, cy, ink, p.highlight);
  const mustacheDraw = (mustache || beard) ? `<path d="M ${cx - 16} ${cy + 28} Q ${cx} ${cy + 18} ${cx + 16} ${cy + 28} Q ${cx} ${cy + 40} ${cx - 16} ${cy + 28} Z" fill="${hair}"/>` : "";
  const robeCol = robe ? p.highlight : shirtCol;

  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${character.name || "character"}">
    <rect width="400" height="500" fill="${bg}"/>
    <circle cx="${cx}" cy="${cy + 40}" r="150" fill="${backdrop}"/>
    <rect x="${cx - 17}" y="${cy + ry - 26}" width="34" height="${cy + ry + 80 - (cy + ry - 26)}" fill="${skin}"/>
    <path d="M ${cx - sw} 500 L ${cx - sw} 420 Q ${cx - sw} ${cy + ry + 58} ${cx} ${cy + ry + 58} Q ${cx + sw} ${cy + ry + 58} ${cx + sw} 420 L ${cx + sw} 500 Z" fill="${robeCol}"/>
    <path d="M ${cx - sw} 500 L ${cx - sw} 420 Q ${cx - sw} ${cy + ry + 58} ${cx} ${cy + ry + 58} L ${cx} 500 Z" fill="${shirtShade}" opacity="0.55"/>
    <path d="M ${cx - 26} ${cy + ry - 12} Q ${cx} ${cy + ry + 8} ${cx + 26} ${cy + ry - 12} L ${cx + 20} ${cy + ry + 30} Q ${cx} ${cy + ry + 44} ${cx - 20} ${cy + ry + 30} Z" fill="${shirtShade}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/>
    <path d="M ${cx + rx * 0.25} ${cy - ry * 0.7} A ${rx} ${ry} 0 0 1 ${cx + rx * 0.9} ${cy + ry * 0.4} L ${cx + rx * 0.55} ${cy + ry * 0.1} A ${rx * 0.62} ${ry * 0.62} 0 0 0 ${cx + rx * 0.18} ${cy - ry * 0.45} Z" fill="${skinShade}" opacity="0.7"/>
    <circle cx="${cx - rx - 4}" cy="${cy + 4}" r="10" fill="${skin}"/><circle cx="${cx + rx + 4}" cy="${cy + 4}" r="10" fill="${skin}"/>
    <circle cx="${cx - 20}" cy="${cy - 6}" r="6.5" fill="${ink}"/><circle cx="${cx + 20}" cy="${cy - 6}" r="6.5" fill="${ink}"/>
    <circle cx="${cx - 22}" cy="${cy - 8}" r="2" fill="${p.highlight}"/><circle cx="${cx + 18}" cy="${cy - 8}" r="2" fill="${p.highlight}"/>
    ${glassesDraw}
    <path d="M ${cx - 26} ${cy - 22} Q ${cx - 20} ${cy - 26} ${cx - 14} ${cy - 23} M ${cx + 14} ${cy - 23} Q ${cx + 20} ${cy - 26} ${cx + 26} ${cy - 22}" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M ${cx} ${cy + 2} Q ${cx + 6} ${cy + 16} ${cx - 2} ${cy + 22} Q ${cx - 8} ${cy + 16} ${cx} ${cy + 2} Z" fill="${skinShade}"/>
    ${mustacheDraw}
    <path d="M ${cx - 13} ${cy + 36} Q ${cx} ${cy + 42} ${cx + 13} ${cy + 36}" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    ${pierce ? `<circle cx="${cx - rx - 4}" cy="${cy + 18}" r="3.5" fill="${accent}"/>` : ""}
    ${eyepatch ? `<path d="M ${cx - 30} ${cy - 12} L ${cx - 2} ${cy - 12} L ${cx - 2} ${cy + 2} L ${cx - 30} ${cy + 2} Z" fill="${ink}"/><line x1="${cx - 28}" y1="${cy - 10}" x2="${cx + rx}" y2="${cy - 24}" stroke="${ink}" stroke-width="4"/>` : ""}
    ${hairDraw}
    ${hatKind ? hat(hatKind, cx, top, rx, hair, accent, p.highlight) : ""}
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
