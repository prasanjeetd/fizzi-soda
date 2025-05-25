'use client';

import React from 'react';
import Image from 'next/image';

import { Bounded } from '@/components/Bounded';
import Button from './Button';
import { TextSplitter } from './TextSplitter';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { View } from '@react-three/drei';
import Scene from '@/components/Scene';
import { Bubbles } from '@/components/Bubbles';
import { useStore } from '@/hooks/useStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';

gsap.registerPlugin(useGSAP, ScrollTrigger);


type Props = {
  heading?: string;
  subheading?: string;
  body?: string;
 
  secondHeading?: string;
  secondBody?: string;
  cansImageSrc?: string;
}



const Hero = ({
  heading = "Live Gutsy",
  subheading = "Soda Perfacted",
  body = "3-5g sugar, 9g fiber, 5 delicious flavours",
 
  secondHeading = "Try all five flavours",
  secondBody = "Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners or high fructose corn syrup. Try all five flavors and find your favorite!",
  cansImageSrc = "/images/all-cans-bunched.png"
}: Props) => {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(() => {
    if(!ready && isDesktop) return;

    const introTL = gsap.timeline();

    introTL
    .set(".hero", {opacity: 1})
    .from(".hero-header-word", {
      scale: 3, 
      opacity: 0,
      ease: "power4.in",
      delay: 0.3,
      stagger: 1,
    })
    .from(".hero-subheading", {
      y: 30,
      opacity: 0,      
    },
    "-=0.8"
    )
    .from(".hero-body", {
      y: 10,
      opacity: 0,      
    })
    .from(".hero-button", {
      y: 10,
      opacity: 0,   
      duration: 0.6,   
    })
    
    const scrollTl = gsap.timeline({
        scrollTrigger:{
            trigger: ".hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            
        }
    });
    scrollTl.fromTo("body",{
        backgroundColor: "#FDE047"
    },{
        backgroundColor: "#D9F99D",
        overwrite:"auto"
    }, 1)
    .from(".text-side-heading .split-char", {
        scale: 1.3,
        opacity: 0,
        y: 40,
        stagger: .1,
        rotate: -25,
        ease: "back.out(3)",
        duration: .5
    })
    .from(".text-side-body", {
        opacity: 0,
        y: 20,
        
    })  

  }, {dependencies: [ready, isDesktop]});



  return (
    <Bounded className="hero opacity-0">
      {isDesktop && (
         <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
         <Scene />
         <Bubbles count={300} speed={2} repeat={true}  />
       </View>
       )
      }
     
     <div className="grid">
       <div className="grid h-screen place-items-center">
        <div className="grid auto-rows-min place-items-center text-center">
          {/* Left Column - Text Content */}
         
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter text={heading} wordDisplayStyle="block" className="hero-header-word" />   
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
            <p className="">
              {subheading}
            </p>
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
            <p className="">
              {body}
            </p>
            </div>
            
                <Button className='mt-12 hero-button' />
            
            
              </div>
              </div>
         

          {/* Right Column - Image */}
         <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
            {cansImageSrc && (
              <Image
                src={cansImageSrc}
                alt="Next.js Logo as Placeholder"
                width={500}
                height={500}    
                className="md:hidden w-full"
                priority
              />
            )}
         

        {/* Second Section */}
        <div>
          <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
           <TextSplitter text={secondHeading} />
           
          </h2>

          <p className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
            {secondBody}
          </p>
          </div>
          </div>
          </div>
    </Bounded>
  );
};

export default Hero;
