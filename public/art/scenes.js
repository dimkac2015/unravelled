// Scene library: palettes + scene ids (scene renderers are added in Stage 2,
// era icons in Stage 3). Each palette = 5 hex colours: dark, mid, light, accent, highlight.

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

// Stage 2 replaces this with the real renderer: (sceneId, palette) => svg string, viewBox 0 0 800 1000
export function renderScene() {
  return null;
}
