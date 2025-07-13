"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { Titanic } from './Titanic';

export default function TitanicScene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [10, 5, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Titanic 
            scale={0.5}
            position={[0, -1, 0]}
            rotation={[0, Math.PI / 4, 0]}
            materialOverrides={{
              Hull: { 
                color: '#8B0000', // Dark red
                roughness: 0.7,
                metalness: 0.3
              },
              Deck: {
                color: '/textures/wood_texture.jpeg',
                roughness: 0.8,
                metalness: 0.2
              },
              Superstructure: {
                map: '/textures/metal_normal.jpg',
    roughness: 0.5,
    metalness: 0.3
              },
              Funnel: {
                map: '/textures/black_metal_texture.jpg',
                metalness: 0.8,
                roughness: 0.2
              },
              Text: {
                color: 'yellow',
                metalness: 0.5,
                roughness: 0.5
              }
            }}
          />
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
