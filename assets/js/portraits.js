// character portraits & film posters in the style of "This Is The Police":
// flat solid fills, one uniform thick ink outline, big head, dot eyes, simple nose,
// geometric solid-colour background — graphic-novel minimal, no gradients, no shading

const INK = "#20242e";
const W = 6; // uniform line weight

function svgOpen(w, h) {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" shape-rendering="geometricPrecision">`;
}

function hairShape(style) {
  const h = style.hair;
  switch (style.hairStyle) {
    case "braids": return `<path d="M 66 96 Q 52 150 62 196 L 82 196 Q 72 148 82 106 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 174 96 Q 188 150 178 196 L 158 196 Q 168 148 158 106 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 62 84 Q 120 34 178 84 L 178 112 Q 120 72 62 112 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "bob": return `<path d="M 58 130 Q 50 48 120 42 Q 190 48 182 130 L 160 130 Q 166 80 120 74 Q 74 80 80 130 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 58 130 L 72 178 L 92 128 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 182 130 L 168 178 L 148 128 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "mohawk": return `<path d="M 102 46 Q 120 8 138 46 L 138 78 Q 120 62 102 78 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 64 92 Q 120 56 176 92 L 176 112 Q 120 80 64 112 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "long": return `<path d="M 60 100 Q 54 44 120 40 Q 186 44 180 100 L 188 190 Q 164 202 154 178 L 158 108 Q 120 80 82 108 L 86 178 Q 76 202 52 190 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "buzz": return `<path d="M 64 88 Q 120 52 176 88 L 176 106 Q 120 74 64 106 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "flat": return `<path d="M 62 90 Q 120 56 178 90 L 178 102 Q 120 70 62 102 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "curly": return `<g fill="${h}" stroke="${INK}" stroke-width="${W}">${[76, 100, 124, 148, 170].map((x, i) => `<circle cx="${x}" cy="${76 - (i % 2) * 14}" r="17"/>`).join("")}</g>
      <path d="M 64 96 Q 120 72 176 96 L 176 110 Q 120 88 64 110 Z" fill="${h}" stroke="${INK}" stroke-width="${W}"/>`;
    case "ears": return `<circle cx="72" cy="66" r="19" fill="${h}" stroke="${INK}" stroke-width="${W}"/><circle cx="168" cy="66" r="19" fill="${h}" stroke="${INK}" stroke-width="${W}"/>
      <path d="M 64 92 Q 120 58 176 92 L 176 108 Q 120 80 64 108 Z" fill="${h}" stroke="${INK}" stroke-width="${W}"/>`;
    case "ponytail": return `<path d="M 62 94 Q 120 56 178 94 L 178 110 Q 120 82 62 110 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 172 84 Q 200 120 186 168 Q 172 162 176 124 Q 174 102 162 90 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "bun": return `<circle cx="120" cy="44" r="19" fill="${h}" stroke="${INK}" stroke-width="${W}"/>
      <path d="M 62 92 Q 120 54 178 92 L 178 108 Q 120 80 62 108 Z" fill="${h}" stroke="${INK}" stroke-width="${W}"/>`;
    case "sidepart": return `<path d="M 62 96 Q 68 50 120 46 Q 180 50 178 96 L 162 94 Q 160 68 118 66 Q 80 70 80 100 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "mustache": return `<path d="M 64 90 Q 120 58 176 90 L 176 104 Q 120 76 64 104 Z" fill="${h}" stroke="${INK}" stroke-width="${W}"/>
      <path d="M 90 158 Q 120 142 150 158 Q 120 172 90 158 Z" fill="${h}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    default: return `<path d="M 64 90 Q 120 54 176 90 L 176 106 Q 120 76 64 106 Z" fill="${h}" stroke="${INK}" stroke-width="${W}"/>`;
  }
}

