export const FAMILIES = ["ocean", "forest", "stars", "desert", "mountains", "aurora", "city", "meadow", "canyon", "lake", "sakura", "tundra", "waterfall", "lavender", "volcano", "lighthouse"];

export const PALETTES = {
  ocean: [
    { sky: "#bfe3ea", sea: "#1f6f8b", sun: "#f6e7c1" },
    { sky: "#2b3a67", sea: "#0e2a47", sun: "#e8e4d8" },
    { sky: "#f4c7a1", sea: "#7a4e57", sun: "#f9e2b8" },
    { sky: "#9fd8cb", sea: "#2e7d6e", sun: "#fff3d6" },
    { sky: "#d9c8e8", sea: "#4a3b6b", sun: "#f2e6ff" },
    { sky: "#f2e0c8", sea: "#a86a4a", sun: "#fff0d0" },
    { sky: "#0e3a4a", sea: "#061e2a", sun: "#cfe8f0" },
    { sky: "#e8d0e0", sea: "#5e4a6e", sun: "#ffe8f0" }
  ],
  forest: [
    { sky: "#dcefe0", back: "#9cc5a1", mid: "#5d8f6a", front: "#2c5540", mist: "#eef7ee" },
    { sky: "#1d2b26", back: "#2e4a3e", mid: "#1f3a30", front: "#122a22", mist: "#33524a" },
    { sky: "#f2d8b8", back: "#c9a06a", mid: "#8a6a45", front: "#54402a", mist: "#f7e8cf" },
    { sky: "#cfd8e8", back: "#8fa3bd", mid: "#5c7189", front: "#33465c", mist: "#e6ecf4" },
    { sky: "#e8c9d4", back: "#b98a9c", mid: "#7d5a6e", front: "#4c3644", mist: "#f4e2e8" },
    { sky: "#d4e8d8", back: "#a8c8a0", mid: "#6a9a70", front: "#3a5c40", mist: "#f0f8ec" },
    { sky: "#2a2438", back: "#3d3455", mid: "#2c2544", front: "#1a1630", mist: "#453c66" },
    { sky: "#f0e8d0", back: "#cbb488", mid: "#9a8a5e", front: "#5e5238", mist: "#faf4e4" }
  ],
  stars: [
    { sky: "#050914", glow: "#1b2a4a", star: "#f4efe2" },
    { sky: "#12082b", glow: "#3b1d5e", star: "#e8d8ff" },
    { sky: "#081c1c", glow: "#14424a", star: "#c8f0e8" },
    { sky: "#1c0f0a", glow: "#4a2417", star: "#ffd9b0" },
    { sky: "#0a1030", glow: "#22366e", star: "#d0e2ff" },
    { sky: "#0e0a24", glow: "#2c1d52", star: "#ffe4f0" },
    { sky: "#101820", glow: "#1f3a4a", star: "#e8f4f8" },
    { sky: "#1a0f1e", glow: "#4a2452", star: "#f0e0ff" }
  ],
  desert: [
    { sky: "#f7d9a8", dune1: "#e0a866", dune2: "#c07f3e", dune3: "#8f5a28", sun: "#fff0d0" },
    { sky: "#e8b4b8", dune1: "#d98a80", dune2: "#b85f62", dune3: "#7e3a44", sun: "#ffe8e0" },
    { sky: "#2e2a4a", dune1: "#6b5a8a", dune2: "#4a3d66", dune3: "#2c2440", sun: "#f2e6ff" },
    { sky: "#cfe8e0", dune1: "#a8cbb8", dune2: "#6f9e82", dune3: "#47705c", sun: "#ffffff" },
    { sky: "#f4e3c8", dune1: "#e6c890", dune2: "#c49a5a", dune3: "#8a6a3a", sun: "#fff8e8" },
    { sky: "#f0c9b0", dune1: "#d9986a", dune2: "#b06a42", dune3: "#7a452c", sun: "#ffe8c8" },
    { sky: "#d8dce8", dune1: "#b0b8cc", dune2: "#8a94b0", dune3: "#5c6680", sun: "#ffffff" },
    { sky: "#3a2e4a", dune1: "#7a5a8a", dune2: "#54406a", dune3: "#342848", sun: "#e8d8ff" }
  ],
  mountains: [
    { sky: "#cfe4f2", far: "#9db8cc", mid: "#6c8ba3", near: "#3c5a72", snow: "#ffffff" },
    { sky: "#f2c9a0", far: "#c98a6a", mid: "#96604a", near: "#5e3a30", snow: "#ffe8d8" },
    { sky: "#1c2b3a", far: "#3a5468", mid: "#243c4e", near: "#12222e", snow: "#dfeaf2" },
    { sky: "#d8e8d0", far: "#9cbb8a", mid: "#6a8f5c", near: "#3d5c36", snow: "#f4fff0" },
    { sky: "#e0d4ec", far: "#a48cbd", mid: "#6f5a8a", near: "#453a5c", snow: "#f8f2ff" },
    { sky: "#f4e0d0", far: "#d0a890", mid: "#a87a60", near: "#6e4c3a", snow: "#fff4ea" },
    { sky: "#c8dce8", far: "#8aa8c0", mid: "#5c7a94", near: "#38506a", snow: "#f0f8ff" },
    { sky: "#2a3040", far: "#44506a", mid: "#2c3650", near: "#1a2030", snow: "#c8d8e8" }
  ],
  aurora: [
    { sky: "#04121f", a1: "#3ee6a8", a2: "#2aa8e0", star: "#dff2ff" },
    { sky: "#0a0a24", a1: "#8a5cf6", a2: "#e05cd0", star: "#efe4ff" },
    { sky: "#061a1a", a1: "#2ee6c8", a2: "#7ee06a", star: "#e0fff4" },
    { sky: "#140a2a", a1: "#f65c8a", a2: "#8a5cf6", star: "#ffe4f0" },
    { sky: "#081226", a1: "#5cd0f6", a2: "#3ee6a8", star: "#e4f4ff" },
    { sky: "#0a1a12", a1: "#e6d44a", a2: "#3ee6a8", star: "#f4ffe0" },
    { sky: "#160a1a", a1: "#f6a85c", a2: "#c85cf6", star: "#ffe8dc" },
    { sky: "#081a2e", a1: "#4ab8f6", a2: "#8a7af6", star: "#e0ecff" }
  ],
  city: [
    { sky: "#0b1026", far: "#232c4e", near: "#141b36", win: "#f6d98a" },
    { sky: "#2b1a3a", far: "#4a2c5e", near: "#2e1a42", win: "#ffb8d0" },
    { sky: "#0e2233", far: "#1f3d52", near: "#122838", win: "#a8e6f0" },
    { sky: "#301a1a", far: "#542c2c", near: "#361e1e", win: "#ffc890" },
    { sky: "#101828", far: "#26324a", near: "#161e30", win: "#c8f0c8" },
    { sky: "#1a1430", far: "#322a52", near: "#201a3a", win: "#d0b8f0" },
    { sky: "#0e2a2a", far: "#1f4a4a", near: "#12302f", win: "#a8f0e0" },
    { sky: "#241a2e", far: "#3c2c4a", near: "#281e34", win: "#f0d8a8" }
  ],
  meadow: [
    { sky: "#cfe8f4", hill: "#8fc47a", grass: "#5a9e52", flower: "#f6e7c1" },
    { sky: "#f4e3c8", hill: "#d9b878", grass: "#a8894e", flower: "#fff4f0" },
    { sky: "#e8d8ec", hill: "#b898c8", grass: "#7d5e8a", flower: "#f2e6ff" },
    { sky: "#d4ecdc", hill: "#9ccca0", grass: "#5e9a6a", flower: "#ffd0d8" },
    { sky: "#f2ecd4", hill: "#cfc48e", grass: "#9a9a5e", flower: "#f6e7c1" },
    { sky: "#dce8f0", hill: "#a0b8cc", grass: "#6a8aa0", flower: "#e8f0ff" },
    { sky: "#f0dcd8", hill: "#d0a898", grass: "#9a6e62", flower: "#ffe8e0" },
    { sky: "#e0f0e8", hill: "#98c8a8", grass: "#5e9a78", flower: "#f0fff4" }
  ],
  canyon: [
    { sky: "#f4c9a0", r1: "#d98a5a", r2: "#b85f3c", r3: "#7e3a28", floor: "#e8b088" },
    { sky: "#c9d8e8", r1: "#8fa3b8", r2: "#5c7189", r3: "#33465c", floor: "#a8bcc8" },
    { sky: "#2a2438", r1: "#5c4a7a", r2: "#3d3052", r3: "#241c33", floor: "#4a3d5e" },
    { sky: "#f0dcd0", r1: "#d9a898", r2: "#b07868", r3: "#7a4c40", floor: "#e8c4b8" },
    { sky: "#d4e8e0", r1: "#8ab8a8", r2: "#5e8a7a", r3: "#3a5c4e", floor: "#b8d8cc" },
    { sky: "#f4d8b8", r1: "#e0a878", r2: "#c07a4a", r3: "#8a5230", floor: "#f0c8a0" },
    { sky: "#dcd8f0", r1: "#a898c8", r2: "#7a6aa8", r3: "#524a78", floor: "#c8c0e0" },
    { sky: "#1e2830", r1: "#3c4c56", r2: "#28343c", r3: "#1a2228", floor: "#44545e" }
  ],
  lake: [
    { sky: "#cfe4f2", water: "#5e8aa8", shore: "#3c5a4c", refl: "#e8f2f8" },
    { sky: "#f2c9a0", water: "#a86a5a", shore: "#5e3a30", refl: "#ffe0c8" },
    { sky: "#1c2b3a", water: "#24384a", shore: "#12222e", refl: "#8ab8d8" },
    { sky: "#e0d4ec", water: "#7a6a9e", shore: "#453a5c", refl: "#e8dcff" },
    { sky: "#d8e8d0", water: "#6a9a7d", shore: "#3d5c36", refl: "#eef8e8" },
    { sky: "#f4e8d8", water: "#c8a878", shore: "#7a6248", refl: "#fff4e0" },
    { sky: "#d8e0f0", water: "#7a8ac0", shore: "#4a5480", refl: "#e8eeff" },
    { sky: "#2a2438", water: "#3a3f5e", shore: "#241f38", refl: "#a8b8e8" }
  ],
  sakura: [
    { sky: "#f6dce4", branch: "#5c3a44", bloom: "#f2aec4", bloom2: "#f8d0dc" },
    { sky: "#e8f0f4", branch: "#3c4a54", bloom: "#f6c9d4", bloom2: "#fadfe6" },
    { sky: "#f2e4d0", branch: "#6b4a34", bloom: "#f0b8c8", bloom2: "#f8d8e0" },
    { sky: "#dcd8f0", branch: "#443a5c", bloom: "#e8aec8", bloom2: "#f2d0e0" },
    { sky: "#f8ecf0", branch: "#4c3a40", bloom: "#f4b8cc", bloom2: "#fadce4" },
    { sky: "#e0ecf4", branch: "#3a4a5c", bloom: "#f0c8d8", bloom2: "#d8ecf8" },
    { sky: "#f4f0e0", branch: "#5c5240", bloom: "#f2c4d0", bloom2: "#f8e8c8" },
    { sky: "#e8e0f0", branch: "#4c4460", bloom: "#e0a8d0", bloom2: "#f0e0f8" }
  ],
  tundra: [
    { sky: "#d8e8f0", snow: "#f4f8fa", hill: "#c8d8dc", ice: "#a8ccd8" },
    { sky: "#2a3a4a", snow: "#d8e4ea", hill: "#8aa0ac", ice: "#5e7a8a" },
    { sky: "#f0d8c8", snow: "#faf0e8", hill: "#d8c0b0", ice: "#b09a8a" },
    { sky: "#d4e0e8", snow: "#eef4f6", hill: "#a8bcc8", ice: "#7a9aac" },
    { sky: "#e0d8e8", snow: "#f6f0f8", hill: "#c0b0cc", ice: "#9a8ab0" },
    { sky: "#dce8e8", snow: "#f2f8f8", hill: "#b0c8c8", ice: "#88b0b8" },
    { sky: "#3a3040", snow: "#c8c0d0", hill: "#6a5c78", ice: "#4a4058" },
    { sky: "#e8e4d8", snow: "#faf8f0", hill: "#c8c0a8", ice: "#a8a088" }
  ],
  waterfall: [
    { sky: "#cfe4ec", rock: "#5c6a72", water: "#dff2f8", mist: "#ffffff", moss: "#4e7a52" },
    { sky: "#f2d8c0", rock: "#7a5c4a", water: "#f8e8d8", mist: "#fff4e8", moss: "#8a6a3a" },
    { sky: "#1c2b33", rock: "#33424a", water: "#a8d8e8", mist: "#d8ecf4", moss: "#2c4a3a" },
    { sky: "#e0d8f0", rock: "#5c5470", water: "#f0e8ff", mist: "#ffffff", moss: "#4a5e7a" },
    { sky: "#d4ecd8", rock: "#4a5c50", water: "#e8f8ec", mist: "#ffffff", moss: "#33523e" },
    { sky: "#e8dce0", rock: "#6a5c64", water: "#f8e8f0", mist: "#fff8fc", moss: "#5e4a5e" },
    { sky: "#dce8f4", rock: "#4c5c6a", water: "#e8f4ff", mist: "#ffffff", moss: "#3a5e6e" },
    { sky: "#2c2836", rock: "#3e3a4c", water: "#b8d8f0", mist: "#d8e8f4", moss: "#2e4a4e" }
  ],
  lavender: [
    { sky: "#dcd0f0", hill: "#7d5e9e", row1: "#9678b8", row2: "#6a4a8a", row3: "#54387a", dot: "#c8b0e0" },
    { sky: "#f0e0d0", hill: "#b8896a", row1: "#a06a9e", row2: "#8a5488", row3: "#6e3a70", dot: "#e0c8d8" },
    { sky: "#1e2438", hill: "#3a4468", row1: "#5c6a9e", row2: "#4a5688", row3: "#3a4470", dot: "#8a9ec8" },
    { sky: "#e8f0e0", hill: "#8aa87d", row1: "#7d5e9e", row2: "#6a4a8a", row3: "#54387a", dot: "#b8d0a8" },
    { sky: "#f2ecd8", hill: "#c8b078", row1: "#9678b8", row2: "#7d5e9e", row3: "#6a4a8a", dot: "#f0e0b0" },
    { sky: "#e0d8f0", hill: "#8a7ab0", row1: "#a898cc", row2: "#7a68ae", row3: "#5e5090", dot: "#d8ccf0" },
    { sky: "#f4e0e8", hill: "#c08aa0", row1: "#b878a8", row2: "#9a5a8a", row3: "#783e70", dot: "#f0c8d8" },
    { sky: "#2a2440", hill: "#453a66", row1: "#6a5a96", row2: "#544382", row3: "#403468", dot: "#9a8ac0" }
  ],
  volcano: [
    { sky: "#f2c9b0", mtn: "#4a3a34", lava: "#e8542e", glow: "#ffb060", smoke: "#8a7a70" },
    { sky: "#2a2438", mtn: "#1c1826", lava: "#ff6a3a", glow: "#ff9a50", smoke: "#4a4258" },
    { sky: "#d8e0e8", mtn: "#3c4654", lava: "#e8542e", glow: "#ffd0a0", smoke: "#9aa8b4" },
    { sky: "#f4dcd8", mtn: "#5c4440", lava: "#d84a2a", glow: "#ffc8a0", smoke: "#b09a94" },
    { sky: "#30343e", mtn: "#20242c", lava: "#ff7a45", glow: "#ffb070", smoke: "#3c4450" },
    { sky: "#e8d0c8", mtn: "#54443c", lava: "#f05a2e", glow: "#ffc890", smoke: "#a89888" },
    { sky: "#d0dce8", mtn: "#44525e", lava: "#e85a2a", glow: "#ffd8b0", smoke: "#8a9aa8" },
    { sky: "#3a2a3a", mtn: "#241c28", lava: "#ff8a4a", glow: "#ffb080", smoke: "#524a5e" }
  ],
  lighthouse: [
    { sky: "#cfe0ec", sea: "#4a7a9e", rock: "#5c5a54", tower: "#f4efe2", stripe: "#c04a3a", beam: "#fff2c0" },
    { sky: "#f2c9a0", sea: "#8a5a4a", rock: "#4c3a30", tower: "#f8e8d8", stripe: "#3a5c8a", beam: "#ffe8b0" },
    { sky: "#1c2b3a", sea: "#16283a", rock: "#2c3238", tower: "#d8dee4", stripe: "#8a2a20", beam: "#cfe8ff" },
    { sky: "#dcd8f0", sea: "#5c5a8a", rock: "#4a4458", tower: "#f0ecf8", stripe: "#7a3a6e", beam: "#e8dcff" },
    { sky: "#d8e8dc", sea: "#4a7a62", rock: "#3c4a40", tower: "#eef4ee", stripe: "#2e6e4a", beam: "#f0ffe0" },
    { sky: "#f4e4d8", sea: "#9e6a4a", rock: "#544438", tower: "#f8f0e4", stripe: "#b0562e", beam: "#ffe8c8" },
    { sky: "#d0e0f0", sea: "#4a6a9a", rock: "#48525e", tower: "#eef4fa", stripe: "#2e4a7a", beam: "#e0f0ff" },
    { sky: "#2e2a3e", sea: "#1c2836", rock: "#30303c", tower: "#e0e4ec", stripe: "#c04a5a", beam: "#e8f0ff" }
  ]
};

