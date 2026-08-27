# Sylva Hero Test — Bells n Rings "Living World"

A standalone, self-contained hero page: a Three.js "living world" scene (rolling
moss-and-gold meadow, wind-swayed grass, drifting pollen, scattered flowers, a
wandering/landing butterfly) with two liquid-metal CTA buttons, built in the
Bells n Rings brand palette (ivory / blush / rose-gold / gold / charcoal) and
type (Playfair Display + Jost).

## Provenance

This was requested as a reference-based build of `<SylvaHero />` /
`inner-green-3d.html` from [ThreeUI](https://threeui.com). The build
environment used to create this had **no network access to threeui.com** (or
any CDN), so the actual ThreeUI source was never fetched or seen. This is an
**original implementation**, written from scratch using only the publicly
described concept ("moss-root world with pale flowers, ferns, drifting pollen,
a landing butterfly, and native liquid-metal controls") — not a port, copy, or
reconstruction of ThreeUI's proprietary code, shaders, or assets.

## Stack

- Plain HTML/CSS + a single ES module (`main.js`) — no build step, no framework.
- `three` is vendored locally under `vendor/` (`three.module.min.js` +
  `three.core.min.js`, three.js 0.185.1) — no CDN, no external requests at runtime.
- Brand fonts (Playfair Display, Jost) are vendored locally under `fonts/` as
  `woff2` files via `@font-face` — again, no external requests.

## Running it

Because `main.js` is loaded as an ES module, open it through a local static
server (not `file://`, which browsers block for module imports):

```bash
python3 -m http.server 8080
# then open http://localhost:8080/
```

or `npx serve .`.

## What's in the scene

- **Ground** — a displaced plane with baked vertex-color shading (moss → pale
  gold), driven by a small hand-rolled value-noise function (no external noise
  library).
- **Grass** — an `InstancedMesh` of ~5,200 blades (desktop) / ~2,000 (mobile),
  wind-swayed entirely on the GPU via a vertex shader injected through
  `onBeforeCompile` (no per-frame CPU matrix updates).
- **Flowers** — billboard sprites using a small procedurally-drawn canvas
  texture (radial petals), no image assets.
- **Pollen** — an additive `Points` field drifting upward and recycling.
- **Butterfly** — a two-wing sprite group following a slow wandering path that
  eases into a "landing" pause once per cycle.
- **Camera** — gentle idle drift plus pointer-parallax (desktop, fine-pointer
  only), disabled under `prefers-reduced-motion`.
- **Buttons** — native `<a>` elements styled as liquid-metal pills: a gradient
  base plus a cursor-tracked specular highlight (CSS custom properties updated
  on `pointermove`) and a sheen sweep on hover.

## Accessibility / robustness

- Respects `prefers-reduced-motion` (skips camera drift, parallax, particle
  motion, wind sway stays; a single frame is still rendered so the scene isn't
  blank).
- Pauses the render loop on tab visibility change and on WebGL context loss;
  resumes on restore.
- Grass/particle/flower counts scale down under a small-viewport heuristic.

## Regenerating the vendored assets

```bash
npm install three@0.185.1 @fontsource/playfair-display @fontsource/jost --no-save
cp node_modules/three/build/three.module.min.js vendor/
cp node_modules/three/build/three.core.min.js vendor/
cp node_modules/@fontsource/playfair-display/files/playfair-display-latin-{500,600}-normal.woff2 fonts/
cp node_modules/@fontsource/jost/files/jost-latin-{400,500}-normal.woff2 fonts/
```
