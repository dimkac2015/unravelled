// npm run arttest — generates the 5 pictures for a built-in sample analysis
// (moody folk/gothic playlist) into /arttest/ with prompt, critic JSON and score.
// Developer tool, not part of the site UI.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, buildPrompt } from "../public/art/style_bible.js";
import { generatePagePicture, CONFIG } from "../art/pipeline.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "arttest");

const SAMPLE = {
  palette: "deep_forest",
  scene: "forest",
  scene_title: "Cathedral of Pines at Dusk",
  era: { name: "Victorian era", season: "autumn", feel: "Fog, lamplight and a playlist that hums along.", icon: "lantern" },
  character: { name: "a lanky wanderer", source: "road movie", why: "carries the playlist in a coat pocket.", archetype: "wanderer" },
  movie: { title: "a moody road film", year: 2007, why: "the soundtrack is the engine." },
  activity: { title: "walking in autumn rain", why: "the rhythm matches the rain.", scene_id: "walking_in_rain" },
  art_briefs: {
    scenery: "A misty pine forest at dusk, tall dark trunks receding into fog, low amber sun through the branches, a narrow path winding away, moody and calm.",
    era: "A Victorian streetlamp and a gramophone on a wooden table by a foggy window, warm lamplight, autumn evening, still life.",
    character: "A lanky weary traveler in a rumpled long coat and a soft hat, standing in rain, half of the face in shadow, one hard streetlamp from the side, 1980s noir comic style.",
    movie: "A lone car on a wet night road seen from behind, red taillights, rain streaks, dark hills, big empty sky, poster-like.",
    activity: "A person with an umbrella walking away down a rainy street, seen from behind, noir streetlamp light, puddles reflecting amber.",
  },
};

(async () => {
  if (!process.env.MISTRAL_API_KEY) {
    console.error("[ART] MISTRAL_API_KEY is required for arttest");
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const playlistId = "arttest-sample";
  for (const page of PAGES) {
    const prompt = buildPrompt(page, SAMPLE);
    fs.writeFileSync(path.join(OUT, `${page}.prompt.txt`), prompt);
    console.log("[ART] generating", page, "…");
    const result = await generatePagePicture(playlistId, page, SAMPLE);
    fs.writeFileSync(path.join(OUT, `${page}.result.json`), JSON.stringify({ page, ...result }, null, 2));
    if (result.status === "ready") {
      fs.copyFileSync(path.join(CONFIG.cacheDir, playlistId, `${page}.webp`), path.join(OUT, `${page}.webp`));
    }
    console.log("[ART]", page, "->", result.status, "score", result.score);
  }
  console.log("[ART] done — see /arttest/");
})().catch((e) => { console.error("[ART] arttest failed:", e); process.exit(1); });
