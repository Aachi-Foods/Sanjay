"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useReducedMotion from "@/hooks/useReducedMotion";

const GOLD = new THREE.Color("#d9b45c");
const UPDATE_INTERVAL = 1 / 30; // throttle position updates to ~30fps
const WRAP_RANGE = 6;

// Warm, drifting points of light — marigold/diya ambience behind the hero
// (and optionally the closing CTA). Pure atmosphere: static camera, no
// controls, no interaction, nothing structural. The photography and copy
// are the brand's proof of quality; this only frames them.
function Drift({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const accumRef = useRef(0);
  // Randomised per-particle base position/phase/speed. Generated in an
  // effect rather than useMemo: Math.random is an impure call, and effects
  // (unlike render) are the sanctioned place for it.
  const dataRef = useRef<{ base: Float32Array; phases: Float32Array; speeds: Float32Array } | null>(
    null,
  );

  // Zero-filled placeholder so the geometry has a correctly-sized buffer
  // for first paint — real positions land a moment later from the effect.
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useEffect(() => {
    const base = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 10;
      base[i * 3 + 1] = (Math.random() - 0.5) * WRAP_RANGE;
      base[i * 3 + 2] = (Math.random() - 0.5) * 4;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    dataRef.current = { base, phases, speeds };

    const attr = pointsRef.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (attr) {
      attr.array.set(base);
      attr.needsUpdate = true;
    }
  }, [count]);

  useFrame((state, delta) => {
    const data = dataRef.current;
    if (!data) return;
    accumRef.current += delta;
    if (accumRef.current < UPDATE_INTERVAL) return;
    accumRef.current = 0;

    const attr = pointsRef.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (!attr) return;

    const { base, phases, speeds } = data;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const phase = phases[i];
      const speed = speeds[i];
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];

      attr.setX(i, bx + Math.sin(t * speed + phase) * 0.4);
      // Slow upward drift, wrapped so particles recycle instead of running out.
      const y = ((by + t * speed * 0.3 + WRAP_RANGE / 2) % WRAP_RANGE) - WRAP_RANGE / 2;
      attr.setY(i, y);
      attr.setZ(i, bz);
    }
    // react-hooks/immutability doesn't know about react-three-fiber's
    // render loop: mutating a Three.js buffer attribute in place inside
    // useFrame, then flagging it dirty, is the standard R3F pattern (the
    // per-frame equivalent of useEffect's imperative escape hatch), not a
    // React state mutation the compiler needs to reason about.
    // eslint-disable-next-line react-hooks/immutability
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={GOLD}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.32}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField({
  className = "",
  density = { desktop: 60, mobile: 15 },
}: {
  className?: string;
  /** Particle counts, kept low always — see the file header for why. */
  density?: { desktop: number; mobile: number };
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Mount/unmount the whole Canvas (and its render loop) rather than just
    // hiding it — this is the one WebGL context on the page, and it should
    // cost nothing while the hero is off screen.
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {inView && (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <Drift count={mobile ? density.mobile : density.desktop} />
        </Canvas>
      )}
    </div>
  );
}
