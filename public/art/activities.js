// ACTIVITIES library (Stage 2) — 12 illustrations of activities a playlist fits,
// in the same "This Is the Police" noir style as pages 3-4: flat 2D vector, hard-edged
// shadows, dark base colours + ONE warm accent, 4-5 muted colours, one light source,
// long hard shadow, simple dark background. viewBox 0 0 400 500.

import { PALETTES } from "./scenes.js";

export const ACTIVITIES = [
  "night_drive", "cooking", "reading_by_window", "running", "walking_in_rain", "road_trip",
  "cleaning_to_music", "painting", "fishing", "coffee_in_cafe", "stargazing", "working_late",
  "hiking", "baking", "gaming", "journaling", "gardening", "photography",
  "dancing", "studying", "biking", "swimming", "board_games", "karaoke",
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

function frame(p, body) {
  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img">
    <rect width="400" height="500" fill="${p.dark}"/>
    <polygon points="0,0 250,0 60,500 0,500" fill="${p.highlight}" opacity="0.08"/>
    <polygon points="120,500 400,500 400,420 240,468" fill="${p.dark}" opacity="0.9"/>
    ${body}
  </svg>`;
}

const FN = {
  night_drive(p) {
    return `<g fill="${p.mid}">
      <path d="M 60 330 L 100 290 L 250 278 L 330 318 L 348 352 L 60 352 Z"/>
      <path d="M 120 288 L 158 264 L 236 258 L 282 300 L 120 300 Z" fill="${p.light}" opacity="0.5"/>
      <circle cx="130" cy="356" r="22" fill="${p.dark}"/><circle cx="130" cy="356" r="9" fill="${p.highlight}" opacity="0.5"/>
      <circle cx="288" cy="356" r="22" fill="${p.dark}"/><circle cx="288" cy="356" r="9" fill="${p.highlight}" opacity="0.5"/>
    </g>
    <polygon points="348,330 400,310 400,352 348,344" fill="${p.accent}" opacity="0.85"/>
    <rect x="0" y="392" width="400" height="8" fill="${p.light}" opacity="0.5"/>
    <rect x="40" y="392" width="60" height="8" fill="${p.accent}"/>`;
  },
  cooking(p) {
    return `<rect x="70" y="300" width="260" height="120" fill="${p.mid}"/>
    <rect x="90" y="280" width="150" height="26" rx="8" fill="${p.dark}"/>
    <rect x="104" y="216" width="122" height="70" rx="10" fill="${p.light}"/>
    <rect x="96" y="210" width="138" height="10" rx="5" fill="${p.dark}"/>
    <path d="M 140 200 Q 132 184 140 170 M 165 200 Q 157 180 166 164 M 190 200 Q 184 186 192 172" stroke="${p.highlight}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>
    <circle cx="300" cy="330" r="26" fill="${p.accent}"/>
    <rect x="60" y="420" width="280" height="10" fill="${p.dark}"/>`;
  },
  reading_by_window(p) {
    return `<rect x="40" y="60" width="150" height="220" fill="${p.highlight}" opacity="0.16"/>
    <rect x="40" y="60" width="150" height="220" fill="none" stroke="${p.light}" stroke-width="8"/>
    <line x1="115" y1="60" x2="115" y2="280" stroke="${p.light}" stroke-width="6"/>
    <path d="M 230 420 L 230 300 Q 230 260 270 260 Q 310 260 310 300 L 310 420 Z" fill="${p.mid}"/>
    <circle cx="270" cy="228" r="34" fill="${p.light}"/>
    <path d="M 236 268 Q 270 250 304 268 L 304 276 Q 270 260 236 276 Z" fill="${p.dark}"/>
    <path d="M 180 320 L 240 310 L 240 336 L 180 346 Z" fill="${p.accent}"/>
    <path d="M 240 310 L 300 320 L 300 346 L 240 336 Z" fill="${p.highlight}"/>`;
  },
  running(p) {
    return `<g fill="${p.mid}">
      <circle cx="210" cy="180" r="30"/>
      <path d="M 200 210 L 170 300 L 140 380 L 168 388 L 200 310 L 236 380 L 264 372 L 226 296 L 214 210 Z"/>
      <path d="M 196 226 L 140 260 L 148 282 L 206 250 Z"/>
      <path d="M 212 224 L 268 200 L 276 222 L 220 246 Z"/>
    </g>
    <path d="M 90 240 L 130 240 M 80 280 L 124 280 M 96 320 L 134 320" stroke="${p.accent}" stroke-width="7" stroke-linecap="round"/>
    <rect x="0" y="420" width="400" height="10" fill="${p.light}" opacity="0.4"/>`;
  },
  walking_in_rain(p) {
    return `<g stroke="${p.light}" stroke-width="4" opacity="0.5">
      ${[60, 110, 160, 210, 260, 310, 360].map(x => `<line x1="${x}" y1="60" x2="${x - 18}" y2="150"/>`).join("")}
    </g>
    <path d="M 130 190 Q 200 120 270 190 Z" fill="${p.accent}"/>
    <line x1="200" y1="190" x2="200" y2="230" stroke="${p.dark}" stroke-width="6"/>
    <g fill="${p.mid}">
      <circle cx="200" cy="248" r="24"/>
      <path d="M 188 272 L 176 380 L 164 430 L 186 434 L 200 360 L 214 434 L 236 430 L 224 380 L 212 272 Z"/>
    </g>
    <ellipse cx="200" cy="452" rx="90" ry="10" fill="${p.light}" opacity="0.3"/>`;
  },
  road_trip(p) {
    return `<circle cx="310" cy="120" r="40" fill="${p.accent}"/>
    <path d="M -20 320 L 170 180 L 240 260 L 300 190 L 420 320 Z" fill="${p.mid}"/>
    <path d="M 170 180 L 148 210 L 192 210 Z" fill="${p.highlight}"/>
    <path d="M 120 500 L 185 320 L 215 320 L 280 500 Z" fill="${p.light}" opacity="0.85"/>
    <path d="M 196 330 L 204 500" stroke="${p.dark}" stroke-width="8" stroke-dasharray="26 22"/>`;
  },
  cleaning_to_music(p) {
    return `<circle cx="310" cy="150" r="52" fill="${p.dark}"/>
    <circle cx="310" cy="150" r="52" fill="none" stroke="${p.accent}" stroke-width="6"/>
    <circle cx="310" cy="150" r="10" fill="${p.accent}"/>
    <path d="M 250 150 Q 310 120 370 150 M 250 150 Q 310 180 370 150" stroke="${p.light}" stroke-width="3" fill="none" opacity="0.5"/>
    <g fill="${p.mid}">
      <circle cx="150" cy="220" r="24"/>
      <path d="M 142 244 L 128 340 L 116 420 L 138 424 L 152 350 L 168 424 L 190 420 L 176 340 L 162 244 Z"/>
    </g>
    <line x1="176" y1="260" x2="230" y2="400" stroke="${p.light}" stroke-width="7" stroke-linecap="round"/>
    <path d="M 224 396 L 250 388 L 256 402 L 230 412 Z" fill="${p.accent}"/>
    <rect x="60" y="430" width="70" height="40" rx="8" fill="${p.mid}"/>`;
  },
  painting(p) {
    return `<rect x="150" y="120" width="130" height="160" fill="${p.light}"/>
    <rect x="150" y="120" width="130" height="160" fill="none" stroke="${p.dark}" stroke-width="8"/>
    <path d="M 165 250 Q 200 190 240 230 Q 260 250 268 220 L 268 265 L 165 265 Z" fill="${p.accent}"/>
    <line x1="215" y1="280" x2="215" y2="430" stroke="${p.mid}" stroke-width="10"/>
    <line x1="170" y1="300" x2="150" y2="440" stroke="${p.mid}" stroke-width="8"/>
    <line x1="260" y1="300" x2="280" y2="440" stroke="${p.mid}" stroke-width="8"/>
    <ellipse cx="120" cy="380" rx="34" ry="22" fill="${p.mid}"/>
    <circle cx="108" cy="374" r="6" fill="${p.accent}"/><circle cx="124" cy="384" r="6" fill="${p.highlight}"/><circle cx="132" cy="370" r="6" fill="${p.light}"/>`;
  },
  fishing(p) {
    return `<rect x="0" y="340" width="400" height="160" fill="${p.mid}"/>
    <path d="M 0 340 Q 100 330 200 340 T 400 338" stroke="${p.highlight}" stroke-width="5" fill="none" opacity="0.6"/>
    <rect x="40" y="240" width="180" height="14" fill="${p.light}"/>
    <rect x="60" y="254" width="10" height="90" fill="${p.light}"/><rect x="190" y="254" width="10" height="90" fill="${p.light}"/>
    <g fill="${p.dark}"><circle cx="120" cy="200" r="20"/><path d="M 112 220 L 104 300 L 96 340 L 116 342 L 124 292 L 136 342 L 154 340 L 140 300 L 130 220 Z"/></g>
    <path d="M 138 210 Q 240 150 330 260" stroke="${p.light}" stroke-width="4" fill="none"/>
    <line x1="330" y1="260" x2="330" y2="330" stroke="${p.light}" stroke-width="3"/>
    <circle cx="330" cy="336" r="8" fill="${p.accent}"/>`;
  },
  coffee_in_cafe(p) {
    return `<rect x="30" y="50" width="160" height="200" fill="${p.highlight}" opacity="0.14"/>
    <rect x="30" y="50" width="160" height="200" fill="none" stroke="${p.light}" stroke-width="7"/>
    <rect x="120" y="330" width="240" height="14" fill="${p.mid}"/>
    <ellipse cx="220" cy="300" rx="70" ry="14" fill="${p.mid}"/>
    <path d="M 160 240 L 280 240 L 268 300 L 172 300 Z" fill="${p.light}"/>
    <path d="M 280 252 Q 312 256 306 280 Q 300 296 276 292" fill="none" stroke="${p.light}" stroke-width="8"/>
    <path d="M 200 220 Q 192 204 200 190 M 232 220 Q 224 200 234 186" stroke="${p.highlight}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>
    <circle cx="330" cy="300" r="12" fill="${p.accent}"/>`;
  },
  stargazing(p) {
    const rng = rngFor("stars");
    return `<g>${[...Array(40)].map(() => `<circle cx="${rng() * 400}" cy="${rng() * 260}" r="${1 + rng() * 2.4}" fill="${p.highlight}" opacity="${0.4 + rng() * 0.6}"/>`).join("")}</g>
    <circle cx="320" cy="90" r="30" fill="${p.highlight}"/>
    <rect x="0" y="380" width="400" height="120" fill="${p.mid}"/>
    <g fill="${p.dark}">
      <circle cx="150" cy="330" r="22"/>
      <path d="M 128 352 Q 150 336 190 344 L 260 372 L 250 388 L 170 366 Q 140 372 128 352 Z"/>
    </g>
    <line x1="190" y1="344" x2="280" y2="240" stroke="${p.light}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="284" cy="236" r="12" fill="${p.accent}"/>`;
  },
  working_late(p) {
    return `<rect x="60" y="300" width="280" height="14" fill="${p.mid}"/>
    <polygon points="150,300 230,180 290,300" fill="${p.accent}" opacity="0.22"/>
    <rect x="176" y="230" width="10" height="70" fill="${p.mid}"/>
    <ellipse cx="181" cy="230" rx="34" ry="12" fill="${p.mid}"/>
    <rect x="150" y="268" width="120" height="34" rx="6" fill="${p.light}"/>
    <rect x="160" y="276" width="100" height="6" fill="${p.dark}" opacity="0.6"/>
    <circle cx="330" cy="130" r="34" fill="none" stroke="${p.light}" stroke-width="6"/>
    <path d="M 330 130 L 330 108 M 330 130 L 346 138" stroke="${p.light}" stroke-width="5" stroke-linecap="round"/>
    <rect x="70" y="270" width="60" height="32" fill="${p.mid}"/>`;
  },
  hiking(p) {
    return `<circle cx="310" cy="110" r="36" fill="${p.accent}"/>
    <path d="M -20 340 L 150 150 L 240 290 L 300 210 L 420 340 Z" fill="${p.mid}"/>
    <path d="M 150 150 L 124 190 L 176 190 Z" fill="${p.highlight}"/>
    <g fill="${p.dark}"><circle cx="200" cy="330" r="18"/><path d="M 192 348 L 184 430 L 176 470 L 194 472 L 202 400 L 212 472 L 228 470 L 218 430 L 210 348 Z"/></g>
    <line x1="214" y1="360" x2="248" y2="440" stroke="${p.light}" stroke-width="6" stroke-linecap="round"/>
    <rect x="188" y="360" width="26" height="34" rx="6" fill="${p.accent}"/>`;
  },
  baking(p) {
    return `<rect x="80" y="300" width="240" height="110" fill="${p.mid}"/>
    <rect x="96" y="316" width="90" height="60" rx="8" fill="${p.dark}"/>
    <ellipse cx="255" cy="270" rx="46" ry="14" fill="${p.light}"/>
    <path d="M 220 262 Q 255 230 290 262 L 290 270 L 220 270 Z" fill="${p.accent}"/>
    <path d="M 130 300 Q 122 284 130 270 M 150 300 Q 144 280 152 266" stroke="${p.highlight}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.7"/>
    <circle cx="120" cy="180" r="26" fill="${p.light}"/><path d="M 108 172 Q 120 160 132 172" stroke="${p.dark}" stroke-width="4" fill="none"/>`;
  },
  gaming(p) {
    return `<rect x="110" y="220" width="180" height="100" rx="10" fill="${p.dark}"/>
    <rect x="122" y="232" width="156" height="76" rx="6" fill="${p.mid}"/>
    <polygon points="160,250 190,270 160,290" fill="${p.accent}"/>
    <rect x="215" y="252" width="40" height="8" fill="${p.highlight}"/><rect x="215" y="268" width="28" height="8" fill="${p.highlight}" opacity="0.6"/>
    <path d="M 150 320 L 130 380 M 250 320 L 270 380 M 200 320 L 200 390" stroke="${p.light}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="330" cy="140" r="8" fill="${p.accent}"/><circle cx="60" cy="160" r="6" fill="${p.highlight}" opacity="0.7"/>`;
  },
  journaling(p) {
    return `<rect x="40" y="60" width="140" height="200" fill="${p.highlight}" opacity="0.14"/>
    <rect x="230" y="200" width="110" height="150" rx="8" fill="${p.light}"/>
    <line x1="246" y1="226" x2="324" y2="226" stroke="${p.mid}" stroke-width="5"/>
    <line x1="246" y1="246" x2="324" y2="246" stroke="${p.mid}" stroke-width="5"/>
    <line x1="246" y1="266" x2="300" y2="266" stroke="${p.mid}" stroke-width="5"/>
    <line x1="246" y1="286" x2="324" y2="286" stroke="${p.accent}" stroke-width="5"/>
    <path d="M 320 320 L 352 288 L 360 296 L 328 328 Z" fill="${p.accent}"/>`;
  },
  gardening(p) {
    return `<rect x="0" y="380" width="400" height="120" fill="${p.mid}"/>
    <g fill="${p.dark}"><circle cx="120" cy="300" r="34"/><circle cx="90" cy="330" r="22"/><circle cx="152" cy="332" r="20"/>
    <rect x="114" y="330" width="12" height="60"/></g>
    <g fill="${p.dark}"><circle cx="290" cy="320" r="28"/><rect x="285" y="344" width="10" height="46"/></g>
    ${[80, 180, 240, 340].map(x => `<circle cx="${x}" cy="${400 + (x % 40)}" r="6" fill="${p.accent}"/>`).join("")}
    <path d="M 200 380 L 200 300 M 200 320 L 230 300 M 200 330 L 172 312" stroke="${p.light}" stroke-width="6" stroke-linecap="round"/>`;
  },
  photography(p) {
    return `<rect x="130" y="200" width="140" height="90" rx="12" fill="${p.mid}"/>
    <circle cx="200" cy="245" r="30" fill="${p.dark}"/><circle cx="200" cy="245" r="18" fill="${p.accent}"/>
    <rect x="230" y="182" width="34" height="20" rx="4" fill="${p.dark}"/>
    <g fill="${p.dark}"><circle cx="200" cy="180" r="16"/><path d="M 190 196 L 182 300 L 172 340 L 192 344 L 200 280 L 210 344 L 230 340 L 220 300 L 212 196 Z"/></g>
    <line x1="222" y1="230" x2="260" y2="180" stroke="${p.light}" stroke-width="6" stroke-linecap="round"/>`;
  },
  dancing(p) {
    return `<g fill="${p.mid}">
      <circle cx="200" cy="170" r="26"/>
      <path d="M 192 196 L 160 260 L 120 300 L 136 316 L 180 276 L 200 320 L 224 316 L 214 268 L 226 200 Z"/>
      <path d="M 190 210 L 130 240 L 122 258 L 186 232 Z"/>
      <path d="M 214 206 L 280 180 L 288 198 L 222 224 Z"/>
    </g>
    <ellipse cx="200" cy="400" rx="150" ry="14" fill="${p.accent}" opacity="0.25"/>
    <circle cx="310" cy="120" r="7" fill="${p.accent}"/><circle cx="90" cy="100" r="5" fill="${p.highlight}" opacity="0.7"/>`;
  },
  studying(p) {
    return `<rect x="60" y="320" width="280" height="14" fill="${p.mid}"/>
    <rect x="90" y="240" width="70" height="90" fill="${p.light}"/><rect x="96" y="248" width="58" height="6" fill="${p.mid}"/>
    <rect x="96" y="262" width="58" height="6" fill="${p.mid}"/><rect x="96" y="276" width="40" height="6" fill="${p.accent}"/>
    <path d="M 250 320 L 250 250 Q 250 236 264 236 L 300 236 Q 314 236 314 250 L 314 320 Z" fill="${p.dark}"/>
    <circle cx="282" cy="286" r="10" fill="${p.highlight}"/>
    <polygon points="150,320 210,220 260,320" fill="${p.accent}" opacity="0.18"/>
    <circle cx="330" cy="130" r="30" fill="none" stroke="${p.light}" stroke-width="5" opacity="0.6"/>`;
  },
  biking(p) {
    return `<g fill="none" stroke="${p.light}" stroke-width="8"><circle cx="110" cy="360" r="46"/><circle cx="290" cy="360" r="46"/></g>
    <path d="M 110 360 L 180 280 L 250 360 L 290 360 M 180 280 L 200 360 L 110 360" stroke="${p.mid}" stroke-width="8" fill="none" stroke-linejoin="round"/>
    <g fill="${p.dark}"><circle cx="215" cy="200" r="20"/><path d="M 208 220 L 190 300 L 250 300 L 240 220 Z"/><path d="M 196 240 L 150 260 M 236 236 L 282 250" stroke="${p.dark}" stroke-width="10" stroke-linecap="round"/></g>
    <path d="M 60 300 L 340 300" stroke="${p.accent}" stroke-width="5" opacity="0.5" stroke-dasharray="20 16"/>`;
  },
  swimming(p) {
    return `<rect x="0" y="300" width="400" height="200" fill="${p.mid}"/>
    ${[330, 360, 390, 420, 450].map((y, i) => `<path d="M -20 ${y} q 50 ${i % 2 ? 14 : -14} 100 0 t 100 0 t 100 0 t 100 0 t 100 0" stroke="${p.light}" stroke-width="5" fill="none" opacity="${0.7 - i * 0.1}"/>`).join("")}
    <g fill="${p.dark}"><circle cx="200" cy="240" r="22"/><path d="M 120 280 Q 200 250 280 280 L 280 296 Q 200 268 120 296 Z"/></g>
    <path d="M 150 210 Q 200 190 250 210" stroke="${p.accent}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  },
  board_games(p) {
    return `<rect x="80" y="260" width="240" height="120" rx="10" fill="${p.mid}"/>
    <rect x="96" y="276" width="60" height="88" rx="6" fill="${p.light}"/>
    <g fill="${p.accent}"><circle cx="126" cy="300" r="6"/><circle cx="126" cy="324" r="6"/><circle cx="126" cy="348" r="6"/></g>
    <rect x="180" y="276" width="60" height="88" rx="6" fill="${p.dark}"/>
    <path d="M 210 300 L 226 316 L 210 332 L 194 316 Z" fill="${p.highlight}"/>
    <circle cx="290" cy="300" r="12" fill="${p.accent}"/><circle cx="316" cy="330" r="12" fill="${p.light}"/>`;
  },
  karaoke(p) {
    return `<rect x="60" y="120" width="280" height="180" rx="10" fill="${p.dark}"/>
    <rect x="76" y="136" width="248" height="110" rx="6" fill="${p.mid}"/>
    <path d="M 100 200 L 100 170 Q 100 160 108 164 L 130 176 Q 138 180 138 190 L 138 200 Z" fill="${p.accent}"/>
    <line x1="119" y1="176" x2="119" y2="210" stroke="${p.accent}" stroke-width="6"/>
    <path d="M 200 180 Q 215 160 230 180 T 260 180" stroke="${p.highlight}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="320" cy="200" r="20" fill="${p.light}"/><line x1="320" y1="220" x2="320" y2="260" stroke="${p.light}" stroke-width="6"/>
    <g fill="${p.dark}"><circle cx="200" cy="330" r="22"/><path d="M 192 352 L 180 440 L 172 470 L 192 474 L 202 400 L 214 474 L 232 470 L 222 440 L 210 352 Z"/></g>`;
  },
};

export function renderActivity(sceneId, palette) {
  const p = palette || PALETTES.midnight_blue;
  const fn = FN[sceneId] || FN.working_late;
  return frame(p, fn(p, rngFor(sceneId)));
}
