"use client";

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type GLTFResult = {
  nodes: any;
  materials: any;
};

type MaterialOverrides = {
  [key: string]: {
    color?: string | number;
    map?: string;
    normalMap?: string;
    metalness?: number;
    roughness?: number;
  };
};

interface TitanicProps extends React.ComponentPropsWithoutRef<'group'> {
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  materialOverrides?: MaterialOverrides;
}

// Preload the GLTF model
useGLTF.preload("/titanic.gltf");

export function Titanic({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  materialOverrides = {},
  ...props
}: TitanicProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/titanic.gltf') as any;
  console.log('Available materials in GLTF:', Object.keys(materials));
  const [textureMap, setTextureMap] = useState<Map<string, THREE.Texture>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  // Load all textures
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const newTextureMap = new Map<string, THREE.Texture>();
    let texturesToLoad = 0;
    let texturesLoaded = 0;

    console.log('Starting to load textures...');
    console.log('Looking for texture files at paths:', {
      wood: '/textures/wood_texture.jpeg',
      metal: '/textures/metal_normal.jpg',
      blackMetal: '/textures/black_metal_texture.jpg'
    });

    // Count textures to load
    Object.values(materialOverrides).forEach(override => {
      if (override.map) texturesToLoad++;
      if (override.normalMap) texturesToLoad++;
    });

    if (texturesToLoad === 0) {
      setIsLoading(false);
      return;
    }

    const onTextureLoad = () => {
      texturesLoaded++;
      if (texturesLoaded >= texturesToLoad) {
        setTextureMap(newTextureMap);
        setIsLoading(false);
      }
    };

    // Load each texture
    Object.entries(materialOverrides).forEach(([name, override]) => {
      if (override.map) {
        textureLoader.load(override.map, (texture) => {
          console.log(`Successfully loaded texture: ${override.map}`);
          newTextureMap.set(override.map!, texture);
          onTextureLoad();
        }, undefined, (error) => {
          console.error(`Error loading texture ${override.map}:`, error);
          console.error('Full error object:', error);
          onTextureLoad();
        });
      }

      if (override.normalMap) {
        textureLoader.load(override.normalMap, (texture) => {
          console.log(`Successfully loaded normal map: ${override.normalMap}`);
          newTextureMap.set(override.normalMap!, texture);
          onTextureLoad();
        }, undefined, (error) => {
          console.error(`Error loading normal map ${override.normalMap}:`, error);
          console.error('Full error object:', error);
          onTextureLoad();
        });
      }
    });

    return () => {
      // Cleanup textures on unmount
      newTextureMap.forEach(texture => texture.dispose());
    };
  }, [materialOverrides]);

  // Create material overrides
  const materialMap = useMemo(() => {
    if (isLoading) return new Map();

    const map = new Map<string, THREE.Material>();
    
    Object.entries(materialOverrides).forEach(([name, override]) => {
      // Find the material by name (case insensitive)
      const materialName = Object.keys(materials).find(key => 
        key.toLowerCase().includes(name.toLowerCase())
      );
      
      if (!materialName) return;
      
      const originalMaterial = materials[materialName];
      if (!originalMaterial) return;

      const material = originalMaterial.clone();
      
      console.log('Applying material overrides:', {
        materialName: name,
        override,
        hasTexture: !!override.map,
        texture: override.map ? textureMap.get(override.map) : 'none'
      });

      // Apply color if specified
      if (override.color !== undefined) {
        material.color = new THREE.Color(override.color);
      }
      
      // Apply texture if specified and loaded
      if (override.map) {
        const texture = textureMap.get(override.map);
        console.log(`Texture for ${name}:`, {
          exists: !!texture,
          path: override.map,
          texture
        });
        if (texture) {
          material.map = texture;
          material.needsUpdate = true;
        } else {
          console.warn(`Texture not found: ${override.map}`);
        }
      }
      
      // Apply normal map if specified and loaded
      if (override.normalMap) {
        const normalMap = textureMap.get(override.normalMap);
        if (normalMap) {
          material.normalMap = normalMap;
          material.normalMap.needsUpdate = true;
        }
      }
      
      // Apply material properties
      if (override.metalness !== undefined) {
        material.metalness = override.metalness;
      }
      
      if (override.roughness !== undefined) {
        material.roughness = override.roughness;
      }
      
      map.set(name, material);
    });
    
    return map;
  }, [materials, materialOverrides, textureMap, isLoading]);

  // Helper function to get material with fallback
  const getMaterial = (name: string, defaultMaterial: THREE.Material) => {
    return materialMap.get(name) || defaultMaterial;
  };

  if (isLoading) {
    return null; // Or return a loading indicator
  }

  // Render the model with original transformations
  return (
    <group ref={group} {...props} dispose={null} scale={scale} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Hull.geometry}
        material={getMaterial('Hull', materials.HullRed || new THREE.MeshStandardMaterial({ color: 'red' }))}
        scale={[10, 1, 2.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Deck.geometry}
        material={getMaterial('Deck', materials.DeckWhite || new THREE.MeshStandardMaterial({ color: 'white' }))}
        position={[0, 1.2, 0]}
        scale={[8, 0.3, 2.3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Superstructure.geometry}
        material={getMaterial('Superstructure', materials.SuperWhite || new THREE.MeshStandardMaterial({ color: '#f0f0f0' }))}
        position={[0, 1.7, 0]}
        scale={[4, 0.6, 1.8]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Funnel.geometry}
        material={getMaterial('Funnel', materials.FunnelBlack || new THREE.MeshStandardMaterial({ color: '#333333' }))}
        position={[-5, 2.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Funnel001.geometry}
        material={getMaterial('Funnel', materials.FunnelBlack || new THREE.MeshStandardMaterial({ color: '#333333' }))}
        position={[-1.7, 2.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Funnel002.geometry}
        material={getMaterial('Funnel', materials.FunnelBlack || new THREE.MeshStandardMaterial({ color: '#333333' }))}
        position={[1.7, 2.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Funnel003.geometry}
        material={getMaterial('Funnel', materials.FunnelBlack || new THREE.MeshStandardMaterial({ color: '#333333' }))}
        position={[5, 2.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text.geometry}
        material={getMaterial('Text', materials.TextWhite || new THREE.MeshStandardMaterial({ color: 'white' }))}
        position={[10.5, 1.1, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.5}
      />
    </group>
  );
}