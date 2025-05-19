import React from 'react';

export default function FontTest() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg my-4 font-sans">
      <h2 className="text-2xl font-bold mb-4">Alpino Font Test</h2>

      <div className="space-y-4">
        <p className="font-thin">This is Alpino font with font-thin (100)</p>
        <p className="font-extralight">This is Alpino font with font-extralight (200)</p>
        <p className="font-light">This is Alpino font with font-light (300)</p>
        <p className="font-normal">This is Alpino font with font-normal (400)</p>
        <p className="font-medium">This is Alpino font with font-medium (500)</p>
        <p className="font-semibold">This is Alpino font with font-semibold (600)</p>
        <p className="font-bold">This is Alpino font with font-bold (700)</p>
        <p className="font-extrabold">This is Alpino font with font-extrabold (800)</p>
        <p className="font-black">This is Alpino font with font-black (900)</p>
      </div>
    </div>
  );
}
