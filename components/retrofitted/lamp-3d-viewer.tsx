'use client';

import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

function CameraReset({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsType | null> }) {
  const { camera, invalidate } = useThree();

  const initialPosition = useRef(new THREE.Vector3(2.74, 1.1, 0.9));
  const initialTarget = useRef(new THREE.Vector3(0, 0, 0));
  const isInteracting = useRef(false);
  const needsReset = useRef(true);

  // Trigger initial animation on mount
  useEffect(() => {
    invalidate();
  }, [invalidate]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleInteractionStart = () => {
      isInteracting.current = true;
      needsReset.current = true;
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
    if (!isInteracting.current && controlsRef.current && needsReset.current) {
      camera.position.lerp(initialPosition.current, 0.03);
      controlsRef.current.target.lerp(initialTarget.current, 0.03);

      // Stop when very close
      if (camera.position.distanceTo(initialPosition.current) < 0.001) {
        camera.position.copy(initialPosition.current);
        controlsRef.current.target.copy(initialTarget.current);
        needsReset.current = false;
      } else {
        invalidate();
      }

      controlsRef.current.update();
    }
  });

  return null;
}

interface LampModelProps {
  intensity: number;
  scale?: number;
}

function InvalidateOnChange({ intensity }: { intensity: number }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [intensity, invalidate]);
  return null;
}

function LampModel({ intensity, scale = 3.7 }: LampModelProps) {
  const { scene } = useGLTF('/retrofitted/lamp.glb');
  const spotLight2Ref = useRef<THREE.SpotLight>(null!);

  // Enable shadow casting and receiving for all meshes in the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group position={[-0.4, -1.8, -0.3]} rotation={[0, -1.8, 0]}>
      <primitive object={scene} scale={scale} />
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
            intensity={intensity * 0.02}
            distance={12}
            color='#ffa600'
            decay={2}
          />
        )}
      </mesh>
    </group>
  );
}

export function Lamp3DViewer() {
  const [intensity, setIntensity] = useState(0.77);
  const controlsRef = useRef<OrbitControlsType>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverSlider, setIsOverSlider] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);

  // Cleanup WebGL context on unmount to prevent HMR errors
  useEffect(() => {
    return () => {
      if (glRef.current) {
        glRef.current.dispose();
        glRef.current = null;
      }
    };
  }, []);

  const handleCanvasCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    glRef.current = gl;
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-full pt-12 pb-28 md:pt-12 md:pb-0 cursor-none'
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsDragging(false);
      }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      {/* Radial Gradient Light Effect */}
      <div
        className='absolute inset-0 pointer-events-none transition-opacity duration-300'
        style={{
          background: `radial-gradient(circle at center,
            rgba(255, 255, 255, ${intensity * 0.4}) 0%,
            rgba(200, 200, 200, ${intensity * 0.2}) 30%,
            rgba(100, 100, 100, 0) 70%)`,
          opacity: intensity > 0.1 ? 1 : 0,
        }}
      />

      {/* Light Dimmer Slider - positioned above gallery icons */}
      <div
        className='absolute bottom-38 md:bottom-28 left-4 right-4 md:left-auto md:right-8 md:w-72 px-3 py-2 z-10 flex items-center gap-2 rounded-[32px] border border-[#e7d68d]/40 bg-[#c33b32]/90 backdrop-blur-md cursor-auto'
        onMouseEnter={() => setIsOverSlider(true)}
        onMouseLeave={() => setIsOverSlider(false)}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        <span className='text-xs font-medium text-[#f5e6c8] flex-shrink-0 hidden lg:inline'>Brightness</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill={intensity > 0.1 ? '#e7d68d' : 'none'}
          stroke='#e7d68d'
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
          className='flex-1 min-w-0 h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e7d68d] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#e7d68d] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0'
          aria-label='Light intensity'
          style={{
            background: `linear-gradient(to right, #e7d68d ${intensity * 100}%, rgba(195, 59, 50, 0.3) ${
              intensity * 100
            }%)`,
          }}
        />
        <span className='text-xs font-medium text-white flex-shrink-0 w-7 text-right'>
          {Math.round(intensity * 100)}%
        </span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.74, -4.5, 5.9], fov: 50 }}
        gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping }}
        shadows='soft'
        frameloop='demand'
        onCreated={handleCanvasCreated}
      >
        <Suspense fallback={null}>
          <InvalidateOnChange intensity={intensity} />
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
            enableZoom={false}
            enableRotate={true}
            minDistance={1.5}
            maxDistance={8}
            makeDefault
            enableDamping={true}
            dampingFactor={0.05}
          />
          <CameraReset controlsRef={controlsRef} />

          {/* Bloom effect for realistic light glow - Optimized */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={intensity * 4}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.5}
              radius={0.6}
              levels={4}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Hand cursor - follows mouse */}
      {isHovering && !isOverSlider && (
        <div
          className='absolute z-30 flex items-center justify-center bg-[#c33b32]/90 p-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2'
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}
        >
          {isDragging ? (
            // Closed/grabbing hand
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-white'
            >
              <path d='M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4' />
              <path d='M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2' />
              <path d='M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5' />
              <path d='M6 14a2 2 0 0 0-2 2c0 1.02.1 2.51.5 4' />
              <path d='M18 9a2 2 0 1 1 4 0v4a8 8 0 0 1-8 8h-4c-2.8 0-4.5-.86-5.99-2.34' />
            </svg>
          ) : (
            // Open hand
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-white'
            >
              <path d='M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2' />
              <path d='M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2' />
              <path d='M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8' />
              <path d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15' />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

// Preload the model
useGLTF.preload('/retrofitted/lamp.glb');
