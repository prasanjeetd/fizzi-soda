'use client'
import { useState, useEffect } from 'react';
import { Bounded } from '@/components/Bounded';
import { SodaCan, type SodaCanProps } from '@/components/SodaCan';
import { gsap } from 'gsap';
import { Center, Environment, View } from '@react-three/drei';
import FloatingCan from './FloatingCan';

const FLAVORS: {
    flavor: SodaCanProps["flavor"];
    color: string;
    name: string;
  }[] = [
    { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
    { flavor: "grape", color: "#572981", name: "Grape Goodness" },
    { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
    {
      flavor: "strawberryLemonade",
      color: "#690B3D",
      name: "Strawberry Lemonade",
    },
    { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
  ];


const Carousel = () => {
    
   const[currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
   function changeFlavor(index: number){
    const nextIndex = ( index + FLAVORS.length) % FLAVORS.length;
    setCurrentFlavorIndex(nextIndex);
   }     
        
  
    
    return (
        <section className="carousel bg-white relative h-screen text-white grid grid-rows-[auto,4fr,auto] overflow-hidden justify-center py-12">
            <div className="background pointer-events-none absolute inset-0 bg-[#715023] opacity-50" />
               
              <h2 className="relative text-center text-5xl font-bold">
                Choose your Flavors
              </h2>
              
              <div className='grid grid-cols-3 items-center'>
                {/* Left */}
                <button
                onClick={() => changeFlavor(currentFlavorIndex + 1)}
                className='z-20 justify-self-end mr-4'
                >
                  Left
                </button>
                {/* Can */}
                <View className='aspect-square h-[70vmin] min-h-40'>
                  <Center position={[0,0,1.5]}>
                  <FloatingCan floatIntensity={0.3} rotationIntensity={1}
                  flavor={FLAVORS[currentFlavorIndex].flavor}
                  />
                  </Center>

                  <Environment files="/hdr/lobby.hdr" environmentIntensity={0.6} environmentRotation={[0,3,0]} />
                  <directionalLight position={[0, 1, 1]} intensity={6} />
                </View>
                {/* Right */}
                <button
                onClick={() => changeFlavor(currentFlavorIndex - 1)}
                className='z-20 justify-self-start ml-4'
                >
                  Right
                </button>
              </div>

              <div className='text-area relative mx-auto text-center'>
                <div className="text-wrapper text-4xl font-medium">
                  <p>{FLAVORS[currentFlavorIndex].name}</p>
                </div>
              </div>
            <div className="mt-2 text-2xl font-normal opacity-90">

            </div>
          
            
         
        </section>
    );
};

export default Carousel;
