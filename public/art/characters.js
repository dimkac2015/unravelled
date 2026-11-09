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

/* archetype → hat / headgear, anchored to the actual head (cx, cy, headRx, headRy) */
function headgear(arch, p, cx, cy, headRx, headRy) {
  const d = p.dark, a = p.accent, h = p.highlight;
  const top = cy - headRy, brimY = cy - headRy * 0.55;
  switch (arch) {
    case "detective": return `<rect x="${cx - headRx - 14}" y="${brimY - 6}" width="${(headRx + 14) * 2}" height="12" rx="6" fill="${d}"/><rect x="${cx - 36}" y="${top - 46}" width="72" height="52" rx="6" fill="${d}"/><rect x="${cx - 36}" y="${brimY - 16}" width="72" height="10" fill="${a}"/>`;
    case "cowboy": return `<ellipse cx="${cx}" cy="${brimY}" rx="${headRx + 26}" ry="12" fill="${d}"/><path d="M ${cx - 32} ${brimY - 2} L ${cx - 24} ${top - 52} L ${cx + 24} ${top - 52} L ${cx + 32} ${brimY - 2} Z" fill="${d}"/><path d="M ${cx - 26} ${brimY - 24} L ${cx + 26} ${brimY - 24}" stroke="${a}" stroke-width="7"/>`;
    case "witch": return `<path d="M ${cx} ${top - 110} L ${cx - headRx - 6} ${brimY + 8} L ${cx + headRx + 6} ${brimY + 8} Z" fill="${d}"/><ellipse cx="${cx}" cy="${brimY + 8}" rx="${headRx + 14}" ry="10" fill="${d}"/><path d="M ${cx - headRx + 8} ${brimY - 6} L ${cx + headRx - 8} ${brimY - 6}" stroke="${a}" stroke-width="7"/>`;
    case "soldier": return `<path d="M ${cx - headRx + 2} ${brimY} L ${cx - headRx + 6} ${top - 40} L ${cx + headRx - 6} ${top - 40} L ${cx + headRx - 2} ${brimY} Z" fill="${d}"/><rect x="${cx - headRx - 12}" y="${brimY - 4}" width="${(headRx + 12) * 2}" height="10" rx="5" fill="${d}"/><circle cx="${cx}" cy="${top - 26}" r="7" fill="${a}"/>`;
    case "rebel": return `<path d="M ${cx - headRx - 4} ${cy - headRy * 0.35} Q ${cx} ${cy - headRy * 0.75} ${cx + headRx + 4} ${cy - headRy * 0.35} L ${cx + headRx + 4} ${cy - headRy * 0.1} Q ${cx} ${cy - headRy * 0.5} ${cx - headRx - 4} ${cy - headRy * 0.1} Z" fill="${a}"/>`;
    case "clown": return `<path d="M ${cx} ${top - 56} L ${cx + 14} ${brimY - 10} L ${cx - 14} ${brimY - 10} Z" fill="${a}"/><circle cx="${cx}" cy="${top - 58}" r="8" fill="${h}"/>`;
    case "scientist": return `<circle cx="${cx - 18}" cy="${cy - headRy * 0.25}" r="13" fill="none" stroke="${h}" stroke-width="5"/><circle cx="${cx + 18}" cy="${cy - headRy * 0.25}" r="13" fill="none" stroke="${h}" stroke-width="5"/><line x1="${cx - 5}" y1="${cy - headRy * 0.25}" x2="${cx + 5}" y2="${cy - headRy * 0.25}" stroke="${h}" stroke-width="5"/><path d="M ${cx - headRx + 4} ${top + 18} Q ${cx} ${top - 8} ${cx + headRx - 4} ${top + 18} L ${cx + headRx - 4} ${top + 6} Q ${cx} ${top - 18} ${cx - headRx + 4} ${top + 6} Z" fill="${d}"/>`;
    case "noble": return `<path d="M ${cx - headRx + 2} ${brimY} L ${cx - headRx + 2} ${top - 30} L ${cx - headRx / 2} ${top - 12} L ${cx} ${top - 42} L ${cx + headRx / 2} ${top - 12} L ${cx + headRx - 2} ${top - 30} L ${cx + headRx - 2} ${brimY} Z" fill="${a}"/>`;
    case "wanderer": return `<path d="M ${cx} ${top - 60} Q ${cx - headRx - 16} ${top + 10} ${cx - headRx - 6} ${cy + headRy * 0.6} L ${cx - headRx + 12} ${cy + headRy * 0.6} Q ${cx - headRx + 4} ${top + 40} ${cx} ${top + 26} Q ${cx + headRx - 4} ${top + 40} ${cx + headRx + 6} ${cy + headRy * 0.6} L ${cx + headRx + 6} ${cy + headRy * 0.6} Q ${cx + headRx + 16} ${top + 10} ${cx} ${top - 60} Z" fill="${d}"/>`;
    default: return "";
  }
}

