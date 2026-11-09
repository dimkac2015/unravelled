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
  { match: "death note", hair: "curly"},
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

/* hair shapes: a cap over the top of the head + optional extras, anchored at (cx, top, r) */
function hairShape(kind, cx, top, r, color) {
  const cap = `<path d="M ${cx - r} ${top + r * 0.35} Q ${cx - r} ${top - r * 0.15} ${cx} ${top - r * 0.18} Q ${cx + r} ${top - r * 0.15} ${cx + r} ${top + r * 0.35} Q ${cx} ${top + r * 0.05} ${cx - r} ${top + r * 0.35} Z" fill="${color}"/>`;
  switch (kind) {
    case "mohawk": return cap + `<path d="M ${cx - 9} ${top - r * 0.1} L ${cx} ${top - r * 0.62} L ${cx + 9} ${top - r * 0.1} Q ${cx} ${top - r * 0.28} ${cx - 9} ${top - r * 0.1} Z" fill="${color}"/>`;
    case "braids": return cap + `<path d="M ${cx - r * 0.95} ${top + r * 0.2} Q ${cx - r * 1.05} ${top + r} ${cx - r * 0.72} ${top + r * 1.45} L ${cx - r * 0.5} ${top + r * 1.4} Q ${cx - r * 0.78} ${top + r * 0.95} ${cx - r * 0.68} ${top + r * 0.3} Z" fill="${color}"/><path d="M ${cx + r * 0.95} ${top + r * 0.2} Q ${cx + r * 1.05} ${top + r} ${cx + r * 0.72} ${top + r * 1.45} L ${cx + r * 0.5} ${top + r * 1.4} Q ${cx + r * 0.78} ${top + r * 0.95} ${cx + r * 0.68} ${top + r * 0.3} Z" fill="${color}"/>`;
    case "bob": return `<path d="M ${cx - r - 3} ${top + r * 0.9} Q ${cx - r - 6} ${top - r * 0.2} ${cx} ${top - r * 0.2} Q ${cx + r + 6} ${top - r * 0.2} ${cx + r + 3} ${top + r * 0.9} L ${cx + r * 0.62} ${top + r * 0.85} Q ${cx + r * 0.55} ${top + r * 0.1} ${cx} ${top + r * 0.02} Q ${cx - r * 0.55} ${top + r * 0.1} ${cx - r * 0.62} ${top + r * 0.85} Z" fill="${color}"/>`;
    case "long": return cap + `<path d="M ${cx - r * 0.9} ${top + r * 0.3} L ${cx - r * 1.05} ${top + r * 1.7} Q ${cx - r * 0.6} ${top + r * 1.8} ${cx - r * 0.45} ${top + r * 1.6} L ${cx + r * 0.45} ${top + r * 1.6} Q ${cx + r * 0.6} ${top + r * 1.8} ${cx + r * 1.05} ${top + r * 1.7} L ${cx + r * 0.9} ${top + r * 0.3} Q ${cx} ${top + r * 0.05} ${cx - r * 0.9} ${top + r * 0.3} Z" fill="${color}"/>`;
    case "ponytail": return cap + `<path d="M ${cx + r * 0.75} ${top + r * 0.15} Q ${cx + r * 1.25} ${top + r * 0.9} ${cx + r * 0.95} ${top + r * 1.7} Q ${cx + r * 0.7} ${top + r * 1.6} ${cx + r * 0.8} ${top + r * 0.8} Q ${cx + r * 0.68} ${top + r * 0.4} ${cx + r * 0.6} ${top + r * 0.25} Z" fill="${color}"/>`;
    case "bun": return cap + `<circle cx="${cx}" cy="${top - r * 0.22}" r="${r * 0.26}" fill="${color}"/>`;
    case "curly": return cap + `<g fill="${color}">${[-0.55, -0.2, 0.15, 0.5].map(o => `<circle cx="${cx + o * r}" cy="${top - r * 0.02}" r="${r * 0.24}"/>`).join("")}</g>`;
    case "spiky": return `<g fill="${color}">${[-0.6, -0.25, 0.1, 0.45].map(o => `<path d="M ${cx + o * r} ${top + r * 0.2} L ${cx + o * r + r * 0.12} ${top - r * 0.55} L ${cx + o * r + r * 0.26} ${top + r * 0.22} Z"/>`).join("")}</g>` + cap;
    case "wild": return `<g fill="${color}">${[-0.7, -0.4, -0.1, 0.2, 0.5, 0.75].map((o, i) => `<circle cx="${cx + o * r}" cy="${top - r * 0.05 - (i % 3) * r * 0.22}" r="${r * 0.24}"/>`).join("")}</g>`;
    case "tall": return `<path d="M ${cx - r * 0.5} ${top + r * 0.3} L ${cx - r * 0.55} ${top - r * 1.15} Q ${cx} ${top - r * 1.4} ${cx + r * 0.55} ${top - r * 1.15} L ${cx + r * 0.5} ${top + r * 0.3} Q ${cx} ${top + r * 0.05} ${cx - r * 0.5} ${top + r * 0.3} Z" fill="${color}"/>`;
    case "buzz": case "flat": case "default": return cap;
    default: return cap;
  }
}

