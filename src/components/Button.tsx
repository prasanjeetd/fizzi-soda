import React from 'react'
import Link from 'next/link';
import clsx from 'clsx';


type Props = {
    buttonText?: string | null;
    buttonLink?: string;
    className?: string;
}



const Button = ({ buttonText = "Shop Now",
    buttonLink = "/shop", className = ""}: Props) => {
  return (
    <Link
    href={buttonLink}
    className={clsx("rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl",className)}
  >
    {buttonText}
  </Link>
  )
}

export default Button