// per-archetype clothing / accessory so every character reads differently
const COATS = {
  detective: (p, rng) => `<path d="M 104 500 L 104 408 Q 104 344 200 344 Q 296 344 296 408 L 296 500 Z" fill="${p.mid}"/>
    <path d="M 200 344 L 168 500 L 200 500 Z" fill="${p.dark}"/><path d="M 200 344 L 232 500 L 200 500 Z" fill="${p.dark}" opacity="0.7"/>
    <polygon points="200,352 188,392 200,430 212,392" fill="${p.accent}"/>`, // tie
  wanderer: (p, rng) => `<path d="M 96 500 L 110 400 Q 118 340 200 338 Q 282 340 290 400 L 304 500 Z" fill="${p.dark}"/>
    <path d="M 150 360 Q 200 386 250 360 L 244 396 Q 200 416 156 396 Z" fill="${p.mid}"/>`, // scarf
  rebel: (p, rng) => `<path d="M 108 500 L 108 410 Q 108 348 200 346 Q 292 348 292 410 L 292 500 Z" fill="${p.mid}"/>
    <line x1="150" y1="380" x2="250" y2="440" stroke="${p.accent}" stroke-width="10"/>`, // strap
  dreamer: (p, rng) => `<path d="M 100 500 L 100 412 Q 100 346 200 344 Q 300 346 300 412 L 300 500 Z" fill="${p.light}" opacity="0.9"/>
    <path d="M 200 344 L 176 500 L 200 500 Z" fill="${p.mid}" opacity="0.6"/>`,
  soldier: (p, rng) => `<path d="M 100 500 L 100 406 Q 100 342 200 340 Q 300 342 300 406 L 300 500 Z" fill="${p.dark}"/>
    <rect x="128" y="380" width="144" height="12" fill="${p.mid}"/><rect x="128" y="404" width="144" height="12" fill="${p.mid}"/>
    <circle cx="200" cy="392" r="8" fill="${p.accent}"/>`, // belt + badge
  witch: (p, rng) => `<path d="M 92 500 L 118 400 Q 130 336 200 334 Q 270 336 282 400 L 308 500 Z" fill="${p.dark}"/>
    <path d="M 200 340 L 200 500" stroke="${p.mid}" stroke-width="6"/>
    <circle cx="200" cy="430" r="10" fill="${p.accent}"/>`, // cape clasp
  clown: (p, rng) => `<path d="M 104 500 L 104 410 Q 104 346 200 344 Q 296 346 296 410 L 296 500 Z" fill="${p.light}"/>
    ${[150, 170, 190, 210, 230, 250].map(x => `<circle cx="${x}" cy="352" r="10" fill="${p.accent}"/>`).join("")}`, // ruff
  scientist: (p, rng) => `<path d="M 102 500 L 102 408 Q 102 344 200 342 Q 298 344 298 408 L 298 500 Z" fill="#e8e2d2"/>
    <line x1="200" y1="342" x2="200" y2="500" stroke="${p.mid}" stroke-width="5"/>
    <rect x="160" y="380" width="80" height="50" fill="none" stroke="${p.mid}" stroke-width="5"/>`, // pocket + glasses later
  cowboy: (p, rng) => `<path d="M 106 500 L 106 410 Q 106 348 200 346 Q 294 348 294 410 L 294 500 Z" fill="${p.mid}"/>
    <path d="M 200 346 L 186 500 L 200 500 Z" fill="${p.dark}"/>
    <rect x="192" y="360" width="16" height="10" fill="${p.accent}"/>`, // belt buckle
  noble: (p, rng) => `<path d="M 98 500 L 98 408 Q 98 342 200 340 Q 302 342 302 408 L 302 500 Z" fill="${p.dark}"/>
    <path d="M 160 360 L 200 420 L 240 360 L 240 500 L 160 500 Z" fill="${p.mid}"/>
    <circle cx="200" cy="440" r="9" fill="${p.accent}"/>`, // sash + medal
};

