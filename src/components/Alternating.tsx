'use client'

import React from 'react'
import { Bounded } from './Bounded'
import { View } from '@react-three/drei'
import AlternatingCanScene from './AlternatingCanScene'
import { useMediaQuery } from '@/hooks/useMediaQuery';


type Props = {}

const Alternating = (props: Props) => {

     const isDesktop = useMediaQuery("(min-width: 768px)", true);
  return (
    <Bounded className='alternating-text-container relative text-sky-950 bg-yellow-300'>
        <div>
            <div className='grid relative'>
                {
                    isDesktop && (<View className='alternating-text-view absolute left-0 top-0 h-screen w-full '>
                        <AlternatingCanScene />
                    </View>)
                }
              
                <div className='alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2'>
                    <div className='col-start-1'>
                        <h2 className='text-balance text-6xl font-bold'>
                            Gut-Friendly Godness
                        </h2>
                        <div className='mt-4 text-xl'>
                            <p>Our soda is packed with prebiotics and 1 billion probiotics, giving your gut the love it deserves. Say goodbye to bloating and hello to a happy, healthy digestive system with every sip.</p>
                        </div>
                    </div>
                </div>
                <div className='alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2'>
                        <div className='md:col-start-2'>
                            <h2 className='text-balance text-6xl font-bold'>
                            Light Calories, Big Flavor
                            </h2>
                            <div className='mt-4 text-xl'>
                                <p>Indulge in bold, refreshing taste without the guilt. At just 20 calories per can, you can enjoy all the flavor you crave with none of the compromise.</p>
                            </div>
                        </div>
                </div>
                <div className='alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2'>
                    <div className='col-start-1'>
                        <h2 className='text-balance text-6xl font-bold'>
                        Naturally Refreshing
                        </h2>
                        <div className='mt-4 text-xl'>
                            <p>Made with only the best natural ingredients, our soda is free from artificial sweeteners and flavors. It’s a crisp, clean taste that feels as good as it tastes, giving you a boost of real, natural refreshment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Bounded>
  )
}

export default Alternating;