/* hats sit on top of the hair */
function hat(kind, cx, top, r, hair, accent, hi) {
  switch (kind) {
    case "cap": return `<path d="M ${cx - r * 0.92} ${top + r * 0.18} Q ${cx - r * 0.85} ${top - r * 0.55} ${cx} ${top - r * 0.58} Q ${cx + r * 0.85} ${top - r * 0.55} ${cx + r * 0.92} ${top + r * 0.18} Z" fill="${hair}"/><ellipse cx="${cx}" cy="${top + r * 0.18}" rx="${r * 1.25}" ry="${r * 0.14}" fill="${hair}"/><rect x="${cx + r * 0.4}" y="${top + r * 0.08}" width="${r * 0.55}" height="${r * 0.12}" rx="${r * 0.06}" fill="${hair}"/>`;
    case "redhat": return `<path d="M ${cx - r * 0.8} ${top + r * 0.2} Q ${cx - r * 0.7} ${top - r * 0.75} ${cx} ${top - r * 0.8} Q ${cx + r * 0.7} ${top - r * 0.75} ${cx + r * 0.8} ${top + r * 0.2} Z" fill="${accent}"/><ellipse cx="${cx}" cy="${top + r * 0.2}" rx="${r * 1.2}" ry="${r * 0.14}" fill="${accent}"/><circle cx="${cx}" cy="${top - r * 0.82}" r="${r * 0.11}" fill="${hi}"/>`;
    case "beanie": return `<path d="M ${cx - r * 0.95} ${top + r * 0.25} Q ${cx - r * 0.9} ${top - r * 0.5} ${cx} ${top - r * 0.52} Q ${cx + r * 0.9} ${top - r * 0.5} ${cx + r * 0.95} ${top + r * 0.25} Z" fill="${hair}"/><rect x="${cx - r * 1.02}" y="${top + r * 0.1}" width="${r * 2.04}" height="${r * 0.2}" rx="${r * 0.1}" fill="${hair}"/>`;
    case "hood": return `<path d="M ${cx} ${top - r * 0.75} Q ${cx - r * 1.25} ${top - r * 0.1} ${cx - r * 1.05} ${top + r * 1.2} L ${cx - r * 0.7} ${top + r * 1.2} Q ${cx - r * 0.85} ${top + r * 0.3} ${cx} ${top + r * 0.15} Q ${cx + r * 0.85} ${top + r * 0.3} ${cx + r * 0.7} ${top + r * 1.2} L ${cx + r * 1.05} ${top + r * 1.2} Q ${cx + r * 1.25} ${top - r * 0.1} ${cx} ${top - r * 0.75} Z" fill="${hair}"/>`;
    case "bandana": return `<path d="M ${cx - r * 1.05} ${top + r * 0.1} Q ${cx} ${top - r * 0.18} ${cx + r * 1.05} ${top + r * 0.1} L ${cx + r * 1.05} ${top + r * 0.3} Q ${cx} ${top + r * 0.02} ${cx - r * 1.05} ${top + r * 0.3} Z" fill="${accent}"/><circle cx="${cx + r * 0.95}" cy="${top + r * 0.34}" r="${r * 0.09}" fill="${accent}"/>`;
    case "bowler": return `<ellipse cx="${cx}" cy="${top + r * 0.12}" rx="${r * 1.15}" ry="${r * 0.13}" fill="${hair}"/><path d="M ${cx - r * 0.45} ${top + r * 0.12} Q ${cx - r * 0.42} ${top - r * 0.5} ${cx} ${top - r * 0.52} Q ${cx + r * 0.42} ${top - r * 0.5} ${cx + r * 0.45} ${top + r * 0.12} Z" fill="${hair}"/>`;
    case "ribbon": return `<path d="M ${cx - r * 0.2} ${top - r * 0.1} L ${cx} ${top - r * 0.3} L ${cx + r * 0.2} ${top - r * 0.1} L ${cx + r * 0.08} ${top} L ${cx - r * 0.08} ${top} Z" fill="${accent}"/>`;
    default: return "";
  }
}

