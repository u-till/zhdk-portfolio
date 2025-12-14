'use client';

import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const logPosition = () => {
      console.log('Camera position:', [
        camera.position.x.toFixed(2),
        camera.position.y.toFixed(2),
        camera.position.z.toFixed(2),
      ]);
    };

    // Log when camera moves
    const interval = setInterval(logPosition, 1000);
    return () => clearInterval(interval);
  }, [camera]);

  return null;
}

interface LampModelProps {
  intensity: number;
}

function LampModel({ intensity }: LampModelProps) {
  const { scene } = useGLTF('/retrofitted/lamp.glb');

  // Enable shadow casting and receiving for all meshes in the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group position={[-0.4, -1.8, -0.3]} rotation={[0, -1.5, 0]}>
      <primitive object={scene} scale={3.7} />
      {/* Point lights emanating from the lamp bulb */}
      {/* Adjust the Y position to match where your bulb is located in the model */}
      {intensity > 0 && (
        <>
          <pointLight position={[0.95, 2.5, -0.95]} intensity={intensity * 16} distance={40} color='#ffa500' />

          {/* Visual markers for light positions - remove these once positioned correctly {[0.36, 2.15, -0.4]} */}
        </>
      )}
      <mesh position={[0.44, 2.62, -0.48]}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshStandardMaterial
          color={intensity > 0.1 ? '#D3D3B5' : '#b7b772'}
          emissive={intensity > 0.1 ? '#fcca6d' : '#000000'}
          emissiveIntensity={intensity * 0.5}
        />
      </mesh>
    </group>
  );
}

interface Lamp3DViewerProps {
  variant?: 'minimal' | 'retro' | 'pill';
}

export function Lamp3DViewer({ variant = 'minimal' }: Lamp3DViewerProps) {
  const [intensity, setIntensity] = useState(1);

  const styles = {
    minimal: {
      container: 'border border-black/60 bg-background/90 backdrop-blur-md',
      track: 'bg-black/20',
      thumb: 'bg-foreground',
    },
    retro: {
      container: 'rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md ',
      track: 'bg-orange-300/30',
      thumb: 'bg-orange-300',
    },
    pill: {
      container: 'rounded-full bg-green-500/80 backdrop-blur-md border border-green-300/40',
      track: 'bg-green-300/30',
      thumb: 'bg-green-200',
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className='relative w-full h-full bg-linear-to-r from-grey-200 via-gray-500 to-gray-700'>
      {/* Light Dimmer Slider */}
      <div className={`absolute bottom-4 right-4 px-4 py-3 z-10 flex items-center gap-3 ${currentStyle.container}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill={intensity > 0.1 ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='flex-shrink-0'
        >
          <path d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
          <path d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836' />
        </svg>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={intensity}
          onChange={(e) => setIntensity(parseFloat(e.target.value))}
          className='w-32 h-2 rounded-full appearance-none cursor-pointer slider'
          aria-label='Light intensity'
          style={{
            background: `linear-gradient(to right, currentColor ${intensity * 100}%, transparent ${intensity * 100}%)`,
          }}
        />
        <span className='text-sm font-medium w-8 text-right'>{Math.round(intensity * 100)}%</span>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: none;
        }
      `}</style>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.74, 0.3, 0.9], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <Suspense fallback={null}>
          <CameraLogger />

          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={0.6} />
          {/* Key light from top-right */}
          <directionalLight position={[0, 5, 7]} intensity={0.2} castShadow />
          {/* Fill light from left */}
          <directionalLight position={[-3, 2, -2]} intensity={0.8} />
          {/* Back light for depth */}
          <directionalLight position={[0, 3, -5]} intensity={0.5} />

          <LampModel intensity={intensity} />

          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} transparent />
          </mesh>

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={1.5} maxDistance={8} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/retrofitted/lamp.glb');
