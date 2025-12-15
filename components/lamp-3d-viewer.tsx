'use client';

import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

function CameraReset({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsType | null> }) {
  const { camera } = useThree();
  const initialPosition = useRef(new THREE.Vector3(2.74, 1.1, 0.9));
  const initialTarget = useRef(new THREE.Vector3(0, 0, 0));
  const isInteracting = useRef(false);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleInteractionStart = () => {
      isInteracting.current = true;
    };

    const handleInteractionEnd = () => {
      isInteracting.current = false;
    };

    controls.addEventListener('start', handleInteractionStart);
    controls.addEventListener('end', handleInteractionEnd);

    return () => {
      controls.removeEventListener('start', handleInteractionStart);
      controls.removeEventListener('end', handleInteractionEnd);
    };
  }, [controlsRef]);

  useFrame(() => {
    if (!isInteracting.current && controlsRef.current) {
      // Constantly pull camera back to initial position when not interacting (slower)
      camera.position.lerp(initialPosition.current, 0.03);
      controlsRef.current.target.lerp(initialTarget.current, 0.03);

      // Stop when very close
      if (camera.position.distanceTo(initialPosition.current) < 0.001) {
        camera.position.copy(initialPosition.current);
        controlsRef.current.target.copy(initialTarget.current);
      }

      controlsRef.current.update();
    }
  });

  return null;
}

interface LampModelProps {
  intensity: number;
}

function LampModel({ intensity }: LampModelProps) {
  const { scene } = useGLTF('/retrofitted/lamp.glb');
  const spotLight2Ref = useRef<THREE.SpotLight>(null!);

  // Enable shadow casting and receiving for all meshes in the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group position={[-0.4, -1.8, -0.3]} rotation={[0, -1.8, 0]}>
      <primitive object={scene} scale={3.7} />
      {/* Glass bulb with light inside */}
      <mesh position={[0.44, 2.55, -0.48]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhysicalMaterial
          color='#fff8e1'
          emissive='#ffa900'
          emissiveIntensity={intensity * 8}
          transparent
          opacity={0.6}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.5}
        />
        {/* Spotlight to simulate bulb with occlusion */}
        {intensity > 0 && (
          <spotLight
            ref={spotLight2Ref}
            position={[0, 0, 0]}
            target-position={[1.3, -1.8, 3.1]}
            angle={8 / 3}
            penumbra={0.5}
            intensity={intensity * 0}
            distance={12}
            color='#ffa600'
            decay={2}
          />
        )}
      </mesh>
    </group>
  );
}

interface Lamp3DViewerProps {
  variant?: 'minimal' | 'retro' | 'pill';
}

export function Lamp3DViewer({ variant = 'minimal' }: Lamp3DViewerProps) {
  const [intensity, setIntensity] = useState(0.77);
  const controlsRef = useRef<OrbitControlsType>(null);

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
          fill={intensity > 0.1 ? '#374151' : 'none'}
          stroke='#374151'
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
          className='w-32 h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-700 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-700 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0'
          aria-label='Light intensity'
          style={{
            background: `linear-gradient(to right, #374151 ${intensity * 100}%, transparent ${intensity * 100}%)`,
          }}
        />
        <span className='text-sm font-medium w-8 text-right'>{Math.round(intensity * 100)}%</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.74, 1.1, 0.9], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={1.4} color='#faf7e9ff' />
          {/* Key light from top-right */}
          <directionalLight position={[0, 5, 7]} intensity={0.2} castShadow color='#f67878' />
          {/* Fill light from left */}
          <directionalLight position={[-3, 2, -2]} intensity={0.4} />
          {/* Back light for depth */}
          <directionalLight position={[0, 3, -5]} intensity={0.5} />

          <LampModel intensity={intensity} />

          {/* Floor - receives shadows from directional light */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} transparent />
          </mesh>

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1.5}
            maxDistance={8}
          />
          <CameraReset controlsRef={controlsRef} />

          {/* Bloom effect for realistic light glow */}
          <EffectComposer>
            <Bloom
              intensity={intensity * 4}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.3}
              mipmapBlur
              radius={0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/retrofitted/lamp.glb');
