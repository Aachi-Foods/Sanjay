// Bells n Rings — "Living World" hero scene.
// Original implementation (local three.module.min.js, no CDN, no external requests),
// built from scratch as a design exploration inspired by the publicly described
// ThreeUI "Sylva — Living Green" hero concept. Not a port of that component's source.

import * as THREE from "./vendor/three.module.min.js";

const canvas = document.getElementById("scene");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = window.matchMedia("(pointer: fine)").matches;
const isSmallViewport = window.innerWidth < 760;

// ---------- deterministic pseudo-random + value noise (no external noise lib) ----------
function makeRng(seed) {
  let s = seed >>> 0;
  return function rng() {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967295;
  };
}
const rng = makeRng(1337);

function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const a = hash2(xi, yi), b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function terrainHeight(x, z) {
  const n1 = valueNoise(x * 0.09, z * 0.09);
  const n2 = valueNoise(x * 0.23 + 40, z * 0.23 + 40) * 0.45;
  const dip = Math.max(0, 1 - Math.hypot(x, z) / 9) * 0.35; // gentle clearing near center
  return (n1 + n2) * 1.3 - dip;
}

// ---------- procedural textures (canvas, no external images) ----------
function makeSoftDotTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,246,222,0.7)");
  g.addColorStop(1, "rgba(255,246,222,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeFlowerTexture(petalColor, centerColor) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const cx = size / 2, cy = size / 2;
  ctx.translate(cx, cy);
  const petals = 5;
  for (let i = 0; i < petals; i++) {
    ctx.save();
    ctx.rotate((i / petals) * Math.PI * 2);
    const g = ctx.createRadialGradient(0, -size * 0.22, 2, 0, -size * 0.22, size * 0.24);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.35, petalColor);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.22, size * 0.16, size * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.09);
  cg.addColorStop(0, centerColor);
  cg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.09, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeWingTexture() {
  const w = 96, h = 64;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  ctx.translate(w, h / 2);
  const g = ctx.createLinearGradient(-w, 0, 0, 0);
  g.addColorStop(0, "rgba(232,180,184,0)");
  g.addColorStop(0.55, "rgba(232,180,184,0.85)");
  g.addColorStop(1, "rgba(201,169,97,0.95)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-w * 0.85, -h * 0.62, -w * 0.35, -h * 0.06);
  ctx.quadraticCurveTo(-w * 0.7, h * 0.1, -w * 0.15, h * 0.5);
  ctx.quadraticCurveTo(-w * 0.05, h * 0.15, 0, 0);
  ctx.closePath();
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- renderer / scene / camera ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallViewport ? 1.75 : 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const FOG_COLOR = 0xf4dfd2;
scene.fog = new THREE.Fog(FOG_COLOR, 7, 17);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 60);
const camBase = new THREE.Vector3(0, 3.1, 9.6);
camera.position.copy(camBase);
camera.lookAt(0, 0.35, -4);

// ---------- lighting ----------
const hemi = new THREE.HemisphereLight(0xfff6ea, 0x74805a, 1.05);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe6bd, 1.3);
sun.position.set(4.5, 6, 3.5);
scene.add(sun);
const fill = new THREE.DirectionalLight(0xe8b4b8, 0.4);
fill.position.set(-5, 2.5, -3);
scene.add(fill);

// ---------- ground ----------
const GROUND_SIZE = 34;
const groundGeo = new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE, 90, 90);
groundGeo.rotateX(-Math.PI / 2);
{
  const pos = groundGeo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const mossLow = new THREE.Color(0x5b6b46);
  const mossHigh = new THREE.Color(0xc9cf9e);
  const goldFleck = new THREE.Color(0xc9a961);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const h = terrainHeight(x, z);
    pos.setY(i, h);
    const t = THREE.MathUtils.clamp((h + 0.6) / 1.6, 0, 1);
    const col = mossLow.clone().lerp(mossHigh, t);
    const speck = Math.max(0, valueNoise(x * 0.6 + 12, z * 0.6 + 12) - 0.78) * 4.2;
    col.lerp(goldFleck, THREE.MathUtils.clamp(speck, 0, 0.5));
    colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
  }
  groundGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  groundGeo.computeVertexNormals();
}
const groundMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.receiveShadow = false;
scene.add(ground);

// ---------- grass (instanced, wind-swayed via vertex shader injection) ----------
const BLADE_HEIGHT = 0.27;
const bladeGeo = new THREE.PlaneGeometry(0.038, BLADE_HEIGHT, 1, 3);
bladeGeo.translate(0, BLADE_HEIGHT / 2, 0);

