// flat, thick-outlined character portraits & film posters in the style of "This Is The Police",
// plus simple line icons for the era page

const OUTLINE = "#1c1a17";

function svgOpen(w, h) {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">`;
}

function hairPath(style) {
  const h = style.hair;
  switch (style.hairStyle) {
    case "braids": return `<path d="M 62 78 Q 50 130 58 168 L 74 168 Q 66 128 76 92 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 138 78 Q 150 130 142 168 L 126 168 Q 134 128 124 92 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 60 60 Q 100 18 140 60 L 140 84 Q 100 52 60 84 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "bob": return `<path d="M 58 96 Q 52 40 100 34 Q 148 40 142 96 L 128 96 Q 132 62 100 56 Q 68 62 72 96 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 58 96 L 66 128 L 78 96 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 142 96 L 134 128 L 122 96 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "mohawk": return `<path d="M 88 40 Q 100 8 112 40 L 112 62 Q 100 50 88 62 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 62 74 Q 100 44 138 74 L 138 88 Q 100 62 62 88 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "long": return `<path d="M 58 80 Q 54 36 100 32 Q 146 36 142 80 L 146 150 Q 128 158 122 140 L 124 84 Q 100 60 76 84 L 78 140 Q 72 158 54 150 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "buzz": return `<path d="M 62 72 Q 100 40 138 72 L 138 84 Q 100 58 62 84 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "flat": return `<path d="M 60 74 Q 100 44 140 74 L 140 82 Q 100 56 60 82 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "curly": return `<g fill="${h}" stroke="${OUTLINE}" stroke-width="4">${[70, 88, 106, 124, 138].map((x, i) => `<circle cx="${x}" cy="${62 - (i % 2) * 10}" r="13"/>`).join("")}</g>
      <path d="M 62 78 Q 100 56 138 78 L 138 90 Q 100 68 62 90 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "ears": return `<circle cx="64" cy="52" r="15" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/><circle cx="136" cy="52" r="15" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 62 76 Q 100 50 138 76 L 138 88 Q 100 66 62 88 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "ponytail": return `<path d="M 60 78 Q 100 42 140 78 L 140 90 Q 100 62 60 90 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 136 70 Q 158 96 148 132 Q 138 128 140 100 Q 138 84 130 76 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "bun": return `<circle cx="100" cy="36" r="15" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 60 78 Q 100 46 140 78 L 140 90 Q 100 62 60 90 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "sidepart": return `<path d="M 60 80 Q 64 42 100 38 Q 142 42 140 80 L 128 78 Q 126 58 96 56 Q 70 60 70 84 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "mustache": return `<path d="M 62 76 Q 100 48 138 76 L 138 88 Q 100 64 62 88 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>
      <path d="M 78 112 Q 100 100 122 112 Q 100 122 78 112 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
    default: return `<path d="M 62 74 Q 100 44 138 74 L 138 86 Q 100 60 62 86 Z" fill="${h}" stroke="${OUTLINE}" stroke-width="4"/>`;
  }
}

