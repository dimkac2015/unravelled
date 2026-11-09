// ART STYLE BIBLE — edit these constants to tune the generated pictures.
// Nothing else in the app needs to change when you edit this file.

export const PAGES = ["scenery", "era", "character", "movie", "activity"];

// pages 1-2 (scenery, era)
export const STYLE_SCENE =
  "minimalist flat vector illustration poster, layered silhouettes with atmospheric perspective, bold saturated colour, soft gradient sky, clean simple shapes, subtle paper grain, calm composition, no photorealism, no 3D render";

// pages 3-5 (character, movie, activity)
export const STYLE_NOIR =
  "stylized 2D noir graphic illustration, flat shapes of solid colour, hard-edged deep black shadows, heavy chiaroscuro, minimal gradients, angular simplified faces with small dark eyes, strong silhouettes, restricted muted palette dominated by dark teal, charcoal and deep brown with one warm orange-amber accent light, cinematic framing, 1980s crime-noir motion-comic feel, subtle paper grain, no photorealism, no 3D render, no anime, no watercolor, no painterly blur";

// composition per page
export const COMPOSITION = {
  scenery: "vertical 3:4, main subject in the upper two thirds, calmer darker bottom third",
  era: "vertical 3:4, centered still life of objects and architecture typical of the era, symmetrical emblem-like",
  character: "waist-up portrait, vertical 3:4, one hard light source, half of the face in shadow, plain dark background with one light shaft",
  movie: "vertical 2:3 poster-like composition, one or two strong silhouettes, big shapes, empty calm bottom band, no frame",
  activity: "medium shot of a person doing the activity seen from the side or back, vertical 3:4, noir lighting",
};

// colour NAMES per palette id (image models read names better than hex)
export const PALETTE_WORDS = {
  ember: "charcoal black, deep crimson, burnt orange, amber",
  deep_forest: "deep green, moss, dark teal, amber gold",
  golden_hour: "warm amber, honey yellow, soft sky blue, cream",
  midnight_blue: "midnight navy, indigo, slate blue, pale silver",
  neon_night: "near black, electric magenta, cyan neon, violet",
  dusty_sand: "dusty sand, terracotta, warm brown, pale cream",
  ice: "ice blue, pale grey-blue, white snow, cold teal",
  storm_grey: "storm grey, slate, pale lightning yellow, charcoal",
  violet_dusk: "violet dusk, deep purple, mauve, warm peach",
  sea_teal: "deep teal, sea green, turquoise, warm sand",
};

// appended to every prompt
export const NEGATIVE =
  "No text, no letters, no numbers, no logos, no watermark, no signature, no border, no frame, no extra fingers, no distorted faces.";

// build the final image prompt for a page. Keep under ~120 words.
export function buildPrompt(page, analysis) {
  const style = page === "scenery" || page === "era" ? STYLE_SCENE : STYLE_NOIR;
  const brief = (analysis.art_briefs && analysis.art_briefs[page]) || "a calm atmospheric illustration matching the mood";
  const composition = COMPOSITION[page] || "vertical 3:4, calm composition";
  const palette = PALETTE_WORDS[analysis.palette] || "muted dark palette with one warm accent";
  return `${style}. ${brief}. Composition: ${composition}. Colour palette: ${palette}. ${NEGATIVE}`;
}
