'use client'
import { Bounded } from '@/components/Bounded';
import { View } from '@react-three/drei';
import SkyDiveScene from '@/components/SkyDiveScene';





type SkyDiveProps = {
  sentence: string | null;
  flavor: string | null; 
}

const SkyDive = ({flavor, sentence}: SkyDiveProps) => {
  return (
    <Bounded className='skydive h-screen'>
        <h2 className='sr-only'>Himesha</h2>
        <View className='h-screen w-screen'>
            <SkyDiveScene 
              flavor={flavor} 
              sentence={["Drink Fizzi Soda Today!", "Live Gutsy!", "Refreshing Taste!"][0]}
            />
        </View>
    </Bounded>
  )
}

export default SkyDive
