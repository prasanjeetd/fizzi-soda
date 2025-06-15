"use client";

import { Environment, OrbitControls} from '@react-three/drei';
import FloatingCan from "@/components/FloatingCan";
import { useRef } from 'react';
import { Group } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/hooks/useStore';


gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {}

const Scene = (props: Props) => {
  const isReady = useStore((state) => state.ready);
  const setReady = useStore((state) => state.isReady); // Changed from setReady to isReady

  const can1Ref = useRef<Group>(null)
  const can2Ref = useRef<Group>(null)
  const can3Ref = useRef<Group>(null)
  const can4Ref = useRef<Group>(null)
  const can5Ref = useRef<Group>(null)

  const can1GroupRef = useRef<Group>(null)
  const can2GroupRef = useRef<Group>(null)

  const groupRef = useRef<Group>(null)

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    // Call isReady function from store to trigger animation below
    setReady();
     
    // Show only Black Cherry and Lemon Lime cans initially
    // Can 1 - Black Cherry - visible
    gsap.set(can1Ref.current.position, {x: -1.5, y: 0, z: 0});    
    gsap.set(can1Ref.current.rotation, {z: -0.5});    
    gsap.set(can1Ref.current, {visible: true});

    // Can 2 - Lemon Lime - visible
    gsap.set(can2Ref.current.position, {x: 1.5, y: 0, z: 0});    
    gsap.set(can2Ref.current.rotation, {z: 0.5});    
    gsap.set(can2Ref.current, {visible: true});

    // Hide other cans initially
    gsap.set(can3Ref.current, {visible: false});
    gsap.set(can4Ref.current, {visible: false});
    gsap.set(can5Ref.current, {visible: false});

    // Make sure group positions are properly set
    gsap.set(can1GroupRef.current.position, {y: 0, x: 0, z: 0});
    gsap.set(can2GroupRef.current.position, {y: 0, x: 0, z: 0});
    gsap.set(groupRef.current.position, {y: 0, x: 0, z: 0});
    gsap.set(groupRef.current.rotation, {x: 0, y: 0, z: 0});

    // Scroll animation to reveal other cans
    const scrollTL = gsap.timeline({
      defaults:{
        duration: 2,            
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          // Hide/show cans based on scroll progress
          if (self.progress < 0.1) {
            // At the top - only show first two cans
            gsap.set(can3Ref.current, {visible: false});
            gsap.set(can4Ref.current, {visible: false});
            gsap.set(can5Ref.current, {visible: false});
          } else {
            // Show additional cans based on scroll progress
            gsap.set(can3Ref.current, {visible: self.progress > 0.1});
            gsap.set(can4Ref.current, {visible: self.progress > 0.2});
            gsap.set(can5Ref.current, {visible: self.progress > 0.3});
          }
        }
      }
    });

    scrollTL
      .to(groupRef.current.rotation, {y: Math.PI * 2}, 0)
      // Rest of your animations...
      .to(can1Ref.current.position, {x: -.2, y:-.7, z: -2}, 0)
      .to(can1Ref.current.rotation, {z: 0.3}, 0)
      
      //can 2 - lemon lime
      .to(can2Ref.current.position, {x: 1, y: -.2, z: -1}, 0)
      .to(can2Ref.current.rotation, {z: 0}, 0)

      //can 3 - grape
      .to(can3Ref.current.position, {x: -.3, y: 0.5, z: -1}, 0)
      .to(can3Ref.current.rotation, {z: -0.1}, 0)

      //can 4 - strawberry lemonade
      .to(can4Ref.current.position, {x: 0, y:-.3, z:0.5}, 0)
      .to(can4Ref.current.rotation, {z: 0.3}, 0)

      //can 5 - watermelon
      .to(can5Ref.current.position, {x: .3, y: .5, z:-.5}, 0)
      .to(can5Ref.current.rotation, {z: -.25}, 0)
      .to(groupRef.current.position, {x: 1, duration: 3, ease: "sine.inOut"}, 1.3)

    

  }, {dependencies: [isReady]});


  return (
    <group ref={groupRef}>

       <group ref={can1GroupRef}> <FloatingCan ref={can1Ref} flavor='blackCherry' speed={FLOAT_SPEED} /></group>
       <group ref={can2GroupRef}> <FloatingCan ref={can2Ref} flavor='lemonLime' speed={FLOAT_SPEED} /></group>
        <FloatingCan ref={can3Ref} flavor='grape' speed={FLOAT_SPEED} />
        <FloatingCan ref={can4Ref} flavor='strawberryLemonade' speed={FLOAT_SPEED} />
        <FloatingCan ref={can5Ref} flavor='watermelon' speed={FLOAT_SPEED} />



        {/* <OrbitControls /> */}
        <Environment   files="/hdr/lobby.hdr" environmentIntensity={1.5} />
        
    </group>
  )
}

export default Scene
