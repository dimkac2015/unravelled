// yarn ball, loose thread pile and the watching cats — all inline SVG

const CREAM = "#e8dfc8";
const OUTLINE = "#0a2f24";

export function yarnBallSvg(size = 150) {
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="76" fill="${CREAM}" stroke="${OUTLINE}" stroke-width="5"/>
    <g fill="none" stroke="${OUTLINE}" stroke-width="3" opacity="0.75" stroke-linecap="round">
      <path d="M32 78 Q100 40 168 84"/>
      <path d="M26 108 Q100 70 174 114"/>
      <path d="M32 140 Q100 104 166 144"/>
      <path d="M48 58 Q92 100 62 162"/>
      <path d="M82 34 Q120 100 96 170"/>
      <path d="M120 38 Q150 100 134 168"/>
      <path d="M156 62 Q130 104 162 150"/>
      <path d="M40 170 Q100 150 160 176"/>
    </g>
    <path d="M168 128 Q196 150 186 180 Q182 190 172 188" fill="none" stroke="${CREAM}" stroke-width="5" stroke-linecap="round"/>
    <path d="M168 128 Q196 150 186 180" fill="none" stroke="${OUTLINE}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  </svg>`;
}

export function threadPileSvg(size = 150) {
  const loops = [];
  for (let i = 0; i < 9; i++) {
    const rx = 58 - i * 5, ry = 20 - i * 1.6, rot = (i * 47) % 60 - 30;
    loops.push(`<ellipse cx="100" cy="${128 - i * 2.5}" rx="${rx}" ry="${ry}" transform="rotate(${rot} 100 ${128 - i * 2.5})"/>`);
  }
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${CREAM}" stroke-width="4" stroke-linecap="round">${loops.join("")}</g>
    <g fill="none" stroke="${OUTLINE}" stroke-width="1.4" opacity="0.5">${loops.join("")}</g>
    <path d="M 148 96 Q 180 84 186 108 Q 190 126 172 130" fill="none" stroke="${CREAM}" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

export function catSvg(flip = false, size = 54) {
  const t = flip ? "translate(200,0) scale(-1,1)" : "";
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="cat-svg">
    <g transform="${t}">
      <path d="M 60 150 Q 52 96 84 84 L 116 84 Q 148 96 140 150 Q 100 162 60 150 Z" fill="#2b2b33" stroke="#141419" stroke-width="5"/>
      <circle cx="100" cy="62" r="34" fill="#2b2b33" stroke="#141419" stroke-width="5"/>
      <path d="M 74 40 L 68 12 L 92 30 Z" fill="#2b2b33" stroke="#141419" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 126 40 L 132 12 L 108 30 Z" fill="#2b2b33" stroke="#141419" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="88" cy="58" r="4.5" fill="#e8b64c"/><circle cx="112" cy="58" r="4.5" fill="#e8b64c"/>
      <path d="M 96 72 L 100 76 L 104 72" fill="none" stroke="#141419" stroke-width="3" stroke-linecap="round"/>
      <path d="M 66 66 L 46 62 M 66 72 L 48 76 M 134 66 L 154 62 M 134 72 L 152 76" stroke="#141419" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 40 150 Q 20 130 26 96" fill="none" stroke="#2b2b33" stroke-width="10" stroke-linecap="round"/>
      <path d="M 40 150 Q 20 130 26 96" fill="none" stroke="#141419" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
    </g>
  </svg>`;
}