const ARCH_HAT = { detective: "cap", soldier: "cap", cowboy: "cap", noble: "ribbon", wanderer: "hood" };

function glasses(kind, cx, cy, ink, hi) {
  if (kind === "sun") return `<g><rect x="${cx - 36}" y="${cy - 16}" width="27" height="17" rx="7" fill="${ink}"/><rect x="${cx + 9}" y="${cy - 16}" width="27" height="17" rx="7" fill="${ink}"/><rect x="${cx - 9}" y="${cy - 10}" width="18" height="5" fill="${ink}"/><line x1="${cx - 36}" y1="${cy - 10}" x2="${cx - 48}" y2="${cy - 14}" stroke="${ink}" stroke-width="4"/><line x1="${cx + 36}" y1="${cy - 10}" x2="${cx + 48}" y2="${cy - 14}" stroke="${ink}" stroke-width="4"/></g>`;
  if (kind === "round") return `<g fill="${hi}" stroke="${ink}" stroke-width="4"><circle cx="${cx - 21}" cy="${cy - 8}" r="13"/><circle cx="${cx + 21}" cy="${cy - 8}" r="13"/></g><line x1="${cx - 8}" y1="${cy - 8}" x2="${cx + 8}" y2="${cy - 8}" stroke="${ink}" stroke-width="4"/><circle cx="${cx - 21}" cy="${cy - 8}" r="4.5" fill="${ink}"/><circle cx="${cx + 21}" cy="${cy - 8}" r="4.5" fill="${ink}"/>`;
  return "";
}

