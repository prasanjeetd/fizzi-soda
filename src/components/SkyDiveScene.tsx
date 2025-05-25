'use client'

import { useRef } from "react"
import * as THREE from 'three'
import FloatingCan from "@/components/FloatingCan"
import { Cloud, Clouds, Environment, OrbitControls, Text } from "@react-three/drei"
import { useMediaQuery } from "@/hooks/useMediaQuery"



const SkyDiveScene = ({sentence, flavor}: SkyDiveProps) => {

    const groupRef = useRef<THREE.Group>(null)
    const canRef = useRef<THREE.Group>(null)
    const cloud1Ref = useRef<THREE.Group>(null)
    const cloud2Ref = useRef<THREE.Group>(null)
    const cloudsRef = useRef<THREE.Group>(null)
    const wordsRef = useRef<THREE.Group>(null)

    const ANGLE  = 75 * (Math.PI / 180);

    

  return (
    <group ref={groupRef}>
        <group rotation={[0,0,0.5]}>
        <FloatingCan ref={canRef} flavor={flavor}></FloatingCan>
        </group>

        <Clouds ref={cloudsRef}>
            <Cloud ref={cloud1Ref} bounds={[10,10,2]} />
            <Cloud ref={cloud2Ref} bounds={[10,10,2]} />
        </Clouds>

        <group ref={wordsRef}>
            {sentence && <ThreeText sentence={sentence} color="#F97315"/>}
        </group>


        
        {/* Lightts */}
        <ambientLight intensity={2} color="#9DDEFA" />
        <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  )
}

function ThreeText({sentence, color="white"}: {
    sentence: string;
    color?: string
}){
    const words = sentence.toUpperCase().split(" ");
    const material = new THREE.MeshLambertMaterial();
    const isDesktop = useMediaQuery("(min-width: 950px)", true)
    
    return words.map((word: string, wordIndex: number) => (
        <Text key={`${wordIndex} - ${word}`}    
        scale={isDesktop ? 1 : 0.5}
        color={color}
        font="/fonts/Alpino-Variable.woff"
        fontWeight={900}
        anchorX={"center"}
        anchorY={"middle"}
        position={[wordIndex * 2 - (words.length - 1), 0, 0]} // Position words horizontally
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?! "
        >{word}</Text> // Display individual word instead of the full sentence
    ))
    
    return <Text>{sentence}</Text>
}




export default SkyDiveScene
