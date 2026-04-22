import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

// ============================================================
// HAVEN · CARE SIGNATURE — holographic 3D overlay
// Pulsing care heart + orbiting service tokens + halo rings +
// particle field. Designed to composite over a video background.
// ============================================================

const ORBITS = [
  { tilt:  0.25, radius: 2.15, speed: 0.30, color: '#F18A4C', size: 0.16, offset: 0 },
  { tilt: -0.45, radius: 2.4,  speed: 0.22, color: '#FBB487', size: 0.12, offset: 1.3 },
  { tilt:  0.55, radius: 2.25, speed: 0.35, color: '#FFFFFF', size: 0.10, offset: 2.6 },
  { tilt: -0.1,  radius: 2.55, speed: 0.20, color: '#F18A4C', size: 0.14, offset: 4.0 },
  { tilt:  0.35, radius: 2.2,  speed: 0.28, color: '#FBB487', size: 0.11, offset: 5.1 },
  { tilt: -0.3,  radius: 2.45, speed: 0.26, color: '#FFFFFF', size: 0.09, offset: 6.2 },
];

// ── Pulsing care heart (core) ──
function CareHeart() {
  const ref = useRef(null);
  const mat = useRef(null);
  const glow = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Natural heartbeat: lub-dub, with rest period
    const beat = Math.sin(t * 3.1) * 0.5 + Math.sin(t * 6.2) * 0.3;
    const scale = 1 + beat * 0.09;
    if (ref.current) ref.current.scale.setScalar(scale);
    if (mat.current) mat.current.emissiveIntensity = 2.4 + beat * 1.2;
    if (glow.current) {
      glow.current.scale.setScalar(1 + beat * 0.25);
      glow.current.material.opacity = 0.28 + beat * 0.15;
    }
  });

  return (
    <group>
      {/* Outer soft glow */}
      <mesh ref={glow}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="#F18A4C" transparent opacity={0.28} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Middle glow */}
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#FBB487" transparent opacity={0.22} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Heart core */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshStandardMaterial
          ref={mat}
          color="#F5A66E"
          emissive="#F18A4C"
          emissiveIntensity={2.6}
          roughness={0.25}
          metalness={0.05}
          toneMapped={false}
        />
      </mesh>

      {/* Inner bright spec */}
      <mesh position={[-0.15, 0.15, 0.5]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial color="#FFF6ED" transparent opacity={0.8} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ── Orbital token with halo ──
function OrbitToken({ tilt, radius, speed, color, size, offset }) {
  const ref = useRef(null);
  const halo = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 1.3) * 0.2 + tilt * 0.45;
    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y += 0.02;
    }
    if (halo.current) halo.current.position.set(x, y, z);
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={color === '#FFFFFF' ? 1 : 1.8}
          roughness={0.15}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={halo}>
        <sphereGeometry args={[size * 2.8, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.16}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ── Halo ring ──
function HaloRing({ radius, tilt, color, opacity, thick = 0.008 }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.z = clock.elapsedTime * 0.04 * (tilt > 0 ? 1 : -1);
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 - tilt, 0, 0]}>
      <torusGeometry args={[radius, thick, 24, 160]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Ambient particle dust ──
function Particles({ count = 220 }) {
  const points = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.025;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFFFFF"
        transparent
        opacity={0.7}
        sizeAttenuation
        toneMapped={false}
        depthWrite={false}
      />
    </points>
  );
}

// ── Composition ──
function Signature() {
  const group = useRef(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.35 + clock.elapsedTime * 0.05;
    const targetX = pointer.y * 0.12;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.3}>
        <CareHeart />
      </Float>

      {ORBITS.map((o, i) => (
        <OrbitToken key={i} {...o} />
      ))}

      <HaloRing radius={2.15} tilt={0.22}  color="#F18A4C" opacity={0.55} thick={0.012} />
      <HaloRing radius={2.55} tilt={-0.45} color="#FBB487" opacity={0.35} />
      <HaloRing radius={2.85} tilt={0.55}  color="#FFFFFF" opacity={0.25} />
      <HaloRing radius={3.15} tilt={-0.2}  color="#F18A4C" opacity={0.18} thick={0.005} />
    </group>
  );
}

export default function CareScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 2.5, 4]} intensity={5} color="#F18A4C" distance={12} />
        <pointLight position={[4, -2, 3.5]} intensity={3.5} color="#6CA4E0" distance={12} />
        <pointLight position={[0, -3, 2]} intensity={1.8} color="#FBB487" distance={10} />

        <Environment preset="sunset" background={false} environmentIntensity={0.3} />

        <Signature />
        <Particles count={220} />
      </Suspense>
    </Canvas>
  );
}
