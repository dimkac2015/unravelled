// Scene library — Stage 2. All 15 scenes, flat vector, minimalistic but not empty.
// Each scene_<id>(palette, rng) returns an SVG string, viewBox 0 0 800 1000,
// preserveAspectRatio="xMidYMid slice" so it fills phones and desktops.
// Palette = { dark, mid, light, accent, highlight } — only these 5 colours are used.

export const SCENES = [
  "ocean_ship", "river", "forest", "autumn_woods", "desert", "mountains", "volcano",
  "night_city", "snowfield", "meadow_summer", "thunderstorm", "space", "swamp",
  "sea_cliffs", "lavender_fields",
];

export const PALETTES = {
  ember:        { dark: "#140b08", mid: "#3d1410", light: "#7a2c1a", accent: "#ff5a26", highlight: "#ffb37a" },
  deep_forest:  { dark: "#0c1f14", mid: "#1d4a30", light: "#3f7a52", accent: "#d9a441", highlight: "#f2d98c" },
  golden_hour:  { dark: "#4a2f14", mid: "#a96f2c", light: "#e0a94e", accent: "#ffd76a", highlight: "#fff3d6" },
  midnight_blue:{ dark: "#070b1d", mid: "#141c3a", light: "#2c3a6b", accent: "#6f8fff", highlight: "#c9d4ff" },
  neon_night:   { dark: "#0a0714", mid: "#241a3f", light: "#4a2f7a", accent: "#ff3ea5", highlight: "#5ef2ff" },
  dusty_sand:   { dark: "#3a2a14", mid: "#8a6a3a", light: "#c9a05e", accent: "#ff8c42", highlight: "#ffe8c9" },
  ice:          { dark: "#101c26", mid: "#2c4a5f", light: "#6b93a8", accent: "#bfe6ff", highlight: "#f2fbff" },
  storm_grey:   { dark: "#14161c", mid: "#2c3038", light: "#4a515c", accent: "#e8c34c", highlight: "#9fb4c9" },
  violet_dusk:  { dark: "#170f24", mid: "#33204d", light: "#5c3a7a", accent: "#c98aff", highlight: "#ffd9a0" },
  sea_teal:     { dark: "#062a2e", mid: "#0f4a50", light: "#2e7d78", accent: "#ffd76a", highlight: "#c9f2e4" },
};

export const ICONS = [
  "top_hat", "pickaxe", "rocket", "gramophone", "sailing_ship", "castle",
  "lantern", "steam_train", "crown", "compass", "key", "hourglass",
];

/* tiny deterministic rng so each scene is stable */
function makeRng(seed) {
  let a = 2166136261 >>> 0;
  for (const c of String(seed)) { a ^= c.charCodeAt(0); a = Math.imul(a, 16777619); }
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wrap(inner) {
  return `<svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
}

function skyGrad(p, uid, horizon = 0.62) {
  return `<defs><linearGradient id="sky${uid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${p.dark}"/><stop offset="${horizon}" stop-color="${p.mid}"/>
    <stop offset="${horizon}" stop-color="${p.light}"/><stop offset="1" stop-color="${p.light}"/>
  </linearGradient></defs><rect width="800" height="1000" fill="url(#sky${uid})"/>`;
}

function sun(p, rng, x, y, r, color) {
  return `<circle cx="${x ?? rng() * 800}" cy="${y ?? 180 + rng() * 160}" r="${r ?? 46 + rng() * 22}" fill="${color || p.accent}"/>
          <circle cx="${x ?? 0}" cy="${y ?? 0}" r="0" fill="none"/>`;
}

function moon(p, rng, x, y, r) {
  const cx = x ?? 560 + rng() * 180, cy = y ?? 120 + rng() * 120, rr = r ?? 52;
  return `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${p.highlight}"/><circle cx="${cx - rr * 0.35}" cy="${cy - rr * 0.2}" r="${rr * 0.88}" fill="${p.dark}"/>`;
}

function stars(p, rng, n = 70) {
  let s = "";
  for (let i = 0; i < n; i++) s += `<circle cx="${rng() * 800}" cy="${rng() * 520}" r="${0.8 + rng() * 2.2}" fill="${p.highlight}" opacity="${0.4 + rng() * 0.6}"/>`;
  return s;
}

function birds(p, rng, n = 3) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = 120 + rng() * 560, y = 140 + rng() * 220, w = 10 + rng() * 8;
    s += `<path d="M ${x - w} ${y} Q ${x} ${y - w * 0.9} ${x} ${y} Q ${x} ${y - w * 0.9} ${x + w} ${y}" fill="none" stroke="${p.dark}" stroke-width="3.5" stroke-linecap="round"/>`;
  }
  return s;
}