function hatPath(style) {
  const c = style.hat === "redhat" ? "#c23b2e" : style.hat === "cap" ? "#3a6ea5" : style.hat === "beanie" ? "#5a4a7a" : style.hat === "bucket" ? "#8a7a4a" : "#2a2a33";
  switch (style.hat) {
    case "cap": return `<path d="M 58 62 Q 100 26 142 62 Z" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/><rect x="52" y="58" width="112" height="12" rx="6" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/><rect x="96" y="20" width="10" height="8" fill="${c}" stroke="${OUTLINE}" stroke-width="3"/>`;
    case "redhat": return `<path d="M 62 58 Q 100 20 138 58 L 138 66 L 62 66 Z" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/><rect x="54" y="62" width="92" height="12" rx="6" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/><circle cx="100" cy="22" r="7" fill="#f4efe3" stroke="${OUTLINE}" stroke-width="3"/>`;
    case "beanie": return `<path d="M 60 64 Q 62 30 100 28 Q 138 30 140 64 Z" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/><rect x="56" y="60" width="88" height="14" rx="7" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "bucket": return `<path d="M 66 52 Q 100 34 134 52 L 134 60 L 66 60 Z" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/><path d="M 48 60 L 152 60 L 142 74 L 58 74 Z" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "hood": return `<path d="M 52 96 Q 44 30 100 24 Q 156 30 148 96 Q 124 70 100 70 Q 76 70 52 96 Z" fill="${c}" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "ribbon": return `<path d="M 84 44 L 100 34 L 116 44 L 108 52 L 92 52 Z" fill="#c23b5a" stroke="${OUTLINE}" stroke-width="3"/>`;
    default: return "";
  }
}

export function renderPortrait(style) {
  const s = style;
  const eyes = s.glasses
    ? `<circle cx="80" cy="104" r="13" fill="none" stroke="${OUTLINE}" stroke-width="4"/><circle cx="120" cy="104" r="13" fill="none" stroke="${OUTLINE}" stroke-width="4"/><line x1="93" y1="104" x2="107" y2="104" stroke="${OUTLINE}" stroke-width="4"/><circle cx="80" cy="104" r="3.5" fill="${OUTLINE}"/><circle cx="120" cy="104" r="3.5" fill="${OUTLINE}"/>`
    : `<circle cx="80" cy="104" r="4.5" fill="${OUTLINE}"/><circle cx="120" cy="104" r="4.5" fill="${OUTLINE}"/>`;
  return `${svgOpen(200, 240)}
    <rect width="200" height="240" fill="${s.bg}"/>
    <circle cx="100" cy="120" r="86" fill="${s.bg}" stroke="${OUTLINE}" stroke-width="0" opacity="0.0"/>
    <path d="M 40 240 L 40 210 Q 40 168 100 168 Q 160 168 160 210 L 160 240 Z" fill="${s.shirt}" stroke="${OUTLINE}" stroke-width="5"/>
    <rect x="88" y="146" width="24" height="26" fill="${s.skin}" stroke="${OUTLINE}" stroke-width="4"/>
    <path d="M 58 150 Q 56 84 100 84 Q 144 84 142 150 Q 142 176 100 176 Q 58 176 58 150 Z" fill="${s.skin}" stroke="${OUTLINE}" stroke-width="5"/>
    ${hairPath(s)}
    ${hatPath(s)}
    ${eyes}
    <path d="M 100 108 L 96 124 L 106 126" fill="none" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 86 140 Q 100 146 114 140" fill="none" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- film posters (same flat style) ---------- */
const POSTERS = {
  paris: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/><circle cx="150" cy="120" r="60" fill="${p.sun}"/><path d="M 150 90 L 138 250 L 162 250 Z" fill="none" stroke="${OUTLINE}" stroke-width="6"/><path d="M 128 200 L 172 200 M 122 250 L 178 250" stroke="${OUTLINE}" stroke-width="6"/><path d="M 100 340 L 200 340 L 200 420 L 100 420 Z" fill="${p.land}"/><circle cx="60" cy="300" r="16" fill="${p.accent}"/><circle cx="240" cy="310" r="12" fill="${p.accent}"/>`,
  lalaland: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/><circle cx="150" cy="150" r="70" fill="${p.sun}" opacity="0.9"/><path d="M 0 300 Q 80 250 160 300 T 300 290 L 300 420 L 0 420 Z" fill="${p.land}"/><path d="M 0 350 Q 100 310 200 350 T 300 345 L 300 420 L 0 420 Z" fill="${p.land2}"/><circle cx="70" cy="90" r="3" fill="${p.ink}"/><circle cx="220" cy="70" r="2.5" fill="${p.ink}"/><circle cx="250" cy="120" r="2" fill="${p.ink}"/>`,
  road: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/><circle cx="220" cy="90" r="40" fill="${p.sun}"/><path d="M 0 260 L 130 200 L 170 200 L 300 260 L 300 420 L 0 420 Z" fill="${p.land}"/><path d="M 150 210 L 150 420" stroke="${p.sun}" stroke-width="6" stroke-dasharray="18 16"/><path d="M 40 420 L 110 300 L 190 300 L 260 420 Z" fill="${p.land2}"/>`,
  hotel: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/><rect x="90" y="120" width="120" height="240" fill="#e8b4a0" stroke="${OUTLINE}" stroke-width="5"/><rect x="70" y="100" width="160" height="24" fill="${p.accent}" stroke="${OUTLINE}" stroke-width="5"/>${[150, 180, 210, 240, 270, 300, 330].map(y => `<rect x="115" y="${y}" width="24" height="26" fill="${p.land2}"/><rect x="161" y="${y}" width="24" height="26" fill="${p.land2}"/>`).join("")}<rect x="0" y="360" width="300" height="60" fill="${p.land}"/>`,
  drive: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/><rect x="0" y="250" width="300" height="170" fill="${p.land2}"/>${[...Array(40)].map((_, i) => `<rect x="${(i * 37) % 300}" y="${20 + (i * 53) % 200}" width="3" height="3" fill="${p.accent}" opacity="${0.4 + (i % 5) * 0.12}"/>`).join("")}<g transform="translate(70,290)"><path d="M 0 30 L 20 8 L 120 -2 L 160 18 L 160 34 L 0 34 Z" fill="${p.accent}" stroke="${OUTLINE}" stroke-width="4"/><circle cx="40" cy="36" r="12" fill="${OUTLINE}"/><circle cx="125" cy="36" r="12" fill="${OUTLINE}"/></g><line x1="0" y1="330" x2="300" y2="330" stroke="${p.sun}" stroke-width="3" opacity="0.5"/>`,
  summer: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/><circle cx="150" cy="170" r="90" fill="none" stroke="${p.land2}" stroke-width="8"/><g stroke="${p.land2}" stroke-width="5">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="150" y1="170" x2="${150 + 90 * Math.cos(a * Math.PI / 180)}" y2="${170 + 90 * Math.sin(a * Math.PI / 180)}"/>`).join("")}</g><circle cx="150" cy="170" r="14" fill="${p.accent}"/><rect x="0" y="330" width="300" height="90" fill="${p.land}"/>`,
  ghibli: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/><circle cx="70" cy="80" r="34" fill="${p.sun}"/>${[120, 200, 260].map((x, i) => `<circle cx="${x}" cy="${60 + i * 30}" r="${18 - i * 4}" fill="${p.land2}" opacity="0.8"/>`).join("")}<path d="M 0 300 L 300 300 L 300 420 L 0 420 Z" fill="${p.land}"/><rect x="60" y="240" width="180" height="46" rx="8" fill="${p.land2}" stroke="${OUTLINE}" stroke-width="4"/>${[80, 120, 160, 200].map(x => `<rect x="${x}" y="250" width="24" height="18" fill="${p.sun}"/>`).join("")}<circle cx="90" cy="290" r="10" fill="${OUTLINE}"/><circle cx="210" cy="290" r="10" fill="${OUTLINE}"/><line x1="0" y1="312" x2="300" y2="312" stroke="${OUTLINE}" stroke-width="4"/>`,
  bench: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/><circle cx="230" cy="80" r="36" fill="${p.sun}"/><path d="M 0 300 Q 150 260 300 300 L 300 420 L 0 420 Z" fill="${p.land}"/>${[[60, 320], [100, 310], [240, 330]].map(([x, y]) => `<g><rect x="${x - 16}" y="${y - 26}" width="32" height="8" fill="#6a4a2a" stroke="${OUTLINE}" stroke-width="3"/><line x1="${x - 10}" y1="${y - 18}" x2="${x - 10}" y2="${y + 14}" stroke="${OUTLINE}" stroke-width="4"/><line x1="${x + 10}" y1="${y - 18}" x2="${x + 10}" y2="${y + 14}" stroke="${OUTLINE}" stroke-width="4"/></g>`).join("")}<circle cx="150" cy="220" r="30" fill="${p.land2}"/><rect x="146" y="240" width="8" height="50" fill="${p.land2}"/>`,
  mountain: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/><circle cx="150" cy="110" r="44" fill="${p.sun}"/><path d="M -10 340 L 90 180 L 150 280 L 210 160 L 310 340 Z" fill="${p.land}"/><path d="M 210 160 L 188 200 L 232 200 Z" fill="${p.sun}"/><path d="M 90 180 L 74 210 L 106 210 Z" fill="${p.sun}" opacity="0.9"/><rect x="0" y="340" width="300" height="80" fill="${p.land2}"/>`,
  space: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>${[...Array(50)].map((_, i) => `<circle cx="${(i * 61) % 300}" cy="${(i * 97) % 420}" r="${1 + (i % 3) * 0.7}" fill="${p.ink}" opacity="${0.5 + (i % 4) * 0.12}"/>`).join("")}<circle cx="150" cy="180" r="70" fill="${p.land}" stroke="${p.accent}" stroke-width="6"/><ellipse cx="150" cy="180" rx="120" ry="26" fill="none" stroke="${p.accent}" stroke-width="5" transform="rotate(-18 150 180)"/><rect x="120" y="330" width="60" height="90" fill="${p.land2}" stroke="${OUTLINE}" stroke-width="4"/>`,
  diner: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/><circle cx="60" cy="70" r="28" fill="${p.sun}"/><rect x="40" y="180" width="220" height="110" rx="14" fill="${p.accent}" stroke="${OUTLINE}" stroke-width="5"/><rect x="60" y="205" width="80" height="50" fill="${p.sky[1]}" stroke="${OUTLINE}" stroke-width="4"/><rect x="160" y="205" width="80" height="50" fill="${p.sky[1]}" stroke="${OUTLINE}" stroke-width="4"/><rect x="30" y="160" width="240" height="22" rx="10" fill="${p.land2}" stroke="${OUTLINE}" stroke-width="4"/><rect x="0" y="290" width="300" height="130" fill="${p.land}"/><line x1="0" y1="320" x2="300" y2="320" stroke="${p.sun}" stroke-width="3" opacity="0.5"/>`,
};

