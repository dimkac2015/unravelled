// seeded minimalistic SVG sceneries, coloured by mood palette

export const SCENE_FAMILIES = {
  aggressive: ["volcano", "ocean", "mountains"],
  dark: ["night", "swamp", "ocean"],
  sunny: ["meadow", "ocean", "desert"],
  lush: ["forest", "river", "meadow"],
  chill: ["river", "tundra", "meadow"],
  melancholic: ["mountains", "night", "ocean"],
};

const SCENE_NAMES = {
  ocean: ["The Long Tide", "Where the Ship Goes", "Salt & Static", "The Grey Meridian"],
  river: ["The Slow River", "Willows Downstream", "Where the Water Bends"],
  forest: ["The Green Cathedral", "Canopy Light", "Old Pine Road"],
  desert: ["The Amber Dunes", "Midday Heat", "The Long Road West"],
  mountains: ["The High Pass", "Snowline", "The Quiet Peaks"],
  volcano: ["The Ember Mountain", "Last Eruption Bay", "Ash & Orange Sky"],
  meadow: ["The Summer Field", "Clover Hour", "The Long Afternoon"],
  night: ["The Star Field", "Nocturne Coast", "3 A.M. Somewhere"],
  city: ["The Neon Grid", "Rooftop at Dusk"],
  canyon: ["Red Canyon", "The Mesa Road"],
  tundra: ["Aurora Country", "The White North"],
  swamp: ["Blackwater", "The Drowned Forest"],
};

const NS = "http://www.w3.org/2000/svg";

function svgWrap(inner) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="${NS}" role="img">${inner}</svg>`;
}

function sky(p, uid) {
  return `<defs>
    <linearGradient id="sky-${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/>
    </linearGradient>
    <radialGradient id="glow-${uid}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${p.sun}" stop-opacity="0.9"/>
      <stop offset="0.4" stop-color="${p.sunGlow}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${p.sunGlow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#sky-${uid})"/>`;
}

function sunOrMoon(p, rng, uid, y) {
  const x = rng.range(140, 660), r = rng.range(34, 52);
  const cy = y ?? rng.range(90, 170);
  return `<circle cx="${x}" cy="${cy}" r="${r * 2.4}" fill="url(#glow-${uid})"/>
          <circle cx="${x}" cy="${cy}" r="${r}" fill="${p.sun}"/>`;
}

function hills(p, rng, baseY, amp, color, n = 3) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const y = baseY + i * (amp * 0.5);
    const c = i % 2 ? p.land2 : color;
    let d = `M -20 ${y + 60}`;
    for (let x = -20; x <= 820; x += 100) {
      d += ` Q ${x + 50} ${y - rng.range(amp * 0.4, amp)} ${x + 100} ${y + rng.range(-10, 30)}`;
    }
    d += " L 820 520 L -20 520 Z";
    out += `<path d="${d}" fill="${c}" opacity="${1 - i * 0.12}"/>`;
  }
  return out;
}

function stars(rng, p, n = 60) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = rng.range(0, 800), y = rng.range(0, 260), r = rng.range(0.6, 1.9);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${p.ink}" opacity="${rng.range(0.3, 1)}"/>`;
  }
  return out;
}

function waves(p, rng, y0, color) {
  let out = "";
  for (let r = 0; r < 4; r++) {
    const y = y0 + r * 34;
    let d = `M -20 ${y}`;
    for (let x = -20; x <= 820; x += 80) d += ` q 40 ${rng.range(-14, 14)} 80 0`;
    out += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${rng.range(2, 4)}" opacity="${0.9 - r * 0.18}"/>`;
  }
  return out;
}