function waves(p, rng, y0, n, color, gap = 46) {
  let s = "";
  for (let r = 0; r < n; r++) {
    const y = y0 + r * gap;
    let d = `M -20 ${y}`;
    for (let x = -20; x <= 840; x += 90) d += ` q 45 ${rng() * 16 - 8} 90 0`;
    s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="4" opacity="${0.9 - r * 0.16}"/>`;
  }
  return s;
}

function tree(rng, x, y, s, fill) {
  const h = 90 * s;
  return `<g><rect x="${x - 5 * s}" y="${y - h * 0.35}" width="${10 * s}" height="${h * 0.35}" fill="${fill}"/>
    <path d="M ${x} ${y - h} L ${x - 30 * s} ${y - h * 0.4} L ${x + 30 * s} ${y - h * 0.4} Z" fill="${fill}"/>
    <path d="M ${x} ${y - h * 1.3} L ${x - 22 * s} ${y - h * 0.75} L ${x + 22 * s} ${y - h * 0.75} Z" fill="${fill}"/></g>`;
}

function ridge(rng, y, amp, fill) {
  let d = `M -20 ${y + 80}`;
  for (let x = -20; x <= 840; x += 130) d += ` Q ${x + 65} ${y - amp * (0.5 + rng())} ${x + 130} ${y + rng() * 40}`;
  return `<path d="${d} L 820 1020 L -20 1020 Z" fill="${fill}"/>`;
}

function ship(p, rng, x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M -70 0 L 70 0 L 46 32 L -46 32 Z" fill="${p.dark}"/>
    <line x1="0" y1="0" x2="0" y2="-120" stroke="${p.dark}" stroke-width="6"/>
    <path d="M 4 -116 Q 56 -80 4 -22 Z" fill="${p.highlight}"/>
    <path d="M -4 -108 Q -48 -76 -4 -28 Z" fill="${p.light}"/>
    <path d="M -80 -6 L -96 -24 L -74 -20 Z" fill="${p.accent}"/>
  </g>`;
}

/* ---------------- the 15 scenes ---------------- */

const SCENE_FNS = {
  ocean_ship(p, rng, uid) {
    let s = skyGrad(p, uid) + sun(p, rng, 590, 210, 58);
    s += `<rect x="0" y="620" width="800" height="380" fill="${p.mid}"/>`;
    s += waves(p, rng, 650, 5, p.highlight);
    s += ridge(rng, 620, 26, p.light).replace(/fill="[^"]+"/, `fill="${p.light}" opacity="0.5"`);
    s += ship(p, rng, 380, 610, 1.15);
    s += birds(p, rng, 4);
    return wrap(s);
  },
  river(p, rng, uid) {
    let s = skyGrad(p, uid, 0.5) + sun(p, rng, 200, 170, 50);
    s += ridge(rng, 480, 90, p.light);
    s += ridge(rng, 580, 110, p.mid);
    s += `<path d="M 360 560 C 300 660, 520 720, 420 1000 L 600 1000 C 700 760, 480 660, 560 560 Z" fill="${p.highlight}" opacity="0.9"/>`;
    s += `<path d="M 420 600 C 390 680, 520 740, 470 940" fill="none" stroke="${p.mid}" stroke-width="5" opacity="0.5"/>`;
    s += ridge(rng, 760, 120, p.dark);
    for (let i = 0; i < 6; i++) s += tree(rng, 80 + rng() * 240 + (i % 2) * 460, 640 + rng() * 160, 0.6 + rng() * 0.6, p.dark);
    return wrap(s);
  },
  forest(p, rng, uid) {
    let s = skyGrad(p, uid, 0.45) + `<circle cx="560" cy="200" r="120" fill="${p.highlight}" opacity="0.25"/><circle cx="560" cy="200" r="56" fill="${p.highlight}"/>`;
    s += ridge(rng, 520, 70, p.light);
    for (let i = 0; i < 10; i++) s += tree(rng, rng() * 800, 560 + rng() * 60, 0.7 + rng() * 0.7, p.mid);
    s += ridge(rng, 640, 90, p.mid);
    for (let i = 0; i < 7; i++) s += tree(rng, rng() * 800, 720 + rng() * 180, 1.1 + rng() * 0.9, p.dark);
    for (let i = 0; i < 4; i++) s += `<path d="M ${rng() * 700 + 50} 1000 L ${rng() * 700 + 50} 420 L ${rng() * 700 + 90} 1000 Z" fill="${p.highlight}" opacity="0.07"/>`;
    return wrap(s);
  },
  autumn_woods(p, rng, uid) {
    let s = skyGrad(p, uid, 0.5) + sun(p, rng, 240, 180, 54, p.highlight);
    s += ridge(rng, 500, 80, p.light);
    for (let i = 0; i < 9; i++) s += tree(rng, rng() * 800, 560 + rng() * 80, 0.8 + rng() * 0.6, p.accent);
    s += ridge(rng, 660, 100, p.mid);
    for (let i = 0; i < 6; i++) s += tree(rng, rng() * 800, 760 + rng() * 160, 1.2 + rng() * 0.8, p.dark);
    for (let i = 0; i < 40; i++) s += `<circle cx="${rng() * 800}" cy="${700 + rng() * 280}" r="${3 + rng() * 4}" fill="${p.accent}" opacity="0.8"/>`;
    return wrap(s);
  },
  desert(p, rng, uid) {
    let s = skyGrad(p, uid, 0.55) + sun(p, rng, 400, 240, 90, p.highlight);
    s += `<path d="M -20 560 Q 200 470 420 560 T 820 540 L 820 1020 L -20 1020 Z" fill="${p.light}"/>`;
    s += `<path d="M -20 680 Q 260 590 520 680 T 820 660 L 820 1020 L -20 1020 Z" fill="${p.mid}"/>`;
    s += `<path d="M -20 840 Q 300 760 560 850 T 820 830 L 820 1020 L -20 1020 Z" fill="${p.dark}"/>`;
    for (let i = 0; i < 3; i++) {
      const x = 120 + rng() * 560, y = 700 + rng() * 220;
      s += `<g transform="translate(${x},${y})" fill="${p.dark}"><rect x="-7" y="-70" width="14" height="70" rx="6"/><path d="M -7 -46 L -34 -46 L -34 -18" stroke="${p.dark}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M 7 -56 L 32 -56 L 32 -30" stroke="${p.dark}" stroke-width="12" fill="none" stroke-linecap="round"/></g>`;
    }
    s += `<circle cx="620" cy="620" r="10" fill="${p.accent}"/>`;
    return wrap(s);
  },
  mountains(p, rng, uid) {
    let s = skyGrad(p, uid, 0.55) + sun(p, rng, 620, 170, 46);
    s += `<path d="M -20 640 L 180 380 L 330 560 L 470 340 L 640 600 L 820 420 L 820 1020 L -20 1020 Z" fill="${p.light}"/>`;
    for (const [x, y] of [[180, 380], [470, 340], [820, 420]]) s += `<path d="M ${x} ${y} L ${x - 42} ${y + 70} L ${x + 42} ${y + 70} Z" fill="${p.highlight}"/>`;
    s += `<path d="M -20 760 L 240 520 L 420 720 L 600 540 L 820 760 L 820 1020 L -20 1020 Z" fill="${p.mid}"/>`;
    s += `<path d="M -20 900 Q 400 830 820 900 L 820 1020 L -20 1020 Z" fill="${p.dark}"/>`;
    s += birds(p, rng, 3);
    return wrap(s);
  },
  volcano(p, rng, uid) {
    let s = skyGrad(p, uid, 0.6) + `<circle cx="400" cy="300" r="190" fill="${p.accent}" opacity="0.22"/><circle cx="400" cy="300" r="70" fill="${p.accent}" opacity="0.8"/>`;
    s += `<path d="M -20 1020 L 250 480 L 340 620 L 400 430 L 470 620 L 560 500 L 820 1020 Z" fill="${p.mid}"/>`;
    s += `<path d="M 366 452 L 400 430 L 434 452 L 418 478 L 382 478 Z" fill="${p.accent}"/>`;
    s += `<path d="M 400 430 C 396 500, 420 560, 404 640 C 430 700, 410 780, 428 860" fill="none" stroke="${p.accent}" stroke-width="16" stroke-linecap="round" opacity="0.9"/>`;
    for (let i = 0; i < 6; i++) s += `<circle cx="${400 + rng() * 60 - 30}" cy="${400 - i * 34}" r="${10 + rng() * 12}" fill="${p.dark}" opacity="${0.85 - i * 0.12}"/>`;
    s += `<path d="M -20 900 Q 400 840 820 900 L 820 1020 L -20 1020 Z" fill="${p.dark}"/>`;
    for (let i = 0; i < 16; i++) s += `<circle cx="${260 + rng() * 280}" cy="${500 + rng() * 260}" r="${2 + rng() * 3}" fill="${p.highlight}"/>`;
    return wrap(s);
  },
  night_city(p, rng, uid) {
    let s = skyGrad(p, uid, 0.7) + stars(p, rng, 90) + moon(p, rng);
    s += `<rect x="0" y="640" width="800" height="360" fill="${p.mid}"/>`;
    for (let x = 0; x < 800; x += 70 + rng() * 50) {
      const w = 50 + rng() * 46, h = 160 + rng() * 320, y = 640 - h;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.dark}"/>`;
      for (let wy = y + 16; wy < 620; wy += 30) for (let wx = x + 9; wx < x + w - 10; wx += 20)
        if (rng() > 0.55) s += `<rect x="${wx}" y="${wy}" width="9" height="13" fill="${p.accent}" opacity="${0.5 + rng() * 0.5}"/>`;
    }
    s += `<rect x="0" y="960" width="800" height="40" fill="${p.dark}"/>`;
    return wrap(s);
  },
  snowfield(p, rng, uid) {
    let s = skyGrad(p, uid, 0.55) + sun(p, rng, 610, 180, 44, p.highlight);
    s += `<path d="M -20 620 Q 400 560 820 620 L 820 1020 L -20 1020 Z" fill="${p.highlight}"/>`;
    s += `<path d="M -20 780 Q 400 720 820 790 L 820 1020 L -20 1020 Z" fill="${p.light}"/>`;
    s += `<path d="M -20 920 Q 400 870 820 930 L 820 1020 L -20 1020 Z" fill="${p.highlight}"/>`;
    for (let i = 0; i < 4; i++) s += tree(rng, 90 + rng() * 620, 700 + rng() * 120, 0.5 + rng() * 0.4, p.mid);
    for (let i = 0; i < 8; i++) s += `<ellipse cx="${200 + rng() * 400}" cy="${820 + rng() * 140}" rx="${14 + rng() * 10}" ry="5" fill="${p.mid}" opacity="0.6"/>`;
    return wrap(s);
  },
  meadow_summer(p, rng, uid) {
    let s = skyGrad(p, uid, 0.5) + sun(p, rng, 400, 210, 80, p.highlight);
    s += `<path d="M -20 600 Q 200 520 420 600 T 820 580 L 820 1020 L -20 1020 Z" fill="${p.light}"/>`;
    s += `<path d="M -20 740 Q 260 660 520 740 T 820 720 L 820 1020 L -20 1020 Z" fill="${p.mid}"/>`;
    s += `<path d="M -20 900 Q 400 830 820 900 L 820 1020 L -20 1020 Z" fill="${p.dark}"/>`;
    for (let i = 0; i < 30; i++) s += `<circle cx="${rng() * 800}" cy="${640 + rng() * 340}" r="${3 + rng() * 5}" fill="${p.accent}" opacity="0.9"/>`;
    s += tree(rng, 660, 700, 1.2, p.dark);
    s += birds(p, rng, 3);
    return wrap(s);
  },
  thunderstorm(p, rng, uid) {
    let s = skyGrad(p, uid, 0.75);
    for (let i = 0; i < 5; i++) s += `<ellipse cx="${rng() * 800}" cy="${120 + rng() * 220}" rx="${180 + rng() * 120}" ry="${50 + rng() * 30}" fill="${p.light}" opacity="0.35"/>`;
    s += `<path d="M 430 300 L 360 520 L 420 520 L 340 780 L 470 480 L 405 480 L 480 300 Z" fill="${p.highlight}"/>`;
    for (let i = 0; i < 40; i++) s += `<line x1="${rng() * 800}" y1="${300 + rng() * 200}" x2="${rng() * 800 - 30}" y2="${480 + rng() * 500}" stroke="${p.light}" stroke-width="2.5" opacity="0.5"/>`;
    s += `<rect x="0" y="860" width="800" height="140" fill="${p.mid}"/>`;
    s += waves(p, rng, 880, 3, p.highlight);
    return wrap(s);
  },
  space(p, rng, uid) {
    let s = `<rect width="800" height="1000" fill="${p.dark}"/>` + stars(p, rng, 140);
    s += `<circle cx="400" cy="430" r="150" fill="${p.mid}"/><path d="M 270 390 Q 400 350 530 400 Q 400 440 270 390 Z" fill="${p.light}" opacity="0.7"/>`;
    s += `<ellipse cx="400" cy="430" rx="250" ry="52" fill="none" stroke="${p.accent}" stroke-width="14" transform="rotate(-16 400 430)"/>`;
    s += `<circle cx="640" cy="180" r="26" fill="${p.light}"/>`;
    s += `<g transform="translate(180,720) rotate(-10)"><rect x="0" y="0" width="70" height="26" rx="6" fill="${p.light}"/><rect x="26" y="-12" width="20" height="12" fill="${p.light}"/><circle cx="16" cy="26" r="5" fill="${p.accent}"/><circle cx="54" cy="26" r="5" fill="${p.accent}"/></g>`;
    for (let i = 0; i < 6; i++) s += `<path d="M ${rng() * 800} ${rng() * 1000} l 0 0" stroke="${p.highlight}" stroke-width="3" opacity="0.8"/>`;
    return wrap(s);
  },
  swamp(p, rng, uid) {
    let s = skyGrad(p, uid, 0.65) + moon(p, rng, 200, 160, 44);
    s += `<rect x="0" y="700" width="800" height="300" fill="${p.mid}"/>`;
    s += waves(p, rng, 730, 4, p.light);
    for (let i = 0; i < 6; i++) {
      const x = 60 + rng() * 680, y = 700 + rng() * 60, h = 150 + rng() * 160;
      s += `<g transform="translate(${x},${y})" stroke="${p.dark}" fill="none" stroke-linecap="round">
        <path d="M 0 0 C ${rng() * 20 - 10} -${h * 0.5}, ${rng() * 30 - 15} -${h * 0.8}, ${rng() * 16 - 8} -${h}" stroke-width="12"/>
        <path d="M ${rng() * 6 - 3} -${h * 0.55} l ${20 + rng() * 30} -${10 + rng() * 20}" stroke-width="7"/>
        <path d="M ${rng() * 6 - 3} -${h * 0.75} l ${-30 - rng() * 25} -${10 + rng() * 18}" stroke-width="7"/>
      </g>`;
    }
    for (let i = 0; i < 10; i++) s += `<circle cx="${rng() * 800}" cy="${560 + rng() * 300}" r="${3 + rng() * 3}" fill="${p.accent}" opacity="0.9"/>`;
    s += `<rect x="0" y="640" width="800" height="60" fill="${p.highlight}" opacity="0.12"/>`;
    return wrap(s);
  },
  sea_cliffs(p, rng, uid) {
    let s = skyGrad(p, uid, 0.55) + sun(p, rng, 200, 200, 60);
    s += `<rect x="0" y="640" width="800" height="360" fill="${p.mid}"/>`;
    s += waves(p, rng, 680, 5, p.highlight);
    s += `<path d="M 480 1020 L 520 700 L 600 560 L 680 640 L 720 1020 Z" fill="${p.dark}"/>`;
    s += `<path d="M 520 700 L 600 560 L 680 640 L 660 660 L 600 590 L 550 720 Z" fill="${p.light}"/>`;
    s += `<path d="M 500 720 Q 600 660 700 720 L 690 740 Q 600 690 510 740 Z" fill="${p.accent}" opacity="0.85"/>`;
    s += birds(p, rng, 4);
    return wrap(s);
  },
  lavender_fields(p, rng, uid) {
    let s = skyGrad(p, uid, 0.5) + sun(p, rng, 400, 330, 70, p.highlight);
    s += ridge(rng, 560, 50, p.light);
    s += `<path d="M -20 620 L 820 600 L 820 1020 L -20 1020 Z" fill="${p.mid}"/>`;
    for (let i = 0; i < 9; i++) {
      const y = 660 + i * 42;
      s += `<path d="M -20 ${y} Q 400 ${y - 26} 820 ${y - 10}" fill="none" stroke="${p.dark}" stroke-width="26" opacity="${0.25 + i * 0.08}"/>`;
      for (let x = 0; x < 800; x += 26) s += `<circle cx="${x + rng() * 10}" cy="${y - 8 + rng() * 8}" r="4.5" fill="${p.accent}"/>`;
    }
    s += tree(rng, 130, 600, 0.9, p.dark);
    s += birds(p, rng, 2);
    return wrap(s);
  },
};