function hatShape(style) {
  const c = style.hatColor || "#2e3a52";
  switch (style.hat) {
    case "cap": return `<path d="M 60 78 Q 120 30 180 78 Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <rect x="52" y="72" width="150" height="16" rx="8" fill="${c}" stroke="${INK}" stroke-width="${W}"/>`;
    case "redhat": return `<path d="M 64 74 Q 120 26 176 74 L 176 84 L 64 84 Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <rect x="52" y="80" width="136" height="16" rx="8" fill="${c}" stroke="${INK}" stroke-width="${W}"/>
      <circle cx="120" cy="30" r="9" fill="#f4efe3" stroke="${INK}" stroke-width="4"/>`;
    case "beanie": return `<path d="M 62 80 Q 66 36 120 34 Q 174 36 178 80 Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <rect x="56" y="76" width="128" height="18" rx="9" fill="${c}" stroke="${INK}" stroke-width="${W}"/>`;
    case "bucket": return `<path d="M 72 62 Q 120 40 168 62 L 168 72 L 72 72 Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
      <path d="M 54 72 L 186 72 L 172 92 L 68 92 Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "hood": return `<path d="M 54 118 Q 44 36 120 30 Q 196 36 186 118 Q 152 84 120 84 Q 88 84 54 118 Z" fill="${c}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>`;
    case "ribbon": return `<path d="M 96 56 L 120 42 L 144 56 L 132 68 L 108 68 Z" fill="#a34a5e" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    default: return "";
  }
}

export function renderPortrait(style) {
  const s = style;
  const eyes = s.glasses
    ? `<g fill="none" stroke="${INK}" stroke-width="5">
        <rect x="86" y="118" width="26" height="24" rx="6"/><rect x="128" y="118" width="26" height="24" rx="6"/>
        <line x1="112" y1="130" x2="128" y2="130"/>
      </g>
      <circle cx="99" cy="130" r="4" fill="${INK}"/><circle cx="141" cy="130" r="4" fill="${INK}"/>`
    : `<circle cx="99" cy="130" r="5.5" fill="${INK}"/><circle cx="141" cy="130" r="5.5" fill="${INK}"/>`;
  return `${svgOpen(240, 300)}
    <rect width="240" height="300" fill="${s.bg}"/>
    <circle cx="120" cy="140" r="104" fill="${s.bgShape || s.bg}"/>
    <path d="M 28 300 L 28 272 Q 28 232 120 232 Q 212 232 212 272 L 212 300 Z" fill="${s.shirt}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
    <rect x="106" y="204" width="28" height="34" fill="${s.skin}" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="120" cy="136" rx="64" ry="70" fill="${s.skin}" stroke="${INK}" stroke-width="${W}"/>
    ${hairShape(s)}
    ${hatShape(s)}
    ${eyes}
    <path d="M 120 140 L 111 160 Q 120 167 130 160 Z" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 102 184 Q 120 191 138 184" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- film posters: bold flat geometric scenes, same ink ---------- */
const POSTERS = {
  paris: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/>
    <circle cx="150" cy="118" r="56" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <path d="M 150 88 L 136 258 L 164 258 Z" fill="none" stroke="${INK}" stroke-width="7"/>
    <path d="M 124 208 L 176 208 M 116 258 L 184 258" stroke="${INK}" stroke-width="7"/>
    <rect x="90" y="330" width="120" height="90" fill="${p.land}" stroke="${INK}" stroke-width="5"/>
    <circle cx="52" cy="300" r="18" fill="${p.accent}" stroke="${INK}" stroke-width="4"/>
    <circle cx="248" cy="312" r="13" fill="${p.accent}" stroke="${INK}" stroke-width="4"/>`,
  lalaland: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    <circle cx="150" cy="150" r="72" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <path d="M 0 300 Q 80 250 160 300 T 300 290 L 300 420 L 0 420 Z" fill="${p.land}" stroke="${INK}" stroke-width="5"/>
    <path d="M 0 352 Q 100 312 200 352 T 300 346 L 300 420 L 0 420 Z" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>
    <circle cx="66" cy="86" r="4" fill="${p.ink}"/><circle cx="226" cy="64" r="3.5" fill="${p.ink}"/><circle cx="254" cy="120" r="3" fill="${p.ink}"/>`,
  road: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/>
    <circle cx="224" cy="86" r="40" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <path d="M 0 262 L 128 202 L 172 202 L 300 262 L 300 420 L 0 420 Z" fill="${p.land}" stroke="${INK}" stroke-width="5"/>
    <path d="M 150 212 L 150 420" stroke="${p.sun}" stroke-width="7" stroke-dasharray="20 18"/>
    <path d="M 36 420 L 108 302 L 192 302 L 264 420 Z" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>`,
  hotel: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    <rect x="88" y="122" width="124" height="238" fill="#d9a08c" stroke="${INK}" stroke-width="6"/>
    <rect x="66" y="100" width="168" height="26" fill="${p.accent}" stroke="${INK}" stroke-width="6"/>
    ${[152, 184, 216, 248, 280, 312].map(y => `<rect x="112" y="${y}" width="26" height="24" fill="${p.land2}" stroke="${INK}" stroke-width="4"/><rect x="162" y="${y}" width="26" height="24" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>`).join("")}
    <rect x="0" y="360" width="300" height="60" fill="${p.land}"/>`,
  drive: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    <rect x="0" y="252" width="300" height="168" fill="${p.land2}"/>
    ${[...Array(36)].map((_, i) => `<rect x="${(i * 37) % 300}" y="${20 + (i * 53) % 200}" width="4" height="4" fill="${p.accent}" opacity="${0.5 + (i % 5) * 0.1}"/>`).join("")}
    <g transform="translate(66,292)" stroke="${INK}" stroke-width="5" stroke-linejoin="round">
      <path d="M 0 30 L 22 6 L 122 -4 L 162 18 L 162 34 L 0 34 Z" fill="${p.accent}"/>
      <circle cx="42" cy="36" r="13" fill="${INK}"/><circle cx="127" cy="36" r="13" fill="${INK}"/>
    </g>
    <line x1="0" y1="332" x2="300" y2="332" stroke="${p.sun}" stroke-width="4" opacity="0.6"/>`,
  summer: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/>
    <circle cx="150" cy="168" r="92" fill="none" stroke="${p.land2}" stroke-width="9"/>
    <g stroke="${p.land2}" stroke-width="6">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="150" y1="168" x2="${150 + 92 * Math.cos(a * Math.PI / 180)}" y2="${168 + 92 * Math.sin(a * Math.PI / 180)}"/>`).join("")}</g>
    <circle cx="150" cy="168" r="16" fill="${p.accent}" stroke="${INK}" stroke-width="4"/>
    <rect x="0" y="330" width="300" height="90" fill="${p.land}" stroke="${INK}" stroke-width="5"/>`,
  ghibli: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    <circle cx="70" cy="80" r="34" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    ${[120, 200, 262].map((x, i) => `<circle cx="${x}" cy="${58 + i * 30}" r="${18 - i * 4}" fill="${p.land2}" stroke="${INK}" stroke-width="4" opacity="0.9"/>`).join("")}
    <rect x="0" y="300" width="300" height="120" fill="${p.land}"/>
    <rect x="58" y="238" width="184" height="48" rx="8" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>
    ${[80, 122, 164, 206].map(x => `<rect x="${x}" y="248" width="24" height="18" fill="${p.sun}" stroke="${INK}" stroke-width="3"/>`).join("")}
    <circle cx="92" cy="290" r="10" fill="${INK}"/><circle cx="208" cy="290" r="10" fill="${INK}"/>
    <line x1="0" y1="312" x2="300" y2="312" stroke="${INK}" stroke-width="5"/>`,
  bench: (p) => `<rect width="300" height="420" fill="${p.sky[1]}"/>
    <circle cx="232" cy="80" r="36" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <path d="M 0 300 Q 150 258 300 300 L 300 420 L 0 420 Z" fill="${p.land}" stroke="${INK}" stroke-width="5"/>
    <circle cx="150" cy="222" r="32" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>
    <rect x="145" y="244" width="10" height="52" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
    ${[[64, 322], [104, 312], [238, 332]].map(([x, y]) => `<g stroke="${INK}" stroke-width="4"><rect x="${x - 18}" y="${y - 28}" width="36" height="9" fill="#8a6a42"/><line x1="${x - 11}" y1="${y - 19}" x2="${x - 11}" y2="${y + 16}"/><line x1="${x + 11}" y1="${y - 19}" x2="${x + 11}" y2="${y + 16}"/></g>`).join("")}`,
  mountain: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    <circle cx="150" cy="108" r="44" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <path d="M -10 340 L 90 180 L 150 280 L 210 160 L 310 340 Z" fill="${p.land}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M 210 160 L 188 200 L 232 200 Z" fill="${p.sun}" stroke="${INK}" stroke-width="4"/>
    <path d="M 90 180 L 74 210 L 106 210 Z" fill="${p.sun}" stroke="${INK}" stroke-width="4" opacity="0.9"/>
    <rect x="0" y="340" width="300" height="80" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>`,
  space: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    ${[...Array(46)].map((_, i) => `<circle cx="${(i * 61) % 300}" cy="${(i * 97) % 420}" r="${1.5 + (i % 3)}" fill="${p.ink}" opacity="${0.5 + (i % 4) * 0.12}"/>`).join("")}
    <circle cx="150" cy="180" r="72" fill="${p.land}" stroke="${p.accent}" stroke-width="7"/>
    <ellipse cx="150" cy="180" rx="122" ry="26" fill="none" stroke="${p.accent}" stroke-width="6" transform="rotate(-18 150 180)"/>
    <rect x="118" y="330" width="64" height="90" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>`,
  diner: (p) => `<rect width="300" height="420" fill="${p.sky[0]}"/>
    <circle cx="60" cy="70" r="28" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <rect x="40" y="180" width="220" height="112" rx="14" fill="${p.accent}" stroke="${INK}" stroke-width="6"/>
    <rect x="60" y="206" width="80" height="52" fill="${p.sky[1]}" stroke="${INK}" stroke-width="5"/>
    <rect x="160" y="206" width="80" height="52" fill="${p.sky[1]}" stroke="${INK}" stroke-width="5"/>
    <rect x="28" y="160" width="244" height="24" rx="12" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>
    <rect x="0" y="292" width="300" height="128" fill="${p.land}" stroke="${INK}" stroke-width="5"/>
    <line x1="0" y1="322" x2="300" y2="322" stroke="${p.sun}" stroke-width="4" opacity="0.6"/>`,
};