function tree(rng, x, y, s, c1, c2) {
  const h = 60 * s;
  return `<g>
    <rect x="${x - 4 * s}" y="${y - h * 0.4}" width="${8 * s}" height="${h * 0.4}" fill="${c2}"/>
    <path d="M ${x} ${y - h} L ${x - 22 * s} ${y - h * 0.45} L ${x + 22 * s} ${y - h * 0.45} Z" fill="${c1}"/>
    <path d="M ${x} ${y - h * 1.25} L ${x - 17 * s} ${y - h * 0.75} L ${x + 17 * s} ${y - h * 0.75} Z" fill="${c1}"/>
  </g>`;
}

function ship(rng, p, x, y, s, dark) {
  const hull = dark ? p.land2 : p.ink;
  const sail = p.sun;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <path d="M -46 0 L 46 0 L 30 20 L -30 20 Z" fill="${hull}"/>
    <line x1="0" y1="0" x2="0" y2="-78" stroke="${hull}" stroke-width="4"/>
    <path d="M 2 -76 Q 34 -52 2 -14 Z" fill="${sail}"/>
    <path d="M -2 -70 Q -30 -50 -2 -18 Z" fill="${sail}" opacity="0.85"/>
    <path d="M -52 -4 L -62 -14 L -50 -12 Z" fill="${p.accent}"/>
  </g>`;
}

const GENERATORS = {
  ocean(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid);
    s += `<rect x="0" y="330" width="800" height="170" fill="${p.water}"/>`;
    s += waves(p, rng, 345, p.ink);
    s += ship(rng, p, rng.range(300, 520), 330, rng.range(0.9, 1.3), false);
    if (rng.next() > 0.5) s += ship(rng, p, rng.range(90, 200), 345, 0.45, true);
    s += `<g opacity="0.8">${[0, 1, 2].map(() => `<path d="M ${rng.range(60, 740)} ${rng.range(60, 140)} q 6 -8 12 0 q 6 -8 12 0" fill="none" stroke="${p.ink}" stroke-width="2"/>`).join("")}</g>`;
    return svgWrap(s);
  },
  river(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 110);
    s += hills(p, rng, 250, 90, p.land, 2);
    const x0 = rng.range(330, 470);
    s += `<path d="M ${x0} 250 C 300 320, 520 360, 430 500 L 560 500 C 640 380, 480 320, ${x0 + 60} 250 Z" fill="${p.water}" opacity="0.95"/>`;
    s += `<path d="M ${x0 + 30} 270 C 360 330, 500 370, 460 470" fill="none" stroke="${p.ink}" stroke-width="2.5" opacity="0.4"/>`;
    for (let i = 0; i < 7; i++) s += tree(rng, rng.range(60, 300) + (i % 2) * 420, rng.range(300, 420), rng.range(0.5, 0.9), p.land2, p.land);
    return svgWrap(s);
  },
  forest(rng, p, uid) {
    const sx = rng.range(150, 650);
    let s = sky(p, uid);
    s += `<circle cx="${sx}" cy="120" r="120" fill="url(#glow-${uid})"/><circle cx="${sx}" cy="120" r="38" fill="${p.sun}"/>`;
    s += hills(p, rng, 300, 70, p.land, 2);
    for (let i = 0; i < 9; i++) s += tree(rng, rng.range(30, 770), rng.range(330, 470), rng.range(0.8, 1.6), i % 2 ? p.land2 : p.land, p.land2);
    for (let i = 0; i < 3; i++) s += `<path d="M ${rng.range(80, 720)} 500 L ${rng.range(80, 720) + 60} 240 L ${rng.range(80, 720) + 90} 500 Z" fill="${p.sun}" opacity="0.08"/>`;
    return svgWrap(s);
  },
  desert(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 120);
    s += `<path d="M -20 330 Q 200 260 420 330 T 820 320 L 820 520 L -20 520 Z" fill="${p.land}"/>`;
    s += `<path d="M -20 400 Q 260 340 520 400 T 820 390 L 820 520 L -20 520 Z" fill="${p.land2}"/>`;
    for (let i = 0; i < 3; i++) {
      const x = rng.range(80, 700), y = rng.range(360, 430);
      s += `<g transform="translate(${x},${y})"><rect x="-4" y="-34" width="8" height="34" fill="${p.land2}"/><path d="M -4 -22 L -18 -22 L -18 -8" stroke="${p.land2}" stroke-width="6" fill="none"/><path d="M 4 -28 L 16 -28 L 16 -14" stroke="${p.land2}" stroke-width="6" fill="none"/></g>`;
    }
    s += `<circle cx="${rng.range(200, 600)}" cy="${rng.range(300, 340)}" r="${rng.range(3, 5)}" fill="${p.accent}"/>`;
    return svgWrap(s);
  },
  mountains(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 100);
    const peaks = [[120, 300], [300, 210], [470, 290], [640, 200], [760, 310]];
    s += `<path d="M -20 340 L 120 300 L 300 210 L 470 290 L 640 200 L 760 310 L 820 280 L 820 520 L -20 520 Z" fill="${p.land}"/>`;
    for (const [x, y] of peaks) s += `<path d="M ${x} ${y} L ${x - 26} ${y + 42} L ${x + 26} ${y + 42} Z" fill="${p.sun}" opacity="0.9"/>`;
    s += `<path d="M -20 400 Q 200 350 420 400 T 820 390 L 820 520 L -20 520 Z" fill="${p.land2}"/>`;
    return svgWrap(s);
  },
  volcano(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 110);
    s += `<circle cx="400" cy="120" r="150" fill="url(#glow-${uid})"/>`;
    s += `<path d="M -20 460 L 250 250 L 340 330 L 400 210 L 470 330 L 560 260 L 820 460 Z" fill="${p.land}"/>`;
    s += `<path d="M 372 226 L 400 210 L 428 226 L 414 244 L 386 244 Z" fill="${p.accent}"/>`;
    for (let i = 0; i < 5; i++) {
      const y = 200 - i * 26, r = rng.range(8, 20);
      s += `<circle cx="${400 + rng.range(-14, 14)}" cy="${y}" r="${r}" fill="${p.ink}" opacity="${0.75 - i * 0.12}"/>`;
    }
    s += `<path d="M 330 470 Q 400 430 480 470 L 820 520 L -20 520 Z" fill="${p.land2}"/>`;
    for (let i = 0; i < 12; i++) s += `<circle cx="${rng.range(300, 500)}" cy="${rng.range(240, 300)}" r="${rng.range(1.5, 3)}" fill="${p.accent}" opacity="${rng.range(0.4, 1)}"/>`;
    return svgWrap(s);
  },
  meadow(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 105);
    s += hills(p, rng, 300, 80, p.land, 3);
    for (let i = 0; i < 26; i++) {
      const x = rng.range(20, 780), y = rng.range(320, 480), c = rng.pick([p.accent, p.sun, p.ink]);
      s += `<circle cx="${x}" cy="${y}" r="${rng.range(2.5, 5)}" fill="${c}" opacity="0.85"/>`;
    }
    for (let i = 0; i < 5; i++) s += tree(rng, rng.range(60, 740), rng.range(330, 420), rng.range(0.4, 0.7), p.land2, p.land);
    return svgWrap(s);
  },
  night(rng, p, uid) {
    let s = sky(p, uid) + stars(rng, p, 90);
    const mx = rng.range(560, 700), my = rng.range(70, 130);
    s += `<circle cx="${mx}" cy="${my}" r="46" fill="${p.sun}"/><circle cx="${mx - 14}" cy="${my - 8}" r="40" fill="${p.sky[0]}" opacity="0.92"/>`;
    s += hills(p, rng, 330, 90, p.land, 3);
    s += `<rect x="0" y="430" width="800" height="70" fill="${p.water}"/>` + waves(p, rng, 445, p.ink);
    return svgWrap(s);
  },
  city(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 130);
    s += `<rect x="0" y="360" width="800" height="140" fill="${p.land2}"/>`;
    for (let x = 10; x < 800; x += rng.range(46, 86)) {
      const w = rng.range(36, 64), h = rng.range(90, 250), y = 360 - h;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.land}"/>`;
      for (let wy = y + 12; wy < 350; wy += 22) for (let wx = x + 7; wx < x + w - 8; wx += 16) {
        if (rng.next() > 0.55) s += `<rect x="${wx}" y="${wy}" width="7" height="10" fill="${p.accent}" opacity="${rng.range(0.5, 1)}"/>`;
      }
    }
    return svgWrap(s);
  },
  canyon(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 110);
    s += `<path d="M -20 520 L -20 300 L 140 300 L 170 380 L 300 380 L 320 300 L 460 300 L 500 400 L 640 400 L 660 320 L 820 320 L 820 520 Z" fill="${p.land}"/>`;
    s += `<path d="M -20 520 L -20 400 L 200 400 L 240 460 L 420 460 L 460 410 L 820 410 L 820 520 Z" fill="${p.land2}"/>`;
    s += `<path d="M 60 330 L 780 330" stroke="${p.accent}" stroke-width="3" opacity="0.5"/>`;
    return svgWrap(s);
  },
  tundra(rng, p, uid) {
    let s = sky(p, uid) + stars(rng, p, 70);
    for (let i = 0; i < 3; i++) {
      const y = rng.range(70, 220);
      s += `<path d="M -20 ${y} C 150 ${y - 60}, 350 ${y + 50}, 820 ${y - 30}" fill="none" stroke="${i ? p.accent : p.sun}" stroke-width="${rng.range(14, 26)}" opacity="${rng.range(0.25, 0.5)}" stroke-linecap="round"/>`;
    }
    s += `<rect x="0" y="360" width="800" height="140" fill="#e9e4d8"/>`;
    s += `<path d="M -20 380 Q 200 360 400 382 T 820 376" fill="none" stroke="${p.land2}" stroke-width="3" opacity="0.4"/>`;
    for (let i = 0; i < 5; i++) s += tree(rng, rng.range(40, 760), rng.range(380, 440), rng.range(0.4, 0.7), p.land2, p.land);
    return svgWrap(s);
  },
  swamp(rng, p, uid) {
    let s = sky(p, uid) + sunOrMoon(p, rng, uid, 120);
    s += stars(rng, p, 24);
    s += `<rect x="0" y="350" width="800" height="150" fill="${p.water}"/>`;
    s += waves(p, rng, 365, p.ink);
    for (let i = 0; i < 6; i++) {
      const x = rng.range(50, 750), y = rng.range(340, 380), h = rng.range(70, 130);
      s += `<g transform="translate(${x},${y})">
        <path d="M 0 0 C ${rng.range(-8, 8)} -${h * 0.5}, ${rng.range(-14, 14)} -${h * 0.8}, ${rng.range(-6, 6)} -${h}" stroke="${p.land2}" stroke-width="7" fill="none"/>
        <path d="M ${rng.range(-4, 4)} -${h * 0.55} l ${rng.range(14, 30)} -${rng.range(6, 16)}" stroke="${p.land2}" stroke-width="4"/>
        <path d="M ${rng.range(-4, 4)} -${h * 0.75} l ${rng.range(-30, -14)} -${rng.range(6, 16)}" stroke="${p.land2}" stroke-width="4"/>
      </g>`;
      s += `<ellipse cx="${x}" cy="${y + 6}" rx="26" ry="5" fill="${p.land}" opacity="0.6"/>`;
    }
    return svgWrap(s);
  },
};

export function renderScene(family, palette, rng) {
  const uid = Math.floor(rng.next() * 1e9).toString(36);
  const gen = GENERATORS[family] || GENERATORS.meadow;
  const names = SCENE_NAMES[family] || SCENE_NAMES.meadow;
  return { svg: gen(rng, palette, uid), name: rng.pick(names) };
}