export function renderScene(sceneId, palette) {
  const p = palette || PALETTES.golden_hour;
  const fn = SCENE_FNS[sceneId] || SCENE_FNS.meadow_summer;
  const rng = makeRng(sceneId + "|" + JSON.stringify(p));
  return fn(p, rng, Math.abs([...sceneId].reduce((a, c) => a + c.charCodeAt(0), 0)) % 9999);
}

/* ---------------- era icons (Stage 3): 12 simple line icons ---------------- */

const ICON_FNS = {
  top_hat: `<rect x="28" y="52" width="44" height="34" rx="4"/><rect x="14" y="82" width="72" height="10" rx="5"/><rect x="28" y="70" width="44" height="8" opacity="0.5"/>`,
  pickaxe: `<path d="M 20 34 Q 50 12 80 34 M 50 24 L 50 88 M 36 88 L 64 88" fill="none"/>`,
  rocket: `<path d="M 50 10 Q 66 32 62 60 L 38 60 Q 34 32 50 10 Z M 38 60 L 24 76 M 62 60 L 76 76 M 44 60 L 44 72 L 56 72 L 56 60" fill="none"/><circle cx="50" cy="38" r="6" fill="none"/>`,
  gramophone: `<path d="M 30 78 L 58 78 L 58 66 Q 78 60 80 34 Q 60 44 44 50 L 30 56 Z M 36 78 L 36 88 L 52 88 L 52 78" fill="none"/>`,
  sailing_ship: `<path d="M 18 70 L 82 70 L 70 86 L 30 86 Z M 50 66 L 50 18 M 52 20 Q 74 36 52 62 M 48 24 Q 30 38 48 60" fill="none"/>`,
  castle: `<path d="M 22 88 L 22 40 L 32 40 L 32 30 L 40 30 L 40 40 L 48 40 L 48 30 L 56 30 L 56 40 L 64 40 L 64 30 L 72 30 L 72 40 L 78 40 L 78 88 M 44 88 L 44 64 Q 50 56 56 64 L 56 88" fill="none"/>`,
  lantern: `<path d="M 38 20 L 62 20 M 50 20 L 50 28 M 34 28 L 66 28 L 70 66 L 30 66 Z M 40 66 L 40 78 Q 50 86 60 78 L 60 66" fill="none"/><circle cx="50" cy="47" r="7"/>`,
  steam_train: `<rect x="16" y="52" width="46" height="26" rx="4" fill="none"/><path d="M 62 60 L 80 60 L 80 78 L 62 78 Z M 22 78 L 22 88 M 56 78 L 56 88 M 70 78 L 70 88" fill="none"/><circle cx="30" cy="66" r="4"/><circle cx="48" cy="66" r="4"/><path d="M 30 44 Q 24 34 30 26 Q 36 34 32 44 M 44 44 Q 40 32 46 24" fill="none"/>`,
  crown: `<path d="M 18 68 L 14 30 L 34 46 L 50 22 L 66 46 L 86 30 L 82 68 Z M 18 78 L 82 78" fill="none"/>`,
  compass: `<circle cx="50" cy="50" r="34" fill="none"/><path d="M 50 26 L 58 50 L 50 74 L 42 50 Z M 26 50 L 50 42 L 74 50 L 50 58 Z" fill="none" opacity="0.6"/>`,
  key: `<circle cx="34" cy="40" r="14" fill="none"/><path d="M 44 50 L 78 84 M 66 72 L 76 62 M 74 80 L 84 70" fill="none"/>`,
  hourglass: `<path d="M 28 16 L 72 16 M 28 84 L 72 84 M 32 16 Q 32 50 50 50 Q 68 50 68 16 M 32 84 Q 32 50 50 50 Q 68 50 68 84" fill="none"/>`,
};

export function renderIcon(iconId, color = "#f4efe3") {
  const body = ICON_FNS[iconId] || ICON_FNS.lantern;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