export function renderPoster(film, palette) {
  const p = palette;
  const draw = POSTERS[film.poster] || POSTERS.mountain;
  const title = film.name.split(" (")[0].toUpperCase();
  return `${svgOpen(300, 420)}
    ${draw(p)}
    <rect x="0" y="366" width="300" height="54" fill="${INK}"/>
    <text x="150" y="401" text-anchor="middle" font-family="Georgia, serif" font-weight="bold" font-size="${title.length > 14 ? 16 : 20}" fill="#f4efe3" letter-spacing="1.5">${title}</text>
  </svg>`;
}

/* ---------- era icons: uniform line icons ---------- */
const ICONS = {
  leaf: `<path d="M 20 80 Q 20 20 80 20 Q 80 80 20 80 Z M 26 74 Q 50 52 76 26" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
  pick: `<path d="M 20 30 Q 50 10 80 30 M 50 20 L 50 84 M 36 84 L 64 84" fill="none" stroke-width="6" stroke-linecap="round"/>`,
  rocket: `<path d="M 50 12 Q 66 34 62 62 L 38 62 Q 34 34 50 12 Z M 38 62 L 24 78 M 62 62 L 76 78 M 44 62 L 44 74 L 56 74 L 56 62" fill="none" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="40" r="6" fill="none" stroke-width="5"/>`,
  sax: `<path d="M 42 12 L 52 12 L 58 62 Q 58 76 44 78 Q 32 76 34 66 M 58 62 L 70 70" fill="none" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="20" r="3" fill="currentColor"/><circle cx="46" cy="30" r="3" fill="currentColor"/><circle cx="50" cy="42" r="3" fill="currentColor"/>`,
  crown: `<path d="M 18 66 L 14 30 L 34 46 L 50 22 L 66 46 L 86 30 L 82 66 Z M 18 76 L 82 76" fill="none" stroke-width="6" stroke-linejoin="round"/>`,
  vinyl: `<circle cx="50" cy="50" r="34" fill="none" stroke-width="6"/><circle cx="50" cy="50" r="6" fill="none" stroke-width="5"/><path d="M 30 30 A 28 28 0 0 1 70 30" fill="none" stroke-width="4" opacity="0.7"/>`,
  skyline: `<path d="M 12 84 L 12 44 L 26 44 L 26 30 L 40 30 L 40 54 L 52 54 L 52 20 L 66 20 L 66 48 L 80 48 L 80 36 L 90 36 L 90 84" fill="none" stroke-width="6" stroke-linejoin="round"/>`,
  cactus: `<path d="M 50 84 L 50 22 M 50 46 L 34 46 L 34 30 M 50 56 L 66 56 L 66 40 M 36 84 L 64 84" fill="none" stroke-width="6" stroke-linecap="round"/>`,
  castle: `<path d="M 20 84 L 20 40 L 30 40 L 30 30 L 38 30 L 38 40 L 46 40 L 46 30 L 54 30 L 54 40 L 62 40 L 62 30 L 70 30 L 70 40 L 80 40 L 80 84 M 44 84 L 44 62 Q 50 54 56 62 L 56 84" fill="none" stroke-width="6" stroke-linejoin="round"/>`,
  mask: `<path d="M 18 36 Q 50 24 82 36 Q 82 62 50 74 Q 18 62 18 36 Z M 32 46 Q 38 42 44 46 M 56 46 Q 62 42 68 46 M 42 60 Q 50 66 58 60" fill="none" stroke-width="6" stroke-linecap="round"/>`,
  neon: `<path d="M 30 14 L 30 60 Q 30 76 46 76 L 58 76 Q 72 76 72 62 L 72 14 M 38 14 L 38 60" fill="none" stroke-width="6" stroke-linecap="round"/><path d="M 20 88 L 82 88" stroke-width="5" stroke-linecap="round" opacity="0.6"/>`,
  flower: `<circle cx="50" cy="42" r="8" fill="none" stroke-width="5"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${50 + 22 * Math.cos(a * Math.PI / 180)}" cy="${42 + 22 * Math.sin(a * Math.PI / 180)}" rx="10" ry="6" fill="none" stroke-width="5" transform="rotate(${a} ${50 + 22 * Math.cos(a * Math.PI / 180)} ${42 + 22 * Math.sin(a * Math.PI / 180)})"/>`).join("")}<path d="M 50 62 L 50 86 M 50 74 Q 62 70 66 62" fill="none" stroke-width="5" stroke-linecap="round"/>`,
};

export function renderEraIcon(name, color = "#f4efe3") {
  const body = ICONS[name] || ICONS.leaf;
  return `${svgOpen(100, 100)}<g stroke="${color}" color="${color}">${body}</g></svg>`;
}
