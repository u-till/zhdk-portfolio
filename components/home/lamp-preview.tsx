'use client';

import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Preload the model
useGLTF.preload('/retrofitted/lamp.glb');

function SpinningLampModel() {
  const { scene } = useGLTF('/retrofitted/lamp.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[-0.4, -1.8, -0.3]}>
      <primitive object={scene} scale={3.7} />
      <mesh position={[0.44, 2.55, -0.48]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhysicalMaterial color='#fff8e1' emissive='#ffa900' emissiveIntensity={6} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export function Lamp3DPreview() {
  return (
    <div className='w-64 h-64 md:w-80 md:h-80 lg:w-[416px] lg:h-[416px]'>
      <Canvas camera={{ position: [2.74, 1.1, 0.9], fov: 50 }} gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.4} color='#faf7e9' />
          <directionalLight position={[0, 5, 7]} intensity={0.4} />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} />
          <SpinningLampModel />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