export function renderPoster(film, palette) {
  const p = palette;
  const draw = POSTERS[film.poster] || POSTERS.mountain;
  const title = film.name.split(" (")[0].toUpperCase();
  return `${svgOpen(300, 420)}
    ${draw(p)}
    <rect x="0" y="368" width="300" height="52" fill="${OUTLINE}" opacity="0.92"/>
    <text x="150" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="${title.length > 14 ? 15 : 19}" fill="#f4efe3" letter-spacing="1">${title}</text>
  </svg>`;
}

/* ---------- era icons (line icons, cream stroke) ---------- */
const ICONS = {
  leaf: `<path d="M 20 80 Q 20 20 80 20 Q 80 80 20 80 Z M 20 80 Q 50 55 78 24" fill="none" stroke-width="5" stroke-linecap="round"/>`,
  pick: `<path d="M 20 30 Q 50 10 80 30 M 50 20 L 50 84 M 36 84 L 64 84" fill="none" stroke-width="5" stroke-linecap="round"/>`,
  rocket: `<path d="M 50 12 Q 66 34 62 62 L 38 62 Q 34 34 50 12 Z M 38 62 L 24 78 M 62 62 L 76 78 M 44 62 L 44 74 L 56 74 L 56 62" fill="none" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="40" r="6" fill="none" stroke-width="4"/>`,
  sax: `<path d="M 42 12 L 52 12 L 58 62 Q 58 76 44 78 Q 32 76 34 66 M 58 62 L 70 70" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="40" cy="20" r="2.5"/><circle cx="46" cy="30" r="2.5"/><circle cx="50" cy="42" r="2.5"/>`,
  crown: `<path d="M 18 66 L 14 30 L 34 46 L 50 22 L 66 46 L 86 30 L 82 66 Z M 18 74 L 82 74" fill="none" stroke-width="5" stroke-linejoin="round"/>`,
  vinyl: `<circle cx="50" cy="50" r="34" fill="none" stroke-width="5"/><circle cx="50" cy="50" r="6" fill="none" stroke-width="4"/><path d="M 30 30 A 28 28 0 0 1 70 30" fill="none" stroke-width="3" opacity="0.7"/>`,
  skyline: `<path d="M 12 84 L 12 44 L 26 44 L 26 30 L 40 30 L 40 54 L 52 54 L 52 20 L 66 20 L 66 48 L 80 48 L 80 36 L 90 36 L 90 84" fill="none" stroke-width="5" stroke-linejoin="round"/>`,
  cactus: `<path d="M 50 84 L 50 22 M 50 46 L 34 46 L 34 30 M 50 56 L 66 56 L 66 40 M 36 84 L 64 84" fill="none" stroke-width="5" stroke-linecap="round"/>`,
  castle: `<path d="M 20 84 L 20 40 L 30 40 L 30 30 L 38 30 L 38 40 L 46 40 L 46 30 L 54 30 L 54 40 L 62 40 L 62 30 L 70 30 L 70 40 L 80 40 L 80 84 M 44 84 L 44 62 Q 50 54 56 62 L 56 84" fill="none" stroke-width="5" stroke-linejoin="round"/>`,
  mask: `<path d="M 18 36 Q 50 24 82 36 Q 82 62 50 74 Q 18 62 18 36 Z M 32 46 Q 38 42 44 46 M 56 46 Q 62 42 68 46 M 42 60 Q 50 66 58 60" fill="none" stroke-width="5" stroke-linecap="round"/>`,
  neon: `<path d="M 30 14 L 30 60 Q 30 76 46 76 L 58 76 Q 72 76 72 62 L 72 14 M 38 14 L 38 60" fill="none" stroke-width="5" stroke-linecap="round"/><path d="M 20 86 L 82 86" stroke-width="4" stroke-linecap="round" opacity="0.6"/>`,
  flower: `<circle cx="50" cy="42" r="8" fill="none" stroke-width="4"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${50 + 22 * Math.cos(a * Math.PI / 180)}" cy="${42 + 22 * Math.sin(a * Math.PI / 180)}" rx="10" ry="6" fill="none" stroke-width="4" transform="rotate(${a} ${50 + 22 * Math.cos(a * Math.PI / 180)} ${42 + 22 * Math.sin(a * Math.PI / 180)})"/>`).join("")}<path d="M 50 62 L 50 86 M 50 74 Q 62 70 66 62" fill="none" stroke-width="4" stroke-linecap="round"/>`,
};

export function renderEraIcon(name, color = "#f4efe3") {
  const body = ICONS[name] || ICONS.leaf;
  return `${svgOpen(100, 100)}<g stroke="${color}">${body}</g></svg>`;
}
