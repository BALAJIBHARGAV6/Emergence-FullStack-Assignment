import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary, isWebGLAvailable } from './WebGLErrorBoundary';

function FloatingShape({
  geometry,
  position,
  color,
  speed,
  floatOffset,
}: {
  geometry: 'icosahedron' | 'octahedron' | 'torus' | 'dodecahedron';
  position: [number, number, number];
  color: string;
  speed: number;
  floatOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.004 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + floatOffset) * 0.5;
    meshRef.current.position.x =
      position[0] + Math.sin(t * 0.3 + floatOffset) * 0.2;
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[0.6, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.5, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.15, 8, 16]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.5, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometryNode}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        wireframe
      />
    </mesh>
  );
}

function Particles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += 0.005;
      if (posArray[i * 3 + 1] > 10) {
        posArray[i * 3 + 1] = -10;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!groupRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * viewport.width * 0.08;
      const y = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 0.08;
      groupRef.current.position.x += (x - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (y - groupRef.current.position.y) * 0.05;
    },
    [viewport]
  );

  useFrame(() => {
    // smooth idle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef} onPointerMove={handlePointerMove}>
      {children}
    </group>
  );
}

function HeroScene() {
  const shapes = useMemo(() => {
    const geometries: Array<'icosahedron' | 'octahedron' | 'torus' | 'dodecahedron'> = [
      'icosahedron', 'octahedron', 'torus', 'dodecahedron',
    ];
    const colors = ['#2563EB', '#10B981', '#EC4899'];
    const items = [];
    for (let i = 0; i < 13; i++) {
      items.push({
        geometry: geometries[i % geometries.length],
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        color: colors[i % colors.length],
        speed: 0.5 + Math.random() * 1.5,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#93c5fd" />
      <pointLight position={[5, -3, 2]} intensity={0.3} color="#EC4899" />
      <MouseParallax>
        {shapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </MouseParallax>
      <Particles count={90} />
    </>
  );
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-accent-green-light opacity-60" />
      {/* Animated floating dots as CSS fallback */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/10 animate-pulse"
          style={{
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            top: `${10 + i * 14}%`,
            left: `${5 + i * 16}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroBackground() {
  const [webglFailed, setWebglFailed] = useState(false);

  if (!isWebGLAvailable() || webglFailed) {
    return <HeroFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<HeroFallback />}>
      <div className="absolute inset-0 -z-10">
        <Canvas
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          camera={{ position: [0, 0, 8], fov: 55 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: false }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={() => setWebglFailed(true)}
        >
          <HeroScene />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