export const SCENE_NAMES = {
  en: { ocean: "The Last Ferry Home", forest: "Cathedral of Pines", stars: "A Sky Full of Maybe", desert: "Dunes That Remember", mountains: "The Quiet Ascent", aurora: "Lights Over the Fjord", city: "Neon at 3 AM", meadow: "Wildflower Static", canyon: "Echoes in the Rock", lake: "The Mirror Lake", sakura: "Petals on the Wind", tundra: "White Horizon", waterfall: "The Long Fall", lavender: "Purple Fields at Dusk", volcano: "Ember Mountain", lighthouse: "The Keeper's Light" },
  ru: { ocean: "Последний паром домой", forest: "Собор сосен", stars: "Небо, полное «может быть»", desert: "Дюны, которые помнят", mountains: "Тихий подъём", aurora: "Огни над фьордом", city: "Неон в три ночи", meadow: "Дикие травы", canyon: "Эхо в скалах", lake: "Зеркальное озеро", sakura: "Лепестки на ветру", tundra: "Белый горизонт", waterfall: "Долгое падение", lavender: "Лавандовые поля на закате", volcano: "Гора углей", lighthouse: "Свет хранителя" },
  be: { ocean: "Апошні паром дадому", forest: "Собор саснаў", stars: "Неба, поўнае «можа быць»", desert: "Дюны, якія памятаюць", mountains: "Ціхі ўздым", aurora: "Агні над фіордам", city: "Неон а тры ночы", meadow: "Дзікія травы", canyon: "Рэха ў скалах", lake: "Люстранае возера", sakura: "Лепесткі на ветры", tundra: "Белы гарызонт", waterfall: "Доўгае падзенне", lavender: "Лавандовыя палі на захадзе", volcano: "Гара вугалю", lighthouse: "Святло захавальніка" },
  fr: { ocean: "Le Dernier Ferry du Soir", forest: "La Cathédrale des Pins", stars: "Un Ciel Plein de Peut-être", desert: "Les Dunes qui se Souviement", mountains: "L'Ascension Silencieuse", aurora: "Des Lumières sur le Fjord", city: "Néon à 3h du Matin", meadow: "Les Herbes Sauvages", canyon: "L'Écho des Rochers", lake: "Le Lac Miroir", sakura: "Pétales au Vent", tundra: "L'Horizon Blanc", waterfall: "La Longue Chute", lavender: "Champs de Lavande au Crépuscule", volcano: "La Montagne de Braise", lighthouse: "La Lumière du Gardien" }
};

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) < 128;
}

