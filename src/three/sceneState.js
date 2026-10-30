// Shared, mutable values read every frame by the 3D scene (not React state, on purpose:
// updating React state 60 times a second would be slow).

// Sections on the home page that the camera stops at, in order. Each needs a matching id on the page.
export const STOP_IDS = ['home', 'services', 'work', 'skills', 'experience', 'proof', 'contact'];

// Where the camera looks at each stop. The scene objects for a stop are built around this point.
// Tune these numbers to change the shape of the camera path.
export const FOCUS = STOP_IDS.map((_, i) => [Math.sin(i * 0.9) * 1.2, -i * 3.4, -i * 4.2]);

export const sceneState = {
  t: 0, // fractional stop index: 0 = home, 1 = services, 2.5 = halfway between work and skills...
  px: 0, // pointer position, -1 to 1
  py: 0,
  hover: { work: -1, proof: -1 },
};
export function setHover(kind, index) {
  sceneState.hover[kind] = index;
}
// Works out which stop the visitor is at, from where the sections sit on the page.
// A stop is reached when its section reaches the top of the screen. Sections that are
// missing (for example an empty Services list) are skipped, and a last section shorter
// than the screen still counts as reached when the page is scrolled to the bottom.
export function readStopT() {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const found = [];
  STOP_IDS.forEach((id, index) => {
    const el = document.getElementById(id);
    if (el) found.push({ index, top: el.getBoundingClientRect().top + window.scrollY });
  });
  if (found.length === 0) return 0;

  let limit = maxScroll;
  for (let k = found.length - 1; k >= 0; k -= 1) {
    found[k].top = Math.min(found[k].top, limit);
    limit = found[k].top - 1;
  }

  const line = window.scrollY;
  if (line <= found[0].top) return found[0].index;
  for (let k = 0; k < found.length - 1; k += 1) {
    const a = found[k];
    const b = found[k + 1];
    if (line < b.top) {
      const f = (line - a.top) / Math.max(1, b.top - a.top);
      return a.index + (b.index - a.index) * f;
    }
  }
  return found[found.length - 1].index;
}