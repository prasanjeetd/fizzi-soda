"use client";
import { forwardRef } from 'react';
import { Float } from '@react-three/drei'
import { SodaCan, SodaCanProps } from '@/components/SodaCan'
import { Group } from 'three';

type FloatingCanProps = {
    flavor?: SodaCanProps["flavor"];
   floatingRange?: [number, number];
    speed?: number;
    floatIntensity?: number;
    rotationIntensity?: number;
    children?: ReactNode;
   
}

const FloatingCan = forwardRef<Group, FloatingCanProps>(({
    flavor ="blackCherry",
    floatingRange= [-0.1, 0.1],
    speed=1.5,
    floatIntensity=1,
    rotationIntensity=1,
    children,
    ...props    
}, ref) => {
  return (
    <group {...props} ref={ref}>
        <Float
        speed={speed}
        rotationIntensity={rotationIntensity}
        floatIntensity={floatIntensity}
        floatingRange={floatingRange}
        >
            {children}
        <SodaCan flavor={flavor} />
        </Float>
    </group>
  )
})

FloatingCan.displayName = "FloatingCan";

export default FloatingCan