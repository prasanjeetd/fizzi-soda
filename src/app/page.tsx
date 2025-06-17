import Image from "next/image";

import Hero from "@/components/Hero";
import SkyDive from "@/components/SkyDive";
import Carousel from "@/components/Carousel";
import Alternating from "@/components/Alternating";

export default function Home() {
  return (
    <>
     <div className="flex flex-col min-h-screen font-[family-name:var(--font-alpino)]">
      {/* Hero Section */}
      <section className="w-full">
        <Hero />
      </section>
      
      {/* SkyDive Section */}
      <section className="w-full h-screen mb-[2000px]">
        <SkyDive flavor="lemonLime" sentence="Drink Fizzi Soda Today!" />
      </section>
      
      {/* Carousel Section - Separate from SkyDive */}
      <section className="w-full">
        <Carousel />
      </section>
      <section className="w-full">
        <Alternating />
      </section>
    </div>
    
      </>
  );
}