const GRASS_COUNT = isSmallViewport ? 2000 : 5200;
const grassMat = new THREE.MeshStandardMaterial({
  color: 0x9aa876,
  roughness: 0.85,
  metalness: 0,
  side: THREE.DoubleSide,
});
const timeUniform = { value: 0 };
grassMat.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = timeUniform;
  shader.vertexShader = shader.vertexShader
    .replace(
      "#include <common>",
      `#include <common>\nuniform float uTime;`
    )
    .replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      float swayT = clamp(position.y / ${BLADE_HEIGHT.toFixed(3)}, 0.0, 1.0);
      swayT = swayT * swayT;
      vec3 iPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      float phase = iPos.x * 0.55 + iPos.z * 0.85;
      float sway = sin(uTime * 1.3 + phase) * 0.16 + sin(uTime * 2.6 + phase * 1.9) * 0.05;
      transformed.x += sway * swayT;
      transformed.z += cos(uTime * 1.05 + phase) * 0.05 * swayT;`
    );
  grassMat.userData.shader = shader;
};

const grass = new THREE.InstancedMesh(bladeGeo, grassMat, GRASS_COUNT);
{
  const dummy = new THREE.Object3D();
  const colorTip = new THREE.Color(0xd6d9a8);
  const colorBase = new THREE.Color(0x6b7d52);
  const instColors = new Float32Array(GRASS_COUNT * 3);
  let placed = 0;
  let guard = 0;
  while (placed < GRASS_COUNT && guard < GRASS_COUNT * 6) {
    guard++;
    const x = (rng() - 0.5) * GROUND_SIZE * 0.94;
    const z = (rng() - 0.5) * GROUND_SIZE * 0.94;
    if (Math.hypot(x, z) < 3.4) continue; // open clearing behind the hero copy
    if (z > 6.5) continue; // keep the near-lens foreground open
    const y = terrainHeight(x, z);
    dummy.position.set(x, y, z);
    dummy.rotation.y = rng() * Math.PI * 2;
    const scale = 0.6 + rng() * 0.9;
    dummy.scale.set(scale, scale * (0.8 + rng() * 0.6), scale);
    dummy.updateMatrix();
    grass.setMatrixAt(placed, dummy.matrix);
    const mix = colorBase.clone().lerp(colorTip, rng());
    instColors[placed * 3] = mix.r;
    instColors[placed * 3 + 1] = mix.g;
    instColors[placed * 3 + 2] = mix.b;
    placed++;
  }
  grass.instanceMatrix.needsUpdate = true;
  // Three.js reads InstancedMesh#instanceColor independently of material.vertexColors,
  // so no per-vertex geometry color attribute is needed here.
  grass.instanceColor = new THREE.InstancedBufferAttribute(instColors, 3);
}
scene.add(grass);

// ---------- flowers (billboard sprites) ----------
const flowerTexA = makeFlowerTexture("rgba(247,220,224,0.95)", "rgba(201,169,97,0.9)");
const flowerTexB = makeFlowerTexture("rgba(226,205,148,0.9)", "rgba(139,74,85,0.85)");
const FLOWER_COUNT = isSmallViewport ? 16 : 34;
const flowerGroup = new THREE.Group();
const flowerPhases = [];
for (let i = 0; i < FLOWER_COUNT; i++) {
  const tex = i % 3 === 0 ? flowerTexB : flowerTexA;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  const x = (rng() - 0.5) * GROUND_SIZE * 0.8;
  const z = (rng() - 0.5) * GROUND_SIZE * 0.8;
  if (Math.hypot(x, z) < 2.2) { i--; continue; }
  const y = terrainHeight(x, z);
  const scale = 0.22 + rng() * 0.16;
  sprite.scale.set(scale, scale, scale);
  sprite.position.set(x, y + scale * 0.5, z);
  flowerGroup.add(sprite);
  flowerPhases.push({ base: sprite.position.y, phase: rng() * Math.PI * 2 });
}
scene.add(flowerGroup);

// ---------- pollen particles ----------
const PARTICLE_COUNT = isSmallViewport ? 220 : 480;
const particleGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(PARTICLE_COUNT * 3);
const pSeed = new Float32Array(PARTICLE_COUNT * 3); // speed, phase, radius
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const x = (rng() - 0.5) * GROUND_SIZE * 0.7;
  const z = (rng() - 0.5) * GROUND_SIZE * 0.6 - 2;
  const y = rng() * 4.5;
  pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
  pSeed[i * 3] = 0.15 + rng() * 0.3;
  pSeed[i * 3 + 1] = rng() * Math.PI * 2;
  pSeed[i * 3 + 2] = 0.15 + rng() * 0.4;
}
particleGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
const particleMat = new THREE.PointsMaterial({
  map: makeSoftDotTexture(),
  color: 0xf3dfa8,
  size: 0.11,
  transparent: true,
  opacity: 0.75,
  depthWrite: false,
  sizeAttenuation: true,
  blending: THREE.AdditiveBlending,
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ---------- butterfly ----------
const wingTex = makeWingTexture();
const wingMat = new THREE.SpriteMaterial({ map: wingTex, transparent: true, depthWrite: false });
const butterfly = new THREE.Group();
const wingL = new THREE.Sprite(wingMat);
const wingR = new THREE.Sprite(wingMat.clone());
wingR.scale.x = -1;
wingL.scale.set(0.34, 0.24, 1);
wingR.scale.set(-0.34, 0.24, 1);
wingL.position.x = -0.02;
wingR.position.x = 0.02;
butterfly.add(wingL, wingR);
butterfly.position.set(0.8, 1.7, 1.2);
scene.add(butterfly);

const butterflyOrbit = { cx: 0.6, cz: 0.6, r: 1.4, freqA: 0.35, freqB: 0.5, cycle: 16 };

// ---------- pointer parallax ----------
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
if (isFinePointer && !prefersReducedMotion) {
  window.addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  });
}

// mood-card + button liquid highlight (vanilla, no framework needed for this standalone page)
document.querySelectorAll(".mood-card").forEach((card) => {
  card.addEventListener("pointermove", () => {});
});
if (isFinePointer) {
  window.addEventListener("pointermove", (e) => {
    document.querySelectorAll(".mood-card").forEach((card) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      card.style.transform = `translate3d(${dx * -14}px, ${dy * -14}px, 0)`;
    });
  });
  document.querySelectorAll("[data-liquid]").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      btn.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
}

// ---------- resize ----------
function onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);
onResize();

// ---------- visibility + context loss handling ----------
let running = true;
document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
  if (running) { lastTime = performance.now(); requestAnimationFrame(tick); }
});
canvas.addEventListener("webglcontextlost", (e) => {
  e.preventDefault();
  running = false;
});
canvas.addEventListener("webglcontextrestored", () => {
  running = true;
  lastTime = performance.now();
  requestAnimationFrame(tick);
});

// ---------- animation loop ----------
let lastTime = performance.now();
let clock = 0;

function tick(now) {
  if (!running) return;
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  if (!prefersReducedMotion) clock += dt;

  timeUniform.value = clock;

  // camera idle drift + parallax
  pointer.x += (pointer.tx - pointer.x) * 0.04;
  pointer.y += (pointer.ty - pointer.y) * 0.04;
  const idleYaw = prefersReducedMotion ? 0 : Math.sin(clock * 0.09) * 0.35;
  const idleBob = prefersReducedMotion ? 0 : Math.sin(clock * 0.16) * 0.05;
  camera.position.x = camBase.x + idleYaw + pointer.x * 0.55;
  camera.position.y = camBase.y + idleBob + pointer.y * -0.22;
  camera.lookAt(idleYaw * 0.6 + pointer.x * 0.4, 1.05 + pointer.y * -0.15, -1.5);

  // flowers gentle bob
  flowerGroup.children.forEach((s, i) => {
    const f = flowerPhases[i];
    s.position.y = f.base + (prefersReducedMotion ? 0 : Math.sin(clock * 1.4 + f.phase) * 0.02);
  });

  // pollen drift
  if (!prefersReducedMotion) {
    const pos = particleGeo.attributes.position;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const speed = pSeed[i * 3], phase = pSeed[i * 3 + 1], radius = pSeed[i * 3 + 2];
      let y = pos.getY(i) + speed * dt * 0.4;
      if (y > 5) y = 0;
      pos.setY(i, y);
      const baseX = pPos[i * 3], baseZ = pPos[i * 3 + 2];
      pos.setX(i, baseX + Math.sin(clock * speed + phase) * radius);
      pos.setZ(i, baseZ + Math.cos(clock * speed * 0.8 + phase) * radius);
    }
    pos.needsUpdate = true;
  }

  // butterfly: wandering loop that eases into a "landing" pause each cycle
  {
    const t = (clock % butterflyOrbit.cycle) / butterflyOrbit.cycle;
    const landPhase = THREE.MathUtils.smoothstep(t, 0.78, 0.92) - THREE.MathUtils.smoothstep(t, 0.94, 1.0);
    const radius = butterflyOrbit.r * (1 - landPhase * 0.94);
    const angle = t * Math.PI * 2 * (butterflyOrbit.freqA / 0.35);
    const bx = butterflyOrbit.cx + Math.cos(angle) * radius;
    const bz = butterflyOrbit.cz + Math.sin(angle * 1.3) * radius * 0.7;
    const by = 1.55 + Math.sin(angle * 2.1) * 0.22 * (1 - landPhase) + (landPhase * -0.28);
    butterfly.position.set(bx, by, bz);
    const heading = Math.atan2(
      Math.cos(angle + 0.01) * radius - Math.cos(angle) * radius,
      Math.sin(angle * 1.3 + 0.01) * radius * 0.7 - Math.sin(angle * 1.3) * radius * 0.7
    );
    butterfly.rotation.y = -heading;
    const flap = prefersReducedMotion ? 0.6 : Math.abs(Math.sin(clock * (landPhase > 0.5 ? 3 : 11)));
    const flapScale = 0.35 + flap * (landPhase > 0.5 ? 0.15 : 0.65);
    wingL.scale.x = flapScale * 0.34;
    wingR.scale.x = -flapScale * 0.34;
  }

  // grass instance color needs no per-frame update (sway is GPU-side)
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// static single frame for reduced motion so the scene still reads as "alive" once
if (prefersReducedMotion) {
  renderer.render(scene, camera);
}
