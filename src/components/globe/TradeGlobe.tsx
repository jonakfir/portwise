'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Port coordinates [lat, lon]
const PORTS: Record<string, [number, number]> = {
  'Shanghai': [31.2, 121.5],
  'Los Angeles': [33.7, -118.3],
  'Rotterdam': [51.9, 4.5],
  'Singapore': [1.3, 103.8],
  'Dubai': [25.3, 55.3],
  'Hamburg': [53.5, 10.0],
  'Busan': [35.1, 129.0],
  'Mumbai': [19.1, 72.9],
};

const ROUTES: [string, string][] = [
  ['Shanghai', 'Los Angeles'],
  ['Shanghai', 'Rotterdam'],
  ['Singapore', 'Rotterdam'],
  ['Shanghai', 'Dubai'],
  ['Mumbai', 'Rotterdam'],
  ['Busan', 'Los Angeles'],
  ['Shanghai', 'Hamburg'],
  ['Singapore', 'Los Angeles'],
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function TradeRoute({ from, to, index }: { from: [number, number]; to: [number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = 2.02;

  const curve = useMemo(() => {
    const start = latLonToVec3(from[0], from[1], radius);
    const end = latLonToVec3(to[0], to[1], radius);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(radius + dist * 0.3);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to, radius]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.005, 4, false);
  }, [curve]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 1.5 + index) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeometry}>
      <meshBasicMaterial color="#FF5C1A" transparent opacity={0.6} />
    </mesh>
  );
}

function PortDot({ position }: { position: [number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const vec = useMemo(() => latLonToVec3(position[0], position[1], 2.03), [position]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={vec}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#FF5C1A" />
    </mesh>
  );
}

function GlobeScene() {
  const globeRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1, 4.5);
  }, [camera]);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0A1628"
          transparent
          opacity={0.9}
          wireframe={false}
        />
      </Sphere>

      {/* Grid lines */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial color="#1A3459" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Trade routes */}
      {ROUTES.map(([fromName, toName], i) => {
        const from = PORTS[fromName];
        const to = PORTS[toName];
        if (!from || !to) return null;
        return <TradeRoute key={i} from={from} to={to} index={i} />;
      })}

      {/* Port dots */}
      {Object.values(PORTS).map((pos, i) => (
        <PortDot key={i} position={pos} />
      ))}
    </group>
  );
}

export default function TradeGlobe() {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#A8D8EA" />
        <GlobeScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
