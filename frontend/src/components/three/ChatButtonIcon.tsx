import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable } from './WebGLErrorBoundary';

function Crystal({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const speed = hovered ? 0.04 : 0.015;
    meshRef.current.rotation.y += speed;
    meshRef.current.rotation.x += speed * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial
        color="#2563EB"
        emissive="#2563EB"
        emissiveIntensity={hovered ? 0.8 : 0.3}
        transparent
        opacity={0.9}
        wireframe
      />
    </mesh>
  );
}

export function ChatButtonIcon({
  hovered,
}: {
  hovered: boolean;
}) {
  if (!isWebGLAvailable()) {
    return <ChatButtonIconFallback />;
  }

  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      style={{
        width: 48,
        height: 48,
        background: 'transparent',
        pointerEvents: 'none',
      }}
      gl={{ alpha: true, antialias: false }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={0.8} color="#2563EB" />
      <Crystal hovered={hovered} />
    </Canvas>
  );
}

export function ChatButtonIconFallback() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
