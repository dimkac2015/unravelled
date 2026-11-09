// Character & movie art in the style of "This Is the Police" (noir chiaroscuro:
// flat shapes, hard-edged shadows, angular faces, dark base + one warm accent).
// Archetype list + stubs in Stage 1; reusable SVG parts land in Stages 3-4.

export const ARCHETYPES = [
  "detective", "wanderer", "rebel", "dreamer", "soldier", "witch",
  "clown", "scientist", "cowboy", "noble",
];

// Stage 3: (character {name, source, why, archetype}, palette) => svg string
export function renderCharacter() {
  return null;
}

// Stage 4: (movie {title, year, why}, palette) => poster-style svg string
export function renderMovie() {
  return null;
}