export function renderCharacter(character, palette) {
  const p = palette || PALETTES.midnight_blue;
  const arch = ARCHETYPES.includes(character.archetype) ? character.archetype : "wanderer";
  const rng = rngFor((character.name || "x") + arch + (palette ? palette.dark : ""));
  const d = p.dark, m = p.mid, l = p.light, a = p.accent, h = p.highlight;

  // seeded variation so no two characters look the same
  const headRx = 58 + rng() * 12, headRy = 64 + rng() * 10;
  const cx = 200 + (rng() - 0.5) * 16, cy = 232 + (rng() - 0.5) * 10;
  const lean = (rng() - 0.5) * 16;
  const flip = rng() > 0.5; // light from the right instead of the left
  const skin = rng() > 0.5 ? l : h;
  const coat = (COATS[arch] || COATS.wanderer)(p, rng);

  // angular head: lit plane + hard-shadow plane (side depends on `flip`)
  const lit = flip ? `${cx},${cy - headRy} ${cx + headRx},${cy - headRy * 0.7} ${cx + headRx * 0.9},${cy + headRy * 0.5} ${cx},${cy + headRy}` : `${cx - headRx},${cy - headRy * 0.7} ${cx},${cy - headRy} ${cx},${cy + headRy} ${cx - headRx * 0.9},${cy + headRy * 0.5}`;
  const shadow = flip ? `${cx - headRx},${cy - headRy * 0.7} ${cx},${cy - headRy} ${cx},${cy + headRy} ${cx - headRx * 0.9},${cy + headRy * 0.5}` : `${cx},${cy - headRy} ${cx + headRx},${cy - headRy * 0.7} ${cx + headRx * 0.9},${cy + headRy * 0.5} ${cx},${cy + headRy}`;
  const eyeY = cy - 4, noseY = cy + 22, mouthY = cy + headRy * 0.62;
  const head = `
    <polygon points="${lit}" fill="${skin}"/>
    <polygon points="${shadow}" fill="${d}"/>
    <polygon points="${cx},${cy + 8} ${cx + 8},${noseY} ${cx - 8},${noseY}" fill="${m}"/>
    <rect x="${cx - 28}" y="${eyeY}" width="16" height="5" fill="${d}"/>
    <rect x="${cx + 12}" y="${eyeY}" width="16" height="5" fill="${d}" opacity="0.85"/>
    <path d="M ${cx - 30} ${eyeY - 9} L ${cx - 12} ${eyeY - 6} M ${cx + 30} ${eyeY - 9} L ${cx + 12} ${eyeY - 6}" stroke="${d}" stroke-width="4" stroke-linecap="round"/>
    <rect x="${cx - 14}" y="${mouthY}" width="28" height="5" fill="${d}"/>`;

  // hair for the hatless archetypes
  const hair = (arch === "dreamer" || arch === "rebel" || arch === "clown")
    ? `<path d="M ${cx - headRx} ${cy - headRy * 0.6} Q ${cx} ${cy - headRy * 1.25} ${cx + headRx} ${cy - headRy * 0.6} L ${cx + headRx * 0.8} ${cy - headRy * 0.1} Q ${cx} ${cy - headRy * 0.75} ${cx - headRx * 0.8} ${cy - headRy * 0.1} Z" fill="${d}"/>`
    : "";

  const lightPoly = flip
    ? `<polygon points="400,0 150,0 360,500 400,500" fill="${h}" opacity="0.07"/><rect x="256" y="30" width="120" height="150" fill="${h}" opacity="0.10"/>`
    : `<polygon points="0,0 250,0 40,500 0,500" fill="${h}" opacity="0.07"/><rect x="24" y="30" width="120" height="150" fill="${h}" opacity="0.10"/>`;
  const shadowPoly = flip
    ? `<polygon points="280,500 0,500 0,408 164,462" fill="${d}" opacity="0.9"/>`
    : `<polygon points="120,500 400,500 400,408 236,462" fill="${d}" opacity="0.9"/>`;

  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${character.name || "character"}">
    <rect width="400" height="500" fill="${d}"/>
    ${lightPoly}
    ${shadowPoly}
    <g transform="translate(${lean},0)">
      ${coat}
      <rect x="${cx - 16}" y="${cy + headRy - 20}" width="32" height="34" fill="${skin}"/>
      <polygon points="${cx - 16},${cy + headRy - 20} ${cx + 16},${cy + headRy - 20} ${cx},${cy + headRy + 8}" fill="${d}"/>
      ${head}
      ${hair}
      ${headgear(arch, p, cx, cy, headRx, headRy)}
      <polyline points="${flip ? cx + headRx * 0.9 : cx - headRx * 0.9},${cy + headRy * 0.5} ${cx + (flip ? -40 : 40)},${cy + headRy + 60} ${cx + (flip ? 96 : -96)},${cy + headRy + 150}" fill="none" stroke="${a}" stroke-width="4" opacity="0.9"/>
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
