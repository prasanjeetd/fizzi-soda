'use client'
import { Bounded } from '@/components/Bounded';
import { View } from '@react-three/drei';
import SkyDiveScene from '@/components/SkyDiveScene';

type SkyDiveProps = {
  sentence: string | null;
  flavor?: "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon";
}

const SkyDive = ({flavor, sentence}: SkyDiveProps) => {
  return (
    <Bounded className='skydive h-screen'>       
        <View className='h-screen w-screen'>
            <SkyDiveScene 
              flavor={flavor || undefined} 
              sentence={["Drink Fizzi Soda Today!", "Live Gutsy!", "Refreshing Taste!"][0]}
            />
        </View>
    </Bounded>
  )
}

export default SkyDive