function skyRect(p, W, H) {
  const overlay = isDark(p.sky) ? "#000000" : "#ffffff";
  return `<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky}"/><stop offset="0.55" stop-color="${p.sky}"/><stop offset="1" stop-color="${overlay}" stop-opacity="0.32"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#skyG)"/>`;
}

function clouds(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = 60 + rng() * 680, y = 40 + rng() * 130, sc = 0.7 + rng() * 0.8;
    s += `<g fill="${color}" opacity="0.75" transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${sc.toFixed(2)})"><ellipse cx="0" cy="0" rx="36" ry="13"/><ellipse cx="28" cy="4" rx="26" ry="11"/><ellipse cx="-28" cy="5" rx="23" ry="10"/></g>`;
  }
  return s;
}

function birds(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = 90 + rng() * 620, y = 80 + rng() * 130, sc = 0.6 + rng() * 0.7;
    s += `<path d="M0 0 q7 -8 14 0 q7 -8 14 0" transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${sc.toFixed(2)})" stroke="${color}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}

function starsSVG(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += `<circle cx="${(rng() * 800).toFixed(1)}" cy="${(rng() * 260).toFixed(1)}" r="${(rng() * 1.7 + 0.4).toFixed(2)}" fill="${color}" opacity="${(rng() * 0.6 + 0.4).toFixed(2)}"/>`;
  }
  return s;
}

function treeRow(rng, color, baseY, hMax) {
  let s = "", x = -20;
  while (x < 820) {
    const h = 45 + rng() * hMax, w = h * 0.5;
    s += `<path d="M${x.toFixed(1)} ${baseY + 40} L${(x + w / 2).toFixed(1)} ${baseY + 40 - h} L${(x + w).toFixed(1)} ${baseY + 40} Z" fill="${color}"/>`;
    x += w * (0.7 + rng() * 0.5);
  }
  return s;
}

function cityRow(rng, color, baseY, hMax, win) {
  let s = "", x = 0;
  while (x < 800) {
    const w = 32 + rng() * 54, h = 55 + rng() * hMax;
    s += `<rect x="${x.toFixed(1)}" y="${(baseY + 60 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${color}"/>`;
    for (let wy = baseY + 70 - h; wy < baseY + 40; wy += 17) {
      for (let wx = x + 5; wx < x + w - 6; wx += 13) {
        if (rng() > 0.45) s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="6" height="9" fill="${win}" opacity="${(rng() * 0.5 + 0.5).toFixed(2)}"/>`;
      }
    }
    x += w + 4 + rng() * 15;
  }
  return s;
}

