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
  const eye = s.eyeColor || "#4a3428";
  const eyeWhite = "#f6f1e4";
  const eyes = s.glasses
    ? `<g>
        <ellipse cx="99" cy="130" rx="13" ry="10.5" fill="${eyeWhite}" stroke="${INK}" stroke-width="4"/>
        <ellipse cx="141" cy="130" rx="13" ry="10.5" fill="${eyeWhite}" stroke="${INK}" stroke-width="4"/>
        <circle cx="100" cy="131" r="5" fill="${eye}"/><circle cx="100" cy="131" r="2.4" fill="${INK}"/><circle cx="98" cy="128" r="1.4" fill="#fff"/>
        <circle cx="142" cy="131" r="5" fill="${eye}"/><circle cx="142" cy="131" r="2.4" fill="${INK}"/><circle cx="140" cy="128" r="1.4" fill="#fff"/>
        <rect x="83" y="115" width="31" height="29" rx="7" fill="none" stroke="${INK}" stroke-width="5"/>
        <rect x="126" y="115" width="31" height="29" rx="7" fill="none" stroke="${INK}" stroke-width="5"/>
        <line x1="114" y1="128" x2="126" y2="128" stroke="${INK}" stroke-width="5"/>
      </g>
      <path d="M 85 110 Q 99 104 113 110 M 127 110 Q 141 104 155 110" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    : `<g>
        <ellipse cx="99" cy="130" rx="12" ry="10" fill="${eyeWhite}" stroke="${INK}" stroke-width="4"/>
        <ellipse cx="141" cy="130" rx="12" ry="10" fill="${eyeWhite}" stroke="${INK}" stroke-width="4"/>
        <circle cx="100" cy="131" r="5.5" fill="${eye}"/><circle cx="100" cy="131" r="2.6" fill="${INK}"/><circle cx="97.5" cy="128" r="1.5" fill="#fff"/>
        <circle cx="142" cy="131" r="5.5" fill="${eye}"/><circle cx="142" cy="131" r="2.6" fill="${INK}"/><circle cx="139.5" cy="128" r="1.5" fill="#fff"/>
      </g>
      <path d="M 86 112 Q 99 106 112 112 M 128 112 Q 141 106 154 112" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  return `${svgOpen(240, 300)}
    <rect width="240" height="300" fill="${s.bg}"/>
    <circle cx="120" cy="142" r="104" fill="${s.bgShape || s.bg}"/>
    <path d="M 24 300 L 24 274 Q 24 230 120 230 Q 216 230 216 274 L 216 300 Z" fill="${s.shirt}" stroke="${INK}" stroke-width="${W}" stroke-linejoin="round"/>
    <path d="M 97 231 L 120 253 L 143 231 L 143 240 L 120 262 L 97 240 Z" fill="${s.shirt}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="120" cy="272" r="3.5" fill="${INK}"/><circle cx="120" cy="289" r="3.5" fill="${INK}"/>
    <rect x="106" y="200" width="28" height="38" fill="${s.skin}" stroke="${INK}" stroke-width="5"/>
    <path d="M 106 208 Q 120 219 134 208 L 134 217 Q 120 228 106 217 Z" fill="${s.shade || "#b39a7c"}" opacity="0.65"/>
    <ellipse cx="55" cy="142" rx="9" ry="14" fill="${s.skin}" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="185" cy="142" rx="9" ry="14" fill="${s.skin}" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="120" cy="136" rx="64" ry="70" fill="${s.skin}" stroke="${INK}" stroke-width="${W}"/>
    ${hairShape(s)}
    <path d="M 84 84 Q 100 74 118 76 M 128 74 Q 148 74 160 86" fill="none" stroke="${INK}" stroke-width="3" opacity="0.35" stroke-linecap="round"/>
    ${hatShape(s)}
    ${eyes}
    <path d="M 120 140 C 119 152 115 160 110 165 Q 118 171 129 166" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 112 168 Q 116 170 120 168" fill="none" stroke="${INK}" stroke-width="3.5" opacity="0.7" stroke-linecap="round"/>
    <path d="M 100 186 Q 120 195 140 186" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 106 191 Q 120 197 134 191" fill="none" stroke="${INK}" stroke-width="3" opacity="0.45" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- film posters: minimalist flat-poster style (like the reference):
   light speckled background, one big flat central shape, dark banner with a
   bold sans-serif title ---------- */

function speckles(n = 46) {
  return [...Array(n)].map((_, i) =>
    `<circle cx="${(i * 67 + 23) % 300}" cy="${(i * 97 + 41) % 356}" r="${1.6 + (i % 3)}" fill="${INK}" opacity="0.85"/>`
  ).join("");
}

const POSTERS = {
  space: (p) => `<circle cx="150" cy="180" r="80" fill="${p.accent}" stroke="${INK}" stroke-width="6"/>
    <path d="M 96 150 Q 150 128 204 152 Q 150 168 96 150 Z" fill="${p.sun}" opacity="0.5"/>
    <ellipse cx="150" cy="180" rx="130" ry="28" fill="none" stroke="${p.sun}" stroke-width="7" transform="rotate(-18 150 180)"/>
    <circle cx="246" cy="80" r="14" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
    <g transform="translate(190,292) rotate(-8)">
      <rect x="0" y="0" width="52" height="18" rx="4" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
      <rect x="18" y="-8" width="16" height="8" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
      <circle cx="12" cy="18" r="3" fill="${p.sun}"/><circle cx="40" cy="18" r="3" fill="${p.sun}"/>
    </g>`,
  paris: (p) => `<path d="M 150 56 L 116 302 L 184 302 Z" fill="none" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <line x1="127" y1="218" x2="173" y2="218" stroke="${INK}" stroke-width="9"/>
    <line x1="116" y1="302" x2="184" y2="302" stroke="${INK}" stroke-width="9"/>
    <line x1="150" y1="56" x2="150" y2="34" stroke="${INK}" stroke-width="7"/>
    <circle cx="240" cy="92" r="26" fill="${p.sun}" stroke="${INK}" stroke-width="5"/>
    <g fill="${p.land2}" stroke="${INK}" stroke-width="4">
      <rect x="28" y="286" width="40" height="80"/><rect x="228" y="272" width="46" height="94"/>
      <rect x="36" y="296" width="8" height="12" fill="#e9e2cf"/><rect x="52" y="296" width="8" height="12" fill="#e9e2cf"/>
      <rect x="238" y="284" width="8" height="12" fill="#e9e2cf"/><rect x="254" y="284" width="8" height="12" fill="#e9e2cf"/>
    </g>
    <circle cx="70" cy="330" r="10" fill="${p.accent}" stroke="${INK}" stroke-width="4"/>`,
  lalaland: (p) => `<circle cx="150" cy="148" r="82" fill="${p.accent}" stroke="${INK}" stroke-width="6"/>
    <path d="M -10 330 Q 80 278 160 322 T 310 314 L 310 366 L -10 366 Z" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>
    <g fill="${INK}">
      <circle cx="132" cy="300" r="5"/><path d="M 132 305 L 132 320 L 126 332 M 132 320 L 138 332 M 128 312 L 136 312" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="166" cy="304" r="5"/><path d="M 166 309 L 166 324 L 161 335 M 166 324 L 171 335 M 162 315 L 170 315" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>`,
  road: (p) => `<circle cx="224" cy="90" r="34" fill="${p.sun}" stroke="${INK}" stroke-width="6"/>
    <line x1="0" y1="150" x2="300" y2="150" stroke="${INK}" stroke-width="5"/>
    <path d="M 118 366 L 142 158 L 158 158 L 182 366 Z" fill="${p.land2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <line x1="150" y1="168" x2="150" y2="360" stroke="#e9e2cf" stroke-width="6" stroke-dasharray="18 16"/>
    <g stroke="${INK}" stroke-width="4" fill="${p.accent}">
      <rect x="52" y="300" width="10" height="40"/><path d="M 52 314 L 36 314 L 36 326 M 62 322 L 78 322 L 78 310" fill="none"/>
      <rect x="242" y="292" width="10" height="44"/><path d="M 242 306 L 258 306 L 258 318 M 252 314 L 236 314 L 236 302" fill="none"/>
    </g>`,
  hotel: (p) => `<rect x="92" y="110" width="116" height="256" fill="${p.accent}" stroke="${INK}" stroke-width="7"/>
    <rect x="78" y="86" width="144" height="26" fill="${p.land2}" stroke="${INK}" stroke-width="6"/>
    ${[140, 176, 212, 248, 284, 320].map(y => `<rect x="112" y="${y}" width="24" height="22" fill="#e9e2cf" stroke="${INK}" stroke-width="3"/><rect x="164" y="${y}" width="24" height="22" fill="#e9e2cf" stroke="${INK}" stroke-width="3"/>`).join("")}
    <rect x="138" y="336" width="24" height="30" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
    <line x1="0" y1="366" x2="300" y2="366" stroke="${INK}" stroke-width="5"/>
    <g fill="${p.land2}" stroke="${INK}" stroke-width="4"><rect x="30" y="330" width="34" height="36"/><rect x="240" y="324" width="38" height="42"/></g>`,
  drive: (p) => `<g stroke="${INK}" stroke-width="7" stroke-linejoin="round">
      <path d="M 40 268 L 72 232 L 190 218 L 240 252 L 244 278 L 40 278 Z" fill="${p.accent}"/>
      <path d="M 84 234 L 108 226 L 178 220 L 206 246 L 84 246 Z" fill="#e9e2cf" stroke-width="5"/>
      <circle cx="92" cy="282" r="17" fill="${INK}"/><circle cx="92" cy="282" r="7" fill="#e9e2cf"/>
      <circle cx="204" cy="282" r="17" fill="${INK}"/><circle cx="204" cy="282" r="7" fill="#e9e2cf"/>
    </g>
    <circle cx="238" cy="262" r="5" fill="#c23b2e"/>
    <line x1="0" y1="316" x2="300" y2="316" stroke="${p.sun}" stroke-width="6"/>
    <line x1="20" y1="330" x2="280" y2="330" stroke="${INK}" stroke-width="4" stroke-dasharray="16 14" opacity="0.7"/>`,
  summer: (p) => `<circle cx="150" cy="176" r="96" fill="none" stroke="${p.land2}" stroke-width="10"/>
    <g stroke="${p.land2}" stroke-width="7">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="150" y1="176" x2="${150 + 96 * Math.cos(a * Math.PI / 180)}" y2="${176 + 96 * Math.sin(a * Math.PI / 180)}"/>`).join("")}</g>
    ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const x = 150 + 96 * Math.cos(a * Math.PI / 180), y = 176 + 96 * Math.sin(a * Math.PI / 180); return `<rect x="${x - 7}" y="${y - 5}" width="14" height="12" fill="${p.accent}" stroke="${INK}" stroke-width="3"/>`; }).join("")}
    <circle cx="150" cy="176" r="18" fill="${p.accent}" stroke="${INK}" stroke-width="5"/>
    <line x1="150" y1="272" x2="150" y2="330" stroke="${INK}" stroke-width="7"/>
    <line x1="0" y1="330" x2="300" y2="330" stroke="${INK}" stroke-width="5"/>`,
  ghibli: (p) => `<circle cx="70" cy="86" r="30" fill="${p.sun}" stroke="${INK}" stroke-width="6"/>
    <circle cx="150" cy="196" r="16" fill="${p.land2}" opacity="0.85"/><circle cx="178" cy="162" r="11" fill="${p.land2}" opacity="0.65"/><circle cx="198" cy="136" r="8" fill="${p.land2}" opacity="0.5"/>
    <rect x="70" y="238" width="160" height="62" rx="8" fill="${p.land2}" stroke="${INK}" stroke-width="7"/>
    ${[92, 128, 164, 200].map(x => `<rect x="${x}" y="252" width="24" height="20" fill="${p.accent}" stroke="${INK}" stroke-width="3"/>`).join("")}
    <circle cx="100" cy="306" r="11" fill="${INK}"/><circle cx="200" cy="306" r="11" fill="${INK}"/>
    <line x1="0" y1="318" x2="300" y2="318" stroke="${INK}" stroke-width="6"/>
    <line x1="0" y1="328" x2="300" y2="328" stroke="${INK}" stroke-width="4" opacity="0.6"/>`,
  bench: (p) => `<circle cx="150" cy="172" r="56" fill="${p.land2}" stroke="${INK}" stroke-width="7"/>
    <path d="M 110 150 Q 150 120 190 152" fill="none" stroke="${INK}" stroke-width="4" opacity="0.5"/>
    <rect x="143" y="222" width="14" height="88" fill="${p.land2}" stroke="${INK}" stroke-width="5"/>
    <g stroke="${INK}" stroke-width="6" stroke-linejoin="round">
      <rect x="84" y="284" width="132" height="14" fill="${p.accent}"/>
      <rect x="92" y="266" width="116" height="10" fill="${p.accent}"/>
      <line x1="100" y1="298" x2="100" y2="342"/><line x1="200" y1="298" x2="200" y2="342"/>
    </g>
    <line x1="0" y1="342" x2="300" y2="342" stroke="${INK}" stroke-width="5"/>
    <path d="M 40 342 q 4 -12 8 0 M 250 342 q 4 -12 8 0 M 262 342 q 4 -10 7 0" stroke="${p.land2}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  mountain: (p) => `<circle cx="218" cy="92" r="34" fill="${p.sun}" stroke="${INK}" stroke-width="6"/>
    <path d="M 30 330 L 130 140 L 190 240 L 230 180 L 290 330 Z" fill="${p.land2}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M 130 140 L 108 180 L 152 180 Z" fill="#e9e2cf"/>
    <path d="M 230 180 L 214 208 L 246 208 Z" fill="#e9e2cf" opacity="0.9"/>
    <line x1="0" y1="330" x2="300" y2="330" stroke="${INK}" stroke-width="5"/>
    <g stroke="${INK}" stroke-width="4" fill="${p.accent}">
      <path d="M 60 330 L 66 306 L 72 330 Z"/><path d="M 84 330 L 89 312 L 94 330 Z"/><path d="M 250 330 L 255 310 L 260 330 Z"/>
    </g>`,
  diner: (p) => `<rect x="52" y="170" width="196" height="132" rx="12" fill="${p.accent}" stroke="${INK}" stroke-width="7"/>
    <rect x="40" y="144" width="220" height="28" rx="14" fill="${p.land2}" stroke="${INK}" stroke-width="6"/>
    <rect x="76" y="200" width="62" height="48" fill="#e9e2cf" stroke="${INK}" stroke-width="5"/>
    <line x1="107" y1="200" x2="107" y2="248" stroke="${INK}" stroke-width="3"/>
    <rect x="162" y="200" width="62" height="48" fill="#e9e2cf" stroke="${INK}" stroke-width="5"/>
    <line x1="193" y1="200" x2="193" y2="248" stroke="${INK}" stroke-width="3"/>
    <rect x="136" y="256" width="28" height="46" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
    <line x1="0" y1="302" x2="300" y2="302" stroke="${INK}" stroke-width="5"/>
    <rect x="262" y="230" width="10" height="72" fill="${p.land2}" stroke="${INK}" stroke-width="4"/>
    <circle cx="267" cy="222" r="12" fill="${p.sun}" stroke="${INK}" stroke-width="4"/>`,
};

export function renderPoster(film, palette) {
  const p = palette;
  const draw = POSTERS[film.poster] || POSTERS.mountain;
  const title = film.name.split(" (")[0].toUpperCase();
  return `${svgOpen(300, 420)}
    <rect width="300" height="420" fill="#e9e2cf"/>
    ${speckles()}
    ${draw(p)}
    <rect x="0" y="366" width="300" height="54" fill="${INK}"/>
    <text x="150" y="402" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${title.length > 16 ? 14 : title.length > 11 ? 17 : 20}" fill="#f4efe3" letter-spacing="2">${title}</text>
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
