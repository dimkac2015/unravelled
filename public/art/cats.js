// The five cats (Stage 4) — flat SVG silhouettes with a small rim light so dark cats
// stay visible on the dark green dock; eyes always clearly visible.
// Exactly 5 cats: black_a, black_b (a pair, always shoulder to shoulder), ginger,
// black_fluffy, grey. Each has its own look and its own tail-swish speed (--swish).

export const CAT_ROSTER = [
  { id: "black_a",      swish: "2.2s", look: "short-haired glossy black, yellow-green eyes, slim" },
  { id: "black_b",      swish: "2.2s", look: "same as black_a plus a small white chest patch; sits pressed to black_a" },
  { id: "ginger",       swish: "3.8s", look: "chubby light-orange tabby, round body, sleepy half-lidded eyes; slowest" },
  { id: "black_fluffy", swish: "1.6s", look: "long-haired fluffy black, big plume tail, fluffy chest; most curious" },
  { id: "grey",         swish: "2.9s", look: "plush blue-grey, round face, bright yellow-orange eyes; serious, suspicious" },
];

const RIM = "#dfe8c8"; // rim light so dark cats read on the dark dock

function catBody(body, opts = {}) {
  const chest = opts.chest || body;
  return `
    <path class="tail" d="M ${opts.tailFromX ?? 92} 108 Q ${opts.tailC ?? 116} 96 ${opts.tailTipX ?? 112} ${opts.tailTipY ?? 58}"
      fill="none" stroke="${body}" stroke-width="${opts.tailW ?? 9}" stroke-linecap="round"/>
    <path d="M 26 116 Q 20 ${opts.bodyTop ?? 62} 60 ${opts.bodyTop ?? 56} Q ${opts.bodyRight ?? 100} ${opts.bodyTop ?? 62} 94 116 Z" fill="${body}"/>
    <path d="M 26 116 Q 20 ${opts.bodyTop ?? 62} 60 ${opts.bodyTop ?? 56} Q 40 ${opts.bodyTop ?? 62} 34 116 Z" fill="none" stroke="${RIM}" stroke-width="2.5" opacity="0.8"/>
    ${opts.patch ? `<ellipse cx="60" cy="96" rx="11" ry="14" fill="#f2f0e6"/>` : ""}
    ${opts.fluff ? `<path d="M 40 116 L 46 104 L 52 116 L 58 102 L 64 116 L 70 104 L 76 116 Z" fill="${chest}"/>` : `<ellipse cx="60" cy="100" rx="16" ry="15" fill="${chest}"/>`}
    ${opts.stripes ? `<path d="M 34 84 L 44 88 M 86 84 L 76 88 M 38 100 L 47 103 M 82 100 L 73 103" stroke="${opts.stripeColor}" stroke-width="4" stroke-linecap="round"/>` : ""}`;
}

function catHead(eyeColor, opts = {}) {
  const lid = opts.sleepy ? `<rect x="38" y="${opts.eyeY ?? 44}" width="17" height="7" fill="${opts.body}"/><rect x="65" y="${opts.eyeY ?? 44}" width="17" height="7" fill="${opts.body}"/>` : "";
  const brows = opts.serious ? `<path d="M 40 32 L 54 37 M 80 32 L 66 37" stroke="${opts.body}" stroke-width="4" stroke-linecap="round"/>` : "";
  return `<g class="head">
    <path d="M 38 30 L 32 8 L 52 22 Z" fill="${opts.body}"/><path d="M 82 30 L 88 8 L 68 22 Z" fill="${opts.body}"/>
    <circle cx="60" cy="46" r="27" fill="${opts.body}"/>
    <circle cx="60" cy="46" r="27" fill="none" stroke="${RIM}" stroke-width="2" opacity="0.55"/>
    ${brows}
    <ellipse cx="49" cy="${opts.eyeY ?? 46}" rx="6" ry="${opts.sleepy ? 3.4 : 6.4}" fill="${eyeColor}"/>
    <ellipse cx="71" cy="${opts.eyeY ?? 46}" rx="6" ry="${opts.sleepy ? 3.4 : 6.4}" fill="${eyeColor}"/>
    <ellipse cx="49" cy="${opts.eyeY ?? 46}" rx="2" ry="${opts.sleepy ? 2.6 : 5}" fill="#0a0c10"/>
    <ellipse cx="71" cy="${opts.eyeY ?? 46}" rx="2" ry="${opts.sleepy ? 2.6 : 5}" fill="#0a0c10"/>
    ${lid}
    <path d="M 56 58 L 60 62 L 64 58 Z" fill="${opts.nose || "#c97b7b"}"/>
  </g>`;
}

export function renderCat(id) {
  switch (id) {
    case "black_a":
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="--swish:2.2s">${catBody("#14171f")}${catHead("#d8e86a", { body: "#14171f" })}</svg>`;
    case "black_b":
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="--swish:2.2s">${catBody("#14171f", { patch: true })}${catHead("#d8e86a", { body: "#14171f" })}</svg>`;
    case "ginger":
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="--swish:3.8s">${catBody("#d98a3d", { bodyTop: 66, bodyRight: 98, tailW: 11, stripeColor: "#b56a24", stripes: true })}${catHead("#e8c85a", { body: "#d98a3d", sleepy: true, nose: "#a35a3a" })}</svg>`;
    case "black_fluffy":
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="--swish:1.6s">
        <path class="tail" d="M 94 110 Q 122 96 114 44 Q 112 34 104 34" fill="none" stroke="#14171f" stroke-width="14" stroke-linecap="round"/>
        <path d="M 26 116 Q 20 60 60 54 Q 100 60 94 116 Z" fill="#14171f"/>
        <path d="M 26 116 Q 20 60 60 54 Q 40 60 34 116 Z" fill="none" stroke="${RIM}" stroke-width="2.5" opacity="0.8"/>
        <path class="paw" d="M 88 96 Q 100 84 96 70" fill="none" stroke="#14171f" stroke-width="10" stroke-linecap="round"/>
        <path d="M 40 116 L 46 102 L 52 116 L 58 100 L 64 116 L 70 102 L 76 116 Z" fill="#1d212b"/>
        ${catHead("#d8e86a", { body: "#14171f" })}</svg>`;
    case "grey":
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="--swish:2.9s">${catBody("#8b93a3", { tailC: 112 })}${catHead("#ffb02e", { body: "#8b93a3", serious: true, nose: "#7a6a70" })}</svg>`;
    default:
      return "";
  }
}