function flowers(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += `<circle cx="${(rng() * 800).toFixed(1)}" cy="${(360 + rng() * 80).toFixed(1)}" r="${(2.5 + rng() * 3).toFixed(1)}" fill="${color}" opacity="0.9"/>`;
  }
  return s;
}

function blooms(rng, c1, c2, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = rng() * 800, y = 130 + rng() * 240, r = 5 + rng() * 8, c = rng() > 0.5 ? c1 : c2;
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2;
      s += `<circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" r="${(r * 0.7).toFixed(1)}" fill="${c}" opacity="0.85"/>`;
    }
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.45).toFixed(1)}" fill="#f6e7c1" opacity="0.9"/>`;
  }
  return s;
}

function petals(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = rng() * 800, y = 150 + rng() * 280, r = 3 + rng() * 3;
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.6).toFixed(1)}" fill="${color}" opacity="0.7" transform="rotate(${(rng() * 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return s;
}

function lavenderRows(rng, rows, dot) {
  let s = "";
  [315, 355, 395].forEach((y, i) => {
    let x = -10 + rng() * 20;
    while (x < 820) {
      s += `<circle cx="${x.toFixed(1)}" cy="${(y + rng() * 9).toFixed(1)}" r="${(4 + i * 1.4).toFixed(1)}" fill="${rows[i]}"/><circle cx="${x.toFixed(1)}" cy="${(y - 7 + rng() * 5).toFixed(1)}" r="${(3 + i).toFixed(1)}" fill="${dot}"/>`;
      x += 15 + i * 5;
    }
  });
  return s;
}

export function renderScene(family, paletteIndex, seed) {
  const rng = mulberry32((seed >>> 0) || 1);
  const p = PALETTES[family][Math.max(0, Math.min(7, paletteIndex | 0))];
  const W = 800, H = 500;
  const sky = skyRect(p, W, H);
  const day = !isDark(p.sky);
  const cl = day ? "#ffffff" : "#d8e2ee";
  let inner = "";
  switch (family) {
    case "ocean":
      inner = sky + clouds(rng, cl, 2) + `
        <circle cx="${590 + rng() * 90}" cy="${100 + rng() * 50}" r="38" fill="${p.sun}"/>
        <circle cx="${590 + rng() * 90}" cy="${100 + rng() * 50}" r="52" fill="${p.sun}" opacity="0.25"/>
        <rect y="310" width="${W}" height="${H - 310}" fill="${p.sea}"/>
        <path d="M0 310 Q 200 303 400 310 T 800 310 L 800 324 Q 600 331 400 324 T 0 324 Z" fill="${p.sea}" opacity="0.7"/>
        <g transform="translate(${190 + rng() * 180}, 310)">
          <path d="M-50 0 L50 0 L37 18 L-37 18 Z" fill="#3a2c22"/>
          <rect x="-3" y="-58" width="5" height="58" fill="#3a2c22"/>
          <path d="M2 -58 L2 -14 L38 -14 Z" fill="#f4efe2"/>
          <path d="M-2 -51 L-2 -16 L-31 -16 Z" fill="#e9dcb8"/>
        </g>
        <path d="M0 355 Q 200 349 400 355 T 800 355" stroke="${p.sun}" stroke-width="2.4" fill="none" opacity="0.4"/>
        <path d="M0 390 Q 200 384 400 390 T 800 390" stroke="${p.sun}" stroke-width="2.4" fill="none" opacity="0.3"/>
        <path d="M0 425 Q 200 419 400 425 T 800 425" stroke="${p.sun}" stroke-width="2.4" fill="none" opacity="0.22"/>
        <path d="M0 462 Q 200 456 400 462 T 800 462" stroke="${p.sun}" stroke-width="2.4" fill="none" opacity="0.16"/>
        ${birds(rng, day ? "#3a4a54" : "#cfd8e2", 3)}`;
      break;
    case "forest":
      inner = sky + clouds(rng, cl, 2) + `
        <rect y="370" width="${W}" height="${H - 370}" fill="${p.mist}" opacity="0.5"/>
        ${treeRow(rng, p.back, 285, 150)}
        ${treeRow(rng, p.mid, 350, 120)}
        ${treeRow(rng, p.front, 425, 90)}
        ${treeRow(rng, p.front, 485, 60)}
        ${birds(rng, day ? "#2c3a34" : "#9fb0a8", 2)}`;
      break;
    case "stars":
      inner = sky + `
        <ellipse cx="400" cy="150" rx="320" ry="100" fill="${p.glow}" opacity="0.55"/>
        <ellipse cx="${160 + rng() * 220}" cy="370" rx="240" ry="70" fill="${p.glow}" opacity="0.3"/>
        ${starsSVG(rng, p.star, 170)}
        <path d="M${130 + rng() * 90} 70 l66 16" stroke="${p.star}" stroke-width="2.2" opacity="0.8" stroke-linecap="round"/>
        <path d="M${152 + rng() * 90} 60 l-9 20" stroke="${p.star}" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
        <circle cx="${590 + rng() * 70}" cy="${95 + rng() * 50}" r="34" fill="${p.star}" opacity="0.9"/>
        <circle cx="${577 + rng() * 70}" cy="${88 + rng() * 50}" r="29" fill="${p.sky}"/>
        <path d="M0 ${H} L130 420 L280 ${H} Z" fill="${p.glow}" opacity="0.5"/>
        <path d="M320 ${H} L500 400 L680 ${H} Z" fill="${p.glow}" opacity="0.4"/>
        <path d="M600 ${H} L700 435 L800 ${H} Z" fill="${p.glow}" opacity="0.5"/>`;
      break;
    case "desert":
      inner = sky + clouds(rng, cl, 2) + `
        <circle cx="${610 + rng() * 70}" cy="${105 + rng() * 40}" r="40" fill="${p.sun}"/>
        <circle cx="${610 + rng() * 70}" cy="${105 + rng() * 40}" r="58" fill="${p.sun}" opacity="0.25"/>
        <path d="M0 330 Q 250 308 500 332 T 800 322 L 800 370 Q 500 384 250 366 T 0 376 Z" fill="${p.dune1}" opacity="0.6"/>
        <path d="M0 370 Q 210 335 420 362 T 800 350 L 800 ${H} L 0 ${H} Z" fill="${p.dune1}"/>
        <path d="M0 420 Q 280 385 500 415 T 800 405 L 800 ${H} L 0 ${H} Z" fill="${p.dune2}"/>
        <path d="M0 465 Q 320 440 590 465 T 800 455 L 800 ${H} L 0 ${H} Z" fill="${p.dune3}"/>
        <path d="M70 385 q65 -9 130 0 M440 398 q75 -10 150 0" stroke="${p.dune3}" stroke-width="3.5" fill="none" opacity="0.5"/>
        <g transform="translate(${150 + rng() * 90}, 455)" fill="${p.dune3}">
          <path d="M0 0 q7 -30 14 0 q7 -23 14 0 q-14 7 -28 0 Z"/>
        </g>
        <g transform="translate(${630 + rng() * 70}, 432)">
          <path d="M0 0 v-34 M0 -34 q-11 -5 -13 -16 M0 -34 q11 -5 13 -16" stroke="${p.dune2}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
        </g>
        ${birds(rng, day ? "#5c4a34" : "#c8b8a0", 2)}`;
      break;
    case "mountains":
      inner = sky + clouds(rng, cl, 3) + `
        <circle cx="${150 + rng() * 70}" cy="${95 + rng() * 40}" r="33" fill="#f6efe2" opacity="0.9"/>
        <path d="M0 420 L130 270 L240 410 L340 300 L450 420 Z" fill="${p.far}" opacity="0.7"/>
        <path d="M0 ${H} L170 220 L280 370 L410 ${H} Z" fill="${p.far}"/>
        <path d="M170 220 L215 290 L125 290 Z" fill="${p.snow}" opacity="0.9"/>
        <path d="M260 ${H} L460 170 L660 ${H} Z" fill="${p.mid}"/>
        <path d="M460 170 L520 270 L400 270 Z" fill="${p.snow}"/>
        <path d="M390 320 q33 20 66 11 M490 370 q44 13 88 5" stroke="${p.near}" stroke-width="3.5" fill="none" opacity="0.5"/>
        <path d="M510 ${H} L680 270 L800 ${H} Z" fill="${p.far}"/>
        <path d="M0 420 Q 400 395 800 430 L 800 ${H} L 0 ${H} Z" fill="${p.near}"/>
        ${birds(rng, day ? "#2e3e4c" : "#aebfd0", 3)}`;
      break;
    case "aurora":
      inner = sky + `
        ${starsSVG(rng, p.star, 120)}
        <path d="M-20 250 C 160 70, 340 320, 530 150 S 760 220, 840 110 L 840 50 C 640 170, 440 25, 260 200 S 40 150, -20 220 Z" fill="${p.a1}" opacity="0.55"/>
        <path d="M-20 320 C 190 170, 380 390, 590 220 S 780 290, 840 200 L 840 135 C 660 255, 460 110, 270 270 S 60 235, -20 295 Z" fill="${p.a2}" opacity="0.4"/>
        <path d="M-20 200 C 210 70, 440 270, 670 125 L 670 90 C 460 235, 230 38, -20 160 Z" fill="${p.a1}" opacity="0.3"/>
        <path d="M0 ${H} L210 410 L440 ${H} Z" fill="#0a1420" opacity="0.8"/>
        <path d="M440 ${H} L640 420 L800 ${H} Z" fill="#0a1420" opacity="0.7"/>`;
      break;
    case "city":
      inner = sky + `
        <circle cx="${640 + rng() * 70}" cy="${85 + rng() * 35}" r="26" fill="#f4efe2" opacity="0.85"/>
        <circle cx="${640 + rng() * 70}" cy="${85 + rng() * 35}" r="40" fill="#f4efe2" opacity="0.15"/>
        ${cityRow(rng, p.far, 235, 120, p.win)}
        ${cityRow(rng, p.far, 295, 155, p.win)}
        ${cityRow(rng, p.near, 370, 130, p.win)}
        <line x1="${130 + rng() * 90}" y1="295" x2="${130 + rng() * 90}" y2="252" stroke="${p.near}" stroke-width="3.5"/>
        <circle cx="${130 + rng() * 90}" cy="250" r="3.5" fill="#e86a5a"/>
        <rect y="470" width="${W}" height="${H - 470}" fill="#0a0e1a"/>
        <path d="M0 470 h800" stroke="${p.win}" stroke-width="1.6" opacity="0.4"/>`;
      break;
    case "meadow":
      inner = sky + clouds(rng, cl, 3) + `
        <circle cx="${160 + rng() * 90}" cy="${95 + rng() * 40}" r="33" fill="#fdf6dd"/>
        <path d="M0 320 Q 400 265 800 330 L 800 ${H} L 0 ${H} Z" fill="${p.hill}"/>
        <path d="M0 370 Q 400 330 800 375 L 800 ${H} L 0 ${H} Z" fill="${p.grass}" opacity="0.85"/>
        <path d="M0 410 Q 400 365 800 415 L 800 ${H} L 0 ${H} Z" fill="${p.grass}"/>
        <path d="M345 ${H} Q 380 430 368 390" stroke="#e8d9b0" stroke-width="30" fill="none" opacity="0.35"/>
        ${flowers(rng, p.flower, 80)}
        ${birds(rng, "#3a4a3e", 2)}`;
      break;
    case "canyon":
      inner = sky + clouds(rng, cl, 2) + `
        <circle cx="${400 + rng() * 70}" cy="${110}" r="36" fill="#fdf0d8"/>
        <path d="M0 ${H} L0 200 L130 240 L130 ${H} Z" fill="${p.r1}"/>
        <path d="M800 ${H} L800 175 L650 235 L650 ${H} Z" fill="${p.r2}"/>
        <path d="M0 250 q65 11 130 45 M0 320 q55 13 110 33 M650 285 q75 16 150 11 M672 360 q65 11 128 7" stroke="${p.r3}" stroke-width="4.5" fill="none" opacity="0.4"/>
        <path d="M130 240 L130 320 L65 ${H} L0 ${H} L0 295 Z" fill="${p.r2}" opacity="0.9"/>
        <path d="M650 235 L650 310 L735 ${H} L800 ${H} L800 285 Z" fill="${p.r1}" opacity="0.9"/>
        <path d="M0 ${H} L 400 410 L 800 ${H} Z" fill="${p.r3}"/>
        <path d="M210 ${H} q190 -45 380 0" stroke="${p.floor}" stroke-width="9" fill="none" opacity="0.6"/>
        <rect y="${H - 32}" width="${W}" height="32" fill="${p.floor}"/>
        ${birds(rng, day ? "#4c3a28" : "#c8b8a8", 2)}`;
      break;
    case "lake":
      inner = sky + clouds(rng, cl, 2) + `
        <circle cx="${590 + rng() * 70}" cy="${95 + rng() * 40}" r="31" fill="${p.refl}"/>
        <path d="M0 295 Q 400 260 800 300 L 800 310 L 0 310 Z" fill="${p.shore}"/>
        <path d="M0 303 Q 400 282 800 305" stroke="${p.shore}" stroke-width="7" fill="none" opacity="0.6"/>
        <rect y="310" width="${W}" height="${H - 310}" fill="${p.water}"/>
        <g transform="translate(${210 + rng() * 220}, 310)">
          <path d="M-44 0 L44 0 L33 14 L-33 14 Z" fill="#2c2018"/>
          <path d="M0 0 L0 -38" stroke="#2c2018" stroke-width="3.5"/>
        </g>
        <path d="M0 335 Q 200 330 400 335 T 800 335" stroke="${p.refl}" stroke-width="2.4" fill="none" opacity="0.4"/>
        <path d="M85 385 Q 255 380 425 385" stroke="${p.refl}" stroke-width="2.4" fill="none" opacity="0.3"/>
        <path d="M480 425 Q 630 420 790 425" stroke="${p.refl}" stroke-width="2.4" fill="none" opacity="0.3"/>
        <path d="M0 310 Q 400 303 800 310" stroke="${p.refl}" stroke-width="3.5" fill="none" opacity="0.6"/>
        <g stroke="${p.shore}" stroke-width="3.5" stroke-linecap="round" fill="none">
          <path d="M65 310 q-3 -20 2 -34 M79 310 q2 -18 -2 -29 M725 310 q3 -20 -2 -34 M739 310 q-2 -18 2 -29"/>
        </g>
        ${birds(rng, day ? "#2c3a34" : "#a8bcc8", 2)}`;
      break;
    case "sakura":
      inner = sky + clouds(rng, cl, 2) + `
        <path d="M-10 395 Q 210 345 440 388 T 810 372" stroke="${p.branch}" stroke-width="11" fill="none"/>
        <path d="M190 380 Q 250 295 315 255" stroke="${p.branch}" stroke-width="7" fill="none"/>
        <path d="M510 390 Q 570 310 655 275" stroke="${p.branch}" stroke-width="7" fill="none"/>
        <path d="M315 255 q33 -16 66 -9 M570 310 q33 -18 64 -13" stroke="${p.branch}" stroke-width="4.5" fill="none"/>
        ${blooms(rng, p.bloom, p.bloom2, 38)}
        ${petals(rng, p.bloom2, 16)}`;
      break;
    case "tundra":
      inner = sky + clouds(rng, cl, 2) + `
        <circle cx="${610 + rng() * 70}" cy="${95 + rng() * 40}" r="27" fill="#f6f2ea" opacity="0.9"/>
        <path d="M0 345 Q 250 318 500 350 T 800 342 L 800 ${H} L 0 ${H} Z" fill="${p.snow}"/>
        <path d="M0 420 Q 320 390 800 430 L 800 ${H} L 0 ${H} Z" fill="${p.hill}"/>
        <ellipse cx="${190 + rng() * 420}" cy="${445 + rng() * 35}" rx="130" ry="18" fill="${p.ice}" opacity="0.8"/>
        <ellipse cx="${320 + rng() * 320}" cy="${480}" rx="90" ry="11" fill="${p.ice}" opacity="0.6"/>
        <path d="M${130 + rng() * 70} 370 l11 -38 l11 38 Z" fill="${p.hill}"/>
        <path d="M${640 + rng() * 70} 365 l9 -29 l9 29 Z" fill="${p.hill}"/>
        <path d="M${430 + rng() * 110} 385 l8 -25 l8 25 Z" fill="${p.hill}"/>`;
      break;
    case "waterfall":
      inner = sky + clouds(rng, cl, 2) + `
        <path d="M0 ${H} L0 75 L160 135 L180 245 L130 ${H} Z" fill="${p.rock}"/>
        <path d="M800 ${H} L800 60 L645 125 L622 235 L675 ${H} Z" fill="${p.rock}"/>
        <path d="M0 150 Q 85 125 160 135 L160 158 Q 75 152 0 172 Z" fill="${p.moss}" opacity="0.8"/>
        <path d="M645 125 Q 720 112 800 100 L800 125 Q 720 135 645 150 Z" fill="${p.moss}" opacity="0.8"/>
        <path d="M45 110 l33 27 M110 160 l29 23 M695 110 l-31 25 M740 160 l-27 20" stroke="#000000" stroke-width="3.5" opacity="0.15"/>
        <rect x="348" y="150" width="110" height="320" rx="9" fill="${p.water}" opacity="0.9"/>
        <path d="M365 162 q11 140 -6 290 M388 158 q-7 150 5 288 M408 157 q-9 150 7 290 M432 165 q7 128 -5 268 M452 172 q5 105 -7 240" stroke="${p.mist}" stroke-width="4.5" fill="none" opacity="0.7"/>
        <ellipse cx="400" cy="478" rx="165" ry="26" fill="${p.mist}" opacity="0.7"/>
        <ellipse cx="400" cy="488" rx="210" ry="20" fill="${p.mist}" opacity="0.4"/>
        <path d="M180 245 Q 400 210 622 235 L 622 252 Q 400 228 180 262 Z" fill="${p.moss}" opacity="0.6"/>
        ${birds(rng, "#2c3438", 2)}`;
      break;
    case "lavender":
      inner = sky + clouds(rng, cl, 2) + `
        <circle cx="${650 + rng() * 70}" cy="${95 + rng() * 40}" r="29" fill="#f6e7c1" opacity="0.9"/>
        <path d="M0 310 Q 400 278 800 318 L 800 ${H} L 0 ${H} Z" fill="${p.hill}"/>
        ${lavenderRows(rng, [p.row1, p.row2, p.row3], p.dot)}
        ${birds(rng, "#3a3450", 2)}`;
      break;
    case "volcano":
      inner = sky + clouds(rng, isDark(p.sky) ? "#2c2836" : "#b8a89e", 2) + `
        <circle cx="${640 + rng() * 70}" cy="${95 + rng() * 40}" r="33" fill="${p.glow}" opacity="0.8"/>
        <path d="M0 ${H} L320 185 L490 185 L800 ${H} Z" fill="${p.mtn}"/>
        <path d="M320 185 L405 148 L490 185 Z" fill="${p.lava}"/>
        <path d="M376 157 q11 35 -6 70 M420 155 q-7 41 9 76 M398 150 q0 46 0 92" stroke="${p.lava}" stroke-width="8" fill="none" opacity="0.85"/>
        <path d="M362 195 q-16 46 -9 104 M448 198 q18 51 11 110" stroke="${p.lava}" stroke-width="5.5" fill="none" opacity="0.6"/>
        <circle cx="405" cy="122" r="11" fill="${p.smoke}" opacity="0.8"/>
        <circle cx="${388 + rng() * 34}" cy="${82 + rng() * 24}" r="16" fill="${p.smoke}" opacity="0.55"/>
        <circle cx="${415 + rng() * 34}" cy="${48 + rng() * 18}" r="20" fill="${p.smoke}" opacity="0.35"/>
        <circle cx="${370 + rng() * 70}" cy="${135 + rng() * 35}" r="3.4" fill="${p.lava}"/>
        <circle cx="${435 + rng() * 45}" cy="${110 + rng() * 35}" r="2.8" fill="${p.lava}"/>
        <path d="M0 445 Q 400 415 800 450 L 800 ${H} L 0 ${H} Z" fill="${p.mtn}" opacity="0.85"/>`;
      break;
    case "lighthouse":
      inner = sky + clouds(rng, cl, 2) + `
        <rect y="375" width="${W}" height="${H - 375}" fill="${p.sea}"/>
        <path d="M0 382 Q 200 375 400 382 T 800 382" stroke="${p.beam}" stroke-width="2.4" fill="none" opacity="0.3"/>
        <path d="M0 412 Q 200 405 400 412 T 800 412" stroke="${p.beam}" stroke-width="2.4" fill="none" opacity="0.2"/>
        <path d="M0 448 Q 200 441 400 448 T 800 448" stroke="${p.beam}" stroke-width="2.4" fill="none" opacity="0.15"/>
        <path d="M130 ${H} L280 410 L510 ${H} Z" fill="${p.rock}"/>
        <path d="M360 ${H} L405 220 L450 ${H} Z" fill="${p.beam}" opacity="0.25"/>
        <path d="M376 ${H} L412 258 L378 ${H} Z" fill="${p.tower}"/>
        <path d="M383 ${H} L411 322 L376 ${H} Z" fill="${p.stripe}" opacity="0.9"/>
        <path d="M390 ${H} L407 375 L382 ${H} Z" fill="${p.stripe}" opacity="0.9"/>
        <rect x="397" y="238" width="31" height="20" rx="3" fill="${p.stripe}"/>
        <rect x="401" y="212" width="22" height="26" rx="2" fill="${p.beam}"/>
        <circle cx="412" cy="225" r="5.5" fill="#fff8dc"/>
        <path d="M397 212 h31 l-15 -14 Z" fill="${p.stripe}"/>
        ${birds(rng, "#2c3438", 3)}`;
      break;
    default:
      inner = sky;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}
