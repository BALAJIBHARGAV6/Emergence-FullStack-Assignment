import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

function GlowOrb({
  color,
  radius,
  orbitRadius,
  speed,
  offset,
}: {
  color: string;
  radius: number;
  orbitRadius: number;
  speed: number;
  offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    meshRef.current.position.x = Math.cos(t) * orbitRadius;
    meshRef.current.position.z = Math.sin(t) * orbitRadius;
    meshRef.current.position.y = Math.sin(t * 0.7) * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function SkillsScene() {
  const orbs = useMemo(
    () => [
      { color: '#2563EB', radius: 0.2, orbitRadius: 1.8, speed: 0.4, offset: 0 },
      { color: '#10B981', radius: 0.25, orbitRadius: 1.5, speed: 0.5, offset: 2 },
      { color: '#EC4899', radius: 0.18, orbitRadius: 2.0, speed: 0.3, offset: 4 },
      { color: '#2563EB', radius: 0.15, orbitRadius: 1.3, speed: 0.6, offset: 1 },
      { color: '#10B981', radius: 0.22, orbitRadius: 1.7, speed: 0.35, offset: 3 },
      { color: '#EC4899', radius: 0.17, orbitRadius: 1.4, speed: 0.45, offset: 5 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={0.5} />
      {orbs.map((orb, i) => (
        <GlowOrb key={i} {...orb} />
      ))}
    </>
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

function SkillsFallback() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-accent-green-light to-accent-pink-light" />
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${30 + i * 15}px`,
            height: `${30 + i * 15}px`,
            background: ['#2563EB33', '#10B98133', '#EC489933', '#2563EB22'][i],
            top: `${20 + i * 18}%`,
            left: `${15 + i * 20}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${3 + i}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SkillsOrbs() {
  if (!isWebGLAvailable()) {
    return <SkillsFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<SkillsFallback />}>
      <div className="absolute inset-0 -z-10 opacity-40">
        <Canvas
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: false }}
        >
          <SkillsScene />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