export function renderCharacter(character, palette) {
  const p = palette || PALETTES.midnight_blue;
  const arch = ARCHETYPES.includes(character.archetype) ? character.archetype : "wanderer";
  const rng = rngFor((character.name || "x") + arch + p.dark);

  const bg = p.dark;
  const backdrop = p.mid;
  const SKINS = ["#eccfae", "#e0b98f", "#d9a878", "#b07a52", "#8a5f42", "#f2d8b8"];
  const skin = SKINS[Math.floor(rng() * SKINS.length)];
  const skinShade = shade(skin, 0.8);
  const hair = shade(p.dark, 1.7);
  const accent = p.accent;
  const ink = "#241f1a";
  const shirtCol = [shade(p.light, 0.72), accent, shade(p.mid, 1.5)][Math.floor(rng() * 3)];
  const shirtShade = shade(shirtCol, 0.78);

  // fixed, correct proportions: big head, clear body
  const cx = 200 + (rng() - 0.5) * 12;
  const cy = 205 + (rng() - 0.5) * 6;
  const r = 68;
  const top = cy - r;
  const headBottom = cy + r;
  const shoulderY = headBottom + 34;
  const sw = 108;

  const feat = featureFor(character.name);
  const featHasHair = !!(feat && feat.hair && feat.hair !== "mustache");
  const hairKind = featHasHair ? feat.hair : HAIR_KINDS[Math.floor(rng() * HAIR_KINDS.length)];
  const hatKind = feat && feat.hat ? feat.hat : (featHasHair ? null : (rng() < 0.35 ? HAT_KINDS[Math.floor(rng() * HAT_KINDS.length)] : (ARCH_HAT[arch] || null)));
  const glassesKind = feat && feat.glasses ? feat.glasses : (rng() < 0.18 ? (rng() < 0.5 ? "round" : "sun") : null);
  const mustache = feat && feat.hair === "mustache" ? true : rng() < 0.08;
  const beard = (feat && feat.beard) || (!mustache && rng() < 0.1);
  const robe = feat && feat.robe;
  const pierce = feat && feat.pierce ? true : rng() < 0.08;
  const eyepatch = feat && feat.eyepatch;

  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${character.name || "character"}">
    <rect width="400" height="500" fill="${bg}"/>
    <circle cx="${cx}" cy="${cy + 70}" r="170" fill="${backdrop}"/>
    <rect x="${cx - 17}" y="${headBottom - 24}" width="34" height="${shoulderY + 30 - (headBottom - 24)}" fill="${skin}"/>
    <path d="M ${cx - sw} 500 L ${cx - sw} ${shoulderY + 44} Q ${cx - sw} ${shoulderY} ${cx} ${shoulderY} Q ${cx + sw} ${shoulderY} ${cx + sw} ${shoulderY + 44} L ${cx + sw} 500 Z" fill="${robe ? p.highlight : shirtCol}"/>
    <path d="M ${cx - 22} ${shoulderY + 4} L ${cx} ${shoulderY + 34} L ${cx + 22} ${shoulderY + 4} L ${cx + 14} ${shoulderY + 16} L ${cx} ${shoulderY + 40} L ${cx - 14} ${shoulderY + 16} Z" fill="${shirtShade}"/>
    <circle cx="${cx - r - 2}" cy="${cy + 8}" r="11" fill="${skin}"/>
    <circle cx="${cx + r + 2}" cy="${cy + 8}" r="11" fill="${skin}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${skin}"/>
    <path d="M ${cx - r * 0.55} ${cy - r * 0.55} A ${r} ${r} 0 0 1 ${cx + r * 0.9} ${cy + r * 0.35} L ${cx + r * 0.62} ${cy + r * 0.05} A ${r * 0.68} ${r * 0.68} 0 0 0 ${cx - r * 0.3} ${cy - r * 0.38} Z" fill="${skinShade}" opacity="0.45"/>
    ${hairShape(hairKind, cx, top, r, hair)}
    ${hatKind ? hat(hatKind, cx, top, r, hair, accent, p.highlight) : ""}
    <g>
      <ellipse cx="${cx - 22}" cy="${cy - 8}" rx="9" ry="10" fill="#ffffff"/>
      <ellipse cx="${cx + 22}" cy="${cy - 8}" rx="9" ry="10" fill="#ffffff"/>
      <circle cx="${cx - 21}" cy="${cy - 7}" r="5" fill="${ink}"/>
      <circle cx="${cx + 23}" cy="${cy - 7}" r="5" fill="${ink}"/>
      <circle cx="${cx - 23}" cy="${cy - 10}" r="1.8" fill="#ffffff"/>
      <circle cx="${cx + 21}" cy="${cy - 10}" r="1.8" fill="#ffffff"/>
    </g>
    ${glassesKind ? glasses(glassesKind, cx, cy, ink, p.highlight) : ""}
    <path d="M ${cx - 30} ${cy - 28} Q ${cx - 22} ${cy - 33} ${cx - 13} ${cy - 29} M ${cx + 13} ${cy - 29} Q ${cx + 22} ${cy - 33} ${cx + 30} ${cy - 28}" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M ${cx} ${cy + 4} Q ${cx + 7} ${cy + 16} ${cx - 2} ${cy + 22} Q ${cx - 9} ${cy + 15} ${cx} ${cy + 4} Z" fill="${skinShade}"/>
    ${mustache || beard ? `<path d="M ${cx - 18} ${cy + 30} Q ${cx} ${cy + 20} ${cx + 18} ${cy + 30} Q ${cx} ${cy + 44} ${cx - 18} ${cy + 30} Z" fill="${hair}"/>` : ""}
    <path d="M ${cx - 15} ${cy + 38} Q ${cx} ${cy + 46} ${cx + 15} ${cy + 38}" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${pierce ? `<circle cx="${cx - r - 2}" cy="${cy + 22}" r="3.5" fill="${accent}"/>` : ""}
    ${eyepatch ? `<rect x="${cx - 36}" y="${cy - 18}" width="32" height="16" rx="5" fill="${ink}"/><line x1="${cx - 32}" y1="${cy - 15}" x2="${cx + r}" y2="${cy - 30}" stroke="${ink}" stroke-width="4"/>` : ""}
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
