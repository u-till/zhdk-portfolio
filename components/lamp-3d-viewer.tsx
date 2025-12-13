'use client';

import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import * as THREE from 'three';

interface LampModelProps {
  lightOn: boolean;
}

function LampModel({ lightOn }: LampModelProps) {
  const { scene } = useGLTF('/retrofitted/lamp.glb');

  // Enable shadow casting and receiving for all meshes in the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group position={[0, -1.8, 0]} rotation={[0, -1.5, 0]}>
      <primitive object={scene} scale={3.8} />
      {/* Point lights emanating from the lamp bulb when turned on */}
      {/* Adjust the Y position to match where your bulb is located in the model */}
      {lightOn && (
        <>
          <pointLight
            position={[0.42, 2.05, -0.48]}
            intensity={3}
            distance={15}
            color='#ffa500'
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Visual markers for light positions - remove these once positioned correctly {[0.36, 2.15, -0.4]} */}
        </>
      )}
      <mesh position={[0.36, 2.15, -0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={lightOn ? '#D3D3B5' : '#434339'} />
      </mesh>
    </group>
  );
}

interface Lamp3DViewerProps {
  variant?: 'minimal' | 'retro' | 'pill';
}

export function Lamp3DViewer({ variant = 'minimal' }: Lamp3DViewerProps) {
  const [lightOn, setLightOn] = useState(false);

  const styles = {
    minimal: {
      button: 'border border-black/60 bg-background/90 backdrop-blur-md hover:bg-foreground/5',
      buttonActive: 'border border-black bg-foreground text-background',
    },
    retro: {
      button: 'rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80',
      buttonActive: 'rounded-full border border-orange-300 bg-orange-400 text-white',
    },
    pill: {
      button: 'rounded-full bg-green-500 text-white hover:bg-green-600 border-0',
      buttonActive: 'rounded-full bg-green-600 text-white border-0',
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className='relative w-full h-full'>
      {/* Light Toggle Button */}
      <button
        onClick={() => setLightOn(!lightOn)}
        className={`absolute cursor-pointer top-4 left-4 px-4 py-2 transition-colors z-10 flex items-center gap-2 ${
          lightOn ? currentStyle.buttonActive : currentStyle.button
        }`}
        aria-label='Toggle light'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill={lightOn ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
          <path d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836' />
        </svg>
        <span className='text-sm font-medium'>{lightOn ? 'ON' : 'OFF'}</span>
      </button>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={1.2} />
          {/* Key light from top-right */}
          <directionalLight position={[5, 5, 5]} intensity={2} />
          {/* Fill light from left */}
          <directionalLight position={[-3, 2, -2]} intensity={0.8} />
          {/* Back light for depth */}
          <directionalLight position={[0, 3, -5]} intensity={0.5} />

          <LampModel lightOn={lightOn} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={1.5} maxDistance={8} />
        </Suspense>
      </Canvas>

      {/* Instructions */}
      <div className='absolute bottom-4 left-4 right-4 text-center text-sm opacity-70'>
        Drag to rotate • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
}

// Preload the model
useGLTF.preload('/retrofitted/lamp.glb');
