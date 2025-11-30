'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  activeLocation: { lat: number; lng: number };
}

function LocationPin({ lat, lng }: { lat: number; lng: number }) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const radius = 2.1;

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  const position = new THREE.Vector3(x, y, z);
  const direction = position.clone().normalize();

  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const euler = new THREE.Euler().setFromQuaternion(quaternion);

  return (
    <group position={[x, y, z]} rotation={[euler.x, euler.y, euler.z]}>
      {/* Pin sphere */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color='#ffffff' emissive='#ffffff' emissiveIntensity={0.3} />
      </mesh>
      {/* Pin stick */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <meshStandardMaterial color='#ffffff' emissive='#ffffff' emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function Earth({ activeLocation }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/saudade/globe-texture.png');

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotation = (activeLocation.lng * Math.PI) / 180 + state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2, 5]} />
        <meshStandardMaterial color='#000000' roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.01, 5]} />
        <meshStandardMaterial map={texture} transparent roughness={0.8} metalness={0.2} />
      </mesh>
      <LocationPin lat={activeLocation.lat} lng={activeLocation.lng} />
    </group>
  );
}

export function Globe({ activeLocation }: GlobeProps) {
  return (
    <div className='w-36 h-36 lg:w-48 lg:h-48'>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        <Earth activeLocation={activeLocation} />
      </Canvas>
    </div>
  );
}
