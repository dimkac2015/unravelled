// yarn ball, loose thread pile and the watching cats — inline SVG, minimal but detailed

const CREAM = "#e8dfc8";
const OUTLINE = "#0a2f24";

export function yarnBallSvg(size = 150) {
  // many winding threads, clipped to the ball, plus shading for a rounder look
  const winds = [];
  for (let i = 0; i < 13; i++) {
    const y = 36 + i * 9.6;
    const wob = (i % 3) * 9 - 9;
    winds.push(`<path d="M ${24 + i * 2.5} ${y} C 68 ${y - 17 + wob}, 132 ${y + 15 - wob}, ${176 - i * 2.5} ${y + 3}"/>`);
  }
  for (let i = 0; i < 8; i++) {
    const x = 38 + i * 18;
    const lean = (i % 2 ? 1 : -1) * (10 + (i % 3) * 7);
    winds.push(`<path d="M ${x} 28 Q ${x + lean + 14} 100 ${x + lean - 10} 172"/>`);
  }
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="yarn-shade" cx="0.36" cy="0.3" r="0.9">
        <stop offset="0" stop-color="#faf5e6"/>
        <stop offset="0.5" stop-color="#e8dfc8"/>
        <stop offset="0.85" stop-color="#cfc3a2"/>
        <stop offset="1" stop-color="#b3a684"/>
      </radialGradient>
      <clipPath id="yarn-clip"><circle cx="100" cy="100" r="73"/></clipPath>
    </defs>
    <circle cx="100" cy="100" r="76" fill="url(#yarn-shade)" stroke="#8f8468" stroke-width="3"/>
    <g clip-path="url(#yarn-clip)" fill="none" stroke="#a3946f" stroke-width="2.4" opacity="0.8" stroke-linecap="round">${winds.join("")}</g>
    <g clip-path="url(#yarn-clip)" fill="none" stroke="#f7f1de" stroke-width="1.4" opacity="0.55" stroke-linecap="round">
      <path d="M 30 44 C 70 28, 130 30, 170 46"/>
      <path d="M 28 66 C 70 50, 132 52, 172 68"/>
    </g>
    <ellipse cx="72" cy="62" rx="26" ry="16" fill="#ffffff" opacity="0.28" transform="rotate(-24 72 62)"/>
    <path d="M 170 128 Q 194 148 187 176 Q 184 189 171 187 Q 164 185 167 178" fill="none" stroke="${CREAM}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 170 128 Q 194 148 187 176" fill="none" stroke="#8f8468" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  </svg>`;
}

export function threadPileSvg(size = 150) {
  const loops = [];
  for (let i = 0; i < 10; i++) {
    const rx = 60 - i * 5, ry = 21 - i * 1.7, rot = (i * 47) % 60 - 30;
    loops.push(`<ellipse cx="100" cy="${130 - i * 2.6}" rx="${rx}" ry="${ry}" transform="rotate(${rot} 100 ${130 - i * 2.6})"/>`);
  }
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${CREAM}" stroke-width="4" stroke-linecap="round">${loops.join("")}</g>
    <g fill="none" stroke="#8f8468" stroke-width="1.4" opacity="0.5">${loops.join("")}</g>
    <path d="M 150 94 Q 182 82 188 106 Q 192 126 172 130" fill="none" stroke="${CREAM}" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

// minimal-but-realistic sitting cat, facing the viewer, amber eyes
export function catSvg(flip = false, size = 54, body = "#3a3a42", belly = "#565662") {
  const t = flip ? "translate(200,0) scale(-1,1)" : "";
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="cat">
    <g transform="${t}">
      <path d="M 136 160 Q 180 152 174 106 Q 172 92 160 94" fill="none" stroke="${body}" stroke-width="13" stroke-linecap="round"/>
      <path d="M 174 106 Q 172 92 160 94" fill="none" stroke="#c9c9d4" stroke-width="13" stroke-linecap="round" opacity="0.35"/>
      <path d="M 60 168 Q 52 108 100 102 Q 148 108 140 168 Q 100 180 60 168 Z" fill="${body}" stroke="#17171d" stroke-width="4"/>
      <ellipse cx="100" cy="150" rx="26" ry="22" fill="${belly}" opacity="0.9"/>
      <ellipse cx="80" cy="168" rx="13" ry="7" fill="${body}" stroke="#17171d" stroke-width="3.5"/>
      <ellipse cx="120" cy="168" rx="13" ry="7" fill="${body}" stroke="#17171d" stroke-width="3.5"/>
      <circle cx="100" cy="64" r="37" fill="${body}" stroke="#17171d" stroke-width="4"/>
      <path d="M 71 42 L 60 8 L 94 30 Z" fill="${body}" stroke="#17171d" stroke-width="4" stroke-linejoin="round"/>
      <path d="M 129 42 L 140 8 L 106 30 Z" fill="${body}" stroke="#17171d" stroke-width="4" stroke-linejoin="round"/>
      <path d="M 73 36 L 67 18 L 86 29 Z" fill="#d98a8a" opacity="0.85"/>
      <path d="M 127 36 L 133 18 L 114 29 Z" fill="#d98a8a" opacity="0.85"/>
      <path d="M 92 30 L 100 22 L 108 30 M 84 38 L 100 32 L 116 38" stroke="#17171d" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
      <ellipse cx="85" cy="62" rx="7.5" ry="8.5" fill="#f2b64c" stroke="#17171d" stroke-width="3"/>
      <ellipse cx="115" cy="62" rx="7.5" ry="8.5" fill="#f2b64c" stroke="#17171d" stroke-width="3"/>
      <ellipse cx="85" cy="62" rx="2.4" ry="5.5" fill="#17171d"/>
      <ellipse cx="115" cy="62" rx="2.4" ry="5.5" fill="#17171d"/>
      <circle cx="87" cy="58" r="1.6" fill="#fff" opacity="0.9"/>
      <circle cx="117" cy="58" r="1.6" fill="#fff" opacity="0.9"/>
      <path d="M 95 78 L 100 83 L 105 78 Z" fill="#d98a8a" stroke="#17171d" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M 100 83 Q 100 89 93 89 M 100 83 Q 100 89 107 89" fill="none" stroke="#17171d" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 62 70 L 38 64 M 62 76 L 40 78 M 63 82 L 42 88 M 138 70 L 162 64 M 138 76 L 160 78 M 137 82 L 158 88" stroke="#c9c9d4" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    </g>
  </svg>`;
}
