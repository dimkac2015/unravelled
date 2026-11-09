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
  { match: "wednesday", hair: "braids"},
  { match: "amelie", hair: "bob"},
  { match: "lisbeth", hair: "mohawk", pierce: true},
  { match: "dude", hair: "long", glasses: "sun", robe: true},
  { match: "mia wallace", hair: "bob"},
  { match: "mia (la", hair: "bun"},
  { match: "eleven", hair: "buzz", hat: "hood"},
  { match: "forrest", hair: "flat", hat: "cap"},
  { match: "napoleon", hair: "curly", hat: "cap", glasses: "round"},
  { match: "paddington", hat: "redhat"},
  { match: "walter", hair: "sidepart", hat: "beanie", glasses: "round"},
  { match: "ron swanson", hair: "mustache"},
  { match: "chihiro", hair: "ponytail", hat: "ribbon"},
  { match: "jack sparrow", hair: "long", hat: "bandana", beard: true, pierce: true},
  { match: "tyler durden", hair: "buzz"},
  { match: "neo", hair: "buzz", glasses: "sun", robe: true},
  { match: "trinity", hair: "long", glasses: "sun"},
  { match: "john wick", glasses: "sun", beard: true},
  { match: "ripley", hair: "buzz"},
  { match: "sarah connor", hair: "ponytail"},
  { match: "marty", hair: "curly", hat: "cap"},
  { match: "doc brown", hair: "wild"},
  { match: "indiana", hat: "cap", beard: true, hair: "sidepart"},
  { match: "deckard", hair: "sidepart"},
  { match: "kiddo", hair: "ponytail", hat: "bandana"},
  { match: "jules winnfield", hair: "curly", beard: true},
  { match: "vincent", hair: "sidepart"},
  { match: "hannibal", hair: "sidepart", glasses: "round"},
  { match: "clarice", hair: "ponytail"},
  { match: "vito", hair: "buzz", beard: true},
  { match: "tony montana", hair: "sidepart"},
  { match: "rocky", hair: "buzz"},
  { match: "mcclane", hair: "curly"},
  { match: "plissken", hair: "long", hat: "bandana", eyepatch: true},
  { match: "rockatansky", hair: "long", beard: true},
  { match: "furiosa", hair: "buzz", eyepatch: true},
  { match: "jack torrance", hair: "sidepart", glasses: "round"},
  { match: "dufresne", hair: "sidepart", glasses: "round"},
  { match: "mcmurphy", hair: "curly", hat: "cap"},
  { match: "delarge", hair: "curly", hat: "bowler"},
  { match: "bickle", hair: "mohawk", beard: true},
  { match: "golightly", hair: "bun", hat: "ribbon"},
  { match: "spongebob", hair: "flat"},
  { match: "patrick", hair: "flat"},
  { match: "squidward", hair: "buzz"},
  { match: "bart", hair: "spiky"},
  { match: "lisa", hair: "spiky"},
  { match: "homer", hair: "buzz", beard: true},
  { match: "marge", hair: "tall"},
  { match: "rick sanchez", hair: "wild", glasses: "round", robe: true},
  { match: "morty", hair: "buzz", hat: "cap"},
  { match: "finn", hat: "cap"},
  { match: "jake", hair: "flat"},
  { match: "bubblegum", hair: "long"},
  { match: "marceline", hair: "long"},
  { match: "gumball", hair: "flat"},
  { match: "darwin", hair: "flat"},
  { match: "totoro", hair: "flat"},
  { match: "sophie", hair: "bun"},
  { match: "howl", hair: "wild"},
  { match: "ash", hair: "spiky", hat: "cap"},
  { match: "naruto", hair: "spiky", hat: "bandana"},
  { match: "goku", hair: "wild"},
  { match: "luffy", hair: "curly", hat: "redhat"},
  { match: "light", hair: "sidepart"},
  { match: " l ", hair: "curly"},
  { match: "edward elric", hair: "braids"},
  { match: "spike", hair: "curly", glasses: "round"},
  { match: "motoko", hair: "sidepart"},
  { match: "shrek", hair: "buzz"},
  { match: "donkey", hair: "flat"},
  { match: "fiona", hair: "long"},
  { match: "puss", hat: "cap", hair: "sidepart"},
  { match: "po", hair: "buzz"},
  { match: "hiccup", hair: "curly"},
  { match: "astrid", hair: "ponytail"},
  { match: "eren", hair: "sidepart"},
  { match: "mikasa", hair: "ponytail"},
  { match: "levi", hair: "buzz"},
  { match: "gon", hair: "spiky"},
  { match: "killua", hair: "spiky"},
  { match: "sailor moon", hair: "bun"},
  { match: "guts", hair: "long", eyepatch: true},
  { match: "denji", hair: "spiky"},
  { match: "power", hair: "long"},
  { match: "coraline", hair: "bob"},
  { match: "wall-e", hair: "flat"},
  { match: "eve", hair: "flat"},
  { match: "mr. incredible", hair: "buzz"},
  { match: "elastigirl", hair: "long"},
  { match: "violet", hair: "bob"},
  { match: "dash", hair: "spiky"},
  { match: "wazowski", hair: "buzz"},
  { match: "sully", hair: "flat"},
  { match: "boo", hair: "curly"},
  { match: "joy", hair: "bob"},
  { match: "sadness", hair: "bun", glasses: "round"},
  { match: "anger", hair: "flat"},
  { match: "wallace", hair: "sidepart"},
  { match: "gromit", hair: "flat"},
  { match: "shaun", hair: "flat"},
  { match: "dexter", hair: "sidepart", glasses: "round", robe: true},
  { match: "johnny bravo", hair: "spiky"},
  { match: "courage", hair: "flat"},
  { match: "blossom", hair: "braids", hat: "ribbon"},
  { match: "buttercup", hair: "bob"},
  { match: "bubbles", hair: "braids"},
  { match: "scooby", hair: "flat"},
  { match: "shaggy", hair: "long", beard: true},
  { match: "fred flintstone", hair: "sidepart"},
  { match: "wilma", hair: "bun"},
  { match: "peter griffin", hair: "buzz", glasses: "round"},
  { match: "stewie", glasses: "round"},
  { match: "loid", hair: "sidepart"},
  { match: "anya", hair: "braids"},
  { match: "yor", hair: "long"},
  { match: "edna", hair: "bob", glasses: "round"},
  { match: "syndrome", hair: "buzz"},
  { match: "mr. fox", hair: "sidepart"},
  { match: "shifu", beard: true},
  { match: "tai lung", hair: "flat"},
  { match: "toothless", hair: "flat"},
  { match: "bing bong", hair: "flat"},
  { match: "fear", hair: "flat"},
  { match: "disgust", hair: "bun"},
  { match: "riley", hair: "ponytail"},
  { match: "timmy", hat: "cap"},
  { match: "cosmo", hair: "flat"},
  { match: "wanda", hair: "bun"},
  { match: "jimmy neutron", hair: "wild"},
  { match: "sheen", hair: "flat"},
  { match: "carl", hair: "buzz"},
  { match: "phineas", hair: "flat"},
  { match: "ferb", hair: "flat"},
  { match: "candace", hair: "long"},
  { match: "perry", hat: "cap"},
  { match: "kim possible", hair: "bob"},
  { match: "ron stoppable", hair: "curly"},
];
const HAIR_KINDS = ["braids", "bob", "mohawk", "long", "bun", "buzz", "flat", "curly", "ponytail", "sidepart", "spiky", "wild", "tall", "default"];
const HAT_KINDS = [null, "cap", "beanie", "hood", "redhat", "ribbon", "bandana", "bowler"];

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
    case "tall": return `<path d="M ${cx - rx * 0.55} ${top + 40} L ${cx - rx * 0.62} ${top - 70} Q ${cx} ${top - 92} ${cx + rx * 0.62} ${top - 70} L ${cx + rx * 0.55} ${top + 40} Q ${cx} ${top + 8} ${cx - rx * 0.55} ${top + 40} Z" fill="${color}"/>`;
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
    case "bowler": return `<ellipse cx="${cx}" cy="${top + 8}" rx="${rx + 14}" ry="9" fill="${hair}"/><path d="M ${cx - 26} ${top + 8} Q ${cx - 24} ${top - 30} ${cx} ${top - 32} Q ${cx + 24} ${top - 30} ${cx + 26} ${top + 8} Z" fill="${hair}"/>`;
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

  // palette roles: bg dark, backdrop mid, shirt ALWAYS contrasts with both
  const bg = p.dark;
  const backdrop = p.mid;
  const SKINS = ["#eccfae", "#e0b98f", "#d9a878", "#b07a52", "#8a5f42", "#f2d8b8"];
  const skin = SKINS[Math.floor(rng() * SKINS.length)];
  const skinShade = shade(skin, 0.8);
  const hair = shade(p.dark, 1.7);
  const accent = p.accent;
  const ink = shade(p.dark, 0.55);
  const shirtCol = [shade(p.light, 0.72), accent, shade(p.mid, 1.5)][Math.floor(rng() * 3)];
  const shirtShade = shade(shirtCol, 0.78);

  // simple, fixed, correct geometry
  const cx = 200 + (rng() - 0.5) * 14;
  const cy = 218 + (rng() - 0.5) * 8;
  const r = 64 + rng() * 8;            // head radius
  const headBottom = cy + r;
  const shoulderY = headBottom + 46;    // coat top
  const sw = 100 + rng() * 14;          // shoulder half width

  const feat = featureFor(character.name);
  const hairKind = feat && feat.hair && feat.hair !== "mustache" ? feat.hair : HAIR_KINDS[Math.floor(rng() * HAIR_KINDS.length)];
  const hatKind = feat && feat.hat ? feat.hat : (rng() < 0.4 ? HAT_KINDS[Math.floor(rng() * HAT_KINDS.length)] : (ARCH_HAT[arch] || null));
  const glassesKind = feat && feat.glasses ? feat.glasses : (rng() < 0.2 ? (rng() < 0.5 ? "round" : "sun") : null);
  const mustache = feat && feat.hair === "mustache" ? true : rng() < 0.08;
  const beard = (feat && feat.beard) || rng() < 0.1;
  const robe = feat && feat.robe;
  const pierce = feat && feat.pierce ? true : rng() < 0.08;
  const eyepatch = feat && feat.eyepatch;

  const neck = `<rect x="${cx - 16}" y="${headBottom - 22}" width="32" height="${shoulderY + 26 - (headBottom - 22)}" fill="${skin}"/>`;
  const coat = `<path d="M ${cx - sw} 500 L ${cx - sw} ${shoulderY + 40} Q ${cx - sw} ${shoulderY} ${cx} ${shoulderY} Q ${cx + sw} ${shoulderY} ${cx + sw} ${shoulderY + 40} L ${cx + sw} 500 Z" fill="${robe ? p.highlight : shirtCol}"/>
    <path d="M ${cx - 24} ${shoulderY + 2} L ${cx} ${shoulderY + 30} L ${cx + 24} ${shoulderY + 2} L ${cx + 16} ${shoulderY + 14} L ${cx} ${shoulderY + 36} L ${cx - 16} ${shoulderY + 14} Z" fill="${shirtShade}"/>`;
  const head = `<circle cx="${cx - r - 3}" cy="${cy + 6}" r="11" fill="${skin}"/><circle cx="${cx + r + 3}" cy="${cy + 6}" r="11" fill="${skin}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${skin}"/>
    <circle cx="${cx - 22}" cy="${cy - 8}" r="7" fill="${ink}"/><circle cx="${cx + 22}" cy="${cy - 8}" r="7" fill="${ink}"/>
    <circle cx="${cx - 24}" cy="${cy - 11}" r="2.4" fill="#ffffff" opacity="0.9"/><circle cx="${cx + 20}" cy="${cy - 11}" r="2.4" fill="#ffffff" opacity="0.9"/>
    <path d="M ${cx - 30} ${cy - 26} Q ${cx - 22} ${cy - 30} ${cx - 14} ${cy - 27} M ${cx + 14} ${cy - 27} Q ${cx + 22} ${cy - 30} ${cx + 30} ${cy - 26}" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M ${cx} ${cy + 2} Q ${cx + 5} ${cy + 14} ${cx - 1} ${cy + 19} Q ${cx - 7} ${cy + 13} ${cx} ${cy + 2} Z" fill="${skinShade}"/>
    <path d="M ${cx - 14} ${cy + 34} Q ${cx} ${cy + 41} ${cx + 14} ${cy + 34}" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const extras = `
    ${glassesKind ? glasses(glassesKind, cx, cy, ink, p.highlight) : ""}
    ${mustache || beard ? `<path d="M ${cx - 17} ${cy + 27} Q ${cx} ${cy + 17} ${cx + 17} ${cy + 27} Q ${cx} ${cy + 40} ${cx - 17} ${cy + 27} Z" fill="${hair}"/>` : ""}
    ${pierce ? `<circle cx="${cx - r - 3}" cy="${cy + 20}" r="3.5" fill="${accent}"/>` : ""}
    ${eyepatch ? `<rect x="${cx - 34}" y="${cy - 16}" width="30" height="15" rx="4" fill="${ink}"/><line x1="${cx - 30}" y1="${cy - 13}" x2="${cx + r}" y2="${cy - 28}" stroke="${ink}" stroke-width="4"/>` : ""}`;
  const hairDraw = mustache ? "" : hairShape(hairKind, cx, cy - r, r, hair);

  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${character.name || "character"}">
    <rect width="400" height="500" fill="${bg}"/>
    <circle cx="${cx}" cy="${cy + 60}" r="165" fill="${backdrop}"/>
    ${neck}
    ${coat}
    ${head}
    ${extras}
    ${hairDraw}
    ${hatKind ? hat(hatKind, cx, cy - r, r, hair, accent, p.highlight) : ""}
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
